import { describe, expect, it } from "vitest";
import {
  acquisitionArrivalEventSchema,
  readAcquisitionParameter,
  readVtLinkParameter,
  sanitizeReferrer,
} from "../src/lib/tracking/acquisition-contract";

const opaqueIds = {
  acquisitionSessionId: "22a51f7d-4313-4d4f-9680-3364244061e6",
  arrivalId: "11a51f7d-4313-4d4f-9680-3364244061e6",
  eventId: "18a51f7d-4313-4d4f-9680-3364244061e6",
  journeyId: "3e3ce61f-4bfd-489b-8ca4-07f88e642ac5",
  pageViewId: "9c75ec83-2b98-4999-bf0a-69c288450e37",
  sessionId: "8f9d2377-b2e8-466b-b4f3-1416df8f0543",
} as const;

const event = {
  acquisition_session_id: opaqueIds.acquisitionSessionId,
  arrival_id: opaqueIds.arrivalId,
  event_id: opaqueIds.eventId,
  event_name: "acquisition_arrival",
  event_version: 3,
  funnel_key: "vanguardiagrupo",
  funnel_version: 1,
  journey_id: opaqueIds.journeyId,
  landing_path: "/",
  occurred_at: "2026-08-31T18:30:00.000-03:00",
  page_view_id: opaqueIds.pageViewId,
  project_id: "vanguardiagrupo",
  session_id: opaqueIds.sessionId,
  payload: {
    arrival_reason: "initial",
    capture: {
      clockTrusted: true,
      identityAvailable: true,
      limitations: [],
      storageAvailable: true,
    },
    navigation: { kind: "external_entry", referrer: { state: "absent" } },
    observed: { parameters: {}, vtLink: { state: "absent" } },
    traffic: { kind: "production" },
    transported: null,
  },
} as const;

describe("institutional acquisition contract", (): void => {
  it("accepts the canonical strict wire event", (): void => {
    expect(acquisitionArrivalEventSchema.safeParse(event).success).toBe(true);
    expect(
      acquisitionArrivalEventSchema.safeParse({ ...event, extra: true }).success,
    ).toBe(false);
    expect(new Set(Object.values(opaqueIds)).size).toBe(6);
  });

  it("captures raw duplicates and redacts evident PII", (): void => {
    expect(readAcquisitionParameter("utm_source", [])).toEqual({ state: "absent" });
    expect(readAcquisitionParameter("utm_campaign", ["", ""])).toEqual({
      occurrences: 2,
      state: "empty",
    });
    expect(readAcquisitionParameter("utm_medium", ["paid", "paid"])).toEqual({
      canonicalValue: "paid",
      occurrences: ["paid", "paid"],
      state: "present",
    });
    expect(readAcquisitionParameter("utm_content", ["a", "b"])).toEqual({
      distinctCanonicalValues: ["a", "b"],
      occurrences: ["a", "b"],
      state: "ambiguous",
    });
    expect(readAcquisitionParameter("utm_term", ["11987654321", "safe"])).toEqual({
      occurrenceCount: 2,
      reason: "evident_pii",
      redactedOccurrenceCount: 1,
      safeOccurrences: ["safe"],
      state: "invalid",
    });
  });

  it("keeps governed placement and vt_link rules separate", (): void => {
    expect(readAcquisitionParameter("placement", ["home-hero"], true)).toEqual({
      canonicalValue: "home-hero",
      occurrences: ["home-hero"],
      state: "present",
    });
    expect(readAcquisitionParameter("placement", ["home-hero"], false)).toMatchObject({
      reason: "not_allowed",
      state: "invalid",
    });
    const validLink = "vtl_1234567890123456789012";
    expect(readVtLinkParameter([validLink])).toEqual({
      canonicalValue: validLink,
      occurrences: [validLink],
      state: "present",
    });
    expect(readVtLinkParameter(["vtl_short"])).toMatchObject({
      reason: "schema",
      state: "invalid",
    });
  });

  it("drops query, fragment, and evident PII from referrers", (): void => {
    expect(sanitizeReferrer("https://ads.example.test/landing?email=x#fragment")).toEqual({
      origin: "https://ads.example.test",
      path: "/landing",
      state: "present",
    });
    expect(sanitizeReferrer("http://ads.example.test/landing")).toEqual({
      reason: "scheme",
      state: "invalid",
    });
    expect(sanitizeReferrer("https://ads.example.test/11987654321")).toEqual({
      reason: "pii",
      state: "invalid",
    });
  });
});
