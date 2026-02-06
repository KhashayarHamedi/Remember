"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { spring } from "@/app/lib/motion";
import { getJourneyEntries } from "@/app/lib/journey";
import {
  getTimeMode,
  getDominantFeeling,
  moodToColor,
  getPoeticExcerpt,
  getRemixSuggestions,
  getNarrativeThread,
  type TimeMode,
} from "@/app/lib/sanctuary";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";

function useCountUp(end: number, durationMs = 1200, deps: unknown[] = []) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (end === 0) {
      setCount(0);
      return;
    }
    setCount(0);
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      setCount(Math.round(end * t));
      if (t < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [end, durationMs, ...deps]);
  return count;
}

export default function SanctuaryPage() {
  const [entries, setEntries] = useState(getJourneyEntries());
  const [mounted, setMounted] = useState(false);
  const [modeOverride, setModeOverride] = useState<TimeMode | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [highContrast, setHighContrast] = useState(false);
  const gardenRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setEntries(getJourneyEntries());
    setMounted(true);
  }, []);

  useEffect(() => {
    const handler = () => setEntries(getJourneyEntries());
    window.addEventListener("journey-updated", handler);
    return () => window.removeEventListener("journey-updated", handler);
  }, []);

  const timeMode = getTimeMode();
  const effectiveMode: TimeMode = modeOverride ?? timeMode;
  const dominantFeeling = useMemo(
    () => (entries.length > 0 ? getDominantFeeling(entries) : "calm"),
    [entries]
  );
  const waveColor = moodToColor(dominantFeeling);
  const suggestions = useMemo(() => getRemixSuggestions(entries), [entries]);
  const narrative = useMemo(() => getNarrativeThread(entries), [entries]);

  const feelingCounts = useMemo(() => {
    const c: Record<string, number> = {};
    entries.forEach((e) => {
      const f = e.feeling;
      c[f] = (c[f] ?? 0) + 1;
    });
    return Object.entries(c).sort((a, b) => b[1] - a[1]);
  }, [entries]);
  const mostFeeling = feelingCounts[0];
  const mostCount = useCountUp(mostFeeling?.[1] ?? 0, 1400, [mostFeeling?.[1]]);

  if (!mounted) {
    return (
      <>
        <Header />
        <div className="flex min-h-screen items-center justify-center pt-24 sanctuary-morning">
          <p className="text-ink-muted">Loading…</p>
        </div>
      </>
    );
  }

  if (entries.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 pb-sanctuary-y-lg sanctuary-morning transition-colors duration-[2000ms]">
          <div className="mx-auto max-w-content px-8 py-sanctuary-y lg:px-16 lg:py-sanctuary-y-lg">
            <motion.h1
              className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={spring.sanctuary}
            >
              My Evolving Sanctuary
            </motion.h1>
            <motion.p
              className="mt-6 max-w-narrow text-body-lg leading-9 text-ink-muted"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring.sanctuary, delay: 0.08 }}
            >
              Your sanctuary grows with each reflection. Plant a seed to begin.
            </motion.p>
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring.sanctuary, delay: 0.15 }}
            >
              <Link
                href="/?begin=1"
                className="inline-block rounded-xl border border-ink/20 bg-ink px-6 py-3 text-body font-medium text-surface transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                aria-label="Plant a new seed — open feelings"
              >
                Plant a new seed
              </Link>
            </motion.div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main
        className={`min-h-screen pt-24 pb-sanctuary-y-lg transition-colors duration-[2000ms] ${
          effectiveMode === "morning" ? "sanctuary-morning" : "sanctuary-evening"
        } ${highContrast ? "sanctuary-high-contrast" : ""}`}
        role="main"
        aria-label="My Evolving Sanctuary"
      >
        <div className="mx-auto max-w-content px-8 lg:px-16">
          {/* Mode toggle */}
          <motion.div
            className="flex flex-wrap items-center gap-4 pt-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring.sanctuary}
          >
            <span className="text-small text-ink-subtle">Atmosphere</span>
            <div className="flex rounded-full border border-ink/10 bg-surface/60 p-0.5 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setModeOverride(modeOverride === "morning" ? null : "morning")}
                className={`rounded-full px-4 py-2 text-small transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                  (modeOverride ?? timeMode) === "morning"
                    ? "bg-accent/20 text-ink"
                    : "text-ink-muted hover:text-ink"
                }`}
                aria-pressed={(modeOverride ?? timeMode) === "morning"}
                aria-label="Morning light"
              >
                Morning light
              </button>
              <button
                type="button"
                onClick={() => setModeOverride(modeOverride === "evening" ? null : "evening")}
                className={`rounded-full px-4 py-2 text-small transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                  (modeOverride ?? timeMode) === "evening"
                    ? "bg-accent/20 text-ink"
                    : "text-ink-muted hover:text-ink"
                }`}
                aria-pressed={(modeOverride ?? timeMode) === "evening"}
                aria-label="Evening depth"
              >
                Evening depth
              </button>
            </div>
            <button
              type="button"
              onClick={() => setHighContrast((c) => !c)}
              className={`rounded-full border px-4 py-2 text-small focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                highContrast ? "border-ink bg-ink text-surface" : "border-ink/15 bg-surface/60 text-ink-muted hover:text-ink"
              }`}
              aria-pressed={highContrast}
              aria-label="Toggle high contrast"
            >
              High contrast
            </button>
          </motion.div>

          {/* Title with breathing (slower in evening) */}
          <motion.h1
            className={`mt-12 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl ${
              effectiveMode === "evening" ? "animate-breathe-sanctuary" : "animate-breathe"
            }`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring.sanctuary, delay: 0.05 }}
          >
            My Evolving Sanctuary
          </motion.h1>
          <motion.p
            className="mt-6 max-w-narrow text-body-lg leading-9 text-ink-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring.sanctuary, delay: 0.1 }}
          >
            A quiet inner room that remembers you.
          </motion.p>

          {/* Garden: wavy SVG + elements */}
          <motion.section
            ref={gardenRef}
            className="relative mt-sanctuary-y min-h-[280px]"
            aria-label="Garden of moments"
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring.sanctuary, delay: 0.15 }}
            >
              <svg
                viewBox="0 0 600 120"
                className="h-32 w-full max-w-3xl"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M0,60 Q150,20 300,60 T600,60"
                  fill="none"
                  stroke={waveColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M0,70 Q120,40 280,70 T600,70"
                  fill="none"
                  stroke={waveColor}
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                />
              </svg>
            </motion.div>
            {/* Elements: one per entry, staggered */}
            <div className="relative flex flex-wrap justify-center gap-6 pt-24">
              {entries.slice(0, 20).map((entry, i) => (
                <motion.button
                  key={entry.id}
                  type="button"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    ...spring.sanctuary,
                    delay: 0.08 * i + 0.2,
                  }}
                  className="relative h-3 w-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  style={{ backgroundColor: moodToColor(entry.feeling) }}
                  onMouseEnter={() => setHoveredId(entry.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(entry.id)}
                  onBlur={() => setHoveredId(null)}
                  aria-label={getPoeticExcerpt(entry)}
                >
                  {hoveredId === entry.id && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full left-1/2 z-10 mb-2 w-48 -translate-x-1/2 rounded-lg border border-ink/10 bg-surface/95 px-3 py-2 text-left text-small text-ink shadow-lg backdrop-blur-sm"
                      role="tooltip"
                    >
                      {getPoeticExcerpt(entry)}
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.section>

          {/* Whispers from the Path */}
          {suggestions.length > 0 && (
            <motion.section
              className="mt-sanctuary-y"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring.sanctuary, delay: 0.25 }}
              aria-label="Whispers from the path"
            >
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink">
                Whispers from the Path
              </h2>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                {suggestions.map((s, i) => (
                  <motion.div
                    key={i}
                    className="glass max-w-md rounded-2xl border border-white/10 p-6 shadow-inner backdrop-blur-sm"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...spring.sanctuary, delay: 0.3 + i * 0.12 }}
                  >
                    <p className="text-body leading-9 text-ink-muted">{s.line}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Emotional insight cards (2–3) */}
          <motion.section
            className="mt-sanctuary-y grid gap-8 sm:grid-cols-2"
            aria-label="Emotional insights"
          >
            {mostFeeling && (
              <motion.div
                className="glass rounded-2xl border border-white/10 p-8 shadow-inner backdrop-blur-sm"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={spring.sanctuary}
              >
                <p className="text-small font-medium uppercase tracking-wide text-ink-subtle">
                  The feeling that visits most
                </p>
                <p className="mt-3 font-serif text-3xl font-semibold text-ink">
                  {mostFeeling[0]}
                </p>
                <p className="mt-1 text-body text-ink-muted">
                  <span aria-live="polite">{mostCount}</span> moment
                  {mostCount !== 1 ? "s" : ""}
                </p>
              </motion.div>
            )}
            <motion.div
              className="glass rounded-2xl border border-white/10 p-8 shadow-inner backdrop-blur-sm"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...spring.sanctuary, delay: 0.08 }}
            >
              <p className="text-small font-medium uppercase tracking-wide text-ink-subtle">
                A thread through your moments
              </p>
              <p className="mt-3 text-body-lg leading-9 italic text-ink-muted">
                {narrative}
              </p>
            </motion.div>
          </motion.section>

          {/* Micro-customization + CTA */}
          <motion.div
            className="mt-sanctuary-y flex flex-wrap items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring.sanctuary, delay: 0.35 }}
          >
            <Link
              href="/?begin=1"
              className="inline-block rounded-xl border border-ink/20 bg-ink px-6 py-3 text-body font-medium text-surface transition-transform hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              aria-label="Plant a new seed"
            >
              Plant a new seed
            </Link>
            <Link
              href="/#sound"
              className="text-small text-ink-muted underline decoration-ink/20 hover:text-ink hover:decoration-ink/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2"
            >
              Add ambient from Sound section →
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
