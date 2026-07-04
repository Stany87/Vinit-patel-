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

        {/* Masonry-style grid */}
        <motion.div
          variants={portfolioContainer}
          initial="hidden"
          animate="visible"
          className="mt-14 columns-2 md:columns-3 gap-4 space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                layout
                variants={portfolioItem}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="break-inside-avoid cursor-pointer group overflow-hidden"
                onClick={() => lightbox.open(i)}
                data-cursor="open"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[color:var(--color-ink)]/0 group-hover:bg-[color:var(--color-ink)]/30 transition-colors duration-500 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-[10px] tracking-[0.4em]">
                      VIEW
                    </span>
                  </div>
                  {/* Gold bottom accent */}
                  <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[color:var(--color-gold)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

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
