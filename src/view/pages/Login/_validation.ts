import { object, string } from "yup";

export const validationSchema = object().shape({
  email: string()
    .email("Informe um e-mail válido")
    .required("Campo obrigatório"),
  password: string()
    .min(8, "Informe no minimo 8 caracteres")
    .required("Campo obrigatório"),
});

export const initialValues = {
  email: "",
  password: ""
}
