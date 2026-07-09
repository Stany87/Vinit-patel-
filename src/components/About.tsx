import { motion } from "framer-motion";
import { Camera, Sparkles, UserRound } from "lucide-react";
import { staggerContainer, staggerItem, fadeUp } from "@/animations/hero";
import founderImage from "@/assets/image.png";

const FEATURES = [
  {
    icon: Sparkles,
    title: "A SOFT SPOT FOR REAL MOMENTS",
    desc: "We look for the authentic, unprompted hugs and messy laughter that tell your true story.",
  },
  {
    icon: Camera,
    title: "OBSESSED WITH THE DETAILS",
    desc: "We use top-tier gear and meticulous editing so every single print feels like a piece of art.",
  },
  {
    icon: UserRound,
    title: "FEELS LIKE FAMILY",
    desc: "No stiff posing or awkward smiles. We make sure you feel entirely at ease behind the lens.",
  },
];

export function About() {
  return (
    <section id="about" className="bg-moving-light py-28 md:py-36">
      <div className="mx-auto max-w-[1300px] px-6 md:px-12">
        {/* Section label */}
        <motion.p
          {...fadeUp}
          className="text-center text-[10px] tracking-[0.45em] text-[color:var(--color-gold)] mb-4"
        >
          OUR STORY
        </motion.p>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 items-center gap-10 md:gap-16">
          {/* Bio */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="order-2 md:order-1"
          >
            <motion.h2
              variants={staggerItem}
              className="font-edwardian text-[color:var(--color-gold)] text-[40px] md:text-[50px] leading-none"
            >
              Vinit Patel
            </motion.h2>
            <motion.p
              variants={staggerItem}
              className="mt-3 text-[10px] tracking-[0.4em] text-white/60"
            >
              FOUNDER & LEAD PHOTOGRAPHER
            </motion.p>
            <motion.div
              variants={staggerItem}
              className="mt-6 h-px w-12 bg-[color:var(--color-gold)]/50"
            />
            <motion.p
              variants={staggerItem}
              className="mt-8 text-[13px] leading-[2] text-white/70 max-w-none md:max-w-xs"
            >
              Hey, I’m Vinit. To me, photography has never been about just snapping pictures or checking off a list of poses. It’s about catching that split-second tear in a father's eye, the laughter that fills a sangeet room, and the quiet, real connections that make your family who they are. I love what I do because I get to help you hold onto the feelings of your biggest days, long after they're over.
            </motion.p>

            {/* Signature */}
            <motion.div
              variants={staggerItem}
              className="mt-10"
            >
              <svg
                viewBox="0 0 180 60"
                className="w-40 overflow-visible"
                aria-label="Vinit Patel signature"
              >
                <motion.path
                  d="M10,40 C20,10 50,50 70,30 C90,10 110,50 130,20 C150,-5 165,35 175,25"
                  fill="none"
                  stroke="#c89b3c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
                />
              </svg>
              <p
                className="mt-2 text-[30px] text-white font-edwardian"
              >
                Vinit Patel
              </p>
            </motion.div>
          </motion.div>

          {/* Founder image */}
          <motion.div
            {...fadeUp}
            className="relative flex justify-center order-1 md:order-2"
          >
            {/* Offset gold frame */}
            <div className="absolute inset-4 border border-[color:var(--color-gold)]/70 translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4" />
            <motion.img
              src={founderImage}
              alt="Vinit Patel — Best wedding photographer and founder of Vinit Patel Photography in Vadodara, Gujarat"
              className="relative w-full max-w-[340px] object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          {/* Feature cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-10 order-3 md:order-3"
          >
            {FEATURES.map((f) => (
              <motion.div key={f.title} variants={staggerItem} className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-gold)] text-[color:var(--color-gold)]">
                  <f.icon size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[12px] tracking-[0.3em] text-white font-medium">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.8] text-white/60 max-w-[240px]">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
