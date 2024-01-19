import { Plus, PlusCircle, WalletIcon } from "lucide-react";
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

import { Fab } from "./components/Fab";
import { CostCenterModel } from "../../../models/CostCenterModel";
import { AccountModel } from "../../../models/AccountModel";
import { CardTotal } from "./components/CardTotal";
import { CardAccount } from "./components/CardAccount";

export function Home() {
  // const navigate = useNavigate();

  const [openCreateIncome, setOpenCreateIncome] = useState(false);
  const [openCreateExpense, setOpenCreateExpense] = useState(false);
  const [openCreateAccounts, setOpenCreateAccounts] = useState(false);
  const [openCreateCostCenters, setOpenCreateCostCenters] = useState(false);

  const [account, setAccount] = useState<AccountModel | null>(null);
  const [costCenter, setCostCenter] = useState<CostCenterModel | null>(null);

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
    data.map((item) => (total += item.value));

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

      <div className="flex flex-col gap-4">
        <CardTotal
          value={total + transactionTotal.income - transactionTotal.expense}
        />
        <div className="flex items-center gap-4">
          <CardBalance type="INCOME" value={transactionTotal.income} />
          <CardBalance type="EXPENSE" value={transactionTotal.expense} />
        </div>
      </div>

      <div className="bg-[#1C1E21] flex flex-col gap-4 p-4 rounded-md">
        <div className="flex items-center gap-2 text-xs">
          <WalletIcon size={20} />
          <span className="font-light">
            Minhas <span className="font-bold">contas</span>
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {accounts.length > 0 ? (
            accounts.map((account: AccountModel) => (
              <CardAccount
                openModalAccountEdit={() => {
                  setAccount(account);
                  setOpenCreateAccounts(!openCreateAccounts);
                }}
                key={account.id}
                account={account}
              />
            ))
          ) : (
            <button
              className="flex flex-col items-center gap-4 rounded-md bg-[#212529] p-4"
              onClick={() => {
                setCostCenter(null);
                setOpenCreateCostCenters(!openCreateCostCenters);
              }}
            >
              <PlusCircle />
              <span>Criar conta</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-9">
        <span className="text-sm font-light">
          Meus <span className="font-bold">centros de custo</span>
        </span>
        <div className="w-full flex-col gap-4 flex">
          {costCenters.length > 0 ? (
            costCenters.map((costCenter) => (
              <CardCostCenter
                key={costCenter.id}
                title={costCenter.name}
                value={costCenter.value}
                limit={costCenter.percentage}
                total={total + transactionTotal.income}
                openModalCostCenterEdit={() => {
                  setCostCenter(costCenter);
                  setOpenCreateCostCenters(!openCreateCostCenters);
                }}
              />
            ))
          ) : (
            <button
              className="flex flex-col items-center gap-4 rounded-md bg-[#1C1E21] p-4"
              onClick={() => {
                setCostCenter(null);
                setOpenCreateCostCenters(!openCreateCostCenters);
              }}
            >
              <PlusCircle />
              <span>Criar centro de custo</span>
            </button>
          )}
        </div>
      </div>

      <Fab
        openModalIncome={() => setOpenCreateIncome(!openCreateIncome)}
        openModalExpense={() => setOpenCreateExpense(!openCreateExpense)}
        openModalCostCenters={() => {
          setCostCenter(null);
          setOpenCreateCostCenters(!openCreateCostCenters);
        }}
        openModalAccounts={() => {
          setAccount(null);
          setOpenCreateAccounts(!openCreateAccounts);
        }}
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
        account={account}
        open={openCreateAccounts}
        onClose={() => setOpenCreateAccounts(false)}
      />
      <CreateCostCenters
        costCenter={costCenter}
        open={openCreateCostCenters}
        onClose={() => setOpenCreateCostCenters(false)}
        total={total + transactionTotal.income - transactionTotal.expense}
      />
    </main>
  );
}
