import { useFormik } from "formik";
import logo from "../../../assets/logo.svg";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { initialValues, validationSchema } from "./_validation";
import { AuthService } from "../../../app/services/AuthService";
import { Loader } from "../../components/Loader";

export function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    onSubmit: async (values, { resetForm }) => {
      await AuthService.register(values)
        .then(() => {
          navigate("/login");
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
          <p className="text-slate-500">
            Cadastre-se para acessar nossos serviços
          </p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="w-full pt-10 flex-1 flex flex-col gap-6"
        >
          <Input
            name="name"
            placeholder="Nome"
            onBlur={formik.handleBlur}
            value={formik.values.name}
            onChange={formik.handleChange}
            messageError={formik.touched.name && formik.errors.name}
          />

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
            {formik.isSubmitting ? <Loader /> : "Confirmar"}
          </Button>
        </form>
      </div>

      <span className="w-full text-center">
        Já tem uma conta?{" "}
        <Link
          to="/login"
          className="text-success-500 font-bold hover:text-success-500/50 transition-all"
        >
          Entrar
        </Link>
      </span>
    </main>
  );
}
