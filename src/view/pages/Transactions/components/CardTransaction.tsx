import { IconCostCenter } from "../../../components/IconCostCenter";
import { VisibilityValue } from "../../../components/VisibilityValue";

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
  return (
    <button
      className="flex items-center gap-3 bg-slate-800 w-full h-full p-3 rounded-md"
      onClick={openModalEditTransaction}
    >
      <IconCostCenter title={transactionType} />

      <div className="flex flex-col flex-1 items-start bottom-0 border-l-2 border-slate-900 pl-3">
        <span className="text-xs">{name}</span>
        <span className="text-gray-400 text-[10px]">
          {transactionType == "INCOME" ? "Entrada" : `${costCenter.name}`}
        </span>
      </div>

      <div className="flex flex-col items-end">
        <span
          className={`text-xs
        ${transactionType === "INCOME" ? "text-primary" : "text-expense-900"}`}
        >
          <VisibilityValue value={value} />
        </span>
        <span className="text-gray-400 text-[10px]">{account.name}</span>
      </div>
    </button>
  );
}
