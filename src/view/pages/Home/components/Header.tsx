import { DropdownMenu } from "../../../components/DropdownMenu";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { Bell, DoorOpen, User2 } from "lucide-react";
import { Line } from "../../../components/Line";

export function Header() {
  const { signOut } = useAuth();

  return (
    <header className="flex justify-between items-center gap-8">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className="p-1 bg-[#B2F2BB] rounded-full">
            <User2 size={20} className="text-black" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>
            <button
              onClick={() => signOut()}
              className="flex gap-4 items-center w-full font-bold"
            >
              <DoorOpen />
              Sair
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <Line />

      <button>
        <Bell />
      </button>
    </header>
  );
}
