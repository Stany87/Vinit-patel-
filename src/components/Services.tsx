import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Music, Baby, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import svcWedding from "@/assets/service-wedding.jpg";
import svcSangeet from "@/assets/service-sangeet.jpg";
import svcBaby from "@/assets/service-baby.jpg";
import type { ServiceCategory } from "@/data/portfolioData";

const SERVICES: { title: string; desc: string; image: string; icon: any; category: ServiceCategory }[] = [
  {
    title: "PRE WEDDING",
    desc: "Dreamy stories. Vibrant and intimate pre-wedding photoshoots capturing your unique chemistry in beautiful locations.",
    image: svcSangeet,
    icon: Sparkles,
    category: "pre-wedding",
  },
  {
    title: "WEDDING PHOTOGRAPHY",
    desc: "Big days & quiet moments. We document your entire wedding day as it naturally unfolds—from morning details to late-night exits.",
    image: svcWedding,
    icon: Heart,
    category: "wedding",
  },
  {
    title: "BABY SHOWER",
    desc: "Celebrating new beginnings. Heartwarming and creative baby shower and maternity shoots to preserve your family's first milestones.",
    image: svcBaby,
    icon: Baby,
    category: "baby-shower",
  },
  {
    title: "BABY SHOOT",
    desc: "Capturing childhood joy. Heartwarming newborn, toddler, and kids photography to cherish their early years forever.",
    image: svcBaby,
    icon: Baby,
    category: "baby-shoot",
  },
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Drag states
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isDragging = useRef(false);
  const dragThreshold = 5;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    isDragging.current = false;
    startX.current = e.pageX - (containerRef.current?.offsetLeft || 0);
    scrollLeft.current = containerRef.current?.scrollLeft || 0;
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = "auto";
    }
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = "smooth";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5;

    if (Math.abs(x - startX.current) > dragThreshold) {
      isDragging.current = true;
    }

    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (isDragging.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      checkScroll();
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = "smooth";
      const scrollAmount = containerRef.current.clientWidth * 0.75;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const swayInVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      rotate: 3 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotate: 0,
      transition: { 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1] 
      }
    },
  };

  return (
    <section id="services" className="bg-[color:var(--color-cream)] py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1300px] w-full flex flex-col">
        {/* Section Header */}
        <div className="text-center mb-16 px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[10px] tracking-[0.45em] text-[color:var(--color-gold)] uppercase font-medium mb-3"
          >
            OUR SERVICES
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="font-serif text-[36px] md:text-[48px] text-[color:var(--color-ink)] font-light leading-tight"
          >
            Chapters We Love to Document
          </motion.h2>

          {/* Elegant Divider with center diamond */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.2 }}
            className="flex items-center justify-center gap-4 mt-6"
          >
            <div className="h-[1px] w-16 bg-[color:var(--color-gold)]/40" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[color:var(--color-gold)]" />
            <div className="h-[1px] w-16 bg-[color:var(--color-gold)]/40" />
          </motion.div>
        </div>
        
        {/* Services Scroll Track */}
        <div className="relative w-full overflow-hidden select-none">
          <motion.div 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="flex gap-6 md:gap-8 px-6 md:px-12 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none pb-6 cursor-grab active:cursor-grabbing"
          >
            {SERVICES.map((svc, index) => {
              const IconComponent = svc.icon;
              return (
                <motion.div 
                  key={index} 
                  variants={swayInVariants}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.4, ease: "easeOut" } 
                  }}
                  className="w-[85vw] sm:w-[380px] md:w-[400px] shrink-0 group bg-white rounded-lg overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(200,155,60,0.08)] transition-shadow duration-500 flex flex-col snap-center"
                >
                  <Link 
                    to={`/services/${svc.category}`} 
                    onClick={handleLinkClick}
                    className="flex flex-col flex-grow" 
                    data-cursor="view"
                  >
                    {/* Image Wrap */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <img 
                        src={svc.image} 
                        alt={`${svc.title} by Vinit Patel Photography in Vadodara, Gujarat`}
                        className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                        loading="lazy"
                        draggable={false}
                      />
                      {/* Overlay badge */}
                      <div className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-[color:var(--color-gold)] flex items-center justify-center text-white shadow-md z-10">
                        <IconComponent size={16} strokeWidth={2} />
                      </div>
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700 pointer-events-none" />
                    </div>

                    {/* Card Body */}
                    <div className="p-6 md:p-8 flex flex-col items-center text-center flex-grow bg-white">
                      <h3 className="font-sans text-[13px] font-semibold tracking-[0.2em] text-[color:var(--color-ink)] mb-3">
                        {svc.title}
                      </h3>
                      <p className="text-[12px] leading-[1.8] text-neutral-500 mb-6 font-light max-w-[260px]">
                        {svc.desc}
                      </p>
                      <span
                        className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] font-semibold text-[color:var(--color-gold)] relative py-1 uppercase"
                      >
                        VIEW GALLERY <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-gold)]/30 text-[color:var(--color-gold)] hover:bg-[color:var(--color-gold)] hover:text-white transition-all duration-300 ${
              !canScrollLeft ? "opacity-30 cursor-not-allowed" : "hover:scale-105"
            }`}
            aria-label="Previous services"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-gold)]/30 text-[color:var(--color-gold)] hover:bg-[color:var(--color-gold)] hover:text-white transition-all duration-300 ${
              !canScrollRight ? "opacity-30 cursor-not-allowed" : "hover:scale-105"
            }`}
            aria-label="Next services"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
