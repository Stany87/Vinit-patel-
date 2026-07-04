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
  "@type": ["LocalBusiness", "ProfessionalService"],
  "name": "Vinit Patel Photography Studio",
  "description": "Luxury wedding, sangeet, engagement and baby shower photography studio based in Vadodara, Gujarat, India.",
  "telephone": "+91-99986-65014",
  "email": "vinitpatel0092@gmail.com",
  "url": "https://vinitpatelphotography.com",
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
  "servesCuisine": null,
  "sameAs": [
    "https://www.instagram.com/vinitpatelphotography",
    "https://www.facebook.com/vinitpatelphotography"
  ]
};

const PHOTOGRAPHER_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Vinit Patel",
  "jobTitle": "Wedding Photographer",
  "worksFor": { "@type": "Organization", "name": "Vinit Patel Photography Studio" },
  "address": { "@type": "PostalAddress", "addressLocality": "Vadodara", "addressRegion": "Gujarat", "addressCountry": "IN" }
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of events does Vinit Patel Photography Studio cover?",
      "acceptedAnswer": { "@type": "Answer", "text": "We specialise in weddings, sangeet nights, haldi ceremonies, engagements, couple shoots, and baby showers across Gujarat and India." }
    },
    {
      "@type": "Question",
      "name": "How far in advance should I book Vinit Patel Photography Studio?",
      "acceptedAnswer": { "@type": "Answer", "text": "We recommend booking at least 3–6 months in advance for weddings and major events to ensure your preferred date is available." }
    },
    {
      "@type": "Question",
      "name": "What is the starting price for wedding photography?",
      "acceptedAnswer": { "@type": "Answer", "text": "Our Classic package starts at ₹25,000. We also offer Royal and Legacy packages, as well as fully bespoke custom packages tailored to your event." }
    },
    {
      "@type": "Question",
      "name": "How long does it take to receive the final photographs?",
      "acceptedAnswer": { "@type": "Answer", "text": "Edited photos are typically delivered within 3–4 weeks after the event. We also offer a same-day sneak peek with select packages." }
    }
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
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
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
