import { IconCostCenter } from "../../../components/IconCostCenter";
import { formatCurrency } from "../../../../app/helpers/formatCurrency";

interface Props {
  title: string;
  limit: number;
  value: number;
  totalIncome: number;
}
export function CardCostCenter({ title, limit, value, totalIncome }: Props) {
  const valor_limite_gasto = (limit * totalIncome) / 100;
  const valor_gasto = value;
  const limite_excedido = valor_gasto > valor_limite_gasto;
  const porcentagem = (valor_gasto / valor_limite_gasto) * 100;

  return (
    <button className="bg-gray-900 flex flex-col items-center gap-6 p-3 rounded-md">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconCostCenter title={title} />
          <span className="text-sm text-gray-400">{title}</span>
        </div>
        <span
          className={`text-xs text-gray-400
          ${limite_excedido ? "text-expense-900" : "text-gray-400"}`}
        >
          {porcentagem.toString().length > 2
            ? porcentagem.toFixed(2)
            : porcentagem}
          %
        </span>
      </div>
      <div className="flex flex-col w-full gap-2">
        <div className="h-1 rounded-xl relative w-full">
          <div
            className={`h-1 rounded-xl
            ${limite_excedido ? "bg-expense-900" : "text-primary"}
            ${limite_excedido ? "max-w-full" : `w-[${porcentagem}]`}
            `}
          ></div>
        </div>
        <div className="flex justify-between items-center w-full text-xs">
          <span
            className={`font-bold
            ${limite_excedido ? "text-expense-900" : "text-white"}`}
          >
            {formatCurrency(
              limite_excedido ? valor_limite_gasto - valor_gasto : valor_gasto
            )}
          </span>
          <span className="text-gray-400">
            {formatCurrency(valor_limite_gasto)}
          </span>
        </div>
      </div>
    </button>
  );
}
