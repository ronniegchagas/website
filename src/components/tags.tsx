import Link from "next/link";

import { stringToArray } from "@/lib/utils";

type Props = {
  tags: string;
};

export function Tags({ tags }: Props) {
  return (
    <div className="text-center bg-background rounded-lg border mt-10 py-3">
      <strong>Tags:</strong>
      {stringToArray(tags).map((tag) => (
        <span key={tag} className="ml-3">
          <Link href={`/tags/${tag}`}>#{tag}</Link>
        </span>
      ))}
    </div>
  );
}
