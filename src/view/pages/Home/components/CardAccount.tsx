import { Line } from "../../../components/Line";
import { getBank } from "../../../../app/helpers/bank";
import { AccountModel } from "../../../../app/models/AccountModel";
import { VisibilityValue } from "../../../components/VisibilityValue";

interface Props {
  account: AccountModel;
  openModalAccountEdit: () => void;
}
export function CardAccount({ account, openModalAccountEdit }: Props) {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <Line />

      <button
        className="flex items-center justify-between w-full"
        onClick={openModalAccountEdit}
      >
        <div className="flex items-center gap-2">
          <img
            alt={account.name}
            src={getBank(account.name)}
            className="h-9 w-9 rounded-full"
          />
          <span className="text-xs">{account.name}</span>
        </div>
        <span className="font-bold text-sm">
          <VisibilityValue value={account.incomeTotal - account.expenseTotal} />
        </span>
      </button>
    </div>
  );
}
