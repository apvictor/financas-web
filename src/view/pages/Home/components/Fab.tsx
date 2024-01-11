import {
  ArrowDownCircle,
  ArrowUpCircle,
  LayoutGrid,
  LucideLandmark,
  Plus,
} from "lucide-react";
import { DropdownMenu } from "../../../components/DropdownMenu";

interface Props {
  openModalIncome: () => void;
  openModalExpense: () => void;
  openModalAccounts: () => void;
  openModalCostCenters: () => void;
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
          <Plus color="#FFF" size={24}  />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="">
        <DropdownMenu.Item>
          <button
            onClick={() => openModalIncome()}
            className="flex gap-4 items-center w-full"
          >
            <ArrowUpCircle className="text-teal-900" />
            Nova Receita
          </button>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <button
            onClick={() => openModalExpense()}
            className="flex gap-4 items-center w-full"
          >
            <ArrowDownCircle className="text-red-900" />
            Nova Despesa
          </button>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <button
            onClick={() => openModalAccounts()}
            className="flex gap-4 items-center w-full"
          >
            <LucideLandmark className="text-blue-900" />
            Nova Conta
          </button>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <button
            onClick={() => openModalCostCenters()}
            className="flex gap-4 items-center w-full"
          >
            <LayoutGrid />
            Novo Centro de Custo
          </button>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
