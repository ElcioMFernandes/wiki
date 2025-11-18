import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <Image
              src={"/banner.png"}
              alt={"Banner Udesc CEPLAN"}
              width={400}
              height={200}
            />
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">
              Navegação
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/posts"
                  className="text-sm text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  Posts
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">
              Recursos
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  Documentação
                </Link>
              </li>
              <li>
                <Link
                  href="/api"
                  className="text-sm text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  API
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/policy"
                  className="text-sm text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  Política de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
            &copy; {currentYear} Wiki UDESC – Projeto acadêmico •{" "}
            <a href="/policy">Política de Uso</a> •{" "}
            <a href="https://github.com/ElcioMFernandes/wiki">GitHub</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
