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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get('accesToken');
  const validated = verifyJwt(token?.value);

  if(!validated) redirect('/login');

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
