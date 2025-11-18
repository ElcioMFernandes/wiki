import { Clock, Lock } from "lucide-react";
import Link from "next/link";

export default function NotAllowed() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* Ícone de bloqueio */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
          <Lock className="h-12 w-12 text-red-600 dark:text-red-500" />
        </div>

        {/* Mensagem */}
        <h2 className="mt-6 text-3xl font-semibold text-neutral-800 dark:text-neutral-200">
          Post Aguardando Confirmação
        </h2>

        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
          Este post ainda não foi confirmado pelo autor e não está disponível
          para visualização pública.
        </p>

        {/* Informação adicional */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
          <Clock className="h-4 w-4" />
          <span>Aguardando confirmação por email</span>
        </div>

        {/* Botões de ação */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/posts"
            className="rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
          >
            Ver posts publicados
          </Link>

          <Link
            href="/"
            className="rounded-lg border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
  1;
}
