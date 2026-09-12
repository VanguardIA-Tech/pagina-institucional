import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AcquisitionArrivalEvent } from "../src/lib/tracking/acquisition-contract";

const configMock = vi.hoisted(() => ({
  debug: false,
  endpoint: "https://tracking.example.test/api/v1/collect/events",
  projectId: "vanguardiagrupo",
  trackingEnabled: true,
  transportTimeoutMs: 2_000,
}));

vi.mock("../src/lib/tracking/config", () => ({ trackingConfig: configMock }));

import { sendAcquisitionArrival, transportStatus } from "../src/lib/tracking/acquisition-bus";

const event: AcquisitionArrivalEvent = {
  acquisition_session_id: "22a51f7d-4313-4d4f-9680-3364244061e6",
  arrival_id: "11a51f7d-4313-4d4f-9680-3364244061e6",
  event_id: "18a51f7d-4313-4d4f-9680-3364244061e6",
  event_name: "acquisition_arrival",
  event_version: 3,
  funnel_key: "vanguardiagrupo",
  funnel_version: 1,
  journey_id: "3e3ce61f-4bfd-489b-8ca4-07f88e642ac5",
  landing_path: "/",
  occurred_at: "2026-08-31T18:30:00.000-03:00",
  page_view_id: "9c75ec83-2b98-4999-bf0a-69c288450e37",
  project_id: "vanguardiagrupo",
  session_id: "8f9d2377-b2e8-466b-b4f3-1416df8f0543",
  payload: {
    arrival_reason: "initial",
    capture: { clockTrusted: true, identityAvailable: true, limitations: [], storageAvailable: true },
    navigation: { kind: "external_entry", referrer: { state: "absent" } },
    observed: { parameters: {}, vtLink: { state: "absent" } },
    traffic: { kind: "production" },
    transported: null,
  },
};

beforeEach((): void => {
  vi.useFakeTimers();
  configMock.trackingEnabled = true;
  transportStatus.lastStatus = "idle";
  transportStatus.requestsStarted = 0;
  transportStatus.retriesStarted = 0;
});

afterEach((): void => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("institutional acquisition transport", (): void => {
  it("posts immutable JSON without credentials", async (): Promise<void> => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 202 }));
    vi.stubGlobal("fetch", fetchMock);
    sendAcquisitionArrival(event);
    await vi.runAllTimersAsync();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe(configMock.endpoint);
    expect(init).toMatchObject({ credentials: "omit", keepalive: true, method: "POST" });
    expect(JSON.parse(init.body as string).event_id).toBe(event.event_id);
    expect(transportStatus.lastStatus).toBe("ok");
  });

  it("retries one transient failure with the exact same body", async (): Promise<void> => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 503 }))
      .mockResolvedValueOnce(new Response(null, { status: 202 }));
    vi.stubGlobal("fetch", fetchMock);
    sendAcquisitionArrival(event);
    await vi.runAllTimersAsync();

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1]![1].body).toBe(fetchMock.mock.calls[0]![1].body);
    expect(transportStatus.retriesStarted).toBe(1);
  });

  it("does not retry definitive errors or send disabled", async (): Promise<void> => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 422 }));
    vi.stubGlobal("fetch", fetchMock);
    sendAcquisitionArrival(event);
    await vi.runAllTimersAsync();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    configMock.trackingEnabled = false;
    sendAcquisitionArrival(event);
    await vi.runAllTimersAsync();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(transportStatus.lastStatus).toBe("noop");
  });
});
