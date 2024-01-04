import { object, string } from "yup";

export const validationSchema = object().shape({
  name: string().required(),
  value: string().required(),
  accountId: string().required(),
  costCenterId: string().required(),
})

export const initialValues = {
  name: "",
  value: "",
  accountId: "",
  costCenterId: "",
  transactionType: "EXPENSE"
}
