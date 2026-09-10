import type { JSX } from "react";

/**
 * Pictogramas proprietários — TECHNICAL SIGNAGE (§53).
 * Traço técnico, geométrico, sem cartoon. stroke-based, viewBox 0 0 48 48.
 */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
};

const paths: Record<string, JSX.Element> = {
  // Soldador: careta + arco
  welder: (
    <g {...stroke}>
      <path d="M14 10h20v18a10 10 0 0 1-20 0V10z" />
      <path d="M19 17h10v5H19z" />
      <path d="M24 38v6M18 41l-3 3M30 41l3 3" />
      <path d="M38 30l6-6M40 36l4-2" />
    </g>
  ),
  // Calderero: chapa conformada + martelo de caldeireiro
  boilermaker: (
    <g {...stroke}>
      <path d="M8 34c8-2 16-2 32 0v6c-16-2-24-2-32 0v-6z" />
      <path d="M14 28l8-16h6l-8 16" />
      <path d="M28 12h8v6" />
    </g>
  ),
  // Montador: viga I + gancho de grua
  rigger: (
    <g {...stroke}>
      <path d="M8 40h32M12 40v-8h24v8M12 32h24" />
      <path d="M24 8v10" />
      <path d="M24 18a5 5 0 1 0 5 5" />
      <path d="M16 8h16" />
    </g>
  ),
  // Eletricista: quadro + raio técnico
  electrician: (
    <g {...stroke}>
      <rect x="10" y="8" width="28" height="32" />
      <path d="M16 14h6M16 20h6M16 26h6" />
      <path d="M29 14l-4 8h6l-4 8" />
    </g>
  ),
  // Constructor/ayudante: capacete + nível
  builder: (
    <g {...stroke}>
      <path d="M10 26a14 14 0 0 1 28 0v2H10v-2z" />
      <path d="M24 12v-4M6 30h36" />
      <path d="M12 38h24v4H12zM22 38v4" />
    </g>
  ),
  // Supervisor: prancheta com check + pessoas (abstrato)
  supervisor: (
    <g {...stroke}>
      <rect x="12" y="10" width="24" height="30" />
      <path d="M19 10a5 5 0 0 1 10 0" />
      <path d="M18 24l4 4 8-8" />
      <path d="M18 34h12" />
    </g>
  ),
};

export function Pictogram({
  name,
  className = "h-10 w-10",
  title,
}: {
  name: string;
  className?: string;
  title?: string;
}) {
  const content = paths[name] ?? paths.builder;
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {content}
    </svg>
  );
}
