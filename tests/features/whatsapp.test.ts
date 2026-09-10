import { describe, expect, it } from "vitest";
import { buildWhatsappMessage } from "@/features/request/whatsapp";
import { createEmptyRequest } from "@/domain/request";
import { getDictionary } from "@/i18n";

function makeRequest() {
  const request = createEmptyRequest("es", "req-wa-1", "2026-01-01T10:00:00.000Z");
  request.reference = "HDM-A7F2";
  request.needType = "parada-programada";
  request.profiles = [
    {
      lineId: "line-1",
      profession: "soldador",
      specialization: "tig",
      quantity: 2,
      requirements: [],
    },
    {
      lineId: "line-2",
      profession: "montador",
      specialization: null,
      quantity: 3,
      requirements: [],
    },
  ];
  request.project = {
    ...request.project,
    coverageArea: "barcelona",
    timing: "fecha-concreta",
    startDate: "2026-03-02",
    duration: { value: 3, unit: "semanas" },
  };
  request.contact = {
    company: "Industrias Acme SA",
    name: "Joana Silva",
    phone: "+34 600 111 222",
    email: "joana@acme.example",
  };
  request.attachments = [
    {
      id: "att-1",
      name: "planos-confidenciales.pdf",
      size: 1024,
      mimeType: "application/pdf",
      status: "ready",
    },
  ];
  return request;
}

describe("buildWhatsappMessage", () => {
  const dict = getDictionary("es");
  const message = buildWhatsappMessage(makeRequest(), dict, "es");

  it("includes the request reference", () => {
    expect(message).toContain("HDM-A7F2");
  });

  it("includes localized profile names with quantities and specialization", () => {
    expect(message).toContain("2 Soldador TIG");
    expect(message).toContain("3 Montador");
  });

  it("includes the need type label", () => {
    expect(message).toContain("Parada programada");
  });

  it("includes the location (coverage area name)", () => {
    expect(message).toContain("Barcelona");
  });

  it("includes start date and duration", () => {
    expect(message).toContain("2 de marzo de 2026");
    expect(message).toContain("3 semanas");
  });

  it("never includes contact PII (name, phone, email, company)", () => {
    expect(message).not.toContain("Joana");
    expect(message).not.toContain("600 111 222");
    expect(message).not.toContain("joana@acme.example");
    expect(message).not.toContain("Acme");
  });

  it("never includes attachment names", () => {
    expect(message).not.toContain("planos-confidenciales.pdf");
  });

  it("uses the city when no coverage area is set", () => {
    const request = makeRequest();
    request.project.coverageArea = null;
    request.project.city = " Lleida ";
    const withCity = buildWhatsappMessage(request, dict, "es");
    expect(withCity).toContain("Lleida");
  });

  it("includes the job description in assisted mode", () => {
    const request = makeRequest();
    request.mode = "assisted";
    request.jobDescription = "Refuerzo de soldadura de tubería en parada.";
    const assisted = buildWhatsappMessage(request, dict, "es");
    expect(assisted).toContain("Refuerzo de soldadura de tubería en parada.");
  });
});
