import { type Author } from "./author";

export type Post = {
  slug: string;
  title: string;
  date: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  categories: string;
  tags: string;
  content: string;
  preview?: boolean;
};
