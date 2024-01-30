import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"button"> {
  children?: ReactNode;
}
export function Button({ children, ...props }: Props) {
  return (
    <button
      className="bg-primary hover:bg-secondary disabled:bg-tertiary disabled:text-gray-100 transition-all duration-500 w-full h-12 rounded-lg px-4 py-3 uppercase font-bold text-sm"
      {...props}
    >
      {children}
    </button>
  );
}
