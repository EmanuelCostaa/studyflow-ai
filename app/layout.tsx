import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudyFlow AI",
  description: "Gerencie suas metas de estudo com inteligência artificial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
