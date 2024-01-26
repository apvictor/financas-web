import { IconCostCenter } from "../../../components/IconCostCenter";
import { formatCurrency } from "../../../../app/helpers/formatCurrency";

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
  const valor_limite_gasto = (limit * total) / 100;
  const valor_gasto = value;
  const limite_excedido = valor_gasto > valor_limite_gasto;
  const porcentagem = (valor_gasto / valor_limite_gasto) * 100;

  return (
    <button
      onClick={openModalCostCenterEdit}
      className="bg-[#1C1E21] flex flex-col items-center gap-4 p-3 rounded-md"
    >
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconCostCenter title={title} />
          <span className="text-sm text-white">{title}</span>
        </div>
        <span
          className="text-xs"
          style={{
            color: `${limite_excedido ? "#E86161" : "#FFF"}`,
          }}
        >
          {porcentagem.toString().length > 2
            ? porcentagem.toFixed(2)
            : porcentagem}
          %
        </span>
      </div>
      <div className="flex flex-col w-full gap-4">
        <div className="bg-[#343A40] h-2 rounded-xl relative w-full">
          <div
            className="h-2 rounded-xl relative"
            style={{
              width: `${limite_excedido ? 100 : porcentagem}%`,
              backgroundColor: `${limite_excedido ? "#E86161" : "#15C770"}`,
            }}
          >
            {porcentagem > 18 && (
              <span
                className="absolute right-0 bottom-[-6px] text-[10px] rounded-lg p-0.5 bg-[#343A40] border"
                style={{
                  borderColor: `${limite_excedido ? "#E86161" : "#15C770"}`,
                }}
              >
                {formatCurrency(valor_gasto)}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center w-full text-xs">
          <span style={{ color: `${limite_excedido ? "#E86161" : "#FFF"}` }}>
            {formatCurrency(valor_limite_gasto - valor_gasto)}
          </span>
          <span className="text-white">
            {formatCurrency(valor_limite_gasto)}
          </span>
        </div>
      </div>
    </button>
  );
}
