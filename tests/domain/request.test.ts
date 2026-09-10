import { describe, expect, it } from "vitest";
import {
  REQUEST_DRAFT_TTL_MS,
  REQUEST_SCHEMA_VERSION,
  clampQuantity,
  createEmptyRequest,
  generateLineId,
  generateReference,
  isRequestEmpty,
  parseStoredRequest,
  serializeRequest,
  stripPii,
  totalProfessionals,
} from "@/domain/request";
import type { PersonnelRequest, RequestProfile } from "@/domain/types";

function makeProfile(overrides: Partial<RequestProfile> = {}): RequestProfile {
  return {
    lineId: generateLineId(),
    profession: "soldador",
    specialization: null,
    quantity: 1,
    requirements: [],
    ...overrides,
  };
}

function makeRequest(): PersonnelRequest {
  return createEmptyRequest("es", "req-test-1", "2026-01-01T10:00:00.000Z");
}

describe("totalProfessionals", () => {
  it("sums quantities across profiles", () => {
    const profiles = [
      makeProfile({ profession: "soldador", quantity: 3 }),
      makeProfile({ profession: "montador", quantity: 5 }),
      makeProfile({ profession: "electricista", quantity: 2 }),
    ];
    expect(totalProfessionals(profiles)).toBe(10);
  });

  it("returns 0 for no profiles", () => {
    expect(totalProfessionals([])).toBe(0);
  });
});

describe("clampQuantity", () => {
  it("clamps below the minimum to 1", () => {
    expect(clampQuantity(0)).toBe(1);
    expect(clampQuantity(-10)).toBe(1);
  });

  it("clamps above the maximum to 500", () => {
    expect(clampQuantity(501)).toBe(500);
    expect(clampQuantity(10_000)).toBe(500);
  });

  it("keeps values inside 1..500", () => {
    expect(clampQuantity(1)).toBe(1);
    expect(clampQuantity(250)).toBe(250);
    expect(clampQuantity(500)).toBe(500);
  });

  it("rounds fractional quantities", () => {
    expect(clampQuantity(2.6)).toBe(3);
    expect(clampQuantity(2.4)).toBe(2);
  });

  it("falls back to 1 for non-finite input (NaN, Infinity)", () => {
    expect(clampQuantity(Number.NaN)).toBe(1);
    expect(clampQuantity(Number.POSITIVE_INFINITY)).toBe(1);
    expect(clampQuantity(Number.NEGATIVE_INFINITY)).toBe(1);
  });
});

describe("generateReference", () => {
  it("matches ^HDM-[A-Z0-9]{4}$", () => {
    for (let i = 0; i < 200; i += 1) {
      expect(generateReference()).toMatch(/^HDM-[A-Z0-9]{4}$/);
    }
  });

  it("never uses ambiguous characters (0, O, 1, I)", () => {
    for (let i = 0; i < 500; i += 1) {
      expect(generateReference()).not.toMatch(/[0O1I]/);
    }
  });

  it("uses the injected random source (deterministic)", () => {
    expect(generateReference(() => 0)).toBe("HDM-AAAA");
    expect(generateReference(() => 0.999999)).toBe("HDM-9999");
  });
});

describe("generateLineId", () => {
  it("produces unique ids over 100 generations", () => {
    const ids = new Set<string>();
    for (let i = 0; i < 100; i += 1) {
      ids.add(generateLineId());
    }
    expect(ids.size).toBe(100);
  });

  it("uses the line- prefix format", () => {
    expect(generateLineId()).toMatch(/^line-[a-z0-9]+-[a-z0-9]+$/);
  });
});

describe("isRequestEmpty", () => {
  it("is empty for a fresh request", () => {
    expect(isRequestEmpty(makeRequest())).toBe(true);
  });

  it("is not empty when a profile is present", () => {
    const request = makeRequest();
    request.profiles.push(makeProfile());
    expect(isRequestEmpty(request)).toBe(false);
  });

  it("expert mode: still empty with a job description but no profiles", () => {
    const request = makeRequest();
    request.mode = "expert";
    request.jobDescription = "Necesito refuerzo de soldadura";
    expect(isRequestEmpty(request)).toBe(true);
  });

  it("assisted mode: not empty with a job description of 10+ characters", () => {
    const request = makeRequest();
    request.mode = "assisted";
    request.jobDescription = "Necesito refuerzo de soldadura";
    expect(isRequestEmpty(request)).toBe(false);
  });

  it("assisted mode: still empty with a job description shorter than 10 characters", () => {
    const request = makeRequest();
    request.mode = "assisted";
    request.jobDescription = "corto";
    expect(isRequestEmpty(request)).toBe(true);
  });
});

describe("serializeRequest", () => {
  it("wraps the request in an envelope with schemaVersion and storedAt", () => {
    const serialized = serializeRequest(makeRequest());
    const envelope = JSON.parse(serialized) as {
      schemaVersion: number;
      storedAt: string;
      request: PersonnelRequest;
    };
    expect(envelope.schemaVersion).toBe(REQUEST_SCHEMA_VERSION);
    expect(typeof envelope.storedAt).toBe("string");
    expect(Number.isNaN(new Date(envelope.storedAt).getTime())).toBe(false);
  });

  it("strips PII (contact fields blanked) before persisting", () => {
    const request = makeRequest();
    request.contact = {
      company: "Acme SA",
      name: "Joana Silva",
      phone: "+34 600 111 222",
      email: "joana@acme.example",
    };
    const envelope = JSON.parse(serializeRequest(request)) as { request: PersonnelRequest };
    expect(envelope.request.contact).toEqual({ company: "", name: "", phone: "", email: "" });
    expect(serializeRequest(request)).not.toContain("Joana");
    expect(serializeRequest(request)).not.toContain("acme.example");
  });
});

describe("parseStoredRequest", () => {
  it("round-trips a serialized request (minus PII)", () => {
    const request = makeRequest();
    request.profiles.push(makeProfile({ profession: "calderero", quantity: 4 }));
    const parsed = parseStoredRequest(serializeRequest(request));
    expect(parsed).not.toBeNull();
    expect(parsed?.id).toBe(request.id);
    expect(parsed?.profiles).toHaveLength(1);
    expect(parsed?.profiles[0]?.quantity).toBe(4);
    expect(parsed?.contact).toEqual({ company: "", name: "", phone: "", email: "" });
  });

  it("returns null for null/garbage input", () => {
    expect(parseStoredRequest(null)).toBeNull();
    expect(parseStoredRequest("not json {{{")).toBeNull();
    expect(parseStoredRequest('"just a string"')).toBeNull();
  });

  it("returns null when the draft is older than the TTL", () => {
    const request = makeRequest();
    const storedAt = new Date(Date.now() - REQUEST_DRAFT_TTL_MS - 60_000);
    const raw = JSON.stringify({
      schemaVersion: REQUEST_SCHEMA_VERSION,
      storedAt: storedAt.toISOString(),
      request,
    });
    expect(parseStoredRequest(raw)).toBeNull();
  });

  it("returns null for a wrong schemaVersion", () => {
    const raw = JSON.stringify({
      schemaVersion: REQUEST_SCHEMA_VERSION + 1,
      storedAt: new Date().toISOString(),
      request: makeRequest(),
    });
    expect(parseStoredRequest(raw)).toBeNull();
  });

  it("resets status submitted to draft and clears the reference", () => {
    const request = makeRequest();
    request.status = "submitted";
    request.reference = "HDM-A7F2";
    const raw = JSON.stringify({
      schemaVersion: REQUEST_SCHEMA_VERSION,
      storedAt: new Date().toISOString(),
      request,
    });
    const parsed = parseStoredRequest(raw);
    expect(parsed?.status).toBe("draft");
    expect(parsed?.reference).toBeNull();
  });

  it("resets status submitting to draft", () => {
    const request = makeRequest();
    request.status = "submitting";
    const raw = JSON.stringify({
      schemaVersion: REQUEST_SCHEMA_VERSION,
      storedAt: new Date().toISOString(),
      request,
    });
    const parsed = parseStoredRequest(raw);
    expect(parsed?.status).toBe("draft");
  });

  it("never reintroduces PII from an old (pre-strip) draft", () => {
    const request = makeRequest();
    request.contact = {
      company: "Acme SA",
      name: "Joana Silva",
      phone: "+34 600 111 222",
      email: "joana@acme.example",
    };
    const raw = JSON.stringify({
      schemaVersion: REQUEST_SCHEMA_VERSION,
      storedAt: new Date().toISOString(),
      request,
    });
    const parsed = parseStoredRequest(raw);
    expect(parsed?.contact).toEqual({ company: "", name: "", phone: "", email: "" });
  });
});

describe("stripPii", () => {
  it("blanks every contact field without touching the rest", () => {
    const request = makeRequest();
    request.contact = {
      company: "Acme SA",
      name: "Joana",
      phone: "123456",
      email: "a@b.co",
    };
    const stripped = stripPii(request);
    expect(stripped.contact).toEqual({ company: "", name: "", phone: "", email: "" });
    expect(stripped.id).toBe(request.id);
    // original untouched (immutable copy)
    expect(request.contact.company).toBe("Acme SA");
  });
});
