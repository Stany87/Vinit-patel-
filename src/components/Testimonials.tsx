import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeUp, LUXURY_EASE } from "@/animations/hero";

const TESTIMONIALS = [
  {
    names: "Pratik & Hetal",
    initials: "P&H",
    event: "Wedding · Vadodara",
    text: "Vinit bhai and his team are simply amazing. They made our wedding so special with their creativity and professionalism. Every photo is a masterpiece we will treasure forever.",
  },
  {
    names: "Riddhi & Tejas",
    initials: "R&T",
    event: "Wedding & Sangeet · Surat",
    text: "The pictures are beyond beautiful. Every emotion was captured so perfectly — from our sangeet laughs to our wedding vows. We could not have asked for anyone better.",
  },
  {
    names: "Jinal & Hardik",
    initials: "J&H",
    event: "Baby Shower · Anand",
    text: "A truly wonderful experience. Our baby shower memories are now timeless photographs. Vinit's warmth and attention to detail made us feel completely at ease.",
  },
  {
    names: "Priya & Nikhil",
    initials: "P&N",
    event: "Engagement · Ahmedabad",
    text: "From the moment we met the team we knew we were in the right hands. Our engagement shoot was pure magic — the locations, the light, the editing — all perfect.",
  },
];

const AUTOPLAY_INTERVAL = 5000;

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const navigate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
    },
    [],
  );

  // Autoplay
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => navigate(1), AUTOPLAY_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, navigate]);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.6, ease: LUXURY_EASE } },
    exit: (dir: number) => ({ opacity: 0, x: dir * -40, transition: { duration: 0.4, ease: LUXURY_EASE } }),
  };

  return (
    <section
      id="testimonials"
      className="bg-[color:var(--color-cream)] py-28 md:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        {/* Header */}
        <div className="text-center">
          <motion.p {...fadeUp} className="text-[10px] tracking-[0.45em] text-[color:var(--color-gold)]">
            TESTIMONIALS
          </motion.p>
          <motion.h2
            {...fadeUp}
            className="mt-4 font-serif text-[36px] md:text-[48px] font-light text-[color:var(--color-ink)]"
          >
            What Our Clients Say
          </motion.h2>
          <div className="mx-auto mt-5 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-[color:var(--color-gold)]/60" />
            <span className="text-[color:var(--color-gold)] text-xs">◆</span>
            <span className="h-px w-8 bg-[color:var(--color-gold)]/60" />
          </div>
        </div>

        {/* Carousel */}
        <div className="relative mt-16 flex items-center">
          {/* Prev arrow */}
          <button
            onClick={() => navigate(-1)}
            className="relative z-10 mr-4 md:mr-8 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-gold)]/50 text-[color:var(--color-gold)] hover:bg-[color:var(--color-gold)] hover:text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Testimonial card */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="mx-auto max-w-3xl bg-white/70 backdrop-blur-md border border-[color:var(--color-gold)]/15 rounded-2xl p-8 md:p-12 shadow-[0_15px_40px_-20px_rgba(60,40,10,0.12)]"
              >
                <Quote
                  className="text-[color:var(--color-gold)]"
                  size={36}
                  strokeWidth={1.2}
                />
                <p className="mt-6 font-serif text-[18px] md:text-[22px] font-light leading-[1.75] text-[color:var(--color-ink)]/80 max-w-2xl italic">
                  "{TESTIMONIALS[current].text}"
                </p>
                <div className="mt-8 flex items-center gap-4">
                  {/* Monogram avatar */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-gold)]/60 bg-[color:var(--color-gold)]/10">
                    <span
                      className="text-[13px] text-[color:var(--color-gold)]"
                      style={{ fontFamily: "Great Vibes, cursive" }}
                    >
                      {TESTIMONIALS[current].initials}
                    </span>
                  </div>
                  <div>
                    <p className="text-[13px] font-medium tracking-[0.1em] text-[color:var(--color-ink)]">
                      {TESTIMONIALS[current].names}
                    </p>
                    <p className="mt-0.5 text-[11px] tracking-[0.2em] text-[color:var(--color-ink)]/50">
                      {TESTIMONIALS[current].event}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next arrow */}
          <button
            onClick={() => navigate(1)}
            className="relative z-10 ml-4 md:ml-8 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-gold)]/50 text-[color:var(--color-gold)] hover:bg-[color:var(--color-gold)] hover:text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-10 flex justify-center gap-2.5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-1.5 bg-[color:var(--color-gold)]"
                  : "w-1.5 h-1.5 bg-[color:var(--color-ink)]/20 hover:bg-[color:var(--color-gold)]/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
