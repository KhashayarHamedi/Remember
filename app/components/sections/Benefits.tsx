"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { spring } from "@/app/lib/motion";

const items = [
  {
    title: "Clarity",
    body: "Step back from the rush. A few minutes of stillness can reset how you see the day.",
  },
  {
    title: "Grounding",
    body: "Return to the body. Breath and awareness bring you back to the here and now.",
  },
  {
    title: "Rest",
    body: "Not more content — less. We offer space to pause, not another thing to consume.",
  },
  {
    title: "Intention",
    body: "Start or end your day with purpose. Small rituals compound into a calmer life.",
  },
];

export function Benefits() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="benefits"
      data-testid="benefits"
      className="border-y border-ink/8 bg-surface-muted/30 py-section lg:py-section-lg"
      aria-labelledby="benefits-heading"
    >
      <div className="mx-auto max-w-content px-6 sm:px-page-x lg:px-page-x-lg">
        <motion.h2
          id="benefits-heading"
          className="font-serif text-3xl font-semibold text-ink sm:text-4xl"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={spring.gentle}
        >
          Why pause
        </motion.h2>
        <div className="mt-12 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              className="border-ink/8 py-8 pr-8 sm:border-r last:border-r-0 even:sm:border-r-0 lg:border-r lg:pr-10 lg:last:border-r-0"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...spring.gentle, delay: 0.05 * (i + 1) }}
            >
              <h3 className="font-serif text-xl font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-body text-ink-muted">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
