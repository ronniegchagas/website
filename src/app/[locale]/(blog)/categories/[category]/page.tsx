import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { ListPosts } from "@/components/list-posts";
import { Show } from "@/components/render/show";
import { Heading } from "@/components/ui/typography";
import { getAllPosts, getAllPostsByCategory } from "@/lib/api";
import { stringToArray } from "@/lib/utils";

export default async function Categories(props: Params) {
  const params = await props.params;
  const allPosts = getAllPostsByCategory(params.category);

  const t = await getTranslations({
    locale: params.locale,
    namespace: "Category",
  });

  const NotFound = () => <p>{t("no-post-found")}</p>;

  return (
    <Container css="container mx-auto space-y-3 p-3">
      <Heading size="h2" variant="border" asChild>
        <h2>
          Category: <span className="capitalize">{params.category}</span>
        </h2>
      </Heading>

      <Show when={allPosts.length > 0} fallback={<NotFound />}>
        <ListPosts posts={allPosts} />
      </Show>
    </Container>
  );
}

type Params = {
  params: Promise<{
    category: string;
    locale: string;
  }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts
    .map((post) => stringToArray(post.categories))
    .flat()
    .map((category) => ({ category }));
}
