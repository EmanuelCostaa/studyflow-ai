import Link from "next/link";
import { Button } from "@/shared/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">StudyFlow AI</h1>
        <p className="text-xl text-gray-600 mb-8">
          Gerencie suas metas de estudo com inteligência artificial
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/register">
            <Button size="lg">Criar conta</Button>
          </Link>

          <Link href="/login">
            <Button size="lg" variant="outline">
              Fazer login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
