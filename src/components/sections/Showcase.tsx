import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealLines, FadeUp } from "@/components/RevealText";
import { ArrowUpRight, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { fetchFeaturedProjects } from "@/server/public-data";

interface ProjectCell {
  title: string;
  meta: string;
  description: string;
  className: string;
  gradient: string;
  stack: string[];
  about: string;
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.41-4.04-1.41a3.18 3.18 0 0 0-1.34-1.75c-1.09-.75.08-.74.08-.74a2.52 2.52 0 0 1 1.84 1.23 2.58 2.58 0 0 0 3.52 1 2.58 2.58 0 0 1 .77-1.62c-2.67-.31-5.47-1.34-5.47-5.95a4.64 4.64 0 0 1 1.24-3.23 4.31 4.31 0 0 1 .12-3.18s1.01-.32 3.3 1.23a11.36 11.36 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.46 1.03.5 2.2.12 3.26a4.64 4.64 0 0 1 1.23 3.23c0 4.62-2.8 5.64-5.48 5.94a2.89 2.89 0 0 1 .82 2.24v3.32c0 .32.21.7.83.58A12 12 0 0 0 12 .5z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.33V9h3.42v1.56h.05c.48-.9 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.46v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}

const FALLBACK_CELLS: ProjectCell[] = [
  {
    title: "Atlas — SaaS dashboard",
    meta: "Web · 2024",
    description: "Realtime analytics for ops teams",
    className: "md:col-span-12",
    gradient: "from-sky-300 via-sky-500 to-blue-700",
    stack: ["React 19", "TanStack Query", "Postgres", "Edge functions", "Tailwind v4"],
    about:
      "A realtime ops dashboard handling 12M+ events per day. Custom websocket layer, virtualized tables, and a design system shipped in 6 weeks.",
  },
  {
    title: "Hover — fintech app",
    meta: "Mobile · 2024",
    description: "Spend insights with smart alerts",
    className: "md:col-span-12",
    gradient: "from-blue-600 via-blue-700 to-slate-900",
    stack: ["React Native", "Expo", "tRPC", "Postgres"],
    about:
      "Cross-platform mobile fintech with on-device categorization, push insights, and Plaid integration. 4.8★ launch rating.",
  },
  {
    title: "Lume — design tool",
    meta: "Web · 2023",
    description: "Browser-native illustration suite",
    className: "md:col-span-12",
    gradient: "from-cyan-300 via-sky-400 to-blue-600",
    stack: ["WebGL", "Canvas", "Yjs CRDT", "Rust + WASM"],
    about:
      "A collaborative vector editor running entirely in the browser. Real-time multiplayer via CRDTs and a Rust render core for 120fps panning.",
  },
  {
    title: "North — landing system",
    meta: "Brand · 2023",
    description: "Modular templates for fast launches",
    className: "md:col-span-12",
    gradient: "from-indigo-400 via-blue-500 to-sky-400",
    stack: ["Next.js", "MDX", "Sanity", "Framer Motion"],
    about:
      "A modular landing page system used by 14 startups. CMS-driven blocks, design tokens, and a launch in under a day.",
  },
];

export function Showcase() {
  const [active, setActive] = useState<ProjectCell | null>(null);
  const doFetch = useServerFn(fetchFeaturedProjects);
  const [cells, setCells] = useState(FALLBACK_CELLS);

  useEffect(() => {
    doFetch({}).then((rows) => {
      if (rows && rows.length > 0) {
        setCells(rows.map((r) => ({
          title: r.title,
          meta: r.meta || `${r.category} · ${r.year}`,
          description: r.description,
          className: "md:col-span-12",
          gradient: r.gradient,
          stack: r.stack,
          about: r.about,
        })));
      }
    }).catch(() => {});
  }, []);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("projects");
    if (element) {
      const headerOffset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + globalThis.scrollY - headerOffset;
      
      globalThis.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="work" className="relative bg-[#F8FAFC] dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-40">
        <div className="md:grid md:grid-cols-12 md:gap-16">
          {/* Sticky left rail (was Services style) */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <FadeUp>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                  / Selected Work
                </span>
              </FadeUp>
              <h2 className="mt-6 font-display text-[clamp(1.92rem,5.6vw,4.96rem)] uppercase leading-[0.92] text-slate-900 dark:text-white">
                <RevealLines lines={[<>Recent</>, <>Projects.</>]} />
              </h2>
              <FadeUp delay={0.3}>
                <p className="mt-8 max-w-md text-base text-slate-600 dark:text-slate-300 md:text-lg">
                  A taste of what's been built lately — and the tools used to build it. Click any
                  project to see the stack and story.
                </p>
              </FadeUp>
              <FadeUp delay={0.45}>
                <div className="mt-8 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 md:flex">
                  <span className="h-px w-10 bg-slate-300 dark:bg-slate-600" />
                  <span>{cells.length} case studies</span>
                </div>
              </FadeUp>
            </div>
          </div>

          {/* Right scrolling stack of cards */}
          <div className="mt-16 space-y-6 md:col-span-7 md:mt-0">
            {cells.map((c, i) => (
              <BentoCard key={c.title} cell={c} index={i} onOpen={() => setActive(c)} />
            ))}
            
            {/* View all projects + external profile buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="flex flex-col items-center gap-3 pt-4 sm:flex-row sm:justify-between"
            >
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-700 px-5 py-2.5 text-sm font-medium text-white shadow-[0_10px_40px_-10px_rgba(29,78,216,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_60px_-10px_rgba(29,78,216,0.7)] sm:px-7 sm:py-3.5 sm:text-base dark:shadow-[0_10px_40px_-10px_rgba(56,189,248,0.4)] dark:hover:shadow-[0_18px_60px_-10px_rgba(56,189,248,0.5)]"
              >
                <span className="relative z-10">View All Projects</span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-300 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href="https://github.com/blutech18"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-slate-300/80 bg-white/70 px-3 py-2 text-xs font-medium text-slate-700 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-black/25 hover:bg-black/5 hover:text-black sm:gap-2 sm:px-5 sm:py-3 sm:text-sm dark:border-slate-600 dark:bg-slate-800/40 dark:text-slate-200 dark:hover:border-white/30 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <GitHubIcon />
                  <span className="relative z-10">Github</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/cjjumawan/"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-slate-300/80 bg-white/70 px-3 py-2 text-xs font-medium text-[#0A66C2] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0A66C2]/55 hover:bg-[#0A66C2]/12 hover:text-[#004182] sm:gap-2 sm:px-5 sm:py-3 sm:text-sm dark:border-slate-600 dark:bg-slate-800/40 dark:text-[#8ec6ff] dark:hover:border-[#0A66C2]/70 dark:hover:bg-[#0A66C2]/25 dark:hover:text-white"
                >
                  <LinkedInIcon />
                  <span className="relative z-10">Linkedin</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}

function BentoCard({
  cell,
  index,
  onOpen,
}: Readonly<{
  cell: ProjectCell;
  index: number;
  onOpen: () => void;
}>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.05 }}
      onClick={onOpen}
      className="group relative cursor-pointer"
    >
      <div className="relative h-64 [perspective:1200px] md:h-80">
        <div className="relative h-full w-full rounded-3xl transition-transform duration-700 [transform-style:preserve-3d] [will-change:transform] group-hover:[transform:rotateX(180deg)]">
          {/* Front */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl bg-slate-900 [backface-visibility:hidden] [transform:translateZ(0)]">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${cell.gradient} transition-transform duration-700 group-hover:scale-[1.04]`}
            />
            <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:24px_24px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/85 via-blue-900/10 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-between p-7 md:p-9">
              <div className="flex items-start justify-between text-white/90">
                <span className="text-xs font-medium uppercase tracking-[0.2em]">{cell.meta}</span>
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <div>
                <div className="font-display text-3xl uppercase leading-[0.95] text-white md:text-5xl">
                  {cell.title}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/80">
                  Hover to view stack
                </div>
              </div>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl bg-slate-900 [backface-visibility:hidden] [transform:rotateX(180deg)_translateZ(0)]">
            <div className={`absolute inset-0 bg-gradient-to-br ${cell.gradient}`} />
            <div className="absolute inset-0 bg-blue-950/80" />
            <div className="absolute inset-0 flex flex-col p-7 md:p-9">
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-sky-300">/ Stack</div>
              <div className="mt-3 font-display text-3xl uppercase leading-[0.95] text-white md:text-4xl">
                {cell.title}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {cell.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: Readonly<{ project: ProjectCell | null; onClose: () => void }>) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm dark:bg-slate-950/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`relative h-48 bg-gradient-to-br ${project.gradient}`}>
              <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:24px_24px]" />
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-5 left-6 text-xs font-medium uppercase tracking-[0.2em] text-white/80">
                {project.meta}
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-display text-3xl uppercase leading-[0.95] text-slate-900 dark:text-white md:text-4xl">
                {project.title}
              </h3>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300">{project.about}</p>
              <div className="mt-6">
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                  Tech stack
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
