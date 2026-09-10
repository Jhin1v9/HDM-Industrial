import { describe, expect, it } from "vitest";
import {
  UPLOAD_LIMITS,
  isAllowedUpload,
  personnelRequestSubmissionSchema,
} from "@/domain/requestSchema";

const validContact = {
  company: "Industrias Acme SA",
  name: "Joana Silva",
  phone: "+34 600 111 222",
  email: "joana@acme.example",
};

const emptyProject = {
  timing: null,
  startDate: null,
  duration: { value: null, unit: null },
  shift: null,
  coverageArea: null,
  city: null,
  address: null,
  description: null,
};

const emptyLogistics = {
  displacement: "to_be_defined",
  displacementScope: null,
  accommodation: "to_be_defined",
  transport: "to_be_defined",
  allowances: "to_be_defined",
  notes: null,
};

function baseSubmission() {
  return {
    id: "req-1",
    locale: "es",
    mode: "expert",
    needType: null,
    profiles: [
      {
        lineId: "line-abc-1",
        profession: "soldador",
        specialization: "tig",
        quantity: 2,
        requirements: [],
      },
    ],
    sector: null,
    project: emptyProject,
    logistics: emptyLogistics,
    certificationRequired: null,
    certificationRequirements: [],
    attachments: [],
    jobDescription: null,
    approximateQuantity: null,
    contact: validContact,
    website: "",
  } as const;
}

function issueMessages(result: {
  success: boolean;
  error?: { issues: { message: string }[] };
}): string[] {
  return result.success ? [] : (result.error?.issues.map((i) => i.message) ?? []);
}

describe("personnelRequestSubmissionSchema", () => {
  it("accepts a valid minimal expert request", () => {
    const result = personnelRequestSubmissionSchema.safeParse(baseSubmission());
    expect(result.success).toBe(true);
  });

  it("rejects fecha-concreta with a startDate in the past (past_date)", () => {
    const submission = {
      ...baseSubmission(),
      project: { ...emptyProject, timing: "fecha-concreta", startDate: "2020-01-01" },
    };
    const result = personnelRequestSubmissionSchema.safeParse(submission);
    expect(result.success).toBe(false);
    expect(issueMessages(result)).toContain("past_date");
  });

  it("rejects expert mode with zero profiles (empty_request)", () => {
    const submission = { ...baseSubmission(), profiles: [] };
    const result = personnelRequestSubmissionSchema.safeParse(submission);
    expect(result.success).toBe(false);
    expect(issueMessages(result)).toContain("empty_request");
  });

  it("rejects assisted mode with a short description and no profiles", () => {
    const submission = {
      ...baseSubmission(),
      mode: "assisted",
      profiles: [],
      jobDescription: "corto",
    };
    const result = personnelRequestSubmissionSchema.safeParse(submission);
    expect(result.success).toBe(false);
    expect(issueMessages(result)).toContain("empty_request");
  });

  it("accepts assisted mode with a description of 10+ characters and no profiles", () => {
    const submission = {
      ...baseSubmission(),
      mode: "assisted",
      profiles: [],
      jobDescription: "Necesitamos reforzar la soldadura en parada.",
    };
    const result = personnelRequestSubmissionSchema.safeParse(submission);
    expect(result.success).toBe(true);
  });

  it("rejects a non-empty honeypot (website)", () => {
    const submission = { ...baseSubmission(), website: "https://spam.example" };
    const result = personnelRequestSubmissionSchema.safeParse(submission);
    expect(result.success).toBe(false);
  });

  it("rejects attachments above 25MB", () => {
    const submission = {
      ...baseSubmission(),
      attachments: [
        {
          id: "att-1",
          name: "planos.pdf",
          size: UPLOAD_LIMITS.maxSizeBytes + 1,
          mimeType: "application/pdf",
          status: "ready",
        },
      ],
    };
    const result = personnelRequestSubmissionSchema.safeParse(submission);
    expect(result.success).toBe(false);
  });
});

describe("isAllowedUpload", () => {
  const oneMb = 1024 * 1024;

  it.each([
    ["application/pdf"],
    ["image/jpeg"],
    ["image/png"],
    ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  ])("accepts %s", (mimeType) => {
    expect(isAllowedUpload(mimeType, oneMb)).toBe(true);
  });

  it.each([
    ["text/html"],
    ["image/svg+xml"],
    ["application/x-msdownload"],
    ["application/x-dosexec"],
    ["image/vnd.dwg"],
    ["application/acad"],
  ])("rejects %s", (mimeType) => {
    expect(isAllowedUpload(mimeType, oneMb)).toBe(false);
  });

  it("rejects files larger than 25MB", () => {
    expect(isAllowedUpload("application/pdf", UPLOAD_LIMITS.maxSizeBytes + 1)).toBe(false);
    expect(isAllowedUpload("application/pdf", UPLOAD_LIMITS.maxSizeBytes)).toBe(true);
  });

  it("rejects zero-byte files", () => {
    expect(isAllowedUpload("application/pdf", 0)).toBe(false);
  });
});
