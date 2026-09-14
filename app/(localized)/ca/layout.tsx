import type { Metadata } from "next";
import "@/styles/globals.css";
import { fontVariables } from "@/lib/fonts";
import { SiteShell } from "@/components/chrome/SiteShell";
import { RevealInit } from "@/components/chrome/RevealInit";
import { MotionProvider } from "@/components/chrome/MotionProvider";
import { getDictionary } from "@/i18n";
import { siteUrl } from "@/lib/seo";

const LOCALE = "ca" as const;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: getDictionary(LOCALE).meta.defaultTitle,
    template: `%s | ${getDictionary(LOCALE).meta.siteName}`,
  },
  description: getDictionary(LOCALE).meta.defaultDescription,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={LOCALE} className={fontVariables}>
      <body className="min-h-dvh bg-paper-50 font-sans text-ink-900 antialiased">
        <RevealInit />
        <MotionProvider />
        <SiteShell locale={LOCALE}>{children}</SiteShell>
      </body>
    </html>
  );
}
