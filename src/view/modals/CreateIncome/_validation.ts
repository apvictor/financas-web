import { boolean, object, string } from "yup";

export const validationSchema = object().shape({
  name: string().required("Campo obrigatório"),
  value: string().required("Campo obrigatório"),
  accountId: string().required("Campo obrigatório"),
  paid: boolean().required(),
})

export const initialValues = {
  name: "",
  value: "",
  accountId: "",
  type: "INCOME",
  paid: false

}
