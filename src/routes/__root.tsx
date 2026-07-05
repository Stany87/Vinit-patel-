import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService", "PhotographyBusiness"],
  "name": "Vinit Patel Photography Studio",
  "alternateName": "Vinit Patel Photography",
  "description": "Best professional photography studio in Vadodara, Gujarat, India. Specialising in luxury wedding photography, sangeet coverage, engagement shoots, and baby shower photoshoots. 500+ couples served since 2014.",
  "telephone": "+91-99986-65014",
  "email": "vinitpatel0092@gmail.com",
  "url": "https://vinitpatelphotography.com",
  "image": "https://vinitpatelphotography.com/og-preview.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "28, Muktanand Society",
    "addressLocality": "Karelibaug, Vadodara",
    "addressRegion": "Gujarat",
    "postalCode": "390018",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 22.3506765,
    "longitude": 73.2009101
  },
  "priceRange": "₹₹₹",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "09:00",
    "closes": "21:00"
  },
  "areaServed": [
    { "@type": "City", "name": "Vadodara" },
    { "@type": "State", "name": "Gujarat" },
    { "@type": "Country", "name": "India" }
  ],
  "sameAs": [
    "https://www.instagram.com/vinitpatelphotography",
    "https://www.facebook.com/vinitpatelphotography"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Photography Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wedding Photography", "description": "Luxury wedding photography covering all ceremonies — mehndi, haldi, pheras and reception." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sangeet Photography", "description": "Vibrant sangeet night photography capturing dance, music, and celebration." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Baby Shower Photography", "description": "Heartwarming baby shower and godh bharai photoshoots celebrating new beginnings." } }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "ratingCount": "127",
    "reviewCount": "98"
  },
  "review": [
    { "@type": "Review", "author": { "@type": "Person", "name": "Pratik & Hetal" }, "datePublished": "2025-03-15", "reviewBody": "Vinit bhai and his team are simply amazing. Every photo is a masterpiece we will treasure forever.", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" } },
    { "@type": "Review", "author": { "@type": "Person", "name": "Riddhi & Tejas" }, "datePublished": "2025-01-20", "reviewBody": "The pictures are beyond beautiful. Every emotion was captured so perfectly.", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" } },
    { "@type": "Review", "author": { "@type": "Person", "name": "Jinal & Hardik" }, "datePublished": "2024-11-08", "reviewBody": "A truly wonderful experience. Our baby shower memories are now timeless photographs.", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" } }
  ]
};

const PHOTOGRAPHER_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Vinit Patel",
  "jobTitle": "Professional Wedding Photographer",
  "description": "Best professional photographer in Vadodara, Gujarat — founder of Vinit Patel Photography Studio.",
  "worksFor": { "@type": "Organization", "name": "Vinit Patel Photography Studio" },
  "address": { "@type": "PostalAddress", "addressLocality": "Vadodara", "addressRegion": "Gujarat", "addressCountry": "IN" },
  "knowsAbout": ["Wedding Photography", "Sangeet Photography", "Baby Shower Photography", "Event Photography"]
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Who is the best photographer in Vadodara?", "acceptedAnswer": { "@type": "Answer", "text": "Vinit Patel Photography Studio is widely regarded as one of the best photography studios in Vadodara, Gujarat. With 10+ years of experience and 500+ happy couples, we specialise in luxury wedding photography, sangeet coverage, and baby shower photoshoots." } },
    { "@type": "Question", "name": "What types of events does Vinit Patel Photography Studio cover?", "acceptedAnswer": { "@type": "Answer", "text": "We are a professional photography studio in Vadodara specialising in weddings, sangeet nights, haldi ceremonies, engagements, couple shoots, and baby showers across Gujarat and India." } },
    { "@type": "Question", "name": "How far in advance should I book a photographer in Vadodara?", "acceptedAnswer": { "@type": "Answer", "text": "We recommend booking at least 3–6 months in advance for weddings and major events to ensure your preferred date is available." } },
    { "@type": "Question", "name": "What is the starting price for wedding photography in Vadodara?", "acceptedAnswer": { "@type": "Answer", "text": "Our Classic wedding photography package starts at ₹25,000. We also offer Royal (₹45,000) and Legacy (₹75,000) packages, plus fully bespoke custom packages." } },
    { "@type": "Question", "name": "How long does it take to receive the final photographs?", "acceptedAnswer": { "@type": "Answer", "text": "Edited photos are typically delivered within 3–4 weeks. We also offer a same-day sneak peek with select packages." } },
    { "@type": "Question", "name": "Do you offer photography services outside Vadodara?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! While based in Vadodara, Gujarat, we cover weddings across India including Ahmedabad, Surat, Mumbai, Rajkot, and destination weddings." } }
  ]
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Vinit Patel Photography Studio — Luxury Wedding Photography Vadodara" },
      { name: "description", content: "Award-winning luxury wedding, sangeet, engagement & baby shower photographer in Vadodara, Gujarat. Capturing timeless moments with an editorial eye." },
      { name: "keywords", content: "wedding photographer vadodara, luxury wedding photography gujarat, sangeet photographer, engagement photographer vadodara, Vinit Patel Photography" },
      { property: "og:title", content: "Vinit Patel Photography Studio — Luxury Wedding Photography" },
      { property: "og:description", content: "Luxury wedding photography in Vadodara & Gujarat — creating timeless memories that last forever." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Vinit Patel Photography Studio" },
      { name: "twitter:description", content: "Luxury wedding photography in Vadodara & Gujarat." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/logo.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Great+Vibes&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PHOTOGRAPHER_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
