import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { RequestProvider } from "@/features/request/store";
import { TeamComposer } from "@/features/request/composer";

function wrapper({ children }: { children: ReactNode }) {
  return <RequestProvider locale="es">{children}</RequestProvider>;
}

describe("TeamComposer", () => {
  it("renders the empty state and the profile picker", () => {
    render(<TeamComposer locale="es" />, { wrapper });
    expect(screen.getByText("Añadir otro perfil")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Soldadores/ })).toBeInTheDocument();
  });

  it("adding a profile line updates the totals", () => {
    render(<TeamComposer locale="es" />, { wrapper });
    fireEvent.click(screen.getByRole("button", { name: /Soldadores/ }));
    // Totals block: "1 profesional" + "1 perfiles"
    expect(screen.getByText("profesional")).toBeInTheDocument();
    expect(screen.getByText(/1 perfiles/)).toBeInTheDocument();
    // The line shows the localized singular name
    expect(screen.getByText("Soldador")).toBeInTheDocument();
  });

  it("adding several profiles sums quantities in the totals", () => {
    render(<TeamComposer locale="es" />, { wrapper });
    fireEvent.click(screen.getByRole("button", { name: /Soldadores/ }));
    fireEvent.click(screen.getByRole("button", { name: /Montadores/ }));
    fireEvent.click(screen.getByRole("button", { name: /Montadores/ }));
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("profesionales")).toBeInTheDocument();
    expect(screen.getByText(/2 perfiles/)).toBeInTheDocument();
  });

  it("never displays capacity/headcount language (red claims)", () => {
    render(<TeamComposer locale="es" />, { wrapper });
    fireEvent.click(screen.getByRole("button", { name: /Soldadores/ }));
    expect(document.body.textContent ?? "").not.toMatch(
      /disponible ahora|disponibles ahora|profesionales disponibles/i,
    );
  });
});
