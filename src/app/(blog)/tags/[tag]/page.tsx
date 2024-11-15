import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllPosts, getAllPostsByTag } from "@/lib/api";
import { formatDate, stringToArray } from "@/lib/utils";

export default async function Tags(props: Params) {
  const params = await props.params;
  const allPosts = getAllPostsByTag(params.tag);

  return (
    <div className="container max-w-screen-md mx-auto space-y-3">
      <h2 className="text-2xl font-semibold border-b py-1 mt-3">
        Posts by Tag: #{params.tag}
      </h2>
      {allPosts.map((post) => (
        <Link key={post.date} className="px-3" href={`/posts/${post.slug}`}>
          <div className="border bg-primary/70 p-3 rounded hover:scale-[1.01] hover:bg-primary/90 space-y-3 transition-all ease-in-out duration-300">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.excerpt}</p>
            <div>{formatDate(post.date)}</div>
            <div>
              <span>Tags:</span>
              {post.tags.split(",").map((tag) => (
                <span key={tag.trim()} className="ml-3">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
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

  const title = `Tags: ${params.tag} | Ronnie Garcia`;
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