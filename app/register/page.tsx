// app/register/page.tsx

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RegisterInput, registerSchema } from "@/shared/lib/validations/auth";
import { registerUser } from "@/features/auth/actions";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    setErrorMessage("");

    const result = await registerUser(data);

    if (result.success) {
      router.push("/login?registered=true");
    } else {
      setErrorMessage(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Criar conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Faça login
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {errorMessage}
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Nome"
              type="text"
              placeholder="Seu nome completo"
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
            />

            <Input
              label="Confirmar senha"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Criar conta
          </Button>
        </form>
      </div>
    </div>
  );
}
