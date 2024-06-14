import { CurrencyDollar, Bank, Plus } from "@phosphor-icons/react";
import { DropdownMenu } from "../../../components/DropdownMenu";

interface Props {
  openModalIncome?: () => void;
  openModalExpense?: () => void;
  openModalAccounts?: () => void;
}
export function Fab({
  openModalAccounts,
  openModalExpense,
  openModalIncome,
}: Props) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="bg-success-500 hover:bg-success-500/50 text-white transition-all duration-500 p-2 bottom-5 right-5 absolute rounded-full">
          <Plus size={28} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {openModalIncome && (
          <DropdownMenu.Item
            className="flex gap-4 items-center w-full"
            onSelect={openModalIncome}
          >
            <CurrencyDollar className="text-success-500" weight="bold" />
            Nova Receita
          </DropdownMenu.Item>
        )}
        {openModalExpense && (
          <DropdownMenu.Item
            onSelect={openModalExpense}
            className="flex gap-4 items-center w-full"
          >
            <CurrencyDollar className="text-danger-500" weight="bold" />
            Nova Despesa
          </DropdownMenu.Item>
        )}
        {openModalAccounts && (
          <DropdownMenu.Item
            onSelect={openModalAccounts}
            className="flex gap-4 items-center w-full"
          >
            <Bank className="text-slate-900" weight="bold" />
            Nova Conta
          </DropdownMenu.Item>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
