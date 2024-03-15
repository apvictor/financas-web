import { Link } from "react-router-dom";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import { useToggle } from "../../../../app/shared/hooks/useToggle";
import { VisibilityValue } from "../../../components/VisibilityValue";

interface Props {
  value: number;
}
export function CardTotal({ value }: Props) {
  const { toggle, status } = useToggle();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl">
            <VisibilityValue value={value} />
          </span>
          <button onClick={toggle}>
            {status ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        <Link to={"/transactions"}>
          <ChevronRight />
        </Link>
      </div>
      <span className="text-white font-light text-sm">
        Saldo atual em contas
      </span>
    </div>
  );
}
