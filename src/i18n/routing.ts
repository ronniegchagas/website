import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "br"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/tags/[tag]": "/tags/[tag]",
    "/post/[slug]": {
      br: "/post/[slug]",
      en: "/post/[slug]",
    },
    "/categories/[category]": {
      br: "/categorias/[category]",
      en: "/categories/[category]",
    },
  },
  localeCookie:
    process.env.NEXT_PUBLIC_USE_CASE === "locale-cookie-false"
      ? false
      : {
          // 200 days
          maxAge: 200 * 24 * 60 * 60,
        },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
