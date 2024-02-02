import { Fab } from "./components/Fab";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Line } from "../../components/Line";
import { Menu } from "../../components/Menu";
import { api } from "../../../app/services/api";
import { CardTotal } from "./components/CardTotal";
import { CardBalance } from "./components/CardBalance";
import { CardAccount } from "./components/CardAccount";
import { FilterMonth } from "../../modals/FilterMonth";
import { CreateIncome } from "../../modals/CreateIncome";
import { CreateExpense } from "../../modals/CreateExpense";
import { CardCostCenter } from "./components/CardCostCenter";
import { CreateAccounts } from "../../modals/CreateAccounts";
import { AccountModel } from "../../../app/models/AccountModel";
import { CreateCostCenters } from "../../modals/CreateCostCenters";
import { CostCenterModel } from "../../../app/models/CostCenterModel";
import { LayoutDashboard, PlusCircle, WalletIcon } from "lucide-react";
import { useMonth } from "../../../app/shared/hooks/useMonth";

export function Home() {
  const { setMonth, month } = useMonth();

  const [openMenu, setOpenMenu] = useState(false);
  const [openFilterMonth, setOpenFilterMonth] = useState(false);
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
    const data: AccountModel[] = (await api.get(`/accounts?month=${month}`))
      .data;

    let total = 0;
    data.map((item) => (total += item.value));

    setTotal(total);

    setAccounts(data);
  }

  async function getCostCenters() {
    const data = (await api.get(`/cost-centers?month=${month}`)).data;
    setCostCenters(data);
  }

  async function getTransactionsTotal() {
    const data = (await api.get(`/transactions/total?month=${month}`)).data;
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
    openFilterMonth,
  ]);

  return (
    <main className="p-6 flex flex-col gap-6">
      <Header
        openMenu={() => setOpenMenu(!openMenu)}
        openModalFilterMonth={() => setOpenFilterMonth(!openFilterMonth)}
      />

      <div className="flex flex-col gap-6">
        <CardTotal
          value={total + transactionTotal.income - transactionTotal.expense}
        />
        <div className="flex items-center gap-4">
          <CardBalance type="INCOME" value={transactionTotal.income} />
          <CardBalance type="EXPENSE" value={transactionTotal.expense} />
        </div>
      </div>

      <Line />

      <div className="bg-gray-800 flex flex-col gap-2 p-4 rounded-md">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <WalletIcon size={20} />
            <span className="font-light">
              Minhas <span className="font-bold">contas</span>
            </span>
          </div>
          <button
            className="font-bold"
            onClick={() => {
              setAccount(null);
              setOpenCreateAccounts(!openCreateAccounts);
            }}
          >
            Adicionar
          </button>
        </div>

        <div className="flex flex-col gap-2">
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
              className="flex flex-col items-center rounded-md bg-slate-900 p-4"
              onClick={() => {
                setAccount(null);
                setOpenCreateAccounts(!openCreateAccounts);
              }}
            >
              <PlusCircle />
              <span>Criar conta</span>
            </button>
          )}
        </div>
      </div>

      <div className="bg-gray-800 flex flex-col gap-2 p-4 rounded-md">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <LayoutDashboard size={20} />
            <span className="font-light">
              Meus <span className="font-bold">centros de custo</span>
            </span>
          </div>
          <button
            className="font-bold"
            onClick={() => {
              setCostCenter(null);
              setOpenCreateCostCenters(!openCreateCostCenters);
            }}
          >
            Adicionar
          </button>
        </div>

        <div className="flex flex-col gap-2">
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
              className="flex flex-col items-center rounded-md bg-gray-900 p-4"
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

      <Menu open={openMenu} onClose={() => setOpenMenu(false)} />

      <FilterMonth
        open={openFilterMonth}
        onClose={() => setOpenFilterMonth(false)}
        onFilter={({ month }) => setMonth(month)}
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
