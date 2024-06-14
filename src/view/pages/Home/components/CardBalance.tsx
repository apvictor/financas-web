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
    <div className="bg-slate-900 flex-1 flex items-center gap-3 p-4 rounded-lg">
      <div className={`p-2 rounded-lg ${className}`}>{icon}</div>
      <div className="flex flex-col items-start">
        <span className="text-xs font-light">{title}</span>
        <span className="text-sm font-bold">
          <VisibilityValue value={value} />
        </span>
      </div>
    </div>
  );
}
