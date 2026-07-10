import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { CLIENT_EVENTS as DEFAULT_EVENTS, type ClientEvent, type EventType, type ServiceCategory, SERVICE_META } from "./portfolioData";

const STORAGE_KEY = "vinit_photography_events_v3";

// Simple pub-sub listener set for client-side reactive updates
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((l) => l());
}

// Helper to check if window is defined (SSR safety)
const isBrowser = typeof window !== "undefined";

// Check for environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper to determine if we should use Supabase
export const isSupabaseEnabled = (): boolean => {
  return !!supabase;
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

/**
 * Custom React hook to subscribe to live portfolio data
 */
export function useClientEvents() {
  const [events, setEvents] = useState<ClientEvent[]>(() => {
    if (!isBrowser) return DEFAULT_EVENTS;
    return getStoredEvents();
  });
  const [isLoading, setIsLoading] = useState(isSupabaseEnabled());

  const fetchEventsFromSupabase = async () => {
    if (!supabase) return;
    setIsLoading(true);
    try {
      const { data: dbEvents, error } = await supabase
        .from("events")
        .select(`
          *,
          event_images (*)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (dbEvents) {
        // Map db format to ClientEvent format
        const mappedEvents: ClientEvent[] = dbEvents.map((e) => ({
          id: e.id,
          clientNames: e.client_names || "",
          eventType: e.event_type as EventType,
          coverImage: e.cover_image,
          images: (e.event_images || []).map((img: any) => ({
            src: img.src,
            alt: img.alt || "Event Photo",
          })),
        }));

        saveStoredEvents(mappedEvents);
      }
    } catch (err) {
      console.error("Failed to fetch events from Supabase:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isBrowser) return;

    const handleUpdate = () => {
      setEvents(getStoredEvents());
    };

    listeners.add(handleUpdate);
    window.addEventListener("storage", handleUpdate);

    // If Supabase is enabled, fetch events from Supabase on mount
    if (isSupabaseEnabled()) {
      fetchEventsFromSupabase();
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

    if (isSupabaseEnabled() && supabase) {
      // 1. Insert into events table
      const { error: eventError } = await supabase
        .from("events")
        .insert({
          id: newId,
          client_names: event.clientNames,
          event_type: event.eventType,
          cover_image: event.coverImage,
        });

      if (eventError) {
        console.error("Failed to insert event to Supabase:", eventError);
        throw eventError;
      }

      // 2. Insert into event_images table
      if (event.images && event.images.length > 0) {
        const imagesPayload = event.images.map((img) => ({
          event_id: newId,
          src: img.src,
          alt: img.alt || "Event Photo",
        }));

        const { error: imagesError } = await supabase
          .from("event_images")
          .insert(imagesPayload);

        if (imagesError) {
          console.error("Failed to insert images to Supabase:", imagesError);
          // Clean up created event on failure
          await supabase.from("events").delete().eq("id", newId);
          throw imagesError;
        }
      }

      await fetchEventsFromSupabase();
    } else {
      const current = getStoredEvents();
      const updated = [newEvent, ...current];
      saveStoredEvents(updated);
    }
    return newId;
  };

  const updateEvent = async (updatedEvent: ClientEvent) => {
    if (isSupabaseEnabled() && supabase) {
      // 1. Update event
      const { error: eventError } = await supabase
        .from("events")
        .update({
          client_names: updatedEvent.clientNames,
          event_type: updatedEvent.eventType,
          cover_image: updatedEvent.coverImage,
        })
        .eq("id", updatedEvent.id);

      if (eventError) {
        console.error("Failed to update event in Supabase:", eventError);
        throw eventError;
      }

      // 2. Delete old images
      const { error: deleteError } = await supabase
        .from("event_images")
        .delete()
        .eq("event_id", updatedEvent.id);

      if (deleteError) {
        console.error("Failed to delete old images in Supabase:", deleteError);
        throw deleteError;
      }

      // 3. Insert new images
      if (updatedEvent.images && updatedEvent.images.length > 0) {
        const imagesPayload = updatedEvent.images.map((img) => ({
          event_id: updatedEvent.id,
          src: img.src,
          alt: img.alt || "Event Photo",
        }));

        const { error: imagesError } = await supabase
          .from("event_images")
          .insert(imagesPayload);

        if (imagesError) {
          console.error("Failed to insert new images in Supabase:", imagesError);
          throw imagesError;
        }
      }

      await fetchEventsFromSupabase();
    } else {
      const current = getStoredEvents();
      const updated = current.map((e) => (e.id === updatedEvent.id ? updatedEvent : e));
      saveStoredEvents(updated);
    }
  };

  const deleteEvent = async (id: string) => {
    if (isSupabaseEnabled() && supabase) {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Failed to delete event from Supabase:", error);
        throw error;
      }

      await fetchEventsFromSupabase();
    } else {
      const current = getStoredEvents();
      const updated = current.filter((e) => e.id !== id);
      saveStoredEvents(updated);
    }
  };

  const resetToDefault = async () => {
    if (!isBrowser) return;

    if (isSupabaseEnabled() && supabase) {
      const { error: deleteError } = await supabase
        .from("events")
        .delete()
        .neq("id", "");

      if (deleteError) {
        console.error("Failed to clear Supabase events during reset:", deleteError);
        throw deleteError;
      }

      for (const event of DEFAULT_EVENTS) {
        const { error: eventError } = await supabase
          .from("events")
          .insert({
            id: event.id,
            client_names: event.clientNames,
            event_type: event.eventType,
            cover_image: event.coverImage,
          });

        if (eventError) continue;

        if (event.images && event.images.length > 0) {
          const imagesPayload = event.images.map((img) => ({
            event_id: event.id,
            src: img.src,
            alt: img.alt || "Event Photo",
          }));
          await supabase.from("event_images").insert(imagesPayload);
        }
      }

      await fetchEventsFromSupabase();
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_EVENTS));
      notifyListeners();
    }
  };

  const importBackup = async (data: ClientEvent[]) => {
    if (!Array.isArray(data)) return false;

    if (isSupabaseEnabled() && supabase) {
      try {
        await supabase.from("events").delete().neq("id", "");

        for (const event of data) {
          const { error: eventError } = await supabase
            .from("events")
            .insert({
              id: event.id,
              client_names: event.clientNames,
              event_type: event.eventType,
              cover_image: event.coverImage,
            });

          if (eventError) continue;

          if (event.images && event.images.length > 0) {
            const imagesPayload = event.images.map((img) => ({
              event_id: event.id,
              src: img.src,
              alt: img.alt || "Event Photo",
            }));
            await supabase.from("event_images").insert(imagesPayload);
          }
        }
        await fetchEventsFromSupabase();
        return true;
      } catch (err) {
        console.error("Failed to import backup to Supabase:", err);
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
