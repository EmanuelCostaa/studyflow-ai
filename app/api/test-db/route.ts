// src/app/api/test-db/route.ts

import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma";

export async function GET() {
  try {
    await prisma.$connect();

    const userCount = await prisma.user.count();

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "✅ Database conectado com sucesso!",
      database: "Neon PostgreSQL",
      userCount,
      users,
      timestamp: new Date().toISOString(),
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("❌ Erro ao conectar:", error);

    return NextResponse.json(
      {
        success: false,
        message: "❌ Erro ao conectar com database",
        error: error.message,
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
