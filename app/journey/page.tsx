"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { spring } from "@/app/lib/motion";
import { getJourneyEntries, type JourneyEntry } from "@/app/lib/journey";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: d.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
  });
}

function excerpt(text: string, max = 80): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return t.slice(0, max).trim() + "…";
}

export default function JourneyPage() {
  const [entries, setEntries] = useState<JourneyEntry[]>([]);
  const [mounted, setMounted] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  useEffect(() => {
    setEntries(getJourneyEntries());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handler = () => setEntries(getJourneyEntries());
    window.addEventListener("journey-updated", handler);
    return () => window.removeEventListener("journey-updated", handler);
  }, [mounted]);

  const mostFrequentFeeling = (() => {
    const counts: Record<string, number> = {};
    entries.forEach((e) => {
      counts[e.feeling] = (counts[e.feeling] ?? 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted[0];
  })();

  const recentReflections = entries.slice(0, 4).map((e) => ({
    date: formatDate(e.date),
    text: excerpt(e.reflection),
    feeling: e.feeling,
  }));

  const quietStreakText =
    entries.length >= 2
      ? `${entries.length} moments of stillness`
      : "1 moment remembered";

  const handleExport = async () => {
    const lines = entries.map(
      (e) =>
        `${formatDate(e.date)} — ${e.feeling}\n${e.reflection}\n${e.ritual.meditation}\n`
    );
    const text = `Your Remembered Moments\n\n${lines.join("\n")}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch {
      // ignore
    }
  };

  if (!mounted) {
    return (
      <>
        <Header />
        <div className="flex min-h-screen items-center justify-center zen-bg pt-24">
          <p className="text-ink-muted">Loading…</p>
        </div>
      </>
    );
  }

  if (entries.length === 0) {
    return (
      <>
        <Header />
        <div className="zen-bg min-h-screen pt-24">
        <div className="mx-auto max-w-content px-6 py-section sm:px-page-x lg:px-page-x-lg">
          <motion.h1
            className="font-serif text-4xl font-semibold tracking-tight text-ink"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring.calm}
          >
            A Quiet Record
          </motion.h1>
          <motion.p
            className="mt-6 text-body-lg text-ink-muted"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring.calm, delay: 0.08 }}
          >
            Your remembered moments will appear here. Start by choosing how you
            feel and saving a reflection.
          </motion.p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring.calm, delay: 0.12 }}
          >
            <Link
              href="/?begin=1"
              className="inline-block rounded-xl border border-ink/20 bg-ink px-6 py-3 text-small font-medium text-surface hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              Start a new moment
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
      <div className="zen-bg min-h-screen pt-24 pb-section-lg">
      <div className="mx-auto max-w-content px-6 sm:px-page-x lg:px-page-x-lg">
        <motion.h1
          className="animate-breathe font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring.calm}
        >
          Your Remembered Moments
        </motion.h1>
        <motion.p
          className="mt-4 text-body-lg text-ink-muted"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring.calm, delay: 0.06 }}
        >
          A quiet record of how you showed up.
        </motion.p>

        {/* Abstract wavy line — calm ocean feel */}
        <motion.div
          className="mt-12 h-2 w-full overflow-hidden rounded-full bg-ink/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, ...spring.calm }}
        >
          <svg
            viewBox="0 0 400 20"
            className="h-full w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,10 Q50,2 100,10 T200,10 T300,10 T400,10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-accent/40"
            />
            <path
              d="M0,12 Q80,4 160,12 T320,12 T400,12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-accent/25"
            />
          </svg>
        </motion.div>

        <div className="mt-14 grid gap-12 lg:grid-cols-3">
          {/* Insight cards — glassmorphic, stagger */}
          <motion.div
            className="glass rounded-2xl p-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring.calm, delay: 0.15 }}
            data-testid="dashboard-entry"
          >
            <p className="text-small font-medium uppercase tracking-wide text-ink-subtle">
              Most remembered
            </p>
            <p className="mt-2 font-serif text-2xl text-ink">
              {mostFrequentFeeling?.[0] ?? "—"}
            </p>
            <p className="mt-1 text-small text-ink-muted">
              {mostFrequentFeeling?.[1] ?? 0} moment
              {(mostFrequentFeeling?.[1] ?? 0) !== 1 ? "s" : ""}
            </p>
            <p className="mt-2 text-small italic text-ink-subtle">
              {quietStreakText}
            </p>
          </motion.div>
          <motion.div
            className="glass rounded-2xl p-6 lg:col-span-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring.calm, delay: 0.22 }}
          >
            <p className="text-small font-medium uppercase tracking-wide text-ink-subtle">
              Recent reflections
            </p>
            <ul className="mt-4 space-y-3">
              {recentReflections.map((r, i) => (
                <li
                  key={i}
                  className="border-l-2 border-accent/30 pl-4 text-body text-ink-muted"
                >
                  <span className="text-small text-ink-subtle">{r.date}</span>
                  <span className="text-ink-subtle"> · {r.feeling}</span>
                  <p className="mt-0.5">{r.text}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Mood timeline — vertical list of entries */}
        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Moments
          </h2>
          <ul className="mt-6 space-y-4">
            <AnimatePresence mode="popLayout">
              {entries.map((entry, i) => (
                <motion.li
                  key={entry.id}
                  data-testid="dashboard-entry"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ ...spring.calm, delay: 0.03 * i }}
                  className="glass group rounded-xl border border-ink/5 p-5 transition-shadow hover:shadow-inner"
                >
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="rounded-full bg-accent/20 px-3 py-1 text-small font-medium text-ink">
                      {entry.feeling}
                    </span>
                    <span className="text-small text-ink-subtle">
                      {formatDate(entry.date)}
                    </span>
                  </div>
                  <p className="mt-3 text-body text-ink-muted">
                    {entry.reflection}
                  </p>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>

        <motion.div
          className="mt-14 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ...spring.calm }}
        >
          <Link
            href="/?begin=1"
            className="inline-block rounded-xl border border-ink/20 bg-ink px-6 py-3 text-small font-medium text-surface hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            Start a new moment
          </Link>
          <button
            type="button"
            onClick={handleExport}
            className="inline-block rounded-xl border border-ink/15 bg-surface px-6 py-3 text-small font-medium text-ink-muted hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            {copyFeedback ? "Copied." : "Copy summary"}
          </button>
        </motion.div>
      </div>
      </div>
      <Footer />
    </>
  );
}
