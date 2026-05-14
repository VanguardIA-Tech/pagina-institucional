"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const sections = [
  { id: "hero", label: "Início" },
  { id: "tese", label: "Tese" },
  { id: "icia", label: "ICIA" },
  { id: "clientes", label: "Clientes" },
  { id: "cta", label: "Contato" },
];

export function InvisibleHeader() {
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // ─── Show/hide on scroll direction ───────────────────────────
  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const current = window.scrollY;
      setHidden(current > lastScroll && current > 300);
      lastScroll = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── Track active section ────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id || "hero";
            setActiveSection(id);
            break;
          }
        }
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.header
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          exit={{ y: -80 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/[0.04] bg-vg-void/80 backdrop-blur-xl"
        >
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <Image
                src="/logos/logo-vanguardia-mark.png"
                alt="VanguardIA"
                width={32}
                height={32}
                className="w-8 h-8 transition-transform group-hover:scale-110"
                priority
              />
              <span className="text-sm font-medium tracking-tight">
                VanguardIA
              </span>
            </a>

            {/* Nav with active indicator */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-[0.15em] text-vg-text-muted uppercase relative">
              {sections.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`relative hover:text-white transition-colors ${
                    activeSection === id ? "text-white" : ""
                  }`}
                >
                  {label}
                  {activeSection === id && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-vg-blue rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              ))}
              <a
                href="#cta"
                className="px-4 py-2 bg-vg-blue hover:bg-vg-blue-deep text-white rounded-full transition-all hover:shadow-[0_0_20px_rgba(31,60,255,0.3)]"
              >
                Contato
              </a>
            </nav>

            {/* Mobile menu placeholder — Fase 3 */}
            <button className="md:hidden p-2 text-vg-text-muted hover:text-white transition-colors">
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="0" y1="1" x2="20" y2="1" />
                <line x1="0" y1="7" x2="20" y2="7" />
                <line x1="0" y1="13" x2="20" y2="13" />
              </svg>
            </button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
