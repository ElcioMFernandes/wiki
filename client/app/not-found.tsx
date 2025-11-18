import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-(--spacing(16))-(--spacing(64)))] flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* Número 404 */}
        <h1 className="text-9xl font-bold text-neutral-900 dark:text-white">
          404
        </h1>

        {/* Mensagem */}
        <h2 className="mt-4 text-3xl font-semibold text-neutral-800 dark:text-neutral-200">
          Página não encontrada
        </h2>

        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
          Desculpe, não conseguimos encontrar a página que você está procurando.
        </p>

        {/* Botões de ação */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
          >
            Voltar para o início
          </Link>

          <Link
            href="/posts"
            className="rounded-lg border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            Ver todos os posts
          </Link>
        </div>

        {/* Ilustração opcional */}
        <div className="mt-12">
          <svg
            className="mx-auto h-64 w-64 text-neutral-300 dark:text-neutral-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
