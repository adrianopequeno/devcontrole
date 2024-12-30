import { PrismaAdapter } from "@auth/prisma-adapter"; /* Importa o adaptador do Prisma para ser usado com o NextAuth.*/
import GoogleProvider from "next-auth/providers/google"; /* Importa o provedor de autenticação do Google para NextAuth.*/
import { AuthOptions } from "next-auth"; /* Importa o tipo AuthOptions, que define as opções de configuração do NextAuth.*/
import prismaClient from "./prisma"; /* Importa o cliente Prisma, configurado previamente para se conectar ao banco de dados.*/

export const authOptions: AuthOptions = {
  /* Define as opções de autenticação que serão usadas pelo NextAuth. */
  adapter:
    PrismaAdapter(
      prismaClient
    ) /* Configura o adaptador do Prisma, passando o cliente Prisma para que o NextAuth use o Prisma para operações de banco de dados.*/,
  providers: [
    GoogleProvider({
      clientId: process.env
        .GOOGLE_CLIENT_ID as string /* Obtém o ID do cliente Google a partir das variáveis de ambiente e o passa ao provedor.*/,
      clientSecret: process.env
        .GOOGLE_CLIENT_SECRET as string /* Obtém o segredo do cliente Google a partir das variáveis de ambiente.*/,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    /* Define uma callback para customizar os dados da sessão antes de enviá-los ao cliente.*/
    async session({ session, token, user }) {
      /* Atualiza a sessão para incluir o ID do usuário.*/
      session.user = { ...session.user, id: user.id } as {
        id: string;
        name: string;
        email: string;
        image: string;
      };
      return session; /* Retorna a sessão modificada.*/
    },
  },
};

/**
 Este código configura o NextAuth para usar o Prisma como adaptador de banco de dados e o Google como provedor de autenticação. Além disso, adiciona uma callback para incluir o id do usuário na sessão, que é útil para identificá-lo nas operações do sistema.
 */
