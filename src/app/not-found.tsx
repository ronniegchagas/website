import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/typography";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Header />
      <Container css="container mx-auto py-10 flex flex-col justify-center items-center space-y-6 min-h-[calc(100vh-325px)]">
        <Heading size="h1" asChild>
          <h1>404 - Page Not Found</h1>
        </Heading>
        <p>Opps. This page could not be found.</p>
        <div>
          <Button asChild>
            <Link href="/">Go HOME</Link>
          </Button>
        </div>
      </Container>
      <Footer />
    </>
  );
}
