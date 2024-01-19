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
          className={`absolute left-[13px] pointer-events-none text-[#CCC]  ${
            value
              ? "text-xs top-2"
              : "peer-placeholder-shown:text-base peer-placeholder-shown:top-2 text-base top-4"
          } peer-transition-all`}
        >
          {placeholder}
        </label>
        <select
          {...props}
          className="bg-[#343A40] w-full rounded-lg border border-[#495057] px-3 h-[52px] pt-4 focus:border-gray-800 transition-all outline-none"
          name={name}
          value={value}
          style={{
            borderColor: error ? "#ef4444" : "#495057",
          }}
        >
          {children}
        </select>
      </div>
      <span className="text-sm text-red-400">{messageError}</span>
    </div>
  );
}
