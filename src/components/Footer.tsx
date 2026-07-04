import { Facebook, Instagram, Youtube, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import contactBg from "@/assets/contact-bg.png";

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
    <footer id="contact" className="relative bg-moving-dark pt-20 pb-6 overflow-hidden">
      {/* Background Image with opacity */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]">
        <img
          src={contactBg}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-ink)] via-transparent to-[color:var(--color-ink)]" />
      </div>

      {/* Top gold rule */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-gold)]/40 to-transparent z-10" />

      <div className="relative z-10 mx-auto grid max-w-[1300px] grid-cols-1 md:grid-cols-4 gap-10 px-6 md:px-12">
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
              { Icon: Instagram, href: "https://www.instagram.com/vinitpatelphotography", label: "Instagram" },
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

        {/* Map column */}
        <div className="relative flex flex-col items-stretch md:items-end justify-start w-full">
          <div className="w-full max-w-[300px]">
            <h3 className="text-[11px] tracking-[0.3em] text-[color:var(--color-gold)]">OUR STUDIO</h3>
            <div className="mt-4 h-px w-10 bg-[color:var(--color-gold)]/50 mb-6" />
            <div className="relative overflow-hidden rounded-xl border border-[color:var(--color-gold)]/20 shadow-lg bg-black/40 p-1">
              <iframe
                title="Vinit Patel Photography Studio Location Map"
                src="https://maps.google.com/maps?q=Vinit%20Patel%20Photography%20Vadodara&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="190"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="mt-3 flex justify-start md:justify-end">
              <a
                href="https://www.google.com/maps/place/Vinit+Patel+Photography/@22.3506765,73.1983352,17z/data=!3m1!4b1!4m6!3m5!1s0x395fcf66dcdc945d:0x2f534017f299bebb!8m2!3d22.3506765!4d73.2009101!16s%2Fg%2F11rf843d4h?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] text-[color:var(--color-gold)] hover:text-white transition-colors"
              >
                OPEN IN GOOGLE MAPS →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 mx-auto mt-16 max-w-[1300px] border-t border-white/8 px-6 md:px-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-white/30">
        <span>© {year} Vinit Patel Photography Studio. All Rights Reserved.</span>
        <span className="tracking-[0.2em]">VADODARA · GUJARAT · INDIA</span>
      </div>
    </footer>
  );
}
