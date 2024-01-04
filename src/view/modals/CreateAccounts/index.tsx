import CurrencyInput from "react-currency-input-field";
import { Modal } from "../../components/Modal";
import { api } from "../../../services/api";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./_validation";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
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

          <div className="relative">
            <label className="absolute left-[13px] pointer-events-none text-[#CCC] text-xs top-2 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all">
              Tipo de conta
            </label>
            <select
              id="type"
              name="type"
              className="bg-[#343A40] w-full rounded-lg border border-[#495057] px-3 h-[52px] pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.type}
            >
              <option value="SELECIONE">Selecione</option>
              <option value="CASH">Carteira</option>
              <option value="INVESTMENT">Investimento</option>
            </select>
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
