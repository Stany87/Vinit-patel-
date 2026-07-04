import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/animations/hero";
import { portfolioContainer, portfolioItem } from "@/animations/portfolio";
import {
  usePortfolio,
  PORTFOLIO_CATEGORIES,
  type PortfolioImage,
  type PortfolioCategory,
} from "@/hooks/usePortfolio";
import { useLightbox } from "@/hooks/useLightbox";
import { Lightbox } from "@/components/Lightbox";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";
import p9 from "@/assets/p9.jpg";

const IMAGES: PortfolioImage[] = [
  { id: 1, src: p1, alt: "Wedding ceremony", categories: ["Wedding"] },
  { id: 2, src: p2, alt: "Sangeet night", categories: ["Sangeet"] },
  { id: 3, src: p3, alt: "Couple portrait", categories: ["Wedding", "Couple Shoot"] },
  { id: 4, src: p4, alt: "Baby shower celebration", categories: ["Baby Shower"] },
  { id: 5, src: p5, alt: "Engagement shoot", categories: ["Engagement"] },
  { id: 6, src: p6, alt: "Wedding reception", categories: ["Wedding"] },
  { id: 7, src: p7, alt: "Haldi ceremony", categories: ["Haldi"] },
  { id: 8, src: p8, alt: "Sangeet dance", categories: ["Sangeet"] },
  { id: 9, src: p9, alt: "Couple shoot", categories: ["Couple Shoot"] },
];

const POLAROID_SLOTS = [
  { left: "6%",  top: "4%",  rot: -8,  w: 200, z: 3 },
  { left: "22%", top: "10%", rot: 6,   w: 190, z: 5 },
  { left: "40%", top: "2%",  rot: -4,  w: 210, z: 4 },
  { left: "60%", top: "8%",  rot: 9,   w: 195, z: 3 },
  { left: "78%", top: "14%", rot: -6,  w: 185, z: 2 },
  { left: "4%",  top: "34%", rot: 5,   w: 210, z: 4 },
  { left: "20%", top: "40%", rot: -10, w: 195, z: 6 },
  { left: "37%", top: "36%", rot: 3,   w: 230, z: 7 },
  { left: "58%", top: "40%", rot: -5,  w: 205, z: 5 },
  { left: "76%", top: "38%", rot: 8,   w: 200, z: 4 },
  { left: "8%",  top: "66%", rot: 4,   w: 200, z: 3 },
  { left: "26%", top: "70%", rot: -7,  w: 195, z: 5 },
  { left: "44%", top: "68%", rot: 6,   w: 210, z: 4 },
  { left: "63%", top: "72%", rot: -3,  w: 200, z: 3 },
];

const CONFETTI = [
  { left: "48%", top: "1%",  rot: 10,  c: "#EAE2C8" },
  { left: "2%",  top: "62%", rot: -20, c: "#C89B3C" },
  { left: "14%", top: "94%", rot: 25,  c: "#C89B3C" },
  { left: "82%", top: "60%", rot: -8,  c: "#EAE2C8" },
  { left: "92%", top: "88%", rot: 14,  c: "#C89B3C" },
];

const SLOT_MAPPINGS: Record<number, number[]> = {
  1: [7], // Center
  2: [6, 8], // Mid-Left, Mid-Right
  3: [1, 7, 8], // Top-Mid-Left, Center, Mid-Right
  4: [1, 3, 10, 13], // Spread corners/sides
  5: [0, 4, 7, 10, 13], // Center + 4 corners
  6: [0, 2, 4, 10, 12, 13],
  7: [0, 2, 4, 6, 8, 10, 12],
  8: [0, 2, 4, 5, 9, 10, 11, 13],
  9: [0, 1, 2, 4, 6, 7, 9, 10, 12],
};

export function Portfolio() {
  const { activeCategory, setActiveCategory, filtered } = usePortfolio(IMAGES);
  const lightboxImages = filtered.map((img) => ({ src: img.src, alt: img.alt }));
  const lightbox = useLightbox(lightboxImages);

  return (
    <section
      id="portfolio"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, #F8F4E9 0%, #EFE8D6 60%, #E4D9BE 100%)",
      }}
    >
      {/* Subtle linen texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2] mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(120,90,40,0.06) 0 1px, transparent 1px 3px), repeating-linear-gradient(-45deg, rgba(120,90,40,0.05) 0 1px, transparent 1px 3px)",
        }}
      />

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
        <motion.div
          {...fadeUp}
          className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8"
        >
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as PortfolioCategory)}
              className={`relative pb-2 text-[11px] tracking-[0.3em] transition-colors duration-300 ${
                activeCategory === cat
                  ? "text-[color:var(--color-gold)]"
                  : "text-[color:var(--color-ink)]/60 hover:text-[color:var(--color-gold)]"
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

        {/* Mobile/Tablet Layout (Columns/Masonry) */}
        <div className="block md:hidden mt-14">
          <motion.div
            variants={portfolioContainer}
            initial="hidden"
            animate="visible"
            className="columns-2 gap-4 space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={`mobile-${img.id}`}
                  layout
                  variants={portfolioItem}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="break-inside-avoid cursor-pointer origin-center"
                  onClick={() => lightbox.open(i)}
                  data-cursor="open"
                  whileHover={{
                    rotate: 0,
                    scale: 1.04,
                    zIndex: 10,
                    transition: { duration: 0.3 },
                  }}
                  style={{
                    rotate: i % 3 === 0 ? -2.5 : i % 3 === 1 ? 2.5 : -1,
                  }}
                >
                  <div
                    className="bg-white p-2 pb-6"
                    style={{
                      boxShadow:
                        "0 4px 15px -3px rgba(60,40,10,0.15), 0 2px 6px -1px rgba(60,40,10,0.1)",
                    }}
                  >
                    <div className="aspect-square w-full overflow-hidden bg-[#e9e4d5]">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <p
                      className="mt-2.5 text-center text-[13px] text-[color:var(--color-ink)]/80 select-none truncate px-1"
                      style={{ fontFamily: "'Great Vibes', cursive" }}
                    >
                      {img.alt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Desktop Layout (Scattered absolute canvas) */}
        <div className="hidden md:block mt-14 relative h-[780px] w-full max-w-[1300px]">
          {/* Confetti flowers in background */}
          {CONFETTI.map((f, i) => (
            <div
              key={`c${i}`}
              className="absolute pointer-events-none"
              style={{ left: f.left, top: f.top, transform: `rotate(${f.rot}deg)` }}
              aria-hidden
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill={f.c}>
                <path d="M12 2c1.2 2.4 3.2 3.6 5.8 3.6-.8 2.6-.2 4.8 1.6 6.4-2.4 1.2-3.6 3.2-3.6 5.8-2.6-.8-4.8-.2-6.4 1.6-1.2-2.4-3.2-3.6-5.8-3.6.8-2.6.2-4.8-1.6-6.4C4.4 8.2 5.6 6.2 5.6 3.6 8.2 4.4 10.4 3.8 12 2z" />
                <circle cx="12" cy="12" r="2.2" fill="#8B6A25" />
              </svg>
            </div>
          ))}

          {/* Scattered Polaroids */}
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => {
              const selectedSlots =
                SLOT_MAPPINGS[filtered.length] ||
                Array.from({ length: filtered.length }, (_, idx) => idx % POLAROID_SLOTS.length);
              const slotIdx = selectedSlots[i] ?? (i % POLAROID_SLOTS.length);
              const p = POLAROID_SLOTS[slotIdx];

              return (
                <motion.div
                  key={`desktop-${img.id}`}
                  layout
                  initial={{ opacity: 0, y: 30, rotate: p.rot * 0.4 }}
                  animate={{ opacity: 1, y: 0, rotate: p.rot }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    rotate: 0,
                    scale: 1.08,
                    zIndex: 50,
                    transition: { duration: 0.3 },
                  }}
                  style={{
                    position: "absolute",
                    left: p.left,
                    top: p.top,
                    width: p.w,
                    zIndex: p.z,
                    transformOrigin: "center",
                  }}
                  className="cursor-pointer group"
                  onClick={() => lightbox.open(i)}
                  data-cursor="open"
                >
                  <div
                    className="bg-white p-3 pb-9 transition-shadow duration-300 group-hover:shadow-[0_20px_40px_-15px_rgba(60,40,10,0.4)]"
                    style={{
                      boxShadow:
                        "0 1px 2px rgba(0,0,0,0.08), 0 12px 28px -8px rgba(60,40,10,0.3), 0 30px 60px -20px rgba(60,40,10,0.2)",
                    }}
                  >
                    <div className="aspect-square w-full overflow-hidden bg-[#e9e4d5]">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <p
                      className="mt-3 text-center text-lg text-[color:var(--color-ink)]/85 select-none truncate px-1"
                      style={{ fontFamily: "'Great Vibes', cursive" }}
                    >
                      {img.alt}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* View full CTA */}
        <motion.div {...fadeUp} className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center border border-[color:var(--color-gold)] bg-white/40 px-10 py-4 text-[11px] tracking-[0.3em] text-[color:var(--color-ink)] hover:bg-[color:var(--color-gold)] hover:text-white transition-all duration-400"
          >
            ENQUIRE FOR FULL PORTFOLIO
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightbox.isOpen}
        images={lightboxImages}
        currentIndex={lightbox.currentIndex}
        onClose={lightbox.close}
        onNext={lightbox.next}
        onPrev={lightbox.prev}
        total={lightbox.total}
      />
    </section>
  );
}
