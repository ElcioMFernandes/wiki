import { listPosts } from "@/actions/posts";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Plus, Search, SearchX } from "lucide-react";
import Link from "next/link";

export default async function Posts() {
  const posts = await listPosts();

  return (
    <div className="container mx-auto max-w-7xl space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Podcasts</h1>
          <p className="text-muted-foreground">
            Explore e compartilhe conhecimento com a comunidade UDESC
          </p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Pesquisar podcasts..." className="pl-9" />
          </div>
          <Link href="/podcasts/new">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600"
            >
              <Plus className="h-4 w-4" />
              Novo Podcast
            </Button>
          </Link>
        </div>
      </div>

      {/* Content Section */}
      {posts.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <SearchX />
          </div>
          <h3 className="mt-6 text-xl font-semibold">Nenhum podcast encontrado</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            Seja o primeiro a compartilhar conhecimento com a comunidade UDESC!
          </p>
          <Link href="/podcasts/new" className="mt-6">
            <Button size="lg">
              <Plus className="h-4 w-4" />
              Criar Primeiro Podcast
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/podcasts/${post.id}`} className="group">
              <Card className="h-full hover:border-green-500/50 dark:hover:border-green-500/30 transition-all group hover:-translate-y-1">
                <CardHeader className="space-y-3">
                  <CardTitle className="line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <time dateTime={post.updatedAt.toISOString()}>
                      {new Date(post.updatedAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </CardDescription>
                </CardHeader>

                <CardContent>
                      

                  {post.content && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {post.content}
                    </p>
                  )}
                </CardContent>

                <CardFooter className="pt-4">
                  {(post.sender ||
                    (post.authors && post.authors.length > 0)) && (
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        ...(post.sender ? [post.sender] : []),
                        ...(post.authors || []),
                      ]
                        .slice(0, 3)
                        .map((author, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-primary bg-green-100/50 dark:bg-green-900/30 border border-green-200/50 dark:border-green-800/50"
                          >
                            {author}
                          </span>
                        ))}
                      {[
                        ...(post.sender ? [post.sender] : []),
                        ...(post.authors || []),
                      ].length > 3 && (
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-primary bg-green-100/50 dark:bg-green-900/30 border border-green-200/50 dark:border-green-800/50">
                          +
                          {[
                            ...(post.sender ? [post.sender] : []),
                            ...(post.authors || []),
                          ].length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
