import { useFormik } from "formik";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useAuth } from "../../../app/shared/hooks/useAuth";
import { AuthService } from "../../../app/services/AuthService";
import { initialValues, validationSchema } from "./_validation";
import { Loader } from "../../components/Loader";

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
      <div className="mb-16">
        <img src={logo} alt="PIGPAY" />
      </div>

      <div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-4xl">
            Bem vindo ao <br /> PigPay
          </h1>
          <p className="text-slate-500">Entre para acessar nossos serviços</p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="w-full pt-10 flex flex-col gap-6"
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

          <Button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? <Loader /> : "Entrar"}
          </Button>
        </form>
      </div>
      <span className="w-full text-center">
        Não tem cadastro?{" "}
        <Link
          to="/register"
          className="text-success-500 font-bold hover:text-success-500/50 transition-all"
        >
          Cadastre-se
        </Link>
      </span>
    </main>
  );
}
