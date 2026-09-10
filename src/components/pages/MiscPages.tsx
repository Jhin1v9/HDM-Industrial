import type { Locale } from "@/domain/types";
import { getDictionary } from "@/i18n";
import { localizedPath } from "@/content/pages";
import { companyFacts, whatsappLink } from "@/content/company";
import { Section, SectionHeader, Container } from "@/components/ui/layout";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RequestPanel } from "@/features/request/panel";
import { OpenRequestButton } from "./OpenRequestButton";
import { PhoneIcon, MailIcon, WhatsAppIcon } from "@/components/ui/icons";
import { ContactMailForm } from "./ContactMailForm";
import Link from "next/link";

/* ---------------------------- SOLICITAR PERSONAL ----------------------------- */

export function SolicitarPersonalPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <Section>
      <Container narrow>
        <Breadcrumbs locale={locale} items={[{ label: dict.nav.request }]} />
        <SectionHeader
          eyebrow="HDM Industrial"
          title={dict.request.title}
          lead={dict.home.heroNote}
          as="h1"
        />
        <div className="border border-line-300 bg-paper-50 p-5 sm:p-8">
          <RequestPanel locale={locale} />
        </div>
      </Container>
    </Section>
  );
}

/* --------------------------------- CONTACTO ---------------------------------- */

export function ContactoPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const c = dict.contact;
  const wa = whatsappLink(dict.request.whatsappIntro);
  return (
    <Section>
      <Container narrow>
        <Breadcrumbs locale={locale} items={[{ label: dict.nav.contact }]} />
        <SectionHeader eyebrow="HDM Industrial" title={c.title} lead={c.lead} as="h1" />
        <div className="flex flex-col gap-8">
          <OpenRequestButton
            locale={locale}
            className="flex h-14 items-center justify-center border border-signal-500 bg-signal-600 px-8 text-base font-extrabold tracking-wide text-white uppercase hover:bg-signal-700"
          >
            {dict.common.requestCta}
          </OpenRequestButton>

          <div className="border border-line-200 bg-paper-50 p-6">
            <h2 className="font-mono text-xs tracking-[0.2em] text-steel-500 uppercase">
              {c.directTitle}
            </h2>
            {companyFacts.phone || companyFacts.email || companyFacts.whatsapp ? (
              <ul className="mt-4 flex flex-col gap-3">
                {companyFacts.phone ? (
                  <li>
                    <a
                      href={`tel:${companyFacts.phone.replace(/[^+0-9]/g, "")}`}
                      className="flex items-center gap-3 text-lg font-bold text-ink-950 hover:text-signal-600"
                    >
                      <PhoneIcon className="h-5 w-5 text-steel-500" /> {companyFacts.phone}
                    </a>
                  </li>
                ) : null}
                {companyFacts.email ? (
                  <li>
                    <a
                      href={`mailto:${companyFacts.email}`}
                      className="flex items-center gap-3 text-lg font-bold text-ink-950 hover:text-signal-600"
                    >
                      <MailIcon className="h-5 w-5 text-steel-500" /> {companyFacts.email}
                    </a>
                  </li>
                ) : null}
                {wa ? (
                  <li>
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-lg font-bold text-ink-950 hover:text-signal-600"
                    >
                      <WhatsAppIcon className="h-5 w-5 text-steel-500" /> WhatsApp
                    </a>
                  </li>
                ) : null}
              </ul>
            ) : (
              <p className="mt-4 border-l-2 border-signal-600 pl-4 text-base text-ink-600">
                {c.pendingData}
              </p>
            )}
            <p className="mt-6 text-xs text-steel-500">{dict.footer.fiscalNote}</p>
          </div>

          {companyFacts.email ? (
            <div className="border border-line-200 bg-paper-50 p-6">
              <h2 className="text-lg font-extrabold text-ink-950">{c.formTitle}</h2>
              <p className="mt-1 text-sm text-ink-600">{c.formNote}</p>
              <ContactMailForm locale={locale} />
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}



/* ----------------------------------- LEGAL ----------------------------------- */

export function LegalPage({
  locale,
  kind,
}: {
  locale: Locale;
  kind: "aviso" | "privacidad" | "cookies";
}) {
  const dict = getDictionary(locale);
  const labels = {
    aviso: dict.footer.legalNotice,
    privacidad: dict.footer.privacy,
    cookies: dict.footer.cookies,
  };
  const content = dict.legal[kind];
  return (
    <Section>
      <Container narrow>
        <Breadcrumbs locale={locale} items={[{ label: labels[kind] }]} />
        <SectionHeader eyebrow={dict.footer.legal} title={content.title} as="h1" />
        {"body" in content ? (
          <p className="max-w-2xl text-base leading-relaxed text-ink-700">{content.body}</p>
        ) : (
          <div className="flex flex-col gap-6">
            <p className="max-w-2xl text-base leading-relaxed text-ink-700">{content.intro}</p>
            {content.sections.map((s) => (
              <div key={s.title} className="border-l-2 border-ink-950 pl-5">
                <h2 className="text-lg font-extrabold text-ink-950">{s.title}</h2>
                <p className="mt-1 max-w-2xl text-base leading-relaxed text-ink-600">{s.body}</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}

/* ---------------------------------- 404 -------------------------------------- */

export function NotFoundContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const nf = dict.notFound;
  return (
    <Section>
      <Container narrow className="text-center">
        <p className="tnum text-7xl font-black text-steel-300">404</p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-950">{nf.title}</h1>
        <p className="mx-auto mt-3 max-w-md text-base text-ink-600">{nf.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={localizedPath(locale, "")}
            className="flex h-12 items-center border border-ink-950 bg-ink-950 px-6 text-sm font-bold text-paper-50 hover:bg-ink-800"
          >
            {nf.cta}
          </Link>
          <OpenRequestButton
            locale={locale}
            className="flex h-12 items-center border border-signal-600 px-6 text-sm font-bold text-signal-600 hover:bg-signal-100"
          >
            {dict.common.viewRequest}
          </OpenRequestButton>
        </div>
      </Container>
    </Section>
  );
}
