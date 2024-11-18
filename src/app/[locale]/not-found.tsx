import { useTranslations } from "next-intl";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/typography";

export default function NotFound() {
  const t = useTranslations("404");

  return (
    <>
      <Header />
      <Container css="container mx-auto py-10 flex flex-col justify-center items-center space-y-6 min-h-[calc(100vh-325px)]">
        <Heading size="h1" asChild>
          <h1>{t("title")}</h1>
        </Heading>
        <p>{t("description")}</p>
        <div>
          <Button asChild>
            <Link href="/">{t("go-home")}</Link>
          </Button>
        </div>
      </Container>
      <Footer />
    </>
  );
}
