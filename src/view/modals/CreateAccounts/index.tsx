import { useEffect } from "react";
import { useFormik } from "formik";
import { Modal } from "../../components/Modal";
import { api } from "../../../app/services/api";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";
import CurrencyInput from "react-currency-input-field";
import { initialValues, validationSchema } from "./_validation";
import { AccountModel } from "../../../app/models/AccountModel";
import { formatCurrencyFloat } from "../../../app/helpers/formatCurrencyFloat";

interface Props {
  account: AccountModel | null;
  open: boolean;
  onClose(): void;
}
export function CreateAccounts({ account, open, onClose }: Props) {
  function createAccount(values: any) {
    const { value } = values;

    api
      .post("accounts", { ...values, value: formatCurrencyFloat(value) })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function editAccount(id: number, values: any) {
    const { value } = values;

    api
      .put(`accounts/${id}`, {
        ...values,
        value: formatCurrencyFloat(value),
      })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function deleteAccount(id: number) {
    api
      .delete(`accounts/${id}`)
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const formik = useFormik({
    onSubmit: async (values) => {
      account ? editAccount(account.id, values) : createAccount(values);
    },
    initialValues,
    validationSchema,
  });

  useEffect(() => {
    if (account) {
      formik.setValues({
        name: account.name,
        value: account.value.toString(),
      });
    } else {
      formik.resetForm();
    }
  }, [open]);

  return (
    <Modal
      title={account ? "Editar Conta" : "Criar Conta"}
      open={open}
      onClose={onClose}
      onDelete={() => deleteAccount(account ? account.id : 0)}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="p-6 flex items-center justify-center">
          <CurrencyInput
            type="text"
            name="value"
            prefix="R$ "
            maxLength={10}
            groupSeparator={" "}
            decimalSeparator="."
            allowDecimals={true}
            placeholder="R$ 0.00"
            onChange={formik.handleChange}
            defaultValue={account ? account.value.toFixed(2) : 0}
            className="bg-transparent text-center outline-none font-bold text-4xl"
          />
        </div>

        <div className="flex flex-col gap-4">
          <Select
            placeholder="Selecione um banco"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          >
            <option value="" disabled hidden></option>
            <option value="C6 Bank">C6 Bank</option>
            <option value="Bradesco">Bradesco</option>
            <option value="Caixa">Caixa</option>
            <option value="Inter">Inter</option>
            <option value="Itau">Itau</option>
            <option value="Next">Next</option>
            <option value="Pan">Pan</option>
            <option value="Nubank">Nubank</option>
            <option value="Santander">Santander</option>
            <option value="Will">Will</option>
          </Select>

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
