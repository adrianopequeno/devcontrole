import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";

const NewTicket = async () => {
  // privando a página apenas para usuários autenticados
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  // pegando todos os clientes do usuário autenticado
  const customers = await prismaClient.customer.findMany({
    where: { userId: session.user.id },
  });

  const handleRegisterTicket = async (formData: FormData) => {
    "use server";

    const { name, description, customerId } =
      Object.fromEntries(formData); /** Forma 1 */

    // forma 2 de pegar os dados do formulário
    // const name = formData.get("name");
    // const description = formData.get("description");
    // const customerId = formData.get("customer");

    if (!name || !description || !customerId) {
      return;
    }

    // salvando o chamado no banco de dados / criando novo ticket
    await prismaClient.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: "ABERTO",
        userId: session?.user.id,
      },
    });

    redirect("/dashboard");
  };

  return (
    <Container>
      <main className="flex flex-col mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="bg-[#0F172A] text-white rounded px-4 py-1"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold text-[#0F172A]">Novo chamado</h1>
        </div>

        <form className="flex flex-col mt-6" action={handleRegisterTicket}>
          <label className="mb-1 font-medium text-lg">Nome do chamado:</label>
          <input
            type="text"
            className="w-full border-2 rounded-md px-2 mb-2 h-11"
            placeholder="Digite o nome do chamado"
            required
            name="name"
          />

          <label className="mb-1 font-medium text-lg">
            Descreva o chamado:
          </label>
          <textarea
            className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
            placeholder="Descreva o problema ou solicitação..."
            required
            name="description"
          ></textarea>

          {customers.length !== 0 && (
            <>
              <label className="mb-1 font-medium text-lg">
                Selecione o cliente
              </label>
              <select
                className="w-full border-2 rounded-md px-2 mb-2 h-11"
                name="customerId"
              >
                <option value="" className="text-center">
                  Meus clientes
                </option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </>
          )}

          {customers.length === 0 && (
            <span className="mt-4 text-center">
              Você ainda não possui clientes cadastrados,{" "}
              <Link
                href="/dashboard/customer"
                className="text-blue-500 font-bold"
              >
                clique aqui para cadastrar.
              </Link>
            </span>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold px-2 h-11 rounded-md my-4 disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={customers.length === 0}
          >
            Cadastrar
          </button>
        </form>
      </main>
    </Container>
  );
};

export default NewTicket;
