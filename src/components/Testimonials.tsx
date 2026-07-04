import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote } from "lucide-react";
import { fadeUp } from "@/animations/hero";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";

const TESTIMONIALS = [
  {
    names: "Pratik & Hetal",
    initials: "P&H",
    avatar: p3,
    event: "Wedding · Vadodara",
    text: "Vinit bhai and his team are simply amazing. They made our wedding so special with their creativity and professionalism. Every photo is a masterpiece we will treasure forever.",
  },
  {
    names: "Riddhi & Tejas",
    initials: "R&T",
    avatar: p2,
    event: "Wedding & Sangeet · Surat",
    text: "The pictures are beyond beautiful. Every emotion was captured so perfectly — from our sangeet laughs to our wedding vows. We could not have asked for anyone better.",
  },
  {
    names: "Jinal & Hardik",
    initials: "J&H",
    avatar: p4,
    event: "Baby Shower · Anand",
    text: "A truly wonderful experience. Our baby shower memories are now timeless photographs. Vinit's warmth and attention to detail made us feel completely at ease.",
  },
  {
    names: "Priya & Nikhil",
    initials: "P&N",
    avatar: p5,
    event: "Engagement · Ahmedabad",
    text: "From the moment we met the team we knew we were in the right hands. Our engagement shoot was pure magic — the locations, the light, the editing — all perfect.",
  },
];

export function Testimonials() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the testimonials container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Translate vertical scroll into horizontal movement.
  // Adjust output percentage based on the number of items and their spacing.
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-62%"]);

  return (
    <section
      ref={targetRef}
      id="testimonials"
      className="relative bg-moving-light h-[250vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Header */}
        <div className="text-center shrink-0 mb-12">
          <motion.p {...fadeUp} className="text-[10px] tracking-[0.45em] text-[color:var(--color-gold)]">
            TESTIMONIALS
          </motion.p>
          <motion.h2
            {...fadeUp}
            className="mt-4 font-serif text-[36px] md:text-[48px] font-light text-white"
          >
            What Our Clients Say
          </motion.h2>
          <div className="mx-auto mt-5 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-[color:var(--color-gold)]/60" />
            <span className="text-[color:var(--color-gold)] text-xs">◆</span>
            <span className="h-px w-8 bg-[color:var(--color-gold)]/60" />
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex gap-6 md:gap-8 px-6 md:px-24"
          >
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="w-[85vw] sm:w-[450px] md:w-[500px] shrink-0 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.3)] flex flex-col justify-between hover:border-[color:var(--color-gold)]/40 transition-colors duration-500"
              >
                <div>
                  <Quote
                    className="text-[color:var(--color-gold)] opacity-70"
                    size={32}
                    strokeWidth={1.2}
                  />
                  <p className="mt-6 font-serif text-[16px] md:text-[19px] font-light leading-[1.8] text-white/80 italic">
                    "{t.text}"
                  </p>
                </div>
                
                <div className="mt-8 flex items-center gap-4">
                  {/* Client avatar image */}
                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[color:var(--color-gold)]/30 bg-[color:var(--color-gold)]/5">
                    <img
                      src={t.avatar}
                      alt={t.names}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold tracking-[0.1em] text-white">
                      {t.names}
                    </p>
                    <p className="mt-0.5 text-[10px] tracking-[0.2em] text-white/50">
                      {t.event}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
