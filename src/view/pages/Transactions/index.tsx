import { useState } from "react";
import { Fab } from "../Home/components/Fab";
import { useNavigate } from "react-router-dom";
import { api } from "../../../app/services/api";
import { useQuery } from "@tanstack/react-query";
import { CaretLeft, Funnel } from "@phosphor-icons/react";
import { CreateIncome } from "../../modals/CreateIncome";
import { CreateExpense } from "../../modals/CreateExpense";
import { formatDate } from "../../../app/helpers/formatDate";
import { useMonth } from "../../../app/shared/hooks/useMonth";
import { CardTransaction } from "./components/CardTransaction";
import transactionEmpty from "../../../assets/transactions.svg";
import { FiltersProps, Filter as ModalFilter } from "../../modals/Filter";
import { Line } from "../../components/Line";

export function Transactions() {
  const { month } = useMonth();

  const navigate = useNavigate();

  const [filter, setFilter] = useState<FiltersProps>({
    month: "",
    balance: "",
  });
  const [openFilter, setOpenFilter] = useState(false);
  const [openCreateIncome, setOpenCreateIncome] = useState(false);
  const [openCreateExpense, setOpenCreateExpense] = useState(false);

  const [transaction, setTransaction] = useState<any | null>(null);

  const { data: transactions, isLoading } = useQuery({
    queryKey: [
      "transactions",
      filter,
      month,
      openCreateIncome,
      openCreateExpense,
    ],
    queryFn: async () => {
      let filters = `${filter.balance ? "type=" + filter.balance : ""}`;

      return (await api.get(`/transactions?month=${month}&${filters}`)).data;
    },
  });

  return (
    <main className="relative w-screen h-screen flex flex-col gap-6 p-6">
      <header className="flex justify-between items-center gap-8">
        <button className="text-white" onClick={() => navigate("/home")}>
          <CaretLeft size={20} weight="bold" />
        </button>

        <span className="text-xl">Transações</span>

        <button onClick={() => setOpenFilter(true)}>
          <Funnel size={20} weight="fill" />
        </button>
      </header>

      <Line />

      <div className="flex flex-1 flex-col gap-4">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center gap-4 mt-[30%]">
            <img width={280} src={transactionEmpty} alt="Transações" />
            <span className="text-gray-400">Nenhuma transação cadastrada</span>
          </div>
        ) : (
          transactions.map((item: any) => (
            <div key={item.date} className="flex flex-col items-start gap-3">
              <span className="text-white text-xs">
                {formatDate(item.date)}
              </span>
              {item.transactions.map((transaction: any) => (
                <CardTransaction
                  key={transaction.id}
                  {...transaction}
                  openModalEditTransaction={() => {
                    if (transaction.type == "INCOME") {
                      setTransaction(transaction);
                      setOpenCreateIncome(!openCreateIncome);
                    }

                    if (transaction.type == "EXPENSE") {
                      setTransaction(transaction);
                      setOpenCreateExpense(!openCreateExpense);
                    }
                  }}
                />
              ))}
            </div>
          ))
        )}
      </div>

      <Fab
        openModalIncome={() => {
          setTransaction(null);
          setOpenCreateIncome(!openCreateIncome);
        }}
        openModalExpense={() => {
          setTransaction(null);
          setOpenCreateExpense(!openCreateExpense);
        }}
      />

      <CreateIncome
        transaction={transaction}
        open={openCreateIncome}
        onClose={() => setOpenCreateIncome(false)}
      />

      <CreateExpense
        transaction={transaction}
        open={openCreateExpense}
        onClose={() => setOpenCreateExpense(false)}
      />

      <ModalFilter
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        onFilters={(filters) => setFilter(filters)}
      />
    </main>
  );
}
