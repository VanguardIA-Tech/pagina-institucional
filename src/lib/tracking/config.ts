export interface TrackingConfig {
  readonly acquisitionV3Enabled: boolean;
  readonly debug: boolean;
  readonly endpoint: string;
  readonly funnelKey: "vanguardiagrupo";
  readonly funnelVersion: 1;
  readonly projectId: "vanguardiagrupo" | "";
  readonly ownOrigins: readonly [
    "https://doithub.com.br",
    "https://vanguardia.com.br",
    "https://vsl.vanguardiagrupo.com.br",
    "https://vanguardiagrupo.com.br",
  ];
  readonly trackingEnabled: boolean;
  readonly transportTimeoutMs: number;
}

export interface TrackingEnvironment {
  readonly VITE_ACQUISITION_V3_ENABLED?: string | boolean;
  readonly VITE_TRACKING_ENABLED?: string | boolean;
  readonly VITE_TRACKING_ENDPOINT?: string;
  readonly VITE_TRACKING_PROJECT_ID?: string;
  readonly VITE_TRACKING_TIMEOUT_MS?: string;
}

const authorizedCollectorOrigin = "https://tracking.vanguardiagrupo.com.br";
const authorizedCollectorPath = "/api/v1/collect/events";
const authorizedProjectId = "vanguardiagrupo";
const authorizedEndpoint = `${authorizedCollectorOrigin}${authorizedCollectorPath}`;
const maximumTransportTimeoutMs = 10_000;
const ownOrigins = [
  "https://doithub.com.br",
  "https://vanguardia.com.br",
  "https://vsl.vanguardiagrupo.com.br",
  "https://vanguardiagrupo.com.br",
] as const;

const viteEnvironment =
  (import.meta as unknown as {
    env?: Record<string, string | boolean | undefined>;
  }).env ?? {};

function configuredCollectorEndpoint(value: string | undefined): string {
  if (!value) return "";
  try {
    const url = new URL(value);
    return url.origin === authorizedCollectorOrigin &&
      url.pathname === authorizedCollectorPath &&
      url.search === "" &&
      url.hash === ""
      ? url.toString()
      : "";
  } catch {
    return "";
  }
}

function configuredTransportTimeout(value: string | undefined): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 && parsed <= maximumTransportTimeoutMs
    ? parsed
    : 2_000;
}

export function resolveTrackingConfig(environment: TrackingEnvironment): TrackingConfig {
  const endpoint = configuredCollectorEndpoint(
    environment.VITE_TRACKING_ENDPOINT ?? authorizedEndpoint,
  );
  const projectId =
    (environment.VITE_TRACKING_PROJECT_ID ?? authorizedProjectId) === authorizedProjectId
      ? authorizedProjectId
      : "";
  const trackingEnabled =
    environment.VITE_TRACKING_ENABLED === true ||
    environment.VITE_TRACKING_ENABLED === "true";
  return {
    acquisitionV3Enabled:
      (environment.VITE_ACQUISITION_V3_ENABLED === true ||
        environment.VITE_ACQUISITION_V3_ENABLED === "true") && trackingEnabled,
    debug: false,
    endpoint,
    funnelKey: "vanguardiagrupo",
    funnelVersion: 1,
    ownOrigins,
    projectId,
    trackingEnabled: trackingEnabled && endpoint !== "" && projectId !== "",
    transportTimeoutMs: configuredTransportTimeout(environment.VITE_TRACKING_TIMEOUT_MS),
  };
}

export const trackingConfig: TrackingConfig = resolveTrackingConfig(viteEnvironment);
