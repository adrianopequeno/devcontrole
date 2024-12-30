import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CardCustomer } from "@/app/dashboard/customer/components/card";

import prismaClient from "@/lib/prisma";

const CustomerPage = async () => {
  // privando a página apenas para usuários autenticados
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  // buscando clientes do usuário autenticado
  const customers = await prismaClient.customer.findMany({
    where: { userId: session.user.id },
  });

  // console.log("Customers:", customers);

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-3xl text-[#0F172A] font-bold">Meus clientes</h1>
          <Link
            href="/dashboard/customer/new"
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Novo cliente
          </Link>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {customers.map((customer) => (
            <CardCustomer key={customer.id} customer={customer} />
          ))}
        </section>

        {customers.length === 0 && (
          <div className="flex items-center justify-center mt-5">
            <p className="text-[#0F172A] text-lg">
              Você ainda não possui clientes cadastrados
            </p>
          </div>
        )}
      </main>
    </Container>
  );
};

export default CustomerPage;
