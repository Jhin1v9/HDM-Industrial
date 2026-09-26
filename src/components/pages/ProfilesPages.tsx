import Link from "next/link";
import type { Locale, ProfessionalProfile } from "@/domain/types";
import { getDictionary } from "@/i18n";
import { localizedPath } from "@/content/pages";
import { professionalProfiles } from "@/content/profiles";
import { sectors } from "@/content/sectors";
import { Section, SectionHeader } from "@/components/ui/layout";
import { Media } from "@/components/media/Media";
import { Pictogram } from "@/components/ui/pictograms";
import { OpenRequestButton } from "./OpenRequestButton";
import { PrefillProfessionButton } from "./PrefillButtons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function ProfilesIndexPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const p = dict.profiles;
  return (
    <>
      <Section>
        <Breadcrumbs locale={locale} items={[{ label: dict.nav.profiles }]} />
        <SectionHeader eyebrow="HDM Industrial" title={p.title} lead={p.lead} as="h1" />
        <ul className="grid gap-px border border-line-200 bg-line-200 sm:grid-cols-2">
          {professionalProfiles.map((profile) => {
            const item = p.items[profile.id];
            return (
              <li key={profile.id} className="bg-paper-50">
                <div className="flex h-full flex-col gap-4 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <Pictogram name={profile.pictogram} className="h-12 w-12 text-ink-800" />
                    {profile.specializations.length > 0 ? (
                      <span className="flex gap-1.5">
                        {profile.specializations.map((s) => (
                          <span key={s} className="border border-line-300 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wide text-steel-500 uppercase">
                            {p.specializations[s]?.name}
                          </span>
                        ))}
                      </span>
                    ) : null}
                  </div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-ink-950">{item?.name}</h2>
                  <p className="text-base leading-relaxed text-ink-600">{item?.short}</p>
                  <div className="mt-auto flex flex-wrap gap-3 pt-2">
                    <Link
                      href={localizedPath(locale, `personal-industrial/${profile.slug}`)}
                      className="flex h-11 items-center border border-ink-950 px-4 text-sm font-bold text-ink-950 hover:bg-paper-100"
                    >
                      {dict.common.readMore}
                    </Link>
                    <PrefillProfessionButton
                      locale={locale}
                      profession={profile.id}
                      className="flex h-11 items-center border border-signal-600 px-4 text-sm font-bold text-signal-600 hover:bg-signal-100"
                    >
                      {dict.common.addToRequest}
                    </PrefillProfessionButton>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}

export function ProfileDetailPage({
  locale,
  profile,
}: {
  locale: Locale;
  profile: ProfessionalProfile;
}) {
  const dict = getDictionary(locale);
  const p = dict.profiles;
  const item = p.items[profile.id];
  if (!item) return null;

  return (
    <>
      <Section>
        <Breadcrumbs
          locale={locale}
          items={[
            { label: dict.nav.profiles, href: localizedPath(locale, "personal-industrial") },
            { label: item.name },
          ]}
        />
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <Pictogram name={profile.pictogram} className="h-14 w-14 text-ink-800" />
              <h1 className="text-[clamp(2rem,4vw,3.4rem)] leading-none font-extrabold tracking-tight text-ink-950">
                {item.name}
              </h1>
            </div>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-700">{item.description}</p>
            {item.queHacen ? (
              <>
                <h2 className="mt-10 text-xl font-extrabold tracking-tight text-ink-950">
                  {p.queHacenTitle}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-700">{item.queHacen}</p>
              </>
            ) : null}
            {item.cuando && item.cuando.length > 0 ? (
              <>
                <h2 className="mt-10 text-xl font-extrabold tracking-tight text-ink-950">
                  {p.cuandoTitle}
                </h2>
                <ul className="mt-3 max-w-2xl space-y-2">
                  {item.cuando.map((c) => (
                    <li key={c} className="flex gap-2 text-base leading-relaxed text-ink-700">
                      <span className="mt-2 h-1.5 w-1.5 flex-none bg-signal-600" />
                      {c}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            {item.verifica ? (
              <div className="mt-10 max-w-2xl border border-ok-600/40 bg-paper-50 p-5">
                <p className="font-mono text-[11px] tracking-[0.18em] text-ok-600 uppercase">
                  {p.verificaTitle}
                </p>
                <p className="mt-2 text-base leading-relaxed text-ink-700">{item.verifica}</p>
              </div>
            ) : null}


            {profile.specializations.length > 0 ? (
              <div className="mt-8">
                <h2 className="font-mono text-xs tracking-[0.2em] text-steel-500 uppercase">
                  {p.specializationLabel}
                </h2>
                <ul className="mt-3 grid gap-px border border-line-200 bg-line-200 sm:grid-cols-3">
                  {profile.specializations.map((s) => {
                    const spec = p.specializations[s];
                    return (
                      <li key={s} className="bg-paper-50 p-4">
                        <p className="font-mono text-sm font-bold text-ink-950">{spec?.name}</p>
                        <p className="mt-1 text-sm text-ink-600">{spec?.description}</p>
                      </li>
                    );
                  })}
                </ul>
                {/* Galeria editorial por especialidad (fotos públicas verificadas) */}
                <ul className="mt-4 grid gap-4 sm:grid-cols-3">
                  {["PH-PHOTO-TIG-01", "PH-PHOTO-MIGMAG-01", "PH-PHOTO-ELECTRODO-01"].map((id) => (
                    <li key={id}>
                      <Media id={id} locale={locale} className="border border-line-200" imgClassName="aspect-[4/3] w-full object-cover" />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="mt-8">
                <Media id={profile.mediaId} locale={locale} className="border border-line-200" imgClassName="aspect-[4/3] w-full object-cover" />
              </div>
            )}

            <div className="mt-8 border-l-2 border-ink-950 pl-5">
              <h2 className="font-mono text-xs tracking-[0.2em] text-steel-500 uppercase">
                {p.requirements}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-ink-700">{item.requirements}</p>
            </div>

            <div className="mt-8">
              <h2 className="font-mono text-xs tracking-[0.2em] text-steel-500 uppercase">
                {p.relatedSectors}
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {sectors.filter((s) => s.indexable).map((s) => (
                  <li key={s.id}>
                    <Link
                      href={localizedPath(locale, `sectores/${s.slug}`)}
                      className="inline-flex h-9 items-center border border-line-300 px-3 text-sm font-semibold text-ink-700 hover:border-ink-600"
                    >
                      {dict.sectors.items[s.id]?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card de ação — perfil é objeto (§61) */}
          <aside className="h-fit border border-ink-950 bg-paper-50 lg:sticky lg:top-24">
            <div className="border-b border-line-200 p-5">
              <p className="font-mono text-[11px] tracking-[0.2em] text-steel-500 uppercase">
                {dict.common.requestCta}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {dict.home.heroNote}
              </p>
            </div>
            <div className="flex flex-col gap-3 p-5">
              <PrefillProfessionButton
                locale={locale}
                profession={profile.id}
                className="flex h-12 items-center justify-center border border-signal-500 bg-signal-600 px-5 text-sm font-extrabold tracking-wide text-white uppercase hover:bg-signal-700"
              >
                {dict.common.startRequestHere}
              </PrefillProfessionButton>
              <OpenRequestButton
                locale={locale}
                className="flex h-12 items-center justify-center border border-ink-950 px-5 text-sm font-bold text-ink-950 hover:bg-paper-100"
              >
                {dict.common.viewRequest}
              </OpenRequestButton>
            </div>
          </aside>
        </div>
      </Section>
      {item.faq && item.faq.length > 0 ? (
        <Section>
          <SectionHeader title={p.faqTitle} />
          <div className="mt-2 max-w-2xl divide-y divide-line-200 border border-line-200 bg-paper-50">
            {item.faq.map((f) => (
              <details key={f.q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-ink-950">
                  {f.q}
                  <span className="text-signal-600 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-steel-500">{f.a}</p>
              </details>
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: item.faq.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            }}
          />
        </Section>
      ) : null}
    </>
  );

}
