import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_SITE_NAME} | ${process.env.NEXT_PUBLIC_SITE_SUB_TITLE}`,
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-full flex flex-col">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
