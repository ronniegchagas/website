import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { PostBody } from "@/components/post-body";
import { Tags } from "@/components/tags";
import { Heading } from "@/components/ui/typography";
import { routing } from "@/i18n/routing";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { markdownToHtml } from "@/lib/markdownToHtml";
import { formatDate } from "@/lib/utils";

export default async function Post({ params }: Params) {
  const { slug, locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  const post = getPostBySlug(slug);

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
    locale: string;
  }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts
    .map((post) => {
      return routing.locales.map((locale) => ({ locale, slug: post.slug }));
    })
    .flat();
}
