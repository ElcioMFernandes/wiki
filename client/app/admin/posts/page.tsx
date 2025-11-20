import { listAllPosts } from "@/actions/posts";
import { ConfirmPostButton } from "@/components/ConfirmPostButton";
import { DeletePostButton } from "@/components/DeletePostButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, Clock, Eye, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPosts() {
  const posts = await listAllPosts();

  const confirmedPosts = posts.filter((post) => post.confirmed);
  const pendingPosts = posts.filter((post) => !post.confirmed);

  return (
    <div className="container mx-auto max-w-7xl space-y-8 py-8">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Posts
            </CardTitle>
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
            <p className="text-xs text-muted-foreground">
              Todos os posts cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Posts Publicados
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confirmedPosts.length}</div>
            <p className="text-xs text-muted-foreground">
              Visíveis para todos os usuários
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Aguardando Aprovação
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPosts.length}</div>
            <p className="text-xs text-muted-foreground">
              Posts pendentes de moderação
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Todos os Posts</CardTitle>
          <CardDescription>
            Lista completa de posts com opções de moderação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Nenhum post encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.id}</TableCell>
                      <TableCell>
                        <div className="max-w-[300px]">
                          <p className="truncate font-medium">{post.title}</p>
                          {post.content && (
                            <p className="truncate text-sm text-muted-foreground">
                              {post.content.substring(0, 60)}...
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{post.sender}</p>
                          {post.authors && post.authors.length > 0 && (
                            <p className="text-xs text-muted-foreground">
                              +{post.authors.length} co-autor(es)
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{post.email}</TableCell>
                      <TableCell>
                        {post.confirmed ? (
                          <Badge
                            variant="default"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Publicado
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <Clock className="mr-1 h-3 w-3" />
                            Pendente
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(post.createdAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/posts/${post.id}`}>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          {!post.confirmed && (
                            <ConfirmPostButton postId={post.id} />
                          )}
                          <DeletePostButton postId={post.id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
