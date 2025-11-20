import { listAllVideos } from "@/actions/videos";
import { ConfirmVideoButton } from "@/components/ConfirmVideoButton";
import { DeleteVideoButton } from "@/components/DeleteVideoButton";
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

export default async function AdminDashboardVideo() {
  const videos = await listAllVideos();

  const confirmedVideos = videos.filter((video) => video.confirmed);
  const pendingVideos = videos.filter((video) => !video.confirmed);

  return (
    <div className="container mx-auto max-w-7xl space-y-8 py-8">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Vídeos
            </CardTitle>
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{videos.length}</div>
            <p className="text-xs text-muted-foreground">
              Todos os vídeos cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Vídeos Publicados
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confirmedVideos.length}</div>
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
            <div className="text-2xl font-bold">{pendingVideos.length}</div>
            <p className="text-xs text-muted-foreground">
              Vídeos pendentes de moderação
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Videos Table */}
      <Card>
        <CardHeader>
          <CardTitle>Todos os Vídeos</CardTitle>
          <CardDescription>
            Lista completa de vídeos com opções de moderação
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
                {videos.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Nenhum vídeo encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  videos.map((video) => (
                    <TableRow key={video.id}>
                      <TableCell className="font-medium">{video.id}</TableCell>
                      <TableCell>
                        <div className="max-w-[300px]">
                          <p className="truncate font-medium">{video.title}</p>
                          {video.url && (
                            <p className="truncate text-sm text-muted-foreground">
                              {video.url}...
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{video.sender}</p>
                          {video.authors && video.authors.length > 0 && (
                            <p className="text-xs text-muted-foreground">
                              +{video.authors.length} co-autor(es)
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{video.email}</TableCell>
                      <TableCell>
                        {video.confirmed ? (
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
                        {new Date(video.createdAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/videos/${video.id}`}>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          {!video.confirmed && (
                            <ConfirmVideoButton videoId={video.id} />
                          )}
                          <DeleteVideoButton videoId={video.id} />
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
