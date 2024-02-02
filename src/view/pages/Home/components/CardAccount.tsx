import { Line } from "../../../components/Line";
import { getBank } from "../../../../app/helpers/bank";
import { AccountModel } from "../../../../app/models/AccountModel";
import { useToggle } from "../../../../app/shared/hooks/useToggle";
import { formatCurrency } from "../../../../app/helpers/formatCurrency";

interface Props {
  account: AccountModel;
  openModalAccountEdit: () => void;
}
export function CardAccount({ account, openModalAccountEdit }: Props) {
  const { status } = useToggle();

  return (
    <div className="flex flex-col gap-4 mt-2">
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
        <span className="font-bold text-sm">
          {!status ? (
            <span>•••••••</span>
          ) : (
            <span>
              {formatCurrency(account.incomeTotal - account.expenseTotal)}
            </span>
          )}
        </span>
      </button>
    </div>
  );
}
