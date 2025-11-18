"use client";

import { createPost } from "@/actions/posts";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Schema para validação do formulário (mantém authors como string)
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

export default function Include() {
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

      // Converte authors de string para array aqui
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

      toast.success("Post criado com sucesso!", {
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

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Criar Novo Post</h1>
        <p className="text-muted-foreground mt-2">
          Compartilhe seu conhecimento com a comunidade UDESC
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="sender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu nome completo"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  Seu nome será exibido como autor do post
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
                <FormLabel>Email Institucional</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="seu.nome@edu.udesc.br"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  Apenas emails @edu.udesc.br são aceitos. Você receberá um
                  email de confirmação.
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
                <FormLabel>Autores</FormLabel>
                <FormControl>
                  <Input
                    placeholder="João Silva, Maria Santos, Pedro Costa"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  Separe os nomes dos autores por vírgula
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o título do post"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  Um título claro e descritivo para seu artigo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conteúdo</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Escreva o conteúdo do post..."
                    className="min-h-[400px] resize-y"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  O conteúdo completo do seu artigo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Publicando..." : "Publicar"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
