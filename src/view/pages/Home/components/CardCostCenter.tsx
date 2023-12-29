import { formatCurrency } from "../../../../helpers/formatCurrency";
import { GraduationCap, HomeIcon, LineChart, Pizza } from "lucide-react";

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
    <button className="bg-[#1C1E21] flex flex-col items-center gap-6 p-3 rounded-md">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          {title.toUpperCase() === "CASA" && (
            <div className="p-1.5 bg-[#A5D8FF] rounded-full">
              <HomeIcon color="#1C7ED6" size={16} />
            </div>
          )}
          {title.toUpperCase() === "INVESTIMENTOS" && (
            <div className="p-1.5 bg-[#FFE1E1] rounded-full">
              <LineChart color="#FF6E6E" size={16} />
            </div>
          )}
          {title.toUpperCase() === "EDUCAÇÃO" && (
            <div className="p-1.5 bg-[#98FFED] rounded-full">
              <GraduationCap color="#196D5D" size={16} />
            </div>
          )}
          {title.toUpperCase() === "LAZER" && (
            <div className="p-1.5 bg-[#FFE3C8] rounded-full">
              <Pizza color="#FF7A00" size={16} />
            </div>
          )}
          <span className="text-sm text-[#AAA]">{title}</span>
        </div>
        <span
          className="text-xs text-[#AAA]"
          style={{
            color: `${limite_excedido ? "#E86161" : "#AAA"}`,
          }}
        >
          {porcentagem.toString().length > 2
            ? porcentagem.toFixed(2)
            : porcentagem}
          %
        </span>
      </div>
      <div className="flex flex-col w-full gap-2">
        <div
          className="bg-[#343A40] h-1 rounded-xl relative"
          style={{
            width: `100%`,

          }}
        >
          <div
            className="h-1 rounded-xl"
            style={{
              width: `${limite_excedido ? 100 : porcentagem}%`,
              backgroundColor: `${limite_excedido ? "#E86161" : "#15C770"}`,
            }}
          ></div>
        </div>
        <div className="flex justify-between items-center w-full text-xs">
          <span
            className="font-bold"
            style={{
              color: `${limite_excedido ? "#E86161" : "#FFF"}`,
            }}
          >
            {formatCurrency(
              limite_excedido ? valor_limite_gasto - valor_gasto : valor_gasto
            )}
          </span>
          <span className="text-[#AAA]">
            {formatCurrency(valor_limite_gasto)}
          </span>
        </div>
      </div>
    </button>
  );
}
