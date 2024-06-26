import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"select"> {
  name: string;
  messageError?: string | boolean;
  children: ReactNode;
  placeholder: string;
}
export function Select({
  name,
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
          className={`absolute left-[13px] pointer-events-none text-slate-500
          ${
            value
              ? "text-xs top-2"
              : "peer-placeholder-shown:text-base peer-placeholder-shown:top-2 text-base top-4"
          } peer-transition-all`}
        >
          {placeholder}
        </label>
        <select
          {...props}
          className={`bg-slate-800 font-bold w-full rounded-lg text-gray-200 border px-3 h-14 pt-4 focus:border transition-all outline-none
          ${messageError ? "border-red-500" : "border-slate-700"}`}
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
