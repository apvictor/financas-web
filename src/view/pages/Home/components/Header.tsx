import { Line } from "../../../components/Line";
import { Calendar, User } from "@phosphor-icons/react";
import { useMonth } from "../../../../app/shared/hooks/useMonth";

interface Props {
  openModalFilterMonth: () => void;
}
export function Header({ openModalFilterMonth }: Props) {
  const { monthName } = useMonth();

  return (
    <header className="flex justify-between items-center gap-8">
      <button className="text-black rounded-full bg-success-100 p-2">
        <User size={16} weight="bold" />
      </button>

      <Line />

      <button
        className="text-white flex items-center gap-2"
        onClick={openModalFilterMonth}
      >
        {monthName}
        <Calendar size={32} weight="fill" />
      </button>
    </header>
  );
}
