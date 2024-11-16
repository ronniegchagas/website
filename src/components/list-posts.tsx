import Link from "next/link";

import { For } from "@/components/render/for";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Post } from "@/interfaces/post";
import { formatDate, stringToArray } from "@/lib/utils";

type Props = {
  posts: Post[];
};

export function ListPosts({ posts }: Props) {
  return (
    <For each={posts}>
      {(post) => (
        <Link key={post.date} className="px-3" href={`/post/${post.slug}`}>
          <Card className="z-10 hover:scale-[1.01] rounded-lg animate-all">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {post.excerpt}
              <p className="mt-3">{formatDate(post.date)}</p>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3">
              <For each={stringToArray(post.tags)}>
                {(tag) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                )}
              </For>
            </CardFooter>
          </Card>
        </Link>
      )}
    </For>
  );
}
