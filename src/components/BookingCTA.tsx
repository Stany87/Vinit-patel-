import { motion } from "framer-motion";
import { staggerContainer, staggerItem, LUXURY_EASE } from "@/animations/hero";

interface BookingCTAProps {
  onBookClick: () => void;
}

export function BookingCTA({ onBookClick }: BookingCTAProps) {
  return (
    <section
      id="booking-cta"
      className="relative overflow-hidden py-32 md:py-44"
      style={{ background: "linear-gradient(180deg, #f8f7f3 0%, #f5f2ea 30%, #f0ede5 60%, #f8f7f3 100%)" }}
    >
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(200,155,60,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Decorative lines */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-gold)]/25 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-gold)]/25 to-transparent" />

      <div className="relative mx-auto max-w-[900px] px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          className="text-[10px] tracking-[0.5em] text-[color:var(--color-gold)]"
        >
          LET'S BEGIN
        </motion.p>

        {/* Editorial headline with line breaks */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-6"
        >
          {["Ready to save", "the date?"].map((line, i) => (
            <div key={i} className="overflow-hidden py-1">
              <motion.h2
                variants={staggerItem}
                className={`font-light leading-[1.0] ${i === 0
                  ? "font-serif text-[38px] sm:text-[52px] md:text-[80px] lg:text-[96px] text-[color:var(--color-ink)]"
                  : "font-edwardian text-[40px] sm:text-[52px] md:text-[74px] lg:text-[88px] text-[color:var(--color-gold)] mt-2"
                  }`}
              >
                {line}
              </motion.h2>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: LUXURY_EASE }}
          className="mt-8 text-[13px] leading-[2] text-[color:var(--color-ink)]/45 max-w-md mx-auto"
        >
          Every couple is different, and we'd love to hear all about what you're planning. Let’s sit down, grab some chai, and chat about how we can tell your story.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7, ease: LUXURY_EASE }}
          className="mt-12 flex flex-wrap items-center justify-center gap-5"
        >
          <button
            onClick={onBookClick}
            data-cursor="book"
            className="book-cta inline-flex items-center bg-[color:var(--color-gold)] px-10 py-4 text-[11px] tracking-[0.3em] text-[color:var(--color-ink)] font-semibold hover:bg-[color:var(--color-gold-soft)] hover:shadow-[0_0_30px_rgba(200,155,60,0.35)] transition-all duration-400"
          >
            SAY HELLO
          </button>
          <a
            href="https://wa.me/919998665614?text=Hi%20Vinit%20Patel%20Photography!%20I'd%20like%20to%20discuss%20capturing%20my%20wedding."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[color:var(--color-ink)]/15 px-8 py-4 text-[11px] tracking-[0.3em] text-[color:var(--color-ink)]/50 hover:border-[#25D366] hover:text-[#25D366] transition-colors duration-300"
          >
            CHAT ON WHATSAPP
          </a>
        </motion.div>

        {/* Elegant divider ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease: LUXURY_EASE }}
          className="mt-16 flex items-center justify-center gap-4 origin-center"
        >
          <span className="h-px w-16 bg-[color:var(--color-gold)]/30" />
          <span
            className="text-[color:var(--color-gold)]/60 text-[28px] font-edwardian"
          >
            Vinit Patel
          </span>
          <span className="h-px w-16 bg-[color:var(--color-gold)]/30" />
        </motion.div>
      </div>
    </section>
  );
}
