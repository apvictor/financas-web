import { DollarSign } from "lucide-react";
import { formatCurrency } from "../../../../helpers/formatCurrency";
import { useNavigate, createSearchParams } from "react-router-dom";

interface Props {
  type: "INCOME" | "EXPENSE";
  value: number;
}
export function CardBalance({ type, value }: Props) {
  const navigate = useNavigate();

  return (
    <button
      className="bg-[#1C1E21] flex-1 flex items-center gap-2 px-4 py-2 rounded-md"
      onClick={() => navigate(`/transactions?transactionType=${type}`)}
      // onClick={() =>
      //   navigate({
      //     pathname: "/transactions",
      //     search: createSearchParams({ transactionType: type }).toString(),
      //   })
      // }
    >
      <div
        className="p-2 rounded-lg"
        style={{ background: `${type == "INCOME" ? "#CBFFF6" : "#FFD1D1"}` }}
      >
        <DollarSign
          size={16}
          style={{ color: `${type == "INCOME" ? "#009D52" : "#E86161"}` }}
        />
      </div>
      <div className="flex flex-col items-start">
        <span className="text-xs font-light">
          {type == "INCOME" ? "Receitas" : "Despesas"}
        </span>
        <span className="text-xs font-bold">{formatCurrency(value)}</span>
      </div>
    </button>
  );
}
