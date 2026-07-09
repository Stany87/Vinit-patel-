import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import heroCouple from "@/assets/luxury_hero.png";

interface HeroProps {
  onBookClick: () => void;
  startTrigger: boolean;
}

export function Hero({ onBookClick, startTrigger }: HeroProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);
  
  const localX = useMotionValue(0);
  const localY = useMotionValue(0);

  const mouseXSpring = useSpring(localX, { damping: 30, stiffness: 120 });
  const mouseYSpring = useSpring(localY, { damping: 30, stiffness: 120 });

  // Mouse parallax — only computed on desktop (springs stay at 0 on touch)
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
      onMouseMove={isTouch ? undefined : (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        localX.set((e.clientX - rect.left) / rect.width - 0.5);
        localY.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={isTouch ? undefined : () => {
        localX.set(0);
        localY.set(0);
      }}
      className="relative bg-black overflow-hidden h-screen w-full"
    >
      {/* Background Image Container with Ken Burns */}
      <motion.div
        className="absolute inset-0"
        style={isTouch ? undefined : { x: bgX, y: bgY }}
      >
        <motion.img
          src={heroCouple}
          alt="Luxury wedding photography by Vinit Patel Photography — best professional photographer in Vadodara, Gujarat"
          className="absolute h-[106%] w-[106%] max-w-none -left-[3%] -top-[3%] object-cover object-[82%_20%] md:h-[112%] md:w-[112%] md:max-w-none md:-left-[6%] md:-top-[6%] md:object-center"
          style={{ 
            y: imageScrollY,
            filter: "brightness(0.82) contrast(1.08) saturate(0.92)"
          }}
          initial={isTouch ? undefined : { scale: 1.08 }}
          animate={isTouch ? undefined : { scale: [1.08, 1, 1.08] }}
          transition={isTouch ? undefined : { duration: 35, repeat: Infinity, ease: "linear" }}
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
      <div className="relative z-10 flex h-full flex-col justify-end pt-[130px] pb-[80px] md:pt-[170px] md:pb-[140px]">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 flex justify-between items-end">
          
          {/* Main Text Area (Left) */}
          <motion.div 
            className="w-full max-w-[540px]"
            style={isTouch ? undefined : { x: textX, y: textY }}
          >
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={startTrigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 1, delay: baseDelay, ease: EASE }}
              className="mb-4 md:mb-8 text-[9px] md:text-[10px] tracking-[0.5em] text-[color:var(--color-gold)]"
            >
              CAPTURING LOVE IN GUJARAT & BEYOND
            </motion.p>

            {/* Headline — single h1 for SEO, styled with spans */}
            <h1 className="font-serif font-light leading-[0.95] text-white text-[42px] sm:text-[60px] md:text-[78px] lg:text-[84px]">
              <div className="overflow-hidden mb-[-6px] sm:mb-[-12px] md:mb-[-16px]">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 80 }}
                  animate={startTrigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
                  transition={{ duration: 1.2, delay: baseDelay + stagger, ease: EASE }}
                >
                  Honest,
                </motion.span>
              </div>
              <div className="overflow-hidden mb-[-6px] sm:mb-[-12px] md:mb-[-16px]">
                <motion.span
                  className="block text-[color:var(--color-gold)] font-allura not-italic font-normal"
                  initial={{ opacity: 0, y: 80 }}
                  animate={startTrigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
                  transition={{ duration: 1.2, delay: baseDelay + stagger * 2, ease: EASE }}
                >
                  beautiful
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 80 }}
                  animate={startTrigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
                  transition={{ duration: 1.2, delay: baseDelay + stagger * 3, ease: EASE }}
                >
                  love stories.
                </motion.span>
              </div>
            </h1>

            {/* Supporting copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={startTrigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 1, delay: baseDelay + stagger * 4, ease: EASE }}
              className="mt-6 md:mt-10 text-[14px] md:text-[18px] leading-[1.7] text-[#e0e0e0] font-light font-sans"
            >
              We're a small team of visual storytellers based in Vadodara. We believe the most beautiful photos aren't stiff or forced—they're the quiet, honest moments of connection and the wild, messy laughter in between.
            </motion.p>

            {/* CTAs */}
            <motion.div
              style={isTouch ? undefined : { x: btnX, y: btnY }}
              initial={{ opacity: 0, y: 16 }}
              animate={startTrigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 1, delay: baseDelay + stagger * 5, ease: EASE }}
              className="mt-8 md:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 w-full sm:w-auto"
            >
              <button
                onClick={onBookClick}
                data-cursor="book"
                className="flex items-center justify-center rounded-full bg-[color:var(--color-gold)] px-6 py-4 md:px-8 md:py-5 text-[10px] md:text-[11px] font-medium tracking-[0.3em] text-[#050505] transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:shadow-[0_18px_45px_rgba(200,161,90,0.25)]"
              >
                LET'S CHAT
              </button>
              <a
                href="#portfolio"
                className="flex items-center justify-center rounded-full border border-[color:var(--color-gold)] px-6 py-4 md:px-8 md:py-5 text-[10px] md:text-[11px] font-medium tracking-[0.3em] text-[color:var(--color-gold)] transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[color:var(--color-gold)] hover:text-[#050505]"
              >
                SEE OUR WORK
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
