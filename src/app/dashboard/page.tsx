import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { TicketItem } from "@/app/dashboard/components/ticket";
import { ButtonRefresh } from "@/app/dashboard/components/buttonRefresh";

import prismaClient from "@/lib/prisma";

const DashboardPage = async () => {
  // privando a página apenas para usuários autenticados
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  // buscando chamados do usuário autenticado e com status "ABERTO" com os dados do cliente
  const tickets = await prismaClient.ticket.findMany({
    where: {
      status: "ABERTO",
      customer: {
        userId: session.user.id,
      },
    },
    include: { customer: true },
  });

  // console.log("Tickets:", tickets);

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl text-[#0F172A] font-bold">Chamados</h1>
          <div className="flex items-center space-x-2 ">
            <ButtonRefresh />
            <Link
              href="/dashboard/new"
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Novo chamado
            </Link>
          </div>
        </div>

        <table className="min-w-full my-2">
          <thead>
            <tr>
              <th className="font-medium text-left pl-1">CLIENTE</th>
              <th className="font-medium text-left hidden sm:block">
                DATA CADASTRO
              </th>
              <th className="font-medium text-left ">STATUS</th>
              <th className="font-medium text-left ">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <TicketItem
                key={ticket.id}
                ticket={ticket}
                customer={ticket.customer}
              />
            ))}
          </tbody>
        </table>

        {tickets.length === 0 && (
          <div className="flex items-center justify-center mt-5">
            <p className="text-[#0F172A] text-lg font-bold">
              Você ainda não possui chamados abertos!
            </p>
          </div>
        )}
      </main>
    </Container>
  );
};

export default DashboardPage;
