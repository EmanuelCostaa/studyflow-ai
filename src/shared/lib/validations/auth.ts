// src/shared/lib/validations/auth.ts

import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Nome deve ter no mínimo 3 caracteres")
      .max(50, "Nome deve ter no máximo 50 caracteres"),
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    password: z
      .string()
      .min(6, "Senha deve ter no mínimo 6 caracteres")
      .max(100, "Senha muito longa"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
