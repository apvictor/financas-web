import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../../app/helpers/formatCurrency";

interface Props {
  type: "INCOME" | "EXPENSE";
  value: number;
}
export function CardBalance({ type, value }: Props) {
  const navigate = useNavigate();

  return (
    <button
      className="bg-gray-800 flex-1 flex items-center gap-2 px-4 py-2 rounded-md"
      onClick={() => navigate(`/transactions?transactionType=${type}`)}
    >
      {type === "INCOME" ? (
        <div className="p-2 rounded-full text-[#009D52] bg-[#009D5263]">
          <ArrowUpCircle size={16} />
        </div>
      ) : (
        <div className="p-2 rounded-full text-[#E86161] bg-[#E8616163]">
          <ArrowDownCircle size={16} />
        </div>
      )}
      <div className="flex flex-col items-start">
        <span className="text-xs font-light">
          {type == "INCOME" ? "Receitas" : "Despesas"}
        </span>
        <span className="text-xs font-bold">{formatCurrency(value)}</span>
      </div>
    </button>
  );
}
