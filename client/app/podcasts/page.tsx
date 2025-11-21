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
import { Calendar, PlayCircle, Plus, Search, SearchX } from "lucide-react";
import Link from "next/link";
import podcasts from "@/app/podcasts/podcastsJSON.json";

export default async function Podcasts() {
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
      </div>

      {/* Content Section */}
      {podcasts.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <SearchX />
          </div>
          <h3 className="mt-6 text-xl font-semibold">
            Nenhum podcast encontrado
          </h3>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {podcasts.map((podcast) => (
            <Link
              key={podcast.id}
              href={`/podcasts/${podcast.id}`}
              className="group"
            >
              <Card className="h-full hover:border-green-500/50 dark:hover:border-green-500/30 transition-all group hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <CardHeader className="space-y-3">
                    <CardTitle className="line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {podcast.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-green-600/80 transition-colors">
                      <PlayCircle className="h-4 w-4" />
                      <span>Reproduzir episódio</span>
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="pt-4">
                  {podcast.authors && podcast.authors.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {podcast.authors.slice(0, 3).map((author, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-primary bg-green-100/50 dark:bg-green-900/30 border border-green-200/50 dark:border-green-800/50"
                        >
                          {author}
                        </span>
                      ))}

                      {podcast.authors.length > 3 && (
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-primary bg-green-100/50 dark:bg-green-900/30 border border-green-200/50 dark:border-green-800/50">
                          +{podcast.authors.length - 3}
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
