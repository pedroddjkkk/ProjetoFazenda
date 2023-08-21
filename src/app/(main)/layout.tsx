import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
const inter = Inter({ subsets: ["latin"] });
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";
import { verifyJwt } from "@/lib/jwt";

export const metadata: Metadata = {
  title: "Beefy",
  description: "Sistema de gerenciamento de bovinos",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <main>
          <Navbar>{children}</Navbar>
        </main>
      </body>
    </html>
  );
}
