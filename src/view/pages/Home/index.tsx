import {
  ArrowDownCircle,
  ArrowUpCircle,
  Bell,
  ChevronRight,
  Eye,
  LayoutGrid,
  LucideLandmark,
  Plus,
  User2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CreateIncome } from "../../modals/CreateIncome";
import { CardCostCenter } from "./components/CardCostCenter";
import { api } from "../../../services/api";
import { formatCurrency } from "../../../helpers/formatCurrency";
import { DropdownMenu } from "../../components/DropdownMenu";
import { CreateAccounts } from "../../modals/CreateAccounts";
import { CreateExpense } from "../../modals/CreateExpense";
import { CreateCostCenters } from "../../modals/CreateCostCenters";
import { useNavigate } from "react-router-dom";

interface CostCenterModel {
  id: number;
  name: string;
  value: number;
  percentage: number;
}
export function Home() {
  const navigate = useNavigate();

  const [openCreateIncome, setOpenCreateIncome] = useState(false);
  const [openCreateExpense, setOpenCreateExpense] = useState(false);
  const [openCreateAccounts, setOpenCreateAccounts] = useState(false);
  const [openCreateCostCenters, setOpenCreateCostCenters] = useState(false);

  const [account, setAccount] = useState<{
    total: number;
    totalInvestment: number;
  }>({ total: 0, totalInvestment: 0 });
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
    <main className="p-8 flex flex-col gap-8">
      <header className="flex justify-between items-center gap-8">
        <div className="p-1 bg-[#B2F2BB] rounded-full">
          <User2 size={20} className="text-black" />
        </div>

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
            {formatCurrency(account.total)}
          </h1>
          <button>
            <Eye size={20} />
          </button>
        </div>
        <div className="text-xs flex gap-1">
          <p className="text-[#AAA]">Você vem investindo</p>
          <span className="text-[#15C770] font-semibold">
            {formatCurrency(account.totalInvestment)}
          </span>
        </div>
      </div>

      <span className="border border-solid w-full border-white/15"></span>

      <div className="flex flex-col gap-2">
        <p className="text-[#AAA] text-sm">Balanços</p>
        <div className="flex items-center gap-4">
          <button className="bg-[#1C1E21] text-[#E86161] flex-1 flex items-center justify-center gap-2 p-3 py-4 rounded-md">
            <ArrowDownCircle size={16} />
            <span className="text-xs">
              {formatCurrency(transactionTotal.expense)}
            </span>
          </button>
          <button className="bg-[#1C1E21] text-[#15C770] flex-1 flex items-center justify-center gap-2 p-3 py-4 rounded-md">
            <ArrowUpCircle size={16} />
            <span className="text-xs">
              {formatCurrency(transactionTotal.income)}
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-9">
        <p className="text-[#AAA] text-sm">Centros de custo</p>
        <div className="w-full flex-col gap-4 flex">
          {costCenters.map((costCenter) => (
            <CardCostCenter
              key={costCenter.id}
              totalIncome={transactionTotal.income}
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
              className="flex gap-4 items-center"
            >
              <ArrowUpCircle className="text-teal-900" />
              Nova Receita
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <button
              onClick={() => setOpenCreateExpense(!openCreateExpense)}
              className="flex gap-4 items-center"
            >
              <ArrowDownCircle className="text-red-900" />
              Nova Despesa
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <button
              onClick={() => setOpenCreateAccounts(!openCreateAccounts)}
              className="flex gap-4 items-center"
            >
              <LucideLandmark className="text-blue-900" />
              Nova Conta
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <button
              onClick={() => setOpenCreateCostCenters(!openCreateCostCenters)}
              className="flex gap-4 items-center"
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
