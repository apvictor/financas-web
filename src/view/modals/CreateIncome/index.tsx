import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/Input";
import { api } from "../../../app/services/api";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";
import { Loader } from "../../components/Loader";
import CurrencyInput from "react-currency-input-field";
import { initialValues, validationSchema } from "./_validation";
import { TransactionModel } from "../../../app/models/TransactionModel";
import { formatCurrencyFloat } from "../../../app/helpers/formatCurrencyFloat";

interface Props {
  open: boolean;
  onClose(): void;
  transaction?: TransactionModel | null;
}
export function CreateIncome({ open, onClose, transaction }: Props) {
  const [accounts, setAccounts] = useState<{ id: number; name: string }[]>([]);

  async function getTotalAccounts() {
    const data = (await api.get("/accounts")).data;
    setAccounts(data);
  }

  async function createIncome(values: any) {
    const { value, accountId } = values;

    await api.post("transactions", {
      ...values,
      value: formatCurrencyFloat(value),
      accountId: parseInt(accountId),
    });
  }

  async function editIncome(id: number, values: any) {
    const { value, accountId } = values;

    await api.put(`transactions/${id}`, {
      ...values,
      value: formatCurrencyFloat(value),
      accountId: parseInt(accountId),
    });
  }

  function deleteIncome(id: number) {
    api
      .delete(`transactions/${id}`)
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const formik = useFormik({
    onSubmit: async (values) => {
      transaction
        ? await editIncome(transaction.id, values)
        : await createIncome(values);
      onClose();
    },
    initialValues,
    validationSchema,
  });

  useEffect(() => {
    getTotalAccounts();

    if (transaction) {
      formik.setValues({
        name: transaction.name,
        value: transaction.value.toString(),
        accountId: transaction.accountId.toString(),
        type: "INCOME",
        paid: transaction.paid,
      });
    } else {
      formik.resetForm();
    }
  }, [open]);

  return (
    <Modal
      animate="BOTTOM"
      title={transaction ? "Editar Receita" : "Criar Receita"}
      open={open}
      onClose={onClose}
      onDelete={() => deleteIncome(transaction ? transaction.id : 0)}
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
            defaultValue={transaction ? transaction.value.toFixed(2) : ""}
            className="bg-transparent text-center outline-none font-bold text-4xl text-primary placeholder:text-tertiary"
          />
        </div>

        <div className="flex flex-col gap-4">
          <Input
            name="name"
            placeholder="Nome"
            onBlur={formik.handleBlur}
            value={formik.values.name}
            onChange={formik.handleChange}
            messageError={formik.touched.name && formik.errors.name}
          />

          <Select
            placeholder="Selecione uma conta"
            name="accountId"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.accountId}
            messageError={formik.touched.accountId && formik.errors.accountId}
          >
            <option value="" disabled hidden></option>
            {accounts.length > 0 ? (
              accounts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))
            ) : (
              <option disabled>Nenhuma conta cadastrada</option>
            )}
          </Select>

          <div className="flex items-center justify-between">
            Receita está paga?
            <button
              type="button"
              onClick={() => formik.setFieldValue("paid", !formik.values.paid)}
              className={`${
                formik.values.paid && "bg-success-500 border-0"
              } h-10 w-14 text-white transition-all p-2 te rounded-lg border border-slate-700`}
            >
              {formik.values.paid ? "SIM" : "NÃO"}
            </button>
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
