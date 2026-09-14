import type { ReactNode } from "react";

/**
 * Reveal — wrapper mínimo de motion: apenas marca o elemento com data-attributes
 * processados pelo MotionProvider (GSAP ScrollTrigger). Zero lógica client-side
 * aqui — Server Components podem usá-lo livremente.
 *
 * Contratos (SEO / no-JS / acessibilidade):
 * - Sem JS (export estático / crawlers): nenhum estilo de ocultação é aplicado
 *   (o CSS de gate só existe sob `.js-reveal`, adicionada por script inline),
 *   então o conteúdo renderiza sempre visível.
 * - prefers-reduced-motion: o MotionProvider desliga tudo — conteúdo visível
 *   com scroll nativo.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  hero = false,
  zoom = false,
}: {
  children: ReactNode;
  className?: string;
  /** Atraso discreto em ms, respeitado como stagger pelo motor de motion. */
  delay?: number;
  /** Elemento do hero (acima da dobra): timeline de entrada no load, não scroll. */
  hero?: boolean;
  /** Entrada de imagem do hero: fade + scale 1.04 → 1 (sem deslocamento). */
  zoom?: boolean;
}) {
  return (
    <div
      className={className}
      data-reveal={hero ? "hero" : ""}
      data-hero-zoom={zoom || undefined}
      data-delay={delay || undefined}
    >
      {children}
    </div>
  );
}
