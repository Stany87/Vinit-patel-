import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/HomePage";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Vinit Patel Photography | Best Wedding Photographer in Vadodara, Gujarat" },
      { name: "description", content: "Vinit Patel Photography — the top-rated professional photographer in Vadodara, Gujarat. We specialise in luxury wedding photography, sangeet coverage, engagement shoots & baby shoot photoshoots. 500+ happy couples. Book today!" },
      { name: "keywords", content: "best photographer in vadodara, photography in vadodara, professional photography, wedding photographer vadodara, best wedding photographer gujarat, sangeet photographer, baby shoot photographer vadodara, luxury wedding photography gujarat, Vinit Patel Photography, event photographer vadodara" },
      { property: "og:title", content: "Vinit Patel Photography | Best Wedding Photographer in Vadodara" },
      { property: "og:description", content: "Luxury wedding & event photography in Vadodara, Gujarat. 500+ couples trust us to capture their most special moments." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.vinitpatelphotography.in/" },
      { property: "og:image", content: "https://www.vinitpatelphotography.in/og-preview.jpg" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Vinit Patel Photography — Best Photographer in Vadodara" },
      { name: "twitter:description", content: "Luxury wedding & event photography in Vadodara, Gujarat." },
      { name: "twitter:image", content: "https://www.vinitpatelphotography.in/og-preview.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://www.vinitpatelphotography.in/" },
    ],
  }),
});
