import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import CurrencyInput from "react-currency-input-field";
import { initialValues, validationSchema } from "./_validation";
import { CostCenterModel } from "../../../models/CostCenterModel";

interface Props {
  costCenter: CostCenterModel | null;
  open: boolean;
  total: number;
  onClose(): void;
}
export function CreateCostCenters({ open, onClose, total, costCenter }: Props) {
  function createCostCenter(values: any) {
    const { percentage } = values;

    api
      .post("cost-centers", {
        ...values,
        percentage: parseInt(percentage + ""),
      })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function editCostCenter(id: number, values: any) {
    const { percentage } = values;

    api
      .put(`cost-centers/${id}`, {
        ...values,
        percentage: parseInt(percentage + ""),
      })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function deleteCostCenter(id: number) {
    api
      .delete(`cost-centers/${id}`)
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const formik = useFormik({
    onSubmit: async (values) => {
      costCenter
        ? editCostCenter(costCenter.id, values)
        : createCostCenter(values);
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
      title={costCenter ? "Editar Centro de Custo" : "Criar Centro de Custo"}
      open={open}
      onClose={onClose}
      onDelete={() => deleteCostCenter(costCenter ? costCenter.id : 0)}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="p-6 flex flex-col gap-4 items-center justify-center">
          <CurrencyInput
            disabled={true}
            id="value"
            name="value"
            value={valorLimite}
            defaultValue={0}
            prefix="R$ "
            placeholder="R$ 0,00"
            groupSeparator="."
            decimalSeparator=","
            className="bg-transparent text-center outline-none font-bold text-4xl text-[#606060]"
          />
          <span>Valor disponivel conforme sua receita</span>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            name="name"
            placeholder="Nome"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            defaultValue={costCenter ? costCenter.name : ""}
            error={formik.touched.name && formik.errors.name}
          />

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label className="text-xs">Porcentagem</label>
              <label className="text-xs">{formik.values.percentage} %</label>
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
            />
          </div>

          <Button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? "Carregando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
