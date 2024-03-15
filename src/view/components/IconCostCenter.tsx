import {
  ArrowUpCircle,
  GraduationCap,
  HomeIcon,
  LayoutDashboard,
  LineChart,
  Pizza,
} from "lucide-react";

interface Props {
  title: string;
}
export function IconCostCenter({ title }: Props) {
  const costCenters = ["CASA", "INVESTIMENTO", "EDUCAÇÃO", "LAZER"];

  return (
    <>
      {title.toUpperCase() === "INCOME" && (
        <div className="p-1.5 text-primary bg-tertiary rounded-full">
          <ArrowUpCircle size={16} />
        </div>
      )}

      {title.toUpperCase() === "CASA" && (
        <div className="p-1.5  text-gray-400 bg-gray-600 rounded-full">
          <HomeIcon size={16} />
        </div>
      )}
      {title.toUpperCase() === "INVESTIMENTO" && (
        <div className="p-1.5 bg-[#8b5cf663] rounded-full">
          <LineChart color="#8b5cf6" size={16} />
        </div>
      )}
      {title.toUpperCase() === "EDUCAÇÃO" && (
        <div className="p-1.5 bg-[#3b82f663] rounded-full">
          <GraduationCap color="#3b82f6" size={16} />
        </div>
      )}
      {title.toUpperCase() === "LAZER" && (
        <div className="p-1.5 bg-[#eab30863] rounded-full">
          <Pizza color="#eab308" size={16} />
        </div>
      )}

      {!costCenters.includes(title.toLocaleUpperCase()) &&
        title.toUpperCase() !== "INCOME" && (
          <div className="p-1.5 bg-[#89613363]  rounded-full">
            <LayoutDashboard size={16} color="#896133" />
          </div>
        )}
    </>
  );
}
