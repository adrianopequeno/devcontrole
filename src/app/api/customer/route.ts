import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

// Rota de buscar cliente pelo email enviado na URL /api/customer/search?email=EMAIL
export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const customerEmail = searchParams.get("email");

  if (!customerEmail || customerEmail.trim() === "") {
    return NextResponse.json(
      { message: "Email não informado." },
      { status: 400 }
    );
  }

  try {
    const customer = await prismaClient.customer.findFirst({
      where: { email: customerEmail },
    });

    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao receber email." },
      { status: 400 }
    );
  }
};

// Rota de cadastrar cliente
export const POST = async (request: Request) => {
  // barrar o cadastro caso o usuário não tenha uma sessão iniciada
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "Você precisa estar logado para cadastrar um novo cliente.",
      },
      { status: 401 }
    );
  }

  const { name, email, phone, address, userId } = await request.json();
  try {
    await prismaClient.customer.create({
      data: {
        name,
        email,
        phone,
        address: address ?? "",
        userId,
      },
    });

    return NextResponse.json(
      {
        message: "Cliente cadastrado com sucesso!",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erro ao cadastrar cliente. Tente novamente mais tarde.",
      },
      { status: 400 }
    );
  }
};

// Rota de Deletar cliente
export const DELETE = async (request: Request) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "Você precisa estar logado para deletar um cliente.",
      },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json(
      {
        error: "ID do cliente não informado.",
      },
      { status: 400 }
    );
  }

  /* verificando se o cliente que esta sedo deletado tem chamado aberto */
  const hasOpenTicket = await prismaClient.ticket.findFirst({
    where: {
      customerId: userId,
    },
  });

  if (hasOpenTicket) {
    return NextResponse.json(
      {
        error: "Não é possível deletar um cliente com chamados em aberto.",
      },
      { status: 400 }
    );
  }

  try {
    await prismaClient.customer.delete({
      where: {
        id: userId as string,
      },
    });

    return NextResponse.json(
      {
        message: "Cliente deletado com sucesso!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erro ao deletar cliente. Tente novamente mais tarde.",
      },
      { status: 400 }
    );
  }
};
