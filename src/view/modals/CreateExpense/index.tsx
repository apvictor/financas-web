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
import { formatCurrencyFloat } from "../../../app/helpers/formatCurrencyFloat";

interface Props {
  open: boolean;
  onClose(): void;
  transaction?: TransactionModel | null;
}
export function CreateExpense({ open, onClose, transaction }: Props) {
  const [accounts, setAccounts] = useState<{ id: number; name: string }[]>([]);
  const [costCenters, setCostCenters] = useState<
    { id: number; name: string }[]
  >([]);

  async function getAccounts() {
    const data = (await api.get("/accounts")).data;
    setAccounts(data);
  }

  async function getCostCenters() {
    const data = (await api.get("/cost-centers")).data;
    setCostCenters(data);
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
    onSubmit: async ({ accountId, costCenterId, name, value }) => {
      const data = {
        accountId: parseInt(accountId),
        costCenterId: parseInt(costCenterId),
        name,
        transactionType: "EXPENSE",
        value: formatCurrencyFloat(value),
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
    getCostCenters();
    if (transaction) {
      formik.setValues({
        name: transaction.name,
        value: transaction.value.toString(),
        accountId: transaction.accountId.toString(),
        costCenterId: transaction.costCenterId.toString(),
        transactionType: "EXPENSE",
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

          <Select
            placeholder="Selecione um centro de custo"
            name="costCenterId"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.costCenterId}
            messageError={
              formik.touched.costCenterId && formik.errors.costCenterId
            }
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
