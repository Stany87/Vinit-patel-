import { motion } from "framer-motion";
import { Heart, Music, Baby, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import svcWedding from "@/assets/service-wedding.jpg";
import svcSangeet from "@/assets/service-sangeet.jpg";
import svcBaby from "@/assets/service-baby.jpg";
import type { ServiceCategory } from "@/data/portfolioData";

const SERVICES: { title: string; desc: string; image: string; icon: typeof Heart; category: ServiceCategory }[] = [
  {
    title: "WEDDING PHOTOGRAPHY",
    desc: "From dreamy weddings to grand celebrations, our professional photographers in Vadodara capture every emotion and detail.",
    image: svcWedding,
    icon: Heart,
    category: "wedding",
  },
  {
    title: "SANGEET PHOTOGRAPHY",
    desc: "Fun, music, dance and endless memories beautifully captured by the best event photographer in Vadodara.",
    image: svcSangeet,
    icon: Music,
    category: "sangeet",
  },
  {
    title: "BABY SHOWER PHOTOSHOOT",
    desc: "Celebrating new beginnings with love, joy and heartwarming moments — professional baby shower photography in Gujarat.",
    image: svcBaby,
    icon: Baby,
    category: "baby-shower",
  },
];

export function Services() {
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
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
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
            We Capture Every Special Moment
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
        
        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
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
                className="group bg-white rounded-lg overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(200,155,60,0.08)] transition-shadow duration-500 flex flex-col"
              >
                <Link to={`/services/${svc.category}`} className="flex flex-col flex-grow" data-cursor="view">
                  {/* Image Wrap */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <img 
                      src={svc.image} 
                      alt={`${svc.title} by Vinit Patel Photography Studio in Vadodara, Gujarat`}
                      className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                      loading="lazy"
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
    </section>
  );
}
