import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { EventCard } from "@/components/EventCard";
import { CustomCursor } from "@/components/CustomCursor";
import { useClientEvents } from "@/data/portfolioStore";
import { type EventType } from "@/data/portfolioData";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
});

function GalleryPage() {
  const { events } = useClientEvents();
  const [activeType, setActiveType] = useState<EventType | "All">("All");

  // Dynamically find all event types present in the store
  const allTypes = Array.from(new Set(events.map((e) => e.eventType)));

  const filtered =
    activeType === "All"
      ? events
      : events.filter((e) => e.eventType === activeType);

  return (
    <div
      className="min-h-screen antialiased"
      style={{ fontFamily: "Inter, sans-serif", background: "#f8f7f3" }}
    >
      <CustomCursor />

      <PageHeader
        title="Our Gallery"
        subtitle="Browse through our complete collection of client events — each one a unique story beautifully told."
        backTo="/"
        backLabel="Back to Home"
      />

      {/* Filter bar */}
      <section
        className="sticky top-0 z-30 border-b border-[color:var(--color-gold)]/10"
        style={{ background: "rgba(248,247,243,0.92)", backdropFilter: "blur(12px)" }}
      >
        <div className="mx-auto max-w-[1300px] px-6 md:px-12 py-4 flex flex-wrap items-center gap-5 md:gap-8">
          {["All", ...allTypes].map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type as EventType | "All")}
              className={`relative pb-1.5 text-[11px] tracking-[0.25em] transition-colors duration-300 ${
                activeType === type
                  ? "text-[color:var(--color-gold)] font-semibold"
                  : "text-[color:var(--color-ink)]/40 hover:text-[color:var(--color-gold)]"
              }`}
            >
              {type.toUpperCase()}
              {activeType === type && (
                <motion.span
                  layoutId="gallery-filter-underline"
                  className="absolute inset-x-0 bottom-0 h-[1.5px] bg-[color:var(--color-gold)]"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Events grid */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1300px] px-6 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeType}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-center text-[color:var(--color-ink)]/30 py-20 text-sm tracking-wider">
              No events found for this category.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
