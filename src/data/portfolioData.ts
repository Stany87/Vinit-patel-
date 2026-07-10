import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";
import p9 from "@/assets/p9.jpg";
import svcWedding from "@/assets/service-wedding.jpg";
import svcSangeet from "@/assets/service-sangeet.jpg";
import svcBaby from "@/assets/service-baby.jpg";

/* ─────────────────────────────────────────────
   Service Category Types
   ───────────────────────────────────────────── */
export type ServiceCategory = "pre-wedding" | "wedding" | "baby-shoot";

export const SERVICE_META: Record<
  ServiceCategory,
  { title: string; subtitle: string; coverImage: string; eventTypes: EventType[] }
> = {
  "pre-wedding": {
    title: "Pre Wedding",
    subtitle: "Magical moments, stunning locations, and beautiful chemistry captured.",
    coverImage: svcSangeet,
    eventTypes: ["Couple Shoot", "Sangeet", "Engagement"],
  },
  wedding: {
    title: "Wedding Photography",
    subtitle: "From dreamy ceremonies to grand celebrations — every emotion, every detail.",
    coverImage: svcWedding,
    eventTypes: ["Wedding", "Haldi"],
  },
  "baby-shoot": {
    title: "Baby Shower",
    subtitle: "Celebrating new beginnings with love, joy and heartwarming baby/maternity moments.",
    coverImage: svcBaby,
    eventTypes: ["Baby Shower"],
  },
};

/* ─────────────────────────────────────────────
   Event / Image Types
   ───────────────────────────────────────────── */
export type EventType = string;

export interface EventImage {
  src: string;
  alt: string;
}

export interface EventVideo {
  src: string;
  alt: string;
}

export interface ClientEvent {
  id: string;
  clientNames: string;
  eventType: EventType;
  location: string;
  date: string;
  coverImage: string;
  images: EventImage[];
  videos?: EventVideo[];
}

/* ─────────────────────────────────────────────
   All Client Events
   ───────────────────────────────────────────── */
export const CLIENT_EVENTS: ClientEvent[] = [
  {
    "id": "couple-photos",
    "clientNames": "Couple Portraits",
    "eventType": "Couple Shoot",
    "location": "Vadodara",
    "date": "October 2024",
    "coverImage": "/events/couple-photos/image_1.jpg",
    "images": [
      {
        "src": "/events/couple-photos/image_1.jpg",
        "alt": "Couple Portraits - Photo 1"
      },
      {
        "src": "/events/couple-photos/image_2.jpg",
        "alt": "Couple Portraits - Photo 2"
      },
      {
        "src": "/events/couple-photos/image_3.jpg",
        "alt": "Couple Portraits - Photo 3"
      },
      {
        "src": "/events/couple-photos/image_4.jpg",
        "alt": "Couple Portraits - Photo 4"
      },
      {
        "src": "/events/couple-photos/image_5.jpg",
        "alt": "Couple Portraits - Photo 5"
      },
      {
        "src": "/events/couple-photos/image_6.jpg",
        "alt": "Couple Portraits - Photo 6"
      },
      {
        "src": "/events/couple-photos/image_7.jpg",
        "alt": "Couple Portraits - Photo 7"
      },
      {
        "src": "/events/couple-photos/image_8.jpg",
        "alt": "Couple Portraits - Photo 8"
      },
      {
        "src": "/events/couple-photos/image_9.jpg",
        "alt": "Couple Portraits - Photo 9"
      },
      {
        "src": "/events/couple-photos/image_10.jpg",
        "alt": "Couple Portraits - Photo 10"
      },
      {
        "src": "/events/couple-photos/image_11.jpg",
        "alt": "Couple Portraits - Photo 11"
      },
      {
        "src": "/events/couple-photos/image_12.jpg",
        "alt": "Couple Portraits - Photo 12"
      }
    ]
  },
  {
    "id": "groom-collection",
    "clientNames": "Groom Diaries",
    "eventType": "Wedding",
    "location": "Gujarat",
    "date": "November 2024",
    "coverImage": "/events/groom-collection/image_1.jpg",
    "images": [
      {
        "src": "/events/groom-collection/image_1.jpg",
        "alt": "Groom Diaries - Photo 1"
      },
      {
        "src": "/events/groom-collection/image_2.jpg",
        "alt": "Groom Diaries - Photo 2"
      },
      {
        "src": "/events/groom-collection/image_3.jpg",
        "alt": "Groom Diaries - Photo 3"
      },
      {
        "src": "/events/groom-collection/image_4.jpg",
        "alt": "Groom Diaries - Photo 4"
      },
      {
        "src": "/events/groom-collection/image_5.jpg",
        "alt": "Groom Diaries - Photo 5"
      },
      {
        "src": "/events/groom-collection/image_6.jpg",
        "alt": "Groom Diaries - Photo 6"
      },
      {
        "src": "/events/groom-collection/image_7.jpg",
        "alt": "Groom Diaries - Photo 7"
      },
      {
        "src": "/events/groom-collection/image_8.jpg",
        "alt": "Groom Diaries - Photo 8"
      },
      {
        "src": "/events/groom-collection/image_9.jpg",
        "alt": "Groom Diaries - Photo 9"
      },
      {
        "src": "/events/groom-collection/image_10.jpg",
        "alt": "Groom Diaries - Photo 10"
      },
      {
        "src": "/events/groom-collection/image_11.jpg",
        "alt": "Groom Diaries - Photo 11"
      },
      {
        "src": "/events/groom-collection/image_12.jpg",
        "alt": "Groom Diaries - Photo 12"
      }
    ]
  },
  {
    "id": "haldi-celebration",
    "clientNames": "Haldi Splash",
    "eventType": "Haldi",
    "location": "Baroda",
    "date": "December 2024",
    "coverImage": "/events/haldi-celebration/image_1.jpg",
    "images": [
      {
        "src": "/events/haldi-celebration/image_1.jpg",
        "alt": "Haldi Splash - Photo 1"
      },
      {
        "src": "/events/haldi-celebration/image_2.jpg",
        "alt": "Haldi Splash - Photo 2"
      },
      {
        "src": "/events/haldi-celebration/image_3.jpg",
        "alt": "Haldi Splash - Photo 3"
      },
      {
        "src": "/events/haldi-celebration/image_4.jpg",
        "alt": "Haldi Splash - Photo 4"
      },
      {
        "src": "/events/haldi-celebration/image_5.jpg",
        "alt": "Haldi Splash - Photo 5"
      },
      {
        "src": "/events/haldi-celebration/image_6.jpg",
        "alt": "Haldi Splash - Photo 6"
      },
      {
        "src": "/events/haldi-celebration/image_7.jpg",
        "alt": "Haldi Splash - Photo 7"
      },
      {
        "src": "/events/haldi-celebration/image_8.jpg",
        "alt": "Haldi Splash - Photo 8"
      },
      {
        "src": "/events/haldi-celebration/image_9.jpg",
        "alt": "Haldi Splash - Photo 9"
      },
      {
        "src": "/events/haldi-celebration/image_10.jpg",
        "alt": "Haldi Splash - Photo 10"
      },
      {
        "src": "/events/haldi-celebration/image_11.jpg",
        "alt": "Haldi Splash - Photo 11"
      },
      {
        "src": "/events/haldi-celebration/image_12.jpg",
        "alt": "Haldi Splash - Photo 12"
      }
    ]
  },
  {
    "id": "pre-wedding-stories",
    "clientNames": "Pre Wedding Tales",
    "eventType": "Couple Shoot",
    "location": "Vadodara",
    "date": "September 2024",
    "coverImage": "/events/pre-wedding-stories/image_1.jpg",
    "images": [
      {
        "src": "/events/pre-wedding-stories/image_1.jpg",
        "alt": "Pre Wedding Tales - Photo 1"
      },
      {
        "src": "/events/pre-wedding-stories/image_2.jpg",
        "alt": "Pre Wedding Tales - Photo 2"
      },
      {
        "src": "/events/pre-wedding-stories/image_3.jpg",
        "alt": "Pre Wedding Tales - Photo 3"
      },
      {
        "src": "/events/pre-wedding-stories/image_4.jpg",
        "alt": "Pre Wedding Tales - Photo 4"
      },
      {
        "src": "/events/pre-wedding-stories/image_5.jpg",
        "alt": "Pre Wedding Tales - Photo 5"
      },
      {
        "src": "/events/pre-wedding-stories/image_6.jpg",
        "alt": "Pre Wedding Tales - Photo 6"
      },
      {
        "src": "/events/pre-wedding-stories/image_7.jpg",
        "alt": "Pre Wedding Tales - Photo 7"
      },
      {
        "src": "/events/pre-wedding-stories/image_8.jpg",
        "alt": "Pre Wedding Tales - Photo 8"
      },
      {
        "src": "/events/pre-wedding-stories/image_9.jpg",
        "alt": "Pre Wedding Tales - Photo 9"
      },
      {
        "src": "/events/pre-wedding-stories/image_10.jpg",
        "alt": "Pre Wedding Tales - Photo 10"
      },
      {
        "src": "/events/pre-wedding-stories/image_11.jpg",
        "alt": "Pre Wedding Tales - Photo 11"
      },
      {
        "src": "/events/pre-wedding-stories/image_12.jpg",
        "alt": "Pre Wedding Tales - Photo 12"
      }
    ]
  },
  {
    "id": "ring-ceremony",
    "clientNames": "Engagement & Rings",
    "eventType": "Engagement",
    "location": "Ahmedabad",
    "date": "August 2024",
    "coverImage": "/events/ring-ceremony/image_1.jpg",
    "images": [
      {
        "src": "/events/ring-ceremony/image_1.jpg",
        "alt": "Engagement & Rings - Photo 1"
      },
      {
        "src": "/events/ring-ceremony/image_2.jpg",
        "alt": "Engagement & Rings - Photo 2"
      },
      {
        "src": "/events/ring-ceremony/image_3.jpg",
        "alt": "Engagement & Rings - Photo 3"
      },
      {
        "src": "/events/ring-ceremony/image_4.jpg",
        "alt": "Engagement & Rings - Photo 4"
      },
      {
        "src": "/events/ring-ceremony/image_5.jpg",
        "alt": "Engagement & Rings - Photo 5"
      },
      {
        "src": "/events/ring-ceremony/image_6.jpg",
        "alt": "Engagement & Rings - Photo 6"
      },
      {
        "src": "/events/ring-ceremony/image_7.jpg",
        "alt": "Engagement & Rings - Photo 7"
      },
      {
        "src": "/events/ring-ceremony/image_8.jpg",
        "alt": "Engagement & Rings - Photo 8"
      },
      {
        "src": "/events/ring-ceremony/image_9.jpg",
        "alt": "Engagement & Rings - Photo 9"
      },
      {
        "src": "/events/ring-ceremony/image_10.jpg",
        "alt": "Engagement & Rings - Photo 10"
      },
      {
        "src": "/events/ring-ceremony/image_11.jpg",
        "alt": "Engagement & Rings - Photo 11"
      },
      {
        "src": "/events/ring-ceremony/image_12.jpg",
        "alt": "Engagement & Rings - Photo 12"
      }
    ]
  },
  {
    "id": "baby-shower-joy",
    "clientNames": "Baby Shower Joy",
    "eventType": "Baby Shower",
    "location": "Anand",
    "date": "July 2024",
    "coverImage": "/events/baby-shower-joy/image_1.jpg",
    "images": [
      {
        "src": "/events/baby-shower-joy/image_1.jpg",
        "alt": "Baby Shower Joy - Photo 1"
      },
      {
        "src": "/events/baby-shower-joy/image_2.jpg",
        "alt": "Baby Shower Joy - Photo 2"
      },
      {
        "src": "/events/baby-shower-joy/image_3.jpg",
        "alt": "Baby Shower Joy - Photo 3"
      },
      {
        "src": "/events/baby-shower-joy/image_4.jpg",
        "alt": "Baby Shower Joy - Photo 4"
      },
      {
        "src": "/events/baby-shower-joy/image_5.jpg",
        "alt": "Baby Shower Joy - Photo 5"
      },
      {
        "src": "/events/baby-shower-joy/image_6.jpg",
        "alt": "Baby Shower Joy - Photo 6"
      },
      {
        "src": "/events/baby-shower-joy/image_7.jpg",
        "alt": "Baby Shower Joy - Photo 7"
      },
      {
        "src": "/events/baby-shower-joy/image_8.jpg",
        "alt": "Baby Shower Joy - Photo 8"
      },
      {
        "src": "/events/baby-shower-joy/image_9.jpg",
        "alt": "Baby Shower Joy - Photo 9"
      },
      {
        "src": "/events/baby-shower-joy/image_10.jpg",
        "alt": "Baby Shower Joy - Photo 10"
      },
      {
        "src": "/events/baby-shower-joy/image_11.jpg",
        "alt": "Baby Shower Joy - Photo 11"
      },
      {
        "src": "/events/baby-shower-joy/image_12.jpg",
        "alt": "Baby Shower Joy - Photo 12"
      }
    ]
  },
  {
    "id": "bridal-portraits",
    "clientNames": "Bridal Portraits",
    "eventType": "Wedding",
    "location": "Vadodara",
    "date": "June 2024",
    "coverImage": "/events/bridal-portraits/image_1.jpg",
    "images": [
      {
        "src": "/events/bridal-portraits/image_1.jpg",
        "alt": "Bridal Portraits - Photo 1"
      },
      {
        "src": "/events/bridal-portraits/image_2.jpg",
        "alt": "Bridal Portraits - Photo 2"
      },
      {
        "src": "/events/bridal-portraits/image_3.jpg",
        "alt": "Bridal Portraits - Photo 3"
      },
      {
        "src": "/events/bridal-portraits/image_4.jpg",
        "alt": "Bridal Portraits - Photo 4"
      },
      {
        "src": "/events/bridal-portraits/image_5.jpg",
        "alt": "Bridal Portraits - Photo 5"
      },
      {
        "src": "/events/bridal-portraits/image_6.jpg",
        "alt": "Bridal Portraits - Photo 6"
      },
      {
        "src": "/events/bridal-portraits/image_7.jpg",
        "alt": "Bridal Portraits - Photo 7"
      },
      {
        "src": "/events/bridal-portraits/image_8.jpg",
        "alt": "Bridal Portraits - Photo 8"
      },
      {
        "src": "/events/bridal-portraits/image_9.jpg",
        "alt": "Bridal Portraits - Photo 9"
      },
      {
        "src": "/events/bridal-portraits/image_10.jpg",
        "alt": "Bridal Portraits - Photo 10"
      },
      {
        "src": "/events/bridal-portraits/image_11.jpg",
        "alt": "Bridal Portraits - Photo 11"
      },
      {
        "src": "/events/bridal-portraits/image_12.jpg",
        "alt": "Bridal Portraits - Photo 12"
      }
    ]
  }
];

/* ─────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────── */

/** Get all events for a service category */
export function getEventsByService(category: ServiceCategory): ClientEvent[] {
  const meta = SERVICE_META[category];
  if (!meta) return [];
  return CLIENT_EVENTS.filter((e) => meta.eventTypes.includes(e.eventType));
}

/** Get all events for a specific event type */
export function getEventsByType(type: EventType): ClientEvent[] {
  return CLIENT_EVENTS.filter((e) => e.eventType === type);
}

/** Get a single event by its ID */
export function getEventById(id: string): ClientEvent | undefined {
  return CLIENT_EVENTS.find((e) => e.id === id);
}

/** Get all unique event types */
export function getAllEventTypes(): EventType[] {
  return [...new Set(CLIENT_EVENTS.map((e) => e.eventType))];
}

/** Map old flat PortfolioImage to events (for backward compat with Portfolio section) */
export interface PortfolioImage {
  id: number;
  src: string;
  alt: string;
  categories: EventType[];
  eventId: string;
}

export const PORTFOLIO_IMAGES: PortfolioImage[] = CLIENT_EVENTS.flatMap((event) =>
  event.images.map((img, idx) => ({
    id: parseInt(event.id.replace(/\D/g, "") || "0", 10) * 100 + idx,
    src: img.src,
    alt: img.alt,
    categories: [event.eventType],
    eventId: event.id,
  })),
);
