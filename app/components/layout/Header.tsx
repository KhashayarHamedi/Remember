"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { spring } from "@/app/lib/motion";
import { getJourneyEntries } from "@/app/lib/journey";

const navLinks = [
  { href: "#sound", label: "Sound" },
  { href: "#about", label: "About" },
  { href: "#benefits", label: "Benefits" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Words" },
];

interface HeaderProps {
  onBeginClick?: () => void;
}

export function Header({ onBeginClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hasJourneyEntries, setHasJourneyEntries] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setHasJourneyEntries(getJourneyEntries().length > 0);
    const handler = () => setHasJourneyEntries(getJourneyEntries().length > 0);
    window.addEventListener("journey-updated", handler);
    return () => window.removeEventListener("journey-updated", handler);
  }, []);

  const beginAction = onBeginClick ? (
    <button
      type="button"
      onClick={() => {
        onBeginClick();
        setMobileOpen(false);
      }}
      className="text-small text-ink-muted transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
    >
      Begin
    </button>
  ) : (
    <Link href="#feelings" className="text-small text-ink-muted transition-colors hover:text-ink">
      Begin
    </Link>
  );

  return (
    <header
      data-testid="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-surface/90 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-8 px-6 py-5 sm:px-page-x lg:px-page-x-lg">
        <Link
          href="/"
          className="font-serif text-xl font-semibold text-ink"
          aria-label="Remember — Home"
        >
          Remember
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {hasJourneyEntries && (
            <>
              <Link
                href="/journey"
                className="text-small text-ink-muted transition-colors hover:text-ink"
              >
                My Journey
              </Link>
              <Link
                href="/sanctuary"
                className="text-small text-ink-muted transition-colors hover:text-ink"
              >
                My Sanctuary
              </Link>
            </>
          )}
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-small text-ink-muted transition-colors hover:text-ink"
            >
              {label}
            </Link>
          ))}
          {beginAction}
        </nav>

        <button
          type="button"
          data-testid="mobile-menu-toggle"
          className="flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`h-0.5 w-5 bg-ink transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-5 bg-ink transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-5 bg-ink transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ ...spring.gentle }}
            className="overflow-hidden border-t border-ink/10 bg-surface md:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-6" aria-label="Mobile">
              {hasJourneyEntries && (
                <>
                  <Link
                    href="/journey"
                    className="py-2 text-body-lg text-ink-muted transition-colors hover:text-ink"
                    onClick={() => setMobileOpen(false)}
                  >
                    My Journey
                  </Link>
                  <Link
                    href="/sanctuary"
                    className="py-2 text-body-lg text-ink-muted transition-colors hover:text-ink"
                    onClick={() => setMobileOpen(false)}
                  >
                    My Sanctuary
                  </Link>
                </>
              )}
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="py-2 text-body-lg text-ink-muted transition-colors hover:text-ink"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              ))}
              {onBeginClick ? (
                <button
                  type="button"
                  className="py-2 text-left text-body-lg text-ink-muted transition-colors hover:text-ink"
                  onClick={() => {
                    onBeginClick();
                    setMobileOpen(false);
                  }}
                >
                  Begin
                </button>
              ) : (
                <Link
                  href="#feelings"
                  className="py-2 text-body-lg text-ink-muted transition-colors hover:text-ink"
                  onClick={() => setMobileOpen(false)}
                >
                  Begin
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
