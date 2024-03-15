import { object, string } from "yup";

export const validationSchema = object().shape({
  name: string().required(),
  value: string().required(),
  accountId: string().required(),
  cardId: string(),
  costCenterId: string().required(),
})

export const initialValues = {
  name: "",
  value: "",
  accountId: "",
  cardId: "",
  costCenterId: "",
  transactionType: "EXPENSE"
}
