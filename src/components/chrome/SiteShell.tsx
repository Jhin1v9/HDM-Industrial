import type { ReactNode } from "react";
import type { Locale } from "@/domain/types";
import { getDictionary } from "@/i18n";
import { RequestProvider } from "@/features/request/store";
import { RequestUiProvider, RequestDrawer, MobileRequestBar } from "@/features/request/chrome";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieConsent } from "./CookieConsent";
import { GoogleAnalytics } from "@/features/analytics/ga4";
import { WhatsappFloat } from "./WhatsappFloat";
import { BackToTop } from "./BackToTop";
import { mainAnchorId, jsonLdScript, siteUrl } from "@/lib/seo";
import { contactData } from "@/content/company";
import { coverageAreas } from "@/content/coverage";

/**
 * Organization JSON-LD (Doc 09 §100): only verified facts.
 * NO LocalBusiness, NO aggregateRating. Addresses/contact from company.ts
 * (confirmed by client 09/10/2026). Opening hours confirmed PT office.
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
    contactPoint: contactData.phones.map((phone, i) => ({
      "@type": "ContactPoint",
      contactType: i === 0 ? "sales" : "customer service",
      telephone: phone.label,
      areaServed: ["ES", "PT"],
    })),
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Calle José Santos Alves",
        addressLocality: "Pombal",
        addressCountry: "PT",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Avinguda de Francesc Macià",
        addressLocality: "Barcelona",
        addressCountry: "ES",
      },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  };
  if (contactData.emails.length > 0) {
    data.email = contactData.emails[0];
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
        <main id={mainAnchorId(locale)} className="overflow-x-clip">{children}</main>
        <Footer locale={locale} />
        <MobileRequestBar locale={locale} />
        <RequestDrawer locale={locale} />
        <CookieConsent locale={locale} />
        <GoogleAnalytics />
        <WhatsappFloat locale={locale} />
        <BackToTop />
        <OrganizationJsonLd locale={locale} />
      </RequestUiProvider>
    </RequestProvider>
  );
}

export { getDictionary };
