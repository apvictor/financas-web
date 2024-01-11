import { Modal } from "../../components/Modal";
import { api } from "../../../services/api";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./_validation";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import CurrencyInput from "react-currency-input-field";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  total: number;
  onClose(): void;
}
export function CreateCostCenters({ open, onClose, total }: Props) {
  const formik = useFormik({
    onSubmit: async (values, { resetForm }) => {
      const { percentage } = values;

      api
        .post("cost-centers", {
          ...values,
          percentage: parseInt(percentage + ""),
        })
        .then(() => {
          onClose();
          resetForm();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    initialValues,
    validationSchema,
  });

  const [valorLimite, setValorLimite] = useState(0);

  useEffect(() => {
    console.log(formik.values.percentage);

    const limite = (total * formik.values.percentage) / 100;

    setValorLimite(limite);
  }, [formik.values.percentage]);

  return (
    <Modal title="Criar Centro de Custo" open={open} onClose={onClose}>
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
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && formik.errors.name}
          />
          <Input
            min={1}
            max={100}
            maxLength={3}
            minLength={1}
            name="percentage"
            placeholder="Porcentagem"
            onBlur={formik.handleBlur}
            value={formik.values.percentage}
            onChange={formik.handleChange}
            error={formik.touched.percentage && formik.errors.percentage}
          />

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
