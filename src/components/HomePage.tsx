import { useState } from "react";
import { Instagram, Facebook } from "lucide-react";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { BookingCTA } from "@/components/BookingCTA";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { IntroAnimation } from "@/components/IntroAnimation";

export function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div
      className="min-h-screen bg-[color:var(--color-ink)] antialiased"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Custom premium cursor — hidden on touch devices via CSS */}
      <CustomCursor />

      {/* Intro Animation Overlay — sits on top of site, masks reveal content behind */}
      {!introComplete && <IntroAnimation onComplete={() => setIntroComplete(true)} />}

      {/* Main Site */}
      <div id="site">
        <Navbar onBookClick={() => setBookingOpen(true)} />
        <Hero onBookClick={() => setBookingOpen(true)} startTrigger={introComplete} />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <BookingCTA onBookClick={() => setBookingOpen(true)} />
        <Footer />

        {/* Floating Contact Buttons Column */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          {/* Instagram Button */}
          <a
            href="https://www.instagram.com/vinit_patel_photography?r=nametag"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white shadow-[0_4px_15px_rgba(0,0,0,0.25)] hover:scale-110 transition-all duration-300"
            style={{
              background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
            }}
            aria-label="Follow us on Instagram"
          >
            <Instagram size={18} />
          </a>

          {/* Facebook Button */}
          <a
            href="https://m.facebook.com/Vinitpatelphotography/?ref=bookmarks"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white shadow-[0_4px_15px_rgba(24,119,242,0.25)] hover:scale-110 transition-all duration-300 bg-[#1877F2]"
            aria-label="Follow us on Facebook"
          >
            <Facebook size={18} />
          </a>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/919998665614?text=Hi%20Vinit%20Patel%20Photography!%20I%E2%80%99d%20like%20to%20know%20more%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_15px_rgba(37,211,102,0.3)] hover:scale-110 transition-all duration-300"
            aria-label="Contact us on WhatsApp"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#25D366] animate-ping" />
          </a>
        </div>
      </div>

      {/* Global Booking Modal */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}