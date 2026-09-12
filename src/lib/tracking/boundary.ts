import type { AcquisitionArrivalInitialization } from "./acquisition";
import { initializeAcquisitionCapture } from "./acquisition";
import { sendAcquisitionArrival } from "./acquisition-bus";
import { trackingConfig } from "./config";

let activeBoundary: AcquisitionArrivalInitialization | null = null;

export function initializeAcquisitionBoundary(): AcquisitionArrivalInitialization {
  if (!trackingConfig.trackingEnabled || !trackingConfig.acquisitionV3Enabled) {
    return Promise.resolve(null);
  }
  if (activeBoundary !== null) return activeBoundary;

  activeBoundary = initializeAcquisitionCapture({
    send: sendAcquisitionArrival,
  }).catch((): null => null);
  return activeBoundary;
}
