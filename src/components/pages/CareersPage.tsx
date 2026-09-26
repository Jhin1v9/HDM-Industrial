import type { Locale } from "@/domain/types";
import { getDictionary } from "@/i18n";
import { professionalProfiles } from "@/content/profiles";
import { Section } from "@/components/ui/layout";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Pictogram } from "@/components/ui/pictograms";
import { Media } from "@/components/media/Media";
import { CareersMailForm } from "./CareersMailForm";

/**
 * Página de candidaturas (solicitação do cliente 21/09/2026).
 * Mesmo desenho das páginas de detalhe: conteúdo à esquerda, card de ação
 * sticky à direita. Honestidade radical: sem ofertas publicadas, sem promessa.
 */
export function CareersPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const c = dict.careers;

  return (
    <Section>
      <Breadcrumbs locale={locale} items={[{ label: c.title }]} />
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-mono text-xs tracking-[0.22em] text-steel-500 uppercase">
            {c.eyebrow}
          </p>
          <h1 className="mt-3 text-[clamp(2rem,4vw,3.4rem)] leading-none font-extrabold tracking-tight text-ink-950">
            {c.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-700">{c.lead}</p>

          <div className="mt-6 border-l-2 border-signal-600 pl-4">
            <p className="text-base font-extrabold text-ink-950">{c.honestyTitle}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-600">{c.honestyBody}</p>
          </div>

          <h2 className="mt-10 font-mono text-xs tracking-[0.2em] text-steel-500 uppercase">
            {c.profilesTitle}
          </h2>
          <ul className="mt-4 grid gap-px border border-line-200 bg-line-200 sm:grid-cols-2">
            {professionalProfiles.map((profile) => (
              <li key={profile.id} className="flex items-center gap-2.5 bg-paper-50 p-3">
                <Pictogram name={profile.pictogram} className="h-7 w-7 text-ink-800" />
                <span className="text-sm font-bold text-ink-950">
                  {dict.profiles.items[profile.id]?.name}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-mono text-xs tracking-[0.2em] text-steel-500 uppercase">
            {c.processTitle}
          </h2>
          <ol className="mt-4 flex flex-col gap-px border border-line-200 bg-line-200">
            {c.processSteps.map((step, i) => (
              <li key={step.title} className="grid gap-3 bg-paper-50 p-5 sm:grid-cols-[4rem_1fr]">
                <span className="tnum text-3xl font-black text-steel-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight text-ink-950">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <Media
              id="PH-PHOTO-EPI-01"
              locale={locale}
              className="border border-line-200"
              imgClassName="aspect-[4/3] w-full object-cover"
            />
            <p className="mt-2 text-xs text-steel-500">{dict.common.editorialPhoto}</p>
          </div>
        </div>

        <aside className="h-fit border border-ink-950 bg-paper-50 lg:sticky lg:top-24">
          <div className="border-b border-line-200 p-5">
            <p className="font-mono text-[11px] tracking-[0.2em] text-steel-500 uppercase">
              {c.formTitle}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">{c.formLead}</p>
          </div>
          <div className="p-5">
            <CareersMailForm locale={locale} />
            <p className="mt-4 text-xs text-steel-500">{c.privacyNote}</p>
          </div>
        </aside>
      </div>
    </Section>
  );
}
