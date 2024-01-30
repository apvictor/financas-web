import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { ChevronRight } from "lucide-react";
import illustration from "../../../assets/illustration.png";
import { Button } from "../../components/Button";

export function Welcome() {
  return (
    <main className="h-screen w-screen flex flex-col justify-between p-6">
      <div className="mb-5">
        <img src={logo} alt="PIGPAY" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-3xl">
          Gerencie suas <br />
          finanças
        </h1>
        <p className="text-sm text-[#AAA]">
          Controle suas finanças com o melhor App de gerenciamento
        </p>
      </div>

      <div className="flex justify-center items-center">
        <img height={300} width={300} src={illustration} alt="Ilustração" />
      </div>

      <Button>
        <Link to="/login" className="flex justify-between items-center">
          <span className="text-sm font-bold">Iniciar</span>
          <ChevronRight />
        </Link>
      </Button>
    </main>
  );
}
