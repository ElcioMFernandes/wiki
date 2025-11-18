"use client";

import { createPost } from "@/actions/posts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, FileText, Loader2, Send, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const postFormSchema = z.object({
  title: z
    .string()
    .min(3, "O título deve ter no mínimo 3 caracteres")
    .max(200, "O título deve ter no máximo 200 caracteres"),
  content: z.string().min(50, "O conteúdo deve ter no mínimo 50 caracteres"),
  email: z
    .string()
    .email("Email inválido")
    .endsWith("@edu.udesc.br", "Apenas emails @edu.udesc.br são permitidos"),
  sender: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  authors: z
    .string()
    .min(3, "Informe pelo menos um autor")
    .refine(
      (val) => val.split(",").filter((a) => a.trim()).length > 0,
      "Informe pelo menos um autor"
    ),
});

type PostFormValues = z.infer<typeof postFormSchema>;

export default function NewPost() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      content: "",
      email: "",
      sender: "",
      authors: "",
    },
  });

  const onSubmit = async (data: PostFormValues) => {
    try {
      setIsSubmitting(true);

      const authorsArray = data.authors
        .split(",")
        .map((author) => author.trim())
        .filter((author) => author.length > 0);

      await createPost({
        title: data.title,
        content: data.content,
        email: data.email,
        sender: data.sender,
        authors: authorsArray,
      });

      toast.info("Post recebido com sucesso!", {
        description:
          "Você receberá um email de confirmação em breve para publicar seu artigo.",
      });

      router.push("/posts");
    } catch (error) {
      toast.error("Erro ao criar post", {
        description: "Ocorreu um erro ao tentar criar seu artigo.",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contentLength = form.watch("content")?.length || 0;
  const titleLength = form.watch("title")?.length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Criar Novo Post</h1>
          <p className="text-muted-foreground mt-1">
            Compartilhe seu conhecimento com a comunidade UDESC
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Título e Conteúdo */}
              <Card className="border-none shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Conteúdo do Post
                  </CardTitle>
                  <CardDescription>
                    Escreva um título atrativo e conteúdo informativo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Introdução ao React Hooks"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <div className="flex justify-between items-center">
                          <FormDescription>
                            Um título claro e descritivo
                          </FormDescription>
                          <span className="text-xs text-muted-foreground">
                            {titleLength}/200
                          </span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conteúdo *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Escreva o conteúdo do seu post aqui..."
                            className="min-h-[400px] resize-y font-mono text-sm"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <div className="flex justify-between items-center">
                          <FormDescription>
                            Mínimo de 50 caracteres
                          </FormDescription>
                          <span
                            className={`text-xs ${
                              contentLength >= 50
                                ? "text-green-600 dark:text-green-400"
                                : "text-muted-foreground"
                            }`}
                          >
                            {contentLength} caracteres
                          </span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-6">
              {/* Informações do Autor */}
              <Card className="border-none shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Informações do Autor
                  </CardTitle>
                  <CardDescription>
                    Dados para identificação e contato
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="sender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Nome Completo <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="João Silva"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Seu nome como autor principal
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5">
                          Email Institucional{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="seu.nome@edu.udesc.br"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Você receberá um email de confirmação
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="authors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Co-autores</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Maria Santos, Pedro Costa"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Separe os nomes por vírgula
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <p className="text-xs text-center text-muted-foreground pt-2">
                    Ao publicar, você concorda com os termos de uso da
                    plataforma
                  </p>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Publicando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Publicar Post
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
