import { Line } from "../../../components/Line";
import { CalendarDays, MenuIcon } from "lucide-react";
import { useMonth } from "../../../../app/shared/hooks/useMonth";

interface Props {
  openModalFilterMonth: () => void;
  openMenu: () => void;
}
export function Header({ openModalFilterMonth, openMenu }: Props) {
  const { monthName } = useMonth();

  return (
    <header className="flex justify-between items-center gap-8">
      <button className="text-white" onClick={openMenu}>
        <MenuIcon />
      </button>

      <Line />

      <button className="text-white flex gap-2" onClick={openModalFilterMonth}>
        {monthName}
        <CalendarDays />
      </button>
    </header>
  );
}
