import { DynamicBreadcrumb } from "@/components/Breadcrumb";
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
import { Home, Library, Shield, ShieldUser } from "lucide-react";
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
  title: "Wiki UDESC",
  description: "Compartilhe, aprenda e cresça junto com a comunidade",
};

// Itens do menu principal
const menu = [
  {
    title: "Menu Principal",
    options: [
      { title: "Início", icon: Home, url: "/" },
      { title: "Explorar", icon: Library, url: "/posts" },
      { title: "Administração", icon: ShieldUser, url: "/admin" },
    ],
  },
  {
    title: "Informações",
    options: [{ title: "Política de Uso", icon: Shield, url: "/policy" }],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased select-none`}
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
              {menu.map((section) => (
                <SidebarGroup key={section.title}>
                  <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {section.options.map((item) => (
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
              ))}
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <DynamicBreadcrumb />
            </header>
            <main className="flex-1 flex flex-col gap-4 p-4">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
