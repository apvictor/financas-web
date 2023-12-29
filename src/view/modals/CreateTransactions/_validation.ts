import { object, string } from "yup";

const TransactionTypeEnum = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE"
}

export const validationSchema = object().shape({
  name: string().required(),
  value: string().required(),
  accountId: string().required(),
  costCenterId: string().required(),
  transactionType: string().oneOf(Object.values(TransactionTypeEnum)).required(),
})

export const initialValues = {
  name: "",
  value: "",
  accountId: "",
  costCenterId: "",
  transactionType: ""
}
