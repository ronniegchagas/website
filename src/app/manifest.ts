import { MetadataRoute } from "next";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  return {
    name: process.env.NEXT_PUBLIC_SITE_NAME,
    start_url: "/",
    theme_color: "#101E33",
  };
}
