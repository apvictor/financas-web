import { Bell, MenuIcon } from "lucide-react";
import { Line } from "../../../components/Line";
import { Menu } from "../../../components/Menu";
import { useState } from "react";

export function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center gap-8">
        <button className="text-white" onClick={() => setOpenMenu(!openMenu)}>
          <MenuIcon />
        </button>

        <Line />

        <button className="text-white">
          <Bell />
        </button>
      </header>

      <Menu open={openMenu} onClose={() => setOpenMenu(false)} />
    </>
  );
}
