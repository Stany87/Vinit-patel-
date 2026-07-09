import { useState, useEffect } from "react";
import { CLIENT_EVENTS as DEFAULT_EVENTS, type ClientEvent, type EventType, type ServiceCategory, SERVICE_META } from "./portfolioData";

const STORAGE_KEY = "vinit_photography_events_v2";

// Simple pub-sub listener set for client-side reactive updates
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((l) => l());
}

// Helper to check if window is defined (SSR safety)
const isBrowser = typeof window !== "undefined";

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
  }
}

/**
 * Custom React hook to subscribe to live portfolio data
 */
export function useClientEvents() {
  const [events, setEvents] = useState<ClientEvent[]>(() => getStoredEvents());

  useEffect(() => {
    if (!isBrowser) return;

    const handleUpdate = () => {
      setEvents(getStoredEvents());
    };

    listeners.add(handleUpdate);
    
    // Also listen to storage events across tabs
    window.addEventListener("storage", handleUpdate);

    return () => {
      listeners.delete(handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // CRUD Operations
  const addEvent = (event: Omit<ClientEvent, "id">) => {
    const newId = event.clientNames
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-") + "-" + event.eventType.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    
    const newEvent: ClientEvent = {
      ...event,
      id: newId,
    };

    const current = getStoredEvents();
    const updated = [newEvent, ...current];
    saveStoredEvents(updated);
    return newId;
  };

  const updateEvent = (updatedEvent: ClientEvent) => {
    const current = getStoredEvents();
    const updated = current.map((e) => (e.id === updatedEvent.id ? updatedEvent : e));
    saveStoredEvents(updated);
  };

  const deleteEvent = (id: string) => {
    const current = getStoredEvents();
    const updated = current.filter((e) => e.id !== id);
    saveStoredEvents(updated);
  };

  const resetToDefault = () => {
    if (!isBrowser) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_EVENTS));
    notifyListeners();
  };

  const importBackup = (data: ClientEvent[]) => {
    if (!Array.isArray(data)) return false;
    saveStoredEvents(data);
    return true;
  };

  return {
    events,
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
