import { VisibilityValue } from "../../../components/VisibilityValue";

interface Props {
  name: string;
  value: number;
  type: string;
  paid: boolean;
  account: { name: string };
  openModalEditTransaction: () => void;
}
export function CardTransaction({
  name,
  value,
  type,
  paid,
  account,
  openModalEditTransaction,
}: Props) {
  return (
    <button
      className="flex items-center gap-3 bg-slate-800 w-full h-full p-4 py-2 rounded-lg"
      onClick={openModalEditTransaction}
    >
      <div className="flex flex-col flex-1 items-start  border-slate-900">
        <span className="text-sm">{name}</span>
        <span className="text-slate-500 text-xs">{account.name}</span>
      </div>

      <span
        className={`text-sm font-bold
        ${paid && "line-through decoration-white"}
        ${type === "INCOME" ? "text-success-500" : "text-danger-500"}`}
      >
        <VisibilityValue value={value} />
      </span>
    </button>
  );
}
