import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import heroCouple from "@/assets/luxury_hero.png";

interface HeroProps {
  onBookClick: () => void;
  startTrigger: boolean;
}

export function Hero({ onBookClick, startTrigger }: HeroProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  
  const localX = useMotionValue(0);
  const localY = useMotionValue(0);

  const mouseXSpring = useSpring(localX, { damping: 30, stiffness: 120 });
  const mouseYSpring = useSpring(localY, { damping: 30, stiffness: 120 });

  // Mouse parallax - restrained (< 10px)
  const bgX = useTransform(mouseXSpring, [-0.5, 0.5], [-9, 9]);
  const bgY = useTransform(mouseYSpring, [-0.5, 0.5], [-9, 9]);
  
  const textX = useTransform(mouseXSpring, [-0.5, 0.5], [-4, 4]);
  const textY = useTransform(mouseYSpring, [-0.5, 0.5], [-4, 4]);

  const btnX = useTransform(mouseXSpring, [-0.5, 0.5], [-3, 3]);
  const btnY = useTransform(mouseYSpring, [-0.5, 0.5], [-3, 3]);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });

  const imageScrollY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const stagger = 0.12;
  const baseDelay = 0.4;
  const EASE = [0.22, 1, 0.36, 1];

  return (
    <section
      id="home"
      ref={wrapRef}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        localX.set((e.clientX - rect.left) / rect.width - 0.5);
        localY.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        localX.set(0);
        localY.set(0);
      }}
      className="relative bg-black overflow-hidden h-screen w-full"
    >
      {/* Background Image Container with Ken Burns */}
      <motion.div
        className="absolute inset-0"
        style={{ x: bgX, y: bgY }}
      >
        <motion.img
          src={heroCouple}
          alt="Luxury wedding photography by Vinit Patel Photography Studio — best professional photographer in Vadodara, Gujarat"
          className="absolute inset-0 h-[112%] w-[112%] -left-[6%] -top-[6%] object-cover"
          style={{ 
            y: imageScrollY,
            filter: "brightness(0.82) contrast(1.08) saturate(0.92)"
          }}
          initial={{ scale: 1.08 }}
          animate={{ scale: [1.08, 1, 1.08] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          fetchPriority="high"
        />
      </motion.div>

      {/* Layer 1: Bespoke Gradients */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Layer 2: Vignette */}
      <div className="absolute inset-0 hero-vignette" />

      {/* Layer 3: Noise */}
      <div className="absolute inset-0 hero-noise" />

      {/* Hero content */}
      <div className="relative z-10 flex h-full flex-col justify-end pt-[170px] pb-[140px]">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 flex justify-between items-end">
          
          {/* Main Text Area (Left) */}
          <motion.div 
            className="w-full max-w-[540px]"
            style={{ x: textX, y: textY }}
          >
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={startTrigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 1, delay: baseDelay, ease: EASE }}
              className="mb-8 text-[10px] tracking-[0.5em] text-[color:var(--color-gold)]"
            >
              VADODARA · INDIA · EST. 2014
            </motion.p>

            {/* Headline — single h1 for SEO, styled with spans */}
            <h1 className="font-serif font-light leading-[0.9] text-white text-[64px] md:text-[78px] lg:text-[84px]">
              <div className="overflow-hidden mb-[-12px] md:mb-[-16px]">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 80 }}
                  animate={startTrigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
                  transition={{ duration: 1.2, delay: baseDelay + stagger, ease: EASE }}
                >
                  Every Frame
                </motion.span>
              </div>
              <div className="overflow-hidden mb-[-12px] md:mb-[-16px]">
                <motion.span
                  className="block italic text-[color:var(--color-gold)]"
                  initial={{ opacity: 0, y: 80 }}
                  animate={startTrigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
                  transition={{ duration: 1.2, delay: baseDelay + stagger * 2, ease: EASE }}
                >
                  Tells
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 80 }}
                  animate={startTrigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
                  transition={{ duration: 1.2, delay: baseDelay + stagger * 3, ease: EASE }}
                >
                  A Story.
                </motion.span>
              </div>
            </h1>

            {/* Supporting copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={startTrigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 1, delay: baseDelay + stagger * 4, ease: EASE }}
              className="mt-10 text-[15px] md:text-[18px] leading-[1.7] text-[#e0e0e0] font-light"
            >
              Luxury wedding & event photography crafted with an editorial eye by
              the top professional photography studio in Vadodara, Gujarat.
              We turn fleeting moments into timeless stories.
            </motion.p>

            {/* CTAs */}
            <motion.div
              style={{ x: btnX, y: btnY }}
              initial={{ opacity: 0, y: 16 }}
              animate={startTrigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 1, delay: baseDelay + stagger * 5, ease: EASE }}
              className="mt-12 flex flex-col md:flex-row items-start md:items-center gap-5"
            >
              <button
                onClick={onBookClick}
                data-cursor="book"
                className="flex items-center justify-center rounded-full bg-[color:var(--color-gold)] px-8 py-5 text-[11px] font-medium tracking-[0.3em] text-[#050505] transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:shadow-[0_18px_45px_rgba(200,161,90,0.25)]"
              >
                START YOUR STORY
              </button>
              <a
                href="#portfolio"
                className="flex items-center justify-center rounded-full border border-[color:var(--color-gold)] px-8 py-5 text-[11px] font-medium tracking-[0.3em] text-[color:var(--color-gold)] transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[color:var(--color-gold)] hover:text-[#050505]"
              >
                VIEW PORTFOLIO
              </a>
            </motion.div>
          </motion.div>

          {/* Minimal Floating Stats (Right) - Desktop Only */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={startTrigger ? { opacity: 1, x: 0 } : { opacity: 0, x: 15 }}
            transition={{ duration: 1.2, delay: baseDelay + stagger * 6, ease: EASE }}
            className="hidden lg:flex flex-col gap-12 text-right mb-6"
          >
            {[
              { n: "10+", l: "Years" },
              { n: "500+", l: "Couples" },
              { n: "1000+", l: "Stories" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="font-serif text-[42px] leading-none font-light text-[color:var(--color-gold)]">
                  {s.n}
                </span>
                <span className="text-[11px] tracking-[0.1em] text-white font-medium uppercase mt-2">
                  {s.l}
                </span>
              </div>
            ))}
          </motion.div>
          
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={startTrigger ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: baseDelay + stagger * 7, duration: 1.2, ease: EASE }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4"
      >
        <span className="text-[8px] font-semibold tracking-[0.4em] text-white/50">SCROLL</span>
        <div className="relative h-14 w-[1px] bg-white/10 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-[40%] bg-[color:var(--color-gold)]"
            animate={{ y: ["-100%", "250%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
