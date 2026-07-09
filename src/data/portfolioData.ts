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
    title: "Baby Shoot",
    subtitle: "Celebrating new beginnings with love, joy and heartwarming baby/maternity moments.",
    coverImage: svcBaby,
    eventTypes: ["Baby Shower"],
  },
};

/* ─────────────────────────────────────────────
   Event / Image Types
   ───────────────────────────────────────────── */
export type EventType =
  | "Wedding"
  | "Sangeet"
  | "Haldi"
  | "Engagement"
  | "Couple Shoot"
  | "Baby Shower";

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
    id: "pratik-hetal-wedding",
    clientNames: "Pratik & Hetal",
    eventType: "Wedding",
    location: "Vadodara",
    date: "December 2024",
    coverImage: p1,
    images: [
      { src: p1, alt: "Wedding ceremony" },
      { src: p3, alt: "Couple portrait" },
      { src: p6, alt: "Wedding reception" },
      { src: svcWedding, alt: "Mandap details" },
    ],
  },
  {
    id: "riddhi-tejas-sangeet",
    clientNames: "Riddhi & Tejas",
    eventType: "Sangeet",
    location: "Surat",
    date: "November 2024",
    coverImage: p2,
    images: [
      { src: p2, alt: "Sangeet night" },
      { src: p8, alt: "Sangeet dance" },
      { src: svcSangeet, alt: "Stage performance" },
    ],
  },
  {
    id: "jinal-hardik-babyshower",
    clientNames: "Jinal & Hardik",
    eventType: "Baby Shower",
    location: "Anand",
    date: "October 2024",
    coverImage: p4,
    images: [
      { src: p4, alt: "Baby shower celebration" },
      { src: svcBaby, alt: "Baby shower decorations" },
      { src: p7, alt: "Family celebrations" },
    ],
  },
  {
    id: "priya-nikhil-engagement",
    clientNames: "Priya & Nikhil",
    eventType: "Engagement",
    location: "Ahmedabad",
    date: "September 2024",
    coverImage: p5,
    images: [
      { src: p5, alt: "Engagement shoot" },
      { src: p9, alt: "Ring ceremony" },
      { src: p3, alt: "Couple moment" },
    ],
  },
  {
    id: "meera-raj-haldi",
    clientNames: "Meera & Raj",
    eventType: "Haldi",
    location: "Vadodara",
    date: "August 2024",
    coverImage: p7,
    images: [
      { src: p7, alt: "Haldi ceremony" },
      { src: p8, alt: "Haldi celebration" },
      { src: p1, alt: "Pre-wedding rituals" },
    ],
  },
  {
    id: "ananya-vikram-coupleShoot",
    clientNames: "Ananya & Vikram",
    eventType: "Couple Shoot",
    location: "Udaipur",
    date: "July 2024",
    coverImage: p9,
    images: [
      { src: p9, alt: "Couple shoot" },
      { src: p3, alt: "Romantic portrait" },
      { src: p5, alt: "Sunset shoot" },
      { src: p6, alt: "Palace backdrop" },
    ],
  },
  {
    id: "kavya-arjun-wedding",
    clientNames: "Kavya & Arjun",
    eventType: "Wedding",
    location: "Rajkot",
    date: "June 2024",
    coverImage: p6,
    images: [
      { src: p6, alt: "Grand reception" },
      { src: p1, alt: "Wedding vows" },
      { src: p2, alt: "Mehendi night" },
      { src: p4, alt: "Baraat arrival" },
    ],
  },
  {
    id: "nisha-dev-sangeet",
    clientNames: "Nisha & Dev",
    eventType: "Sangeet",
    location: "Mumbai",
    date: "May 2024",
    coverImage: p8,
    images: [
      { src: p8, alt: "Sangeet dance-off" },
      { src: p2, alt: "Stage performance" },
      { src: p5, alt: "Fun moments" },
    ],
  },
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
