import Link from "next/link";

import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

import { stringToArray } from "@/lib/utils";
import { For } from "./render/for";

type Props = {
  tags: string;
};

export function Tags({ tags }: Props) {
  return (
    <Card className="text-center rounded-lg">
      <CardContent className="flex flex-col p-3 space-y-3">
        <strong>tags</strong>
        <div className="flex flex-wrap justify-center gap-3">
          <For each={stringToArray(tags)}>
            {(tag) => (
              <Link href={`/tags/${tag}`} key={tag}>
                <Badge
                  variant="secondary"
                  className="hover:bg-primary hover:text-primary-foreground animate-all"
                >
                  #{tag}
                </Badge>
              </Link>
            )}
          </For>
        </div>
      </CardContent>
    </Card>
  );
}
