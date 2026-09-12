import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AcquisitionArrivalEvent } from "../src/lib/tracking/acquisition-contract";
import { isUuidV4 } from "../src/lib/tracking/identity";

const configMock = vi.hoisted(() => ({
  acquisitionV3Enabled: true,
  debug: false,
  endpoint: "https://tracking.example.test/api/v1/collect/events",
  funnelKey: "vanguardiagrupo",
  funnelVersion: 1,
  ownOrigins: [
    "https://doithub.com.br",
    "https://vanguardia.com.br",
    "https://vsl.vanguardiagrupo.com.br",
    "https://vanguardiagrupo.com.br",
  ],
  projectId: "vanguardiagrupo",
  trackingEnabled: true,
}));

vi.mock("../src/lib/tracking/config", () => ({ trackingConfig: configMock }));

interface TestStorage {
  getItem: (key: string) => string | null;
  removeItem: (key: string) => void;
  setItem: (key: string, value: string) => void;
  values: Map<string, string>;
}

function createStorage(broken = false): TestStorage {
  const values = new Map<string, string>();
  const fail = (): never => {
    throw new Error("storage unavailable");
  };
  return {
    getItem: broken ? fail : (key: string): string | null => values.get(key) ?? null,
    removeItem: broken ? fail : (key: string): void => void values.delete(key),
    setItem: broken
      ? fail
      : (key: string, value: string): void => void values.set(key, value),
    values,
  };
}

function setupWindow(input: {
  brokenStorage?: boolean;
  origin?: string;
  persistentStorage?: TestStorage;
  referrer?: string;
  search?: string;
}): { listeners: Map<string, Set<EventListener>>; localStorage: TestStorage } {
  const origin = input.origin ?? "https://vanguardia.example.test";
  const localStorage = input.persistentStorage ?? createStorage(input.brokenStorage);
  const listeners = new Map<string, Set<EventListener>>();
  vi.stubGlobal("window", {
    addEventListener: (type: string, listener: EventListener): void => {
      const group = listeners.get(type) ?? new Set<EventListener>();
      group.add(listener);
      listeners.set(type, group);
    },
    location: {
      href: `${origin}/${input.search ?? ""}`,
      origin,
      pathname: "/",
      search: input.search ?? "",
    },
    localStorage,
    sessionStorage: createStorage(),
  });
  vi.stubGlobal("document", { referrer: input.referrer ?? "" });
  return { listeners, localStorage };
}

async function initialize(
  sent: AcquisitionArrivalEvent[],
  now = 0,
): Promise<AcquisitionArrivalEvent | null> {
  const { initializeAcquisitionCapture } = await import("../src/lib/tracking/acquisition");
  return initializeAcquisitionCapture({
    now,
    send: (event: AcquisitionArrivalEvent): void => void sent.push(event),
  });
}

beforeEach((): void => {
  vi.resetModules();
  vi.useFakeTimers();
  vi.setSystemTime(0);
  configMock.acquisitionV3Enabled = true;
  configMock.trackingEnabled = true;
});

afterEach((): void => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("institutional acquisition state", (): void => {
  it("reuses an immutable arrival on reload and concurrent init", async (): Promise<void> => {
    const { localStorage } = setupWindow({ search: "?utm_source=a&utm_source=a&gclid=abc" });
    const sent: AcquisitionArrivalEvent[] = [];
    const first = await initialize(sent);
    const second = await initialize(sent);

    expect(first).toEqual(second);
    expect(first?.project_id).toBe("vanguardiagrupo");
    expect(first?.funnel_key).toBe("vanguardiagrupo");
    expect(first?.arrival_id).not.toBe(first?.event_id);
    expect(first?.acquisition_session_id).not.toBe(first?.journey_id);
    expect(first?.payload.observed.parameters.utm_source).toEqual({
      canonicalValue: "a",
      occurrences: ["a", "a"],
      state: "present",
    });
    expect(first?.payload.observed.parameters.gclid).toEqual({
      canonicalValue: "abc",
      occurrences: ["abc"],
      state: "present",
    });
    expect(sent).toHaveLength(1);

    vi.resetModules();
    setupWindow({
      persistentStorage: localStorage,
      referrer: "https://vanguardia.example.test/other",
    });
    const sentReload: AcquisitionArrivalEvent[] = [];
    await expect(initialize(sentReload)).resolves.toEqual(first);
    expect(sentReload).toHaveLength(1);
    expect(localStorage.values.get("vg_acquisition_v3")).toContain(first?.arrival_id);
  });

  it("keeps own-origin continuity and creates context changes explicitly", async (): Promise<void> => {
    const { localStorage } = setupWindow({ search: "?utm_campaign=a" });
    const sentFirst: AcquisitionArrivalEvent[] = [];
    const first = await initialize(sentFirst);

    vi.resetModules();
    setupWindow({
      persistentStorage: localStorage,
      referrer: "https://vanguardia.com.br/icia-gov",
      search: "?utm_campaign=b",
    });
    const sentInternal: AcquisitionArrivalEvent[] = [];
    const internal = await initialize(sentInternal);
    expect(internal?.payload.arrival_reason).toBe("context_change");
    expect(internal?.payload.navigation.kind).toBe("unknown");
    expect(internal?.payload.observed.parameters.utm_campaign).toMatchObject({ canonicalValue: "b" });
    expect(sentInternal).toHaveLength(1);

    vi.resetModules();
    setupWindow({
      persistentStorage: localStorage,
      referrer: "https://ads.example.test/x",
      search: "?utm_campaign=c",
    });
    const sentChanged: AcquisitionArrivalEvent[] = [];
    const changed = await initialize(sentChanged);
    expect(changed?.payload.arrival_reason).toBe("context_change");
    expect(changed?.payload.navigation.kind).toBe("external_entry");
    expect(changed?.acquisition_session_id).toBe(first?.acquisition_session_id);
  });

  it("restores a DO IT handoff without turning carried UTMs into observed UTMs", async (): Promise<void> => {
    setupWindow({
      origin: "https://doithub.com.br",
      search: "?utm_campaign=campaign-old",
    });
    const { createOwnedAcquisitionHandoffUrl } = await import("../src/lib/tracking/acquisition");
    const destinationUrl = new URL(
      await createOwnedAcquisitionHandoffUrl("https://vanguardiagrupo.com.br/?utm_campaign=campaign-new"),
    );
    expect(destinationUrl.searchParams.getAll("utm_campaign")).toEqual(["campaign-new"]);

    vi.resetModules();
    const { localStorage: destinationStorage } = setupWindow({
      origin: "https://vanguardiagrupo.com.br",
      referrer: "https://doithub.com.br/",
      search: destinationUrl.search,
    });
    const sent: AcquisitionArrivalEvent[] = [];
    const arrival = await initialize(sent);
    expect(arrival?.payload.navigation.kind).toBe("internal_origin");
    expect(arrival?.payload.observed.parameters.utm_campaign).toMatchObject({ canonicalValue: "campaign-new" });
    expect(arrival?.payload.transported?.parameters.utm_campaign).toMatchObject({ canonicalValue: "campaign-old" });
    expect(arrival?.payload.capture.limitations).toContain("transported_context_unverified");

    vi.resetModules();
    setupWindow({
      origin: "https://vanguardiagrupo.com.br",
      referrer: "https://vanguardiagrupo.com.br/",
      search: destinationUrl.search,
      persistentStorage: destinationStorage,
    });
    const reloadSent: AcquisitionArrivalEvent[] = [];
    await expect(initialize(reloadSent)).resolves.toEqual(arrival);
    expect(reloadSent).toHaveLength(1);
  });

  it("does not trust a foreign handoff claim or a referrer without handoff", async (): Promise<void> => {
    setupWindow({
      origin: "https://doithub.com.br",
      search: "?utm_campaign=campaign-old",
    });
    const { createOwnedAcquisitionHandoffUrl } = await import("../src/lib/tracking/acquisition");
    const destinationUrl = new URL(await createOwnedAcquisitionHandoffUrl("https://vanguardiagrupo.com.br/"));

    vi.resetModules();
    setupWindow({
      origin: "https://vanguardiagrupo.com.br",
      referrer: "https://foreign.example.test/",
      search: destinationUrl.search,
    });
    const foreignSent: AcquisitionArrivalEvent[] = [];
    const foreign = await initialize(foreignSent);
    expect(foreign?.payload.navigation.kind).toBe("external_entry");
    expect(foreign?.payload.transported).toBeNull();
    expect(foreign?.payload.capture.limitations).not.toContain("continuity_handoff_absent");

    vi.resetModules();
    setupWindow({
      origin: "https://vanguardiagrupo.com.br",
      referrer: "https://doithub.com.br/",
      search: "?utm_campaign=campaign-new",
    });
    const absentSent: AcquisitionArrivalEvent[] = [];
    const absent = await initialize(absentSent);
    expect(absent?.payload.navigation.kind).toBe("unknown");
    expect(absent?.payload.transported).toBeNull();
    expect(absent?.payload.capture.limitations).toContain("continuity_handoff_absent");
  });

  it("opens a new acquisition session after 30 minutes and transports prior context", async (): Promise<void> => {
    const { localStorage } = setupWindow({ search: "?utm_campaign=a" });
    const sentFirst: AcquisitionArrivalEvent[] = [];
    const first = await initialize(sentFirst);

    vi.resetModules();
    setupWindow({
      persistentStorage: localStorage,
      referrer: "https://vanguardia.example.test/",
    });
    const sentExpired: AcquisitionArrivalEvent[] = [];
    const expired = await initialize(sentExpired, 31 * 60 * 1000);
    expect(expired?.payload.arrival_reason).toBe("session_expired");
    expect(expired?.acquisition_session_id).not.toBe(first?.acquisition_session_id);
    expect(expired?.payload.transported?.parameters.utm_campaign).toEqual(
      first?.payload.observed.parameters.utm_campaign,
    );
    expect(expired?.payload.capture.limitations).toContain("transported_context_unverified");
  });

  it("refreshes activity and remains off by flag", async (): Promise<void> => {
    const { listeners, localStorage } = setupWindow({ search: "?utm_campaign=a" });
    const sent: AcquisitionArrivalEvent[] = [];
    const first = await initialize(sent);
    const { signalAcquisitionActivity } = await import("../src/lib/tracking/acquisition");
    signalAcquisitionActivity(10 * 60 * 1000);

    vi.resetModules();
    setupWindow({
      persistentStorage: localStorage,
      referrer: "https://vanguardia.example.test/",
    });
    const sentAfterActivity: AcquisitionArrivalEvent[] = [];
    const afterActivity = await initialize(sentAfterActivity, 35 * 60 * 1000);
    expect(afterActivity).toEqual(first);
    expect(listeners.get("pointerdown")?.size).toBe(1);

    vi.resetModules();
    configMock.acquisitionV3Enabled = false;
    setupWindow({ search: "?utm_source=b" });
    const sentDisabled: AcquisitionArrivalEvent[] = [];
    await expect(initialize(sentDisabled)).resolves.toBeNull();
    expect(sentDisabled).toHaveLength(0);
  });

  it("keeps independent opaque identifiers", async (): Promise<void> => {
    setupWindow({ search: "?utm_source=a" });
    const sent: AcquisitionArrivalEvent[] = [];
    const arrival = await initialize(sent);
    const identifiers = [
      arrival?.acquisition_session_id,
      arrival?.arrival_id,
      arrival?.event_id,
      arrival?.journey_id,
      arrival?.page_view_id,
      arrival?.session_id,
    ];
    expect(identifiers.every((identifier): boolean => isUuidV4(identifier ?? ""))).toBe(true);
    expect(new Set(identifiers).size).toBe(6);
  });
});
