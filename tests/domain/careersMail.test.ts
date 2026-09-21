import { describe, expect, it } from "vitest";
import { buildCareersMailto } from "@/features/careers/mailto";

const labels = { name: "Nombre", email: "Email", phone: "Teléfono", profile: "Perfil", zone: "Zona" };

const base = {
  name: "Ana López",
  email: "ana@example.com",
  phone: "+34 600 000 000",
  profile: "Soldadores",
  zone: "",
  message: "",
};

describe("buildCareersMailto", () => {
  it("targets the confirmed HR inbox with a structured subject", () => {
    const mailto = buildCareersMailto(base, "rrhh@hdmindustrial.es", labels);
    expect(mailto.startsWith("mailto:rrhh@hdmindustrial.es?")).toBe(true);
    expect(decodeURIComponent(mailto)).toContain("CV Web HDM — Soldadores — Ana López");
  });

  it("includes the filled fields in the body", () => {
    const body = decodeURIComponent(buildCareersMailto(base, "rrhh@hdmindustrial.es", labels));
    expect(body).toContain("Nombre: Ana López");
    expect(body).toContain("Email: ana@example.com");
    expect(body).toContain("Perfil: Soldadores");
  });

  it("omits empty optional fields (zone, message)", () => {
    const body = decodeURIComponent(buildCareersMailto(base, "rrhh@hdmindustrial.es", labels));
    expect(body).not.toContain("Zona:");
    expect(body.split("\n")).toHaveLength(4);
  });

  it("includes zone and message when filled", () => {
    const body = decodeURIComponent(
      buildCareersMailto(
        { ...base, zone: "Tarragona", message: "Experiencia en paradas" },
        "rrhh@hdmindustrial.es",
        labels,
      ),
    );
    expect(body).toContain("Zona: Tarragona");
    expect(body).toContain("Experiencia en paradas");
  });

  it("encodes special characters safely", () => {
    const mailto = buildCareersMailto(
      { ...base, name: "Ana & Co" },
      "rrhh@hdmindustrial.es",
      labels,
    );
    expect(mailto).not.toContain(" ");
    expect(decodeURIComponent(mailto)).toContain("Ana & Co");
  });
});
