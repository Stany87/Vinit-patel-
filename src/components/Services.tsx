import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Music, Baby, ArrowRight } from "lucide-react";
import { fadeUp, LUXURY_EASE } from "@/animations/hero";
import svcWedding from "@/assets/service-wedding.jpg";
import svcSangeet from "@/assets/service-sangeet.jpg";
import svcBaby from "@/assets/service-baby.jpg";

const SERVICES = [
  {
    img: svcWedding,
    icon: Heart,
    eyebrow: "01 — WEDDING",
    title: "Wedding\nPhotography",
    desc: "From intimate ceremonies to grand celebrations, we capture every emotion and fleeting detail with an editorial, luxury eye. Your wedding story, told beautifully.",
    cta: "View Wedding Gallery",
  },
  {
    img: svcSangeet,
    icon: Music,
    eyebrow: "02 — SANGEET",
    title: "Sangeet\nPhotography",
    desc: "Music, dance, colour and the joy of coming together. We document the energy and emotion of your sangeet night in frames that feel alive.",
    cta: "View Sangeet Gallery",
    reverse: true,
  },
  {
    img: svcBaby,
    icon: Baby,
    eyebrow: "03 — BABY SHOWER",
    title: "Baby Shower\nPhotoshoot",
    desc: "Celebrating new beginnings with softness, warmth and heartwarming moments. A photoshoot as gentle and joyful as the occasion itself.",
    cta: "View Baby Shower Gallery",
  },
];

function ServicePanel({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const reverse = service.reverse;

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-0 md:gap-0`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: LUXURY_EASE }}
    >
      {/* Image block */}
      <div className="relative w-full md:w-[58%] overflow-hidden aspect-[4/3] md:aspect-auto md:h-[580px]">
        <motion.img
          src={service.img}
          alt={service.title.replace("\n", " ")}
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ y: imageY }}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          data-cursor="view"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-[color:var(--color-ink)]/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Text block */}
      <div
        className={`w-full md:w-[42%] bg-[color:var(--color-cream)] flex flex-col justify-center px-8 md:px-14 py-16 md:py-0 md:h-[580px] ${
          reverse ? "md:items-end md:text-right" : ""
        }`}
      >
        <motion.p
          {...fadeUp}
          className="text-[10px] tracking-[0.45em] text-[color:var(--color-gold)]"
        >
          {service.eyebrow}
        </motion.p>

        <motion.h2
          {...fadeUp}
          className="mt-4 font-serif text-[36px] md:text-[44px] font-light leading-[1.1] text-[color:var(--color-ink)] whitespace-pre-line"
        >
          {service.title}
        </motion.h2>

        <motion.div
          {...fadeUp}
          className={`mt-4 h-px w-10 bg-[color:var(--color-gold)]/50 ${reverse ? "ml-auto" : ""}`}
        />

        <motion.p
          {...fadeUp}
          className="mt-7 text-[13px] leading-[2] text-[color:var(--color-ink)]/60 max-w-[300px]"
        >
          {service.desc}
        </motion.p>

        <motion.a
          {...fadeUp}
          href="#portfolio"
          className={`mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[color:var(--color-gold)] hover:gap-4 transition-all duration-300 ${reverse ? "ml-auto" : ""}`}
        >
          {service.cta.toUpperCase()} <ArrowRight size={14} />
        </motion.a>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-[color:var(--color-cream)]">
      {/* Section header */}
      <div className="py-20 md:py-28 text-center px-6">
        <motion.p {...fadeUp} className="text-[10px] tracking-[0.45em] text-[color:var(--color-gold)]">
          OUR SERVICES
        </motion.p>
        <motion.h2
          {...fadeUp}
          className="mt-4 font-serif text-[36px] md:text-[48px] font-light text-[color:var(--color-ink)]"
        >
          We Capture Every Special Moment
        </motion.h2>
        <div className="mx-auto mt-5 flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-[color:var(--color-gold)]/60" />
          <span className="text-[color:var(--color-gold)] text-xs">◆</span>
          <span className="h-px w-8 bg-[color:var(--color-gold)]/60" />
        </div>
      </div>

      {/* Alternating editorial panels */}
      <div className="border-t border-[color:var(--color-ink)]/8">
        {SERVICES.map((s, i) => (
          <div key={s.eyebrow} className={i < SERVICES.length - 1 ? "border-b border-[color:var(--color-ink)]/8" : ""}>
            <ServicePanel service={s} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
