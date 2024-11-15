import { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostBody } from "@/components/post-body";
import { Tags } from "@/components/tags";

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
    <div className="container max-w-screen-md mx-auto">
      <article className="my-10">
        <div className="text-center border-b pb-3">
          <h3 className="text-xl font-semibold uppercase">{post.title}</h3>
          {formatDate(post.date)}
        </div>
        <PostBody content={content} />
        <Tags tags={post.tags} />
      </article>
    </div>
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

  const title = `${post.title} | Ronnie Garcia`;

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
