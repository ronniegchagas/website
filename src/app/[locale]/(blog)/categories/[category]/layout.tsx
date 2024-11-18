import type { Metadata } from "next";
import {
  getFormatter,
  getNow,
  getTimeZone,
  getTranslations,
} from "next-intl/server";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string; category: string }>;
};

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale, category } = await params;

  const t = await getTranslations({ locale, namespace: "Category" });
  const formatter = await getFormatter({ locale });
  const now = await getNow({ locale });
  const timeZone = await getTimeZone({ locale });

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    ),
    title: t("title", { category }),
    description: t("description", { category }),
    other: {
      currentYear: formatter.dateTime(now, { year: "numeric" }),
      timeZone: timeZone || "N/A",
    },
  };
}

export default async function RootLayout({ children }: Readonly<Props>) {
  return children;
}
