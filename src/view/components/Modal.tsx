import { ReactNode } from "react";
import { Trash, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

interface Props {
  title: ReactNode;
  open: boolean;
  onClose?(): void;
  onDelete?(): void;
  children: ReactNode;
  animate: "BOTTOM" | "TOP" | "CENTER" | "LEFT" | "RIGHT";
}
export function Modal({
  title,
  open,
  children,
  onClose,
  onDelete,
  animate,
}: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />

        <Dialog.Content
          className={`fixed w-full bg-gray-900 border-2 border-gray-700 p-6
          ${
            animate === "TOP" &&
            "w-full border-t-0 right-0 top-0 rounded-b-3xl data-[state=open]:animate-modal-t-open data-[state=closed]:animate-modal-t-close"
          }
          ${
            animate === "BOTTOM" &&
            "w-full border-b-0 left-0 bottom-0 rounded-t-3xl data-[state=open]:animate-modal-b-open data-[state=closed]:animate-modal-b-close"
          }
          ${
            animate === "CENTER" &&
            "max-w-[90%] h-fit m-auto inset-0 rounded-3xl data-[state=open]:animate-modal-c-open data-[state=closed]:animate-modal-c-close"
          }
          ${
            animate === "LEFT" &&
            "max-w-[90%] h-full left-0 bottom-0 rounded-r-3xl data-[state=open]:animate-modal-l-open data-[state=closed]:animate-modal-l-close"
          }
          ${
            animate === "RIGHT" &&
            "max-w-[90%] h-full right-0 bottom-0 rounded-l-3xl data-[state=open]:animate-modal-r-open data-[state=closed]:animate-modal-r-close"
          }
          `}
        >
          <header className="h-12 flex items-center justify-between font-bold uppercase">
            <div className="h-12 w-12 flex items-center justify-center outline-none text-white">
              <X onClick={onClose} className="cursor-pointer" />
            </div>
            <span className="text-lg">{title}</span>
            <div className="h-12 w-12 flex items-center justify-center outline-none text-red-500">
              {title?.toString().includes("Editar") && (
                <Trash onClick={onDelete} className="cursor-pointer" />
              )}
            </div>
          </header>

          <main>{children}</main>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
