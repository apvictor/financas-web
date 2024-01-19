import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { Fab } from "../Home/components/Fab";
import { Input } from "../../components/Input";
import { ChevronLeft, Filter } from "lucide-react";
import { CreateIncome } from "../../modals/CreateIncome";
import { formatDate } from "../../../helpers/formatDate";
import { CreateExpense } from "../../modals/CreateExpense";
import { useLocation, useNavigate } from "react-router-dom";
import { CardTransaction } from "./components/CardTransaction";

import transactionEmpty from "../../../assets/transactions.svg";

export function Transactions() {
  const navigate = useNavigate();
  const location = useLocation();

  const [openCreateIncome, setOpenCreateIncome] = useState(false);
  const [openCreateExpense, setOpenCreateExpense] = useState(false);

  const [transaction, setTransaction] = useState<any | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const transactionType = queryParams.get("transactionType");

  const [transactions, setTransactions] = useState<
    {
      date: string;
      transactions: {
        id: number;
        name: string;
        value: number;
        account: { name: string };
        costCenter: { name: string };
        transactionType: string;
      }[];
    }[]
  >([]);

  async function getTransactions(search?: string) {
    if (search && search.length > 3) {
      let filters = `${search ? "search=" + search : ""}${
        transactionType ? "&transactionType=" + transactionType : ""
      }`;
      const data = (await api.get(`/transactions?${filters}`)).data;
      setTransactions(data);
    } else {
      let filters = `${search ? "search=" + search : ""}${
        transactionType ? "&transactionType=" + transactionType : ""
      }`;

      const data = (await api.get(`/transactions?${filters}`)).data;
      setTransactions(data);
    }
  }

  useEffect(() => {
    getTransactions();
  }, [openCreateExpense, openCreateIncome]);

  return (
    <main className="p-8 flex flex-col gap-6">
      <header className="flex justify-between items-center gap-8">
        <button className="text-white" onClick={() => navigate("/home")}>
          <ChevronLeft size={20} />
        </button>

        <span className="text-[#AAA] text-xl">Transações</span>

        <button className="">
          <Filter size={20} />
        </button>
      </header>

      <Input
        type="search"
        name="search"
        placeholder="Pesquisar"
        onChange={(ev) => {
          if (ev.target.value.length > 3) getTransactions(ev.target.value);
          if (ev.target.value.length === 0) getTransactions();
        }}
      />

      <div className="flex flex-col gap-4">
        {transactions.length > 0 ? (
          transactions.map((item) => (
            <div key={item.date} className="flex flex-col gap-2">
              <span className="text-[#AAA] text-xs">
                {formatDate(item.date)}
              </span>
              {item.transactions.map((transaction) => (
                <CardTransaction
                  key={transaction.id}
                  {...transaction}
                  openModalEditTransaction={() => {
                    if (transaction.transactionType == "INCOME") {
                      setTransaction(transaction);
                      setOpenCreateIncome(!openCreateIncome);
                    }

                    if (transaction.transactionType == "EXPENSE") {
                      setTransaction(transaction);
                      setOpenCreateExpense(!openCreateExpense);
                    }
                  }}
                />
              ))}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-28">
            <img width={250} src={transactionEmpty} alt="Transações" />
            <span className="text-gray-400">Nenhuma transação cadastrada</span>
          </div>
        )}
      </div>

      <Fab
        openModalIncome={() => setOpenCreateIncome(!openCreateIncome)}
        openModalExpense={() => setOpenCreateExpense(!openCreateExpense)}
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
    </main>
  );
}
