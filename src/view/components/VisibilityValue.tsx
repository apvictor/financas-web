import { formatCurrency } from "../../app/helpers/formatCurrency";
import { useToggle } from "../../app/shared/hooks/useToggle";

interface Props {
  value: number;
}
export function VisibilityValue({ value }: Props) {
  const { status } = useToggle();

  return <span>{!status ? "•••••••" : formatCurrency(value)}</span>;
}
