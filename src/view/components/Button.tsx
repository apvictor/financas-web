import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"button"> {
  children?: ReactNode;
}
export function Button({ children, ...props }: Props) {
  return (
    <button
      className="bg-success-500 hover:bg-success-500/50 disabled:bg-success-500/30 disabled:text-white/30 disabled:cursor-not-allowed disabled:text-gray-100 transition-all w-full h-12 rounded-lg px-4 py-3 uppercase font-bold text-sm"
      {...props}
    >
      {children}
    </button>
  );
}
