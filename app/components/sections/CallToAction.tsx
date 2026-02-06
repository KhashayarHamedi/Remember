"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { spring } from "@/app/lib/motion";

interface CallToActionProps {
  onBeginClick?: () => void;
}

export function CallToAction({ onBeginClick }: CallToActionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="begin"
      data-testid="cta"
      className="py-section lg:py-section-lg"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-content px-6 sm:px-page-x lg:px-page-x-lg">
        <div className="max-w-xl">
          <motion.h2
            id="cta-heading"
            className="font-serif text-3xl font-semibold text-ink sm:text-4xl"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={spring.gentle}
          >
            Join the journey
          </motion.h2>
          <motion.p
            className="mt-6 text-body-lg text-ink-muted"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring.gentle, delay: 0.08 }}
          >
            Take the first step. No sign-up — just open the experience and
            breathe.
          </motion.p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring.gentle, delay: 0.15 }}
          >
            {onBeginClick ? (
              <button
                type="button"
                onClick={onBeginClick}
                className="inline-block rounded-sm border border-ink/20 bg-ink px-8 py-3.5 text-body font-medium text-surface transition-transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                aria-label="Begin your practice"
              >
                Begin
              </button>
            ) : (
              <a
                href="#feelings"
                className="inline-block rounded-sm border border-ink/20 bg-ink px-8 py-3.5 text-body font-medium text-surface transition-transform hover:scale-[1.02] active:scale-[0.98]"
                aria-label="Begin your practice"
              >
                Begin
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
