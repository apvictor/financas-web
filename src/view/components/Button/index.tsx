import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"button"> {
  children?: ReactNode;
}
export function Button({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className="bg-[#15C770] hover:bg-[#15c771c2]
      disabled:bg-[#42a7768d]
      disabled:text-[#AAA]
      transition-colors w-full h-12 rounded-lg px-4 py-3 uppercase font-bold text-sm"
    >
      {children}
    </button>
  );
}
