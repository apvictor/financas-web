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
          className={`bg-slate-800 w-full text-white font-bold rounded-lg border px-3 h-14 pt-4 peer placeholder-shown:pt-0 focus:border transition-all outline-none
          ${messageError ? "border-red-500" : " border-slate-700"}`}
        />

        <label
          htmlFor={name}
          className="absolute left-4 pointer-events-none text-slate-500 text-xs top-2 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 transition-all"
        >
          {placeholder}
        </label>
      </div>
      <span className="text-sm text-red-400">{messageError}</span>
    </div>
  );
}
