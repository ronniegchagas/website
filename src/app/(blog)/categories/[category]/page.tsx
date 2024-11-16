import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { ListPosts } from "@/components/list-posts";
import { Heading } from "@/components/ui/typography";
import { getAllPosts, getAllPostsByCategory } from "@/lib/api";
import { stringToArray } from "@/lib/utils";

export default async function Categories(props: Params) {
  const params = await props.params;
  const allPosts = getAllPostsByCategory(params.category);

  return (
    <Container css="container mx-auto space-y-3 p-3">
      <Heading size="h2" variant="border" asChild>
        <h2>
          Category: <span className="capitalize">{params.category}</span>
        </h2>
      </Heading>
      <ListPosts posts={allPosts} />
    </Container>
  );
}

type Params = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const posts = getAllPostsByCategory(params.category);

  if (!params) {
    return notFound();
  }

  const title = `Category: ${params.category} | ${process.env.NEXT_PUBLIC_SITE_NAME}`;
  const description = `Posts in the category ${params.category}`;

  return {
    title,
    description,
    keywords: posts.map((post) => post.categories).join(","),
    authors: posts.map((post) => post.author),
    openGraph: {
      title,
      // images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts
    .map((post) => stringToArray(post.categories))
    .flat()
    .map((category) => ({ category }));
}
