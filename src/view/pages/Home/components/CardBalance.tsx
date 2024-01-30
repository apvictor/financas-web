import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { useToggle } from "../../../../app/shared/hooks/useToggle";
import { formatCurrency } from "../../../../app/helpers/formatCurrency";

interface Props {
  type: "INCOME" | "EXPENSE";
  value: number;
}
export function CardBalance({ type, value }: Props) {
  const { status } = useToggle();

  return (
    <div className="bg-gray-800 flex-1 flex items-center gap-2 px-4 py-2 rounded-md">
      {type === "INCOME" ? (
        <div className="p-2 rounded-full text-secondary bg-tertiary">
          <ArrowUpCircle size={16} />
        </div>
      ) : (
        <div className="p-2 rounded-full text-expense-900 bg-expense-800">
          <ArrowDownCircle size={16} />
        </div>
      )}
      <div className="flex flex-col items-start">
        <span className="text-xs font-light">
          {type == "INCOME" ? "Receitas" : "Despesas"}
        </span>
        <span className="text-xs font-bold">
          {!status ? (
            <span>•••••••</span>
          ) : (
            <span>{formatCurrency(value)}</span>
          )}
        </span>
      </div>
    </div>
  );
}
