import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Services } from "@/components/sections/Services";
import { Showcase } from "@/components/sections/Showcase";
import { About } from "@/components/sections/About";
import { ContactCta } from "@/components/sections/ContactCta";
import { Footer } from "@/components/sections/Footer";
import { ContactModal } from "@/components/ContactModal";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "BluTech — Freelance Product Engineering & Design" },
      {
        name: "description",
        content:
          "BluTech: freelance commissions for web, app, UI/UX, backend and AI work. Buttery-smooth interfaces, modern stacks, ship-ready code.",
      },
      { property: "og:title", content: "BluTech — Freelance Product Engineering & Design" },
      {
        property: "og:description",
        content:
          "Freelance commissions by BluTech — web, app, UI/UX, backend, and AI. Available for Q3.",
      },
    ],
  }),
});

function Index() {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased selection:bg-sky-300 selection:text-slate-900">
      <SmoothScroll />
      <Nav onCtaClick={openModal} />
      <Hero onCtaClick={openModal} />
      <Marquee />
      <Services />
      <Showcase />
      <About />
      <ContactCta onCtaClick={openModal} />
      <Footer />
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </main>
  );
}
