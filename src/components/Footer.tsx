import { Facebook, Instagram, Youtube, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import collage from "@/assets/collage.jpg";

const NAV_ITEMS = [
  "Home", "About", "Services", "Portfolio", "Packages", "Testimonials", "Contact",
];

function Logo() {
  return (
    <div className="flex flex-col leading-none">
      <span
        className="text-[28px] md:text-[32px] text-[color:var(--color-gold)]"
        style={{ fontFamily: "Great Vibes, cursive" }}
      >
        Vinit Patel
      </span>
      <span className="mt-0.5 text-[9px] md:text-[10px] tracking-[0.35em] text-white/60">
        PHOTOGRAPHY STUDIO
      </span>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative bg-[color:var(--color-ink)] pt-20 pb-6 overflow-hidden">
      {/* Top gold rule */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-gold)]/40 to-transparent" />

      <div className="mx-auto grid max-w-[1300px] grid-cols-1 md:grid-cols-4 gap-10 px-6 md:px-12">
        {/* Brand column */}
        <div>
          <Logo />
          <div className="mt-6 h-px w-12 bg-[color:var(--color-gold)]/50" />
          <p className="mt-6 text-[12px] leading-[2] text-white/55 max-w-xs">
            We don't just take pictures — we capture feelings, moments, and
            memories for a lifetime.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Facebook, href: "#", label: "Facebook" },
              { Icon: Instagram, href: "#", label: "Instagram" },
              { Icon: Youtube, href: "#", label: "YouTube" },
              { Icon: MessageCircle, href: "https://wa.me/919998665014", label: "WhatsApp" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-gold)]/50 text-[color:var(--color-gold)] hover:bg-[color:var(--color-gold)] hover:text-[color:var(--color-ink)] hover:border-[color:var(--color-gold)] transition-all duration-300 hover:scale-110"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[11px] tracking-[0.3em] text-[color:var(--color-gold)]">GET IN TOUCH</h3>
          <div className="mt-4 h-px w-10 bg-[color:var(--color-gold)]/50" />
          <ul className="mt-6 space-y-4 text-[12px] text-white/65">
            <li>
              <a
                href="tel:+919998665014"
                className="flex items-center gap-3 hover:text-[color:var(--color-gold)] transition-colors"
              >
                <Phone size={13} className="shrink-0 text-[color:var(--color-gold)]" />
                +91 99986 65014
              </a>
            </li>
            <li>
              <a
                href="mailto:vinitpatel0092@gmail.com"
                className="flex items-center gap-3 hover:text-[color:var(--color-gold)] transition-colors"
              >
                <Mail size={13} className="shrink-0 text-[color:var(--color-gold)]" />
                vinitpatel0092@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={13} className="shrink-0 text-[color:var(--color-gold)] mt-0.5" />
              <span>
                28, Muktanand Soc,<br />
                Karelibaug, Vadodara — 390018
              </span>
            </li>
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-[11px] tracking-[0.3em] text-[color:var(--color-gold)]">QUICK LINKS</h3>
          <div className="mt-4 h-px w-10 bg-[color:var(--color-gold)]/50" />
          <ul className="mt-6 space-y-3 text-[12px] tracking-[0.2em] text-white/55">
            {NAV_ITEMS.map((n) => (
              <li key={n}>
                <a
                  href={`#${n.toLowerCase()}`}
                  className="hover:text-[color:var(--color-gold)] transition-colors"
                >
                  {n.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Collage image */}
        <div className="relative flex items-start justify-center md:justify-end">
          <div className="relative">
            <img
              src={collage}
              alt="A collage of our photography moments"
              loading="lazy"
              className="w-full max-w-[240px] rotate-[2.5deg] opacity-75 hover:opacity-100 hover:rotate-0 transition-all duration-700"
            />
            <div className="absolute inset-0 ring-1 ring-[color:var(--color-gold)]/20 rotate-[2.5deg] hover:rotate-0 transition-transform duration-700" />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto mt-16 max-w-[1300px] border-t border-white/8 px-6 md:px-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-white/30">
        <span>© {year} Vinit Patel Photography Studio. All Rights Reserved.</span>
        <span className="tracking-[0.2em]">VADODARA · GUJARAT · INDIA</span>
      </div>
    </footer>
  );
}
