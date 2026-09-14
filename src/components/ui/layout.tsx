import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

export function Container({
  children,
  narrow = false,
  className = "",
}: {
  children: ReactNode;
  narrow?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 ${
        narrow ? "max-w-4xl" : "max-w-[76rem]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  id,
  tone = "paper",
  className = "",
}: {
  children: ReactNode;
  id?: string;
  tone?: "paper" | "paper-100" | "ink";
  className?: string;
}) {
  const tones = {
    paper: "bg-paper-50 text-ink-950",
    "paper-100": "bg-paper-100 text-ink-950",
    ink: "bg-ink-950 text-paper-50",
  } as const;
  return (
    <section id={id} className={`${tones[tone]} border-t border-line-200 first:border-t-0 ${className}`}>
      <Container className="py-14 sm:py-20">
        <Reveal>{children}</Reveal>
      </Container>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  dark = false,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  dark?: boolean;
  /** Use "h1" for the page's primary header (exactly one per page). */
  as?: "h1" | "h2";
}) {
  return (
    <header className="mb-10 max-w-3xl">
      {eyebrow ? (
        <p
          className={`mb-3 font-mono text-xs tracking-[0.18em] uppercase ${
            dark ? "text-steel-300" : "text-steel-500"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading className="text-[clamp(1.7rem,3.2vw,2.6rem)] leading-[1.05] font-extrabold tracking-tight text-balance">
        {title}
      </Heading>
      {lead ? (
        <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-steel-300" : "text-ink-600"}`}>
          {lead}
        </p>
      ) : null}
    </header>
  );
}
