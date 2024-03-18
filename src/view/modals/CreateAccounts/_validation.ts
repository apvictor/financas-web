import { object, string } from "yup";

export const validationSchema = object().shape({
  name: string().required("Campo obrigatório"),
});

export const initialValues = {
  name: "",
}
