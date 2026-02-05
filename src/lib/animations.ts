import type { Variants, Transition } from "motion/react"

// ── Shared Transitions ──────────────────────────────────────────────
export const smoothSpring: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 20,
  mass: 0.8,
}

export const gentleEase: Transition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1], // expo out
}

export const slowReveal: Transition = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1],
}

// ── Viewport Settings ────────────────────────────────────────────────
export const defaultViewport = {
  once: true,
  amount: 0.2,
}

export const earlyViewport = {
  once: true,
  amount: 0.1,
}

// ── Variant Presets ──────────────────────────────────────────────────

/** Fade up from below */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

/** Fade up with slight scale */
export const fadeUpScale: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

/** Slide in from the left */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
}

/** Slide in from the right */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
}

/** Clip reveal from bottom (text mask effect) */
export const clipReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  visible: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
}

/** Scale in from center */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 },
}

/** Stagger container -- use as parent with children variants */
export const staggerContainer = (
  staggerDelay = 0.1,
  delayChildren = 0
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
})

/** Gold line / divider grow */
export const lineGrow: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: { scaleX: 1 },
}

/** Character-level stagger for headings */
export const letterContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
}

export const letterChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}
