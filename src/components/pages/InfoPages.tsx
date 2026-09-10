import type { Locale, Sector, CoverageArea } from "@/domain/types";
import { solutions, type Solution } from "@/content/modes";
import { getDictionary } from "@/i18n";
import { localizedPath } from "@/content/pages";
import { sectors } from "@/content/sectors";
import { professionalProfiles } from "@/content/profiles";
import { Section, SectionHeader } from "@/components/ui/layout";
import { Media } from "@/components/media/Media";
import { Pictogram } from "@/components/ui/pictograms";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PrefillNeedTypeButton, PrefillAreaButton, PrefillProfessionButton } from "./PrefillButtons";
import { CoverageMap } from "@/features/coverage/CoverageMap";

/* --------------------------------- SOLUTIONS --------------------------------- */

const solutionMedia: Record<string, string> = {
  "paradas-industriales": "PH-PHOTO-PLANT-01",
  "refuerzo-de-personal": "PH-PHOTO-MONTADOR-01",
  "sustitucion-temporal": "PH-PHOTO-EPI-01",
  "trabajos-puntuales": "PH-PHOTO-STRUCTURE-01",
  "personal-con-desplazamiento": "PH-PHOTO-MOBILIZATION-01",
};

export function SolutionsIndexPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const s = dict.solutions;
  return (
    <Section>
      <Breadcrumbs locale={locale} items={[{ label: dict.nav.solutions }]} />
      <SectionHeader eyebrow="HDM Industrial" title={s.title} lead={s.lead} as="h1" />
      <ul className="grid gap-px border border-line-200 bg-line-200 md:grid-cols-2">
        {solutions.map((solution) => {
          const item = s.items[solution.id];
          return (
            <li key={solution.id} className="bg-paper-50">
              <a
                href={localizedPath(locale, `soluciones/${solution.slug}`)}
                className="flex h-full flex-col gap-2 p-6 transition-colors duration-150 hover:bg-paper-100"
              >
                <span className="text-xl font-extrabold tracking-tight text-ink-950">{item?.name}</span>
                <span className="text-sm leading-relaxed text-ink-600 line-clamp-3">{item?.intro}</span>
                <span className="mt-auto pt-2 text-sm font-bold text-signal-600">
                  {dict.common.readMore} →
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

export function SolutionDetailPage({ locale, solution }: { locale: Locale; solution: Solution }) {
  const dict = getDictionary(locale);
  const item = dict.solutions.items[solution.id];
  if (!item) return null;
  return (
    <Section>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: dict.nav.solutions, href: localizedPath(locale, "soluciones") },
          { label: item.name },
        ]}
      />
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h1 className="text-[clamp(2rem,4vw,3.4rem)] leading-none font-extrabold tracking-tight text-ink-950">
            {item.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-700">{item.intro}</p>
          <ul className="mt-8 flex flex-col gap-3">
            {item.points.map((point) => (
              <li key={point} className="flex items-start gap-3 border-l-2 border-signal-600 pl-4 text-base text-ink-800">
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Media
              locale={locale}
              id={solutionMedia[solution.id] ?? "PH-PHOTO-PLANT-01"}
              className="border border-line-200"
              imgClassName="aspect-video w-full object-cover"
            />
          </div>
        </div>
        <aside className="h-fit border border-ink-950 bg-paper-50 lg:sticky lg:top-24">
          <div className="border-b border-line-200 p-5">
            <p className="font-mono text-[11px] tracking-[0.2em] text-steel-500 uppercase">
              {dict.common.requestCta}
            </p>
            <p className="mt-2 text-sm text-ink-600">{dict.home.heroNote}</p>
          </div>
          <div className="p-5">
            <PrefillNeedTypeButton
              locale={locale}
              needType={solution.relatedNeedType}
              displacement={solution.impliesDisplacement}
              className="flex h-12 w-full items-center justify-center border border-signal-500 bg-signal-600 px-5 text-sm font-extrabold tracking-wide text-white uppercase hover:bg-signal-700"
            >
              {dict.common.startRequestSolution}
            </PrefillNeedTypeButton>
          </div>
        </aside>
      </div>
    </Section>
  );
}

/* ---------------------------------- SECTORS ---------------------------------- */

const sectorMedia: Record<string, string> = {
  industria: "PH-PHOTO-PLANT-01",
  construccion: "PH-PHOTO-STRUCTURE-01",
  "mantenimiento-industrial": "PH-PHOTO-ELECTRICISTA-01",
  energia: "PH-PHOTO-PLANT-01",
  fabricacion: "PH-PHOTO-CALDERERO-01",
  petroquimica: "PH-PHOTO-PLANT-01",
};

export function SectorsIndexPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const s = dict.sectors;
  return (
    <Section>
      <Breadcrumbs locale={locale} items={[{ label: dict.nav.sectors }]} />
      <SectionHeader eyebrow="HDM Industrial" title={s.title} lead={s.lead} as="h1" />
      <ul className="grid gap-px border border-line-200 bg-line-200 sm:grid-cols-2 lg:grid-cols-3">
        {sectors.map((sector) => (
          <li key={sector.id}>
            <a
              href={localizedPath(locale, `sectores/${sector.slug}`)}
              className="flex h-full flex-col gap-2 bg-paper-50 p-6 transition-colors duration-150 hover:bg-paper-100"
            >
              <span className="text-xl font-extrabold tracking-tight text-ink-950">
                {s.items[sector.id]?.name}
              </span>
              <span className="text-sm leading-relaxed text-ink-600 line-clamp-3">
                {s.items[sector.id]?.intro}
              </span>
              <span className="mt-auto pt-2 text-sm font-bold text-signal-600">
                {dict.common.readMore} →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function SectorDetailPage({ locale, sector }: { locale: Locale; sector: Sector }) {
  const dict = getDictionary(locale);
  const item = dict.sectors.items[sector.id];
  if (!item) return null;
  return (
    <Section>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: dict.nav.sectors, href: localizedPath(locale, "sectores") },
          { label: item.name },
        ]}
      />
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h1 className="text-[clamp(2rem,4vw,3.4rem)] leading-none font-extrabold tracking-tight text-ink-950">
            {item.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-700">{item.intro}</p>
          <div className="mt-8">
            <Media
              locale={locale}
              id={sectorMedia[sector.id] ?? "PH-PHOTO-PLANT-01"}
              className="border border-line-200"
              imgClassName="aspect-video w-full object-cover"
            />
          </div>
          <div className="mt-10">
            <h2 className="font-mono text-xs tracking-[0.2em] text-steel-500 uppercase">
              {dict.nav.profiles}
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {professionalProfiles.map((profile) => (
                <li key={profile.id} className="flex items-center justify-between gap-3 border border-line-200 bg-paper-50 p-3">
                  <span className="flex items-center gap-2.5">
                    <Pictogram name={profile.pictogram} className="h-7 w-7 text-ink-800" />
                    <span className="text-sm font-bold text-ink-950">
                      {dict.profiles.items[profile.id]?.name}
                    </span>
                  </span>
                  <PrefillProfessionButton
                    locale={locale}
                    profession={profile.id}
                    className="shrink-0 border border-signal-600 px-2.5 py-1 font-mono text-[11px] font-bold tracking-wide text-signal-600 uppercase hover:bg-signal-100"
                  >
                    + {dict.common.addToRequest}
                  </PrefillProfessionButton>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="h-fit border border-ink-950 bg-paper-50 lg:sticky lg:top-24">
          <div className="border-b border-line-200 p-5">
            <p className="font-mono text-[11px] tracking-[0.2em] text-steel-500 uppercase">
              {dict.common.requestCta}
            </p>
            <p className="mt-2 text-sm text-ink-600">{dict.home.heroNote}</p>
          </div>
          <div className="p-5">
            <PrefillProfessionButton
              locale={locale}
              profession="soldador"
              className="flex h-12 w-full items-center justify-center border border-signal-500 bg-signal-600 px-5 text-sm font-extrabold tracking-wide text-white uppercase hover:bg-signal-700"
            >
              {dict.common.requestPersonal}
            </PrefillProfessionButton>
          </div>
        </aside>
      </div>
    </Section>
  );
}

/* ---------------------------------- COVERAGE --------------------------------- */

export function CoverageIndexPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const c = dict.coverage;
  return (
    <Section>
      <Breadcrumbs locale={locale} items={[{ label: dict.nav.coverage }]} />
      <SectionHeader eyebrow="HDM Industrial" title={c.title} lead={c.lead} as="h1" />
      <CoverageMap locale={locale} mode="link" />
    </Section>
  );
}

export function CoverageAreaPage({ locale, area }: { locale: Locale; area: CoverageArea }) {
  const dict = getDictionary(locale);
  const item = dict.coverage.items[area.id];
  if (!item) return null;
  return (
    <>
      <Section>
        <Breadcrumbs
          locale={locale}
          items={[
            { label: dict.nav.coverage, href: localizedPath(locale, "cobertura") },
            { label: item.name },
          ]}
        />
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="font-mono text-xs tracking-[0.22em] text-steel-500 uppercase">
              {area.country === "PT" ? dict.common.portugal : dict.common.spain} · {dict.nav.coverage}
            </p>
            <h1 className="mt-3 text-[clamp(2rem,4vw,3.4rem)] leading-none font-extrabold tracking-tight text-ink-950">
              {item.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-700">{item.intro}</p>
            <p className="mt-4 max-w-2xl border-l-2 border-signal-600 pl-4 text-sm leading-relaxed text-ink-600">
              {dict.coverage.lead}
            </p>
          </div>
          <aside className="h-fit border border-ink-950 bg-paper-50 lg:sticky lg:top-24">
            <div className="border-b border-line-200 p-5">
              <p className="font-mono text-[11px] tracking-[0.2em] text-steel-500 uppercase">
                {dict.common.requestCta}
              </p>
              <p className="mt-2 text-sm text-ink-600">{dict.home.heroNote}</p>
            </div>
            <div className="p-5">
              <PrefillAreaButton
                locale={locale}
                area={area.id}
                className="flex h-12 w-full items-center justify-center border border-signal-500 bg-signal-600 px-5 text-sm font-extrabold tracking-wide text-white uppercase hover:bg-signal-700"
              >
                {dict.common.startRequestArea}
              </PrefillAreaButton>
            </div>
          </aside>
        </div>
      </Section>
      <Section tone="paper-100">
        <SectionHeader title={dict.nav.profiles} />
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {professionalProfiles.map((profile) => (
            <li key={profile.id} className="flex items-center justify-between gap-3 border border-line-300 bg-paper-50 p-3">
              <span className="flex items-center gap-2.5">
                <Pictogram name={profile.pictogram} className="h-7 w-7 text-ink-800" />
                <span className="text-sm font-bold text-ink-950">
                  {dict.profiles.items[profile.id]?.name}
                </span>
              </span>
              <PrefillProfessionButton
                locale={locale}
                profession={profile.id}
                className="shrink-0 border border-signal-600 px-2.5 py-1 font-mono text-[11px] font-bold tracking-wide text-signal-600 uppercase hover:bg-signal-100"
              >
                + {dict.common.addToRequest}
              </PrefillProfessionButton>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

/* ------------------------------- CÓMO TRABAJAMOS ------------------------------ */

export function HowWeWorkPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const h = dict.howWeWork;
  return (
    <Section>
      <Breadcrumbs locale={locale} items={[{ label: dict.nav.howWeWork }]} />
      <SectionHeader eyebrow="HDM Industrial" title={h.title} lead={h.lead} as="h1" />
      <ol className="flex flex-col gap-px border border-line-200 bg-line-200">
        {h.sections.map((section, i) => (
          <li key={section.title} className="grid gap-3 bg-paper-50 p-6 sm:grid-cols-[5rem_1fr]">
            <span className="tnum text-4xl font-black text-steel-300">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-ink-950">{section.title}</h2>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-600">{section.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-sm text-steel-500">{dict.request.summaryDisclaimer}</p>
    </Section>
  );
}

/* ------------------------------ CERTIFICACIONES ------------------------------ */

export function CertificationsPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const c = dict.certifications;
  const blocks = [
    { title: c.prlTitle, body: c.prlBody, placeholderId: "PH-CERT-PRL-01" },
    { title: c.weldingTitle, body: c.weldingBody, placeholderId: "PH-CERT-WELDING-01" },
    { title: c.docsTitle, body: c.docsBody, placeholderId: null },
    { title: c.honestyTitle, body: c.honestyBody, placeholderId: null },
  ];
  return (
    <Section>
      <Breadcrumbs locale={locale} items={[{ label: dict.nav.certifications }]} />
      <SectionHeader eyebrow="HDM Industrial" title={c.title} lead={c.lead} as="h1" />
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <ol className="flex flex-col gap-px border border-line-200 bg-line-200">
          {blocks.map((block) => (
            <li key={block.title} className="bg-paper-50 p-6">
              <h2 className="text-xl font-extrabold tracking-tight text-ink-950">{block.title}</h2>
              <p className="mt-2 text-base leading-relaxed text-ink-600">{block.body}</p>
              {block.placeholderId ? (
                <div className="mt-4">
                  <Media id={block.placeholderId} locale={locale} />
                </div>
              ) : null}
            </li>
          ))}
        </ol>
        <div className="h-fit lg:sticky lg:top-24">
          <Media id="PH-PHOTO-EPI-01" locale={locale} className="border border-line-200" imgClassName="aspect-[4/3] w-full object-cover" />
          <p className="mt-2 text-xs text-steel-500">{dict.common.editorialPhoto}</p>
        </div>
      </div>
    </Section>
  );
}

/* --------------------------------- PROYECTOS --------------------------------- */

export function ProjectsPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const p = dict.projects;
  return (
    <Section>
      <Breadcrumbs locale={locale} items={[{ label: dict.nav.projects }]} />
      <SectionHeader eyebrow="HDM Industrial" title={p.title} lead={p.lead} as="h1" />
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="border border-dashed border-steel-300 bg-paper-100 p-8">
          <p className="font-mono text-xs tracking-[0.2em] text-steel-500 uppercase">
            {p.confidentialLabel}
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink-950">{p.emptyTitle}</h2>
          <p className="mt-3 text-base leading-relaxed text-ink-600">{p.emptyBody}</p>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {["PH-PROJECT-01", "PH-PROJECT-02", "PH-PROJECT-03"].map((id) => (
              <Media key={id} id={id} locale={locale} />
            ))}
          </div>
        </div>
        <div className="border border-line-200 bg-paper-50 p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink-950">{p.modelTitle}</h2>
          <ul className="mt-4 flex flex-col divide-y divide-line-200 border-y border-line-200">
            {p.modelFields.map((field) => (
              <li key={field} className="flex items-center justify-between py-2.5">
                <span className="font-mono text-[11px] tracking-widest text-steel-500 uppercase">{field}</span>
                <span className="text-xs text-steel-400">—</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------- EMPRESA ---------------------------------- */

export function EmpresaPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const e = dict.company;
  return (
    <Section>
      <Breadcrumbs locale={locale} items={[{ label: dict.nav.company }]} />
      <SectionHeader eyebrow="HDM Industrial" title={e.title} lead={e.lead} as="h1" />
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex max-w-2xl flex-col gap-5 text-lg leading-relaxed text-ink-700">
          <p>{e.body1}</p>
          <p>{e.body2}</p>
          <p>{e.body3}</p>
          <div className="mt-4">
            <h2 className="font-mono text-xs tracking-[0.2em] text-steel-500 uppercase">{e.valuesTitle}</h2>
            <ul className="mt-4 flex flex-col gap-px border border-line-200 bg-line-200">
              {e.values.map((value) => (
                <li key={value.name} className="bg-paper-50 p-5">
                  <p className="text-base font-extrabold text-ink-950">{value.name}</p>
                  <p className="mt-1 text-base text-ink-600">{value.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Media id="PH-PHOTO-MATHEUS-01" locale={locale} />
          <Media id="PH-PHOTO-TEAM-01" locale={locale} />
        </div>
      </div>
    </Section>
  );
}
