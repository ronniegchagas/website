import { getAllPosts } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  const allPosts = getAllPosts();

  return (
    <div className="container max-w-screen-md mx-auto space-y-3">
      {allPosts.map((post) => (
        <Link key={post.date} className="px-3" href={`/posts/${post.slug}`}>
          <div className="border bg-primary/70 p-3 rounded hover:scale-[1.01] hover:bg-primary/90 transition-all ease-in-out duration-300">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <div>
              {formatDate(post.date)}
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
