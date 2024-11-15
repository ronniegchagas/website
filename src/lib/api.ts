import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

import { Post } from "@/interfaces/post";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();

  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}

export function getAllPostsByCategory(category: string): Post[] {
  const allPosts = getAllPosts();

  const posts = allPosts.filter((post) => post.categories.includes(category));

  return posts;
}

export function getAllPostsByTag(tag: string): Post[] {
  const allPosts = getAllPosts();

  const posts = allPosts.filter((post) => post.tags.includes(tag));

  return posts;
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();

  const uniqCategories = [
    ...new Set(posts.map((post) => post.categories).flat()),
  ];

  const categories = uniqCategories.sort((a, b) => a.localeCompare(b));

  return categories;
}

export function getAllTags(): string[] {
  const posts = getAllPosts();

  const uniqTags = [...new Set(posts.map((post) => post.tags).flat())];

  const tags = uniqTags.sort((a, b) => a.localeCompare(b));

  return tags;
}

export function paginatePosts(posts: Post[], page: number, limit: number) {
  const start = (page - 1) * limit;
  const end = page * limit;

  const postsPaginated = posts.slice(start, end);
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / limit);

  return { posts: postsPaginated, totalPages, totalPosts };
}
