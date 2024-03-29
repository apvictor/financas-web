import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/Input";
import { api } from "../../../app/services/api";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import CurrencyInput from "react-currency-input-field";
import { initialValues, validationSchema } from "./_validation";
import { CostCenterModel } from "../../../app/models/CostCenterModel";

interface Props {
  costCenter: CostCenterModel | null;
  open: boolean;
  total: number;
  onClose(): void;
}
export function CreateCostCenters({ open, onClose, total, costCenter }: Props) {
  async function createCostCenter(values: any) {
    const { percentage } = values;

    await api.post("cost-centers", {
      ...values,
      percentage: parseInt(percentage + ""),
    });
  }

  async function editCostCenter(id: number, values: any) {
    const { percentage } = values;

    await api.put(`cost-centers/${id}`, {
      ...values,
      percentage: parseInt(percentage + ""),
    });
  }

  function deleteCostCenter(id: number) {
    api.delete(`cost-centers/${id}`).then(() => {
      onClose();
    });
  }

  const formik = useFormik({
    onSubmit: async (values) => {
      costCenter
        ? await editCostCenter(costCenter.id, values)
        : await createCostCenter(values);

      onClose();
    },
    initialValues,
    validationSchema,
  });

  const [valorLimite, setValorLimite] = useState(0);

  useEffect(() => {
    const limite = (total * formik.values.percentage) / 100;

    setValorLimite(limite);
  }, [formik.values.percentage]);

  useEffect(() => {
    if (costCenter) {
      formik.setValues({
        name: costCenter.name,
        percentage: costCenter.percentage,
      });
    } else {
      formik.resetForm();
    }
  }, [open]);

  return (
    <Modal
      animate="BOTTOM"
      title={costCenter ? "Editar Centro de Custo" : "Criar Centro de Custo"}
      open={open}
      onClose={onClose}
      onDelete={() => deleteCostCenter(costCenter ? costCenter.id : 0)}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="p-6 flex flex-col gap-4 items-center justify-center">
          <CurrencyInput
            disabled={true}
            type="text"
            name="value"
            prefix="R$ "
            maxLength={10}
            defaultValue={0}
            groupSeparator={" "}
            decimalSeparator="."
            allowDecimals={true}
            placeholder="R$ 0.00"
            value={valorLimite.toFixed(2)}
            className="bg-transparent text-center outline-none font-bold text-4xl text-gray-400"
          />
          <span className="text-gray-400">
            Valor disponivel conforme sua receita
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            name="name"
            placeholder="Nome"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            defaultValue={costCenter ? costCenter.name : ""}
            messageError={formik.touched.name && formik.errors.name}
          />

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label className="text-xs">Porcentagem</label>
              <label className="text-xs">{formik.values.percentage}%</label>
            </div>

            <input
              min="1"
              step="1"
              max="100"
              type="range"
              name="percentage"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              defaultValue={costCenter ? costCenter.percentage : 0}
              className="text-green-400"
            />
            {formik.touched.percentage && formik.errors.percentage && (
              <span className="text-sm text-red-400">{formik.errors.name}</span>
            )}
          </div>

          <Button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? <Loader /> : "Salvar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
