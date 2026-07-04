import { motion } from "framer-motion";
import { staggerContainer, staggerItem, LUXURY_EASE } from "@/animations/hero";

interface BookingCTAProps {
  onBookClick: () => void;
}

export function BookingCTA({ onBookClick }: BookingCTAProps) {
  return (
    <section
      id="booking-cta"
      className="relative bg-moving-dark overflow-hidden py-32 md:py-44"
    >
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(200,155,60,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Decorative lines */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-gold)]/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-gold)]/30 to-transparent" />

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
          {["Let's Tell", "Your Story."].map((line, i) => (
            <div key={i} className="overflow-hidden py-1">
              <motion.h2
                variants={staggerItem}
                className={`font-serif font-light leading-[1.0] text-white ${
                  i === 0
                    ? "text-[52px] md:text-[80px] lg:text-[96px]"
                    : "text-[42px] md:text-[64px] lg:text-[76px] text-[color:var(--color-gold)] mt-2"
                }`}
                style={i === 1 ? { fontFamily: "Great Vibes, cursive", fontStyle: "normal" } : {}}
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
          className="mt-8 text-[13px] leading-[2] text-white/50 max-w-md mx-auto"
        >
          Your wedding is a once-in-a-lifetime story. Let us be there to capture
          every chapter — beautifully, timelessly, and with heart.
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
            className="book-cta inline-flex items-center bg-[color:var(--color-gold)] px-10 py-4 text-[11px] tracking-[0.3em] text-[color:var(--color-ink)] font-semibold hover:bg-[color:var(--color-gold-soft)] hover:shadow-[0_0_30px_rgba(200,155,60,0.4)] transition-all duration-400"
          >
            BOOK YOUR WEDDING
          </button>

          <a
            href="https://wa.me/919998665014?text=Hi%20Vinit%20Patel%20Photography%20Studio!%20I'd%20like%20to%20discuss%20capturing%20my%20wedding."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/20 px-8 py-4 text-[11px] tracking-[0.3em] text-white/70 hover:border-[#25D366] hover:text-[#25D366] transition-colors duration-300"
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
            className="text-[color:var(--color-gold)]/60 text-[28px]"
            style={{ fontFamily: "Great Vibes, cursive" }}
          >
            Vinit Patel
          </span>
          <span className="h-px w-16 bg-[color:var(--color-gold)]/30" />
        </motion.div>
      </div>
    </section>
  );
}
