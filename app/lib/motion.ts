/**
 * Shared Framer Motion spring config — design contract: stiffness 80–120, damping 15–25.
 * Keeps animations calm and intentional.
 */
export const spring = {
  gentle: { stiffness: 90, damping: 20 },
  soft: { stiffness: 80, damping: 22 },
  snappy: { stiffness: 120, damping: 18 },
} as const;

export const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { stiffness: 90, damping: 20 },
} as const;
