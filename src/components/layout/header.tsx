"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { Container } from "./container";
import { Customize } from "./drawer";
import { SwitchTheme } from "./switch-theme";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="py-4 border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border sticky top-0 z-50">
      <Container css="container px-3 mx-auto flex items-center justify-between">
        {pathname === "/" && <div className="mr-auto max-sm:hidden w-36" />}
        <div
          className={cn(
            pathname === "/" ? "text-center max-sm:text-left" : "text-left"
          )}
        >
          <Link href="/">
            <Heading className="uppercase" size="h1" asChild>
              <h1>{process.env.NEXT_PUBLIC_SITE_NAME}</h1>
            </Heading>
          </Link>
          <p className="italic text-sm">
            {process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
          </p>
        </div>
        <div
          className={cn(
            "ml-auto space-x-3 text-right",
            pathname === "/" ? "w-36" : "w-64"
          )}
        >
          <Customize />
          <SwitchTheme />
          {pathname !== "/" && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              asChild
            >
              <Link href="/">
                <Home />
              </Link>
            </Button>
          )}
        </div>
      </Container>
    </header>
  );
};
