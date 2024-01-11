import { WalletIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
// import { useNavigate } from "react-router-dom";
import { CreateIncome } from "../../modals/CreateIncome";
import { CreateExpense } from "../../modals/CreateExpense";
import { CardCostCenter } from "./components/CardCostCenter";
import { CreateAccounts } from "../../modals/CreateAccounts";
import { CreateCostCenters } from "../../modals/CreateCostCenters";
import { Header } from "./components/Header";
import { CardBalance } from "./components/CardBalance";

import nubank from "../../../assets/banks/nubank.png";
import { Line } from "../../components/Line";
import { Fab } from "./components/Fab";
import { CostCenterModel } from "../../../models/CostCenterModel";
import { AccountModel } from "../../../models/AccountModel";
import { formatCurrency } from "../../../helpers/formatCurrency";

export function Home() {
  // const navigate = useNavigate();

  const [openCreateIncome, setOpenCreateIncome] = useState(false);
  const [openCreateExpense, setOpenCreateExpense] = useState(false);
  const [openCreateAccounts, setOpenCreateAccounts] = useState(false);
  const [openCreateCostCenters, setOpenCreateCostCenters] = useState(false);

  const [total, setTotal] = useState(0);
  const [accounts, setAccounts] = useState<AccountModel[]>([]);
  const [costCenters, setCostCenters] = useState<CostCenterModel[]>([]);
  const [transactionTotal, setTransactionTotal] = useState<{
    expense: number;
    income: number;
  }>({ expense: 0, income: 0 });

  async function getTotalAccounts() {
    const data: AccountModel[] = (await api.get("/accounts")).data;

    let total = 0;
    data.map((item) => {
      total += item.value;
    });

    setTotal(total);

    setAccounts(data);
  }

  async function getCostCenters() {
    const data = (await api.get("/cost-centers")).data;
    setCostCenters(data);
  }

  async function getTransactionsTotal() {
    const data = (await api.get("/transactions/total")).data;
    setTransactionTotal(data);
  }

  useEffect(() => {
    getCostCenters();
    getTotalAccounts();
    getTransactionsTotal();
  }, [
    openCreateAccounts,
    openCreateCostCenters,
    openCreateExpense,
    openCreateIncome,
  ]);

  return (
    <main className="p-8 flex flex-col gap-6">
      <Header />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <CardBalance type="INCOME" value={transactionTotal.income} />
          <CardBalance type="EXPENSE" value={transactionTotal.expense} />
        </div>
      </div>

      <div className="bg-[#1C1E21] flex flex-col gap-4 p-4 rounded-md">
        <div className="flex items-center w-full justify-between text-xs">
          <div className="flex items-center gap-2">
            <WalletIcon size={20} />
            <span className="font-light">
              Minhas <span className="font-bold">contas</span>
            </span>
          </div>
          <strong>Adicionar</strong>
        </div>

        <Line />

        <div className="flex flex-col gap-4">
          {accounts.map((account: AccountModel) => (
            <div
              key={account.id}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-2">
                <img src={nubank} alt="Nubank" />
                <span className="text-xs">{account.name}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-light">
                  na conta{" "}
                  <span className="font-bold">
                    {formatCurrency(account.value)}
                  </span>
                </span>
                <span className="font-bold">
                  {formatCurrency(
                    account.value + account.incomeTotal - account.expenseTotal
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-9">
        <span className="text-sm font-light">
          Meus <span className="font-bold">centros de custo</span>
        </span>
        <div className="w-full flex-col gap-4 flex">
          {costCenters.map((costCenter) => (
            <CardCostCenter
              key={costCenter.id}
              total={total}
              title={costCenter.name}
              limit={costCenter.percentage}
              value={costCenter.value}
            />
          ))}
        </div>
      </div>

      <Fab
        openModalIncome={() => setOpenCreateIncome(!openCreateIncome)}
        openModalExpense={() => setOpenCreateExpense(!openCreateExpense)}
        openModalCostCenters={() =>
          setOpenCreateCostCenters(!openCreateCostCenters)
        }
        openModalAccounts={() => setOpenCreateAccounts(!openCreateAccounts)}
      />

      <CreateIncome
        open={openCreateIncome}
        onClose={() => setOpenCreateIncome(false)}
      />
      <CreateExpense
        open={openCreateExpense}
        onClose={() => setOpenCreateExpense(false)}
      />
      <CreateAccounts
        open={openCreateAccounts}
        onClose={() => setOpenCreateAccounts(false)}
      />
      <CreateCostCenters
        total={total + transactionTotal.income - transactionTotal.expense}
        open={openCreateCostCenters}
        onClose={() => setOpenCreateCostCenters(false)}
      />
    </main>
  );
}
