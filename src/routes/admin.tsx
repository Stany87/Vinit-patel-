import { useState, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  Save,
  X,
  Upload,
  RefreshCw,
  FolderOpen,
  LogOut,
  MapPin,
  Calendar,
  Lock,
  ChevronRight,
  Eye,
  FileDown,
  FileUp,
} from "lucide-react";
import { useClientEvents } from "@/data/portfolioStore";
import { CustomCursor } from "@/components/CustomCursor";
import { PageHeader } from "@/components/PageHeader";
import type { ClientEvent, EventType, EventImage } from "@/data/portfolioData";

const compressImage = (file: File, maxWidth = 1200, maxHeight = 1200, quality = 0.75): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedBase64);
      };
      img.onerror = (err) => {
        reject(err);
      };
    };
    reader.onerror = (err) => {
      reject(err);
    };
  });
};

export const Route = createFileRoute("/admin")({
  component: AdminPortal,
});

const EVENT_TYPES: EventType[] = [
  "Wedding",
  "Sangeet",
  "Haldi",
  "Engagement",
  "Couple Shoot",
  "Baby Shower",
];

function AdminPortal() {
  const { events, addEvent, updateEvent, deleteEvent, resetToDefault, importBackup } =
    useClientEvents();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("vp_admin_logged_in") === "true";
    }
    return false;
  });
  const [passphrase, setPassphrase] = useState("");
  const [authError, setAuthError] = useState("");

  // UI state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ClientEvent | null>(null);

  // Form states
  const [clientNames, setClientNames] = useState("");
  const [eventType, setEventType] = useState<EventType>("Wedding");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<EventImage[]>([]);

  // Search/Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("All");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Authentication handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passphrase.trim() === "VPSTUDIO2026") {
      setIsAuthenticated(true);
      localStorage.setItem("vp_admin_logged_in", "true");
      setAuthError("");
    } else {
      setAuthError("Incorrect Passphrase. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("vp_admin_logged_in");
  };

  const [isProcessing, setIsProcessing] = useState(false);

  // Convert and compress files to base64
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, isCover: boolean) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    try {
      const promises = Array.from(files).map((file) => {
        const maxWidth = isCover ? 1200 : 1000;
        const maxHeight = isCover ? 1200 : 1000;
        const quality = isCover ? 0.75 : 0.65;
        return compressImage(file, maxWidth, maxHeight, quality);
      });

      const base64Strings = await Promise.all(promises);

      if (isCover) {
        if (base64Strings[0]) {
          setCoverImage(base64Strings[0]);
        }
      } else {
        const newImages = base64Strings.map((str, idx) => ({
          src: str,
          alt: files[idx]?.name.split(".")[0] || "Event Photo",
        }));
        setGalleryImages((prev) => [...prev, ...newImages]);
      }
    } catch (err) {
      console.error("Failed to process image:", err);
      alert("Failed to process image file. Please try a different photo.");
    } finally {
      setIsProcessing(false);
      e.target.value = "";
    }
  };

  // Opening the form for a new event
  const openNewEventForm = () => {
    setEditingEvent(null);
    setClientNames("");
    setEventType("Wedding");
    setLocation("");
    setDate("");
    setCoverImage("");
    setGalleryImages([]);
    setIsFormOpen(true);
  };

  // Opening form to edit an event
  const openEditEventForm = (event: ClientEvent) => {
    setEditingEvent(event);
    setClientNames(event.clientNames);
    setEventType(event.eventType);
    setLocation(event.location);
    setDate(event.date);
    setCoverImage(event.coverImage);
    setGalleryImages(event.images);
    setIsFormOpen(true);
  };

  // Submitting the event form
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!coverImage) {
      alert("Please set a cover image.");
      return;
    }

    const eventPayload = {
      clientNames: clientNames.trim(),
      eventType,
      location: location.trim(),
      date: date.trim(),
      coverImage,
      images: galleryImages,
    };

    try {
      setIsProcessing(true);
      if (editingEvent) {
        await updateEvent({
          ...eventPayload,
          id: editingEvent.id,
        });
      } else {
        await addEvent(eventPayload);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to save event:", error);
      alert("Failed to save event. If you are using Local Storage, your browser's space might be full (max 5MB). If you are using Supabase, please verify database credentials.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Backup Export
  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(events, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `vp_photography_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Backup Import
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        setIsProcessing(true);
        const success = await importBackup(json);
        if (success) {
          alert("Backup imported successfully!");
        } else {
          alert("Invalid backup format.");
        }
      } catch (err) {
        alert("Failed to parse JSON file.");
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsText(file);
  };

  // Filters and calculations
  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.clientNames.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "All" || e.eventType === filterType;
    return matchesSearch && matchesType;
  });

  const totalPhotos = events.reduce((sum, e) => sum + e.images.length, 0);

  // Authentication page view
  if (!isAuthenticated) {
    return (
      <div
        className="flex min-h-screen items-center justify-center p-6"
        style={{ background: "#f8f7f3", fontFamily: "Inter, sans-serif" }}
      >
        <CustomCursor />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl border border-[color:var(--color-gold)]/20 text-center"
          style={{ boxShadow: "0 20px 50px rgba(60,40,10,0.06)" }}
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--color-gold)]/10 text-[color:var(--color-gold)] mb-6">
            <Lock size={26} strokeWidth={1.5} />
          </div>

          <h1 className="font-serif text-[28px] font-light text-[color:var(--color-ink)] leading-none">
            Vinit Patel Photography
          </h1>
          <p className="mt-2 text-[10px] tracking-[0.3em] text-[color:var(--color-gold)] uppercase font-semibold">
            CMS ADMIN PORTAL
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div className="relative">
              <input
                type="password"
                placeholder="Passphrase (e.g. VPSTUDIO2026)"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-center text-sm tracking-[0.1em] text-[color:var(--color-ink)] placeholder-neutral-400 focus:border-[color:var(--color-gold)]/60 focus:bg-white focus:outline-none transition-all duration-300"
              />
            </div>

            {authError && (
              <p className="text-red-500 text-[11px] tracking-wide font-medium">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center bg-[color:var(--color-gold)] py-3.5 text-[11px] tracking-[0.3em] text-[color:var(--color-ink)] font-semibold rounded-lg hover:bg-[color:var(--color-gold-soft)] transition-colors duration-300"
            >
              LOG IN
            </button>
          </form>

          <Link
            to="/"
            className="inline-block mt-8 text-[10px] tracking-[0.2em] text-neutral-400 hover:text-[color:var(--color-gold)] transition-colors duration-300"
          >
            ← BACK TO LIVE SITE
          </Link>
        </motion.div>
      </div>
    );
  }

  // Dashboard main page view
  return (
    <div
      className="min-h-screen antialiased pb-20"
      style={{ fontFamily: "Inter, sans-serif", background: "#f8f7f3" }}
    >
      <CustomCursor />

      {/* Header section */}
      <section className="relative overflow-hidden bg-white border-b border-[color:var(--color-gold)]/10">
        <div className="mx-auto max-w-[1300px] px-6 md:px-12 pt-28 pb-10 md:pt-32 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[9px] tracking-[0.3em] bg-[color:var(--color-gold)]/10 text-[color:var(--color-gold)] px-2.5 py-1 font-semibold uppercase rounded">
                Portal Mode
              </span>
              <span className="text-[11px] tracking-[0.15em] text-neutral-400">
                Logged in as Administrator
              </span>
            </div>
            <h1 className="font-serif text-[38px] md:text-[46px] font-light text-[color:var(--color-ink)] mt-3">
              Photography Manager
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 border border-neutral-200 px-5 py-3 text-[10px] tracking-[0.2em] text-neutral-500 hover:border-red-400 hover:text-red-500 bg-white rounded-lg transition-colors duration-300"
            >
              <LogOut size={13} />
              LOG OUT
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 bg-[color:var(--color-ink)] px-6 py-3 text-[10px] tracking-[0.2em] text-white font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
            >
              LIVE SITE
              <ChevronRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats and actions layout */}
      <div className="mx-auto max-w-[1300px] px-6 md:px-12 mt-10">
        {/* Quick statistics widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[color:var(--color-gold)]/10 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] tracking-[0.25em] text-[color:var(--color-gold)] font-semibold uppercase">
                Total Events
              </p>
              <h2 className="text-3xl font-serif text-[color:var(--color-ink)] mt-2 font-light">
                {events.length}
              </h2>
            </div>
            <FolderOpen className="text-neutral-300" size={36} strokeWidth={1} />
          </div>

          <div className="bg-white p-6 rounded-xl border border-[color:var(--color-gold)]/10 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] tracking-[0.25em] text-[color:var(--color-gold)] font-semibold uppercase">
                Total Photos
              </p>
              <h2 className="text-3xl font-serif text-[color:var(--color-ink)] mt-2 font-light">
                {totalPhotos}
              </h2>
            </div>
            <ImageIcon className="text-neutral-300" size={36} strokeWidth={1} />
          </div>

          <div className="bg-white p-6 rounded-xl border border-[color:var(--color-gold)]/10 shadow-sm flex flex-col justify-between gap-4">
            <p className="text-[10px] tracking-[0.25em] text-[color:var(--color-gold)] font-semibold uppercase">
              Database Controls
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleExportBackup}
                title="Download JSON portfolio database backup"
                className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 px-3 py-2 rounded text-[10px] tracking-[0.1em] text-neutral-600 hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold)] transition-colors duration-200"
              >
                <FileDown size={13} />
                Export
              </button>

              <label className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 px-3 py-2 rounded text-[10px] tracking-[0.1em] text-neutral-600 hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold)] cursor-pointer transition-colors duration-200">
                <FileUp size={13} />
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportBackup}
                  className="hidden"
                />
              </label>

              <button
                onClick={async () => {
                  if (confirm("Are you sure you want to reset the portfolio database back to default static assets? Any uploaded events will be lost!")) {
                    try {
                      setIsProcessing(true);
                      await resetToDefault();
                      alert("Database reset to defaults successfully!");
                    } catch (err) {
                      alert("Failed to reset database to defaults.");
                    } finally {
                      setIsProcessing(false);
                    }
                  }
                }}
                title="Reset database to default demo pictures"
                className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 px-3 py-2 rounded text-[10px] tracking-[0.1em] text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors duration-200"
              >
                <RefreshCw size={12} />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Content list block */}
        <div className="mt-10 bg-white rounded-xl border border-[color:var(--color-gold)]/10 shadow-sm overflow-hidden">
          {/* List header control strip */}
          <div className="px-6 py-5 border-b border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex flex-grow items-center gap-3">
              <input
                type="text"
                placeholder="Search by client or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-sm rounded-lg border border-neutral-200 px-4 py-2 text-xs text-[color:var(--color-ink)] placeholder-neutral-400 focus:border-[color:var(--color-gold)]/60 focus:outline-none"
              />

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="rounded-lg border border-neutral-200 px-3 py-2 text-xs text-[color:var(--color-ink)] bg-white focus:outline-none"
              >
                <option value="All">All Types</option>
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={openNewEventForm}
              className="inline-flex items-center justify-center gap-1.5 bg-[color:var(--color-gold)] px-6 py-2.5 text-[10px] tracking-[0.2em] text-[color:var(--color-ink)] font-semibold rounded-lg hover:bg-[color:var(--color-gold-soft)] transition-colors"
            >
              <Plus size={14} />
              NEW EVENT
            </button>
          </div>

          {/* Table display */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50/70 text-[10px] tracking-[0.2em] text-neutral-400 uppercase border-b border-neutral-100">
                  <th className="px-6 py-4 font-semibold">Cover</th>
                  <th className="px-6 py-4 font-semibold">Client Names</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold text-center">Photos</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-neutral-50/40 transition-colors text-[13px]">
                    <td className="px-6 py-4">
                      <div className="h-12 w-16 overflow-hidden rounded bg-neutral-100 border border-neutral-200">
                        <img
                          src={event.coverImage}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-serif text-[16px] text-[color:var(--color-ink)]">
                      {event.clientNames}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-[color:var(--color-gold)]/10 text-[color:var(--color-gold)] px-2.5 py-1 text-[9px] tracking-[0.1em] font-semibold uppercase rounded">
                        {event.eventType}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center font-medium text-neutral-600">
                      {event.images.length}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center justify-end gap-2">
                        <Link
                          to={`/event/${event.id}`}
                          title="View live page"
                          className="p-1.5 text-neutral-400 hover:text-[color:var(--color-gold)] transition-colors"
                        >
                          <Eye size={16} />
                        </Link>
                        <button
                          onClick={() => openEditEventForm(event)}
                          title="Edit event details"
                          className="p-1.5 text-neutral-400 hover:text-blue-500 transition-colors"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Are you sure you want to delete ${event.clientNames || "this"}'s event?`)) {
                              try {
                                setIsProcessing(true);
                                await deleteEvent(event.id);
                              } catch (err) {
                                alert("Failed to delete event.");
                              } finally {
                                setIsProcessing(false);
                              }
                            }
                          }}
                          title="Delete event"
                          className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredEvents.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-neutral-400 text-xs tracking-wider">
                      No events found. Click "New Event" to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Slide-over event creation/edit form */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="fixed inset-0 z-40 bg-black"
            />

            {/* Form Sidebar Overlay */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-white border-l border-neutral-100 shadow-2xl flex flex-col h-full"
            >
              {/* Sidebar Header */}
              <div className="px-8 py-6 border-b border-neutral-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.25em] text-[color:var(--color-gold)] uppercase font-semibold">
                    {editingEvent ? "Modify Existing" : "Create New"}
                  </p>
                  <h2 className="font-serif text-[24px] text-[color:var(--color-ink)] mt-1 font-light">
                    {editingEvent ? `Edit ${clientNames}` : "New Event Campaign"}
                  </h2>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="h-9 w-9 rounded-full bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center text-neutral-400 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="flex-grow overflow-y-auto px-8 py-8 space-y-6">
                {isProcessing && (
                  <div className="bg-[color:var(--color-gold)]/10 border border-[color:var(--color-gold)]/20 p-4 rounded-xl flex items-center justify-center gap-3">
                    <RefreshCw className="animate-spin text-[color:var(--color-gold)]" size={16} />
                    <span className="text-xs text-[color:var(--color-ink)] font-medium tracking-wide">
                      Processing and compressing images...
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-[10px] tracking-[0.15em] font-semibold text-neutral-400 uppercase mb-2">
                      Client / Couple Names (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Nishi Trivedi"
                      value={clientNames}
                      onChange={(e) => setClientNames(e.target.value)}
                      className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-xs text-[color:var(--color-ink)] placeholder-neutral-400 focus:border-[color:var(--color-gold)]/60 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.15em] font-semibold text-neutral-400 uppercase mb-2">
                      Event Category *
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value as EventType)}
                      className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-xs text-[color:var(--color-ink)] bg-white focus:border-[color:var(--color-gold)]/60 focus:outline-none"
                    >
                      {EVENT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>


                </div>

                {/* Cover Image Upload Row */}
                <div>
                  <label className="block text-[10px] tracking-[0.15em] font-semibold text-neutral-400 uppercase mb-2">
                    Cover Image * (URL or Local Upload)
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Paste cover image link here..."
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      className="flex-grow rounded-lg border border-neutral-200 px-4 py-2.5 text-xs text-[color:var(--color-ink)] placeholder-neutral-400 focus:border-[color:var(--color-gold)]/60 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 border border-neutral-200 hover:border-[color:var(--color-gold)] hover:bg-neutral-50 px-4 py-2 rounded-lg text-xs text-neutral-600 transition-colors"
                    >
                      <Upload size={14} />
                      Upload
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, true)}
                      className="hidden"
                    />
                  </div>

                  {coverImage && (
                    <div className="mt-3 relative h-36 w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
                      <img src={coverImage} alt="" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setCoverImage("")}
                        className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Multiple Gallery Images Upload Row */}
                <div>
                  <label className="block text-[10px] tracking-[0.15em] font-semibold text-neutral-400 uppercase mb-2">
                    Gallery Images (URL or drag multiple files)
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Add an image link..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const val = e.currentTarget.value.trim();
                          if (val) {
                            setGalleryImages((prev) => [...prev, { src: val, alt: "Event Photo" }]);
                            e.currentTarget.value = "";
                          }
                        }
                      }}
                      className="flex-grow rounded-lg border border-neutral-200 px-4 py-2.5 text-xs text-[color:var(--color-ink)] placeholder-neutral-400 focus:border-[color:var(--color-gold)]/60 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => galleryInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 border border-neutral-200 hover:border-[color:var(--color-gold)] hover:bg-neutral-50 px-4 py-2 rounded-lg text-xs text-neutral-600 transition-colors"
                    >
                      <Upload size={14} />
                      Upload Files
                    </button>
                    <input
                      type="file"
                      ref={galleryInputRef}
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, false)}
                      className="hidden"
                    />
                  </div>

                  <p className="mt-2 text-[10px] text-neutral-400 leading-normal">
                    💡 Press Enter in the link input to add an image URL, or click "Upload Files" to select multiple local images at once.
                  </p>

                  {/* Thumbnail gallery preview list */}
                  {galleryImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-4 gap-3 bg-neutral-50/50 p-4 rounded-xl border border-dashed border-neutral-200">
                      {galleryImages.map((img, i) => (
                        <div key={i} className="relative aspect-square overflow-hidden rounded bg-white border border-neutral-200 group">
                          <img src={img.src} alt="" className="h-full w-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setGalleryImages((prev) => prev.filter((_, idx) => idx !== i))}
                            className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={10} />
                          </button>
                          <span className="absolute bottom-0 inset-x-0 bg-black/40 text-[8px] text-white py-0.5 text-center truncate select-none">
                            Photo {i + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </form>

              {/* Sidebar Footer Controls */}
              <div className="px-8 py-5 border-t border-neutral-100 flex items-center justify-end gap-3 bg-neutral-50/50">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 text-[10px] tracking-[0.2em] border border-neutral-200 text-neutral-500 hover:bg-neutral-100 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleFormSubmit}
                  className="inline-flex items-center gap-2 bg-[color:var(--color-gold)] px-6 py-2.5 text-[10px] tracking-[0.2em] text-[color:var(--color-ink)] font-semibold rounded-lg hover:bg-[color:var(--color-gold-soft)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      PROCESSING...
                    </>
                  ) : (
                    <>
                      <Save size={14} />
                      SAVE EVENT
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
