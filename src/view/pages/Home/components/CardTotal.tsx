import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../../helpers/formatCurrency";

interface Props {
  value: number;
}
export function CardTotal({ value }: Props) {
  const navigate = useNavigate();

  return (
    <button
      className="bg-[#1C1E21] flex-1 flex items-center gap-2 px-4 pr-1 py-2 rounded-md"
      onClick={() => navigate("/transactions")}
    >
      <div className="flex flex-col items-start w-full">
        <div className="flex justify-between items-center w-full">
          <span className="text-sm font-light">Saldo total</span>
          <ChevronRight size={20} />
        </div>
        <span
          className="font-bold text-xl"
          style={{ color: `${value >= 0 ? "#009D52" : "#E86161"}` }}
        >
          {formatCurrency(value)}
        </span>
      </div>
    </button>
  );
}
