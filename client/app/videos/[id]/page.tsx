import { getVideoById } from "@/actions/videos";
import NotAllowed from "@/app/not-allowed";
import NotFound from "@/app/not-found";
import { Separator } from "@/components/ui/separator";
import { Calendar, User } from "lucide-react";
import ReactPlayer from "react-player";

export default async function Video({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const video = await getVideoById(parseInt(id));

  if (!video) return <NotFound />;
  if (!video.confirmed) return <NotAllowed />;

  const formattedDate = new Date(video.updatedAt).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container max-w-4xl px-4 py-12 md:py-16 mx-auto">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <header className="not-prose space-y-8 mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight leading-tight">
            {video.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={video.updatedAt.toISOString()}>
                {formattedDate}
              </time>
            </div>
          </div>

          {/* Autores */}
          {(video.sender || (video.authors && video.authors.length > 0)) && (
            <div className="space-y-3">
              <p className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4" />
                Autores
              </p>
              <div className="flex flex-wrap gap-2 not-prose">
                {video.sender && (
                  <span className="inline-flex items-center rounded-full bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 px-4 py-2 text-sm font-medium border border-green-200/50 dark:border-green-800/50 text-green-700 dark:text-green-300">
                    {video.sender}
                  </span>
                )}
                {video.authors?.map((author, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-full bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 px-4 py-2 text-sm font-medium border border-blue-200/50 dark:border-blue-800/50 text-blue-700 dark:text-blue-300"
                  >
                    {author}
                  </span>
                ))}
              </div>
            </div>
          )}

          <Separator />
        </header>

        {/* Conteúdo */}
        <div>
          <ReactPlayer src={video.url} width={675} height={380} />
        </div>

        {/* Footer */}
      </article>
    </div>
  );
}
