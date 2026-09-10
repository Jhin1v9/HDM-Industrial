import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/i18n";
import { fontVariables } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Página no encontrada | HDM Industrial",
  robots: { index: false, follow: false },
};

/**
 * 404 global do export estático (404.html). Não pertence a nenhum route group,
 * por isso renderiza o seu próprio <html lang="es"> — o fallback estático usa
 * o dicionário ES (documentado em SWARM_ARCHITECTURE.md).
 */
export default function GlobalNotFound() {
  const dict = getDictionary("es");
  const nf = dict.notFound;
  return (
    <html lang="es" className={fontVariables}>
      <body className="flex min-h-dvh flex-col bg-paper-50 font-sans text-ink-900 antialiased">
        <header className="border-b border-ink-800 bg-ink-950 text-paper-50">
          <div className="mx-auto flex h-16 max-w-[76rem] items-baseline gap-2 px-5 pt-5 sm:px-8">
            <span className="text-xl font-extrabold tracking-tight">HDM</span>
            <span className="font-mono text-[10px] tracking-[0.25em] text-steel-400 uppercase">
              Industrial
            </span>
          </div>
        </header>
        <main className="mx-auto flex w-full max-w-[76rem] flex-1 flex-col justify-center px-5 py-20 sm:px-8">
          <p className="font-mono text-xs font-bold tracking-[0.22em] text-signal-600 uppercase">
            404
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-black tracking-tight text-ink-950">
            {nf.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-700">{nf.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="flex h-12 items-center border border-signal-500 bg-signal-600 px-6 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-150 hover:bg-signal-700"
            >
              {nf.cta}
            </Link>
            <Link
              href="/solicitar-personal"
              className="flex h-12 items-center border border-ink-950 px-6 text-sm font-bold text-ink-950 hover:bg-paper-100"
            >
              {dict.nav.request}
            </Link>
          </div>
        </main>
        <footer className="border-t border-line-200 py-6">
          <p className="mx-auto max-w-[76rem] px-5 font-mono text-xs text-steel-500 sm:px-8">
            HDM Industrial — {dict.footer.tagline}
          </p>
        </footer>
      </body>
    </html>
  );
}
