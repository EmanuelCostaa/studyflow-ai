// src/features/auth/actions.ts

"use server";

import { hash } from "bcryptjs";
import { z } from "zod";
import prisma from "@/shared/lib/prisma";
import { registerSchema } from "@/shared/lib/validations/auth";

export async function registerUser(data: z.infer<typeof registerSchema>) {
  try {
    // Validar dados
    const validatedData = registerSchema.parse(data);

    // Verificar se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email já cadastrado",
      };
    }

    // Hash da senha
    const hashedPassword = await hash(validatedData.password, 10);

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      message: "Usuário criado com sucesso!",
      data: user,
    };
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Dados inválidos",
        errors: error.errors,
      };
    }

    return {
      success: false,
      message: "Erro ao criar usuário. Tente novamente.",
    };
  }
}
