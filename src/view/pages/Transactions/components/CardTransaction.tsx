import { formatCurrency } from "../../../../helpers/formatCurrency";
import { IconCostCenter } from "../../../components/IconCostCenter";

interface Props {
  name: string;
  value: number;
  transactionType: string;
  account: { name: string };
  costCenter: { name: string };
}
export function CardTransaction({
  name,
  value,
  transactionType,
  account,
  costCenter,
}: Props) {

  return (
    <div className="flex items-center gap-5 bg-[#1E1E1E] w-full h-full p-4 rounded-xl">
      {(
        <IconCostCenter
          title={costCenter ? costCenter.name : transactionType}
        />
      )}

      <div>
        <span className="border border-solid border-white/15 rotate-90"></span>
      </div>

      <div className="flex flex-col flex-1">
        <span className="text-sm">{name}</span>
        <span className="text-[#AAAAAA] text-xs">{account.name}</span>
      </div>

      <span
        className="text-xs"
        style={{
          color: `${transactionType === "INCOME" ? "#15C770" : "#E86161"}`,
        }}
      >
        {formatCurrency(value)}
      </span>
    </div>
  );
}
