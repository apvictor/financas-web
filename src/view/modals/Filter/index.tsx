import { useFormik } from "formik";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { useMonth } from "../../../app/shared/hooks/useMonth";
import { initialValues, validationSchema } from "../Filter/_validation";

export interface FiltersProps {
  balance: string;
  month: string;
}

interface Props {
  open: boolean;
  onClose(): void;
  onFilters({ balance, month }: FiltersProps): void;
}
export function Filter({ open, onClose, onFilters }: Props) {
  const { setMonth, month } = useMonth();

  const formik = useFormik({
    onSubmit: async (values) => {
      onFilters(values);
      setMonth(values.month);
      onClose();
    },
    initialValues,
    validationSchema,
  });

  return (
    <Modal animate="CENTER" title={"Filtros"} open={open} onClose={onClose}>
      <form className="py-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <Input
            type="month"
            name="month"
            placeholder="Mês"
            defaultValue={month}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />

          <div className="flex gap-4 w-full uppercase font-bold text-sm">
            <div
              className={`flex flex-1 hover:bg-primary border border-primary rounded-lg transition-all duration-500
              ${
                formik.values.balance == "INCOME"
                  ? "bg-primary"
                  : "bg-transparent"
              }`}
            >
              <input
                hidden
                id="INCOME"
                type="radio"
                name="balance"
                value="INCOME"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <label
                htmlFor="INCOME"
                className="py-4 w-full text-center cursor-pointer"
              >
                RECEITAS
              </label>
            </div>
            <div
              className={`flex flex-1 hover:bg-expense-900 border border-expense-900 rounded-lg transition-all duration-500
              ${
                formik.values.balance == "EXPENSE"
                  ? "bg-expense-900"
                  : "bg-transparent"
              }`}
            >
              <input
                hidden
                id="EXPENSE"
                type="radio"
                name="balance"
                value="EXPENSE"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <label
                htmlFor="EXPENSE"
                className="py-4 w-full text-center cursor-pointer"
              >
                DESPESAS
              </label>
            </div>
          </div>

          <Button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? <Loader /> : "Salvar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
