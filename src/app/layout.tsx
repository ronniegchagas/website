import type { Metadata } from "next";
import localFont from "next/font/local";

import { ThemeProvider } from "@/components/theme-provider";
import AppProvider from "@/context/app.context";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_SITE_NAME} | ${process.env.NEXT_PUBLIC_SITE_SUB_TITLE}`,
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
