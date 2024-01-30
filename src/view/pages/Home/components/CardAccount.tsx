import { useContext } from "react";
import { Line } from "../../../components/Line";
import { getBank } from "../../../../app/helpers/bank";
import { AccountModel } from "../../../../app/models/AccountModel";
import { formatCurrency } from "../../../../app/helpers/formatCurrency";
import { ToggleContext } from "../../../../app/shared/contexts/ToggleContext";

interface Props {
  account: AccountModel;
  openModalAccountEdit: () => void;
}
export function CardAccount({ account, openModalAccountEdit }: Props) {
  const { status } = useContext(ToggleContext);

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
            {!status ? (
              <span>•••••••</span>
            ) : (
              <span>{formatCurrency(account.value)}</span>
            )}
          </span>
          <span className="font-bold text-sm">
            {!status ? (
              <span>•••••••</span>
            ) : (
              <span>
                {formatCurrency(
                  account.value + account.incomeTotal - account.expenseTotal
                )}
              </span>
            )}
          </span>
        </div>
      </button>
    </>
  );
}
