import { ReactNode, createContext, useCallback, useState } from "react";

interface ToggleContextProps {
  status: boolean;
  toggle(): void;
}
export const ToggleContext = createContext({} as ToggleContextProps);

interface ToggleProviderProps {
  children: ReactNode;
}
export function ToggleProvider({ children }: ToggleProviderProps) {
  const [status, setStatus] = useState(true);

  const toggle = useCallback(() => {
    setStatus((prevState) => !prevState);
  }, []);

  return (
    <ToggleContext.Provider value={{ toggle, status }}>
      {children}
    </ToggleContext.Provider>
  );
}
