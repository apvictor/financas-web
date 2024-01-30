import { ReactNode } from "react";
import { Trash, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

interface Props {
  title: string;
  open: boolean;
  children: ReactNode;
  onClose?(): void;
  onDelete?(): void;
}
export function Modal({ title, open, children, onClose, onDelete }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm animate-modal-overlay" />

        <Dialog.Content className="fixed rounded-t-[20px] w-full left-0 bottom-0 bg-gray-900 border-2 border-b-0 border-gray-700 p-6 data-[state=open]:animate-modal-open data-[state=closed]:animate-modal-close">
          <header className="h-12 flex items-center justify-between font-bold uppercase">
            <button className="h-12 w-12 flex items-center justify-center outline-none">
              <X onClick={onClose} color="#FFF" />
            </button>
            <span className="text-lg">{title}</span>
            <div className="h-12 w-12 flex items-center justify-center outline-none text-red-500">
              {title.includes("Editar") && <Trash onClick={onDelete}  className="cursor-pointer"/>}
            </div>
          </header>

          <main>{children}</main>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
