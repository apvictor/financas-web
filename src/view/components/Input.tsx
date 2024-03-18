import { ComponentProps } from "react";

interface Props extends ComponentProps<"input"> {
  name: string;
  messageError?: string | boolean;
}
export function Input({ name, messageError, placeholder, ...props }: Props) {
  return (
    <div>
      <div className="relative">
        <input
          {...props}
          name={name}
          placeholder=" "
          className={`bg-gray-800 w-full text-gray-200 rounded-lg border px-3 h-14 pt-4 peer placeholder-shown:pt-0 focus:border-2 transition-all outline-none
          ${messageError ? "border-red-500" : " border-gray-600"}`}
        />

        <label
          htmlFor={name}
          className="absolute left-[13px] pointer-events-none text-gray-400 text-xs top-2 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
        >
          {placeholder}
        </label>
      </div>
      <span className="text-sm text-red-400">{messageError}</span>
    </div>
  );
}
