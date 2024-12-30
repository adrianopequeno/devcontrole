import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

// http://localhost:3000/api/ticket
export const PATCH = async (request: Request) => {
  const session = await getServerSession(authOptions);

  /**verifica se a sessão do usuário está ativa e se o usuário está autenticado antes de permitir a alteração de um cliente. */
  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "Você precisa estar logado para alterar um cliente.",
      },
      { status: 401 }
    );
  }

  const { id } = await request.json();

  const findTicket = await prismaClient.ticket.findFirst({
    where: { id: id as string },
  });

  if (!findTicket) {
    return NextResponse.json(
      { message: "Ticket não encontrado." },
      { status: 400 }
    );
  }

  try {
    await prismaClient.ticket.update({
      where: { id: id as string },
      data: {
        status: "FECHADO",
      },
    });

    return NextResponse.json({ message: "Ticket fechado com sucesso." });
  } catch (error) {
    return NextResponse.json(
      { error: "Ticket não encontrado." },
      { status: 400 }
    );
  }
};

export const POST = async (request: Request) => {
  const { customerId, name, description } = await request.json();

  if (!customerId || !name || !description) {
    return NextResponse.json(
      { message: "Todos os campos são obrigatórios." },
      { status: 400 }
    );
  }

  try {
    await prismaClient.ticket.create({
      data: {
        name,
        description,
        customerId,
        status: "ABERTO",
      },
    });

    return NextResponse.json({ message: "Ticket criado com sucesso." });
  } catch (error) {
    return NextResponse.json(
      { error: "Cliente não encontrado." },
      { status: 400 }
    );
  }
};
