import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"select"> {
  name: string;
  error?: string | boolean;
  messageError?: string | boolean;
  children: ReactNode;
  placeholder: string;
}
export function Select({
  name,
  error,
  messageError,
  placeholder,
  children,
  value,
  ...props
}: Props) {
  return (
    <div>
      <div className="relative">
        <label
          className={`absolute left-[13px] pointer-events-none text-gray-400
          ${value
              ? "text-xs top-2"
              : "peer-placeholder-shown:text-base peer-placeholder-shown:top-2 text-base top-4"
          } peer-transition-all`}
        >
          {placeholder}
        </label>
        <select
          {...props}
          className={`bg-gray-800 w-full rounded-lg border border-gray-600 px-3 h-14 pt-4 focus:border-2 transition-all outline-none
          ${error ? "text-red-500" : "text-gray-200"}`}
          name={name}
          value={value}
        >
          {children}
        </select>
      </div>
      <span className="text-sm text-red-400">{messageError}</span>
    </div>
  );
}
