import NotFound from "@/app/not-found";
import AudioPlayer from "@/components/ui/audio-player";
import { Separator } from "@/components/ui/separator";
import { Calendar, User } from "lucide-react";
import podcasts from "@/app/podcasts/podcastsJSON.json";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const podcast = podcasts.find((podcast) => podcast.id == id);

  if (!podcast) return <NotFound />;

  return (
    <div className="container max-w-4xl px-4 py-12 md:py-16 mx-auto">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <header className="not-prose space-y-8 mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight leading-tight">
            {podcast.title}
          </h1>

          {/* Autores */}
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-sm font-medium">
              <User className="h-4 w-4" />
              Autores
            </p>
            <div className="flex flex-wrap gap-2 not-prose">
              {podcast.authors?.map((author, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 px-4 py-2 text-sm font-medium border border-blue-200/50 dark:border-blue-800/50 text-blue-700 dark:text-blue-300"
                >
                  {author}
                </span>
              ))}
            </div>
          </div>

          <Separator />
        </header>

        {/* Conteúdo */}
        <AudioPlayer
          src={podcast.path}
          title="Minha Música"
          artist="Nome do Artista"
          cover="/audio.svg"
        />

        {/* Footer */}
      </article>
    </div>
  );
}
