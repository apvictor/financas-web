import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";
import { cn } from "../../../helpers/cn";

function DropdownMenuRoot({ children }: { children: ReactNode }) {
  return <RadixDropdownMenu.Root>{children}</RadixDropdownMenu.Root>;
}

function DropdownMenuTrigger({ children }: { children: ReactNode }) {
  return (
    <RadixDropdownMenu.Trigger asChild className="outline-none cursor-pointer">
      {children}
    </RadixDropdownMenu.Trigger>
  );
}

interface DropdownMenuContentProps {
  children: ReactNode;
  className?: string;
  container?: HTMLElement | null;
}
function DropdownMenuContent({
  container,
  children,
  className,
}: DropdownMenuContentProps) {
  return (
    <RadixDropdownMenu.Portal container={container ?? undefined}>
      <RadixDropdownMenu.Content
        className={cn(
          "bg-white p-2 rounded-2xl space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] data-[side=bottom]:animate-slide-up-and-fade data-[side=top]:animate-slide-down-and-fade z-50",
          className
        )}
      >
        {children}
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Portal>
  );
}

interface DropdownMenuItemProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onSelect?: () => void;
}
function DropdownMenuItem({
  children,
  className,
  disabled,
  onSelect,
}: DropdownMenuItemProps) {
  return (
    <RadixDropdownMenu.Item
      className={cn(
        "min-h-[40px] outline-none flex items-center py-2 px-4 text-gray-800 text-sm hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer data-[disabled]:bg-gray-200 data-[disabled]:cursor-default",
        className
      )}
      onSelect={onSelect}
      disabled={disabled}
    >
      {children}
    </RadixDropdownMenu.Item>
  );
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
};
