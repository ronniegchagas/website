import { Container } from "@/components/layout/container";
import { ListPosts } from "@/components/list-posts";
import { Show } from "@/components/render/show";
import { Heading } from "@/components/ui/typography";
import { getAllPosts, getAllPostsByTag } from "@/lib/api";
import { stringToArray } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export default async function Tags(props: Params) {
  const params = await props.params;
  const allPosts = getAllPostsByTag(params.tag);

  const t = await getTranslations({
    locale: params.locale,
    namespace: "Tag",
  });

  const NotFound = () => <p>{t("no-post-found")}</p>;

  return (
    <Container css="container mx-auto space-y-3 p-3">
      <Heading size="h2" variant="border" asChild>
        <h2>Tag: #{params.tag}</h2>
      </Heading>
      <Show when={allPosts.length > 0} fallback={<NotFound />}>
        <ListPosts posts={allPosts} />
      </Show>
    </Container>
  );
}

type Params = {
  params: Promise<{
    tag: string;
    locale: string;
  }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts
    .map((post) => stringToArray(post.tags))
    .flat()
    .map((tag) => ({ tag }));
}
