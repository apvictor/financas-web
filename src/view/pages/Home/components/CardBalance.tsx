import { ReactNode } from "react";
import { VisibilityValue } from "../../../components/VisibilityValue";

interface Props {
  title: string;
  value: number;
  icon: ReactNode;
  className: string;
}
export function CardBalance({ title, value, className, icon }: Props) {
  return (
    <div className="bg-gray-800 flex-1 flex items-center gap-3 p-3 rounded-md">
      <div className={`p-1.5 rounded-full ${className}`}>{icon}</div>
      <div className="flex flex-col items-start">
        <span className="text-xs font-light">{title}</span>
        <span className="text-xs font-bold">
          <VisibilityValue value={value} />
        </span>
      </div>
    </div>
  );
}
