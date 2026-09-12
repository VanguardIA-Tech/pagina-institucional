import { describe, expect, it } from "vitest";
import { resolveTrackingConfig, trackingConfig } from "../src/lib/tracking/config";

describe("first-party tracking configuration", (): void => {
  it("keeps acquisition v3 and tracking disabled by default", (): void => {
    expect(resolveTrackingConfig({})).toEqual(
      expect.objectContaining({
        acquisitionV3Enabled: false,
        debug: false,
        endpoint: "https://tracking.vanguardiagrupo.com.br/api/v1/collect/events",
        funnelKey: "vanguardiagrupo",
        funnelVersion: 1,
        ownOrigins: [
          "https://doithub.com.br",
          "https://vanguardia.com.br",
          "https://vsl.vanguardiagrupo.com.br",
          "https://vanguardiagrupo.com.br",
        ],
        projectId: "vanguardiagrupo",
        trackingEnabled: false,
        transportTimeoutMs: 2_000,
      }),
    );
  });

  it("enables the exact authorized collector project and endpoint", (): void => {
    expect(
      resolveTrackingConfig({
        VITE_ACQUISITION_V3_ENABLED: "true",
        VITE_TRACKING_ENABLED: "true",
        VITE_TRACKING_ENDPOINT: "https://tracking.vanguardiagrupo.com.br/api/v1/collect/events",
        VITE_TRACKING_PROJECT_ID: "vanguardiagrupo",
      }),
    ).toEqual(
      expect.objectContaining({
        acquisitionV3Enabled: true,
        endpoint: "https://tracking.vanguardiagrupo.com.br/api/v1/collect/events",
        projectId: "vanguardiagrupo",
        trackingEnabled: true,
      }),
    );
  });

  it("requires tracking before acquisition and rejects unknown bindings", (): void => {
    const trackingOff = resolveTrackingConfig({
      VITE_ACQUISITION_V3_ENABLED: "true",
      VITE_TRACKING_ENABLED: "false",
      VITE_TRACKING_PROJECT_ID: "vanguardiagrupo",
    });
    expect(trackingOff.trackingEnabled).toBe(false);
    expect(trackingOff.acquisitionV3Enabled).toBe(false);

    const unknown = resolveTrackingConfig({
      VITE_TRACKING_ENABLED: "true",
      VITE_TRACKING_ENDPOINT: "https://tracking.example.test/events",
      VITE_TRACKING_PROJECT_ID: "vanguardia_vsl",
    });
    expect(unknown.endpoint).toBe("");
    expect(unknown.projectId).toBe("");
    expect(unknown.trackingEnabled).toBe(false);
    expect(unknown.acquisitionV3Enabled).toBe(false);
  });

  it("uses the resolved institutional defaults in the app boundary", (): void => {
    expect(trackingConfig.acquisitionV3Enabled).toBe(false);
    expect(trackingConfig.trackingEnabled).toBe(false);
    expect(trackingConfig.projectId).toBe("vanguardiagrupo");
  });
});
