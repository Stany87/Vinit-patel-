import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { EventGallery } from "@/components/EventGallery";
import { EventCard } from "@/components/EventCard";
import { CustomCursor } from "@/components/CustomCursor";
import { useClientEvents, getEventById } from "@/data/portfolioStore";
import { LUXURY_EASE } from "@/animations/hero";

export const Route = createFileRoute("/event/$eventId")({
  component: EventDetailPage,
});

function EventDetailPage() {
  const { eventId } = Route.useParams();
  const { events } = useClientEvents();
  const event = getEventById(events, eventId);

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: "#f8f7f3" }}>
        <div className="text-center">
          <p className="text-[color:var(--color-ink)]/40 text-sm tracking-wider mb-4">Event not found.</p>
          <Link to="/" className="text-[color:var(--color-gold)] text-[11px] tracking-[0.2em] hover:underline">
            BACK TO HOME
          </Link>
        </div>
      </div>
    );
  }

  // Get related events (same type, excluding current)
  const relatedEvents = events.filter(
    (e) => e.eventType === event.eventType && e.id !== event.id,
  ).slice(0, 3);

  return (
    <div
      className="min-h-screen antialiased"
      style={{ fontFamily: "Inter, sans-serif", background: "#f8f7f3" }}
    >
      <CustomCursor />

      <PageHeader
        title={event.clientNames}
        subtitle={`${event.eventType} · ${event.location}`}
        backTo="/gallery"
        backLabel="Back to Gallery"
        coverImage={event.coverImage}
      />

      {/* Event meta strip */}
      <div className="border-b border-[color:var(--color-gold)]/10" style={{ background: "#f5f2ea" }}>
        <div className="mx-auto max-w-[1300px] px-6 md:px-12 py-5 flex flex-wrap items-center gap-6 md:gap-10">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] text-[color:var(--color-ink)]/50">
            <span className="bg-[color:var(--color-gold)] text-[color:var(--color-ink)] px-2.5 py-1 text-[9px] tracking-[0.2em] font-semibold uppercase">
              {event.eventType}
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] text-[color:var(--color-ink)]/40">
            <MapPin size={12} />
            {event.location}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] text-[color:var(--color-ink)]/40">
            <Calendar size={12} />
            {event.date}
          </span>
          <span className="text-[11px] tracking-[0.15em] text-[color:var(--color-ink)]/30">
            {event.images.length} photographs
          </span>
        </div>
      </div>

      {/* Photo gallery */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[1300px] px-6 md:px-12">
          <EventGallery images={event.images} />
        </div>
      </section>

      {/* Related events */}
      {relatedEvents.length > 0 && (
        <section className="py-16 md:py-20 border-t border-[color:var(--color-gold)]/10">
          <div className="mx-auto max-w-[1300px] px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: LUXURY_EASE }}
              className="text-center mb-12"
            >
              <p className="text-[10px] tracking-[0.45em] text-[color:var(--color-gold)] uppercase">
                More {event.eventType} Events
              </p>
              <h2 className="mt-3 font-serif text-[28px] md:text-[36px] font-light text-[color:var(--color-ink)]">
                Similar Stories
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedEvents.map((e, i) => (
                <EventCard key={e.id} event={e} index={i} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] font-semibold text-[color:var(--color-gold)] hover:gap-3 transition-all duration-300"
              >
                VIEW ALL EVENTS <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
