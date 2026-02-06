"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { spring } from "@/app/lib/motion";

const SPOTIFY_PLAYLIST_ID = "53FP6qy7bf9FbINpnkKei4";
const EMBED_URL = `https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0`;

export function SoundSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="sound"
      data-testid="sound-section"
      className="scroll-mt-24 border-t border-ink/8 bg-surface-muted/40 py-section lg:py-section-lg"
      aria-labelledby="sound-heading"
    >
      <div className="mx-auto max-w-content px-6 sm:px-page-x lg:px-page-x-lg">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5 lg:pt-4">
            <motion.h2
              id="sound-heading"
              className="font-serif text-3xl font-semibold text-ink sm:text-4xl"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={spring.gentle}
            >
              Fill the space
            </motion.h2>
            <motion.p
              className="mt-6 text-body-lg text-ink-muted"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...spring.gentle, delay: 0.06 }}
            >
              A curated playlist for this moment. Press play below — no account
              needed to listen. The ambient layer can be turned on with the
              sound button in the corner.
            </motion.p>
          </div>
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring.gentle, delay: 0.1 }}
          >
            <div className="overflow-hidden rounded-sm border border-ink/10 bg-ink/5 shadow-none">
              <iframe
                src={EMBED_URL}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Leni Araki — Spotify playlist"
                className="min-h-[280px] sm:min-h-[352px]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
