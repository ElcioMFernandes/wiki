import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function AdminDashboard() {
  return (
    <div className="container mx-auto max-w-7xl space-y-8 py-8">
      <h1 className="text-4xl font-semibold">Painel da administração</h1>
      <h2 className="text-xl">
        Entre em um dos links para acessar o painel de cada funcionalidade
      </h2>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
        <Card className="h-full hover:shadow-xl transition-all group hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors text-2xl">
              Posts
            </CardTitle>
            <div className="text-end">
              <Link href={"/admin/posts"}>
                <Button
                  size="lg"
                  className="text-md px-8 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 shadow-lg shadow-green-500/30"
                >
                  Acessar
                </Button>
              </Link>
            </div>
          </CardHeader>
        </Card>
        <Card className="h-full hover:shadow-xl transition-all group hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors text-2xl">
              Vídeos
            </CardTitle>
            <div className="text-end">
              <Link href={"/admin/videos"}>
                <Button
                  size="lg"
                  className="text-md px-8 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 shadow-lg shadow-green-500/30"
                >
                  Acessar
                </Button>
              </Link>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
