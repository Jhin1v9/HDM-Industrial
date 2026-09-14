"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { setActiveLenis } from "@/lib/lenis";

/**
 * MotionProvider — motor de motion global do site (GSAP ScrollTrigger + Lenis).
 *
 * Roda 100% client-side pós-hidratação (export estático). Re-executa a cada
 * navegação interna (pathname): a página nova chega com elementos
 * [data-reveal] novos, escondidos pelo portão .js-reveal, e precisam ser
 * processados de novo — sem isso, navegação client-side deixava a página em
 * branco até um reload completo.
 *
 * Responsabilidades:
 * - Lenis smooth scroll integrado ao ticker do GSAP (lerp 0.1, smoothWheel).
 * - [data-reveal]        → batch reveal 3D no scroll (y:64 + rotationX, once).
 * - [data-reveal="hero"] → timeline de entrada no load (acima da dobra).
 * - [data-split]         → títulos do hero com máscara por linha (split próprio,
 *                          com fallback: se falhar, o título permanece visível).
 * - [data-parallax]      → parallax scrub (±10%) em imagens editoriais.
 *
 * Contratos de segurança:
 * - Conteúdo NUNCA fica invisível sem JS: o CSS só oculta sob `.js-reveal`
 *   (portão adicionado por script inline antes do primeiro paint — RevealInit).
 * - Se o GSAP/Lenis falhar ao carregar, o portão é removido e os estilos
 *   inline limpos — conteúdo volta a ficar visível.
 * - prefers-reduced-motion: nada é montado — scroll nativo, conteúdo visível.
 * - Cleanup completo a cada troca de rota (gsap.context().revert(), ticker, Lenis).
 */
export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionQuery.matches) {
      root.classList.remove("js-reveal");
      return;
    }

    let disposed = false;
    let teardown: (() => void) | undefined;

    /** Última linha de defesa: garante conteúdo visível se o motion falhar. */
    const restoreContent = () => {
      root.classList.remove("js-reveal");
      document
        .querySelectorAll<HTMLElement>("[data-reveal], [data-parallax], .split-inner")
        .forEach((el) => {
          el.style.removeProperty("opacity");
          el.style.removeProperty("visibility");
          el.style.removeProperty("transform");
        });
    };

    void (async () => {
      try {
        const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);
        if (disposed) return;

        gsap.registerPlugin(ScrollTrigger);

        // Lenis pode falhar isoladamente (ambiente estranho, polyfills): o
        // motion continua sem smooth scroll.
        let lenis: InstanceType<typeof Lenis> | null = null;
        try {
          lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
          lenis.on("scroll", ScrollTrigger.update);
          setActiveLenis(lenis);
        } catch {
          lenis = null;
        }
        const onTick = (time: number) => lenis?.raf(time * 1000);
        gsap.ticker.add(onTick);
        gsap.ticker.lagSmoothing(0);

        const splitSources = new Map<HTMLElement, string>();
        let heroPlayed = false;

        /**
         * Split por linhas com máscara: agrupa palavras por offsetTop e envolve
         * cada linha num span de overflow:hidden com inner translateY(110%).
         * Retorna null (e deixa o texto intacto/visível) quando não há linhas
         * múltiplas, quando o elemento tem filos, ou qualquer erro de layout.
         */
        const splitIntoLines = (el: HTMLElement): HTMLElement[] | null => {
          if (el.children.length > 0) return null;
          const original = el.textContent ?? "";
          const words = original.split(/\s+/).filter(Boolean);
          if (words.length < 2) return null;

          el.textContent = "";
          const wordSpans = words.map((word) => {
            const span = document.createElement("span");
            span.textContent = word;
            span.style.display = "inline-block";
            el.append(span, document.createTextNode(" "));
            return span;
          });

          const lines: HTMLElement[][] = [];
          for (const span of wordSpans) {
            const firstOfLast = lines.at(-1)?.[0];
            if (firstOfLast && Math.abs(firstOfLast.offsetTop - span.offsetTop) < 2) {
              lines.at(-1)?.push(span);
            } else {
              lines.push([span]);
            }
          }

          if (lines.length < 2) {
            el.textContent = original;
            return null;
          }

          el.textContent = "";
          const inners: HTMLElement[] = [];
          for (const line of lines) {
            const mask = document.createElement("span");
            mask.style.display = "block";
            mask.style.overflow = "hidden";
            const inner = document.createElement("span");
            inner.className = "split-inner";
            inner.style.display = "block";
            line.forEach((span, i) => {
              inner.append(span);
              if (i < line.length - 1) inner.append(document.createTextNode(" "));
            });
            mask.append(inner);
            el.append(mask);
            inners.push(inner);
          }
          splitSources.set(el, original);
          return inners;
        };

        let revealEls: HTMLElement[] = [];

        const ctx = gsap.context(() => {
          // ── Reveal em batch (seções, cards, fora do hero) ──────────────
          revealEls = gsap.utils.toArray<HTMLElement>("[data-reveal]:not([data-reveal='hero'])");
          if (revealEls.length) {
            // Entrada 3D perceptível: o bloco levanta de baixo com rotação de
            // perspectiva (como uma placa se erguendo), não um simples fade.
            gsap.set(revealEls, {
              y: 64,
              rotationX: -14,
              transformPerspective: 900,
              transformOrigin: "50% 100%",
              autoAlpha: 0,
            });
            ScrollTrigger.batch(revealEls, {
              start: "top 92%",
              onEnter: (batch, triggers) => {
                gsap.to(batch, {
                  y: 0,
                  rotationX: 0,
                  autoAlpha: 1,
                  duration: 1.15,
                  ease: "power4.out",
                  stagger: 0.12,
                  delay: (i, target) =>
                    Number((target as HTMLElement).dataset.delay ?? 0) / 1000,
                  overwrite: true,
                });
                // Revelado é permanente: sem re-animar no scroll.
                triggers.forEach((t) => t.kill());
              },
            });
          }

          // ── Hero (acima da dobra): timeline de entrada no load ──────────
          const heroEls = gsap.utils.toArray<HTMLElement>("[data-reveal='hero']");
          const splitInners: HTMLElement[] = [];
          const plainHero: HTMLElement[] = [];
          const zoomHero: HTMLElement[] = [];

          for (const el of heroEls) {
            if (el.hasAttribute("data-hero-zoom")) {
              zoomHero.push(el);
              continue;
            }
            let splitOk = false;
            for (const target of Array.from(el.querySelectorAll<HTMLElement>("[data-split]"))) {
              try {
                const inners = splitIntoLines(target);
                if (inners && inners.length) {
                  // Estado inicial da máscara: linhas 120% abaixo, prontas pra subir.
                  gsap.set(inners, { yPercent: 120 });
                  splitInners.push(...inners);
                  splitOk = true;
                }
              } catch {
                // Falhou: o título permanece intacto e visível (fallback).
              }
            }
            if (splitOk) {
              // O wrapper fica visível de imediato; animam-se as linhas internas.
              gsap.set(el, { autoAlpha: 1, y: 0 });
            } else {
              plainHero.push(el);
            }
          }

          if (heroEls.length) {
            // Blocos do hero levantam em 3D (rotação de perspectiva + subida).
            gsap.set(plainHero, {
              y: 56,
              rotationX: -12,
              transformPerspective: 800,
              transformOrigin: "50% 100%",
              autoAlpha: 0,
            });
            gsap.set(zoomHero, { autoAlpha: 0, scale: 1.1 });
            const tl = gsap.timeline({
              defaults: { ease: "power4.out" },
              delay: 0.15,
              onComplete: () => {
                heroPlayed = true;
              },
            });
            if (splitInners.length) {
              // Cada linha do título sobe da máscara com presença.
              tl.to(splitInners, { yPercent: 0, duration: 1.3, stagger: 0.12 }, 0);
            }
            if (plainHero.length) {
              tl.to(plainHero, { y: 0, rotationX: 0, autoAlpha: 1, duration: 1.2, stagger: 0.12 }, splitInners.length ? 0.15 : 0);
            }
            if (zoomHero.length) {
              tl.to(zoomHero, { autoAlpha: 1, scale: 1, duration: 1.5, ease: "power3.out" }, 0.3);
            }
          }

          // ── Parallax em imagens editoriais (mais profundo) ───────────────
          for (const el of gsap.utils.toArray<HTMLElement>("[data-parallax]")) {
            const trigger = el.closest("[data-parallax-root]") ?? el.parentElement ?? el;
            // Escala 1.25 dá margem de 12,5% para cada lado — maior que o
            // deslocamento máximo de ±10% (yPercent é relativo à altura sem
            // escala), garantindo que nunca apareça gap nas bordas do crop.
            gsap.set(el, { scale: 1.25, yPercent: -10 });
            gsap.to(el, {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            });
          }
        });

        // Reflow (resize, troca de fonte, etc.): refaz o split por linhas.
        const rebuildSplits = () => {
          for (const [el, original] of splitSources) {
            if (!el.isConnected) {
              splitSources.delete(el);
              continue;
            }
            el.textContent = original;
            try {
              const inners = splitIntoLines(el);
              if (inners) gsap.set(inners, { yPercent: heroPlayed ? 0 : 120 });
            } catch {
              el.textContent = original;
            }
          }
        };

        let resizeTimer: number | undefined;
        const onResize = () => {
          window.clearTimeout(resizeTimer);
          resizeTimer = window.setTimeout(() => {
            rebuildSplits();
            ScrollTrigger.refresh();
          }, 250);
        };
        window.addEventListener("resize", onResize);
        if (document.fonts) {
          void document.fonts.ready.then(() => {
            if (!disposed) ScrollTrigger.refresh();
          }).catch(() => {});
        }

        teardown = () => {
          window.removeEventListener("resize", onResize);
          window.clearTimeout(resizeTimer);
          ctx.revert();
          gsap.ticker.remove(onTick);
          lenis?.destroy();
        };

        requestAnimationFrame(() => {
          if (!disposed) ScrollTrigger.refresh();
        });

        // Failsafe anti-conteúdo-preso: se 2,5s após o boot algum elemento com
        // [data-reveal] estiver na viewport mas ainda oculto (batch que não
        // disparou — rede lenta, edge case de refresh etc.), força a revelação.
        // Elementos abaixo da dobra mantêm a animação normal no scroll.
        const failsafeTimer = window.setTimeout(() => {
          if (disposed) return;
          const stuck = revealEls.filter((el) => {
            if (Number(gsap.getProperty(el, "autoAlpha")) > 0.05) return false;
            const rect = el.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
          });
          if (stuck.length) {
            gsap.to(stuck, {
              y: 0,
              rotationX: 0,
              autoAlpha: 1,
              duration: 0.5,
              ease: "power2.out",
              overwrite: true,
            });
          }
        }, 2500);

        teardown = () => {
          window.removeEventListener("resize", onResize);
          window.clearTimeout(resizeTimer);
          window.clearTimeout(failsafeTimer);
          ctx.revert();
          gsap.ticker.remove(onTick);
          setActiveLenis(null);
          lenis?.destroy();
        };
      } catch {
        restoreContent();
      }
    })();

    return () => {
      disposed = true;
      teardown?.();
    };
  }, [pathname]);

  return null;
}
