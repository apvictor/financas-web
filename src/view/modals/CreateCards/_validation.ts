import { date, object, string } from "yup";

export const validationSchema = object().shape({
  name: string().required(),
  limit: string().required(),
  dueDate: date().required(),
});

export const initialValues = {
  name: "",
  limit: "",
  dueDate: "",
}
