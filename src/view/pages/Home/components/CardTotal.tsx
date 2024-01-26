import { Link } from "react-router-dom";
import { ChevronRight, Eye } from "lucide-react";
import { formatCurrency } from "../../../../app/helpers/formatCurrency";

interface Props {
  value: number;
}
export function CardTotal({ value }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-[#AAA] text-sm">Saldo atual em contas</p>
        <Link to={"/transactions"}>
          <ChevronRight />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <h1 className="font-bold text-2xl">{formatCurrency(value)}</h1>
        <button>
          <Eye size={20} />
        </button>
      </div>
    </div>
  );
}
