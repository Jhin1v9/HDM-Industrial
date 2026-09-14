import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Novo contrato do Reveal: wrapper mínimo que apenas marca data-attributes
 * processados pelo MotionProvider (GSAP). Nenhuma lógica de observer/transição
 * vive aqui — o motor de motion é client-side e testado separadamente.
 */
describe("Reveal", () => {
  it("renders children and marks the element with data-reveal", () => {
    render(
      <Reveal>
        <p>Sección visible</p>
      </Reveal>
    );
    const wrapper = screen.getByText("Sección visible").parentElement as HTMLElement;
    expect(wrapper).toHaveAttribute("data-reveal");
    expect(wrapper.textContent).toBe("Sección visible");
  });

  it("never hides content in markup (no-JS / crawler safe)", () => {
    const { container } = render(<Reveal>contenido</Reveal>);
    const el = container.firstElementChild as HTMLElement;
    // Sem estilos inline de ocultação e sem classe .reveal do sistema antigo:
    // sem JS, nada fica invisível.
    expect(el.getAttribute("style")).toBeNull();
    expect(el.className).not.toContain("reveal");
    expect(el.textContent).toBe("contenido");
  });

  it("maps delay to data-delay in ms for the motion engine stagger", () => {
    const { container } = render(<Reveal delay={120}>contenido</Reveal>);
    expect(container.firstElementChild).toHaveAttribute("data-delay", "120");
  });

  it("omits data-delay when no delay is set", () => {
    const { container } = render(<Reveal>contenido</Reveal>);
    expect(container.firstElementChild).not.toHaveAttribute("data-delay");
  });

  it("marks hero entries with data-reveal='hero' (timeline de entrada no load)", () => {
    const { container } = render(<Reveal hero>contenido</Reveal>);
    expect(container.firstElementChild).toHaveAttribute("data-reveal", "hero");
  });

  it("marks hero image entries with data-hero-zoom (fade + scale 1.04 → 1)", () => {
    const { container } = render(
      <Reveal hero zoom>
        imagen
      </Reveal>
    );
    expect(container.firstElementChild).toHaveAttribute("data-reveal", "hero");
    expect(container.firstElementChild).toHaveAttribute("data-hero-zoom");
  });

  it("keeps className passthrough", () => {
    const { container } = render(<Reveal className="flex flex-col">contenido</Reveal>);
    expect(container.firstElementChild).toHaveClass("flex", "flex-col");
  });
});
