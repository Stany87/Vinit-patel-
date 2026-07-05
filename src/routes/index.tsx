import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/HomePage";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Vinit Patel Photography Studio | Best Wedding Photographer in Vadodara, Gujarat" },
      { name: "description", content: "Vinit Patel Photography Studio — the top-rated professional photographer in Vadodara, Gujarat. We specialise in luxury wedding photography, sangeet coverage, engagement shoots & baby shower photoshoots. 500+ happy couples. Book today!" },
      { name: "keywords", content: "best photographer in vadodara, photography studios in vadodara, professional photography studio, wedding photographer vadodara, best wedding photographer gujarat, sangeet photographer, baby shower photographer vadodara, luxury wedding photography gujarat, Vinit Patel Photography, event photographer vadodara" },
      { property: "og:title", content: "Vinit Patel Photography Studio | Best Wedding Photographer in Vadodara" },
      { property: "og:description", content: "Luxury wedding & event photography in Vadodara, Gujarat. 500+ couples trust us to capture their most special moments." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vinitpatelphotography.com/" },
      { property: "og:image", content: "https://vinitpatelphotography.com/og-preview.jpg" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Vinit Patel Photography Studio — Best Photographer in Vadodara" },
      { name: "twitter:description", content: "Luxury wedding & event photography in Vadodara, Gujarat." },
      { name: "twitter:image", content: "https://vinitpatelphotography.com/og-preview.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://vinitpatelphotography.com/" },
    ],
  }),
});
