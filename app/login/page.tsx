// app/login/page.tsx

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { LoginInput, loginSchema } from "@/shared/lib/validations/auth";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const registered = searchParams.get("registered");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setErrorMessage("");

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setErrorMessage("Email ou senha incorretos");
      setIsLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Fazer login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Não tem uma conta?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Criar conta
            </Link>
          </p>
        </div>

        {registered && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            Conta criada com sucesso! Faça login para continuar.
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {errorMessage}
            </div>
          )}

          <div className="space-y-4">
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
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
