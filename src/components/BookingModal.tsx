import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { LUXURY_EASE } from "@/animations/hero";

const EVENT_TYPES = [
  "Wedding",
  "Sangeet",
  "Haldi",
  "Engagement",
  "Baby Shower",
  "Couple Shoot",
  "Other",
];

const BUDGETS = [
  "Under ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "Above ₹1,00,000",
  "Custom / Unsure",
];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  eventType: string;
  date: string;
  location: string;
  budget: string;
  phone: string;
  message: string;
}

const INITIAL: FormState = {
  eventType: "",
  date: "",
  location: "",
  budget: "",
  phone: "",
  message: "",
};

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, wire up email/form service here
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setSubmitted(false);
    setForm(INITIAL);
  };

  const waMessage = encodeURIComponent(
    `Hi Vinit Patel Photography Studio! I'm interested in booking for ${form.eventType || "my event"} on ${form.date || "TBD"} in ${form.location || "TBD"}.`,
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
          style={{ backgroundColor: "rgba(5,5,5,0.90)", backdropFilter: "blur(16px)" }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.45, ease: LUXURY_EASE }}
            className="relative w-full max-w-xl bg-[color:var(--color-ink)] border border-white/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Book a photography session"
          >
            {/* Gold top bar */}
            <div className="h-0.5 bg-gradient-to-r from-transparent via-[color:var(--color-gold)] to-transparent" />

            {/* Header */}
            <div className="flex items-start justify-between px-8 pt-8 pb-6 border-b border-white/8">
              <div>
                <p className="text-[10px] tracking-[0.4em] text-[color:var(--color-gold)]">
                  START YOUR JOURNEY
                </p>
                <h2 className="mt-2 font-serif text-[28px] font-light text-white">
                  Book a Session
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/60 hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold)] transition-colors"
                aria-label="Close booking modal"
              >
                <X size={15} />
              </button>
            </div>

            {/* Body */}
            <div className="px-8 py-8 max-h-[70vh] overflow-y-auto">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[color:var(--color-gold)] text-[color:var(--color-gold)]">
                    <span className="text-2xl" style={{ fontFamily: "Great Vibes, cursive" }}>✓</span>
                  </div>
                  <h3 className="font-serif text-[22px] text-white font-light">
                    Thank You!
                  </h3>
                  <p className="mt-3 text-[13px] text-white/55 leading-[1.8]">
                    We've received your enquiry and will get back to you within
                    24 hours. We can't wait to capture your story.
                  </p>
                  <a
                    href={`https://wa.me/919998665014?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 bg-[#25D366] px-6 py-3 text-[11px] tracking-[0.2em] text-white hover:bg-[#20bd5a] transition-colors"
                  >
                    ALSO CHAT ON WHATSAPP
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Event Type */}
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] text-white/50 mb-2">
                      EVENT TYPE
                    </label>
                    <div className="relative">
                      <select
                        value={form.eventType}
                        onChange={set("eventType")}
                        required
                        className="w-full appearance-none bg-white/5 border border-white/10 px-4 py-3 text-[13px] text-white focus:border-[color:var(--color-gold)] focus:outline-none transition-colors"
                      >
                        <option value="" disabled className="bg-[#0b0b0b]">Select event type</option>
                        {EVENT_TYPES.map((t) => (
                          <option key={t} value={t} className="bg-[#0b0b0b]">{t}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                    </div>
                  </div>

                  {/* Date & Location */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] tracking-[0.3em] text-white/50 mb-2">
                        DATE
                      </label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={set("date")}
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-[13px] text-white focus:border-[color:var(--color-gold)] focus:outline-none transition-colors"
                        style={{ colorScheme: "dark" }}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.3em] text-white/50 mb-2">
                        LOCATION
                      </label>
                      <input
                        type="text"
                        value={form.location}
                        onChange={set("location")}
                        placeholder="City / Venue"
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-[13px] text-white placeholder-white/25 focus:border-[color:var(--color-gold)] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] text-white/50 mb-2">
                      BUDGET RANGE
                    </label>
                    <div className="relative">
                      <select
                        value={form.budget}
                        onChange={set("budget")}
                        className="w-full appearance-none bg-white/5 border border-white/10 px-4 py-3 text-[13px] text-white focus:border-[color:var(--color-gold)] focus:outline-none transition-colors"
                      >
                        <option value="" className="bg-[#0b0b0b]">Select budget range</option>
                        {BUDGETS.map((b) => (
                          <option key={b} value={b} className="bg-[#0b0b0b]">{b}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] text-white/50 mb-2">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="+91 00000 00000"
                      required
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-[13px] text-white placeholder-white/25 focus:border-[color:var(--color-gold)] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] text-white/50 mb-2">
                      MESSAGE
                    </label>
                    <textarea
                      value={form.message}
                      onChange={set("message")}
                      rows={3}
                      placeholder="Tell us about your special day..."
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-[13px] text-white placeholder-white/25 focus:border-[color:var(--color-gold)] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-[color:var(--color-gold)] py-4 text-[11px] tracking-[0.3em] text-[color:var(--color-ink)] font-semibold hover:bg-[color:var(--color-gold-soft)] hover:shadow-[0_0_24px_rgba(200,155,60,0.35)] transition-all duration-300"
                  >
                    SEND ENQUIRY
                  </button>

                  {/* Alternative CTAs */}
                  <div className="flex items-center gap-4 pt-2">
                    <a
                      href={`https://wa.me/919998665014?text=${waMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 border border-white/15 py-3 text-[11px] tracking-[0.2em] text-white/70 hover:border-[#25D366] hover:text-[#25D366] transition-colors"
                    >
                      WHATSAPP
                    </a>
                    <a
                      href="mailto:vinitpatel0092@gmail.com"
                      className="flex-1 flex items-center justify-center border border-white/15 py-3 text-[11px] tracking-[0.2em] text-white/70 hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold)] transition-colors"
                    >
                      EMAIL US
                    </a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
