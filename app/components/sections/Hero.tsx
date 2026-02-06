"use client";

import { motion } from "framer-motion";
import { spring } from "@/app/lib/motion";

interface HeroProps {
  onBeginClick?: () => void;
}

export function Hero({ onBeginClick }: HeroProps) {
  return (
    <section
      data-testid="hero"
      className="relative flex min-h-[85vh] items-center justify-start bg-surface bg-noise bg-cover bg-center pt-24 pb-hero-y lg:pb-hero-y-lg"
      aria-label="Introduction"
    >
      <div className="hero-glow absolute inset-0 pointer-events-none" />
      <div className="relative mx-auto w-full max-w-content px-6 sm:px-page-x lg:px-page-x-lg">
        <div className="max-w-2xl animate-breathe">
          <motion.h1
            className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring.gentle, delay: 0.1 }}
          >
            Return to the present.
          </motion.h1>
          <motion.p
            className="mt-6 text-body-lg text-ink-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring.gentle, delay: 0.25 }}
          >
            A space for stillness. One breath, one moment — remember what it
            feels like to be here.
          </motion.p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring.gentle, delay: 0.4 }}
          >
            {onBeginClick ? (
              <button
                type="button"
                data-testid="begin-button"
                onClick={onBeginClick}
                className="inline-block rounded-sm border border-ink/20 bg-ink px-6 py-3 text-small font-medium text-surface transition-transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2"
                aria-label="Begin — how do you feel today?"
              >
                Begin
              </button>
            ) : (
              <a
                href="#feelings"
                data-testid="begin-button"
                className="inline-block rounded-sm border border-ink/20 bg-ink px-6 py-3 text-small font-medium text-surface transition-transform hover:scale-[1.02] active:scale-[0.98]"
                aria-label="Begin — go to how you feel"
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
