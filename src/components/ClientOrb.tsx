"use client";

import dynamic from "next/dynamic";

const OrbVoiceAgent = dynamic(
  () => import("@/components/OrbVoiceAgent"),
  { ssr: false }
);

export default function ClientOrb() {
  return <OrbVoiceAgent />;
}
