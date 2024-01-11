import {
  ArrowDownCircle,
  ArrowUpCircle,
  Bell,
  ChevronRight,
  DollarSign,
  DoorOpen,
  Eye,
  LayoutGrid,
  LucideLandmark,
  Plus,
  User2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/useAuth";
import { CreateIncome } from "../../modals/CreateIncome";
import { CreateExpense } from "../../modals/CreateExpense";
import { CardCostCenter } from "./components/CardCostCenter";
import { DropdownMenu } from "../../components/DropdownMenu";
import { CreateAccounts } from "../../modals/CreateAccounts";
import { formatCurrency } from "../../../helpers/formatCurrency";
import { CreateCostCenters } from "../../modals/CreateCostCenters";

interface CostCenterModel {
  id: number;
  name: string;
  value: number;
  percentage: number;
}
export function Home() {
  const { signOut } = useAuth();

  const navigate = useNavigate();

  const [openCreateIncome, setOpenCreateIncome] = useState(false);
  const [openCreateExpense, setOpenCreateExpense] = useState(false);
  const [openCreateAccounts, setOpenCreateAccounts] = useState(false);
  const [openCreateCostCenters, setOpenCreateCostCenters] = useState(false);

  const [account, setAccount] = useState<{ total: number }>({ total: 0 });
  const [costCenters, setCostCenters] = useState<CostCenterModel[]>([]);
  const [transactionTotal, setTransactionTotal] = useState<{
    expense: number;
    income: number;
  }>({ expense: 0, income: 0 });

  async function getTotalAccounts() {
    const data = (await api.get("/accounts/total")).data;
    setAccount(data);
  }

  async function getCostCenters() {
    const data = (await api.get("/cost-centers?transactionType=EXPENSE")).data;
    setCostCenters(data);
  }

  async function getTransactionsTotal() {
    const data = (await api.get("/transactions/total")).data;
    setTransactionTotal(data);
  }

  useEffect(() => {
    getTotalAccounts();
    getCostCenters();
    getTransactionsTotal();
  }, [
    openCreateAccounts,
    openCreateCostCenters,
    openCreateExpense,
    openCreateIncome,
  ]);

  return (
    <main className="p-8 flex flex-col gap-6">
      <header className="flex justify-between items-center gap-8">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button className="p-1 bg-[#B2F2BB] rounded-full">
              <User2 size={20} className="text-black" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>
              <button
                onClick={() => signOut()}
                className="flex gap-4 items-center w-full font-bold"
              >
                <DoorOpen />
                Sair
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <span className="border border-solid w-full border-white/15"></span>

        <button>
          <Bell />
        </button>
      </header>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-[#AAA] text-sm">Saldo atual em contas</p>
          <button onClick={() => navigate("/transactions")}>
            <ChevronRight />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-2xl">
            {formatCurrency(
              account.total + transactionTotal.income - transactionTotal.expense
            )}
          </h1>
          <button>
            <Eye size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <button className="bg-[#1C1E21] flex-1 flex items-center gap-2 px-4 py-2 rounded-md">
            <div className="bg-[#CBFFF6] p-2 rounded-lg">
              <DollarSign size={16} color="#009D52" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs font-light">Receitas</span>
              <span className="text-xs font-bold">
                {formatCurrency(transactionTotal.income)}
              </span>
            </div>
          </button>
          <button className="bg-[#1C1E21] flex-1 flex items-center gap-2 px-4 py-2 rounded-md">
            <div className="bg-[#FFD1D1] p-2 rounded-lg">
              <DollarSign size={16} color="#E86161" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs font-light">Despesas</span>
              <span className="text-xs font-bold">
                {formatCurrency(transactionTotal.expense)}
              </span>
            </div>
          </button>
        </div>
      </div>

      <span className="border border-solid w-full border-white/15"></span>

      <div className="flex flex-col gap-2 mb-9">
        <p className="text-[#AAA] text-sm">Centros de custo</p>
        <div className="w-full flex-col gap-4 flex">
          {costCenters.map((costCenter) => (
            <CardCostCenter
              key={costCenter.id}
              total={account.total}
              title={costCenter.name}
              limit={costCenter.percentage}
              value={costCenter.value}
            />
          ))}
        </div>
      </div>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className="bg-[#15C770] hover:bg-[#15c771c2] transition-colors p-2 bottom-5 right-5 fixed rounded-full">
            <Plus color="#212529" size={24} />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>
            <button
              onClick={() => setOpenCreateIncome(!openCreateIncome)}
              className="flex gap-4 items-center w-full"
            >
              <ArrowUpCircle className="text-teal-900" />
              Nova Receita
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <button
              onClick={() => setOpenCreateExpense(!openCreateExpense)}
              className="flex gap-4 items-center w-full"
            >
              <ArrowDownCircle className="text-red-900" />
              Nova Despesa
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <button
              onClick={() => setOpenCreateAccounts(!openCreateAccounts)}
              className="flex gap-4 items-center w-full"
            >
              <LucideLandmark className="text-blue-900" />
              Nova Conta
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <button
              onClick={() => setOpenCreateCostCenters(!openCreateCostCenters)}
              className="flex gap-4 items-center w-full"
            >
              <LayoutGrid />
              Novo Centro de Custo
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

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
        open={openCreateCostCenters}
        onClose={() => setOpenCreateCostCenters(false)}
      />
    </main>
  );
}
