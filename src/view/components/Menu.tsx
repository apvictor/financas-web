import {
  CreditCard,
  DoorClosed,
  DoorOpen,
  LayoutDashboard,
  LineChart,
  Wallet,
  X,
} from "lucide-react";
import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useAuth } from "../../app/shared/hooks/useAuth";
import { initialName } from "../../app/helpers/initialName";
import { Line } from "./Line";

interface Props {
  open: boolean;
  onClose(): void;
}
export function Menu({ open, onClose }: Props) {
  const { signOut, user } = useAuth();

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />

        <Dialog.Content className="fixed w-full bg-gray-900 border-2 border-gray-700 p-6 max-w-[90%] h-full left-0 bottom-0 rounded-r-3xl data-[state=open]:animate-modal-l-open data-[state=closed]:animate-modal-l-close">
          <header className="h-12 flex items-center justify-between gap-4">
            <button className="flex justify-center items-center gap-4 uppercase font-bold">
              <button className="h-10 w-10 bg-primary rounded-full text-white">
                {initialName(user.name)}
              </button>
              <div>{user.name}</div>
            </button>
            <button
              onClick={onClose}
              className="h-12 w-12 flex items-center justify-center outline-none text-white"
            >
              <X className="cursor-pointer" />
            </button>
          </header>

          <main className="py-4 pb-14 flex flex-col flex-1 items-center justify-between h-full">
            <div className="w-full flex flex-col gap-4">
              <Line />
              <button className="flex gap-4 items-center bg-gray-600 hover:bg-tertiary transition-all duration-500 p-4 rounded-lg">
                <CreditCard />
                Cartões
              </button>
              <button className="flex gap-4 items-center bg-gray-600 hover:bg-tertiary transition-all duration-500 p-4 rounded-lg">
                <LayoutDashboard />
                Centros de Custo
              </button>
              <button className="flex gap-4 items-center bg-gray-600 hover:bg-tertiary transition-all duration-500 p-4 rounded-lg">
                <Wallet />
                Contas
              </button>
              <button className="flex gap-4 items-center bg-gray-600 hover:bg-tertiary transition-all duration-500 p-4 rounded-lg">
                <LineChart />
                Investimentos
              </button>
            </div>
            <button
              className="flex gap-4 items-center w-full bg-expense-800 hover:bg-expense-900 transition-all duration-500 p-4 rounded-lg"
              onClick={signOut}
            >
              <DoorClosed />
              Sair
            </button>
          </main>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
