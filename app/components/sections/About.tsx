"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { spring } from "@/app/lib/motion";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="about"
      data-testid="about"
      className="py-section lg:py-section-lg"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-content px-6 sm:px-page-x lg:px-page-x-lg">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={spring.gentle}
          >
            <h2
              id="about-heading"
              className="font-serif text-3xl font-semibold text-ink sm:text-4xl"
            >
              Our philosophy
            </h2>
          </motion.div>
          <motion.div
            className="lg:col-span-6 lg:col-start-7"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring.gentle, delay: 0.1 }}
          >
            <p className="text-body-lg text-ink-muted">
              We believe presence is a practice, not a destination. REMEMBER
              exists to offer a quiet place — no algorithms, no clutter — where
              you can pause and reconnect with your breath.
            </p>
            <p className="mt-6 text-body text-ink-muted">
              Inspired by slow rituals and mindful traditions, we built this
              space for anyone who wants to feel grounded again. Less noise.
              More intention.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
