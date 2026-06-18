import type { Metadata } from "next";
import { HubShell } from "@/components/layout/HubShell";
import "./globals.css";


export const metadata: Metadata = {
  title: "Hub de Estudos da Turma",
  description: "Materiais, calendário, avisos e revisão da turma em um só lugar."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <HubShell>{children}</HubShell>
      </body>
    </html>
  );
}
