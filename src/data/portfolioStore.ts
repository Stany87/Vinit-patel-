import { useState, useEffect } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  query, 
  orderBy, 
  where, 
  writeBatch 
} from "firebase/firestore";
import { CLIENT_EVENTS as DEFAULT_EVENTS, type ClientEvent, type EventType, type ServiceCategory, SERVICE_META } from "./portfolioData";

const STORAGE_KEY = "vinit_photography_events_v3";

// Simple pub-sub listener set for client-side reactive updates
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((l) => l());
}

// Helper to check if window is defined (SSR safety)
const isBrowser = typeof window !== "undefined";

// Firebase Config from env variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

// Check if we have at least apiKey and projectId to initialize
const isFirebaseConfigured = !!(firebaseConfig.apiKey && firebaseConfig.projectId);

export const app = isFirebaseConfigured
  ? (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp())
  : null;

export const db = app ? getFirestore(app) : null;

// Helper to determine if we should use Firebase
export const isFirebaseEnabled = (): boolean => {
  return !!db;
};

/**
 * Get all events from storage. SSR safe.
 */
export function getStoredEvents(): ClientEvent[] {
  if (!isBrowser) {
    return DEFAULT_EVENTS;
  }
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      // First time initialization
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_EVENTS));
      return DEFAULT_EVENTS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to read from localStorage", error);
    return DEFAULT_EVENTS;
  }
}

/**
 * Save events array back to storage.
 */
export function saveStoredEvents(events: ClientEvent[]): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    notifyListeners();
  } catch (error) {
    console.error("Failed to save to localStorage", error);
    throw error;
  }
}

// In-memory cache for Firebase events to bypass localStorage quota limits
let firebaseEventsCache: ClientEvent[] | null = null;

/**
 * Custom React hook to subscribe to live portfolio data
 */
export function useClientEvents() {
  const [events, setEvents] = useState<ClientEvent[]>(() => {
    if (!isBrowser) return DEFAULT_EVENTS;
    if (isFirebaseEnabled() && firebaseEventsCache) {
      return firebaseEventsCache;
    }
    return getStoredEvents();
  });
  const [isLoading, setIsLoading] = useState(isFirebaseEnabled());

  const fetchEventsFromFirebase = async () => {
    if (!db) return;
    setIsLoading(true);
    try {
      // 1. Fetch all events ordered by createdAt
      const eventsRef = collection(db, "events");
      const eventsQuery = query(eventsRef, orderBy("createdAt", "desc"));
      const eventsSnapshot = await getDocs(eventsQuery);
      
      const dbEvents: any[] = [];
      eventsSnapshot.forEach((doc) => {
        dbEvents.push({ id: doc.id, ...doc.data() });
      });

      // 2. Fetch all event images
      const imagesRef = collection(db, "event_images");
      const imagesSnapshot = await getDocs(imagesRef);
      
      // Group images by eventId
      const imagesByEvent: Record<string, any[]> = {};
      imagesSnapshot.forEach((doc) => {
        const data = doc.data();
        const eventId = data.eventId;
        if (eventId) {
          if (!imagesByEvent[eventId]) {
            imagesByEvent[eventId] = [];
          }
          imagesByEvent[eventId].push({
            src: data.src || "",
            alt: data.alt || "Event Photo",
          });
        }
      });

      // 3. Combine events and images
      const mappedEvents: ClientEvent[] = dbEvents.map((e) => ({
        id: e.id,
        clientNames: e.clientNames || "",
        eventType: e.eventType as EventType,
        coverImage: e.coverImage || "",
        images: imagesByEvent[e.id] || [],
      }));

      // Update cache directly and notify all hook instances
      firebaseEventsCache = mappedEvents;
      notifyListeners();
    } catch (err) {
      console.error("Failed to fetch events from Firebase:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isBrowser) return;

    const handleUpdate = () => {
      if (isFirebaseEnabled() && firebaseEventsCache) {
        setEvents(firebaseEventsCache);
      } else {
        setEvents(getStoredEvents());
      }
    };

    listeners.add(handleUpdate);
    window.addEventListener("storage", handleUpdate);

    // If Firebase is enabled, fetch events on mount
    if (isFirebaseEnabled()) {
      fetchEventsFromFirebase();
    }

    return () => {
      listeners.delete(handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // CRUD Operations
  const addEvent = async (event: Omit<ClientEvent, "id">) => {
    const cleanNames = event.clientNames
      ? event.clientNames.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-")
      : "event";
    const typeSlug = event.eventType.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const uniqueSuffix = Math.random().toString(36).substring(2, 6);
    const newId = `${cleanNames}-${typeSlug}-${uniqueSuffix}`;
    
    const newEvent: ClientEvent = {
      ...event,
      id: newId,
    };

    if (isFirebaseEnabled() && db) {
      const batch = writeBatch(db);

      // 1. Add event document
      const eventDocRef = doc(db, "events", newId);
      batch.set(eventDocRef, {
        clientNames: event.clientNames,
        eventType: event.eventType,
        location: event.location || "",
        date: event.date || "",
        coverImage: event.coverImage,
        createdAt: new Date().toISOString()
      });

      // 2. Add images documents
      if (event.images && event.images.length > 0) {
        event.images.forEach((img) => {
          const imageDocRef = doc(collection(db, "event_images"));
          batch.set(imageDocRef, {
            eventId: newId,
            src: img.src,
            alt: img.alt || "Event Photo",
            createdAt: new Date().toISOString()
          });
        });
      }

      await batch.commit();
      await fetchEventsFromFirebase();
    } else {
      const current = getStoredEvents();
      const updated = [newEvent, ...current];
      saveStoredEvents(updated);
    }
    return newId;
  };

  const updateEvent = async (updatedEvent: ClientEvent) => {
    if (isFirebaseEnabled() && db) {
      const batch = writeBatch(db);

      // 1. Update event document
      const eventDocRef = doc(db, "events", updatedEvent.id);
      batch.set(eventDocRef, {
        clientNames: updatedEvent.clientNames,
        eventType: updatedEvent.eventType,
        location: updatedEvent.location || "",
        date: updatedEvent.date || "",
        coverImage: updatedEvent.coverImage,
      }, { merge: true });

      // 2. Delete existing images for this event
      const imagesRef = collection(db, "event_images");
      const q = query(imagesRef, where("eventId", "==", updatedEvent.id));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // 3. Add new images
      if (updatedEvent.images && updatedEvent.images.length > 0) {
        updatedEvent.images.forEach((img) => {
          const imageDocRef = doc(collection(db, "event_images"));
          batch.set(imageDocRef, {
            eventId: updatedEvent.id,
            src: img.src,
            alt: img.alt || "Event Photo",
            createdAt: new Date().toISOString()
          });
        });
      }

      await batch.commit();
      await fetchEventsFromFirebase();
    } else {
      const current = getStoredEvents();
      const updated = current.map((e) => (e.id === updatedEvent.id ? updatedEvent : e));
      saveStoredEvents(updated);
    }
  };

  const deleteEvent = async (id: string) => {
    if (isFirebaseEnabled() && db) {
      const batch = writeBatch(db);

      // 1. Delete event document
      const eventDocRef = doc(db, "events", id);
      batch.delete(eventDocRef);

      // 2. Delete related images
      const imagesRef = collection(db, "event_images");
      const q = query(imagesRef, where("eventId", "==", id));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      await fetchEventsFromFirebase();
    } else {
      const current = getStoredEvents();
      const updated = current.filter((e) => e.id !== id);
      saveStoredEvents(updated);
    }
  };

  const resetToDefault = async () => {
    if (!isBrowser) return;

    if (isFirebaseEnabled() && db) {
      // 1. Clear events
      const eventsSnapshot = await getDocs(collection(db, "events"));
      const eventsBatch = writeBatch(db);
      eventsSnapshot.forEach((doc) => {
        eventsBatch.delete(doc.ref);
      });
      await eventsBatch.commit();

      // 2. Clear images
      const imagesSnapshot = await getDocs(collection(db, "event_images"));
      const imagesBatch = writeBatch(db);
      imagesSnapshot.forEach((doc) => {
        imagesBatch.delete(doc.ref);
      });
      await imagesBatch.commit();

      // 3. Populate default events
      for (const event of DEFAULT_EVENTS) {
        const batch = writeBatch(db);
        const eventDocRef = doc(db, "events", event.id);
        batch.set(eventDocRef, {
          clientNames: event.clientNames,
          eventType: event.eventType,
          location: event.location || "",
          date: event.date || "",
          coverImage: event.coverImage,
          createdAt: new Date().toISOString()
        });

        if (event.images && event.images.length > 0) {
          event.images.forEach((img) => {
            const imageDocRef = doc(collection(db, "event_images"));
            batch.set(imageDocRef, {
              eventId: event.id,
              src: img.src,
              alt: img.alt || "Event Photo",
              createdAt: new Date().toISOString()
            });
          });
        }
        await batch.commit();
      }

      await fetchEventsFromFirebase();
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_EVENTS));
      notifyListeners();
    }
  };

  const importBackup = async (data: ClientEvent[]) => {
    if (!data || !Array.isArray(data)) return false;

    if (isFirebaseEnabled() && db) {
      try {
        // 1. Clear events
        const eventsSnapshot = await getDocs(collection(db, "events"));
        const eventsBatch = writeBatch(db);
        eventsSnapshot.forEach((doc) => {
          eventsBatch.delete(doc.ref);
        });
        await eventsBatch.commit();

        // 2. Clear images
        const imagesSnapshot = await getDocs(collection(db, "event_images"));
        const imagesBatch = writeBatch(db);
        imagesSnapshot.forEach((doc) => {
          imagesBatch.delete(doc.ref);
        });
        await imagesBatch.commit();

        // 3. Import new data
        for (const event of data) {
          const batch = writeBatch(db);
          const eventDocRef = doc(db, "events", event.id);
          batch.set(eventDocRef, {
            clientNames: event.clientNames,
            eventType: event.eventType,
            location: event.location || "",
            date: event.date || "",
            coverImage: event.coverImage,
            createdAt: new Date().toISOString()
          });

          if (event.images && event.images.length > 0) {
            event.images.forEach((img) => {
              const imageDocRef = doc(collection(db, "event_images"));
              batch.set(imageDocRef, {
                eventId: event.id,
                src: img.src,
                alt: img.alt || "Event Photo",
                createdAt: new Date().toISOString()
              });
            });
          }
          await batch.commit();
        }

        await fetchEventsFromFirebase();
        return true;
      } catch (err) {
        console.error("Failed to import backup to Firebase:", err);
        return false;
      }
    } else {
      saveStoredEvents(data);
      return true;
    }
  };

  return {
    events,
    isLoading,
    addEvent,
    updateEvent,
    deleteEvent,
    resetToDefault,
    importBackup,
  };
}

/**
 * SSR safe helper: Get events filtered by service category
 */
export function getEventsByService(events: ClientEvent[], category: ServiceCategory): ClientEvent[] {
  const meta = SERVICE_META[category];
  if (!meta) return [];
  return events.filter((e) => meta.eventTypes.includes(e.eventType));
}

/**
 * SSR safe helper: Get a single event by ID
 */
export function getEventById(events: ClientEvent[], id: string): ClientEvent | undefined {
  return events.find((e) => e.id === id);
}
