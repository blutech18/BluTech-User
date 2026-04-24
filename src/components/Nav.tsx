import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavProps {
  onCtaClick: () => void;
}

export function Nav({ onCtaClick }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <AnimatePresence>
        {scrolled && (
          <motion.div
            key="bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl"
          />
        )}
      </AnimatePresence>
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#top" className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-br from-sky-400 to-blue-700" />
          <span className="text-base font-semibold tracking-tight text-slate-900">BluTech</span>
        </a>
        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#services" className="transition-colors hover:text-slate-900">Services</a>
          <a href="#work" className="transition-colors hover:text-slate-900">Work</a>
          <a href="#about" className="transition-colors hover:text-slate-900">About</a>
        </div>
        <button
          onClick={onCtaClick}
          className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          Get in touch
        </button>
      </nav>
    </header>
  );
}
