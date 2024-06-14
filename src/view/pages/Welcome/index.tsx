import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import { CaretRight } from "@phosphor-icons/react";
import illustration from "../../../assets/illustration.png";
import { Button } from "../../components/Button";

export function Welcome() {
  return (
    <main className="h-screen w-screen flex flex-col justify-between p-8">
      <div className="mb-5">
        <img src={logo} alt="PIGPAY" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-4xl">
          Gerencie suas <br /> finanças
        </h1>
        <p className="text-slate-500">
          Controle suas finanças com o melhor aplicativo de gerenciamento
        </p>
      </div>

      <div className="flex justify-center items-center">
        <img height={300} width={300} src={illustration} alt="Ilustração" />
      </div>

      <Button>
        <Link to="/login" className="flex justify-between items-center">
          <span className="text-sm font-bold">Iniciar</span>
          <CaretRight weight="bold" />
        </Link>
      </Button>
    </main>
  );
}
