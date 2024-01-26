import {
  ArrowUpCircle,
  GraduationCap,
  HomeIcon,
  LineChart,
  Pizza,
} from "lucide-react";

interface Props {
  title: string;
}
export function IconCostCenter({ title }: Props) {
  return (
    <>
      {title.toUpperCase() === "INCOME" && (
        <div className="p-1.5 bg-[#15c77163] rounded-full">
          <ArrowUpCircle color="#15C770" size={16} />
        </div>
      )}

      {title.toUpperCase() === "CASA" && (
        <div className="p-1.5 bg-[#A5D8FF] rounded-full">
          <HomeIcon color="#1C7ED6" size={16} />
        </div>
      )}
      {title.toUpperCase() === "INVESTIMENTO" && (
        <div className="p-1.5 bg-[#FFE1E1] rounded-full">
          <LineChart color="#FF6E6E" size={16} />
        </div>
      )}
      {title.toUpperCase() === "EDUCAÇÃO" && (
        <div className="p-1.5 bg-[#98FFED] rounded-full">
          <GraduationCap color="#196D5D" size={16} />
        </div>
      )}
      {title.toUpperCase() === "LAZER" && (
        <div className="p-1.5 bg-[#FFE3C8] rounded-full">
          <Pizza color="#FF7A00" size={16} />
        </div>
      )}
    </>
  );
}
