import { useFormik } from "formik";
import { useState } from "react";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/Input";
import { api } from "../../../app/services/api";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { Select } from "../../components/Select";
import { useMonth } from "../../../app/shared/hooks/useMonth";
import { initialValues, validationSchema } from "../Filter/_validation";

export interface FiltersProps {
  balance: string;
  month: string;
  costCenterId: string;
}

interface Props {
  open: boolean;
  onClose(): void;
  onFilters({ balance, month, costCenterId }: FiltersProps): void;
}
export function Filter({ open, onClose, onFilters }: Props) {
  const { setMonth, month } = useMonth();

  const [costCenters, setCostCenters] = useState<
    { id: number; name: string }[]
  >([]);

  async function getCostCenters() {
    const data = (await api.get("/cost-centers")).data;
    setCostCenters(data);
  }

  const formik = useFormik({
    onSubmit: async (values) => {
      onFilters(values);
      setMonth(values.month)
      onClose();
    },
    initialValues,
    validationSchema,
  });

  return (
    <Modal animate="CENTER" title={"Filtros"} open={open} onClose={onClose}>
      <form className="py-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <Select
            placeholder="Selecione um centro de custo"
            name="costCenterId"
            onBlur={formik.handleBlur}
            onClick={() => {
              getCostCenters();
            }}
            onChange={formik.handleChange}
            value={formik.values.costCenterId}
            error={formik.touched.costCenterId && formik.errors.costCenterId}
          >
            <option value="" disabled hidden></option>
            {costCenters.length > 0 ? (
              costCenters.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))
            ) : (
              <option disabled>Nenhum centro de custo cadastrado</option>
            )}
          </Select>

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
