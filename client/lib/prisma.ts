import { PrismaClient } from "@/prisma/generated/client";

declare global {
  // Isso permite usar "globalThis.prisma" sem erro de tipagem
  var prisma: PrismaClient | undefined;
}

// Evita criar múltiplas instâncias em dev (hot reload)
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
