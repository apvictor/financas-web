import { useFormik } from "formik";
import { api } from "../../../services/api";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import CurrencyInput from "react-currency-input-field";
import { initialValues, validationSchema } from "./_validation";
import { formatCurrencyFloat } from "../../../helpers/formatCurrencyFloat";

interface Props {
  open: boolean;
  onClose(): void;
}
export function CreateAccounts({ open, onClose }: Props) {
  const formik = useFormik({
    onSubmit: async (values, { resetForm }) => {
      const { value } = values;

      api
        .post("accounts", {
          ...values,
          value: formatCurrencyFloat(value),
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
    <Modal title="Criar Conta" open={open} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <div className="p-6 flex items-center justify-center">
          <CurrencyInput
            type="text"
            id="value"
            name="value"
            defaultValue={0}
            prefix="R$ "
            placeholder="R$ 0,00"
            groupSeparator="."
            decimalSeparator=","
            allowDecimals={true}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="bg-transparent text-center outline-none font-bold text-4xl"
          />
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
