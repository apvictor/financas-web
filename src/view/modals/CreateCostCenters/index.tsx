import { Modal } from "../../components/Modal";
import { api } from "../../../services/api";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./_validation";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

interface Props {
  open: boolean;
  onClose(): void;
}
export function CreateCostCenters({ open, onClose }: Props) {
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

  return (
    <Modal title="Criar Centro de Custo" open={open} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        {/* <div className="p-6 flex items-center justify-center">
          <CurrencyInput
            id="value"
            name="value"
            defaultValue={0}
            prefix="R$ "
            placeholder="R$ 0,00"
            groupSeparator="."
            decimalSeparator=","
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="bg-transparent text-center outline-none font-bold text-4xl"
          />
        </div> */}

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
