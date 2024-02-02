import { CalendarDays, MenuIcon } from "lucide-react";
import { Line } from "../../../components/Line";

interface Props {
  openModalFilterMonth: () => void;
  openMenu: () => void;
}
export function Header({ openModalFilterMonth, openMenu }: Props) {
  return (
    <>
      <header className="flex justify-between items-center gap-8">
        <button className="text-white" onClick={openMenu}>
          <MenuIcon />
        </button>

        <Line />

        <button className="text-white" onClick={openModalFilterMonth}>
          <CalendarDays />
        </button>
      </header>
    </>
  );
}
