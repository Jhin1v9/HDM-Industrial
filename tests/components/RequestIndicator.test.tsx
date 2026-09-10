import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { RequestProvider, useRequest } from "@/features/request/store";
import { RequestIndicator, RequestUiProvider } from "@/features/request/chrome";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

/** Helper that lets the test mutate the request through the real context. */
function AddProfessionButton() {
  const { dispatch } = useRequest();
  return (
    <button type="button" onClick={() => dispatch({ type: "addProfile", profession: "soldador" })}>
      test-add
    </button>
  );
}

function wrapper({ children }: { children: ReactNode }) {
  return (
    <RequestProvider locale="es">
      <RequestUiProvider>{children}</RequestUiProvider>
    </RequestProvider>
  );
}

function renderIndicator() {
  return render(
    <>
      <RequestIndicator locale="es" />
      <AddProfessionButton />
    </>,
    { wrapper },
  );
}

describe("RequestIndicator", () => {
  it("shows the empty-state label when the request has no content", () => {
    renderIndicator();
    expect(
      screen.getByRole("button", { name: "Solicitar personal" }),
    ).toBeInTheDocument();
  });

  it("shows the with-items label and the total count after adding a profile", () => {
    renderIndicator();
    fireEvent.click(screen.getByRole("button", { name: "test-add" }));
    fireEvent.click(screen.getByRole("button", { name: "test-add" }));

    const indicator = screen.getByRole("button", { name: /Mi solicitud/ });
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveTextContent("· 2");
    expect(screen.queryByRole("button", { name: "Solicitar personal" })).not.toBeInTheDocument();
  });

  it("never uses capacity/headcount language", () => {
    renderIndicator();
    fireEvent.click(screen.getByRole("button", { name: "test-add" }));
    expect(document.body.textContent ?? "").not.toMatch(
      /disponible ahora|disponibles ahora|profesionales disponibles/i,
    );
  });
});
