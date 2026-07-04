import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Check } from "lucide-react";
import { fadeUp, staggerContainer } from "@/animations/hero";

const PACKAGES = [
  {
    tier: "Classic",
    tagline: "A beautiful beginning",
    price: "₹25,000",
    duration: "4 Hours Coverage",
    features: [
      "1 Professional Photographer",
      "4 Hours of Coverage",
      "300+ Edited Photos",
      "Online Gallery Access",
      "High-Resolution Downloads",
    ],
    cta: "Book Classic",
  },
  {
    tier: "Royal",
    tagline: "Our most beloved",
    price: "₹45,000",
    duration: "8 Hours Coverage",
    features: [
      "2 Professional Photographers",
      "8 Hours of Coverage",
      "600+ Edited Photos",
      "Cinematic Short Film",
      "Online Gallery Access",
      "Premium Photo Album",
      "Same-Day Sneak Peek",
    ],
    cta: "Book Royal",
    featured: true,
  },
  {
    tier: "Legacy",
    tagline: "The full story",
    price: "₹80,000",
    duration: "Full Day Coverage",
    features: [
      "3 Professional Photographers",
      "Full Day Coverage",
      "1000+ Edited Photos",
      "Cinematic Wedding Film",
      "Luxury Hardbound Album",
      "Pre-Wedding Shoot",
      "Same-Day Sneak Peek",
      "Printed Collage Artwork",
    ],
    cta: "Book Legacy",
  },
];

interface PackagesProps {
  onBookClick: () => void;
}

const getCardVariants = (index: number) => {
  let initialX = 0;
  let initialY = 50;

  if (index === 0) {
    initialX = -80; // Classic slides in from left
  } else if (index === 2) {
    initialX = 80; // Legacy slides in from right
  } else {
    initialY = 80; // Royal slides straight up
  }

  return {
    hidden: { opacity: 0, x: initialX, y: initialY },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
};

interface PackageCardProps {
  pkg: (typeof PACKAGES)[0];
  index: number;
  onBookClick: () => void;
}

function PackageCard({ pkg, index, onBookClick }: PackageCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for 3D tilt
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { damping: 25, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { damping: 25, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={getCardVariants(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative flex flex-col border rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_30px_80px_rgba(200,155,60,0.12)] ${
        pkg.featured
          ? "border-[color:var(--color-gold)] md:-translate-y-5 shadow-[0_20px_60px_rgba(200,155,60,0.15)]"
          : "border-white/10 hover:border-[color:var(--color-gold)]/50"
      }`}
    >
      {/* Card header */}
      <div
        className={`px-8 pt-10 pb-8 border-b ${
          pkg.featured
            ? "border-[color:var(--color-gold)]/30 bg-[color:var(--color-gold)]/5"
            : "border-white/8"
        }`}
        style={{ transform: "translateZ(20px)" }}
      >
        <p className="text-[10px] tracking-[0.4em] text-[color:var(--color-gold)]">
          {pkg.tagline.toUpperCase()}
        </p>
        <h3 className="mt-2 font-serif text-[32px] font-light text-white">
          {pkg.tier}
        </h3>
        <div className="mt-6 flex items-end gap-1">
          <span className="font-serif text-[42px] font-light text-[color:var(--color-gold)] leading-none">
            {pkg.price}
          </span>
        </div>
        <p className="mt-2 text-[11px] tracking-[0.2em] text-white/40">
          {pkg.duration}
        </p>
      </div>

      {/* Features list */}
      <div className="flex-1 px-8 py-8" style={{ transform: "translateZ(15px)" }}>
        <ul className="space-y-4">
          {pkg.features.map((f) => (
            <li key={f} className="flex items-center gap-3">
              <Check
                size={14}
                className="shrink-0 text-[color:var(--color-gold)]"
                strokeWidth={2}
              />
              <span className="text-[13px] text-white/65">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="px-8 pb-10" style={{ transform: "translateZ(20px)" }}>
        <button
          onClick={onBookClick}
          data-cursor="book"
          className={`book-cta w-full py-3.5 text-[11px] tracking-[0.3em] font-medium rounded-xl transition-all duration-300 ${
            pkg.featured
              ? "bg-[color:var(--color-gold)] text-[color:var(--color-ink)] hover:bg-[color:var(--color-gold-soft)] hover:shadow-[0_0_24px_rgba(200,155,60,0.35)]"
              : "border border-[color:var(--color-gold)]/60 text-[color:var(--color-gold)] hover:bg-[color:var(--color-gold)] hover:text-[color:var(--color-ink)]"
          }`}
        >
          {pkg.cta.toUpperCase()}
        </button>
      </div>
    </motion.div>
  );
}

export function Packages({ onBookClick }: PackagesProps) {
  return (
    <section id="packages" className="bg-[color:var(--color-ink)] py-28 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1300px] px-6 md:px-12">
        {/* Header */}
        <div className="text-center">
          <motion.p {...fadeUp} className="text-[10px] tracking-[0.45em] text-[color:var(--color-gold)]">
            INVESTMENT
          </motion.p>
          <motion.h2
            {...fadeUp}
            className="mt-4 font-serif text-[36px] md:text-[48px] font-light text-white"
          >
            Choose Your Experience
          </motion.h2>
          <div className="mx-auto mt-5 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-[color:var(--color-gold)]/60" />
            <span className="text-[color:var(--color-gold)] text-xs">◆</span>
            <span className="h-px w-8 bg-[color:var(--color-gold)]/60" />
          </div>
          <motion.p
            {...fadeUp}
            className="mt-6 text-[13px] leading-[1.9] text-white/50 max-w-md mx-auto"
          >
            Every package is a starting point. We're happy to tailor a bespoke
            experience for your wedding.
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
          style={{ perspective: 1200 }}
        >
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.tier} pkg={pkg} index={i} onBookClick={onBookClick} />
          ))}
        </motion.div>

        <motion.p {...fadeUp} className="mt-10 text-center text-[11px] tracking-[0.2em] text-white/30">
          All prices are starting rates. Custom packages available on request.
        </motion.p>
      </div>
    </section>
  );
}
