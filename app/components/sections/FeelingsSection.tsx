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
import { addJourneyEntry } from "@/app/lib/journey";
import { getBookForFeeling, getBookCoverUrl } from "@/app/lib/books";
import Image from "next/image";

const STORAGE_KEY_DRAFT = "remember_journal_draft";

interface FeelingsSectionProps {
  selectedFeeling?: FeelingId | null;
  onFeelingChange?: (id: FeelingId | null) => void;
}

export function FeelingsSection({
  selectedFeeling: controlledFeeling,
  onFeelingChange,
}: FeelingsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [localFeeling, setLocalFeeling] = useState<FeelingId | null>(null);
  const [journal, setJournal] = useState("");
  const [saved, setSaved] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const selectedId = controlledFeeling ?? localFeeling;
  const setSelectedId = useCallback(
    (id: FeelingId | null) => {
      if (onFeelingChange) onFeelingChange(id);
      else setLocalFeeling(id);
    },
    [onFeelingChange]
  );

  useEffect(() => {
    try {
      const raw =
        typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY_DRAFT);
      if (raw) setJournal(raw);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY_DRAFT, journal);
      } catch {
        // ignore
      }
    }, 400);
    return () => clearTimeout(t);
  }, [journal]);

  const ritual: RitualPayload | null = selectedId ? getRitualForFeeling(selectedId) : null;
  const selectedFeeling = FEELINGS.find((f) => f.id === selectedId);
  const selectedLabel = selectedFeeling?.label ?? "";

  const handleSaveReflection = useCallback(() => {
    if (!selectedId || !ritual) return;
    const meditationText = `${ritual.meditation.title}: ${ritual.meditation.guidance}`;
    addJourneyEntry({
      date: new Date().toISOString(),
      feeling: selectedLabel,
      reflection: journal.trim() || "(no words)",
      ritual: {
        meditation: meditationText,
        selfcare: ritual.selfCare,
        prompt: ritual.journaling,
        spotify: ritual.spotify?.label,
      },
    });
    setJournal("");
    try {
      window.localStorage.removeItem(STORAGE_KEY_DRAFT);
    } catch {
      // ignore
    }
    window.dispatchEvent(new CustomEvent("journey-updated"));
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }, [selectedId, ritual, selectedLabel, journal]);

  const handleCopyMoodCard = useCallback(async () => {
    if (!ritual || !selectedLabel) return;
    const text = [
      `How I feel: ${selectedLabel}`,
      `Meditation: ${ritual.meditation.guidance.split(".")[0] ?? ritual.meditation.title}`,
      `Self-care: ${ritual.selfCare}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch {
      // ignore
    }
  }, [ritual, selectedLabel]);

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
          className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={spring.gentle}
        >
          Your ritual
        </motion.h2>
        <motion.p
          className="mt-4 text-body-lg text-ink-muted"
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...spring.gentle, delay: 0.05 }}
        >
          Choose a feeling above or open Begin to select — then reflect and save.
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
              data-testid={`feeling-pill-${f.id}`}
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...spring.gentle, delay: 0.02 * FEELINGS.indexOf(f) }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-3xl border px-6 py-3 text-body transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 ${
                selectedId === f.id
                  ? "border-accent bg-accent/30 text-ink"
                  : "border-ink/15 bg-surface-muted/50 text-ink-muted hover:border-accent/50 hover:bg-accent/10 hover:text-ink"
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
              data-testid="ritual-card"
              key={selectedId ?? "none"}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={spring.calm}
              className="mt-14 max-w-2xl space-y-10"
            >
              <motion.div
                className="glass rounded-xl border-l-4 border-accent/50 pl-6 pr-6 py-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring.calm, delay: 0.12 }}
              >
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
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring.calm, delay: 0.24 }}
              >
                <h4 className="text-small font-medium uppercase tracking-wide text-ink-subtle">
                  Self-care
                </h4>
                <p className="mt-1 text-body text-ink-muted">{ritual.selfCare}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring.calm, delay: 0.36 }}
              >
                <h4 className="text-small font-medium uppercase tracking-wide text-ink-subtle">
                  Journaling prompt
                </h4>
                <p className="mt-1 text-body text-ink-muted">{ritual.journaling}</p>
              </motion.div>
              {ritual.spotify && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring.calm, delay: 0.48 }}
                >
                  <h4 className="text-small font-medium uppercase tracking-wide text-ink-subtle">
                    Listen
                  </h4>
                  <a
                    href={ritual.spotify.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-body text-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  >
                    {ritual.spotify.label} →
                  </a>
                </motion.div>
              )}
              {selectedId && (() => {
                const book = getBookForFeeling(selectedId);
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...spring.calm, delay: 0.56 }}
                  >
                    <h4 className="text-small font-medium uppercase tracking-wide text-ink-subtle">
                      Suggested read for this moment
                    </h4>
                    <div className="mt-3 flex gap-4">
                      <div className="relative h-40 w-28 shrink-0 overflow-hidden rounded-lg border border-ink/10 bg-surface-muted shadow-sm">
                        <Image
                          src={getBookCoverUrl(book)}
                          alt={`Cover of ${book.title} by ${book.author}`}
                          fill
                          className="object-cover"
                          sizes="112px"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-serif text-lg font-semibold text-ink">
                          {book.title}
                        </p>
                        <p className="mt-0.5 text-small text-ink-muted">
                          {book.author}
                        </p>
                        <p className="mt-2 text-body text-ink-subtle">
                          {book.blurb}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

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
            Optional. Draft saved locally; save adds this moment to My Journey.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring.gentle, delay: 0.12 }}
            className="mt-4"
          >
            <textarea
              data-testid="reflection-textarea"
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              placeholder="A few words or more — no judgment."
              rows={4}
              className="w-full resize-y rounded-xl border border-ink/15 bg-surface px-4 py-3 text-body text-ink placeholder:text-ink-subtle transition-shadow focus:scale-[1.01] focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/30"
              aria-label="Journal reflection"
            />
            {ritual && (
              <motion.button
                type="button"
                data-testid="save-button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={spring.calm}
                onClick={handleSaveReflection}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-ink/20 bg-ink px-5 py-2.5 text-small font-medium text-surface transition-transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                {saved ? (
                  <>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={spring.calm}
                      className="inline-block text-surface"
                    >
                      ✓
                    </motion.span>
                    Saved
                  </>
                ) : (
                  "Save Reflection"
                )}
              </motion.button>
            )}
          </motion.div>
        </div>

        {ritual && (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, ...spring.calm }}
          >
            <button
              type="button"
              onClick={handleCopyMoodCard}
              className="text-small font-medium text-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              {copyFeedback ? "Copied." : "Copy ritual text"}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
