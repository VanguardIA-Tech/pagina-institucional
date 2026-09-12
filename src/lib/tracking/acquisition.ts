import { trackingConfig } from "./config";
import {
  containsEvidentPii,
  acquisitionArrivalEventSchema,
  acquisitionParameterNames,
  readAcquisitionParameter,
  readVtLinkParameter,
  sanitizeReferrer,
  type AcquisitionArrivalEvent,
  type AcquisitionCaptureQuality,
  type AcquisitionNavigationKind,
  type AcquisitionParameterName,
  type AcquisitionParameters,
  type AcquisitionParameterState,
  type SanitizedReferrer,
} from "./acquisition-contract";
import { getIdentity, isUuidV4, uuid } from "./identity";

const storageKey = "vg_acquisition_v3";
const sessionInactivityMs = 30 * 60 * 1000;
const maximumContextHistory = 8;
const handoffParameter = "vg_acq";
const handoffMaximumBytes = 2_048;
const handoffMaximumAgeMs = 30 * 60 * 1000;
const handoffMaximumClockSkewMs = 5 * 60 * 1000;

interface StoredAcquisitionState {
  readonly acquisitionSessionId: string;
  readonly arrivalId: string;
  readonly contextHashes: readonly string[];
  readonly envelope: string;
  readonly lastActivityAt: number;
  readonly schema: 1;
}

interface ReadArrival {
  readonly event: AcquisitionArrivalEvent;
  readonly state: StoredAcquisitionState;
}

export interface AcquisitionCaptureOptions {
  readonly now?: number;
  readonly placementGoverned?: boolean;
  readonly send: (event: AcquisitionArrivalEvent) => void;
}

export type AcquisitionArrivalInitialization = Promise<AcquisitionArrivalEvent | null>;

function encode(value: unknown): string {
  return JSON.stringify(value);
}

function readStoredState(): StoredAcquisitionState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (typeof value !== "object" || value === null) return null;
    const candidate = value as Partial<StoredAcquisitionState>;
    if (
      candidate.schema !== 1 ||
      !isUuidV4(candidate.acquisitionSessionId ?? "") ||
      !isUuidV4(candidate.arrivalId ?? "") ||
      typeof candidate.lastActivityAt !== "number" ||
      !Array.isArray(candidate.contextHashes) ||
      typeof candidate.envelope !== "string"
    ) {
      return null;
    }

    const parsedEvent = acquisitionArrivalEventSchema.safeParse(JSON.parse(candidate.envelope));
    if (!parsedEvent.success) return null;
    const event = parsedEvent.data;
    if (
      event.arrival_id !== candidate.arrivalId ||
      event.acquisition_session_id !== candidate.acquisitionSessionId
    ) {
      return null;
    }
    return {
      acquisitionSessionId: candidate.acquisitionSessionId,
      arrivalId: candidate.arrivalId,
      contextHashes: candidate.contextHashes.filter(
        (hash): hash is string => typeof hash === "string" && /^[0-9a-f]{64}$/.test(hash),
      ),
      envelope: candidate.envelope,
      lastActivityAt: candidate.lastActivityAt,
      schema: 1,
    };
  } catch {
    return null;
  }
}

function saveStoredState(state: StoredAcquisitionState): void {
  try {
    window.localStorage.setItem(storageKey, encode(state));
  } catch (error) {
    if (trackingConfig.debug) {
      console.warn("[tracking:acquisition] storage unavailable", error);
    }
  }
}

async function sha256(value: unknown): Promise<string> {
  const bytes = new TextEncoder().encode(encode(canonicalize(value)));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)]
    .map((byte): string => byte.toString(16).padStart(2, "0"))
    .join("");
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value === null || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]): number => left.localeCompare(right))
      .map(([key, nested]): [string, unknown] => [key, canonicalize(nested)]),
  );
}

const clickIdentifiers: ReadonlySet<AcquisitionParameterName> = new Set([
  "fbclid",
  "gbraid",
  "gclid",
  "msclkid",
  "ttclid",
  "wbraid",
]);

function explicitValues(
  parameters: AcquisitionParameters,
  vtLink: AcquisitionParameterState,
): Record<AcquisitionParameterName | "vt_link", string | null> {
  const values = Object.fromEntries(
    acquisitionParameterNames.map((name): [AcquisitionParameterName, string | null] => [
      name,
      !clickIdentifiers.has(name) && parameters[name]?.state === "present"
        ? (parameters[name]?.canonicalValue ?? null)
        : null,
    ]),
  ) as Record<AcquisitionParameterName | "vt_link", string | null>;
  values.vt_link = vtLink.state === "present" ? vtLink.canonicalValue : null;
  return values;
}

type ContinuityHandoffLimitation =
  | "continuity_handoff_absent"
  | "continuity_handoff_invalid"
  | "continuity_handoff_expired";

type OwnedAcquisitionHandoffRead =
  | { readonly state: "provided"; readonly transported: NonNullable<AcquisitionArrivalEvent["payload"]["transported"]> }
  | { readonly state: "invalid"; readonly limitation: ContinuityHandoffLimitation };

interface OwnedAcquisitionHandoffEnvelope {
  readonly carriedFrom: {
    readonly occurredAt: string;
    readonly origin: string;
    readonly path: string;
  };
  readonly contextSha256: string;
  readonly jid: string;
  readonly origin: string;
  readonly parameters: AcquisitionParameters;
  readonly v: 1;
}

function exactRecord(value: unknown, keys: readonly string[]): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value) &&
    Object.keys(value).length === keys.length && keys.every((key): boolean => Object.hasOwn(value, key));
}

function safeHandoffValue(value: string): boolean {
  return /^[A-Za-z0-9._~-]{1,128}$/.test(value) && !containsEvidentPii(value);
}

function isHandoffParameterState(value: unknown): value is AcquisitionParameterState {
  if (exactRecord(value, ["state"]) && value.state === "absent") return true;
  if (exactRecord(value, ["state", "occurrences"]) && value.state === "empty" &&
    typeof value.occurrences === "number" && Number.isInteger(value.occurrences) && value.occurrences > 0) return true;
  if (exactRecord(value, ["state", "occurrences", "canonicalValue"]) && value.state === "present" &&
    Array.isArray(value.occurrences) && value.occurrences.every((occurrence): boolean => typeof occurrence === "string" && safeHandoffValue(occurrence)) &&
    typeof value.canonicalValue === "string" && safeHandoffValue(value.canonicalValue) &&
    new Set(value.occurrences).size === 1 && value.occurrences[0] === value.canonicalValue) return true;
  if (exactRecord(value, ["state", "occurrences", "distinctCanonicalValues"]) && value.state === "ambiguous" &&
    Array.isArray(value.occurrences) && value.occurrences.every((occurrence): boolean => typeof occurrence === "string" && safeHandoffValue(occurrence)) &&
    Array.isArray(value.distinctCanonicalValues) && value.distinctCanonicalValues.every((occurrence): boolean => typeof occurrence === "string" && safeHandoffValue(occurrence))) return true;
  if (exactRecord(value, ["state", "occurrenceCount", "safeOccurrences", "redactedOccurrenceCount", "reason"]) &&
    value.state === "invalid" && typeof value.occurrenceCount === "number" && Number.isInteger(value.occurrenceCount) && value.occurrenceCount > 0 &&
    Array.isArray(value.safeOccurrences) && value.safeOccurrences.every((occurrence): boolean => typeof occurrence === "string" && safeHandoffValue(occurrence)) &&
    typeof value.redactedOccurrenceCount === "number" && Number.isInteger(value.redactedOccurrenceCount) && value.redactedOccurrenceCount >= 0 &&
    typeof value.reason === "string" && ["schema", "evident_pii", "not_allowed"].includes(value.reason)) return true;
  return false;
}

function isHandoffParameters(value: unknown): value is AcquisitionParameters {
  return typeof value === "object" && value !== null && !Array.isArray(value) &&
    Object.entries(value).every(([name, state]): boolean =>
      (acquisitionParameterNames as readonly string[]).includes(name) && isHandoffParameterState(state));
}

function encodeBase64Url(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function decodeBase64Url(value: string): string {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (character): number => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function readOwnedAcquisitionHandoff(input: {
  readonly currentOrigin: string;
  readonly now: number;
}): Promise<OwnedAcquisitionHandoffRead> {
  const search = new URLSearchParams(window.location.search);
  const encoded = search.getAll(handoffParameter);
  const journeyIds = search.getAll("jid");
  if (encoded.length === 0 && journeyIds.length === 0) {
    return { state: "invalid", limitation: "continuity_handoff_absent" };
  }
  if (encoded.length !== 1 || journeyIds.length !== 1) {
    return { state: "invalid", limitation: "continuity_handoff_invalid" };
  }
  const identity = getIdentity();
  if (!isUuidV4(journeyIds[0] ?? "") || journeyIds[0] !== identity.journeyId) {
    return { state: "invalid", limitation: "continuity_handoff_invalid" };
  }
  if (encoded[0]?.length === 0 || encoded[0]?.length > 4_096) {
    return { state: "invalid", limitation: "continuity_handoff_invalid" };
  }

  let decoded: unknown;
  try {
    const raw = decodeBase64Url(encoded[0] ?? "");
    if (new TextEncoder().encode(raw).byteLength > handoffMaximumBytes) {
      return { state: "invalid", limitation: "continuity_handoff_invalid" };
    }
    decoded = JSON.parse(raw);
  } catch {
    return { state: "invalid", limitation: "continuity_handoff_invalid" };
  }
  if (
    !exactRecord(decoded, ["v", "jid", "origin", "parameters", "carriedFrom", "contextSha256"]) ||
    decoded.v !== 1 ||
    decoded.jid !== identity.journeyId ||
    typeof decoded.origin !== "string" ||
    !isOwnOrigin(decoded.origin) ||
    decoded.origin === input.currentOrigin ||
    !isHandoffParameters(decoded.parameters) ||
    !exactRecord(decoded.carriedFrom, ["origin", "path", "occurredAt"]) ||
    decoded.carriedFrom.origin !== decoded.origin ||
    typeof decoded.carriedFrom.path !== "string" ||
    !/^\/[A-Za-z0-9._~/-]{0,512}$/.test(decoded.carriedFrom.path) ||
    containsEvidentPii(decoded.carriedFrom.path) ||
    typeof decoded.carriedFrom.occurredAt !== "string" ||
    typeof decoded.contextSha256 !== "string" ||
    !/^[0-9a-f]{64}$/.test(decoded.contextSha256)
  ) {
    return { state: "invalid", limitation: "continuity_handoff_invalid" };
  }

  const occurredAt = Date.parse(decoded.carriedFrom.occurredAt);
  if (!Number.isFinite(occurredAt) || occurredAt > input.now + handoffMaximumClockSkewMs ||
    input.now - occurredAt > handoffMaximumAgeMs) {
    return { state: "invalid", limitation: "continuity_handoff_expired" };
  }
  const contextSha256 = await sha256(explicitValues(decoded.parameters, { state: "absent" }));
  if (contextSha256 !== decoded.contextSha256) {
    return { state: "invalid", limitation: "continuity_handoff_invalid" };
  }
  return {
    state: "provided",
    transported: {
      carriedFrom: {
        occurredAt: decoded.carriedFrom.occurredAt,
        origin: decoded.origin,
        path: decoded.carriedFrom.path,
      },
      contextSha256,
      parameters: decoded.parameters,
      provenance: "internal_navigation",
    },
  };
}

function readOccurrences(name: string): readonly string[] {
  if (typeof window === "undefined") return [];
  return new URLSearchParams(window.location.search).getAll(name);
}

function readParameters(placementGoverned: boolean): AcquisitionParameters {
  return Object.fromEntries(
    acquisitionParameterNames
      .filter((name): boolean => name !== "placement" || placementGoverned)
      .map((name): [AcquisitionParameterName, AcquisitionParameterState] => [
        name,
        readAcquisitionParameter(name, readOccurrences(name), placementGoverned),
      ]),
  );
}

function landingPath(): string {
  const path = typeof window === "undefined" ? "/" : window.location.pathname || "/";
  return path.length <= 512 && /^\/(?!\/)[^?#\s]*$/.test(path) ? path : "/";
}

function isOwnOrigin(origin: string): boolean {
  return trackingConfig.ownOrigins.includes(
    origin as (typeof trackingConfig.ownOrigins)[number],
  );
}

function navigationKind(
  referrer: SanitizedReferrer,
  currentOrigin: string,
): AcquisitionNavigationKind {
  if (referrer.state === "present") {
    if (referrer.origin === currentOrigin) return "same_origin_recovery";
    if (isOwnOrigin(referrer.origin)) return "internal_origin";
    return "external_entry";
  }
  return referrer.state === "invalid" ? "unknown" : "external_entry";
}

function captureQuality(storageAvailable: boolean): AcquisitionCaptureQuality {
  const identity = getIdentity();
  const identityAvailable =
    isUuidV4(identity.journeyId) &&
    isUuidV4(identity.sessionId) &&
    isUuidV4(identity.pageViewId);
  const referrer = sanitizeReferrer(typeof document === "undefined" ? null : document.referrer);
  const limitations: AcquisitionCaptureQuality["limitations"][number][] = [];
  if (!identityAvailable) limitations.push("identity_unavailable");
  if (!storageAvailable) limitations.push("storage_unavailable");
  if (referrer.state === "invalid") limitations.push("referrer_unavailable");
  return {
    clockTrusted: true,
    identityAvailable,
    limitations,
    storageAvailable,
  };
}

function localStorageAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem("__vg_acquisition_probe__", "1");
    window.localStorage.removeItem("__vg_acquisition_probe__");
    return true;
  } catch {
    return false;
  }
}

async function createArrival(input: {
  readonly acquisitionSessionId: string;
  readonly contextHashes: readonly string[];
  readonly now: number;
  readonly placementGoverned: boolean;
  readonly previous: ReadArrival | null;
  readonly reason: AcquisitionArrivalEvent["payload"]["arrival_reason"];
}): Promise<AcquisitionArrivalEvent | null> {
  const currentOrigin = window.location.origin;
  const referrer = sanitizeReferrer(document.referrer);
  const parameters = readParameters(input.placementGoverned);
  const vtLink = readVtLinkParameter(readOccurrences("vt_link"));
  const identity = getIdentity();
  let navigation = navigationKind(referrer, currentOrigin);
  const previousEvent = input.previous?.event ?? null;
  const previousObserved = previousEvent?.payload.observed ?? null;
  let transported: AcquisitionArrivalEvent["payload"]["transported"] = null;
  const limitations: AcquisitionCaptureQuality["limitations"][number][] = [];

  if (
    input.reason === "session_expired" &&
    previousEvent !== null &&
    previousObserved !== null &&
    (previousObserved.vtLink.state !== "absent" ||
      Object.values(previousObserved.parameters).some(
        (state): boolean => state.state !== "absent",
      ))
  ) {
    try {
      transported = {
        carriedFrom: {
          occurredAt: previousEvent.occurred_at,
          origin: currentOrigin,
          path: previousEvent.landing_path,
        },
        contextSha256: await sha256(
          explicitValues(previousObserved.parameters, previousObserved.vtLink),
        ),
        parameters: previousObserved.parameters,
        provenance: "same_page_recovery",
      };
      limitations.push("transported_context_unverified");
    } catch {
      transported = null;
      limitations.push("transported_context_unverified");
    }
  }
  if (navigation === "internal_origin") {
    const handoff = await readOwnedAcquisitionHandoff({ currentOrigin: currentOrigin, now: input.now });
    if (handoff.state === "provided") {
      transported = handoff.transported;
      limitations.push("transported_context_unverified");
    } else {
      navigation = "unknown";
      limitations.push(handoff.limitation, "transported_context_unverified");
    }
  }

  const capture = captureQuality(localStorageAvailable());
  const candidate: AcquisitionArrivalEvent = {
    acquisition_session_id: input.acquisitionSessionId,
    arrival_id: uuid(),
    event_id: uuid(),
    event_name: "acquisition_arrival",
    event_version: 3,
    funnel_key: trackingConfig.funnelKey,
    funnel_version: trackingConfig.funnelVersion,
    journey_id: identity.journeyId,
    landing_path: landingPath(),
    occurred_at: new Date(input.now).toISOString(),
    page_view_id: identity.pageViewId,
    payload: {
      arrival_reason: input.reason,
      capture: { ...capture, limitations: [...capture.limitations, ...limitations] },
      navigation: { kind: navigation, referrer },
      observed: { parameters, vtLink },
      traffic: { kind: "production" },
      transported,
    },
    project_id: trackingConfig.projectId,
    session_id: identity.sessionId,
  };
  const parsed = acquisitionArrivalEventSchema.safeParse(candidate);
  if (!parsed.success) {
    if (trackingConfig.debug) {
      console.warn("[tracking:acquisition] invalid arrival");
    }
    return null;
  }
  return parsed.data;
}

async function contextHash(event: AcquisitionArrivalEvent): Promise<string> {
  return sha256(explicitValues(event.payload.observed.parameters, event.payload.observed.vtLink));
}

export async function createOwnedAcquisitionHandoffUrl(
  destination: string,
  now = Date.now(),
): Promise<string> {
  if (!trackingConfig.acquisitionV3Enabled || !trackingConfig.trackingEnabled || typeof window === "undefined") {
    return destination;
  }
  let url: URL;
  try {
    url = new URL(destination, window.location.href);
  } catch {
    return destination;
  }
  if (url.protocol !== "https:" || !isOwnOrigin(url.origin) || !isOwnOrigin(window.location.origin) ||
    url.origin === window.location.origin) {
    return destination;
  }

  const identity = getIdentity();
  if (!isUuidV4(identity.journeyId)) return destination;
  const stored = readStoredState();
  const storedEvent = stored === null
    ? null
    : acquisitionArrivalEventSchema.safeParse(JSON.parse(stored.envelope));
  const observed = storedEvent?.success === true
    ? storedEvent.data.payload.observed
    : {
        parameters: readParameters(false),
        vtLink: readVtLinkParameter(readOccurrences("vt_link")),
      };
  const parameters = Object.fromEntries(
    Object.entries(observed.parameters).filter(([, state]): boolean => state.state !== "absent"),
  ) as AcquisitionParameters;
  const envelope: OwnedAcquisitionHandoffEnvelope = {
    carriedFrom: {
      occurredAt: new Date(now).toISOString(),
      origin: window.location.origin,
      path: landingPath(),
    },
    contextSha256: await sha256(explicitValues(parameters, { state: "absent" })),
    jid: identity.journeyId,
    origin: window.location.origin,
    parameters,
    v: 1,
  };
  const encoded = encodeBase64Url(encode(envelope));
  if (new TextEncoder().encode(decodeBase64Url(encoded)).byteLength > handoffMaximumBytes) {
    return destination;
  }
  url.searchParams.set("jid", identity.journeyId);
  url.searchParams.set(handoffParameter, encoded);
  return url.toString();
}

const activityBound = new WeakSet<object>();
let activeInitialization: AcquisitionArrivalInitialization | null = null;

function bindActivityListeners(): void {
  if (typeof window === "undefined" || activityBound.has(window)) return;
  activityBound.add(window);
  const listener = (): void => signalAcquisitionActivity();
  for (const type of ["keydown", "pointerdown", "scroll", "visibilitychange"]) {
    window.addEventListener(type, listener, { passive: true });
  }
}

export function signalAcquisitionActivity(now: number = Date.now()): void {
  const stored = readStoredState();
  if (stored === null || now - stored.lastActivityAt > sessionInactivityMs) return;
  saveStoredState({ ...stored, lastActivityAt: now });
}

export function initializeAcquisitionCapture(
  options: AcquisitionCaptureOptions,
): AcquisitionArrivalInitialization {
  if (
    !trackingConfig.acquisitionV3Enabled ||
    !trackingConfig.trackingEnabled ||
    typeof window === "undefined"
  ) {
    return Promise.resolve(null);
  }
  if (activeInitialization !== null) return activeInitialization;
  activeInitialization = initializeOnce(options);
  return activeInitialization;
}

async function initializeOnce(
  options: AcquisitionCaptureOptions,
): Promise<AcquisitionArrivalEvent | null> {
  bindActivityListeners();
  const now = options.now ?? Date.now();
  const stored = readStoredState();
  const referrer = sanitizeReferrer(document.referrer);
  const storedIsActive = stored !== null && now - stored.lastActivityAt <= sessionInactivityMs;
  const isSameOriginRecovery =
    referrer.state === "present" && referrer.origin === window.location.origin;

  if (stored !== null && storedIsActive) {
    const reused = acquisitionArrivalEventSchema.safeParse(JSON.parse(stored.envelope));
    if (reused.success) {
      const currentParameters = readParameters(options.placementGoverned === true);
      const currentVtLink = readVtLinkParameter(readOccurrences("vt_link"));
      const currentHash = await sha256(explicitValues(currentParameters, currentVtLink));
      const hasSameExplicitContext = stored.contextHashes.at(-1) === currentHash;

      if (isSameOriginRecovery || hasSameExplicitContext) {
        signalAcquisitionActivity(now);
        options.send(reused.data);
        return reused.data;
      }

      const reason: AcquisitionArrivalEvent["payload"]["arrival_reason"] =
        stored.contextHashes.includes(currentHash) ? "returning_campaign" : "context_change";
      const contextChanged = await createArrival({
        acquisitionSessionId: stored.acquisitionSessionId,
        contextHashes: stored.contextHashes,
        now,
        placementGoverned: options.placementGoverned === true,
        previous: { event: reused.data, state: stored },
        reason,
      });
      if (contextChanged === null) return null;
      const changedHash = await contextHash(contextChanged);
      saveStoredState({
        acquisitionSessionId: stored.acquisitionSessionId,
        arrivalId: contextChanged.arrival_id,
        contextHashes: [
          ...stored.contextHashes.slice(-(maximumContextHistory - 1)),
          changedHash,
        ],
        envelope: encode(contextChanged),
        lastActivityAt: now,
        schema: 1,
      });
      options.send(contextChanged);
      return contextChanged;
    }
  }

  const expired = stored !== null;
  const acquisitionSessionId = uuid();
  let previous: ReadArrival | null = null;
  if (stored !== null) {
    const previousParsed = acquisitionArrivalEventSchema.safeParse(JSON.parse(stored.envelope));
    if (!previousParsed.success) return null;
    previous = { event: previousParsed.data, state: stored };
  }
  const arrival = await createArrival({
    acquisitionSessionId,
    contextHashes: stored?.contextHashes ?? [],
    now,
    placementGoverned: options.placementGoverned === true,
    previous,
    reason: expired ? "session_expired" : "initial",
  });
  if (arrival === null) return null;

  const hash = await contextHash(arrival);
  saveStoredState({
    acquisitionSessionId,
    arrivalId: arrival.arrival_id,
    contextHashes: [...(stored?.contextHashes ?? []).slice(-(maximumContextHistory - 1)), hash],
    envelope: encode(arrival),
    lastActivityAt: now,
    schema: 1,
  });
  options.send(arrival);
  return arrival;
}
