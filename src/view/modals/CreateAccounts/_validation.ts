import { object, string } from "yup";

const TypeEnum = {
  CASH: "CASH",
  INVESTIMENT: "INVESTMENT"
}

export const validationSchema = object().shape({
  name: string().required(),
  value: string().default("0"),
  type: string().oneOf(Object.values(TypeEnum)).required(),
});

export const initialValues = {
  name: "",
  value: "0",
  type: ""
}
