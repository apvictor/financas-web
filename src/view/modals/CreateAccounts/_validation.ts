import { object, string } from "yup";

export const validationSchema = object().shape({
  name: string().required(),
  value: string().default("0"),
});

export const initialValues = {
  name: "",
  value: "0",
}
