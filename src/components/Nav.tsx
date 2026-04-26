import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface NavProps {
  onCtaClick: () => void;
}

export function Nav({ onCtaClick }: Readonly<NavProps>) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const clickedSectionRef = useRef<string | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const { theme, toggleTheme } = useTheme();

  const handleScrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Clear any existing timeout to prevent stale locks
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
    
    // Immediately set active section on click and lock it
    setActiveSection(targetId);
    clickedSectionRef.current = targetId;
    
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + globalThis.scrollY - headerOffset;
      
      globalThis.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Set a longer timeout for the lock to ensure scroll completes
      scrollTimeoutRef.current = globalThis.setTimeout(() => {
        clickedSectionRef.current = null;
      }, 1000);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(globalThis.scrollY > 30);

      // If we clicked a nav link, keep it active until scroll settles
      if (clickedSectionRef.current) {
        return;
      }

      // Determine active section based on scroll position
      const sections = ["top", "services", "work", "about", "projects"];
      const headerOffset = 100;
      
      for (const sectionId of [...sections].reverse()) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= headerOffset) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    
    onScroll();
    globalThis.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      globalThis.removeEventListener("scroll", onScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const navLinks = [
    { id: "top", label: "Home" },
    { id: "services", label: "Services" },
    { id: "work", label: "Work" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <AnimatePresence>
        {scrolled && (
          <motion.div
            key="bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/70"
          />
        )}
      </AnimatePresence>
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a 
          href="#top" 
          onClick={(e) => handleScrollTo(e, "top")}
          className="flex items-center gap-2.5"
        >
          <img src="/blutech-logo.png" alt="BluTech" className="h-10 w-10 object-contain" />
          <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">BluTech</span>
        </a>
        <div className="relative hidden items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleScrollTo(e, link.id)}
              className={`relative transition-colors hover:text-slate-900 dark:hover:text-white ${
                activeSection === link.id ? "text-slate-900 dark:text-white" : ""
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-sky-500"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="relative flex h-6 w-6 items-center justify-center overflow-hidden"
            aria-label="Toggle theme"
          >
            <motion.div
              initial={false}
              animate={{ y: theme === "dark" ? 0 : -24 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute text-sky-400"
            >
              <Sun className="h-5 w-5" />
            </motion.div>
            <motion.div
              initial={false}
              animate={{ y: theme === "dark" ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute text-slate-600 dark:text-slate-300"
            >
              <Moon className="h-5 w-5" />
            </motion.div>
          </button>
          <button
            onClick={onCtaClick}
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500"
          >
            Get in touch
          </button>
        </div>
      </nav>
    </header>
  );
}
