import { Line } from "../../../components/Line";
import { getBank } from "../../../../app/helpers/bank";
import { AccountModel } from "../../../../app/models/AccountModel";
import { formatCurrency } from "../../../../app/helpers/formatCurrency";

interface Props {
  account: AccountModel;
  openModalAccountEdit: () => void;
}
export function CardAccount({ account, openModalAccountEdit }: Props) {
  return (
    <>
      <Line />

      <button
        className="flex items-center justify-between w-full"
        onClick={openModalAccountEdit}
      >
        <div className="flex items-center gap-2">
          <div
            className="h-7 w-7 rounded-full"
            style={{
              backgroundImage: `url(${getBank(account.name)})`,
              backgroundSize: "cover",
            }}
          ></div>
          <span className="text-xs">{account.name}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-light">
            na conta{" "}
            <span className="font-bold">{formatCurrency(account.value)}</span>
          </span>
          <span className="font-bold text-sm">
            {formatCurrency(
              account.value + account.incomeTotal - account.expenseTotal
            )}
          </span>
        </div>
      </button>
    </>
  );
}
