import { DropdownMenu } from "../../../components/DropdownMenu";
import { useAuth } from "../../../../app/shared/hooks/useAuth";
import { Bell, DoorOpen } from "lucide-react";
import { Line } from "../../../components/Line";
import { initialName } from "../../../../app/helpers/initialName";

export function Header() {
  const { signOut, user } = useAuth();

  return (
    <header className="flex justify-between items-center gap-8">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className="h-8 w-12 bg-primary rounded-full text-white">
            {initialName(user.name)}
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

      <button className=" text-white">
        <Bell />
      </button>
    </header>
  );
}
