import type { ReactNode } from "react";

export function For<T, U extends ReactNode>({
  each,
  fallback,
  children,
}: Readonly<{
  each: readonly T[];
  fallback?: ReactNode;
  children: (item: T, index: number) => U;
}>) {
  return (
    <>
      {each.length > 0
        ? each.map((item, index) => children(item, index))
        : fallback}
    </>
  );
}
