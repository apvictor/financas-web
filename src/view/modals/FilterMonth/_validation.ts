import { object, string } from "yup";

const month = (new Date().getMonth() + 1)
const year = (new Date().getFullYear())

export const date = `${year}-${month > 9 ? month : "0" + month}`

export const validationSchema = object().shape({
  month: string(),
})

export const initialValues = {
  month: date,
}
