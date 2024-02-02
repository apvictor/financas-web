import { ReactNode, createContext, useEffect, useState } from "react";
import { date } from "../../../view/modals/FilterMonth/_validation";

interface MonthContextProps {
  month: string;
  setMonth(month: string): void;
}
export const MonthContext = createContext({} as MonthContextProps);

interface MonthProviderProps {
  children: ReactNode;
}
export function MonthProvider({ children }: MonthProviderProps) {
  const [month, setMonth] = useState(date);

  console.log(month);

  useEffect(() => {
    setMonth(date);
  }, []);

  return (
    <MonthContext.Provider value={{ month, setMonth }}>
      {children}
    </MonthContext.Provider>
  );
}
