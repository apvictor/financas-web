import { object, string } from "yup";

export const validationSchema = object().shape({
  name: string().required(),
  value: string().required(),
  accountId: string().required(),
})

export const initialValues = {
  name: "",
  value: "",
  accountId: "",
  transactionType: "INCOME"
}
