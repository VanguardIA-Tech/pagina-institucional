import type { AcquisitionArrivalEvent } from "./acquisition-contract";
import { trackingConfig } from "./config";

export const maxArrivalBodyBytes = 32 * 1024;
export type AcquisitionTransportStatus = "error" | "idle" | "invalid" | "noop" | "ok";

export const transportStatus = {
  lastStatus: "idle" as AcquisitionTransportStatus,
  requestsStarted: 0,
  retriesStarted: 0,
};

interface ArrivalCandidate {
  readonly body: string;
}

function byteLength(value: string): number {
  return new TextEncoder().encode(value).byteLength;
}

function arrivalCandidate(event: AcquisitionArrivalEvent): ArrivalCandidate | null {
  const body = JSON.stringify(event);
  if (byteLength(body) > maxArrivalBodyBytes) {
    transportStatus.lastStatus = "invalid";
    return null;
  }
  return { body };
}

function retryableStatus(status: number): boolean {
  return status === 408 || status === 429 || status >= 500;
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve: (value: void) => void): void => {
    globalThis.setTimeout(resolve, ms);
  });
}

async function post(body: string): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = globalThis.setTimeout((): void => controller.abort(), trackingConfig.transportTimeoutMs);
  try {
    transportStatus.requestsStarted += 1;
    return await fetch(trackingConfig.endpoint, {
      body,
      credentials: "omit",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      method: "POST",
      signal: controller.signal,
    });
  } finally {
    globalThis.clearTimeout(timeoutId);
  }
}

export function sendAcquisitionArrival(event: AcquisitionArrivalEvent): void {
  if (
    !trackingConfig.trackingEnabled ||
    trackingConfig.endpoint === "" ||
    trackingConfig.projectId === ""
  ) {
    transportStatus.lastStatus = "noop";
    return;
  }

  const candidate = arrivalCandidate(event);
  if (candidate === null) return;
  void (async (): Promise<void> => {
    try {
      const response = await post(candidate.body);
      if (response.ok) {
        transportStatus.lastStatus = "ok";
        return;
      }
      if (!retryableStatus(response.status)) {
        transportStatus.lastStatus = "error";
        return;
      }
      transportStatus.retriesStarted += 1;
      await wait(300);
      const retry = await post(candidate.body);
      transportStatus.lastStatus = retry.ok ? "ok" : "error";
    } catch {
      try {
        transportStatus.retriesStarted += 1;
        await wait(300);
        const retry = await post(candidate.body);
        transportStatus.lastStatus = retry.ok ? "ok" : "error";
      } catch {
        transportStatus.lastStatus = "error";
      }
    }
  })();
}
