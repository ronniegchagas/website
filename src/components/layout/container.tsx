"use client";

import { useApp } from "@/context/app.context";
import { cn } from "@/lib/utils";

type Props = {
  css: string;
  children: React.ReactNode;
};

export const Container = ({ children, css }: Props) => {
  const { screenWidth } = useApp();

  return (
    <div className={cn(css, "animate-transform", screenWidth)}>{children}</div>
  );
};
