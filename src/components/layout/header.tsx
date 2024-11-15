"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Undo2 } from "lucide-react";

export const Header = () => {
  const pathname = usePathname();
  return (
    <header
      className={cn(
        "py-4 border-b px-3 bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border sticky top-0",
        pathname === "/" && "text-center"
      )}
    >
      <div
        className={cn(
          pathname === "/" && "justify-center",
          "container max-w-screen-md mx-auto flex items-center"
        )}
      >
        <div>
          <Link href="/">
            <h1 className="text-2xl font-semibold uppercase">Ronnie Garcia</h1>
          </Link>
          <p className="italic text-sm">
            Fullstack JavaScript developer and Elixir enthusiast from Brazil
          </p>
        </div>
        {pathname !== "/" && (
          <Link
            href="/"
            className="w-8 h-8 hover:w-[5.25rem] hover:bg-primary/90 overflow-x-hidden flex items-center justify-start rounded-full bg-primary text-primary-foreground ml-auto shadow-lg transition-all duration-300 ease-in-out"
          >
            <div className="min-w-8 h-8 flex items-center justify-center">
              <Undo2 className="w-4 h-4" />
            </div>
            <span>Voltar</span>
          </Link>
        )}
      </div>
    </header>
  );
};
