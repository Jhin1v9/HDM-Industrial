import { L as Link } from "@/components/ui/L";
import type { Locale } from "@/domain/types";
import { getDictionary } from "@/i18n";
import { localizedPath } from "@/content/pages";
import { professionalProfiles } from "@/content/profiles";
import { needTypes } from "@/content/modes";
import { coverageAreas } from "@/content/coverage";
import { sectors } from "@/content/sectors";
import { solutions } from "@/content/modes";
import { Section, SectionHeader } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/Reveal";
import { Media, getMedia } from "@/components/media/Media";
import { Pictogram } from "@/components/ui/pictograms";
import { TeamComposer } from "@/features/request/composer";
import { OpenRequestButton } from "@/components/pages/OpenRequestButton";
import { CoverageMap } from "@/features/coverage/CoverageMap";
import { companyFacts } from "@/content/company";
import { PhoneIcon } from "@/components/ui/icons";
import { HeroRotator } from "@/components/chrome/HeroRotator";

/**
 * HOME = interface comercial (§46). Primeiro viewport: entender HDM,
 * reconhecer perfis, começar Request, contactar HDM. Sem hero passivo.
 */
export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const h = dict.home;

  // Escala derivada dos registries (nunca números falsos, Doc 10 §17).
  const scaleItems = [
    { value: professionalProfiles.length, label: h.scale.profiles },
    {
      value: professionalProfiles.reduce((n, p) => n + p.specializations.length, 0),
      label: h.scale.specializations,
    },
    { value: needTypes.length, label: h.scale.modes },
    { value: coverageAreas.length, label: h.scale.areas },
    { value: sectors.length, label: h.scale.sectors },
  ];

  return (
    <>
      {/* HERO — Brand moment 01: "Opa, posso mexer" */}
      <section className="relative overflow-hidden bg-ink-950 text-paper-50">
        {/* Wallpaper: carrossel automático (Ken Burns) no FUNDO do hero —
            pedido do cliente Matheus 2026-09-25: fotos passando atrás do
            conteúdo. Overlay escuro mantém o texto impecável. */}
        <div className="absolute inset-0" aria-hidden="true">
          <HeroRotator
            slides={[
              { src: "/images/hero-industrial.jpg", mobileSrc: "/images/hero-mobile.jpg", alt: getMedia("PH-PHOTO-HERO-01")?.alt[locale] ?? "" },
              { src: "/images/plant-industrial.jpg", alt: getMedia("PH-PHOTO-PLANT-01")?.alt[locale] ?? "" },
              { src: "/images/mobilization-logistics.jpg", alt: getMedia("PH-PHOTO-MOBILIZATION-01")?.alt[locale] ?? "" },
              { src: "/images/epi-safety.jpg", alt: getMedia("PH-PHOTO-EPI-01")?.alt[locale] ?? "" },
            ]}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-ink-950/72" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/60 via-transparent to-ink-950/30" />
        </div>
        <div className="relative mx-auto grid max-w-[76rem] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <Reveal hero className="flex flex-col justify-center">
            <p className="mb-4 font-mono text-xs tracking-[0.22em] text-steel-400 uppercase">
              {h.heroEyebrow}
            </p>
            <h1
              data-split
              className="text-[clamp(2.3rem,5.2vw,4.4rem)] leading-[1.02] font-extrabold tracking-tight text-balance"
            >
              {h.heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-steel-300">{h.heroLead}</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <OpenRequestButton
                locale={locale}
                className="flex h-13 items-center border border-signal-500 bg-signal-600 px-7 text-base font-extrabold tracking-wide text-white uppercase transition-colors duration-150 hover:bg-signal-700"
              >
                {h.heroStart}
              </OpenRequestButton>
              <Link
                href={localizedPath(locale, "personal-industrial")}
                className="flex h-13 items-center border border-paper-50/30 px-7 text-base font-bold text-paper-50 transition-colors duration-150 hover:border-paper-50"
              >
                {h.heroSecondary}
              </Link>
              {companyFacts.phone ? (
                <a
                  href={`tel:${companyFacts.phone.replace(/[^+0-9]/g, "")}`}
                  className="flex items-center gap-2 text-sm font-semibold text-steel-300 hover:text-white"
                >
                  <PhoneIcon className="h-4 w-4" /> {companyFacts.phone}
                </a>
              ) : null}
            </div>
            <p className="mt-5 text-sm text-steel-400">{h.heroNote}</p>
          </Reveal>

          {/* Mini-composer: a mesma lógica do Request completo (§196) */}
          <Reveal hero delay={120} className="border border-ink-700 bg-paper-50 p-5 text-ink-950 sm:p-6">
            <p className="mb-1 font-mono text-[11px] tracking-[0.2em] text-steel-500 uppercase">
              {h.heroComposerTitle}
            </p>
            <TeamComposer locale={locale} />
            <OpenRequestButton
              locale={locale}
              className="mt-4 flex h-12 w-full items-center justify-center border border-ink-950 bg-ink-950 text-sm font-extrabold tracking-wide text-paper-50 uppercase transition-colors duration-150 hover:bg-ink-800"
            >
              {dict.common.requestCta}
            </OpenRequestButton>
            <p className="mt-3 text-xs text-steel-500">{h.heroComposerNote}</p>
          </Reveal>
        </div>

      </section>


      {/* Cómo funciona — 3 passos (Fase 1 do plano mobile+SEO) */}
      <section className="border-b border-line-200 bg-paper-100">
        <div className="mx-auto max-w-[76rem] px-5 py-14 sm:px-8">
          <SectionHeader eyebrow={h.comoTitle} title={h.comoSub} />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              { n: '01', t: h.como1t, d: h.como1d, icon: 'welder' },
              { n: '02', t: h.como2t, d: h.como2d, icon: 'supervisor' },
              { n: '03', t: h.como3t, d: h.como3d, icon: 'builder' },
            ].map((passo, i) => (
              <Reveal key={passo.n} delay={i * 90} className="border border-line-200 bg-paper-50 p-6">
                <div className="flex items-center gap-3">
                  <Pictogram name={passo.icon} className="h-9 w-9 text-signal-600" />
                  <span className="font-mono text-xs tracking-[0.2em] text-steel-500">{passo.n}</span>
                </div>
                <h3 className="mt-4 text-lg font-extrabold tracking-tight text-ink-950">{passo.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-500">{passo.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* Escala por estrutura (§23): números derivados de registries */}
      <section className="border-b border-line-200 bg-paper-100">
        <Reveal className="mx-auto max-w-[76rem] px-5 py-10 sm:px-8">
          <p className="mb-5 font-mono text-[11px] tracking-[0.22em] text-steel-500 uppercase">
            {h.scaleEyebrow}
          </p>
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {scaleItems.map((item) => (
              <div key={item.label} className="border-l-2 border-ink-950 pl-4">
                <dt className="order-2 mt-1 text-sm font-semibold text-ink-600">{item.label}</dt>
                <dd className="tnum text-4xl font-black tracking-tight text-ink-950">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* Perfis — Brand moment 02: "Opa, posso aumentar" */}
      <Section id="perfiles">
        <SectionHeader eyebrow={dict.nav.profiles} title={h.profilesTitle} lead={h.profilesLead} />
        <ul className="grid gap-px border border-line-200 bg-line-200 sm:grid-cols-2 lg:grid-cols-3">
          {professionalProfiles.map((profile) => {
            const item = dict.profiles.items[profile.id];
            return (
              <li key={profile.id} className="bg-paper-50">
                <Link
                  href={localizedPath(locale, `personal-industrial/${profile.slug}`)}
                  className="group flex h-full flex-col gap-3 p-5 transition-colors duration-150 hover:bg-paper-100"
                >
                  <Pictogram name={profile.pictogram} className="h-10 w-10 text-ink-800 transition-colors group-hover:text-signal-600" />
                  <span className="text-lg font-extrabold tracking-tight text-ink-950">
                    {item?.name}
                  </span>
                  <span className="text-sm leading-relaxed text-ink-600">{item?.short}</span>
                  {profile.specializations.length > 0 ? (
                    <span className="mt-auto flex gap-1.5 pt-1">
                      {profile.specializations.map((s) => (
                        <span key={s} className="border border-line-300 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wide text-steel-500 uppercase">
                          {dict.profiles.specializations[s]?.name}
                        </span>
                      ))}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Cobertura — Brand moment 03: "Eles atendem aqui" */}
      <Section id="cobertura" tone="ink">
        <SectionHeader dark eyebrow={h.coverageEyebrow} title={h.coverageTitle} lead={h.coverageLead} />
        <CoverageMap locale={locale} mode="request" dark />
      </Section>

      {/* Processo — wording conservador (§55) */}
      <Section id="proceso" tone="paper-100">
        <SectionHeader eyebrow={h.processEyebrow} title={h.processTitle} lead={h.processLead} />
        <ol className="grid gap-px border border-line-300 bg-line-300 sm:grid-cols-2 lg:grid-cols-4">
          {h.processSteps.map((step, i) => (
            <li key={step.title} className="bg-paper-100 p-5">
              <span className="tnum text-3xl font-black text-steel-500">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-extrabold tracking-tight text-ink-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Confiança distribuída — documentação */}
      <Section id="confianza">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow={h.trustEyebrow} title={h.trustTitle} lead={h.trustLead} />
            <Link
              href={localizedPath(locale, "certificaciones-y-seguridad")}
              className="inline-flex h-11 items-center border border-ink-950 px-5 text-sm font-bold text-ink-950 hover:bg-paper-100"
            >
              {dict.nav.certifications}
            </Link>
          </div>
          <Media id="PH-PHOTO-EPI-01" locale={locale} className="border border-line-200" imgClassName="h-72 w-full object-cover" />
        </div>
      </Section>

      {/* Setores */}
      <Section id="sectores" tone="paper-100">
        <SectionHeader eyebrow={h.sectorsEyebrow} title={h.sectorsTitle} />
        <ul className="grid gap-px border border-line-300 bg-line-300 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => (
            <li key={sector.id}>
              <Link
                href={localizedPath(locale, `sectores/${sector.slug}`)}
                className="flex h-full items-center justify-between bg-paper-100 p-5 text-lg font-extrabold tracking-tight text-ink-950 transition-colors duration-150 hover:bg-paper-50"
              >
                {dict.sectors.items[sector.id]?.name}
                <span aria-hidden="true" className="text-signal-600">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Soluciones */}
      <Section id="soluciones">
        <SectionHeader eyebrow={h.solutionsEyebrow} title={h.solutionsTitle} />
        <ul className="grid gap-px border border-line-200 bg-line-200 md:grid-cols-2">
          {solutions.map((solution) => (
            <li key={solution.id}>
              <Link
                href={localizedPath(locale, `soluciones/${solution.slug}`)}
                className="group flex h-full flex-col gap-2 bg-paper-50 p-5 transition-colors duration-150 hover:bg-paper-100"
              >
                <span className="text-lg font-extrabold tracking-tight text-ink-950">
                  {dict.solutions.items[solution.id]?.name}
                </span>
                <span className="line-clamp-2 text-sm leading-relaxed text-ink-600">
                  {dict.solutions.items[solution.id]?.intro}
                </span>
                <span className="mt-auto pt-2 text-sm font-bold text-signal-600 group-hover:underline underline-offset-4">
                  {dict.common.readMore} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* CTA final — reabre o Request (Brand moment 04 acontece no resumen) */}
            {/* FAQ (Fase 1) — acordeão simples + FAQPage schema */}
      <section className="border-b border-line-200 bg-paper-100">
        <div className="mx-auto max-w-[52rem] px-5 py-14 sm:px-8">
          <SectionHeader title={h.faqTitle} />
          <div className="mt-6 divide-y divide-line-200 border border-line-200 bg-paper-50">
            {[
              { q: h.faq1q, a: h.faq1a },
              { q: h.faq2q, a: h.faq2a },
              { q: h.faq3q, a: h.faq3a },
            ].map((f) => (
              <details key={f.q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-ink-950">
                  {f.q}
                  <span className="text-signal-600 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-steel-500">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                { '@type': 'Question', name: h.faq1q, acceptedAnswer: { '@type': 'Answer', text: h.faq1a } },
                { '@type': 'Question', name: h.faq2q, acceptedAnswer: { '@type': 'Answer', text: h.faq2a } },
                { '@type': 'Question', name: h.faq3q, acceptedAnswer: { '@type': 'Answer', text: h.faq3a } },
              ],
            }),
          }}
        />
      </section>
<Section tone="ink">
        <div className="flex flex-col items-start gap-6">
          <h2 className="max-w-2xl text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.05] font-extrabold tracking-tight text-balance">
            {h.finalCtaTitle}
          </h2>
          <p className="max-w-xl text-lg text-steel-300">{h.finalCtaLead}</p>
          <OpenRequestButton
            locale={locale}
            className="flex h-13 items-center border border-signal-500 bg-signal-600 px-8 text-base font-extrabold tracking-wide text-white uppercase transition-colors duration-150 hover:bg-signal-700"
          >
            {h.finalCtaButton}
          </OpenRequestButton>
        </div>
      </Section>
    </>
  );
}


