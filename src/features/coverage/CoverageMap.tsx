"use client";

import Link from "next/link";
import type { Locale, CoverageAreaId } from "@/domain/types";
import { coverageAreas } from "@/content/coverage";
import { getDictionary } from "@/i18n";
import { localizedPath } from "@/content/pages";
import { usePrefillRequest } from "@/features/request/store";
import { useRequestUi } from "@/features/request/chrome";
import { trackEvent } from "@/features/analytics/events";

/**
 * Coverage Map — SVG proprietário Espanha + Portugal (§51).
 * Silhueta simplificada da península ibérica, leve, acessível, responsiva,
 * selecionável — com LISTA TEXTUAL obrigatória (§109).
 * Selecionar uma zona = projeto nessa zona. NUNCA disponibilidade live (§52).
 */

const IBERIA_PATH =
  "M8 22 L14 12 L30 7 L50 6 L70 8 L85 14 L92 24 L88 32 L80 42 L74 52 L66 60 L60 70 L56 80 L46 88 L36 86 L28 78 L24 70 L16 68 L10 64 L6 52 L6 38 Z";

export function CoverageMap({
  locale,
  mode = "link",
  dark = false,
}: {
  locale: Locale;
  mode?: "link" | "request";
  dark?: boolean;
}) {
  const dict = getDictionary(locale);
  const prefill = usePrefillRequest();
  const { openRequest } = useRequestUi();

  function select(area: CoverageAreaId) {
    prefill.setCoverageArea(area);
    trackEvent("location_selected", { area, locale, source: "coverage_map" });
    openRequest();
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1.3fr_1fr]">
      <svg
        viewBox="0 0 100 100"
        role="img"
        aria-label={dict.coverage.mapLabel}
        className="w-full max-w-xl"
      >
        <path
          d={IBERIA_PATH}
          className={dark ? "fill-ink-800 stroke-steel-500" : "fill-paper-100 stroke-steel-400"}
          strokeWidth="0.8"
        />
        {/* Linha de fronteira PT (esquemática) */}
        <path
          d="M18 30 L20 44 L16 56 L18 68"
          fill="none"
          className={dark ? "stroke-steel-500" : "stroke-steel-400"}
          strokeWidth="0.5"
          strokeDasharray="1.5 1.5"
        />
        {coverageAreas.map((area) => {
          const name = dict.coverage.items[area.id]?.name ?? area.id;
          return (
            <g key={area.id}>
              <circle
                cx={area.mapPoint.x}
                cy={area.mapPoint.y}
                r="5"
                className="fill-signal-600 opacity-15"
              />
              <circle
                cx={area.mapPoint.x}
                cy={area.mapPoint.y}
                r="2.2"
                className="fill-signal-600"
              >
                <title>{name}</title>
              </circle>
              <text
                x={area.mapPoint.x}
                y={area.mapPoint.y - 4.5}
                textAnchor="middle"
                className={`font-mono text-[3.4px] font-bold uppercase tracking-wide ${
                  dark ? "fill-paper-50" : "fill-ink-800"
                }`}
              >
                {name}
              </text>
              {/* Zona de toque generosa (mobile, WCAG target size) */}
              <circle
                cx={area.mapPoint.x}
                cy={area.mapPoint.y}
                r="7"
                className="cursor-pointer fill-transparent"
                onClick={() => (mode === "request" ? select(area.id) : undefined)}
              >
                <title>{name}</title>
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Lista textual — obrigatória, nunca só o mapa */}
      <nav aria-label={dict.coverage.listLabel}>
        <ul className="flex flex-col divide-y divide-line-200 border-y border-line-200">
          {coverageAreas.map((area) => {
            const name = dict.coverage.items[area.id]?.name ?? area.id;
            const content = (
              <>
                <span className="text-lg font-bold">{name}</span>
                <span className="font-mono text-[10px] tracking-widest text-steel-500 uppercase">
                  {area.country === "PT" ? dict.common.portugal : dict.common.spain}
                </span>
              </>
            );
            return (
              <li key={area.id}>
                {mode === "link" ? (
                  <Link
                    href={localizedPath(locale, `cobertura/${area.slug}`)}
                    className={`flex items-center justify-between px-4 py-4 transition-colors duration-150 ${
                      dark ? "text-paper-50 hover:bg-ink-800" : "text-ink-950 hover:bg-paper-100"
                    }`}
                  >
                    {content}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => select(area.id)}
                    className={`flex w-full items-center justify-between px-4 py-4 text-left transition-colors duration-150 ${
                      dark ? "text-paper-50 hover:bg-ink-800" : "text-ink-950 hover:bg-paper-100"
                    }`}
                  >
                    {content}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
        <p className={`mt-3 text-xs ${dark ? "text-steel-400" : "text-steel-500"}`}>
          {dict.coverage.lead}
        </p>
      </nav>
    </div>
  );
}
