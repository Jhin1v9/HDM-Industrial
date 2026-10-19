"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@/components/ui/icons";

/**
 * Floating back-to-top button, positioned below the WhatsApp float.
 * Appears after scrolling down >400px. Smooth-scrolls to top.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver arriba"
      className="fixed right-4 bottom-[5.25rem] z-[53] flex h-10 w-10 items-center justify-center rounded-full border border-line-300 bg-paper-50 text-ink-700 shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-colors duration-150 hover:border-ink-600 hover:bg-paper-100 lg:bottom-[0.75rem] lg:right-[1.7rem]"
    >
      <ArrowUpIcon className="h-4 w-4" />
    </button>
  );
}
