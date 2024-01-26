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
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm" />

        <Dialog.Content className="fixed rounded-t-[20px] left-0 right-0 bottom-0 bg-[#212529] p-6">
          <header className="h-12 flex items-center justify-between text-[#AAA]">
            <div className="h-12 w-12 flex items-center justify-center outline-none">
              <X onClick={onClose} color="#FFF" />
            </div>
            <span className="text-lg">{title}</span>
            <div className="h-12 w-12 flex items-center justify-center text-red-500">
              {title.includes("Editar") && <Trash onClick={onDelete} />}
            </div>
          </header>

          <main>{children}</main>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
