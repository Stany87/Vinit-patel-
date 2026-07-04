import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, type MotionValue } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { fadeUp } from "@/animations/hero";
import { portfolioContainer, portfolioItem } from "@/animations/portfolio";
import {
  CLIENT_EVENTS,
  type ClientEvent,
  type EventType,
} from "@/data/portfolioData";
import { useState, useMemo } from "react";

const PORTFOLIO_CATEGORIES = [
  "All",
  "Wedding",
  "Sangeet",
  "Haldi",
  "Engagement",
  "Couple Shoot",
  "Baby Shower",
] as const;

type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

const POLAROID_SLOTS = [
  { left: "2%",  top: "4%",  rot: -8,  w: 170, z: 3 },
  { left: "23%", top: "10%", rot: 6,   w: 165, z: 5 },
  { left: "44%", top: "2%",  rot: -4,  w: 180, z: 4 },
  { left: "65%", top: "8%",  rot: 9,   w: 170, z: 3 },
  { left: "86%", top: "14%", rot: -6,  w: 160, z: 2 },
  { left: "0%",  top: "34%", rot: 5,   w: 180, z: 4 },
  { left: "21%", top: "40%", rot: -10, w: 165, z: 6 },
  { left: "42%", top: "36%", rot: 3,   w: 190, z: 7 },
  { left: "63%", top: "40%", rot: -5,  w: 175, z: 5 },
  { left: "84%", top: "38%", rot: 8,   w: 170, z: 4 },
  { left: "4%",  top: "66%", rot: 4,   w: 170, z: 3 },
  { left: "25%", top: "70%", rot: -7,  w: 165, z: 5 },
  { left: "46%", top: "68%", rot: 6,   w: 180, z: 4 },
  { left: "67%", top: "72%", rot: -3,  w: 170, z: 3 },
];

const CONFETTI = [
  { left: "48%", top: "1%",  rot: 10,  c: "#d4b062" },
  { left: "2%",  top: "62%", rot: -20, c: "#C89B3C" },
  { left: "14%", top: "94%", rot: 25,  c: "#C89B3C" },
  { left: "82%", top: "60%", rot: -8,  c: "#d4b062" },
  { left: "92%", top: "88%", rot: 14,  c: "#C89B3C" },
];

const SLOT_MAPPINGS: Record<number, number[]> = {
  1: [7],
  2: [6, 8],
  3: [1, 7, 8],
  4: [1, 3, 10, 13],
  5: [0, 4, 7, 10, 13],
  6: [0, 2, 4, 10, 12, 13],
  7: [0, 2, 4, 6, 8, 10, 12],
  8: [0, 2, 4, 5, 9, 10, 11, 13],
  9: [0, 1, 2, 4, 6, 7, 9, 10, 12],
};

interface DesktopPolaroidCardProps {
  event: ClientEvent;
  i: number;
  p: (typeof POLAROID_SLOTS)[0];
  onOpen: () => void;
  globalX: MotionValue<number>;
  globalY: MotionValue<number>;
}

function DesktopPolaroidCard({ event, i, p, onOpen, globalX, globalY }: DesktopPolaroidCardProps) {
  const localX = useMotionValue(0);
  const localY = useMotionValue(0);

  const rotateX = useSpring(useTransform(localY, [-0.5, 0.5], [10, -10]), { damping: 25, stiffness: 200 });
  const rotateY = useSpring(useTransform(localX, [-0.5, 0.5], [-10, 10]), { damping: 25, stiffness: 200 });

  const depth = 1 + (i % 4) * 0.4;
  const translateX = useSpring(useTransform(globalX, [0, 1], [-12 * depth, 12 * depth]), { damping: 30, stiffness: 120 });
  const translateY = useSpring(useTransform(globalY, [0, 1], [-12 * depth, 12 * depth]), { damping: 30, stiffness: 120 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    localX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    localY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    localX.set(0);
    localY.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, rotate: p.rot * 0.4 }}
      animate={{ opacity: 1, y: 0, rotate: p.rot }}
      exit={{ opacity: 0, y: 15, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: 0, scale: 1.08, zIndex: 50, transition: { duration: 0.3 } }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "absolute",
        left: p.left,
        top: p.top,
        width: p.w,
        zIndex: p.z,
        transformOrigin: "center",
        rotateX,
        rotateY,
        x: translateX,
        y: translateY,
        transformStyle: "preserve-3d",
      }}
      className="cursor-pointer group"
      onClick={onOpen}
      data-cursor="open"
    >
      <div
        className="bg-white p-3 pb-9 transition-shadow duration-300 group-hover:shadow-[0_20px_40px_-15px_rgba(60,40,10,0.4)]"
        style={{
          boxShadow: "0 1px 2px rgba(0,0,0,0.08), 0 12px 28px -8px rgba(60,40,10,0.18), 0 30px 60px -20px rgba(60,40,10,0.12)",
          transform: "translateZ(10px)",
        }}
      >
        <div className="aspect-square w-full overflow-hidden bg-[#e9e4d5]">
          <img
            src={event.coverImage}
            alt={`${event.clientNames} – ${event.eventType}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ transform: "translateZ(15px)" }}
          />
        </div>
        <p
          className="mt-3 text-center text-lg text-[color:var(--color-ink)]/85 select-none truncate px-1"
          style={{ fontFamily: "'Great Vibes', cursive", transform: "translateZ(20px)" }}
        >
          {event.clientNames}
        </p>
        <p className="text-center text-[9px] tracking-[0.2em] text-[color:var(--color-ink)]/35 uppercase mt-0.5">
          {event.eventType} · {event.location}
        </p>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return CLIENT_EVENTS;
    return CLIENT_EVENTS.filter((e) => e.eventType === activeCategory);
  }, [activeCategory]);

  const globalX = useMotionValue(0.5);
  const globalY = useMotionValue(0.5);

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    globalX.set((e.clientX - rect.left) / rect.width);
    globalY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      id="portfolio"
      onMouseMove={handleGlobalMouseMove}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f8f7f3 0%, #f0ede5 50%, #f8f7f3 100%)" }}
    >
      {/* Subtle linen texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25] mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(120,90,40,0.05) 0 1px, transparent 1px 3px), repeating-linear-gradient(-45deg, rgba(120,90,40,0.04) 0 1px, transparent 1px 3px)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-gold)]/25 to-transparent" />

      <div className="relative mx-auto max-w-[1300px] px-6 md:px-12">
        {/* Header */}
        <div className="text-center">
          <motion.p {...fadeUp} className="text-[10px] tracking-[0.45em] text-[color:var(--color-gold)]">
            PORTFOLIO
          </motion.p>
          <motion.h2
            {...fadeUp}
            className="mt-4 font-serif text-[36px] md:text-[48px] font-light text-[color:var(--color-ink)]"
          >
            A Glimpse of Our Work
          </motion.h2>
          <div className="mx-auto mt-5 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-[color:var(--color-gold)]/60" />
            <span className="text-[color:var(--color-gold)] text-xs">◆</span>
            <span className="h-px w-8 bg-[color:var(--color-gold)]/60" />
          </div>
        </div>

        {/* Filter tabs */}
        <motion.div {...fadeUp} className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8">
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative pb-2 text-[11px] tracking-[0.3em] transition-colors duration-300 ${
                activeCategory === cat
                  ? "text-[color:var(--color-gold)]"
                  : "text-[color:var(--color-ink)]/50 hover:text-[color:var(--color-gold)]"
              }`}
            >
              {cat.toUpperCase()}
              <AnimatePresence>
                {activeCategory === cat && (
                  <motion.span
                    layoutId="filter-underline"
                    className="absolute inset-x-0 bottom-0 h-px bg-[color:var(--color-gold)]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </AnimatePresence>
            </button>
          ))}
        </motion.div>

        {/* Mobile/Tablet Layout */}
        <div className="block md:hidden mt-14">
          <motion.div variants={portfolioContainer} initial="hidden" animate="visible" className="columns-2 gap-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((event, i) => (
                <motion.div
                  key={`mobile-${event.id}`}
                  layout
                  variants={portfolioItem}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="break-inside-avoid cursor-pointer origin-center"
                  onClick={() => navigate({ to: `/event/${event.id}` })}
                  data-cursor="open"
                  whileHover={{ rotate: 0, scale: 1.04, zIndex: 10, transition: { duration: 0.3 } }}
                  style={{ rotate: i % 3 === 0 ? -2.5 : i % 3 === 1 ? 2.5 : -1 }}
                >
                  <div
                    className="bg-white p-2 pb-6"
                    style={{ boxShadow: "0 4px 15px -3px rgba(60,40,10,0.12), 0 2px 6px -1px rgba(60,40,10,0.08)" }}
                  >
                    <div className="aspect-square w-full overflow-hidden bg-[#e9e4d5]">
                      <img src={event.coverImage} alt={`${event.clientNames} – ${event.eventType}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                    </div>
                    <p className="mt-2.5 text-center text-[13px] text-[color:var(--color-ink)]/80 select-none truncate px-1" style={{ fontFamily: "'Great Vibes', cursive" }}>
                      {event.clientNames}
                    </p>
                    <p className="text-center text-[8px] tracking-[0.2em] text-[color:var(--color-ink)]/30 uppercase mt-0.5">
                      {event.eventType}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Desktop Layout (Scattered polaroids) */}
        <div className="hidden md:block mt-14 relative h-[840px] w-full max-w-[1300px]" style={{ perspective: 1200 }}>
          {CONFETTI.map((f, i) => (
            <div key={`c${i}`} className="absolute pointer-events-none" style={{ left: f.left, top: f.top, transform: `rotate(${f.rot}deg)` }} aria-hidden>
              <svg width="22" height="22" viewBox="0 0 24 24" fill={f.c}>
                <path d="M12 2c1.2 2.4 3.2 3.6 5.8 3.6-.8 2.6-.2 4.8 1.6 6.4-2.4 1.2-3.6 3.2-3.6 5.8-2.6-.8-4.8-.2-6.4 1.6-1.2-2.4-3.2-3.6-5.8-3.6.8-2.6.2-4.8-1.6-6.4C4.4 8.2 5.6 6.2 5.6 3.6 8.2 4.4 10.4 3.8 12 2z" />
                <circle cx="12" cy="12" r="2.2" fill="#8B6A25" />
              </svg>
            </div>
          ))}

          <AnimatePresence mode="popLayout">
            {filtered.map((event, i) => {
              const selectedSlots = SLOT_MAPPINGS[filtered.length] || Array.from({ length: filtered.length }, (_, idx) => idx % POLAROID_SLOTS.length);
              const slotIdx = selectedSlots[i] ?? (i % POLAROID_SLOTS.length);
              const p = POLAROID_SLOTS[slotIdx];

              return (
                <DesktopPolaroidCard
                  key={`desktop-${event.id}`}
                  event={event}
                  i={i}
                  p={p}
                  onOpen={() => navigate({ to: `/event/${event.id}` })}
                  globalX={globalX}
                  globalY={globalY}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* View full CTA */}
        <motion.div {...fadeUp} className="mt-16 text-center">
          <a
            href="/gallery"
            className="inline-flex items-center border border-[color:var(--color-gold)] bg-[color:var(--color-gold)] px-10 py-4 text-[11px] tracking-[0.3em] text-[color:var(--color-ink)] font-semibold hover:bg-[color:var(--color-gold-soft)] hover:shadow-[0_0_30px_rgba(200,155,60,0.3)] transition-all duration-400"
          >
            VIEW FULL GALLERY
          </a>
        </motion.div>
      </div>
    </section>
  );
}
