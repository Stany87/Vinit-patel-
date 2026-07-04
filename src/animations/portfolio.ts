/** Container for staggering portfolio item entrances */
export const portfolioContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

/** Each portfolio item — fade, scale, and slight Y rise */
export const portfolioItem = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 10,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};
