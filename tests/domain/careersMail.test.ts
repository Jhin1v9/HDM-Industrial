import { describe, expect, it } from "vitest";
import {
  buildCareersBody,
  buildCareersMailto,
  formatFileSize,
  isAcceptedCvFile,
  isCvSizeAllowed,
} from "@/features/careers/mailto";

const labels = {
  name: "Nombre",
  email: "Email",
  phone: "Teléfono",
  profile: "Perfil",
  zone: "Zona",
  attachment: "Currículum",
};

const base = {
  name: "Ana López",
  email: "ana@example.com",
  phone: "+34 600 000 000",
  profile: "Soldadores",
  zone: "",
  message: "",
  attachment: null,
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

  it("omits empty optional fields (zone, message, attachment)", () => {
    const body = decodeURIComponent(buildCareersMailto(base, "rrhh@hdmindustrial.es", labels));
    expect(body).not.toContain("Zona:");
    expect(body).not.toContain("Currículum:");
    expect(body.split("\n")).toHaveLength(4);
  });

  it("includes zone, attachment and message when filled", () => {
    const body = buildCareersBody(
      {
        ...base,
        zone: "Tarragona",
        message: "Experiencia en paradas",
        attachment: { name: "ana-cv.pdf", sizeLabel: "250 KB" },
      },
      labels,
    );
    expect(body).toContain("Zona: Tarragona");
    expect(body).toContain("Currículum: ana-cv.pdf (250 KB)");
    expect(body).toContain("Experiencia en paradas");
  });

  it("encodes special characters safely", () => {
    const mailto = buildCareersMailto({ ...base, name: "Ana & Co" }, "rrhh@hdmindustrial.es", labels);
    expect(mailto).not.toContain(" ");
    expect(decodeURIComponent(mailto)).toContain("Ana & Co");
  });
});

describe("CV file validation", () => {
  it("accepts the allowed extensions (case-insensitive)", () => {
    for (const name of ["cv.pdf", "CV.PDF", "cv.doc", "cv.docx", "foto.JPG", "cv.png"]) {
      expect(isAcceptedCvFile({ name })).toBe(true);
    }
  });

  it("rejects other extensions", () => {
    for (const name of ["cv.txt", "cv.zip", "cv.exe", "cv", "cv.pdf.exe"]) {
      expect(isAcceptedCvFile({ name })).toBe(false);
    }
  });

  it("enforces the 25 MB size limit", () => {
    expect(isCvSizeAllowed(1)).toBe(true);
    expect(isCvSizeAllowed(25 * 1024 * 1024)).toBe(true);
    expect(isCvSizeAllowed(25 * 1024 * 1024 + 1)).toBe(false);
    expect(isCvSizeAllowed(0)).toBe(false);
  });
});

describe("formatFileSize", () => {
  it("formats bytes, KB and MB", () => {
    expect(formatFileSize(512)).toBe("512 B");
    expect(formatFileSize(2048)).toBe("2 KB");
    expect(formatFileSize(256 * 1024)).toBe("256 KB");
    expect(formatFileSize(25 * 1024 * 1024)).toBe("25.0 MB");
  });
});
