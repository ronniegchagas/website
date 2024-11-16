import { Container } from "@/components/layout/container";
import { ListPosts } from "@/components/list-posts";
import { getAllPosts } from "@/lib/api";

export default function Home() {
  const allPosts = getAllPosts();

  return (
    <Container css="container mx-auto space-y-3 px-3">
      <ListPosts posts={allPosts} />
    </Container>
  );
}
