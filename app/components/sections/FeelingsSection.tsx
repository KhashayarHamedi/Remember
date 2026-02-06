"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { spring } from "@/app/lib/motion";
import {
  FEELINGS,
  type FeelingId,
  getRitualForFeeling,
  type RitualPayload,
} from "@/app/lib/rituals";

const STORAGE_KEY_JOURNAL = "remember_journal";
const STORAGE_KEY_RITUAL = "remember_saved_ritual";

export function FeelingsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [selectedId, setSelectedId] = useState<FeelingId | null>(null);
  const [journal, setJournal] = useState("");
  const [savedRitual, setSavedRitual] = useState<{
    feeling: string;
    ritual: RitualPayload;
    mantra: string;
  } | null>(null);
  const [showMoodCard, setShowMoodCard] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Restore journal from localStorage (guest)
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY_JOURNAL);
      if (raw) setJournal(raw);
    } catch {
      // ignore
    }
  }, []);

  // Autosave journal to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY_JOURNAL, journal);
    } catch {
      // ignore
    }
  }, [journal]);

  const ritual: RitualPayload | null = selectedId ? getRitualForFeeling(selectedId) : null;
  const selectedFeeling = FEELINGS.find((f) => f.id === selectedId);
  const selectedLabel = selectedFeeling?.label ?? "";

  const handleSaveRitual = useCallback(() => {
    if (!selectedId || !ritual) return;
    const mantra = ritual.meditation.guidance.split(".")[0] ?? ritual.meditation.title;
    setSavedRitual({
      feeling: selectedLabel,
      ritual,
      mantra,
    });
    setShowMoodCard(true);
    try {
      window.localStorage.setItem(
        STORAGE_KEY_RITUAL,
        JSON.stringify({
          feeling: selectedLabel,
          meditation: ritual.meditation,
          selfCare: ritual.selfCare,
          journaling: ritual.journaling,
          mantra: mantra,
        })
      );
    } catch {
      // ignore
    }
  }, [selectedId, ritual, selectedLabel]);

  const handleCopyMoodCard = useCallback(async () => {
    if (!savedRitual) return;
    const text = [
      `How I feel: ${savedRitual.feeling}`,
      `Mantra: ${savedRitual.mantra}`,
      `Self-care: ${savedRitual.ritual.selfCare}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch {
      // ignore
    }
  }, [savedRitual]);

  return (
    <section
      ref={sectionRef}
      id="feelings"
      data-testid="feelings-section"
      className="scroll-mt-24 border-t border-ink/8 bg-surface py-section lg:py-section-lg"
      aria-labelledby="feelings-heading"
    >
      <div className="mx-auto max-w-content px-6 sm:px-page-x lg:px-page-x-lg">
        <motion.h2
          id="feelings-heading"
          className="font-serif text-3xl font-semibold text-ink sm:text-4xl"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={spring.gentle}
        >
          How do you feel today?
        </motion.h2>
        <motion.p
          className="mt-4 text-body-lg text-ink-muted"
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...spring.gentle, delay: 0.05 }}
        >
          Choose one — we’ll suggest a short ritual for you.
        </motion.p>

        <div
          data-testid="feelings-picker"
          className="mt-10 flex flex-wrap gap-2"
          role="group"
          aria-label="Select how you feel"
        >
          {FEELINGS.map((f) => (
            <motion.button
              key={f.id}
              type="button"
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...spring.gentle, delay: 0.02 * FEELINGS.indexOf(f) }}
              className={`rounded-full border px-4 py-2.5 text-small transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                selectedId === f.id
                  ? "border-accent bg-accent/10 text-ink"
                  : "border-ink/15 bg-surface-muted/50 text-ink-muted hover:border-ink/25 hover:text-ink"
              }`}
              onClick={() => setSelectedId(selectedId === f.id ? null : (f.id as FeelingId))}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {ritual && (
            <motion.div
              data-testid="ritual-output"
              key={selectedId ?? "none"}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={spring.gentle}
              className="mt-14 max-w-2xl space-y-10"
            >
              <div className="border-l-2 border-accent/50 pl-6">
                <h3 className="font-serif text-xl font-semibold text-ink">
                  {ritual.meditation.title}
                </h3>
                <p className="mt-2 text-body text-ink-muted">
                  {ritual.meditation.guidance}
                </p>
                {ritual.meditation.duration && (
                  <p className="mt-1 text-small text-ink-subtle">
                    {ritual.meditation.duration}
                  </p>
                )}
              </div>
              <div>
                <h4 className="text-small font-medium uppercase tracking-wide text-ink-subtle">
                  Self-care
                </h4>
                <p className="mt-1 text-body text-ink-muted">{ritual.selfCare}</p>
              </div>
              <div>
                <h4 className="text-small font-medium uppercase tracking-wide text-ink-subtle">
                  Journaling prompt
                </h4>
                <p className="mt-1 text-body text-ink-muted">{ritual.journaling}</p>
              </div>
              {ritual.spotify && (
                <div>
                  <h4 className="text-small font-medium uppercase tracking-wide text-ink-subtle">
                    Listen
                  </h4>
                  <a
                    href={ritual.spotify.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-body text-accent hover:underline"
                  >
                    {ritual.spotify.label} →
                  </a>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Journaling */}
        <div className="mt-14 max-w-2xl">
          <motion.h3
            className="font-serif text-xl font-semibold text-ink"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring.gentle, delay: 0.1 }}
          >
            Your reflection
          </motion.h3>
          <p className="mt-2 text-small text-ink-subtle">
            Optional. Saved locally in this browser.
          </p>
          <textarea
            data-testid="journal-input"
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            placeholder="A few words or more — no judgment."
            rows={4}
            className="mt-4 w-full resize-y rounded-sm border border-ink/15 bg-surface px-4 py-3 text-body text-ink placeholder:text-ink-subtle focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
            aria-label="Journal reflection"
          />
          {ritual && (
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={spring.gentle}
              onClick={handleSaveRitual}
              className="mt-4 rounded-sm border border-ink/20 bg-ink px-5 py-2.5 text-small font-medium text-surface transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Save my ritual
            </motion.button>
          )}
        </div>

        {/* Mood Card */}
        <AnimatePresence>
          {showMoodCard && savedRitual && (
            <motion.div
              data-testid="mood-card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={spring.gentle}
              className="mt-14 max-w-md rounded-sm border border-ink/10 bg-surface-muted/50 p-8"
            >
              <p className="text-small uppercase tracking-wide text-ink-subtle">
                Your mood card
              </p>
              <p className="mt-2 font-serif text-2xl text-ink">
                {savedRitual.feeling}
              </p>
              <p className="mt-4 text-body text-ink-muted">
                &ldquo;{savedRitual.mantra}&rdquo;
              </p>
              <p className="mt-2 text-body text-ink-muted">
                {savedRitual.ritual.selfCare}
              </p>
              <button
                type="button"
                onClick={handleCopyMoodCard}
                className="mt-6 text-small font-medium text-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {copyFeedback ? "Copied." : "Copy text"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
