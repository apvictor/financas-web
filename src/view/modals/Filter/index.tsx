import { useFormik } from "formik";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { Input } from "../../components/Input";
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
  const formik = useFormik({
    onSubmit: async (values) => {
      console.log(values);

      onFilters(values);
      onClose();
    },
    initialValues,
    validationSchema,
  });

  return (
    <Modal title={"Filtros"} open={open} onClose={onClose}>
      <form className="py-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <Input
            type="month"
            name="month"
            placeholder="Mês"
            value={formik.values.month}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />

          <div className="flex gap-4 w-full uppercase font-bold text-sm">
            <div
              className={`flex flex-1 hover:bg-[#15C770] border border-[#15C770] rounded-lg transition-colors duration-500
              ${
                formik.values.balance == "INCOME"
                  ? "bg-[#15C770]"
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
              className={`flex flex-1 hover:bg-[#15C770] border border-[#15C770] rounded-lg transition-colors duration-500 ${
                formik.values.balance == "EXPENSE"
                  ? "bg-[#15C770]"
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
