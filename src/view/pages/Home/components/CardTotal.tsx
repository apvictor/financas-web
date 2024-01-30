import { Link } from "react-router-dom";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import { useToggle } from "../../../../app/shared/hooks/useToggle";
import { formatCurrency } from "../../../../app/helpers/formatCurrency";

interface Props {
  value: number;
}
export function CardTotal({ value }: Props) {
  const { toggle, status } = useToggle();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-white text-sm">Saldo atual em contas</p>
        <Link to={"/transactions"}>
          <ChevronRight />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-2xl">
          {!status ? <span>•••••••</span> : <span>{formatCurrency(value)}</span>}
        </span>
        <button onClick={toggle}>
          {status ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>
    </div>
  );
}
