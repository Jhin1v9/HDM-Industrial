import { afterEach, describe, expect, it, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { MotionProvider } from "@/components/chrome/MotionProvider";

afterEach(() => {
  vi.unstubAllGlobals();
  document.documentElement.classList.remove("js-reveal");
});

function mockMatchMedia(reducedMotion: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: reducedMotion,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      onchange: null,
      dispatchEvent: vi.fn(),
    }))
  );
}

describe("MotionProvider", () => {
  it("desliga tudo sob prefers-reduced-motion: remove o portão e não toca no conteúdo", () => {
    document.documentElement.classList.add("js-reveal");
    mockMatchMedia(true);

    const { container } = render(
      <div>
        <MotionProvider />
        <div data-reveal>contenido</div>
      </div>
    );

    // Sem Lenis, sem reveals: o portão some imediatamente (efeito síncrono).
    expect(document.documentElement.classList.contains("js-reveal")).toBe(false);
    const el = container.querySelector("[data-reveal]") as HTMLElement;
    expect(el.getAttribute("style")).toBeNull();
  });

  it("boota o GSAP e assume o controle dos [data-reveal] quando motion é permitido", { timeout: 20000 }, async () => {
    document.documentElement.classList.add("js-reveal");
    mockMatchMedia(false);

    render(
      <div>
        <MotionProvider />
        <div data-reveal data-delay="80">
          contenido
        </div>
      </div>
    );

    // O motor aplica os estados iniciais (opacity 0) inline — prova de que
    // o GSAP carregou e o conteúdo não está preso ao CSS do portão.
    await waitFor(
      () => {
        const el = document.querySelector("[data-reveal]") as HTMLElement;
        expect(el.style.opacity).toBe("0");
      },
      { timeout: 10000 }
    );
    // O portão permanece (o GSAP está no controle); o fallback de falha
    // é responsabilidade do catch do provider.
    expect(document.documentElement.classList.contains("js-reveal")).toBe(true);
  });
});
