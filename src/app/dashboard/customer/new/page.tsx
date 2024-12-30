import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NewCustomerForm } from "@/app/dashboard/customer/components/form";

const NewCustomerPage = async () => {
  // privando a página apenas para usuários autenticados
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <Container>
      <main className="flex flex-col mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/customer"
            className="bg-[#0F172A] text-white rounded px-4 py-1"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold text-[#0F172A]">Novo cliente</h1>
        </div>

        <NewCustomerForm userId={session.user.id} />
      </main>
    </Container>
  );
};

export default NewCustomerPage;
