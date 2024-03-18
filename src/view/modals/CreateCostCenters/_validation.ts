import { number, object, string } from "yup";

export const validationSchema = object().shape({
  name: string().required("Campo obrigatório"),
  percentage: number().min(1).max(100),
});

export const initialValues = {
  name: "",
  percentage: 1,
}
