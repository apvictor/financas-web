import logo from "../../../assets/logo.png";
import { ChevronRight } from "lucide-react";
import illustration from "../../../assets/illustration.png";
import { Link } from "react-router-dom";

export function Welcome() {
  return (
    <main className="h-screen w-screen flex flex-col justify-between p-8">
      <div className="mb-10">
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

      <div className="flex justify-center items-center py-10">
        <img height={100} width={220} src={illustration} alt="Ilustração" />
      </div>

      <button className="bg-[#15C770] hover:bg-[#15c771c2] transition-colors w-full h-12 rounded-lg px-4 py-3 uppercase">
        <Link to="/login" className="flex justify-between items-center">
          <span className="text-sm font-bold">Iniciar</span>
          <ChevronRight />
        </Link>
      </button>
    </main>
  );
}
