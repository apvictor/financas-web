import {
  ArrowDownCircle,
  ArrowUpCircle,
  LayoutGrid,
  LucideLandmark,
  Plus,
} from "lucide-react";
import { DropdownMenu } from "../../../components/DropdownMenu";

interface Props {
  openModalIncome?: () => void;
  openModalExpense?: () => void;
  openModalAccounts?: () => void;
  openModalCostCenters?: () => void;
}
export function Fab({
  openModalAccounts,
  openModalCostCenters,
  openModalExpense,
  openModalIncome,
}: Props) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="bg-[#15C770] hover:bg-[#15c771c2] transition-colors p-2 bottom-5 right-5 fixed rounded-full">
          <Plus color="#FFF" size={24} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="">
        {openModalIncome && (
          <DropdownMenu.Item
            className="flex gap-4 items-center w-full"
            onSelect={openModalIncome}
          >
            <ArrowUpCircle className="text-teal-900" />
            Nova Receita
          </DropdownMenu.Item>
        )}
        {openModalExpense && (
          <DropdownMenu.Item
            onSelect={openModalExpense}
            className="flex gap-4 items-center w-full"
          >
            <ArrowDownCircle className="text-red-900" />
            Nova Despesa
          </DropdownMenu.Item>
        )}
        {openModalAccounts && (
          <DropdownMenu.Item
            onSelect={openModalAccounts}
            className="flex gap-4 items-center w-full"
          >
            <LucideLandmark className="text-blue-900" />
            Nova Conta
          </DropdownMenu.Item>
        )}
        {openModalCostCenters && (
          <DropdownMenu.Item
            onSelect={openModalCostCenters}
            className="flex gap-4 items-center w-full"
          >
            <LayoutGrid />
            Novo Centro de Custo
          </DropdownMenu.Item>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
