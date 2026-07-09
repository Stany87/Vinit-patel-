import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  ArrowRight,
  Lock,
  Plus,
  X,
  Upload,
  Video,
  Image as ImageIcon,
  Save,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { EventGallery } from "@/components/EventGallery";
import { EventCard } from "@/components/EventCard";
import { CustomCursor } from "@/components/CustomCursor";
import { useClientEvents, getEventById } from "@/data/portfolioStore";
import { LUXURY_EASE } from "@/animations/hero";
import type { EventImage, EventVideo } from "@/data/portfolioData";

export const Route = createFileRoute("/event/$eventId")({
  component: EventDetailPage,
  head: ({ params }) => ({
    meta: [
      { title: `Event Gallery — Vinit Patel Photography | Professional Photographer Vadodara` },
      { name: "description", content: `View this stunning event gallery by Vinit Patel Photography — the best professional photographer in Vadodara, Gujarat. Wedding, sangeet & celebration photography at its finest.` },
    ],
    links: [
      { rel: "canonical", href: `https://vinitpatelphotography.com/event/${params.eventId}` },
    ],
  }),
});

function EventDetailPage() {
  const { eventId } = Route.useParams();
  const { events, updateEvent } = useClientEvents();
  const event = getEventById(events, eventId);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [eventImages, setEventImages] = useState<EventImage[]>([]);
  const [eventVideos, setEventVideos] = useState<EventVideo[]>([]);
  const [newImageLink, setNewImageLink] = useState("");
  const [newVideoLink, setNewVideoLink] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdmin(localStorage.getItem("vp_admin_logged_in") === "true");
    }
  }, []);

  useEffect(() => {
    if (event) {
      setEventImages(event.images || []);
      setEventVideos(event.videos || []);
    }
  }, [event]);

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

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>, isImage: boolean) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (isImage) {
          setEventImages((prev) => [...prev, { src: base64String, alt: file.name.split(".")[0] }]);
        } else {
          setEventVideos((prev) => [...prev, { src: base64String, alt: file.name.split(".")[0] }]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSaveChanges = () => {
    updateEvent({
      ...event,
      images: eventImages,
      videos: eventVideos,
    });
    alert("Event media saved successfully!");
  };

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
            {eventImages.length} photographs
          </span>
          {eventVideos.length > 0 && (
            <span className="text-[11px] tracking-[0.15em] text-[color:var(--color-ink)]/30">
              {eventVideos.length} video highlights
            </span>
          )}
        </div>
      </div>

      {/* Admin Panel Controls */}
      {isAdmin && (
        <div className="mx-auto max-w-[1300px] px-6 md:px-12 mt-6">
          <div className="bg-white border border-[color:var(--color-gold)]/20 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className="w-full flex items-center justify-between px-6 py-4 bg-neutral-50 hover:bg-neutral-100/80 transition-colors text-left"
            >
              <div className="flex items-center gap-2 text-[color:var(--color-ink)]">
                <Lock size={14} className="text-[color:var(--color-gold)]" />
                <span className="text-[11px] tracking-[0.2em] font-semibold uppercase">
                  Admin Controls: Manage Event Media
                </span>
              </div>
              <span className="text-xs text-neutral-400 font-medium">
                {isPanelOpen ? "COLLAPSE [-]" : "EXPAND [+]"}
              </span>
            </button>

            {isPanelOpen && (
              <div className="p-6 space-y-6 border-t border-neutral-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Photo Management Column */}
                  <div className="space-y-4">
                    <h3 className="text-xs tracking-[0.15em] font-semibold text-[color:var(--color-ink)] uppercase border-b pb-2 flex items-center gap-1.5">
                      <ImageIcon size={14} className="text-[color:var(--color-gold)]" />
                      Photos ({eventImages.length})
                    </h3>

                    {/* Add Photo Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add photo link..."
                        value={newImageLink}
                        onChange={(e) => setNewImageLink(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (newImageLink.trim()) {
                              setEventImages((prev) => [...prev, { src: newImageLink.trim(), alt: "Event Photo" }]);
                              setNewImageLink("");
                            }
                          }
                        }}
                        className="flex-grow rounded-lg border border-neutral-200 px-3 py-2 text-xs text-[color:var(--color-ink)] placeholder-neutral-400 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newImageLink.trim()) {
                            setEventImages((prev) => [...prev, { src: newImageLink.trim(), alt: "Event Photo" }]);
                            setNewImageLink("");
                          }
                        }}
                        className="bg-[color:var(--color-gold)] text-[color:var(--color-ink)] px-4 py-2 text-[10px] tracking-wider font-semibold rounded-lg hover:bg-[color:var(--color-gold-soft)] transition-colors"
                      >
                        ADD
                      </button>
                    </div>

                    {/* Local Photo Upload */}
                    <div className="flex items-center gap-2">
                      <label className="flex-grow inline-flex items-center justify-center gap-1.5 border border-dashed border-neutral-300 hover:border-[color:var(--color-gold)] hover:bg-neutral-50 px-4 py-2.5 rounded-lg text-xs text-neutral-500 cursor-pointer transition-colors">
                        <Upload size={14} />
                        Upload Local Photos
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleMediaUpload(e, true)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Photo Thumbnails */}
                    <div className="grid grid-cols-4 gap-2 max-h-[220px] overflow-y-auto p-2 bg-neutral-50/50 border rounded-lg">
                      {eventImages.map((img, i) => (
                        <div key={i} className="relative aspect-square overflow-hidden rounded border border-neutral-200 group bg-white">
                          <img src={img.src} alt="" className="h-full w-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setEventImages((prev) => prev.filter((_, idx) => idx !== i))}
                            className="absolute top-1 right-1 h-5 w-5 bg-black/60 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-colors"
                          >
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Video Management Column */}
                  <div className="space-y-4">
                    <h3 className="text-xs tracking-[0.15em] font-semibold text-[color:var(--color-ink)] uppercase border-b pb-2 flex items-center gap-1.5">
                      <Video size={14} className="text-[color:var(--color-gold)]" />
                      Videos ({eventVideos.length})
                    </h3>

                    {/* Add Video Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add YouTube or MP4 link..."
                        value={newVideoLink}
                        onChange={(e) => setNewVideoLink(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (newVideoLink.trim()) {
                              setEventVideos((prev) => [...prev, { src: newVideoLink.trim(), alt: "Event Video" }]);
                              setNewVideoLink("");
                            }
                          }
                        }}
                        className="flex-grow rounded-lg border border-neutral-200 px-3 py-2 text-xs text-[color:var(--color-ink)] placeholder-neutral-400 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newVideoLink.trim()) {
                            setEventVideos((prev) => [...prev, { src: newVideoLink.trim(), alt: "Event Video" }]);
                            setNewVideoLink("");
                          }
                        }}
                        className="bg-[color:var(--color-gold)] text-[color:var(--color-ink)] px-4 py-2 text-[10px] tracking-wider font-semibold rounded-lg hover:bg-[color:var(--color-gold-soft)] transition-colors"
                      >
                        ADD
                      </button>
                    </div>

                    {/* Local Video Upload */}
                    <div className="flex items-center gap-2">
                      <label className="flex-grow inline-flex items-center justify-center gap-1.5 border border-dashed border-neutral-300 hover:border-[color:var(--color-gold)] hover:bg-neutral-50 px-4 py-2.5 rounded-lg text-xs text-neutral-500 cursor-pointer transition-colors">
                        <Upload size={14} />
                        Upload Local Videos
                        <input
                          type="file"
                          multiple
                          accept="video/*"
                          onChange={(e) => handleMediaUpload(e, false)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Video Thumbnails */}
                    <div className="grid grid-cols-4 gap-2 max-h-[220px] overflow-y-auto p-2 bg-neutral-50/50 border rounded-lg">
                      {eventVideos.map((vid, i) => {
                        const isYT = vid.src.includes("youtube.com") || vid.src.includes("youtu.be");
                        return (
                          <div key={i} className="relative aspect-square overflow-hidden rounded border border-neutral-200 group bg-neutral-900 flex items-center justify-center text-white">
                            {isYT ? (
                              <span className="text-[9px] text-red-500 font-semibold uppercase">YouTube</span>
                            ) : (
                              <video src={vid.src} className="h-full w-full object-cover" preload="metadata" />
                            )}
                            <button
                              type="button"
                              onClick={() => setEventVideos((prev) => prev.filter((_, idx) => idx !== i))}
                              className="absolute top-1 right-1 h-5 w-5 bg-black/60 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-colors"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Save Buttons Panel */}
                <div className="flex items-center justify-between border-t pt-4">
                  <p className="text-[10px] text-neutral-400">
                    💡 Click "Save Changes" to write updates permanently to the event database.
                  </p>
                  <button
                    onClick={handleSaveChanges}
                    className="inline-flex items-center gap-1.5 bg-[color:var(--color-ink)] text-white px-6 py-2.5 text-[10px] tracking-[0.2em] font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    <Save size={13} />
                    SAVE CHANGES
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Photo gallery */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[1300px] px-6 md:px-12">
          <EventGallery images={eventImages} videos={eventVideos} />
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
