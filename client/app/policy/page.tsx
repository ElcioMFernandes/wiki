import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import Link from "next/link";

export default function Policy() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 py-8">
      {/* Header */}
      <div className="space-y-4 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            <Shield className="h-12 w-12 text-neutral-700 dark:text-neutral-300" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Política de Uso e Conduta
            </h1>
            <p className="text-muted-foreground">Wiki Acadêmica UDESC</p>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
        {/* Introdução */}
        <section>
          <p className="text-base leading-relaxed">
            Esta wiki é um <strong>projeto acadêmico-institucional</strong>{" "}
            desenvolvido no âmbito da Universidade do Estado de Santa Catarina
            (UDESC), com finalidade exclusivamente educativa e de
            compartilhamento de conhecimento.
          </p>
        </section>

        {/* 1. Natureza do projeto */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            1. Natureza do Projeto
          </h2>
          <p className="text-base leading-relaxed mb-3">
            Trata-se de uma iniciativa estudantil supervisionada, de caráter
            acadêmico e sem fins lucrativos. O projeto está aberto à
            participação de toda a comunidade (alunos, professores, técnicos e
            público externo), desde que respeitadas as regras aqui
            estabelecidas.
          </p>
        </section>

        {/* 2. Acesso e cadastro */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            2. Acesso e Cadastro
          </h2>
          <p className="text-base leading-relaxed mb-3">
            A criação e edição de conteúdo é restrita a membros da comunidade
            UDESC (alunos, docentes e técnicos-administrativos). O material só
            ficara disponível após confirmação do responsável através e-mail
            institucional (@edu.udesc.br).
          </p>
          <p className="text-base leading-relaxed">
            Dados pessoais coletados serão utilizados unicamente para fins de
            autenticação e moderação, respeitando a Lei Geral de Proteção de
            Dados (LGPD – Lei nº 13.709/2018).
          </p>
        </section>

        {/* 3. Regras de conduta */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            3. Regras de Conduta e Conteúdo
          </h2>
          <p className="text-base leading-relaxed mb-4">
            Todo conteúdo publicado deve respeitar a legislação brasileira
            vigente, o Estatuto e o Regimento Geral da UDESC, bem como os
            princípios éticos e de convivência da comunidade universitária.
          </p>
          <p className="text-base leading-relaxed mb-3 font-medium">
            É expressamente vedada a publicação de conteúdo que:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed">
            <li>Incite violência, física ou moral;</li>
            <li>
              Promova discriminação ou preconceito de qualquer natureza (raça,
              cor, etnia, religião, orientação sexual, identidade de gênero,
              deficiência, origem etc.);
            </li>
            <li>
              Configure assédio, bullying ou exposição indevida de terceiros;
            </li>
            <li>Viole direitos autorais ou de imagem;</li>
            <li>
              Seja spam, propaganda político-partidária, religiosa ou comercial;
            </li>
            <li>Contenha material pornográfico ou de extrema violência.</li>
          </ul>
        </section>

        {/* 4. Moderação e sanções */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            4. Moderação e Sanções
          </h2>
          <p className="text-base leading-relaxed mb-3">
            A equipe de moderação (formada por alunos e orientadores do projeto)
            tem autonomia para editar, ocultar ou remover qualquer conteúdo que
            viole esta política. Usuários que desrespeitarem repetidamente as
            regras terão seu acesso bloqueado.
          </p>
          <p className="text-base leading-relaxed">
            Casos graves serão encaminhados às instâncias competentes da UDESC
            (Ouvidoria, Corregedoria, Direção de Centro ou Pró-Reitoria
            correspondente) para as medidas disciplinares cabíveis, conforme o
            Regimento Disciplinar da universidade.
          </p>
        </section>

        {/* 5. Responsabilidade */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            5. Responsabilidade
          </h2>
          <p className="text-base leading-relaxed">
            O fato de um conteúdo estar publicado na wiki não implica endosso ou
            responsabilidade institucional da UDESC sobre seu teor. A
            responsabilidade pelo conteúdo é exclusivamente de quem o publicou.
          </p>
        </section>

        {/* 6. Projeto de código aberto */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            6. Projeto de Código Aberto
          </h2>
          <p className="text-base leading-relaxed">
            Esta wiki foi desenvolvida com tecnologias abertas (Next.js +
            TypeScript) e seu código-fonte está disponível publicamente.
            Consulte o arquivo README.md do repositório para mais detalhes
            técnicos.
          </p>
        </section>

        {/* Declaração */}
        <section className="py-6 my-8">
          <p className="text-base text-center leading-relaxed font-medium">
            Ao utilizar esta plataforma, você declara que leu, compreendeu e
            concorda com os termos desta Política de Uso.
          </p>
        </section>
      </div>

      {/* Footer */}
      <div className="border-t pt-6 text-center space-y-2">
        <p className="text-sm font-medium text-foreground">
          UDESC – Universidade do Estado de Santa Catarina
        </p>
        <p className="text-sm text-muted-foreground">
          Projeto desenvolvido no CEPLAN – 2024/2025
        </p>
      </div>

      {/* Botão de voltar */}

      <Link href="/" className="flex justify-center pt-4">
        <Button>Voltar para o início</Button>
      </Link>
    </div>
  );
}
