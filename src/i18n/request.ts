import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "br" | "en")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (
      await (locale === routing.defaultLocale
        ? // When using Turbopack, this will enable HMR for `en`
          import("../../_dictionaries/en.json")
        : import(`../../_dictionaries/${locale}.json`))
    ).default,
  };
});
