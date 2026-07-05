import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/", isRoute: true },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "/gallery", isRoute: true },
  { label: "Packages", href: "#packages" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

function Logo({ light = true }: { light?: boolean }) {
  return (
    <div className="flex flex-col leading-none">
      <span
        className="text-[22px] md:text-[26px] text-[color:var(--color-gold)]"
        style={{ fontFamily: "Great Vibes, cursive" }}
      >
        Vinit Patel
      </span>
      <span
        className={`mt-0.5 text-[7px] md:text-[8px] tracking-[0.35em] ${light ? "text-white/80" : "text-[color:var(--color-ink)]"}`}
      >
        PHOTOGRAPHY STUDIO
      </span>
    </div>
  );
}

interface NavbarProps {
  onBookClick: () => void;
}

export function Navbar({ onBookClick }: NavbarProps) {
  const [scrollState, setScrollState] = useState<0 | 1 | 2 | 3>(0);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll state detection
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 30) setScrollState(0);
      else if (y < 150) setScrollState(1);
      else if (y < 400) setScrollState(2);
      else setScrollState(3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sections = NAV_ITEMS
      .filter((n) => n.href.startsWith("#"))
      .map((n) => document.querySelector(n.href) as HTMLElement | null)
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((s) => observerRef.current?.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  const navBg = [
    "bg-transparent py-6 border-b border-transparent",
    "bg-[rgba(7,7,7,0.12)] backdrop-blur-[32px] border-b border-[rgba(255,255,255,0.05)] py-4",
    "bg-[rgba(7,7,7,0.12)] backdrop-blur-[32px] border-b border-[rgba(255,255,255,0.05)] py-3",
    "bg-[rgba(7,7,7,0.12)] backdrop-blur-[32px] border-b border-[rgba(255,255,255,0.05)] py-2",
  ][scrollState];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${navBg}`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12 relative">
          <Link to="/" aria-label="Vinit Patel Photography Studio home">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-12 absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = !('isRoute' in item) && activeSection === item.href.slice(1);
              const cls = `relative group text-[13px] font-medium tracking-[0.25em] text-white/85 hover:text-[color:var(--color-gold)] transition-colors duration-300`;
              const underline = <span className={`absolute -bottom-1.5 left-0 right-0 h-[1px] bg-[color:var(--color-gold)] origin-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />;

              if ('isRoute' in item && item.isRoute) {
                return (
                  <Link key={item.label} to={item.href} className={cls}>
                    {item.label.toUpperCase()}
                    {underline}
                  </Link>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={cls}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label.toUpperCase()}
                  {underline}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={onBookClick}
              data-cursor="book"
              className="book-cta hidden md:inline-flex items-center bg-[color:var(--color-gold)] px-6 py-3 text-[11px] tracking-[0.3em] text-[color:var(--color-ink)] font-semibold hover:bg-[color:var(--color-gold-soft)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(200,155,60,0.35)]"
            >
              BOOK NOW
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-white p-1"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-40 bg-[color:var(--color-ink)]/97 backdrop-blur-lg pt-24 pb-10 px-8"
          >
            <nav className="flex flex-col gap-6">
              {NAV_ITEMS.map((item) => {
                if ('isRoute' in item && item.isRoute) {
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-[14px] tracking-[0.3em] text-white/85 hover:text-[color:var(--color-gold)] transition-colors"
                    >
                      {item.label.toUpperCase()}
                    </Link>
                  );
                }
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-[14px] tracking-[0.3em] text-white/85 hover:text-[color:var(--color-gold)] transition-colors"
                  >
                    {item.label.toUpperCase()}
                  </a>
                );
              })}
              <button
                onClick={() => { setMobileOpen(false); onBookClick(); }}
                className="mt-4 inline-flex items-center justify-center bg-[color:var(--color-gold)] px-6 py-3 text-[11px] tracking-[0.3em] text-[color:var(--color-ink)] font-semibold"
              >
                BOOK NOW
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
