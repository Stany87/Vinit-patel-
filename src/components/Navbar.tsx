import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Packages", href: "#packages" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

function Logo({ light = true }: { light?: boolean }) {
  return (
    <div className="flex flex-col leading-none">
      <span
        className="text-[28px] md:text-[32px] text-[color:var(--color-gold)]"
        style={{ fontFamily: "Great Vibes, cursive" }}
      >
        Vinit Patel
      </span>
      <span
        className={`mt-0.5 text-[9px] md:text-[10px] tracking-[0.35em] ${light ? "text-white/80" : "text-[color:var(--color-ink)]"}`}
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
    const sections = NAV_ITEMS.map((n) =>
      document.querySelector(n.href) as HTMLElement | null,
    ).filter(Boolean) as HTMLElement[];

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
    "bg-transparent py-6",
    "bg-[color:var(--color-ink)]/60 backdrop-blur-sm py-4",
    "bg-[color:var(--color-ink)]/80 backdrop-blur-md py-3",
    "bg-[color:var(--color-ink)]/95 backdrop-blur-lg py-2",
  ][scrollState];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${navBg}`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12">
          <a href="#home" aria-label="Vinit Patel Photography Studio home">
            <Logo />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative group text-[11px] tracking-[0.25em] text-white/85 hover:text-[color:var(--color-gold)] transition-colors duration-300"
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label.toUpperCase()}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1.5 left-0 right-0 h-px bg-[color:var(--color-gold)]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </AnimatePresence>
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
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[14px] tracking-[0.3em] text-white/85 hover:text-[color:var(--color-gold)] transition-colors"
                >
                  {item.label.toUpperCase()}
                </a>
              ))}
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
