import CurrencyInput from "react-currency-input-field";
import { Modal } from "../../components/Modal";
import { api } from "../../../services/api";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./_validation";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { formatCurrencyFloat } from "../../../helpers/formatCurrencyFloat";

interface Props {
  open: boolean;
  onClose(): void;
}
export function CreateTransactions({ open, onClose }: Props) {
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

  const formik = useFormik({
    onSubmit: async (values, { resetForm }) => {
      const { value, accountId, costCenterId } = values;

      api
        .post("transactions", {
          ...values,
          value: formatCurrencyFloat(value),
          accountId: parseInt(accountId),
          costCenterId: parseInt(costCenterId),
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

  useEffect(() => {
    getTotalAccounts();
    getCostCenters();
  }, [open]);

  return (
    <Modal title="Criar Transação" open={open} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <div className="p-6 flex items-center justify-center">
          <CurrencyInput
            id="value"
            name="value"
            prefix="R$ "
            placeholder="R$ 0,00"
            groupSeparator="."
            decimalSeparator=","
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="bg-transparent text-center outline-none font-bold text-4xl"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative">
            <label className="absolute left-[13px] pointer-events-none text-[#CCC] text-xs top-2 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all">
              Tipo de transação
            </label>
            <select
              id="transactionType"
              name="transactionType"
              className="bg-[#343A40] w-full rounded-lg border border-[#495057] px-3 h-[52px] pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.transactionType}
            >
              <option value="SELECIONE">Selecione</option>
              <option value="INCOME">Receita</option>
              <option value="EXPENSE">Despesa</option>
            </select>
          </div>

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
              Conta
            </label>
            <select
              className="bg-[#343A40] w-full rounded-lg border border-[#495057] px-3 h-[52px] pt-4 focus:border-gray-800 transition-all outline-none"
              id="accountId"
              name="accountId"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.accountId}
            >
              <option value="SELECIONE">Selecione</option>
              {accounts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label className="absolute left-[13px] pointer-events-none text-[#CCC] text-xs top-2 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all">
              Centro de custo
            </label>
            <select
              className="bg-[#343A40] w-full rounded-lg border border-[#495057] px-3 h-[52px] pt-4 focus:border-gray-800 transition-all outline-none"
              id="costCenterId"
              name="costCenterId"
              onBlur={formik.handleBlur}
              value={formik.values.costCenterId}
              onChange={formik.handleChange}
            >
              <option value="SELECIONE">Selecione</option>
              {costCenters.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="submit"
            // disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? "Carregando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
