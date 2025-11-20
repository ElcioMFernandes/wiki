import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Mic, Video } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  return (
    <div className="container mx-auto max-w-7xl space-y-8 py-8">
      <h1 className="text-4xl font-semibold">Veja nosso conteúdo</h1>
      <h2 className="text-xl">Entre em um dos links para acessar</h2>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
        <Card className="group h-full hover:shadow-xl hover:border-green-500/50 dark:hover:border-green-500/30 transition-all group hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between gap-4 p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-2.5 text-green-600 dark:bg-green-900/20 dark:text-green-400 ring-1 ring-green-500/20">
                <FileText size={20} />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  Posts
                </CardTitle>
                <p className="text-sm text-muted-foreground">Posts Variados</p>
              </div>
            </div>
            <Link href={"/posts"}>
              <Button
                size="lg"
                className="text-md px-8 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 shadow-lg shadow-green-500/30"
              >
                Acessar
              </Button>
            </Link>
          </CardHeader>
        </Card>
        <Card className="group h-full hover:shadow-xl hover:border-green-500/50 dark:hover:border-green-500/30 transition-all group hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between gap-4 p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-2.5 text-green-600 dark:bg-green-900/20 dark:text-green-400 ring-1 ring-green-500/20">
                <Video size={20} />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  Vídeos
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Galeria e players
                </p>
              </div>
            </div>

            <Link href={"/videos"}>
              <Button
                size="lg"
                className="text-md px-8 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 shadow-lg shadow-green-500/30"
              >
                Acessar
              </Button>
            </Link>
          </CardHeader>
        </Card>
        <Card className="group h-full hover:shadow-xl hover:border-green-500/50 dark:hover:border-green-500/30 transition-all group hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between gap-4 p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-2.5 text-green-600 dark:bg-green-900/20 dark:text-green-400 ring-1 ring-green-500/20">
                <Mic size={20} />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  Podcasts
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Episódios de áudio
                </p>
              </div>
            </div>

            <Link href={"/podcasts"}>
              <Button
                size="lg"
                className="text-md px-8 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 shadow-lg shadow-green-500/30"
              >
                Acessar
              </Button>
            </Link>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
