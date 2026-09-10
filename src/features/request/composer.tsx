"use client";

import type { Locale, ProfessionId, RequestProfile } from "@/domain/types";
import { professionalProfiles, getProfile } from "@/content/profiles";
import { totalProfessionals } from "@/domain/request";
import { getDictionary } from "@/i18n";
import { useRequest } from "./store";
import { QuantityStepper } from "./controls";
import { Pictogram } from "@/components/ui/pictograms";
import { trackEvent } from "@/features/analytics/events";

/**
 * TeamComposer (§26) — assinatura visual do produto.
 * O total representa O QUE O CLIENTE SOLICITOU. Nunca capacidade HDM.
 */
export function TeamComposer({
  locale,
  onProfilesFocus,
}: {
  locale: Locale;
  onProfilesFocus?: () => void;
}) {
  const dict = getDictionary(locale);
  const { request, dispatch } = useRequest();
  const t = dict.request;
  const total = totalProfessionals(request.profiles);

  return (
    <div className="flex flex-col gap-4">
      {request.profiles.length === 0 ? (
        <p className="border border-dashed border-line-300 bg-paper-100 p-4 text-sm text-ink-600">
          {t.emptyBody}
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {request.profiles.map((line) => (
            <ProfileLineRow key={line.lineId} line={line} locale={locale} />
          ))}
        </ul>
      )}

      {/* Añadir perfil */}
      <div>
        <p className="mb-2 text-sm font-bold text-ink-800">{t.addProfile}</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {professionalProfiles.map((profile) => {
            const name = dict.profiles.items[profile.id]?.name ?? profile.id;
            return (
              <button
                key={profile.id}
                type="button"
                onClick={() => {
                  dispatch({ type: "addProfile", profession: profile.id as ProfessionId });
                  trackEvent("profile_added", { profession: profile.id, locale });
                  onProfilesFocus?.();
                }}
                className="flex items-center gap-2 border border-line-300 bg-paper-50 p-3 text-left text-sm font-semibold text-ink-800 transition-colors duration-150 hover:border-ink-600 hover:bg-paper-100"
              >
                <Pictogram name={profile.pictogram} className="h-6 w-6 shrink-0 text-steel-500" />
                <span>{name}</span>
                <span aria-hidden="true" className="ml-auto text-lg text-signal-600">+</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Total — visualização por números/barras, nunca bonequinhos (§54) */}
      {total > 0 ? (
        <div className="flex items-end justify-between border-t-2 border-ink-950 pt-3" aria-live="polite">
          <div className="flex items-baseline gap-3">
            <span className="tnum text-4xl font-black tracking-tight">{total}</span>
            <span className="text-sm font-bold uppercase tracking-wide text-ink-600">
              {total === 1 ? dict.common.professional : dict.common.professionals}
            </span>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-steel-500">
            {request.profiles.length} {t.teamProfiles}
          </span>
        </div>
      ) : null}
    </div>
  );
}

function ProfileLineRow({ line, locale }: { line: RequestProfile; locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.request;
  const { dispatch } = useRequest();
  const def = getProfile(line.profession);
  const name = dict.profiles.items[line.profession]?.singular ?? line.profession;
  const specializations = def?.specializations ?? [];

  return (
    <li className="border border-line-300 bg-paper-50">
      <div className="flex flex-wrap items-center gap-3 p-3">
        <Pictogram name={def?.pictogram ?? "builder"} className="h-8 w-8 shrink-0 text-ink-800" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-bold text-ink-950">{name}</p>
          {specializations.length > 0 ? (
            <div className="mt-1 flex flex-wrap gap-1.5" role="radiogroup" aria-label={t.specialization}>
              {specializations.map((spec) => {
                const selected = line.specialization === spec;
                return (
                  <button
                    key={spec}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() =>
                      dispatch({
                        type: "setSpecialization",
                        lineId: line.lineId,
                        specialization: selected ? null : spec,
                      })
                    }
                    className={`h-8 border px-2.5 font-mono text-xs font-bold tracking-wide transition-colors duration-150 ${
                      selected
                        ? "border-signal-500 bg-ink-900 text-paper-50"
                        : "border-line-300 text-ink-600 hover:border-ink-600"
                    }`}
                  >
                    {dict.profiles.specializations[spec]?.name ?? spec}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
        <QuantityStepper
          compact
          value={line.quantity}
          onChange={(quantity) => {
            dispatch({ type: "setQuantity", lineId: line.lineId, quantity });
            trackEvent("quantity_changed", { profession: line.profession, quantity });
          }}
          labels={{ decrease: t.decrease, increase: t.increase, input: t.quantityInput }}
        />
        <button
          type="button"
          onClick={() => {
            dispatch({ type: "removeProfile", lineId: line.lineId });
            trackEvent("profile_removed", { profession: line.profession });
          }}
          className="h-10 border border-line-300 px-3 text-sm font-semibold text-ink-600 transition-colors duration-150 hover:border-signal-600 hover:text-signal-600"
        >
          {dict.common.remove}
        </button>
      </div>
    </li>
  );
}
