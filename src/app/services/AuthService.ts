import { api } from "./api";

interface RegisterUserModel {
  name: string
  email: string
  password: string
}
interface LoginUserModel {
  email: string
  password: string
}
export const AuthService = {
  register: async (values: RegisterUserModel) => {
    return await api.post("/register", values);
  },
  login: async (values: LoginUserModel) => {
    return await api.post("/login", values);
  }
}
