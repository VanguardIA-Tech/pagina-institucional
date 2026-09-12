export const acquisitionParameterNames = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_conta",
  "utm_id",
  "placement",
  "gclid",
  "wbraid",
  "gbraid",
  "fbclid",
  "ttclid",
  "msclkid",
] as const;

export type AcquisitionParameterName = (typeof acquisitionParameterNames)[number];

export type AcquisitionParameterState =
  | { readonly state: "absent" }
  | { readonly state: "empty"; readonly occurrences: number }
  | {
      readonly state: "present";
      readonly occurrences: readonly string[];
      readonly canonicalValue: string;
    }
  | {
      readonly state: "ambiguous";
      readonly occurrences: readonly string[];
      readonly distinctCanonicalValues: readonly string[];
    }
  | {
      readonly state: "invalid";
      readonly occurrenceCount: number;
      readonly safeOccurrences: readonly string[];
      readonly redactedOccurrenceCount: number;
      readonly reason: "schema" | "evident_pii" | "not_allowed";
    };

export type AcquisitionParameters = Readonly<
  Partial<Record<AcquisitionParameterName, AcquisitionParameterState>>
>;

export type SanitizedReferrer =
  | { readonly state: "absent" }
  | { readonly state: "invalid"; readonly reason: "scheme" | "host" | "length" | "pii" }
  | { readonly state: "present"; readonly origin: string; readonly path: string };

export type AcquisitionNavigationKind =
  "external_entry" | "internal_origin" | "same_origin_recovery" | "unknown";

export interface TransportedAcquisitionContext {
  readonly carriedFrom: {
    readonly occurredAt: string;
    readonly origin: string;
    readonly path: string;
  };
  readonly contextSha256: string;
  readonly parameters: AcquisitionParameters;
  readonly provenance: "internal_navigation" | "same_page_recovery";
}

export interface AcquisitionCaptureQuality {
  readonly clockTrusted: boolean;
  readonly identityAvailable: boolean;
  readonly limitations: readonly (
    | "client_clock_untrusted"
    | "identity_unavailable"
    | "referrer_unavailable"
    | "storage_unavailable"
    | "transported_context_unverified"
    | "continuity_handoff_absent"
    | "continuity_handoff_invalid"
    | "continuity_handoff_expired"
  )[];
  readonly storageAvailable: boolean;
}

export type AcquisitionTraffic =
  | { readonly kind: "production" }
  | { readonly kind: "validation"; readonly validationRunId: string };

export interface AcquisitionArrivalPayload {
  readonly arrival_reason: "initial" | "context_change" | "returning_campaign" | "session_expired";
  readonly capture: AcquisitionCaptureQuality;
  readonly navigation: {
    readonly kind: AcquisitionNavigationKind;
    readonly referrer: SanitizedReferrer;
  };
  readonly observed: {
    readonly parameters: AcquisitionParameters;
    readonly vtLink: AcquisitionParameterState;
  };
  readonly traffic: AcquisitionTraffic;
  readonly transported: TransportedAcquisitionContext | null;
}

export type AcquisitionArrivalEvent = {
  readonly acquisition_session_id: string;
  readonly arrival_id: string;
  readonly event_id: string;
  readonly event_name: "acquisition_arrival";
  readonly event_version: 3;
  readonly funnel_key: string;
  readonly funnel_version: number;
  readonly journey_id: string;
  readonly landing_path: string;
  readonly occurred_at: string;
  readonly page_view_id: string;
  readonly payload: AcquisitionArrivalPayload;
  readonly project_id: string;
  readonly session_id: string;
};

interface Parser<T> {
  safeParse(value: unknown): ParseResult<T>;
}

export type ParseResult<T> =
  | { readonly success: true; readonly data: T }
  | { readonly success: false };

const eventKeys = [
  "acquisition_session_id",
  "arrival_id",
  "event_id",
  "event_name",
  "event_version",
  "funnel_key",
  "funnel_version",
  "journey_id",
  "landing_path",
  "occurred_at",
  "page_view_id",
  "payload",
  "project_id",
  "session_id",
] as const;

const uuidV4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const attributionPattern = /^[A-Za-z0-9._~-]{1,128}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function exactRecord(
  value: unknown,
  keys: readonly string[],
): value is Record<string, unknown> {
  return (
    isRecord(value) &&
    Object.keys(value).length === keys.length &&
    keys.every((key: string): boolean => Object.hasOwn(value, key))
  );
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

function isUuidV4(value: unknown): value is string {
  return typeof value === "string" && uuidV4Pattern.test(value);
}

function isDateTimeWithOffset(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}(?:Z|[+-]\d{2}:\d{2})$/.test(value) &&
    !Number.isNaN(Date.parse(value))
  );
}

function isShortString(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.length <= maxLength;
}

function isOccurrenceArray(value: unknown): value is readonly string[] {
  return (
    Array.isArray(value) &&
    value.length <= 16 &&
    value.every((occurrence: unknown): boolean => isShortString(occurrence, 512))
  );
}

function isParameterState(value: unknown): value is AcquisitionParameterState {
  if (exactRecord(value, ["state"]) && value.state === "absent") return true;
  if (
    exactRecord(value, ["state", "occurrences"]) &&
    value.state === "empty" &&
    isPositiveInteger(value.occurrences)
  ) {
    return true;
  }
  if (
    exactRecord(value, ["canonicalValue", "occurrences", "state"]) &&
    value.state === "present" &&
    isOccurrenceArray(value.occurrences) &&
    value.occurrences.length >= 1 &&
    isShortString(value.canonicalValue, 512) &&
    new Set(value.occurrences).size === 1 &&
    value.occurrences[0] === value.canonicalValue
  ) {
    return true;
  }
  if (
    exactRecord(value, ["distinctCanonicalValues", "occurrences", "state"]) &&
    value.state === "ambiguous" &&
    isOccurrenceArray(value.occurrences) &&
    isOccurrenceArray(value.distinctCanonicalValues) &&
    value.occurrences.length >= 2 &&
    value.distinctCanonicalValues.length >= 2 &&
    value.distinctCanonicalValues.length === new Set(value.distinctCanonicalValues).size
  ) {
    return true;
  }
  if (
    exactRecord(value, [
      "occurrenceCount",
      "reason",
      "redactedOccurrenceCount",
      "safeOccurrences",
      "state",
    ]) &&
    value.state === "invalid" &&
    isPositiveInteger(value.occurrenceCount) &&
    value.occurrenceCount <= 16 &&
    isOccurrenceArray(value.safeOccurrences) &&
    typeof value.redactedOccurrenceCount === "number" &&
    Number.isInteger(value.redactedOccurrenceCount) &&
    value.redactedOccurrenceCount >= 0 &&
    value.redactedOccurrenceCount <= 16 &&
    typeof value.reason === "string" &&
    ["evident_pii", "not_allowed", "schema"].includes(value.reason)
  ) {
    return true;
  }
  return false;
}

function isParameters(value: unknown): value is AcquisitionParameters {
  if (!isRecord(value)) return false;
  return Object.entries(value).every(
    ([name, state]: [string, unknown]): boolean =>
      (acquisitionParameterNames as readonly string[]).includes(name) &&
      isParameterState(state),
  );
}

function isReferrer(value: unknown): value is SanitizedReferrer {
  if (exactRecord(value, ["state"]) && value.state === "absent") return true;
  if (
    exactRecord(value, ["reason", "state"]) &&
    value.state === "invalid" &&
    ["host", "length", "pii", "scheme"].includes(String(value.reason))
  ) {
    return true;
  }
  return (
    exactRecord(value, ["origin", "path", "state"]) &&
    value.state === "present" &&
    typeof value.origin === "string" &&
    /^https:\/\/[a-z0-9.-]+(?::\d{2,5})?$/i.test(value.origin) &&
    typeof value.path === "string" &&
    /^\/[A-Za-z0-9._~/-]{0,512}$/.test(value.path)
  );
}

function isCapture(value: unknown): value is AcquisitionCaptureQuality {
  if (!exactRecord(value, ["clockTrusted", "identityAvailable", "limitations", "storageAvailable"])) {
    return false;
  }
  const allowedLimitations = [
    "client_clock_untrusted",
    "identity_unavailable",
    "referrer_unavailable",
    "storage_unavailable",
    "transported_context_unverified",
    "continuity_handoff_absent",
    "continuity_handoff_invalid",
    "continuity_handoff_expired",
  ];
  return (
    isBoolean(value.clockTrusted) &&
    isBoolean(value.identityAvailable) &&
    isBoolean(value.storageAvailable) &&
    Array.isArray(value.limitations) &&
    value.limitations.length <= 8 &&
    value.limitations.every((limitation: unknown): boolean =>
      allowedLimitations.includes(String(limitation)),
    )
  );
}

function isTraffic(value: unknown): value is AcquisitionTraffic {
  if (exactRecord(value, ["kind"]) && value.kind === "production") return true;
  return (
    exactRecord(value, ["kind", "validationRunId"]) &&
    value.kind === "validation" &&
    typeof value.validationRunId === "string" &&
    /^[a-zA-Z0-9._:-]{8,128}$/.test(value.validationRunId)
  );
}

function isTransported(value: unknown): value is TransportedAcquisitionContext {
  return (
    exactRecord(value, ["carriedFrom", "contextSha256", "parameters", "provenance"]) &&
    isRecord(value.carriedFrom) &&
    exactRecord(value.carriedFrom, ["occurredAt", "origin", "path"]) &&
    isDateTimeWithOffset(value.carriedFrom.occurredAt) &&
    typeof value.carriedFrom.origin === "string" &&
    /^https:\/\//i.test(value.carriedFrom.origin) &&
    isShortString(value.carriedFrom.path, 512) &&
    value.carriedFrom.path.length >= 1 &&
    typeof value.contextSha256 === "string" &&
    /^[0-9a-f]{64}$/.test(value.contextSha256) &&
    isParameters(value.parameters) &&
    (value.provenance === "internal_navigation" || value.provenance === "same_page_recovery")
  );
}

function isPayload(value: unknown): value is AcquisitionArrivalPayload {
  if (!exactRecord(value, ["arrival_reason", "capture", "navigation", "observed", "traffic", "transported"])) {
    return false;
  }
  const arrivalReasons = ["context_change", "initial", "returning_campaign", "session_expired"];
  const navigationKinds = [
    "external_entry",
    "internal_origin",
    "same_origin_recovery",
    "unknown",
  ];
  const navigation = value.navigation;
  const observed = value.observed;
  return (
    arrivalReasons.includes(String(value.arrival_reason)) &&
    isCapture(value.capture) &&
    isRecord(navigation) &&
    exactRecord(navigation, ["kind", "referrer"]) &&
    navigationKinds.includes(String(navigation.kind)) &&
    isReferrer(navigation.referrer) &&
    isRecord(observed) &&
    exactRecord(observed, ["parameters", "vtLink"]) &&
    isParameters(observed.parameters) &&
    isParameterState(observed.vtLink) &&
    isTraffic(value.traffic) &&
    (value.transported === null || isTransported(value.transported))
  );
}

function isArrivalEvent(value: unknown): value is AcquisitionArrivalEvent {
  if (!exactRecord(value, eventKeys)) return false;
  return (
    isUuidV4(value.acquisition_session_id) &&
    isUuidV4(value.arrival_id) &&
    isUuidV4(value.event_id) &&
    value.event_name === "acquisition_arrival" &&
    value.event_version === 3 &&
    typeof value.funnel_key === "string" &&
    /^[a-z][a-z0-9_]{1,95}$/.test(value.funnel_key) &&
    isPositiveInteger(value.funnel_version) &&
    isUuidV4(value.journey_id) &&
    typeof value.landing_path === "string" &&
    value.landing_path.length >= 1 &&
    value.landing_path.length <= 512 &&
    /^\/(?!\/)[^?#\s]*$/.test(value.landing_path) &&
    isDateTimeWithOffset(value.occurred_at) &&
    isUuidV4(value.page_view_id) &&
    isPayload(value.payload) &&
    typeof value.project_id === "string" &&
    /^[a-z][a-z0-9_]{2,63}$/.test(value.project_id) &&
    isUuidV4(value.session_id)
  );
}

export const acquisitionArrivalEventSchema: Parser<AcquisitionArrivalEvent> = {
  safeParse: (value: unknown): ParseResult<AcquisitionArrivalEvent> =>
    isArrivalEvent(value) ? { data: value, success: true } : { success: false },
};

function isEvidentBrazilianDocument(value: string): boolean {
  const digits = value.replace(/[./-]/g, "");
  if (!/^\d+$/.test(digits) || ![11, 14].includes(digits.length)) return false;
  const validate = (baseLength: number, weights: readonly number[][]): boolean => {
    let current = digits.slice(0, baseLength);
    for (const row of weights) {
      const sum = current
        .split("")
        .reduce((total, digit, index): number => total + Number(digit) * (row[index] ?? 0), 0);
      current += String(sum % 11 < 2 ? 0 : 11 - (sum % 11));
    }
    return current === digits;
  };
  return digits.length === 11
    ? validate(9, [
        [10, 9, 8, 7, 6, 5, 4, 3, 2],
        [11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
      ])
    : validate(12, [
        [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
        [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
      ]);
}

export function containsEvidentPii(value: string): boolean {
  let digits = value.replace(/[\s.()/+-]/g, "");
  let brazilianPhone = false;
  if (/^\d{10,13}$/.test(digits)) {
    if (digits.length >= 12) digits = digits.startsWith("55") ? digits.slice(2) : "";
    if (digits.length >= 10) {
      const areaCode = Number(digits.slice(0, 2));
      brazilianPhone = areaCode >= 11 && areaCode <= 99;
    }
  }
  return brazilianPhone || isEvidentBrazilianDocument(value);
}

function isValidAttributionValue(value: string): boolean {
  return attributionPattern.test(value) && !containsEvidentPii(value);
}

function firstInvalid(
  occurrences: readonly string[],
): { readonly reason: "evident_pii" | "schema" } | null {
  for (const value of occurrences) {
    if (!isValidAttributionValue(value)) {
      return { reason: containsEvidentPii(value) ? "evident_pii" : "schema" };
    }
  }
  return null;
}

export function readAcquisitionParameter(
  name: AcquisitionParameterName,
  occurrences: readonly string[],
  placementGoverned = false,
): AcquisitionParameterState {
  if (occurrences.length === 0) return { state: "absent" };
  if (occurrences.every((value: string): boolean => value.length === 0)) {
    return { occurrences: occurrences.length, state: "empty" };
  }

  const invalid = firstInvalid(occurrences);
  if (invalid !== null) {
    const safeOccurrences = occurrences.filter(isValidAttributionValue);
    return {
      occurrenceCount: occurrences.length,
      reason: invalid.reason,
      redactedOccurrenceCount: occurrences.length - safeOccurrences.length,
      safeOccurrences,
      state: "invalid",
    };
  }

  if (name === "placement" && !placementGoverned) {
    return {
      occurrenceCount: occurrences.length,
      reason: "not_allowed",
      redactedOccurrenceCount: 0,
      safeOccurrences: [...occurrences],
      state: "invalid",
    };
  }

  const distinctValues = [...new Set(occurrences)];
  return distinctValues.length === 1
    ? {
        canonicalValue: distinctValues[0] ?? "",
        occurrences: [...occurrences],
        state: "present",
      }
    : {
        distinctCanonicalValues: distinctValues,
        occurrences: [...occurrences],
        state: "ambiguous",
      };
}

export function readVtLinkParameter(occurrences: readonly string[]): AcquisitionParameterState {
  const validPattern = /^vtl_[A-Za-z0-9_-]{22}$/;
  const invalid = occurrences.find((value: string): boolean => !validPattern.test(value));
  if (invalid !== undefined) {
    const safeOccurrences = occurrences.filter((value: string): boolean => validPattern.test(value));
    return {
      occurrenceCount: occurrences.length,
      reason: containsEvidentPii(invalid) ? "evident_pii" : "schema",
      redactedOccurrenceCount: occurrences.length - safeOccurrences.length,
      safeOccurrences,
      state: "invalid",
    };
  }
  return readAcquisitionParameter("utm_source", occurrences);
}

export function sanitizeReferrer(rawReferrer: string | null | undefined): SanitizedReferrer {
  if (!rawReferrer) return { state: "absent" };
  let referrer: URL;
  try {
    referrer = new URL(rawReferrer);
  } catch {
    return { reason: "scheme", state: "invalid" };
  }
  if (referrer.protocol !== "https:") return { reason: "scheme", state: "invalid" };
  if (referrer.hostname === "") return { reason: "host", state: "invalid" };
  if (referrer.origin.length > 2_048 || referrer.pathname.length > 512) {
    return { reason: "length", state: "invalid" };
  }
  if (!/^\/[A-Za-z0-9._~/-]*$/.test(referrer.pathname) || containsEvidentPii(referrer.pathname)) {
    return { reason: "pii", state: "invalid" };
  }
  return { origin: referrer.origin, path: referrer.pathname, state: "present" };
}
