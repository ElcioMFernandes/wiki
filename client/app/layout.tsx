import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Home, Library, Search } from "lucide-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UDESC CEPLAN Wiki",
  description: "Compartilhe, aprenda e cresça junto com a comunidade",
};

// Itens do menu principal
const mainMenuItems = [
  { title: "Início", icon: Home, url: "/" },
  { title: "Explorar", icon: Search, url: "/posts" },
  { title: "Development ", icon: Library, url: "/admin" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <Sidebar className="select-none">
            <SidebarHeader className="px-6 py-4">
              <div className="flex items-center gap-2">
                <Image
                  src={"/banner.png"}
                  alt={"Logo UDESC CEPLAN"}
                  width={200}
                  height={29.69}
                />
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {mainMenuItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            {/* <SidebarFooter className="border-t p-4">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/perfil">
                      <User />
                      <span>Meu Perfil</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/configuracoes">
                      <Settings />
                      <span>Configurações</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter> */}
          </Sidebar>
          <SidebarInset className="flex flex-col min-h-screen">
            <header className="flex h-16 shrink-0 items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <nav>{"Breadcrumb > ... > Page"}</nav>
            </header>
            <main className="flex-1 flex flex-col gap-4 p-4">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
