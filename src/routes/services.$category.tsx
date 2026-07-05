import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { EventCard } from "@/components/EventCard";
import { CustomCursor } from "@/components/CustomCursor";
import { useClientEvents, getEventsByService } from "@/data/portfolioStore";
import {
  SERVICE_META,
  type ServiceCategory,
} from "@/data/portfolioData";

const SERVICE_SEO: Record<string, { title: string; desc: string }> = {
  wedding: {
    title: "Wedding Photography | Vinit Patel Photography Studio — Best Wedding Photographer Vadodara",
    desc: "Luxury wedding photography in Vadodara, Gujarat by Vinit Patel. From traditional ceremonies to modern celebrations, we capture every moment with an editorial eye. Book the best wedding photographer today.",
  },
  sangeet: {
    title: "Sangeet Photography | Vinit Patel Photography Studio — Event Photographer Vadodara",
    desc: "Professional sangeet night photography in Vadodara, Gujarat. Vibrant dance, music & celebration coverage by Vinit Patel Photography Studio.",
  },
  "baby-shower": {
    title: "Baby Shower Photography | Vinit Patel Photography Studio — Vadodara Photographer",
    desc: "Beautiful baby shower photoshoots in Vadodara, Gujarat. Celebrate new beginnings with Vinit Patel Photography Studio — heartwarming, creative & professional.",
  },
};

export const Route = createFileRoute("/services/$category")({
  component: ServiceCategoryPage,
  head: ({ params }) => {
    const seo = SERVICE_SEO[params.category] || { title: "Services | Vinit Patel Photography Studio", desc: "Professional photography services in Vadodara, Gujarat." };
    return {
      meta: [
        { title: seo.title },
        { name: "description", content: seo.desc },
        { property: "og:title", content: seo.title },
        { property: "og:description", content: seo.desc },
      ],
      links: [
        { rel: "canonical", href: `https://vinitpatelphotography.com/services/${params.category}` },
      ],
    };
  },
});

function ServiceCategoryPage() {
  const { category } = Route.useParams();
  const cat = category as ServiceCategory;
  const meta = SERVICE_META[cat];
  const { events: allEvents } = useClientEvents();

  if (!meta) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: "#f8f7f3" }}>
        <p className="text-[color:var(--color-ink)]/40 text-sm tracking-wider">Service not found.</p>
      </div>
    );
  }

  const events = getEventsByService(allEvents, cat);

  return (
    <div
      className="min-h-screen antialiased"
      style={{ fontFamily: "Inter, sans-serif", background: "#f8f7f3" }}
    >
      <CustomCursor />

      <PageHeader
        title={meta.title}
        subtitle={meta.subtitle}
        backTo="/"
        backLabel="Back to Home"
        coverImage={meta.coverImage}
      />

      {/* Events grid */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1300px] px-6 md:px-12">
          {/* Count header */}
          <p className="text-[11px] tracking-[0.3em] text-[color:var(--color-ink)]/35 mb-10 uppercase">
            {events.length} event{events.length !== 1 ? "s" : ""} in our collection
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>

          {events.length === 0 && (
            <p className="text-center text-[color:var(--color-ink)]/30 py-20 text-sm tracking-wider">
              No events found for this service.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
