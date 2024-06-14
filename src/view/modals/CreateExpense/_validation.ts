import { boolean, object, string } from "yup";

export const validationSchema = object().shape({
  name: string().required("Campo obrigatório"),
  value: string().required(),
  accountId: string().required(),
  paid: boolean().required(),
})

export const initialValues = {
  name: "",
  value: "",
  accountId: "",
  type: "EXPENSE",
  paid: false
}
