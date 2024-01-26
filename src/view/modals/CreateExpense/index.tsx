import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import { api } from "../../../app/services/api";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";
import CurrencyInput from "react-currency-input-field";
import { initialValues, validationSchema } from "./_validation";
import { TransactionModel } from "../../../app/models/TransactionModel";
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

  async function getTotalAccounts() {
    const data = (await api.get("/accounts")).data;
    setAccounts(data);
  }

  async function getCostCenters() {
    const data = (await api.get("/cost-centers")).data;
    setCostCenters(data);
  }

  function createExpense(values: any) {
    const { value, accountId, costCenterId } = values;

    api
      .post("transactions", {
        ...values,
        transactionType: "EXPENSE",
        value: formatCurrencyFloat(value),
        accountId: parseInt(accountId),
        costCenterId: parseInt(costCenterId),
      })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function editExpense(id: number, values: any) {
    const { value, accountId, costCenterId } = values;

    api
      .put(`transactions/${id}`, {
        ...values,
        value: formatCurrencyFloat(value),
        accountId: parseInt(accountId),
        costCenterId: parseInt(costCenterId),
      })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function deleteExpense(id: number) {
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
      transaction ? editExpense(transaction.id, values) : createExpense(values);
    },
    initialValues,
    validationSchema,
  });

  useEffect(() => {
    getTotalAccounts();
    getCostCenters();
  }, [open]);

  useEffect(() => {
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
      title={transaction ? "Editar Despesa" : "Criar Despesa"}
      open={open}
      onClose={onClose}
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
            defaultValue={transaction ? transaction.value.toFixed(2) : 0}
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

          <Select
            placeholder="Selecione uma conta"
            name="accountId"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.accountId}
            error={formik.touched.accountId && formik.errors.accountId}
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
            error={formik.touched.costCenterId && formik.errors.costCenterId}
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
