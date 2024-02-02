import { ReactNode, createContext, useState } from "react";
import { date } from "../../../view/modals/FilterMonth/_validation";

interface MonthContextProps {
  monthName: string;
  month: string;
  setMonth(month: string): void;
}
export const MonthContext = createContext({} as MonthContextProps);

interface MonthProviderProps {
  children: ReactNode;
}
export function MonthProvider({ children }: MonthProviderProps) {
  const [month, setMonth] = useState(date);

  const [ano, mes] = month.split("-");

  const monthName = new Date(Number(ano), Number(mes) - 1)
    .toLocaleString("default", { month: "short" })
    .toString();

  return (
    <MonthContext.Provider value={{ month, monthName, setMonth }}>
      {children}
    </MonthContext.Provider>
  );
}
