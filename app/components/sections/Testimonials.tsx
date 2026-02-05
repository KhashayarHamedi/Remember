"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { spring } from "@/app/lib/motion";

const quotes = [
  {
    text: "Finally, a place that doesn’t ask for more. It just gives you a moment to breathe.",
    attribution: null,
  },
  {
    text: "I use it every morning. Five minutes and I feel like I’ve reclaimed the day.",
    attribution: null,
  },
  {
    text: "Simple, beautiful, and actually calm. No ads, no upsells — just presence.",
    attribution: null,
  },
];

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="testimonials"
      data-testid="testimonials"
      className="border-t border-ink/8 bg-surface-muted/20 py-section lg:py-section-lg"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-content px-6 sm:px-page-x lg:px-page-x-lg">
        <motion.h2
          id="testimonials-heading"
          className="font-serif text-3xl font-semibold text-ink sm:text-4xl"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={spring.gentle}
        >
          Words from others
        </motion.h2>
        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.blockquote
              key={i}
              className="border-l-2 border-accent/40 pl-6"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...spring.gentle, delay: 0.06 * (i + 1) }}
            >
              <p className="font-serif text-xl text-ink">&ldquo;{q.text}&rdquo;</p>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
