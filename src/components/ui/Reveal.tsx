"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Scroll reveal — revela o conteúdo com fade + translateY leve quando o
 * elemento entra na viewport (IntersectionObserver, threshold 0.12).
 *
 * Sem JS (export estático / crawlers): a classe `js-reveal` NÃO existe no
 * <html>, então o CSS de ocultação não é aplicado e tudo permanece visível.
 * Com JS: o conteúdo só é escondido depois que o script inline adiciona
 * `js-reveal` (antes do primeiro paint), e este componente adiciona
 * `is-visible` ao entrar na viewport — permanente (unobserve, sem re-animar).
 * prefers-reduced-motion: revela imediatamente, sem animação.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Stagger discreto em ms (atraso da transição). */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties | undefined = delay
    ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
    : undefined;

  return (
    <div ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </div>
  );
}
