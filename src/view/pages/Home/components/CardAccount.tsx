import { getBank } from "../../../../app/helpers/bank";
import { AccountModel } from "../../../../app/models/AccountModel";
import { VisibilityValue } from "../../../components/VisibilityValue";

interface Props {
  account: AccountModel;
  openModalAccountEdit: () => void;
}
export function CardAccount({ account, openModalAccountEdit }: Props) {
  return (
    <button
      className="flex items-center justify-between w-full p-1"
      onClick={openModalAccountEdit}
    >
      <div className="flex items-center gap-2">
        <img
          alt={account.name}
          src={getBank(account.name)}
          className="h-8 w-8 rounded-full"
        />
        <span className="text-xs font-light">{account.name}</span>
      </div>
      <span className="font-bold">
        <VisibilityValue value={account.incomeTotal - account.expenseTotal} />
      </span>
    </button>
  );
}
