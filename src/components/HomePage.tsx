import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  Camera,
  Sparkles,
  UserRound,
  Music,
  Baby,
  Heart,
  Quote,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import heroCouple from "@/assets/hero-couple.jpg";
import founder from "@/assets/founder.jpg";
import svcWedding from "@/assets/service-wedding.jpg";
import svcSangeet from "@/assets/service-sangeet.jpg";
import svcBaby from "@/assets/service-baby.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";
import p9 from "@/assets/p9.jpg";
import collage from "@/assets/collage.jpg";

const NAV = ["Home", "About", "Services", "Portfolio", "Packages", "Testimonials", "Contact"];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

function Logo({ light = true }: { light?: boolean }) {
  return (
    <div className="flex flex-col leading-none">
      <span
        className="font-script text-[28px] md:text-[32px] text-[color:var(--color-gold)]"
        style={{ fontFamily: "Great Vibes, cursive" }}
      >
        Vinit Patel
      </span>
      <span
        className={`mt-1 text-[9px] md:text-[10px] tracking-[0.35em] ${light ? "text-white" : "text-[color:var(--color-ink)]"}`}
      >
        PHOTOGRAPHY STUDIO
      </span>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[color:var(--color-ink)]/85 backdrop-blur-md py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12">
        <Logo />
        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setActive(item)}
              className="group relative text-[11px] tracking-[0.25em] text-white/90 hover:text-[color:var(--color-gold)] transition-colors"
            >
              {item.toUpperCase()}
              <span
                className={`absolute -bottom-2 left-1/2 h-px bg-[color:var(--color-gold)] transition-all duration-300 ${
                  active === item ? "w-6 -translate-x-1/2" : "w-0 group-hover:w-6 -translate-x-1/2"
                }`}
              />
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center bg-[color:var(--color-gold)] px-6 py-3 text-[11px] tracking-[0.3em] text-[color:var(--color-ink)] font-medium hover:bg-[color:var(--color-gold-soft)] transition-colors"
        >
          BOOK NOW
        </a>
      </div>
    </header>
  );
}

function Blade({ index, alpha }: { index: number; alpha: MotionValue<number> }) {
  const gRef = useRef<SVGGElement>(null);
  const N = 8;
  const R = 100;
  const bladeAngle = 360 / N;  // 45° per blade
  const baseDeg = index * bladeAngle;
  const rad = ((baseDeg - 90) * Math.PI) / 180;
  const px = 100 + R * Math.cos(rad);
  const py = 100 + R * Math.sin(rad);

  // Blade shape: wider than the sector angle so adjacent blades overlap when closed
  const OVERLAP = 1.5; // 50% wider than the sector
  const nextRad = (bladeAngle * OVERLAP * Math.PI) / 180;
  const nx = R * Math.sin(nextRad);
  const ny = R * (1 - Math.cos(nextRad));
  const farR = R * 1.1;

  // Curved outer edge for a metallic look
  const cx = nx * 0.45 + 10;
  const cy = (ny + farR) * 0.5 - 8;

  const path = `M 0 0 L ${nx.toFixed(2)} ${ny.toFixed(2)} Q ${cx.toFixed(2)} ${cy.toFixed(2)} 0 ${farR.toFixed(2)} Z`;

  // Imperatively update the SVG transform attribute — this is the only reliable way
  useEffect(() => {
    const unsubscribe = alpha.on("change", (a) => {
      if (gRef.current) {
        gRef.current.setAttribute("transform", `translate(${px} ${py}) rotate(${baseDeg + a})`);
      }
    });
    // Set initial value
    if (gRef.current) {
      gRef.current.setAttribute("transform", `translate(${px} ${py}) rotate(${baseDeg + alpha.get()})`);
    }
    return unsubscribe;
  }, [alpha, px, py, baseDeg]);

  return (
    <g ref={gRef}>
      <path d={path} fill={`url(#bladeGrad${index % 2})`} stroke="#0a0a0a" strokeWidth="0.4" />
      <path d={`M 0 0 L ${nx.toFixed(2)} ${ny.toFixed(2)}`} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" fill="none" />
    </g>
  );
}

function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });

  // Blades: start tightly closed (negative = extra overlap), open as user scrolls
  const alpha = useTransform(scrollYProgress, [0, 0.85], [-10, 90]);

  // Overlay text fades in as shutter finishes opening
  const textOpacity = useTransform(scrollYProgress, [0.55, 0.9], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.55, 0.9], [30, 0]);
  // Initial copy (right of aperture) fades away as we scroll
  const initialOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  // Vignette darkens slightly when fully open so text is readable
  const vignette = useTransform(scrollYProgress, [0.6, 1], [0, 0.55]);
  // Shutter overlay fades out completely once fully open
  const shutterOpacity = useTransform(scrollYProgress, [0.75, 0.95], [1, 0]);

  return (
    <section
      id="home"
      ref={wrapRef}
      className="relative bg-[color:var(--color-ink)]"
      style={{ height: "260vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Full-screen photo behind the shutter — static */}
        <img
          src={heroCouple}
          alt="Wedding couple"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Darkening vignette that fades in once shutter is open */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: vignette,
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.85) 95%)",
          }}
        />

        {/* TEMPORARILY REMOVED — Camera shutter overlay
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1, opacity: shutterOpacity }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "max(100vw, 100vh)",
              height: "max(100vw, 100vh)",
              borderRadius: "50%",
              boxShadow: "0 0 0 9999px #0a0a0a, inset 0 0 80px 20px rgba(0,0,0,0.6)",
              border: "2px solid #1a1a1a",
            }}
          />
          <svg
            viewBox="0 0 200 200"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="bladeGrad0" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2a2a2a" />
                <stop offset="50%" stopColor="#141414" />
                <stop offset="100%" stopColor="#0a0a0a" />
              </linearGradient>
              <linearGradient id="bladeGrad1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#222" />
                <stop offset="50%" stopColor="#111" />
                <stop offset="100%" stopColor="#080808" />
              </linearGradient>
            </defs>
            {Array.from({ length: 8 }).map((_, i) => (
              <Blade key={i} index={i} alpha={alpha} />
            ))}
          </svg>
        </motion.div>
        */}

        {/* Initial hero copy — visible before the reveal */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 flex items-center"
          style={{ opacity: initialOpacity }}
        >
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 lg:grid-cols-[1fr_1.1fr_0.4fr] items-center gap-12 px-6 md:px-12">
            <div className="pointer-events-auto max-w-md">
              <p className="mb-6 text-[10px] tracking-[0.4em] text-[color:var(--color-gold)]">
                CAPTURING MOMENTS
              </p>
              <h1 className="font-serif text-white text-[54px] md:text-[64px] leading-[1.05] font-light">
                Creating
                <br />
                <span
                  className="italic text-[color:var(--color-gold)]"
                  style={{ fontFamily: "Great Vibes, cursive", fontSize: "1.15em", fontStyle: "normal" }}
                >
                  Memories
                </span>
                <br />
                That Last Forever.
              </h1>
              <p className="mt-8 text-[10px] tracking-[0.35em] text-white/60">
                SCROLL TO OPEN THE SHUTTER ↓
              </p>
            </div>

            <div />

            <div className="pointer-events-auto flex flex-col gap-10 text-right lg:pl-6">
              {[
                { n: "10+", l: "YEARS OF\nEXPERIENCE" },
                { n: "500+", l: "HAPPY\nCLIENTS" },
                { n: "1000+", l: "MEMORIES\nCAPTURED" },
              ].map((s, i) => (
                <div key={i} className="relative">
                  <div className="font-serif text-[color:var(--color-gold)] text-[38px] md:text-[42px] font-light leading-none">
                    {s.n}
                  </div>
                  <div className="mt-3 text-[9px] tracking-[0.3em] text-white/80 whitespace-pre-line">
                    {s.l}
                  </div>
                  {i < 2 && (
                    <div className="mx-auto mt-8 h-px w-16 bg-[color:var(--color-gold)]/50 ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Final hero copy — appears once the aperture is fully open, photo is bg */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 flex items-end pb-24 md:pb-32"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
            <p className="mb-4 text-[10px] tracking-[0.4em] text-[color:var(--color-gold)]">
              VINIT PATEL PHOTOGRAPHY STUDIO
            </p>
            <h2 className="font-serif text-white text-[44px] md:text-[64px] leading-[1.05] font-light max-w-3xl">
              Creating{" "}
              <span
                className="text-[color:var(--color-gold)]"
                style={{ fontFamily: "Great Vibes, cursive", fontStyle: "normal" }}
              >
                Memories
              </span>{" "}
              That Last Forever.
            </h2>
            <a
              href="#contact"
              className="pointer-events-auto mt-8 inline-flex items-center border border-[color:var(--color-gold)] px-8 py-4 text-[11px] tracking-[0.3em] text-white hover:bg-[color:var(--color-gold)] hover:text-[color:var(--color-ink)] transition-all"
            >
              BOOK YOUR SHOOT
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  const features = [
    { icon: Sparkles, title: "CREATIVE VISION", desc: "Unique angles, timeless edits and storytelling approach." },
    { icon: Camera, title: "PROFESSIONAL GEAR", desc: "We use the latest equipment for perfect results." },
    { icon: UserRound, title: "CLIENT FOCUSED", desc: "Your comfort and happiness is our top priority." },
  ];
  return (
    <section id="about" className="bg-[color:var(--color-cream)] py-24 md:py-32">
      <div className="mx-auto grid max-w-[1300px] grid-cols-1 md:grid-cols-3 items-center gap-12 px-6 md:px-12">
        <motion.div {...fadeUp}>
          <h3
            className="font-script text-[color:var(--color-gold)] text-[44px] leading-none"
            style={{ fontFamily: "Great Vibes, cursive" }}
          >
            Vinit Patel
          </h3>
          <p className="mt-3 text-[10px] tracking-[0.35em] text-[color:var(--color-ink)]/70">
            FOUNDER &amp; PHOTOGRAPHER
          </p>
          <p className="mt-8 text-[13px] leading-[1.9] text-[color:var(--color-ink)]/70 max-w-xs">
            Photography for me is not just clicking pictures, it's about capturing emotions, connections and beautiful moments that you will cherish forever. At Vinit Patel Photography Studio, we turn your special moments into timeless stories.
          </p>
          <div
            className="mt-10 text-[32px] text-[color:var(--color-ink)]"
            style={{ fontFamily: "Great Vibes, cursive" }}
          >
            Vinit Patel
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="relative flex justify-center">
          <div className="absolute inset-4 border border-[color:var(--color-gold)] translate-x-3 translate-y-3" />
          <img
            src={founder}
            alt="Vinit Patel"
            className="relative w-full max-w-[340px] object-cover"
          />
        </motion.div>

        <motion.div {...fadeUp} className="flex flex-col gap-8">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-gold)] text-[color:var(--color-gold)]">
                <f.icon size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-[12px] tracking-[0.3em] text-[color:var(--color-ink)] font-medium">
                  {f.title}
                </h4>
                <p className="mt-2 text-[13px] leading-[1.7] text-[color:var(--color-ink)]/65 max-w-[240px]">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, dark }: { eyebrow: string; title: string; dark?: boolean }) {
  return (
    <div className="text-center">
      <p className={`text-[10px] tracking-[0.4em] ${dark ? "text-[color:var(--color-gold)]" : "text-[color:var(--color-gold)]"}`}>
        {eyebrow}
      </p>
      <h2
        className={`mt-4 font-serif text-[38px] md:text-[46px] font-light ${dark ? "text-white" : "text-[color:var(--color-ink)]"}`}
      >
        {title}
      </h2>
      <div className="mx-auto mt-4 flex items-center justify-center gap-2">
        <span className="h-px w-8 bg-[color:var(--color-gold)]/60" />
        <span className="text-[color:var(--color-gold)] text-xs">◆</span>
        <span className="h-px w-8 bg-[color:var(--color-gold)]/60" />
      </div>
    </div>
  );
}

function Services() {
  const items = [
    { img: svcWedding, icon: Heart, title: "WEDDING PHOTOGRAPHY", desc: "From dreamy weddings to grand celebrations, we capture every emotion and detail." },
    { img: svcSangeet, icon: Music, title: "SANGEET PHOTOGRAPHY", desc: "Fun, music, dance and endless memories beautifully captured." },
    { img: svcBaby, icon: Baby, title: "BABY SHOWER PHOTOSHOOT", desc: "Celebrating new beginnings with love, joy and heartwarming moments." },
  ];
  return (
    <section id="services" className="bg-[color:var(--color-cream)] pb-28">
      <SectionTitle eyebrow="OUR SERVICES" title="We Capture Every Special Moment" />
      <div className="mx-auto mt-16 grid max-w-[1300px] grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12">
        {items.map((s) => (
          <motion.div
            key={s.title}
            {...fadeUp}
            whileHover={{ y: -8 }}
            className="group bg-white shadow-[0_20px_50px_-30px_rgba(0,0,0,0.25)] transition-all duration-500 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35)]"
          >
            <div className="relative overflow-hidden aspect-[4/3]">
              <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--color-gold)] text-white shadow-lg">
                <s.icon size={20} strokeWidth={1.5} />
              </div>
            </div>
            <div className="px-8 pt-10 pb-8 text-center">
              <h4 className="text-[13px] tracking-[0.3em] text-[color:var(--color-ink)] font-medium">
                {s.title}
              </h4>
              <p className="mt-4 text-[13px] leading-[1.75] text-[color:var(--color-ink)]/60">
                {s.desc}
              </p>
              <a href="#portfolio" className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-[color:var(--color-gold)] hover:gap-3 transition-all">
                VIEW GALLERY <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Portfolio() {
  const cats = ["ALL", "WEDDINGS", "SANGEET", "BABY SHOWER", "COUPLE SHOOT", "ENGAGEMENT"];
  const [active, setActive] = useState("ALL");
  const imgs = [p1, p2, p3, p4, p5, p6, p7, p8, p9];

  // Scattered polaroid layout: each item has left/top %, rotation, size, z-index.
  // Positions hand-tuned to feel like the reference (loosely clustered, overlapping).
  const polaroids: Array<{
    left: string;
    top: string;
    rot: number;
    w: number; // width in px at desktop
    z: number;
  }> = [
    { left: "6%",  top: "4%",  rot: -8,  w: 200, z: 3 },
    { left: "22%", top: "10%", rot: 6,   w: 190, z: 5 },
    { left: "40%", top: "2%",  rot: -4,  w: 210, z: 4 },
    { left: "60%", top: "8%",  rot: 9,   w: 195, z: 3 },
    { left: "78%", top: "14%", rot: -6,  w: 185, z: 2 },
    { left: "4%",  top: "34%", rot: 5,   w: 210, z: 4 },
    { left: "20%", top: "40%", rot: -10, w: 195, z: 6 },
    { left: "37%", top: "36%", rot: 3,   w: 230, z: 7 },
    { left: "58%", top: "40%", rot: -5,  w: 205, z: 5 },
    { left: "76%", top: "38%", rot: 8,   w: 200, z: 4 },
    { left: "8%",  top: "66%", rot: 4,   w: 200, z: 3 },
    { left: "26%", top: "70%", rot: -7,  w: 195, z: 5 },
    { left: "44%", top: "68%", rot: 6,   w: 210, z: 4 },
    { left: "63%", top: "72%", rot: -3,  w: 200, z: 3 },
  ];

  // Small paper "confetti" flowers scattered between polaroids
  const confetti: Array<{ left: string; top: string; rot: number; c: string }> = [
    { left: "48%", top: "1%",  rot: 10,  c: "#EAE2C8" },
    { left: "2%",  top: "62%", rot: -20, c: "#C89B3C" },
    { left: "14%", top: "94%", rot: 25,  c: "#C89B3C" },
    { left: "82%", top: "60%", rot: -8,  c: "#EAE2C8" },
    { left: "92%", top: "88%", rot: 14,  c: "#C89B3C" },
  ];

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden py-24 md:py-28"
      style={{
        background:
          "radial-gradient(ellipse at center, #F8F4E9 0%, #EFE8D6 60%, #E4D9BE 100%)",
      }}
    >
      {/* subtle linen texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25] mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(120,90,40,0.06) 0 1px, transparent 1px 3px), repeating-linear-gradient(-45deg, rgba(120,90,40,0.05) 0 1px, transparent 1px 3px)",
        }}
      />

      <div className="relative">
        <SectionTitle eyebrow="PORTFOLIO" title="A Glimpse of Our Work" />

        <div className="mx-auto mt-10 flex max-w-[1300px] flex-wrap justify-center gap-8 px-6 md:px-12">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`relative text-[11px] tracking-[0.3em] pb-2 transition-colors ${
                active === c
                  ? "text-[color:var(--color-gold)]"
                  : "text-[color:var(--color-ink)]/70 hover:text-[color:var(--color-gold)]"
              }`}
            >
              {c}
              {active === c && (
                <span className="absolute inset-x-0 bottom-0 h-px bg-[color:var(--color-gold)]" />
              )}
            </button>
          ))}
        </div>

        {/* Scattered polaroid canvas */}
        <div className="relative mx-auto mt-14 h-[720px] w-full max-w-[1300px] px-6 md:h-[820px] md:px-12">
          <div className="relative h-full w-full">
            {/* Confetti flowers */}
            {confetti.map((f, i) => (
              <div
                key={`c${i}`}
                className="absolute"
                style={{ left: f.left, top: f.top, transform: `rotate(${f.rot}deg)` }}
                aria-hidden
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill={f.c}>
                  <path d="M12 2c1.2 2.4 3.2 3.6 5.8 3.6-.8 2.6-.2 4.8 1.6 6.4-2.4 1.2-3.6 3.2-3.6 5.8-2.6-.8-4.8-.2-6.4 1.6-1.2-2.4-3.2-3.6-5.8-3.6.8-2.6.2-4.8-1.6-6.4C4.4 8.2 5.6 6.2 5.6 3.6 8.2 4.4 10.4 3.8 12 2z" />
                  <circle cx="12" cy="12" r="2.2" fill="#8B6A25" />
                </svg>
              </div>
            ))}

            {/* Polaroids */}
            {polaroids.map((p, i) => {
              const src = imgs[i % imgs.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, rotate: p.rot * 0.4 }}
                  whileInView={{ opacity: 1, y: 0, rotate: p.rot }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                  }}
                  whileHover={{
                    rotate: 0,
                    scale: 1.06,
                    zIndex: 50,
                    transition: { duration: 0.3 },
                  }}
                  style={{
                    position: "absolute",
                    left: p.left,
                    top: p.top,
                    width: p.w,
                    zIndex: p.z,
                    transformOrigin: "center",
                  }}
                  className="cursor-pointer"
                >
                  <div
                    className="bg-white p-3 pb-10"
                    style={{
                      boxShadow:
                        "0 1px 2px rgba(0,0,0,0.08), 0 12px 28px -8px rgba(60,40,10,0.35), 0 30px 60px -20px rgba(60,40,10,0.25)",
                    }}
                  >
                    <div className="aspect-square w-full overflow-hidden bg-[#e9e4d5]">
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center border border-[color:var(--color-gold)] bg-white/40 px-10 py-4 text-[11px] tracking-[0.3em] text-[color:var(--color-ink)] hover:bg-[color:var(--color-gold)] hover:text-white transition-all"
          >
            VIEW FULL PORTFOLIO
          </a>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { name: "PRATIK & HETAL", text: "Vinit bhai and his team are simply amazing! They made our wedding so special with their creativity and professionalism." },
    { name: "RIDDHI & TEJAS", text: "The pictures are beyond beautiful. Every emotion was captured so perfectly. Highly recommend!" },
    { name: "JINAL & HARDIK", text: "Great experience and outstanding results. Our baby shower memories will be cherished forever." },
  ];
  return (
    <section id="testimonials" className="bg-[color:var(--color-cream)] py-24 md:py-28">
      <SectionTitle eyebrow="TESTIMONIALS" title="What Our Clients Say" />
      <div className="relative mx-auto mt-16 max-w-[1200px] px-6 md:px-16">
        <button className="absolute left-0 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-gold)]/50 text-[color:var(--color-gold)] hover:bg-[color:var(--color-gold)] hover:text-white transition-colors">
          <ChevronLeft size={18} />
        </button>
        <button className="absolute right-0 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-gold)]/50 text-[color:var(--color-gold)] hover:bg-[color:var(--color-gold)] hover:text-white transition-colors">
          <ChevronRight size={18} />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {t.map((tt, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <Quote className="text-[color:var(--color-gold)]" size={28} strokeWidth={1.5} />
              <p className="mt-5 text-[13px] leading-[1.85] text-[color:var(--color-ink)]/70">
                {tt.text}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-[color:var(--color-gold)]/20 border border-[color:var(--color-gold)]/40" />
                <span className="text-[11px] tracking-[0.25em] text-[color:var(--color-ink)]/80">— {tt.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === 0 ? "w-6 bg-[color:var(--color-gold)]" : "w-1.5 bg-[color:var(--color-ink)]/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="relative bg-[color:var(--color-ink)] pt-20 pb-6 overflow-hidden">
      <div className="mx-auto grid max-w-[1300px] grid-cols-1 md:grid-cols-4 gap-10 px-6 md:px-12">
        <div>
          <Logo />
          <div className="mt-6 h-px w-16 bg-[color:var(--color-gold)]/60" />
          <p className="mt-6 text-[12px] leading-[1.9] text-white/60 max-w-xs">
            We don't just take pictures, we capture feelings, moments and memories for a lifetime.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Youtube, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-gold)]/60 text-[color:var(--color-gold)] hover:bg-[color:var(--color-gold)] hover:text-[color:var(--color-ink)] transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-[11px] tracking-[0.3em] text-[color:var(--color-gold)]">GET IN TOUCH</h5>
          <div className="mt-6 h-px w-16 bg-[color:var(--color-gold)]/60" />
          <ul className="mt-6 space-y-4 text-[12px] text-white/70">
            <li className="flex items-center gap-3"><Phone size={14} className="text-[color:var(--color-gold)]" /> +91 99986 65014</li>
            <li className="flex items-center gap-3"><Mail size={14} className="text-[color:var(--color-gold)]" /> vinitpatel0092@gmail.com</li>
            <li className="flex items-start gap-3"><MapPin size={14} className="text-[color:var(--color-gold)] mt-1" /> 28, Muktanand Soc,<br />Karelibaug, Vadodara - 18</li>
          </ul>
        </div>

        <div>
          <h5 className="text-[11px] tracking-[0.3em] text-[color:var(--color-gold)]">QUICK LINKS</h5>
          <div className="mt-6 h-px w-16 bg-[color:var(--color-gold)]/60" />
          <ul className="mt-6 space-y-3 text-[12px] tracking-[0.2em] text-white/70">
            {NAV.map((n) => (
              <li key={n}>
                <a href={`#${n.toLowerCase()}`} className="hover:text-[color:var(--color-gold)] transition-colors">
                  {n.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <img src={collage} alt="Memories" loading="lazy" className="w-full max-w-[280px] rotate-[3deg]" />
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-[1300px] border-t border-white/10 px-6 md:px-12 pt-6 text-center text-[11px] text-white/40">
        © 2024 Vinit Patel Photography Studio. All Rights Reserved.
      </div>
    </footer>
  );
}

export function HomePage() {
  const [isIntroActive, setIsIntroActive] = useState(true);

  const introOverlayRef = useRef<HTMLDivElement>(null);
  const cameraRigRef = useRef<HTMLDivElement>(null);
  const cameraAssemblyRef = useRef<SVGGElement>(null);
  const focusRingRef = useRef<SVGCircleElement>(null);
  const irisGroupRef = useRef<SVGGElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const dustFieldRef = useRef<HTMLDivElement>(null);
  const afBracketsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!isIntroActive) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setIsIntroActive(false);
      return;
    }

    document.body.classList.add("locked");

    const LENS_LOCAL_X = 290, LENS_LOCAL_Y = 180;
    const SVG_ORIGIN = `${LENS_LOCAL_X} ${LENS_LOCAL_Y}`;
    const IRIS_R = 54;

    const irisGroup = irisGroupRef.current;
    const dustField = dustFieldRef.current;

    if (!irisGroup || !dustField) return;

    // Clear previous dynamic items for safety
    irisGroup.innerHTML = "";
    dustField.innerHTML = "";

    // 1. Main iris ring path (the actual shutter)
    const irisRingEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
    irisRingEl.setAttribute("fill", "#141416");
    irisRingEl.setAttribute("fill-rule", "evenodd");
    irisGroup.appendChild(irisRingEl);

    // 2. Concentric detail rings for lens-barrel depth
    const detailRadii = [10, 18, 26, 34, 42, 50];
    detailRadii.forEach((r, dr) => {
      const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      ring.setAttribute("r", r.toString());
      ring.setAttribute("fill", "none");
      ring.setAttribute("stroke", dr % 2 === 0 ? "#222225" : "#1a1a1d");
      ring.setAttribute("stroke-width", "0.6");
      ring.setAttribute("opacity", "0.5");
      irisGroup.appendChild(ring);
    });

    // 3. Subtle radial blade-boundary lines (barely visible, hint at segments)
    const N_LINES = 9;
    for (let li = 0; li < N_LINES; li++) {
      const ang = li * (360 / N_LINES) * Math.PI / 180;
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", (4 * Math.cos(ang)).toFixed(2));
      line.setAttribute("y1", (4 * Math.sin(ang)).toFixed(2));
      line.setAttribute("x2", (IRIS_R * Math.cos(ang)).toFixed(2));
      line.setAttribute("y2", (IRIS_R * Math.sin(ang)).toFixed(2));
      line.setAttribute("stroke", "#1c1c1f");
      line.setAttribute("stroke-width", "0.35");
      line.setAttribute("opacity", "0.35");
      irisGroup.appendChild(line);
    }

    // Set Iris Openness function
    function setIris(openness: number) {
      if (!irisRingEl) return;
      const innerR = openness * IRIS_R;
      const R = IRIS_R;
      if (innerR < 0.5) {
        // Fully closed
        irisRingEl.setAttribute("d",
          `M ${R},0 A ${R},${R} 0 1,0 -${R},0 A ${R},${R} 0 1,0 ${R},0 Z`
        );
      } else {
        // Annulus ring cutout
        const r = innerR.toFixed(2);
        irisRingEl.setAttribute("d",
          `M ${R},0 A ${R},${R} 0 1,0 -${R},0 A ${R},${R} 0 1,0 ${R},0 Z ` +
          `M ${r},0 A ${r},${r} 0 1,1 -${r},0 A ${r},${r} 0 1,1 ${r},0 Z`
        );
      }
    }

    const REST_OPENNESS = 0.68;
    const irisState = { openness: REST_OPENNESS };
    setIris(REST_OPENNESS);

    // Dust particles
    const dustCount = window.innerWidth < 700 ? 14 : 26;
    const dustTweens: gsap.core.Tween[] = [];
    for (let d = 0; d < dustCount; d++) {
      const sp = document.createElement("span");
      sp.className = "dust";
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const dur = 8 + Math.random() * 10;
      const delay = Math.random() * -10;
      const size = 1 + Math.random() * 2;
      sp.style.left = `${left}%`;
      sp.style.top = `${top}%`;
      sp.style.width = `${size}px`;
      sp.style.height = `${size}px`;
      sp.style.opacity = (0.15 + Math.random() * 0.35).toFixed(2);
      dustField.appendChild(sp);

      const t = gsap.to(sp, {
        y: "-=" + (40 + Math.random() * 80),
        x: "+=" + (Math.random() * 40 - 20),
        duration: dur,
        delay: delay,
        repeat: -1,
        ease: "sine.inOut",
        yoyo: true
      });
      dustTweens.push(t);
    }

    // Idle animations
    const idleTl = gsap.timeline({ repeat: -1, yoyo: true });
    idleTl.to(cameraRigRef.current, { y: -8, rotateZ: 0.4, duration: 2.6, ease: "sine.inOut" });

    const assemblyTween = gsap.to(cameraAssemblyRef.current, {
      scale: 1.012,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      svgOrigin: SVG_ORIGIN
    });

    const bracketsTween = gsap.to(afBracketsRef.current, {
      opacity: 0.25,
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    const focusRingTween = gsap.to(focusRingRef.current, {
      rotate: 360,
      duration: 40,
      repeat: -1,
      ease: "none",
      transformOrigin: "center center"
    });

    // Hover mouse tracking
    let hovering = false;
    const rig = cameraRigRef.current;

    const onMouseEnter = () => {
      hovering = true;
      gsap.to(focusRingRef.current, { rotate: "+=30", duration: 0.6, ease: "power2.out", transformOrigin: "center center" });
      gsap.to(cameraAssemblyRef.current, { scale: 1.03, duration: 0.5, ease: "power2.out", svgOrigin: SVG_ORIGIN });
      gsap.to(irisState, {
        openness: REST_OPENNESS - 0.18,
        duration: 0.45,
        ease: "power2.out",
        onUpdate: () => { setIris(irisState.openness); }
      });
    };

    const onMouseLeave = () => {
      hovering = false;
      gsap.to(cameraAssemblyRef.current, { scale: 1, duration: 0.6, ease: "power2.out", svgOrigin: SVG_ORIGIN });
      gsap.to(rig, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out" });
      gsap.to(irisState, {
        openness: REST_OPENNESS,
        duration: 0.5,
        ease: "power2.out",
        onUpdate: () => { setIris(irisState.openness); }
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!hovering || !rig) return;
      const rect = rig.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(rig, { rotateY: px * 10, rotateX: -py * 10, duration: 0.4, ease: "power2.out" });
    };

    if (rig) {
      rig.addEventListener("mouseenter", onMouseEnter);
      rig.addEventListener("mouseleave", onMouseLeave);
      rig.addEventListener("mousemove", onMouseMove);
    }

    // Mask reveal hole positioning
    const maskCenter = { xPct: 50, yPct: 50 };
    function setMaskHole(r: number) {
      const overlay = introOverlayRef.current;
      if (!overlay) return;
      const mask = `radial-gradient(circle at ${maskCenter.xPct.toFixed(2)}% ${maskCenter.yPct.toFixed(2)}%, transparent 0, transparent ${r}vmax, black ${r}vmax, black 100%)`;
      overlay.style.webkitMaskImage = mask;
      overlay.style.maskImage = mask;
    }

    // Exact viewport coordinates of the optical center
    function getLensScreenCenter() {
      const svg = document.getElementById("cameraSvg") as unknown as SVGSVGElement;
      if (!svg) return { xPct: 50, yPct: 50 };
      const svgPt = svg.createSVGPoint();
      svgPt.x = LENS_LOCAL_X;
      svgPt.y = LENS_LOCAL_Y;
      const screenPt = svgPt.matrixTransform(svg.getScreenCTM()!);
      return {
        xPct: (screenPt.x / window.innerWidth) * 100,
        yPct: (screenPt.y / window.innerHeight) * 100
      };
    }

    // Click transition handler
    let entered = false;
    const enterSite = () => {
      if (entered) return;
      entered = true;

      // Halt active wiggles
      idleTl.kill();
      assemblyTween.kill();
      bracketsTween.kill();
      focusRingTween.kill();
      dustTweens.forEach(t => t.kill());
      gsap.killTweensOf(cameraAssemblyRef.current);
      gsap.killTweensOf(rig);
      gsap.killTweensOf(afBracketsRef.current);
      gsap.killTweensOf(focusRingRef.current);
      gsap.killTweensOf(irisState);

      // Clean start state
      gsap.set(rig, { y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1 });
      gsap.set(cameraAssemblyRef.current, { scale: 1, svgOrigin: SVG_ORIGIN });

      const lensScreen = getLensScreenCenter();
      maskCenter.xPct = lensScreen.xPct;
      maskCenter.yPct = lensScreen.yPct;

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.classList.remove("locked");
          setIsIntroActive(false);
        }
      });

      const maskState = { r: 0 };
      setMaskHole(0);

      // Shutter closed trigger
      tl.to(rig, { scale: 0.97, duration: 0.08, ease: "power2.out" })
        .to(captionRef.current, { opacity: 0, y: -12, duration: 0.25, ease: "power2.in" }, "<")
        .to(afBracketsRef.current, { opacity: 0, duration: 0.15, ease: "power2.in" }, "<")
        .to(irisState, {
          openness: 0,
          duration: 0.18,
          ease: "power3.in",
          onUpdate: () => { setIris(irisState.openness); }
        }, "<")
        .to(rig, { scale: 1, duration: 0.08, ease: "power2.out" })
        .addLabel("fly");

      // Zoom + shutter reveal sequence
      const FLY_DURATION = 0.9;
      const FLY_EASE = "power2.in";

      tl.to(cameraAssemblyRef.current, {
        scale: 30,
        duration: FLY_DURATION,
        ease: FLY_EASE,
        svgOrigin: SVG_ORIGIN
      }, "fly")
      .to(irisState, {
        openness: 1,
        duration: FLY_DURATION,
        ease: FLY_EASE,
        onUpdate: () => { setIris(irisState.openness); }
      }, "fly")
      .to(maskState, {
        r: 160,
        duration: FLY_DURATION,
        ease: "power4.in",
        onUpdate: () => { setMaskHole(maskState.r); }
      }, "fly")
      .to(dustField, {
        opacity: 0,
        duration: FLY_DURATION * 0.5,
        ease: "power2.in"
      }, "fly")
      .set(introOverlayRef.current, { pointerEvents: "none" }, `fly+=${FLY_DURATION * 0.7}`);
    };

    if (rig) {
      rig.addEventListener("click", enterSite);
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        enterSite();
      }
    };
    if (rig) {
      rig.addEventListener("keydown", onKeyDown);
    }

    return () => {
      document.body.classList.remove("locked");
      idleTl.kill();
      assemblyTween.kill();
      bracketsTween.kill();
      focusRingTween.kill();
      dustTweens.forEach(t => t.kill());
      if (rig) {
        rig.removeEventListener("mouseenter", onMouseEnter);
        rig.removeEventListener("mouseleave", onMouseLeave);
        rig.removeEventListener("mousemove", onMouseMove);
        rig.removeEventListener("click", enterSite);
        rig.removeEventListener("keydown", onKeyDown);
      }
    };
  }, [isIntroActive]);

  return (
    <div className="min-h-screen bg-[color:var(--color-ink)] font-sans text-white antialiased" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Camera Intro Overlay */}
      {isIntroActive && (
        <div id="introOverlay" ref={introOverlayRef}>
          <div className="dust-field" ref={dustFieldRef} />

          {/* Film strip reels background */}
          <div className="film-strips-bg">
            {[
              { dir: "up",   imgs: [p1, p2, p3, heroCouple] },
              { dir: "down", imgs: [p4, p5, p6, svcWedding] },
              { dir: "up",   imgs: [p7, p8, p9, founder] },
              { dir: "down", imgs: [svcSangeet, p1, p5, svcBaby] },
              { dir: "up",   imgs: [p3, p6, p8, heroCouple] },
              { dir: "down", imgs: [p2, p4, p7, collage] },
              { dir: "up",   imgs: [p9, p5, svcWedding, p1] },
            ].map((strip, si) => (
              <div key={si} className="film-strip" data-dir={strip.dir}>
                <div className="film-strip-inner">
                  {/* Duplicate the set twice for seamless infinite scroll */}
                  {[...strip.imgs, ...strip.imgs].map((img, fi) => (
                    <div key={fi} className="film-frame">
                      <img src={img} alt="" loading="eager" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="stage">
            <div
              id="cameraRig"
              ref={cameraRigRef}
              role="button"
              tabIndex={0}
              aria-label="Click the camera to enter Vinit Patel Photography Studio"
            >
              <svg id="cameraSvg" viewBox="0 0 480 300">
                <defs>
                  <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#232324" />
                    <stop offset="45%" stopColor="#121213" />
                    <stop offset="100%" stopColor="#050505" />
                  </linearGradient>
                  <linearGradient id="topPlateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2c2c2d" />
                    <stop offset="100%" stopColor="#0a0a0a" />
                  </linearGradient>
                  <radialGradient id="ringMetal" cx="34%" cy="24%" r="80%">
                    <stop offset="0%" stopColor="#eceef0" />
                    <stop offset="28%" stopColor="#aeb0b3" />
                    <stop offset="62%" stopColor="#54565a" />
                    <stop offset="100%" stopColor="#161718" />
                  </radialGradient>
                  <radialGradient id="glassGrad" cx="30%" cy="25%" r="72%">
                    <stop offset="0%" stopColor="#e0ecf4" stopOpacity="0.25" />
                    <stop offset="18%" stopColor="#7fa8cc" stopOpacity="0.18" />
                    <stop offset="45%" stopColor="#4a6e96" stopOpacity="0.12" />
                    <stop offset="75%" stopColor="#283848" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#101820" stopOpacity="0.25" />
                  </radialGradient>
                  <pattern id="gripTexture" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <rect width="7" height="7" fill="#0b0b0b" />
                    <rect width="3.4" height="3.4" fill="#1d1d1e" />
                  </pattern>
                  <pattern id="knurl" width="3.2" height="3.2" patternUnits="userSpaceOnUse">
                    <rect width="3.2" height="3.2" fill="#2e2e30" />
                    <rect x="0" y="0" width="1.1" height="3.2" fill="#141415" />
                  </pattern>
                  <path id="ringArcTop" d="M 215 180 A 75 75 0 0 1 365 180" fill="none" />
                  <path id="ringArcBottom" d="M 236 180 A 54 54 0 0 0 344 180" fill="none" />
                  <clipPath id="irisClip">
                    <circle cx="0" cy="0" r="54" />
                  </clipPath>
                </defs>

                <g id="cameraAssembly" ref={cameraAssemblyRef}>
                  <g id="cameraBody">
                    <circle cx="62" cy="150" r="12" fill="none" stroke="url(#ringMetal)" strokeWidth="4" />
                    <circle cx="418" cy="150" r="12" fill="none" stroke="url(#ringMetal)" strokeWidth="4" />

                    <rect x="50" y="95" width="380" height="175" rx="10" fill="url(#bodyGrad)" />
                    <rect x="50" y="80" width="380" height="18" rx="5" fill="url(#topPlateGrad)" />
                    <rect x="88" y="82" width="20" height="9" rx="4" fill="#0a0a0a" stroke="#3a3a3b" strokeWidth="1" />
                    <circle cx="150" cy="86" r="9" fill="#141415" stroke="url(#ringMetal)" strokeWidth="1.6" />
                    <circle cx="150" cy="86" r="2" fill="#8b8880" />
                    <circle cx="176" cy="86" r="2.4" fill="#3a1414" />
                    <text x="98" y="132" fontFamily="Fraunces, serif" fontWeight="600" fontSize="19" fill="#eceae4" letterSpacing="0.5">
                      STUDIO 1<tspan fill="#c9a227" fontSize="12" dy="-6"> R</tspan>
                    </text>
                    <text x="382" y="130" textAnchor="end" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="17" fill="#eceae4" letterSpacing="2">
                      VP STUDIO
                    </text>

                    <rect x="62" y="150" width="86" height="108" rx="8" fill="url(#gripTexture)" />
                    <rect x="62" y="150" width="86" height="108" rx="8" fill="none" stroke="#000" strokeOpacity="0.4" strokeWidth="1" />
                  </g>

                  <g id="lensGroup" transform="translate(290,180)">
                    <circle r="75" fill="url(#ringMetal)" />
                    <circle r="75" fill="none" stroke="#050505" strokeWidth="2" opacity="0.5" />
                    <text fontFamily="Inter, sans-serif" fontSize="9" fill="#1c1d1e" letterSpacing="2.5">
                      <textPath href="#ringArcTop" startOffset="50%" textAnchor="middle" transform="translate(-290,-180)">
                        STUDIO OPTIK
                      </textPath>
                    </text>
                    <circle id="focusRing" ref={focusRingRef} r="65" fill="url(#knurl)" stroke="#0a0a0a" strokeWidth="1" />
                    <circle r="65" fill="none" stroke="#050505" strokeWidth="1.4" opacity="0.6" />
                    <circle r="54" fill="url(#ringMetal)" />
                    <text fontFamily="Inter, sans-serif" fontSize="7.5" fill="#1c1d1e" letterSpacing="1.6">
                      <textPath href="#ringArcBottom" startOffset="50%" text-anchor="middle" transform="translate(-290,-180)">
                        F2.0 · 35MM STUDIO
                      </textPath>
                    </text>
                    <text x="-68" y="4" fontFamily="Inter, sans-serif" fontSize="8" fill="#3a3b3c" letterSpacing="1" transform="rotate(-90 -68 4)">
                      Ø49
                    </text>
                    <circle r="54" fill="url(#glassGrad)" />

                    <g id="irisGroup" ref={irisGroupRef} clipPath="url(#irisClip)"></g>

                    <circle r="7" fill="#020202" />
                    <ellipse cx="-16" cy="-20" rx="11" ry="6" fill="#ffffff" opacity="0.22" transform="rotate(-30)" />
                    <circle cx="-34" cy="36" r="2.2" fill="#b5342f" />
                    <g id="afBrackets" ref={afBracketsRef} opacity="0.6">
                      <path className="af-bracket" d="M -32 -32 l0 10 M -32 -32 l10 0" />
                      <path className="af-bracket" d="M 32 -32 l0 10 M 32 -32 l-10 0" />
                      <path className="af-bracket" d="M -32 32 l0 -10 M -32 32 l10 0" />
                      <path className="af-bracket" d="M 32 32 l0 -10 M 32 32 l-10 0" />
                    </g>
                  </g>
                </g>
              </svg>
            </div>

            <div className="intro-caption" ref={captionRef}>
              <h1 className="display">Vinit Patel Photography Studio</h1>
              <p>Click the camera to enter</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Website Wrapper */}
      <div id="site" className={isIntroActive ? "locked-out" : ""}>
        <Header />
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <Footer />

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/919998665014?text=Hi%20Vinit%20Patel%20Photography%20Studio!%20I%E2%80%99d%20like%20to%20know%20more%20about%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:bg-[#20bd5a] hover:shadow-[0_6px_28px_rgba(37,211,102,0.55)] hover:scale-110 transition-all duration-300"
          aria-label="Contact us on WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-[#25D366] animate-ping" />
        </a>
      </div>
    </div>
  );
}