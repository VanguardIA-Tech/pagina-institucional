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
  const [mobileOpen, setMobileOpen] = useState(false);

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

  // ─── Close mobile menu on resize to desktop ──────────────────
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
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
              <a
                href="#"
                className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vg-blue-soft/60 rounded"
              >
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
              <nav
                aria-label="Navegação principal"
                className="hidden md:flex items-center gap-8 text-xs font-mono tracking-[0.15em] text-vg-text-muted uppercase relative"
              >
                {sections.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    aria-current={activeSection === id ? "page" : undefined}
                    className={`relative hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vg-blue-soft/60 rounded ${
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
                  className="px-4 py-2 bg-vg-blue hover:bg-vg-blue-deep text-white rounded-full transition-all hover:shadow-[0_0_20px_rgba(31,60,255,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vg-blue-soft/60 focus-visible:ring-offset-2 focus-visible:ring-offset-vg-void"
                >
                  Contato
                </a>
              </nav>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className="md:hidden p-2 text-vg-text-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vg-blue-soft/60 rounded"
              >
                {mobileOpen ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <line x1="1" y1="1" x2="17" y2="17" />
                    <line x1="17" y1="1" x2="1" y2="17" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="14"
                    viewBox="0 0 20 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <line x1="0" y1="1" x2="20" y2="1" />
                    <line x1="0" y1="7" x2="20" y2="7" />
                    <line x1="0" y1="13" x2="20" y2="13" />
                  </svg>
                )}
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-vg-void/95 backdrop-blur-xl flex items-center justify-center md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.nav
              aria-label="Navegação móvel"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-8"
              onClick={(e) => e.stopPropagation()}
            >
              {sections.map(({ id, label }, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setMobileOpen(false)}
                  aria-current={activeSection === id ? "page" : undefined}
                  className="text-2xl font-serif text-vg-text-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vg-blue-soft/60 rounded px-3 py-1"
                >
                  {label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
