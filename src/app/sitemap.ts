import { getAllCategories, getAllPosts, getAllTags } from "@/lib/api";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  const postsEntries = posts.map((post) => getEntry("/post", post.slug));
  const tagsEntries = tags.map((tag) => getEntry("/tags", tag));
  const categoriesEntries = categories.map((category) =>
    getEntry("/categories", category)
  );

  return [...postsEntries, ...categoriesEntries, ...tagsEntries];
}

function getEntry(page: string, folder?: string) {
  return {
    url: getUrl(page, folder),
  };
}

function getUrl(page: string, folder?: string) {
  const middle = folder ? `/${folder}` : "";

  return `${process.env.NEXT_PUBLIC_SITE_URL}/${middle}${page}`;
}
