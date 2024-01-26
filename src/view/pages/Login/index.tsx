import { useFormik } from "formik";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useAuth } from "../../../app/shared/hooks/useAuth";
import { AuthService } from "../../../app/services/AuthService";
import { initialValues, validationSchema } from "./_validation";

export function Login() {
  const { signIn } = useAuth();

  const formik = useFormik({
    onSubmit: async (values, { resetForm }) => {
      await AuthService.login(values)
        .then((data) => {
          const { token } = data.data;

          signIn(token);
          resetForm();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    initialValues,
    validationSchema,
  });

  return (
    <main className="h-screen w-screen flex flex-col justify-between p-8">
      <div className="mt-20 mb-10">
        <img src={logo} alt="PIGPAY" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-3xl">
          Bem vindo ao <br /> PigPay
        </h1>
        <p className="text-sm text-[#AAA]">
          entre para acessar nossos serviços
        </p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="w-full pt-16 flex-1 flex flex-col gap-6"
      >
        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          onBlur={formik.handleBlur}
          value={formik.values.email}
          onChange={formik.handleChange}
          messageError={formik.touched.email && formik.errors.email}
        />

        <Input
          type="password"
          name="password"
          placeholder="Senha"
          onBlur={formik.handleBlur}
          value={formik.values.password}
          onChange={formik.handleChange}
          messageError={formik.touched.password && formik.errors.password}
        />

        <Button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
          {formik.isSubmitting ? "Carregando..." : "Entrar"}
        </Button>

        <span className="w-full text-center text-sm">
          Não tem cadastro?{" "}
          <Link
            to="/register"
            className="text-[#15C770] hover:text-[#15c771c2]"
          >
            Cadastre-se
          </Link>
        </span>
      </form>
    </main>
  );
}
