import { listPosts } from "@/actions/posts";
import { listVideos } from "@/actions/videos";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Library } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const posts = await listPosts();
  const recentPosts = posts.slice(0, 3);

  const videos = await listVideos();
  const recentVideos = videos.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen space-y-20">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-full overflow-hidden pt-20 md:pt-32">
        {/* Background linears */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 dark:bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 dark:from-green-500/5 dark:via-emerald-500/5 dark:to-teal-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="flex items-center space-x-4 max-w-3xl">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 dark:bg-green-500/30 rounded-full blur-xl animate-pulse" />
                <Image
                  src={"/logo.png"}
                  alt={"Logo UDESC"}
                  width={50}
                  height={50}
                  className="relative"
                />
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-linear-to-r from-green-600 via-emerald-700 to-red-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                Wiki UDESC
              </h1>
            </div>
            <p className="text-lg text-muted-foreground sm:text-xl md:text-2xl max-w-2xl mx-auto">
              Compartilhe conhecimento, aprenda com a comunidade e contribua
              para o crescimento acadêmico da UDESC
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/explore">
                <Button
                  size="lg"
                  className="text-lg px-8 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 shadow-lg shadow-green-500/30"
                >
                  <Library className="h-5 w-5" />
                  Explorar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      {recentPosts.length > 0 && (
        <section>
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-between mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Posts Recentes
                </h2>
                <p className="text-lg text-muted-foreground">
                  Confira as últimas contribuições da comunidade
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <Link key={post.id} href={`/posts/${post.id}`}>
                  <Card className="h-full hover:shadow-xl hover:border-green-500/50 dark:hover:border-green-500/30 transition-all group hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle className="line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription>
                        {new Date(post.updatedAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {post.content && (
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                          {post.content}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {[
                          ...(post.sender ? [post.sender] : []),
                          ...(post.authors || []),
                        ]
                          .slice(0, 2)
                          .map((author, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-primary bg-green-100/50 dark:bg-green-900/30 border border-green-200/50 dark:border-green-800/50"
                            >
                              {author}
                            </span>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {recentVideos.length > 0 && (
        <section>
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-between mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Vídeos Recentes
                </h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentVideos.map((video) => (
                <Link key={video.id} href={`/videos/${video.id}`}>
                  <Card className="h-full hover:shadow-xl hover:border-green-500/50 dark:hover:border-green-500/30 transition-all group hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle className="line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {video.title}
                      </CardTitle>
                      <CardDescription>
                        {new Date(video.updatedAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {[
                          ...(video.sender ? [video.sender] : []),
                          ...(video.authors || []),
                        ]
                          .slice(0, 2)
                          .map((author, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-primary bg-green-100/50 dark:bg-green-900/30 border border-green-200/50 dark:border-green-800/50"
                            >
                              {author}
                            </span>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
