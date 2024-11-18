"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app";

type Props = {
  css: string;
  children: React.ReactNode;
};

export const Container = ({ children, css }: Props) => {
  // const appStore = useAsyncStore(useAppStore, (state) => state);
  const appStore = useAppStore();

  const maxWidth = {
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
  };

  const style = appStore?.state.screenWidth
    ? maxWidth[appStore.state.screenWidth]
    : maxWidth.md;

  return <div className={cn(css, "animate-transform", style)}>{children}</div>;
};
