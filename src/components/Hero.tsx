import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerContainer, staggerItem, LUXURY_EASE } from "@/animations/hero";
import heroCouple from "@/assets/hero-couple.jpg";

const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${10 + Math.random() * 80}%`,
  top: `${20 + Math.random() * 60}%`,
  size: 1 + Math.random() * 2,
  delay: i * 0.3,
  duration: 4 + Math.random() * 4,
}));

interface HeroProps {
  onBookClick: () => void;
}

export function Hero({ onBookClick }: HeroProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 0.78]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="home"
      ref={wrapRef}
      className="relative bg-[color:var(--color-ink)]"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Parallax background image */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: imageScale, y: imageY }}
        >
          <img
            src={heroCouple}
            alt="Luxury wedding couple photographed by Vinit Patel Photography Studio"
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
        </motion.div>

        {/* Overlay gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-ink)]/30 via-transparent to-[color:var(--color-ink)]/70"
          style={{ opacity: overlayOpacity }}
        />

        {/* Floating dust particles */}
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="pointer-events-none absolute rounded-full bg-[color:var(--color-gold)]"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Hero content */}
        <motion.div
          className="relative z-10 flex h-full flex-col justify-end pb-24 md:pb-32"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: LUXURY_EASE }}
              className="mb-8 text-[10px] tracking-[0.5em] text-[color:var(--color-gold)]"
            >
              VADODARA · INDIA · EST. 2014
            </motion.p>

            {/* Main headline — editorial line breaks */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="overflow-hidden"
            >
              {["Every Frame", "Tells", "A Story."].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.h1
                    variants={staggerItem}
                    className={`font-serif font-light leading-[0.95] text-white ${
                      i === 0
                        ? "text-[52px] md:text-[80px] lg:text-[100px]"
                        : i === 1
                          ? "text-[52px] md:text-[80px] lg:text-[100px] text-[color:var(--color-gold)] italic"
                          : "text-[52px] md:text-[80px] lg:text-[100px]"
                    }`}
                    style={i === 1 ? { fontFamily: "Great Vibes, cursive", fontStyle: "normal" } : {}}
                  >
                    {line}
                  </motion.h1>
                </div>
              ))}
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.9, ease: LUXURY_EASE }}
              className="mt-8 h-px w-20 origin-left bg-[color:var(--color-gold)]/60"
            />

            {/* Supporting copy */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: LUXURY_EASE }}
              className="mt-6 max-w-sm text-[13px] leading-[1.9] text-white/65"
            >
              Luxury wedding & event photography crafted with an editorial eye.
              We turn fleeting moments into timeless stories.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3, ease: LUXURY_EASE }}
              className="mt-10 flex flex-wrap items-center gap-5"
            >
              <button
                onClick={onBookClick}
                data-cursor="book"
                className="book-cta inline-flex items-center border border-[color:var(--color-gold)] px-8 py-4 text-[11px] tracking-[0.3em] text-white hover:bg-[color:var(--color-gold)] hover:text-[color:var(--color-ink)] transition-all duration-400"
              >
                BOOK YOUR SHOOT
              </button>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-white/60 hover:text-[color:var(--color-gold)] transition-colors"
              >
                VIEW PORTFOLIO
                <span className="inline-block h-px w-6 bg-current" />
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.4em] text-white/40">SCROLL</span>
          <motion.div
            className="h-8 w-px bg-gradient-to-b from-[color:var(--color-gold)]/60 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Stat strip at bottom of viewport */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-0 right-0 z-10 hidden lg:flex flex-col gap-8 px-12 pb-28 text-right"
        >
          {[
            { n: "10+", l: "YEARS\nEXPERIENCE" },
            { n: "500+", l: "HAPPY\nCLIENTS" },
            { n: "1000+", l: "MEMORIES\nCAPTURED" },
          ].map((s, i) => (
            <div key={i} className="relative">
              <div className="font-serif text-[color:var(--color-gold)] text-[34px] font-light leading-none">
                {s.n}
              </div>
              <div className="mt-2 text-[9px] tracking-[0.3em] text-white/60 whitespace-pre-line">
                {s.l}
              </div>
              {i < 2 && <div className="mt-6 ml-auto h-px w-10 bg-[color:var(--color-gold)]/40" />}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
