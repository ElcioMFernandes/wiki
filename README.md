# Wiki UDESC

Uma plataforma de compartilhamento de conhecimento para a comunidade acadêmica da UDESC.

## 📋 Sobre o Projeto

Wiki UDESC é uma plataforma de compartilhamento de conhecimento para a comunidade acadêmica da UDESC. O projeto permite que estudantes e professores publiquem artigos técnicos e científicos, com sistema de moderação por email institucional.

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 16.0.3 (App Router)
- **Linguagem**: TypeScript 5
- **Banco de Dados**: PostgreSQL (via Supabase)
- **ORM**: Prisma 6.19.0
- **Estilização**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Formulários**: React Hook Form + Zod
- **Email**: Resend
- **Tema**: next-themes (suporte a dark mode)

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js 20.x ou superior
- npm ou yarn ou pnpm ou bun
- Git
- Conta no Supabase (para o banco de dados PostgreSQL)
- Conta no Resend (para envio de emails)

## 🚀 Instalação

### 1. Clone o Repositório

```bash
git clone <url-do-repositorio>
cd wiki
```

### 2. Navegue até a pasta do cliente

```bash
cd client
```

### 3. Instale as Dependências

Escolha seu gerenciador de pacotes preferido:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install

# bun
bun install
```

### 4. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na pasta `client`:

```env
# Database (Supabase)
DATABASE_URL="postgresql://user:password@host:port/database?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://user:password@host:port/database"

# Resend (Email)
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxx"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

#### Como obter as credenciais:

**Supabase (Banco de Dados):**

- Acesse [supabase.com](https://supabase.com)
- Crie um novo projeto
- Vá em Settings → Database
- Copie a _Connection String_ (para `DATABASE_URL`)
- Copie a _Direct Connection String_ (para `DIRECT_URL`)

**Resend (Email):**

- Acesse [resend.com](https://resend.com)
- Crie uma conta
- Vá em API Keys
- Crie uma nova chave e copie para `RESEND_API_KEY`

### 5. Configure o Banco de Dados

Execute as migrations do Prisma para criar as tabelas:

```bash
# Gera o Prisma Client
npx prisma generate

# Executa as migrations
npx prisma migrate dev --name init
```

### 6. (Opcional) Popule o Banco com Dados de Teste

```bash
npx prisma db seed
```

### 7. Inicie o Servidor de Desenvolvimento

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev

# bun
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
client/
├── actions/           # Server Actions (lógica de negócio)
│   └── posts.ts       # CRUD de posts
├── app/               # Next.js App Router
│   ├── layout.tsx     # Layout principal
│   ├── page.tsx       # Página inicial
│   ├── posts/         # Rotas de posts
│   │   ├── include/   # Criar novo post
│   │   └── [id]/      # Visualizar post
│   └── globals.css    # Estilos globais
├── components/        # Componentes React
│   └── ui/            # Componentes shadcn/ui
├── hooks/             # Custom React Hooks
├── lib/               # Utilitários e configurações
│   └── utils.ts       # Funções auxiliares
├── prisma/            # Configuração do Prisma
│   └── schema.prisma  # Schema do banco de dados
├── public/            # Arquivos estáticos
├── .env               # Variáveis de ambiente (não commitar)
├── next.config.ts     # Configuração do Next.js
├── tailwind.config.ts # Configuração do Tailwind
└── tsconfig.json      # Configuração do TypeScript
```

## 📄 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
