import {
  ArrowDownCircle,
  ArrowUpCircle,
  CreditCard,
  LayoutGrid,
  LucideLandmark,
  Plus,
} from "lucide-react";
import { DropdownMenu } from "../../../components/DropdownMenu";

interface Props {
  openModalIncome?: () => void;
  openModalExpense?: () => void;
  openModalCards?: () => void;
  openModalAccounts?: () => void;
  openModalCostCenters?: () => void;
}
export function Fab({
  openModalAccounts,
  openModalCards,
  openModalCostCenters,
  openModalExpense,
  openModalIncome,
}: Props) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="bg-primary hover:bg-tertiary text-white transition-all duration-500 p-2 bottom-5 right-5 fixed rounded-full">
          <Plus size={32} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
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
        {/* {openModalCards && (
          <DropdownMenu.Item
            onSelect={openModalCards}
            className="flex gap-4 items-center w-full"
          >
            <CreditCard className="text-yellow-500" />
            Novo Cartão
          </DropdownMenu.Item>
        )} */}
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
