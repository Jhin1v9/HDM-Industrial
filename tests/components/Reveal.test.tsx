import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "@/components/ui/Reveal";

afterEach(() => {
  vi.unstubAllGlobals();
});

function mockMatchMedia(reducedMotion: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: reducedMotion,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
  );
}

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  observed: Element[] = [];
  constructor(private callback: IntersectionObserverCallback) {
    MockIntersectionObserver.instances.push(this);
  }
  observe(target: Element) {
    this.observed.push(target);
  }
  unobserve(target: Element) {
    this.observed = this.observed.filter((el) => el !== target);
  }
  disconnect() {
    this.observed = [];
  }
  trigger(entries: Partial<IntersectionObserverEntry>[]) {
    this.callback(entries as IntersectionObserverEntry[], {} as IntersectionObserver);
  }
}

describe("Reveal", () => {
  it("renders children without hiding anything (no-JS/crawler safe markup)", () => {
    mockMatchMedia(false);
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    render(
      <Reveal>
        <p>Sección visible</p>
      </Reveal>
    );
    expect(screen.getByText("Sección visible")).toBeInTheDocument();
  });

  it("adds is-visible immediately when prefers-reduced-motion is set", () => {
    mockMatchMedia(true);
    const { container } = render(<Reveal>contenido</Reveal>);
    expect(container.firstElementChild?.classList.contains("is-visible")).toBe(true);
  });

  it("observes the element and reveals permanently once intersecting", () => {
    mockMatchMedia(false);
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    const { container } = render(<Reveal>contenido</Reveal>);
    const el = container.firstElementChild as Element;

    const instance = MockIntersectionObserver.instances.at(-1);
    expect(instance?.observed).toContain(el);
    expect(el.classList.contains("is-visible")).toBe(false);

    instance?.trigger([{ target: el, isIntersecting: true }]);
    expect(el.classList.contains("is-visible")).toBe(true);
    // unobserve: revelado é permanente, sem re-animar no scroll
    expect(instance?.observed).not.toContain(el);
  });

  it("applies stagger delay via --reveal-delay custom property", () => {
    mockMatchMedia(false);
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    const { container } = render(<Reveal delay={120}>contenido</Reveal>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.getPropertyValue("--reveal-delay")).toBe("120ms");
  });
});
