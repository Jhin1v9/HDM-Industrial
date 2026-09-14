"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/domain/types";
import { totalProfessionals } from "@/domain/request";
import { getDictionary } from "@/i18n";
import { useRequest } from "./store";
import { RequestPanel } from "./panel";
import { getActiveLenis } from "@/lib/lenis";

/**
 * Request UI shell — indicador global (§38), drawer acessível,
 * mobile request bar fixa (§66). O Request sobrevive à navegação (§37).
 */

interface RequestUiValue {
  open: boolean;
  openRequest: () => void;
  closeRequest: () => void;
  /** Elemento que abriu o drawer — capturado no evento de abertura (efeitos dos
   * filhos correm antes do efeito do drawer e roubariam este foco). */
  openerRef: React.MutableRefObject<HTMLElement | null>;
}

const RequestUiContext = createContext<RequestUiValue | null>(null);

export function RequestUiProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  // Navegação NÃO apaga o request — apenas fecha o drawer.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: close drawer on navigation (§39 navigation must not wipe request)
    setOpen(false);
  }, [pathname]);

  const openRequest = useCallback(() => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);
  const closeRequest = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openRequest, closeRequest, openerRef }),
    [open, openRequest, closeRequest],
  );
  return <RequestUiContext.Provider value={value}>{children}</RequestUiContext.Provider>;
}

export function useRequestUi(): RequestUiValue {
  const ctx = useContext(RequestUiContext);
  if (!ctx) throw new Error("useRequestUi must be used inside RequestUiProvider");
  return ctx;
}

/* --------------------------------- Indicator -------------------------------- */

export function RequestIndicator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { request, hydrated } = useRequest();
  const { openRequest } = useRequestUi();
  const total = totalProfessionals(request.profiles);
  const hasContent = total > 0 || (request.jobDescription?.trim().length ?? 0) >= 10;

  return (
    <button
      type="button"
      onClick={openRequest}
      className={`flex h-11 items-center gap-2 border px-4 font-mono text-xs font-bold tracking-widest uppercase transition-colors duration-150 ${
        hasContent
          ? "border-signal-500 bg-signal-600 text-white hover:bg-signal-700"
          : "border-paper-50/40 bg-transparent text-paper-50 hover:border-paper-50"
      }`}
    >
      {hydrated && hasContent ? (
        <>
          {dict.request.indicatorWithItems}
          <span className="tnum text-sm" aria-label={`${total} ${dict.common.professionals}`}>
            · {total}
          </span>
        </>
      ) : (
        dict.request.indicatorEmpty
      )}
    </button>
  );
}

/* -------------------------------- Mobile bar --------------------------------- */

export function MobileRequestBar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { request, hydrated } = useRequest();
  const { openRequest, open } = useRequestUi();
  const total = totalProfessionals(request.profiles);
  const hasContent = total > 0 || (request.jobDescription?.trim().length ?? 0) >= 10;

  if (open) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-[50] border-t border-ink-700 bg-ink-950/97 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm lg:hidden">
      <button
        type="button"
        onClick={openRequest}
        className="flex h-12 w-full items-center justify-center gap-2 border border-signal-500 bg-signal-600 font-mono text-sm font-bold tracking-widest text-white uppercase active:bg-signal-700"
      >
        {hydrated && hasContent ? (
          <>
            {dict.request.indicatorWithItems}
            <span className="tnum">· {total}</span>
          </>
        ) : (
          dict.request.indicatorEmpty
        )}
      </button>
    </div>
  );
}

/* ---------------------------------- Drawer ----------------------------------- */

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function RequestDrawer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { open, closeRequest, openerRef } = useRequestUi();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Acessibilidade do diálogo modal: foco inicial dentro, Tab circular,
  // fundo inerte e foco devolvido ao elemento que abriu o drawer.
  useEffect(() => {
    if (!open) return;
    const root = dialogRef.current;
    if (!root) return;

    const inerted: HTMLElement[] = [];
    for (const el of Array.from(document.body.children) as HTMLElement[]) {
      if (!el.contains(root)) {
        el.setAttribute("inert", "");
        inerted.push(el);
      }
    }

    const focusables = () =>
      Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.getClientRects().length > 0,
      );
    // Foco inicial no botão de fechar (nunca no backdrop invisível).
    const closeButton = root.querySelector<HTMLElement>("[data-drawer-close]");
    (closeButton ?? focusables()[0])?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeRequest();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) {
        e.preventDefault();
        return;
      }
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !root.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !root.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Trava o smooth scroll do Lenis enquanto o modal está aberto: a roda
    // sobre o backdrop rolaria a página por trás do drawer (o Lenis anima
    // window.scroll independentemente do overflow:hidden do body).
    getActiveLenis()?.stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      getActiveLenis()?.start();
      for (const el of inerted) el.removeAttribute("inert");
      // Devolve o foco a quem abriu (se ainda existir no documento).
      const opener = openerRef.current;
      if (opener && opener.isConnected) opener.focus();
      openerRef.current = null;
    };
  }, [open, closeRequest, openerRef]);

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={dict.request.title}
      className="fixed inset-0 z-[60] flex justify-end"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label={dict.nav.close}
        onClick={closeRequest}
        className="absolute inset-0 bg-ink-950/60"
      />
      <div
        data-lenis-prevent
        className="relative h-full w-full max-w-2xl overflow-y-auto bg-paper-50 shadow-[0_0_40px_rgba(16,21,26,0.4)]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line-200 bg-paper-50 px-5 py-4 sm:px-8">
          <p className="font-mono text-xs font-bold tracking-[0.2em] text-ink-800 uppercase">
            {dict.request.title}
          </p>
          <button
            type="button"
            data-drawer-close
            onClick={closeRequest}
            className="flex h-10 w-10 items-center justify-center border border-line-300 text-xl text-ink-800 hover:border-ink-600"
            aria-label={dict.nav.close}
          >
            ×
          </button>
        </div>
        <div className="px-5 py-6 sm:px-8">
          <RequestPanel locale={locale} />
        </div>
      </div>
    </div>
  );
}
