import { ChevronLeft, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { formatCurrency } from "../../../helpers/formatCurrency";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { CardTransaction } from "./components/CardTransaction";
import { formatDate } from "../../../helpers/formatDate";

export function Transactions() {
  const navigate = useNavigate();

  const [account, setAccount] = useState<{
    total: number;
    totalInvestment: number;
  }>({ total: 0, totalInvestment: 0 });

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

  async function getTotalAccounts() {
    const data = (await api.get("/accounts/total")).data;
    setAccount(data);
  }

  async function getTransactions(search?: string) {
    const data = (await api.get(`/transactions?search=${search ?? ""}`)).data;
    setTransactions(data);
  }

  useEffect(() => {
    getTransactions();
    getTotalAccounts();
  }, []);

  return (
    <main className="p-8 flex flex-col gap-8">
      <header className="flex justify-between items-center gap-8">
        <button className="text-white" onClick={() => navigate("/home")}>
          <ChevronLeft size={20} />
        </button>

        <span className="text-[#AAA] text-xl">Transações</span>

        <button className="invisible">
          <ChevronLeft size={20} />
        </button>
      </header>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-[#AAA] text-sm">Saldo atual em contas</p>
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

      <Input
        type="search"
        name="search"
        placeholder="Pesquisar"
        onChange={(ev) => {
          getTransactions(ev.target.value);
        }}
      />

      <div className="flex flex-col gap-4">
        {transactions.map((item) => (
          <div key={item.date} className="flex flex-col gap-2">
            <span className="text-[#AAA]">{formatDate(item.date)}</span>
            {item.transactions.map((transaction) => (
              <CardTransaction key={transaction.id} {...transaction} />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
