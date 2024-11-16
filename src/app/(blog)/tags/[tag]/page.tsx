import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { ListPosts } from "@/components/list-posts";
import { Heading } from "@/components/ui/typography";
import { getAllPosts, getAllPostsByTag } from "@/lib/api";
import { stringToArray } from "@/lib/utils";

export default async function Tags(props: Params) {
  const params = await props.params;
  const allPosts = getAllPostsByTag(params.tag);

  return (
    <Container css="container mx-auto space-y-3 p-3">
      <Heading size="h2" variant="border" asChild>
        <h2>Tag: #{params.tag}</h2>
      </Heading>
      <ListPosts posts={allPosts} />
    </Container>
  );
}

type Params = {
  params: Promise<{
    tag: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const posts = getAllPostsByTag(params.tag);

  if (!params) {
    return notFound();
  }

  const title = `Tags: ${params.tag} | ${process.env.NEXT_PUBLIC_SITE_NAME}`;
  const description = `Posts tagged with ${params.tag}`;

  return {
    title,
    description,
    keywords: posts.map((post) => post.tags).join(","),
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
    .map((post) => stringToArray(post.tags))
    .flat()
    .map((tag) => ({ tag }));
}
