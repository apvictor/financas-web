import { ComponentProps } from "react";

interface Props extends ComponentProps<"input"> {
  name: string;
  error?: string | boolean;
  messageError?: string | boolean;
}
export function Input({ name, error, messageError, placeholder, ...props }: Props) {
  return (
    <div>
      <div className="relative">
        <input
          {...props}
          name={name}
          placeholder=" "
          style={{
            borderColor: error ? "#ef4444" : "#495057"
          }}
          className="bg-[#343A40] w-full rounded-lg border border-[#495057] px-3 h-[52px] pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none"
        />

        <label
          htmlFor={name}
          className="absolute left-[13px] pointer-events-none text-[#CCC] text-xs top-2 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
        >
          {placeholder}
        </label>
      </div>
      <span className="text-sm text-red-400">{messageError}</span>
    </div>
  );
}
