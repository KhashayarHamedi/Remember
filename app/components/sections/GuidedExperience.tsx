"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { spring } from "@/app/lib/motion";

const steps = [
  "Find a quiet moment. Sit or lie down in a comfortable position.",
  "We guide you through a short breathing rhythm — nothing complex.",
  "You stay with your breath. When the mind wanders, you return.",
  "You close the session when it feels right. No timers, no pressure.",
];

export function GuidedExperience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="experience"
      data-testid="guided-experience"
      className="py-section lg:py-section-lg"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-content px-6 sm:px-page-x lg:px-page-x-lg">
        <div className="max-w-narrow">
          <motion.h2
            id="experience-heading"
            className="font-serif text-3xl font-semibold text-ink sm:text-4xl"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={spring.gentle}
          >
            The experience
          </motion.h2>
          <p className="mt-6 text-body-lg text-ink-muted">
            A simple, guided journey. No accounts required to start. You choose
            when to begin and when to end.
          </p>
          <ul className="mt-10 space-y-6">
            {steps.map((step, i) => (
              <motion.li
                key={i}
                className="flex gap-4 text-body text-ink-muted"
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ ...spring.gentle, delay: 0.08 * (i + 1) }}
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                {step}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
