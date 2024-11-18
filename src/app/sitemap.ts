import { MetadataRoute } from "next";

import { Locale, getPathname, routing } from "@/i18n/routing";
import { getAllCategories, getAllPosts, getAllTags } from "@/lib/api";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  const postsEntries = posts.map((post) =>
    getEntry({ pathname: `/post/[slug]`, params: { slug: post.slug } })
  );
  const tagsEntries = tags.map((tag) =>
    getEntry({ pathname: `/tags/[tag]`, params: { tag } })
  );
  const categoriesEntries = categories.map((category) =>
    getEntry({
      pathname: `/categories/[category]`,
      params: { category },
    })
  );

  return [getEntry("/"), ...postsEntries, ...categoriesEntries, ...tagsEntries];
}

type Href = Parameters<typeof getPathname>[0]["href"];

function getEntry(href: Href) {
  return {
    url: getUrl(href, routing.defaultLocale),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, getUrl(href, locale)])
      ),
    },
  };
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({ locale, href });
  return `${process.env.SITE_URL}/${locale}${pathname === "/" ? "" : pathname}`;
}
