"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  AttachmentMeta,
  Locale,
  NeedTypeId,
  PersonnelRequest,
  RequestContact,
  RequestDuration,
  RequestLogistics,
  RequestMode,
  SectorId,
  TimingOption,
  CoverageAreaId,
  ProfessionId,
  WeldingSpecialization,
} from "@/domain/types";
import {
  clampQuantity,
  createEmptyRequest,
  generateLineId,
  parseStoredRequest,
  serializeRequest,
} from "@/domain/request";

/**
 * Request state — global, persistent, locale-independent (§37–39).
 * Survives navigation and language switches via a single storage key.
 */
const STORAGE_KEY = "hdm.request.v1";

export type RequestAction =
  | { type: "hydrate"; request: PersonnelRequest }
  | { type: "setLocale"; locale: Locale }
  | { type: "setMode"; mode: RequestMode }
  | { type: "setNeedType"; needType: NeedTypeId | null }
  | { type: "addProfile"; profession: ProfessionId }
  | { type: "removeProfile"; lineId: string }
  | { type: "setSpecialization"; lineId: string; specialization: WeldingSpecialization | null }
  | { type: "setQuantity"; lineId: string; quantity: number }
  | { type: "setRequirements"; lineId: string; requirements: string[] }
  | { type: "setTiming"; timing: TimingOption | null }
  | { type: "setStartDate"; startDate: string | null }
  | { type: "setDuration"; duration: RequestDuration }
  | { type: "setShift"; shift: string | null }
  | { type: "setCoverageArea"; coverageArea: CoverageAreaId | null }
  | { type: "setCity"; city: string | null }
  | { type: "setAddress"; address: string | null }
  | { type: "setSector"; sector: SectorId | null }
  | { type: "setDescription"; description: string | null }
  | { type: "setLogistics"; logistics: Partial<RequestLogistics> }
  | { type: "setCertificationRequired"; required: "si" | "no" | "no-se" | null }
  | { type: "setCertificationRequirements"; requirements: string[] }
  | { type: "addAttachment"; attachment: AttachmentMeta }
  | { type: "removeAttachment"; id: string }
  | { type: "setJobDescription"; jobDescription: string | null }
  | { type: "setApproximateQuantity"; approximateQuantity: number | null }
  | { type: "setContact"; contact: Partial<RequestContact> }
  | { type: "markSubmitting" }
  | { type: "markSubmitted"; reference: string }
  | { type: "markFailed" }
  | { type: "reset"; locale: Locale };

function touch(request: PersonnelRequest): PersonnelRequest {
  return { ...request, updatedAt: new Date().toISOString() };
}

export function requestReducer(
  state: PersonnelRequest,
  action: RequestAction,
): PersonnelRequest {
  switch (action.type) {
    case "hydrate":
      return action.request;
    case "setLocale":
      return touch({ ...state, locale: action.locale });
    case "setMode":
      return touch({ ...state, mode: action.mode });
    case "setNeedType":
      return touch({ ...state, needType: action.needType });
    case "addProfile": {
      if (state.profiles.length >= 24) return state;
      const exists = state.profiles.find(
        (p) => p.profession === action.profession && p.specialization === null,
      );
      if (exists) {
        return touch({
          ...state,
          profiles: state.profiles.map((p) =>
            p.lineId === exists.lineId ? { ...p, quantity: clampQuantity(p.quantity + 1) } : p,
          ),
        });
      }
      return touch({
        ...state,
        profiles: [
          ...state.profiles,
          {
            lineId: generateLineId(),
            profession: action.profession,
            specialization: null,
            quantity: 1,
            requirements: [],
          },
        ],
      });
    }
    case "removeProfile":
      return touch({ ...state, profiles: state.profiles.filter((p) => p.lineId !== action.lineId) });
    case "setSpecialization":
      return touch({
        ...state,
        profiles: state.profiles.map((p) =>
          p.lineId === action.lineId ? { ...p, specialization: action.specialization } : p,
        ),
      });
    case "setQuantity":
      return touch({
        ...state,
        profiles: state.profiles.map((p) =>
          p.lineId === action.lineId ? { ...p, quantity: clampQuantity(action.quantity) } : p,
        ),
      });
    case "setRequirements":
      return touch({
        ...state,
        profiles: state.profiles.map((p) =>
          p.lineId === action.lineId ? { ...p, requirements: action.requirements } : p,
        ),
      });
    case "setTiming":
      return touch({ ...state, project: { ...state.project, timing: action.timing } });
    case "setStartDate":
      return touch({ ...state, project: { ...state.project, startDate: action.startDate } });
    case "setDuration":
      return touch({ ...state, project: { ...state.project, duration: action.duration } });
    case "setShift":
      return touch({ ...state, project: { ...state.project, shift: action.shift } });
    case "setCoverageArea":
      return touch({ ...state, project: { ...state.project, coverageArea: action.coverageArea } });
    case "setCity":
      return touch({ ...state, project: { ...state.project, city: action.city } });
    case "setAddress":
      return touch({ ...state, project: { ...state.project, address: action.address } });
    case "setSector":
      return touch({ ...state, sector: action.sector });
    case "setDescription":
      return touch({ ...state, project: { ...state.project, description: action.description } });
    case "setLogistics":
      return touch({ ...state, logistics: { ...state.logistics, ...action.logistics } });
    case "setCertificationRequired":
      return touch({ ...state, certificationRequired: action.required });
    case "setCertificationRequirements":
      return touch({ ...state, certificationRequirements: action.requirements });
    case "addAttachment":
      if (state.attachments.length >= 10) return state;
      return touch({ ...state, attachments: [...state.attachments, action.attachment] });
    case "removeAttachment":
      return touch({ ...state, attachments: state.attachments.filter((a) => a.id !== action.id) });
    case "setJobDescription":
      return touch({ ...state, jobDescription: action.jobDescription });
    case "setApproximateQuantity":
      return touch({ ...state, approximateQuantity: action.approximateQuantity });
    case "setContact":
      return touch({ ...state, contact: { ...state.contact, ...action.contact } });
    case "markSubmitting":
      return touch({ ...state, status: "submitting" });
    case "markSubmitted":
      return touch({ ...state, status: "submitted", reference: action.reference });
    case "markFailed":
      return touch({ ...state, status: "failed" });
    case "reset":
      return createEmptyRequest(action.locale, generateLineId(), new Date().toISOString());
    default:
      return state;
  }
}

interface RequestContextValue {
  request: PersonnelRequest;
  dispatch: React.Dispatch<RequestAction>;
  hydrated: boolean;
  /** True when the last successful submission was stored by the demo repository. */
  submissionDemo: boolean;
  setSubmissionDemo: (demo: boolean) => void;
}

const RequestContext = createContext<RequestContextValue | null>(null);

export function RequestProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const [request, dispatch] = useReducer(
    requestReducer,
    undefined,
    () => createEmptyRequest(locale, generateLineId(), new Date().toISOString()),
  );
  const [hydrated, setHydrated] = useState(false);
  const [submissionDemo, setSubmissionDemo] = useState(false);
  const localeRef = useRef(locale);

  // Hydrate from storage once (client only).
  useEffect(() => {
    const stored = parseStoredRequest(
      typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null,
    );
    if (stored) {
      dispatch({ type: "hydrate", request: { ...stored, locale } });
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-only hydration of the persisted draft (SSR-safe by design)
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Locale switch must NOT wipe the request (§39) — only update the locale field.
  useEffect(() => {
    if (localeRef.current !== locale) {
      localeRef.current = locale;
      dispatch({ type: "setLocale", locale });
    }
  }, [locale]);

  // Persist on change — ONLY after hydration has COMMITTED (hydrated state, not
  // the ref): persisting on the same flush as the hydrate dispatch would write
  // the initial empty request over the stored draft (React StrictMode wipes).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, serializeRequest(request));
    } catch {
      // Storage full/blocked — request still lives in memory. Never crash the UX.
    }
  }, [request, hydrated]);


  const value = useMemo(
    () => ({ request, dispatch, hydrated, submissionDemo, setSubmissionDemo }),
    [request, hydrated, submissionDemo],
  );
  return <RequestContext.Provider value={value}>{children}</RequestContext.Provider>;
}

export function useRequest(): RequestContextValue {
  const ctx = useContext(RequestContext);
  if (!ctx) throw new Error("useRequest must be used inside RequestProvider");
  return ctx;
}

/** Prefill helpers used by profile/solution/coverage pages. */
export function usePrefillRequest() {
  const { dispatch } = useRequest();
  return {
    addProfession: (profession: ProfessionId) => dispatch({ type: "addProfile", profession }),
    setNeedType: (needType: NeedTypeId) => dispatch({ type: "setNeedType", needType }),
    setCoverageArea: (area: CoverageAreaId) => dispatch({ type: "setCoverageArea", coverageArea: area }),
    flagDisplacement: () =>
      dispatch({ type: "setLogistics", logistics: { displacement: "required" } }),
  };
}

export const REQUEST_STORAGE_KEY = STORAGE_KEY;

/** Stable id generator exported for tests. */
export { generateLineId };
export const useResetRequest = () => {
  const { dispatch } = useRequest();
  return useCallback((locale: Locale) => dispatch({ type: "reset", locale }), [dispatch]);
};
