import { PrismaClient } from "@prisma/client"; /* Importa o PrismaClient para realizar operações no banco de dados.*/

let prisma: PrismaClient; /* Declara a variável `prisma` para armazenar uma instância do PrismaClient.*/

/* Verifica se o ambiente é de produção. */
if (process.env.NODE_ENV === "production") {
  prisma =
    new PrismaClient(); /* Em produção, cria uma nova instância do PrismaClient.*/
} else {
  /* Declara uma variável global customizada para evitar múltiplas instâncias do PrismaClient em ambiente de desenvolvimento.*/
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient /* Define o tipo de `prisma` no escopo global.*/;
  };

  /* Se `prisma` ainda não foi definido no escopo global, cria uma nova instância do PrismaClient.*/
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }

  prisma =
    globalWithPrisma.prisma; /* Usa a instância global do PrismaClient para evitar novas criações.*/
}

export default prisma; /* Exporta a instância do PrismaClient.*/
