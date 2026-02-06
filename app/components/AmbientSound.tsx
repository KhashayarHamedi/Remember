"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { spring } from "@/app/lib/motion";

/**
 * Meditation track controller.
 * Expects a soft meditation audio file at `/meditation.mp3` in public/.
 * We only start playback on user click to respect browser autoplay rules.
 */
export function AmbientSound() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio("/meditation.mp3");
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    setReady(true);
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (!playing) {
        await audio.play();
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    } catch {
      // ignore playback errors
    }
  };

  if (!ready) return null;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, ...spring.gentle }}
      onClick={togglePlayback}
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-surface/95 text-ink-muted shadow-sm backdrop-blur-sm transition-colors hover:border-ink/20 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={playing ? "Pause meditation sound" : "Play meditation sound"}
      title={playing ? "Pause meditation sound" : "Play meditation sound"}
    >
      {playing ? (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 5.25v13.5m4-13.5v13.5" />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7.5 5.25v13.5L18 12 7.5 5.25z"
          />
        </svg>
      )}
    </motion.button>
  );
}
