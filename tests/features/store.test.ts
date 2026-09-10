import { describe, expect, it } from "vitest";
import { requestReducer } from "@/features/request/store";
import { createEmptyRequest, totalProfessionals } from "@/domain/request";
import type { PersonnelRequest } from "@/domain/types";

function makeState(): PersonnelRequest {
  return createEmptyRequest("es", "req-store-1", "2026-01-01T10:00:00.000Z");
}

describe("requestReducer", () => {
  it("addProfile adds a line with quantity 1", () => {
    const next = requestReducer(makeState(), { type: "addProfile", profession: "soldador" });
    expect(next.profiles).toHaveLength(1);
    expect(next.profiles[0]?.profession).toBe("soldador");
    expect(next.profiles[0]?.quantity).toBe(1);
    expect(next.profiles[0]?.specialization).toBeNull();
  });

  it("addProfile increments quantity when the same profession (no specialization) exists", () => {
    let state = makeState();
    state = requestReducer(state, { type: "addProfile", profession: "montador" });
    state = requestReducer(state, { type: "addProfile", profession: "montador" });
    expect(state.profiles).toHaveLength(1);
    expect(state.profiles[0]?.quantity).toBe(2);
  });

  it("setQuantity clamps to 1..500", () => {
    let state = makeState();
    state = requestReducer(state, { type: "addProfile", profession: "soldador" });
    const lineId = state.profiles[0]?.lineId ?? "";

    state = requestReducer(state, { type: "setQuantity", lineId, quantity: 900 });
    expect(state.profiles[0]?.quantity).toBe(500);

    state = requestReducer(state, { type: "setQuantity", lineId, quantity: 0 });
    expect(state.profiles[0]?.quantity).toBe(1);

    state = requestReducer(state, { type: "setQuantity", lineId, quantity: Number.NaN });
    expect(state.profiles[0]?.quantity).toBe(1);
  });

  it("removeProfile removes the matching line only", () => {
    let state = makeState();
    state = requestReducer(state, { type: "addProfile", profession: "soldador" });
    state = requestReducer(state, { type: "addProfile", profession: "calderero" });
    const soldadorLine = state.profiles.find((p) => p.profession === "soldador");

    state = requestReducer(state, {
      type: "removeProfile",
      lineId: soldadorLine?.lineId ?? "",
    });
    expect(state.profiles).toHaveLength(1);
    expect(state.profiles[0]?.profession).toBe("calderero");
  });

  it("setLocale does NOT wipe request content (§39)", () => {
    let state = makeState();
    state = requestReducer(state, { type: "addProfile", profession: "electricista" });
    state = requestReducer(state, { type: "setNeedType", needType: "trabajo-continuado" });
    state = requestReducer(state, { type: "setCity", city: "Tarragona" });

    const switched = requestReducer(state, { type: "setLocale", locale: "en" });
    expect(switched.locale).toBe("en");
    expect(switched.profiles).toHaveLength(1);
    expect(switched.profiles[0]?.profession).toBe("electricista");
    expect(switched.needType).toBe("trabajo-continuado");
    expect(switched.project.city).toBe("Tarragona");
    expect(totalProfessionals(switched.profiles)).toBe(1);
  });

  it("reset restores an empty request in the given locale", () => {
    let state = makeState();
    state = requestReducer(state, { type: "addProfile", profession: "soldador" });
    state = requestReducer(state, { type: "setCity", city: "Madrid" });

    const reset = requestReducer(state, { type: "reset", locale: "pt" });
    expect(reset.locale).toBe("pt");
    expect(reset.profiles).toHaveLength(0);
    expect(reset.project.city).toBeNull();
    expect(reset.status).toBe("draft");
    expect(reset.reference).toBeNull();
  });
});
