import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import { api } from "../../../app/services/api";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";
import CurrencyInput from "react-currency-input-field";
import { initialValues, validationSchema } from "./_validation";
import {
  FormTransactionModel,
  TransactionModel,
} from "../../../app/models/TransactionModel";
import { Loader } from "../../components/Loader";
import { formatCurrencyFloat } from "../../../app/helpers/formatCurrencyFloat";

interface Props {
  open: boolean;
  onClose(): void;
  transaction?: TransactionModel | null;
}
export function CreateExpense({ open, onClose, transaction }: Props) {
  const [accounts, setAccounts] = useState<{ id: number; name: string }[]>([]);
  // const [paid, setPaid] = useState<boolean>(false);

  async function getAccounts() {
    const data = (await api.get("/accounts")).data;
    setAccounts(data);
  }

  async function createExpense(data: FormTransactionModel) {
    await api.post("transactions", data);
  }

  async function editExpense(id: number, data: FormTransactionModel) {
    await api.put(`transactions/${id}`, data);
  }

  function deleteExpense(id: number) {
    api.delete(`transactions/${id}`).then(() => onClose());
  }

  const formik = useFormik({
    onSubmit: async ({ accountId, name, value, paid }) => {
      const data = {
        accountId: parseInt(accountId),
        name,
        type: "EXPENSE",
        value: formatCurrencyFloat(value),
        paid,
      };

      transaction
        ? await editExpense(transaction.id, data)
        : await createExpense(data);

      onClose();
    },
    initialValues,
    validationSchema,
  });

  useEffect(() => {
    getAccounts();
    if (transaction) {
      formik.setValues({
        name: transaction.name,
        value: transaction.value.toString(),
        accountId: transaction.accountId.toString(),
        type: "EXPENSE",
        paid: transaction.paid,
      });
    } else {
      formik.resetForm();
    }
  }, [open]);

  return (
    <Modal
      open={open}
      animate="BOTTOM"
      onClose={onClose}
      title={transaction ? "Editar Despesa" : "Criar Despesa"}
      onDelete={() => deleteExpense(transaction ? transaction.id : 0)}
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
            className="bg-transparent text-center outline-none font-bold text-4xl text-expense-900 placeholder:text-expense-800"
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
            Despesa está paga?
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
