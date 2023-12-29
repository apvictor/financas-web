import {
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronRight,
  Eye,
  Menu,
  Plus,
  User2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CreateTransactions } from "../../modals/CreateTransactions";
import { CardCostCenter } from "./components/CardCostCenter";
import { api } from "../../../services/api";
import { formatCurrency } from "../../../helpers/formatCurrency";

interface CostCenterModel {
  id: number;
  name: string;
  value: number;
  percentage: number;
}

export function Home() {
  const [open, setOpen] = useState(false);
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
  }, [open]);

  return (
    <main className="p-8 flex flex-col gap-8">
      <header className="flex justify-between items-center gap-8">
        <button>
          <Menu />
        </button>

        <span className="border border-solid w-full border-white/15"></span>

        <div className="p-1 bg-[#B2F2BB] rounded-full">
          <User2 size={20} className="text-black" />
        </div>
      </header>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-[#AAA] text-sm">Saldo atual em contas</p>
          <button>
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
          <span className="text-[#15C770]">
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

      <button
        onClick={() => setOpen(!open)}
        className="bg-[#15C770] hover:bg-[#15c771c2] transition-colors p-2 bottom-5 right-5 fixed rounded-full"
      >
        <Plus color="#212529" size={20} />
      </button>

      <CreateTransactions open={open} onClose={() => setOpen(false)} />
    </main>
  );
}
