import { Line } from "../../../components/Line";
import { IconCostCenter } from "../../../components/IconCostCenter";
import { formatCurrency } from "../../../../app/helpers/formatCurrency";

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
      className="flex items-center gap-3 bg-[#1E1E1E] w-full h-full p-2 px-3 rounded-xl"
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
        <span className="text-[#AAAAAA] text-[10px]">{account.name}</span>
      </div>

      <span
        className="text-xs"
        style={{
          color: `${transactionType === "INCOME" ? "#15C770" : "#E86161"}`,
        }}
      >
        {formatCurrency(value)}
      </span>
    </button>
  );
}
