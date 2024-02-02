import { useToggle } from "../../../../app/shared/hooks/useToggle";
import { IconCostCenter } from "../../../components/IconCostCenter";
import { formatCurrency } from "../../../../app/helpers/formatCurrency";
import { Line } from "../../../components/Line";

interface Props {
  title: string;
  limit: number;
  value: number;
  total: number;
  openModalCostCenterEdit: () => void;
}
export function CardCostCenter({
  title,
  limit,
  value,
  total,
  openModalCostCenterEdit,
}: Props) {
  const { status } = useToggle();

  const valor_limite_gasto = (limit * total) / 100;
  const valor_gasto = value;
  const limite_excedido = valor_gasto > valor_limite_gasto;
  const porcentagem = (valor_gasto / valor_limite_gasto) * 100;

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Line />

      <button
        className="flex flex-col items-center justify-between gap-4"
        onClick={openModalCostCenterEdit}
      >
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconCostCenter title={title} />
            <span className="text-sm text-white">{title}</span>
          </div>
          <span
            className={`text-xs
          ${limite_excedido ? "text-expense-900" : "text-white"}`}
          >
            {isNaN(porcentagem) ? 0 : porcentagem}%
          </span>
        </div>
        <div className="flex flex-col w-full gap-4">
          <div className="bg-gray-900 h-2 rounded-xl relative w-full">
            <div
              className={`h-2 rounded-xl relative
              ${limite_excedido ? "bg-expense-900" : "bg-primary"}`}
              style={{
                width: `${
                  limite_excedido ? 100 : isNaN(porcentagem) ? 0 : porcentagem
                }%`,
              }}
            >
              {porcentagem > 18 && (
                <span
                  className={`absolute right-0 bottom-[-6px] text-[10px] rounded-lg p-0.5 bg-gray-800 border
                  ${limite_excedido ? "border-expense-900" : "border-primary"}
                  `}
                >
                  {!status ? (
                    <span>•••••••</span>
                  ) : (
                    <span>{formatCurrency(valor_gasto)}</span>
                  )}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center w-full text-xs">
            <span
              className={`flex justify-between items-center w-full text-xs
            ${limite_excedido ? "text-expense-900" : "text-white"}`}
            >
              {!status ? (
                <span>•••••••</span>
              ) : (
                <span>{formatCurrency(valor_gasto)}</span>
              )}
            </span>
            <span className="text-white">
              {!status ? (
                <span>•••••••</span>
              ) : (
                <span>{formatCurrency(valor_limite_gasto)}</span>
              )}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}
