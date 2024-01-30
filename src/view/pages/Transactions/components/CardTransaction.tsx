import { Line } from "../../../components/Line";
import { IconCostCenter } from "../../../components/IconCostCenter";
import { formatCurrency } from "../../../../app/helpers/formatCurrency";
import { useContext } from "react";
import { ToggleContext } from "../../../../app/shared/contexts/ToggleContext";

interface Props {
  name: string;
  value: number;
  transactionType: string;
  account: { name: string };
  costCenter: { name: string };
  openModalEditTransaction: () => void;
}
export function CardTransaction({
  name,
  value,
  transactionType,
  account,
  costCenter,
  openModalEditTransaction,
}: Props) {
  const { status } = useContext(ToggleContext);

  return (
    <button
      className="flex items-center gap-3 bg-gray-800 w-full h-full p-2 px-3 rounded-md"
      onClick={openModalEditTransaction}
    >
      {
        <IconCostCenter
          title={costCenter ? costCenter.name : transactionType}
        />
      }

      <div>
        <Line />
      </div>

      <div className="flex flex-col flex-1 items-start">
        <span className="text-xs">{name}</span>
        <span className="text-gray-400 text-[10px]">{account.name}</span>
      </div>

      <span
        className={`text-xs
        ${transactionType === "INCOME" ? "text-primary" : "text-expense-900"}`}
      >
        {!status ? <span>•••••••</span> : <span>{formatCurrency(value)}</span>}
      </span>
    </button>
  );
}
