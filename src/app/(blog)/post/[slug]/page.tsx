import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { PostBody } from "@/components/post-body";
import { Tags } from "@/components/tags";
import { Heading } from "@/components/ui/typography";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { markdownToHtml } from "@/lib/markdownToHtml";
import { formatDate } from "@/lib/utils";

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <Container css="container px-3 mx-auto">
      <article className="md:my-10 my-5">
        <div className="text-center border-b pb-3">
          <Heading className="uppercase" size="h3" asChild>
            <h3>{post.title}</h3>
          </Heading>
          {formatDate(post.date)}
        </div>
        <PostBody content={content} />
        <Tags tags={post.tags} />
      </article>
    </Container>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | ${process.env.NEXT_PUBLIC_SITE_NAME}`;

  return {
    title,
    description: post.excerpt,
    keywords: post.tags,
    authors: post.author,
    openGraph: {
      title,
      // images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
