import { useFormik } from "formik";
import { api } from "../../../services/api";
import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";
import CurrencyInput from "react-currency-input-field";
import { initialValues, validationSchema } from "./_validation";
import { TransactionModel } from "../../../models/TransactionModel";
import { formatCurrencyFloat } from "../../../helpers/formatCurrencyFloat";

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

  function createIncome(values: any) {
    const { value, accountId } = values;

    api
      .post("transactions", {
        ...values,
        value: formatCurrencyFloat(value),
        accountId: parseInt(accountId),
      })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function editIncome(id: number, values: any) {
    const { value, accountId } = values;

    api
      .put(`transactions/${id}`, {
        ...values,
        value: formatCurrencyFloat(value),
        accountId: parseInt(accountId),
      })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error(err);
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
      transaction ? editIncome(transaction.id, values) : createIncome(values);
    },
    initialValues,
    validationSchema,
  });

  useEffect(() => {
    getTotalAccounts();
  }, [open]);

  useEffect(() => {
    formik.setValues({
      name: transaction ? transaction.name : "",
      value: transaction ? transaction.value + "" : "0",
      accountId: transaction ? transaction.accountId + "" : "",
      transactionType: transaction ? transaction.transactionType : "",
    });
  }, [open]);

  return (
    <Modal
      title={transaction ? "Editar Receita" : "Criar Receita"}
      open={open}
      onClose={onClose}
      onDelete={() => deleteIncome(transaction ? transaction.id : 0)}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="p-6 flex items-center justify-center">
          <CurrencyInput
            name="value"
            prefix="R$ "
            type="text"
            placeholder="R$ 0,00"
            groupSeparator="."
            decimalSeparator=","
            allowDecimals={true}
            onBlur={formik.handleBlur}
            value={formik.values.value}
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
