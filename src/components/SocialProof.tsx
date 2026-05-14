"use client";

import Numeros from "./Numeros";
import Parcerias from "./Parcerias";
import Depoimentos from "./Depoimentos";

export default function SocialProof() {
  return (
    <section
      aria-label="Prova social — clientes, parceiros e depoimentos"
      className="snap-start"
    >
      <Numeros />
      <Parcerias />
      <Depoimentos />
    </section>
  );
}
