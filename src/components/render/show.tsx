import type React from "react";

type Props = {
  fallback?: React.ReactNode;
  when: boolean;
  children: React.ReactNode;
};

export function Show({ fallback, when, children }: Props) {
  return when ? children : fallback;
}
