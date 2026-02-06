"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { spring } from "@/app/lib/motion";
import { FEELINGS, FEELING_CATEGORIES, type FeelingId } from "@/app/lib/rituals";

const groupedFeelings = FEELING_CATEGORIES.map((cat) => ({
  ...cat,
  feelings: FEELINGS.filter((f) => f.category === cat.id),
})).filter((g) => g.feelings.length > 0);

interface FeelingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (feelingId: FeelingId) => void;
}

export function FeelingsModal({ isOpen, onClose, onSelect }: FeelingsModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={spring.calm}
            className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-xl"
            aria-hidden
            onClick={onClose}
          />
          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="feelings-modal-title"
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={spring.calm}
            className="fixed left-1/2 top-1/2 z-[101] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-surface/95 p-8 shadow-2xl backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="feelings-modal-title"
              className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
            >
              How do you feel today?
            </h2>
            <p className="mt-3 text-body text-ink-muted">
              Choose one — we’ll suggest a short ritual for you.
            </p>
            <div className="mt-8 max-h-[60vh] overflow-y-auto pr-2">
              {groupedFeelings.map((group, gi) => (
                <div key={group.id} className="mb-8">
                  <p className="mb-3 text-small font-medium uppercase tracking-wide text-ink-subtle">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.feelings.map((f) => (
                      <motion.button
                        key={f.id}
                        type="button"
                        data-testid={`feeling-pill-${f.id}`}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.98 }}
                        transition={spring.calm}
                        className="rounded-3xl border border-ink/15 bg-surface-muted/50 px-6 py-3 text-body text-ink-muted transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2"
                        onClick={() => {
                          onSelect(f.id as FeelingId);
                          onClose();
                        }}
                        aria-label={`Select ${f.label}`}
                      >
                        {f.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 text-small text-ink-subtle hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              aria-label="Close"
            >
              Close
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
