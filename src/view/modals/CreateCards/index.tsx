import { useEffect } from "react";
import { useFormik } from "formik";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/Input";
import { api } from "../../../app/services/api";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";
import { Loader } from "../../components/Loader";
import CurrencyInput from "react-currency-input-field";
import { initialValues, validationSchema } from "./_validation";
import { formatDateInput } from "../../../app/helpers/formatDateInput";
import { CardModel, FormCardModel } from "../../../app/models/CardModel";
import { formatCurrencyFloat } from "../../../app/helpers/formatCurrencyFloat";

interface Props {
  card: CardModel | null;
  open: boolean;
  onClose(): void;
}
export function CreateCards({ card, open, onClose }: Props) {
  function create(data: FormCardModel) {
    api.post("cards", { ...data }).finally(() => onClose());
  }

  function edit(id: number, data: FormCardModel) {
    api.put(`cards/${id}`, { ...data }).finally(() => onClose());
  }

  function destroy(id: number) {
    api.delete(`cards/${id}`).finally(() => onClose());
  }

  const formik = useFormik({
    enableReinitialize: true,
    onSubmit: async ({ dueDate, limit, name }) => {
      const data = {
        name,
        limit: formatCurrencyFloat(limit.toString()),
        dueDate: new Date(new Date(dueDate).setUTCHours(3)),
      };

      card ? edit(card.id, data) : create(data);
    },
    initialValues,
    validationSchema,
  });

  useEffect(() => {
    if (card) {
      formik.setValues({
        name: card.name,
        limit: card.limit.toString(),
        dueDate: formatDateInput(new Date(card.dueDate)),
      });
    } else {
      formik.resetForm();
    }
  }, [open]);

  return (
    <Modal
      animate="BOTTOM"
      title={card ? "Editar Cartão" : "Criar Cartão"}
      open={open}
      onClose={onClose}
      onDelete={() => destroy(card ? card.id : 0)}
    >
      <form className="mt-4" onSubmit={formik.handleSubmit}>
        <div className="p-6 flex flex-col gap-4 items-center justify-center">
          <CurrencyInput
            type="text"
            name="limit"
            prefix="R$ "
            maxLength={10}
            groupSeparator={" "}
            decimalSeparator="."
            allowDecimals={true}
            placeholder="R$ 0.00"
            onChange={formik.handleChange}
            defaultValue={card ? card.limit.toFixed(2) : ""}
            className="bg-transparent text-center outline-none font-bold text-4xl text-white placeholder:text-gray-400"
          />
          <span className="text-gray-400">Limite do cartão</span>
        </div>

        <div className="flex flex-col gap-6">
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
            <option value="NuInvest">NuInvest</option>
            <option value="Santander">Santander</option>
            <option value="Will">Will</option>
          </Select>

          <Input
            type="date"
            name="dueDate"
            onBlur={formik.handleBlur}
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            placeholder="Vencimento da fatura"
          />

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
