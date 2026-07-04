import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import type { ClientEvent } from "@/data/portfolioData";

interface EventCardProps {
  event: ClientEvent;
  index?: number;
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/event/${event.id}`}
        className="group block overflow-hidden rounded-lg bg-white transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(200,155,60,0.12)]"
        style={{
          boxShadow: "0 4px 20px -6px rgba(60,40,10,0.08), 0 1px 3px rgba(0,0,0,0.03)",
        }}
        data-cursor="view"
      >
        {/* Cover Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={event.coverImage}
            alt={`${event.clientNames} – ${event.eventType}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Event type badge */}
          <span className="absolute top-3 right-3 bg-[color:var(--color-gold)] px-3 py-1.5 text-[9px] tracking-[0.2em] font-semibold text-[color:var(--color-ink)] uppercase">
            {event.eventType}
          </span>

          {/* Image count */}
          <span className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm px-2.5 py-1 text-[10px] tracking-[0.1em] text-white/90 rounded">
            {event.images.length} photos
          </span>
        </div>

        {/* Card Body */}
        <div className="p-5 md:p-6">
          <h3 className="font-serif text-[20px] md:text-[22px] font-light text-[color:var(--color-ink)]">
            {event.clientNames}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] text-[color:var(--color-ink)]/40">
              <MapPin size={11} />
              {event.location}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] text-[color:var(--color-ink)]/40">
              <Calendar size={11} />
              {event.date}
            </span>
          </div>
          
          {/* View link */}
          <p className="mt-4 text-[10px] tracking-[0.25em] font-semibold text-[color:var(--color-gold)] group-hover:tracking-[0.35em] transition-all duration-300">
            VIEW EVENT →
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
