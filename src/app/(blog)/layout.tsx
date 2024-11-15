import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Ronnie Garcia | Software Developer",
  description:
    "Fullstack JavaScript developer and Elixir enthusiast from Brazil",
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
