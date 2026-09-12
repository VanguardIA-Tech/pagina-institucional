import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const configMock = vi.hoisted(() => ({
  acquisitionV3Enabled: true,
  debug: false,
  endpoint: "https://tracking.example.test/api/v1/collect/events",
  projectId: "vanguardiagrupo",
  trackingEnabled: true,
}));
const sendAcquisitionArrival = vi.hoisted(() => vi.fn());

vi.mock("../src/lib/tracking/config", () => ({ trackingConfig: configMock }));
vi.mock("../src/lib/tracking/acquisition", () => ({
  initializeAcquisitionCapture: vi.fn(),
}));
vi.mock("../src/lib/tracking/acquisition-bus", () => ({ sendAcquisitionArrival }));

beforeEach((): void => {
  sendAcquisitionArrival.mockReset();
  configMock.acquisitionV3Enabled = true;
  configMock.trackingEnabled = true;
});

afterEach((): void => {
  vi.unstubAllGlobals();
});

describe("institutional acquisition boundary", (): void => {
  it("starts once and routes through the acquisition bus", async (): Promise<void> => {
    vi.stubGlobal("window", { addEventListener: (): void => undefined });
    vi.resetModules();
    const boundary = await import("../src/lib/tracking/boundary");
    const acquisition = await import("../src/lib/tracking/acquisition");
    const initialize = acquisition.initializeAcquisitionCapture as ReturnType<typeof vi.fn>;
    initialize.mockResolvedValue(null);

    const first = boundary.initializeAcquisitionBoundary();
    const second = boundary.initializeAcquisitionBoundary();
    expect(first).toBe(second);
    expect(initialize).toHaveBeenCalledTimes(1);
    expect(initialize.mock.calls[0]![0].send).toBe(sendAcquisitionArrival);
    await first;
  });

  it("does not start when tracking or acquisition is disabled", async (): Promise<void> => {
    configMock.acquisitionV3Enabled = false;
    vi.resetModules();
    const boundary = await import("../src/lib/tracking/boundary");
    await expect(boundary.initializeAcquisitionBoundary()).resolves.toBeNull();
  });
});
