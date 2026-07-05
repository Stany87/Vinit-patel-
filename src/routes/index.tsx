import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { IntroAnimation } from "@/components/IntroAnimation";
import { CustomCursor } from "@/components/CustomCursor";

export const Route = createFileRoute("/")({
  component: IntroPage,
  head: () => ({
    meta: [
      { title: "Welcome — Vinit Patel Photography Studio | Vadodara, Gujarat" },
      { name: "description", content: "Enter Vinit Patel Photography Studio — the best professional wedding, sangeet & baby shower photographer in Vadodara, Gujarat, India." },
      { name: "robots", content: "noindex" },
    ],
    links: [
      { rel: "canonical", href: "https://vinitpatelphotography.com/home" },
    ],
  }),
});

function IntroPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-[color:var(--color-ink)] antialiased"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <CustomCursor />
      <IntroAnimation onComplete={() => navigate({ to: "/home" })} />
    </div>
  );
}
