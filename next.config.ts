import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: process.env.NEXT_PUBLIC_USE_CASE === "trailing-slash",
  basePath:
    process.env.NEXT_PUBLIC_USE_CASE === "base-path" ? "/base/path" : undefined,
  experimental: {
    staleTimes: {
      // Next.js 14.2 broke `locale-prefix-never.spec.ts`.
      // This is a workaround for the time being.
      dynamic: 0,
    },
  },
};

export default withNextIntl(nextConfig);
