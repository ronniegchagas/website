"use client";

import { useAppStore } from "@/store/app";
import { Loading } from "./loading";

type Props = {
  children: React.ReactNode;
};

export const LoadStore = ({ children }: Props) => {
  const appStore = useAppStore((state) => state);

  if (!appStore.hydrated) {
    return <Loading />;
  }

  return <>{children}</>;
};
