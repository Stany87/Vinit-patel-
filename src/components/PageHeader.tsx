import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { LUXURY_EASE } from "@/animations/hero";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
  coverImage?: string;
}

export function PageHeader({ title, subtitle, backTo = "/", backLabel = "Back to Home", coverImage }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #f8f7f3 0%, #f0ede5 100%)" }}>
      {/* Cover image hero (if provided) */}
      {coverImage && (
        <div className="absolute inset-0 z-0">
          <img src={coverImage} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f8f7f3]/85 via-[#f8f7f3]/70 to-[#f8f7f3]" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-[1300px] px-6 md:px-12 pt-28 pb-16 md:pt-36 md:pb-20">
        {/* Back navigation */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: LUXURY_EASE }}
        >
          <Link
            to={backTo}
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-[color:var(--color-ink)]/50 hover:text-[color:var(--color-gold)] transition-colors duration-300 mb-8"
          >
            <ArrowLeft size={14} />
            {backLabel.toUpperCase()}
          </Link>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: LUXURY_EASE }}
          className="font-serif text-[40px] md:text-[56px] lg:text-[64px] font-light text-[color:var(--color-ink)] leading-[1.1]"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: LUXURY_EASE }}
            className="mt-5 text-[14px] leading-[1.8] text-[color:var(--color-ink)]/45 max-w-lg"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: LUXURY_EASE }}
          className="mt-8 flex items-center gap-3 origin-left"
        >
          <span className="h-px w-12 bg-[color:var(--color-gold)]/50" />
          <span className="w-1.5 h-1.5 rotate-45 bg-[color:var(--color-gold)]" />
          <span className="h-px w-12 bg-[color:var(--color-gold)]/50" />
        </motion.div>
      </div>
    </section>
  );
}
