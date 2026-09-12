const journeyKey = "vg_journey_id";
const journeyTimestampKey = "vg_journey_timestamp";
const sessionKey = "vg_session_id";
const journeyTtlMs = 180 * 24 * 60 * 60 * 1000;
const uuidV4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

interface KeyValueStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface TrackingIdentity {
  readonly journeyId: string;
  readonly journeyIsNew: boolean;
  readonly pageViewId: string;
  readonly sessionId: string;
  readonly storageAvailable: boolean;
}

export function isUuidV4(value: string): boolean {
  return uuidV4Pattern.test(value);
}

export function uuid(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  } catch {
    return fallbackUuid();
  }
  return fallbackUuid();
}

function fallbackUuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (character: string): string => {
    const random = Math.floor(Math.random() * 16);
    const value = character === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

const memoryStore = new Map<string, string>();
const memoryKeyValueStore: KeyValueStore = {
  getItem: (key: string): string | null => memoryStore.get(key) ?? null,
  setItem: (key: string, value: string): void => void memoryStore.set(key, value),
};

function safeKeyValueStore(kind: "local" | "session"): KeyValueStore {
  try {
    const storage = kind === "local" ? window.localStorage : window.sessionStorage;
    const probeKey = "__vg_probe__";
    storage.setItem(probeKey, "1");
    storage.removeItem(probeKey);
    return storage;
  } catch {
    return memoryKeyValueStore;
  }
}

function incomingJourneyId(): string | null {
  try {
    const value = new URLSearchParams(window.location.search).get("jid");
    return value !== null && isUuidV4(value) ? value : null;
  } catch {
    return null;
  }
}

function storedJourneyId(store: KeyValueStore): string | null {
  const stored = store.getItem(journeyKey);
  const storedTimestamp = Number(store.getItem(journeyTimestampKey) ?? "0");
  const expired = storedTimestamp > 0 && Date.now() - storedTimestamp > journeyTtlMs;
  return stored !== null && !expired && isUuidV4(stored) ? stored : null;
}

let cachedIdentity: TrackingIdentity | null = null;

export function getIdentity(): TrackingIdentity {
  if (cachedIdentity !== null) return cachedIdentity;
  if (typeof window === "undefined") {
    return {
      journeyId: uuid(),
      journeyIsNew: false,
      pageViewId: uuid(),
      sessionId: uuid(),
      storageAvailable: false,
    };
  }

  const localStore = safeKeyValueStore("local");
  const sessionStore = safeKeyValueStore("session");
  const incomingJourney = incomingJourneyId();
  const storedJourney = storedJourneyId(localStore);
  const journeyId = incomingJourney ?? storedJourney ?? uuid();
  const storedSession = sessionStore.getItem(sessionKey);

  localStore.setItem(journeyKey, journeyId);
  localStore.setItem(journeyTimestampKey, String(Date.now()));
  const sessionId = storedSession !== null && isUuidV4(storedSession) ? storedSession : uuid();
  if (sessionId !== storedSession) sessionStore.setItem(sessionKey, sessionId);

  cachedIdentity = {
    journeyId,
    journeyIsNew: storedJourney === null && incomingJourney === null,
    pageViewId: uuid(),
    sessionId,
    storageAvailable: localStore !== memoryKeyValueStore,
  };
  return cachedIdentity;
}
