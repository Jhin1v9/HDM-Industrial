import type { ReactNode } from "react";
import type { Locale } from "@/domain/types";
import { getDictionary } from "@/i18n";
import { RequestProvider } from "@/features/request/store";
import { RequestUiProvider, RequestDrawer, MobileRequestBar } from "@/features/request/chrome";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieConsent } from "./CookieConsent";
import { mainAnchorId, jsonLdScript, siteUrl } from "@/lib/seo";
import { companyFacts } from "@/content/company";
import { coverageAreas } from "@/content/coverage";

/**
 * Organization JSON-LD (Doc 09 §100): only verified facts.
 * NO LocalBusiness, NO aggregateRating, NO invented address beyond the
 * confirmed fiscal country (Portugal). Contact data only when configured.
 */
function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HDM Industrial",
    url: siteUrl(),
    description: dict.home.heroLead,
    areaServed: coverageAreas.map((a) => ({
      "@type": "Place",
      name: dict.coverage.items[a.id]?.name ?? a.id,
    })),
  };
  if (companyFacts.email || companyFacts.phone) {
    data.contactPoint = {
      "@type": "ContactPoint",
      contactType: "sales",
      ...(companyFacts.email ? { email: companyFacts.email } : {}),
      ...(companyFacts.phone ? { telephone: companyFacts.phone } : {}),
    };
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }}
    />
  );
}

/**
 * Shared site chrome: providers + header + footer + request UI + consent.
 * Used by every root layout (one per locale tree).
 */
export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <RequestProvider locale={locale}>
      <RequestUiProvider>
        <Header locale={locale} />
        <main id={mainAnchorId(locale)}>{children}</main>
        <Footer locale={locale} />
        <MobileRequestBar locale={locale} />
        <RequestDrawer locale={locale} />
        <CookieConsent locale={locale} />
        <OrganizationJsonLd locale={locale} />
      </RequestUiProvider>
    </RequestProvider>
  );
}

export { getDictionary };
