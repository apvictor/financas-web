import { Fab } from "./components/Fab";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Menu } from "../../components/Menu";
import { api } from "../../../app/services/api";
import { CardTotal } from "./components/CardTotal";
import { CardBalance } from "./components/CardBalance";
import { CardAccount } from "./components/CardAccount";
import { FilterMonth } from "../../modals/FilterMonth";
import { CreateCards } from "../../modals/CreateCards";
import { CreateIncome } from "../../modals/CreateIncome";
import { CardModel } from "../../../app/models/CardModel";
import { CreateExpense } from "../../modals/CreateExpense";
import { CardCostCenter } from "./components/CardCostCenter";
import { CreateAccounts } from "../../modals/CreateAccounts";
import { useMonth } from "../../../app/shared/hooks/useMonth";
import { AccountModel } from "../../../app/models/AccountModel";
import { CreateCostCenters } from "../../modals/CreateCostCenters";
import { CostCenterModel } from "../../../app/models/CostCenterModel";
import {
  ArrowDown,
  ArrowUp,
  LayoutDashboard,
  PlusCircle,
  WalletIcon,
} from "lucide-react";

export function Home() {
  const { setMonth, month } = useMonth();

  const [openMenu, setOpenMenu] = useState(false);
  const [openFilterMonth, setOpenFilterMonth] = useState(false);
  const [openCreateCards, setOpenCreateCards] = useState(false);
  const [openCreateIncome, setOpenCreateIncome] = useState(false);
  const [openCreateExpense, setOpenCreateExpense] = useState(false);
  const [openCreateAccounts, setOpenCreateAccounts] = useState(false);
  const [openCreateCostCenters, setOpenCreateCostCenters] = useState(false);

  const [account, setAccount] = useState<AccountModel | null>(null);
  const [card, setCard] = useState<CardModel | null>(null);
  const [costCenter, setCostCenter] = useState<CostCenterModel | null>(null);

  const [accounts, setAccounts] = useState<AccountModel[]>([]);
  const [costCenters, setCostCenters] = useState<CostCenterModel[]>([]);
  const [transactionTotal, setTransactionTotal] = useState<{
    expense: number;
    income: number;
    totalExpense: number;
    totalIncome: number;
  }>({ expense: 0, income: 0, totalExpense: 0, totalIncome: 0 });

  async function getAccounts() {
    const data = (await api.get(`/accounts?month=${month}`)).data;
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
    getAccounts();
    getCostCenters();
    getTransactionsTotal();
  }, [
    openCreateAccounts,
    openCreateCards,
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

      <div className="flex flex-col gap-4">
        <CardTotal value={transactionTotal.totalIncome - transactionTotal.totalExpense} />

        <div className="flex items-center gap-4">
          <CardBalance
            title="Receita"
            icon={<ArrowUp size={16} />}
            value={transactionTotal.income}
            className="text-green-400 bg-green-900"
          />
          <CardBalance
            title="Despesa"
            icon={<ArrowDown size={16} />}
            value={transactionTotal.expense}
            className="text-red-400 bg-red-900"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-md mt-2">
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
            {accounts.length > 0 ? <PlusCircle size={20} /> : ""}
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
              className="flex flex-col items-center gap-2 rounded-md bg-slate-800 p-4 mt-1"
              onClick={() => {
                setAccount(null);
                setOpenCreateAccounts(!openCreateAccounts);
              }}
            >
              <PlusCircle />
              <span className="text-sm">Criar conta</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-md mt-2">
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
            {costCenters.length > 0 ? <PlusCircle size={20} /> : ""}
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
                total={transactionTotal.income}
                openModalCostCenterEdit={() => {
                  setCostCenter(costCenter);
                  setOpenCreateCostCenters(!openCreateCostCenters);
                }}
              />
            ))
          ) : (
            <button
              className="flex flex-col items-center gap-2 rounded-md bg-slate-800 p-4 mt-1"
              onClick={() => {
                setCostCenter(null);
                setOpenCreateCostCenters(!openCreateCostCenters);
              }}
            >
              <PlusCircle />
              <span className="text-sm">Criar centro de custo</span>
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
        openModalCards={() => {
          setCard(null);
          setOpenCreateCards(!openCreateCards);
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
      <CreateCards
        card={card}
        open={openCreateCards}
        onClose={() => setOpenCreateCards(false)}
      />
      <CreateCostCenters
        costCenter={costCenter}
        open={openCreateCostCenters}
        onClose={() => setOpenCreateCostCenters(false)}
        total={transactionTotal.income - transactionTotal.expense}
      />
    </main>
  );
}
