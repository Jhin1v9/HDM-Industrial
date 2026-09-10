"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/domain/types";
import { getDictionary } from "@/i18n";
import { localizedPath } from "@/content/pages";
import { getConsent, setConsent } from "@/features/analytics/events";

/**
 * Banner reflete scripts REAIS (§117): medición solo carga tras consentimiento.
 * Sin banner decorativo — rechazar = ningún script de medición.
 */
export function CookieConsent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const c = dict.cookiesBanner;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR-safe consent hydration from localStorage (mount-only)
    setVisible(getConsent() === null);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label={c.title}
      className="fixed inset-x-0 bottom-0 z-[55] border-t border-line-300 bg-paper-50 shadow-[0_-8px_30px_rgba(16,21,26,0.15)] lg:bottom-4 lg:left-4 lg:right-auto lg:max-w-md lg:border"
    >
      <div className="p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <p className="text-base font-extrabold text-ink-950">{c.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-700">{c.body}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setConsent("accepted");
              setVisible(false);
            }}
            className="h-10 border border-ink-950 bg-ink-950 px-4 text-sm font-bold text-paper-50 hover:bg-ink-800"
          >
            {c.accept}
          </button>
          <button
            type="button"
            onClick={() => {
              setConsent("rejected");
              setVisible(false);
            }}
            className="h-10 border border-line-300 px-4 text-sm font-bold text-ink-800 hover:border-ink-600"
          >
            {c.reject}
          </button>
          <Link
            href={localizedPath(locale, "cookies")}
            className="text-sm font-semibold text-steel-500 underline underline-offset-2 hover:text-ink-800"
          >
            {c.more}
          </Link>
        </div>
      </div>
    </div>
  );
}
