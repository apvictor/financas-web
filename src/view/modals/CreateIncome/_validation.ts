import { object, string } from "yup";

export const validationSchema = object().shape({
  name: string().required("Campo obrigatório"),
  value: string().required("Campo obrigatório"),
  accountId: string().required("Campo obrigatório"),
})

export const initialValues = {
  name: "",
  value: "",
  accountId: "",
  transactionType: "INCOME"
}
