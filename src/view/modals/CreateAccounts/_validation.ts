import { object, string } from "yup";

export const validationSchema = object().shape({
  name: string().required(),
});

export const initialValues = {
  name: "",
}
