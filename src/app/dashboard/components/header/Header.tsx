import { Container } from "@/components/container";
import Link from "next/link";
import { LuClipboardList, LuClipboardSignature } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";

export const Header = () => {
  return (
    <Container>
      <header className="w-full bg-gray-900 my-4 p-3 rounded flex items-center gap-4">
        <Link
          href="/dashboard"
          className=" flex items-center gap-2 text-white font-bold tracking-wider hover:text-blue-500 "
        >
          <LuClipboardList size={24} />
          Chamados
        </Link>
        <Link
          href="/dashboard/customer"
          className="flex items-center gap-2 text-white font-bold tracking-wider hover:text-blue-500"
        >
          <FiUsers size={24} />
          Clientes
        </Link>
      </header>
    </Container>
  );
};
