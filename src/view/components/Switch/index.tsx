import * as SwitchRadix from "@radix-ui/react-switch";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"switch"> {
  title: string;
}
export function Switch({ title, ...props }: Props) {
  return (
    <div className="flex items-center justify-between py-2">
      <label
        className="text-white text-[15px] leading-none pr-[15px]"
        htmlFor={title}
      >
        {title}
      </label>
      <SwitchRadix.Root
        id={title}
        className="w-[42px] h-[25px] rounded-full relative border border-gray-300 data-[state=checked]:bg-black bg-gray-400 outline-none cursor-default"
        {...props}
      >
        <SwitchRadix.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </SwitchRadix.Root>
    </div>
  );
}
