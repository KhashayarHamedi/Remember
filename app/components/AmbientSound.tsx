"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { spring } from "@/app/lib/motion";

/**
 * Soft ambient pad via Web Audio API. Autoplays muted (browser policy);
 * one user gesture unmutes. No external files.
 */
export function AmbientSound() {
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    ctxRef.current = ctx;

    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);
    gainRef.current = gain;

    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.value = 110;
    osc1.connect(gain);
    osc1.start(0);

    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = 164;
    osc2.connect(gain);
    osc2.start(0);

    setReady(true);
    return () => {
      osc1.stop();
      osc2.stop();
      ctx.close();
    };
  }, []);

  const unmute = async () => {
    if (!ctxRef.current || !gainRef.current) return;
    if (ctxRef.current.state === "suspended") await ctxRef.current.resume();
    gainRef.current.gain.setTargetAtTime(0.08, ctxRef.current.currentTime, 0.5);
    setMuted(false);
  };

  const mute = () => {
    if (!gainRef.current || !ctxRef.current) return;
    gainRef.current.gain.setTargetAtTime(0, ctxRef.current.currentTime, 0.3);
    setMuted(true);
  };

  if (!ready) return null;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, ...spring.gentle }}
      onClick={muted ? unmute : mute}
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-surface/95 text-ink-muted shadow-sm backdrop-blur-sm transition-colors hover:border-ink/20 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={muted ? "Turn on ambient sound" : "Turn off ambient sound"}
      title={muted ? "Turn on ambient sound" : "Turn off ambient sound"}
    >
      {muted ? (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072M11.768 4.696a9 9 0 010 14.608M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
    </motion.button>
  );
}
