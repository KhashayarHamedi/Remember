/**
 * Shared Framer Motion spring config.
 * Meditative calm: stiffness 80–100, damping 20–28 (no bouncy/energy).
 * Sanctuary: very slow, stiffness 60–90, damping 25–35.
 */
export const spring = {
  gentle: { stiffness: 90, damping: 20 },
  soft: { stiffness: 80, damping: 22 },
  snappy: { stiffness: 120, damping: 18 },
  /** Meditative calm — used for ritual reveal, modals, dashboard */
  calm: { stiffness: 85, damping: 24 },
  /** Sanctuary: very calm, slow settle */
  sanctuary: { stiffness: 70, damping: 28 },
} as const;

export const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { stiffness: 90, damping: 20 },
} as const;
