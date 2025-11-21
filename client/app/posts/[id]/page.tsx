import { getPostById } from "@/actions/posts";
import NotAllowed from "@/app/not-allowed";
import NotFound from "@/app/not-found";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, User } from "lucide-react";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(parseInt(id));

  if (!post) return <NotFound />;
  if (!post.confirmed) return <NotAllowed />;

  const formattedDate = new Date(post.updatedAt).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const reading = Math.ceil((post.content?.split(" ").length || 0) / 200);

  return (
    <div className="container max-w-4xl px-4 py-12 md:py-16 mx-auto">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <header className="not-prose space-y-8 mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.updatedAt.toISOString()}>
                {formattedDate}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{reading} min. de leitura</span>
            </div>
          </div>

          {/* Autores */}
          {(post.sender || (post.authors && post.authors.length > 0)) && (
            <div className="space-y-3">
              <p className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4" />
                Autores
              </p>
              <div className="flex flex-wrap gap-2 not-prose">
                {post.sender && (
                  <span className="inline-flex items-center rounded-full bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 px-4 py-2 text-sm font-medium border border-green-200/50 dark:border-green-800/50 text-green-700 dark:text-green-300">
                    {post.sender}
                  </span>
                )}
                {post.authors?.map((author, i) => (
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
        <div className="whitespace-pre-wrap leading-relaxed text-foreground/90">
          {post.content}
        </div>

        {/* Footer */}
        <footer className="not-prose mt-16 pt-8 border-t">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <span className="text-muted-foreground">
              Última atualização em {formattedDate}
            </span>
          </div>
        </footer>
      </article>
    </div>
  );
}
