import { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, X, ChevronDown } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { fetchAllProjects } from "@/server/public-data";

/** Format a date string (YYYY-MM-DD or any parseable format) into M/D/YY */
function formatDate(raw: string): string {
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw; // fallback to raw if unparseable
  return `${d.getMonth() + 1}/${d.getDate()}/${String(d.getFullYear()).slice(-2)}`;
}

interface Project {
  title: string;
  category: string;
  year: string;
  description: string;
  stack: string[];
  gradient: string;
  image_url?: string | null;
  about: string;
  proof_image_url?: string | null;
  client_number?: string;
  service_type?: string;
  transaction_date?: string;
}

const FALLBACK_PROJECTS: Project[] = [
  {
    title: "Atlas Dashboard",
    category: "Web Application",
    year: "2024",
    description: "Realtime analytics dashboard for ops teams handling 12M+ events per day.",
    stack: ["React 19", "TanStack Query", "Postgres", "Edge Functions"],
    gradient: "from-sky-400 to-blue-600",
    about: "A realtime ops dashboard handling 12M+ events per day. Custom websocket layer, virtualized tables, and a design system shipped in 6 weeks.",
  },
  {
    title: "Hover Finance",
    category: "Mobile App",
    year: "2024",
    description: "Cross-platform fintech with spend insights and smart alerts.",
    stack: ["React Native", "Expo", "tRPC", "Postgres"],
    gradient: "from-blue-600 to-indigo-700",
    about: "Cross-platform mobile fintech with on-device categorization, push insights, and Plaid integration. 4.8★ launch rating.",
  },
  {
    title: "Lume Design",
    category: "Web Tool",
    year: "2023",
    description: "Browser-native collaborative vector editor with real-time multiplayer.",
    stack: ["WebGL", "Canvas", "Yjs CRDT", "Rust + WASM"],
    gradient: "from-cyan-400 to-sky-600",
    about: "A collaborative vector editor running entirely in the browser. Real-time multiplayer via CRDTs and a Rust render core for 120fps panning.",
  },
  {
    title: "North Landing",
    category: "Brand System",
    year: "2023",
    description: "Modular landing page system used by 14 startups.",
    stack: ["Next.js", "MDX", "Sanity", "Framer Motion"],
    gradient: "from-indigo-400 to-blue-600",
    about: "A modular landing page system used by 14 startups. CMS-driven blocks, design tokens, and a launch in under a day.",
  },
  {
    title: "Pulse API",
    category: "Backend",
    year: "2023",
    description: "High-performance API gateway with rate limiting and analytics.",
    stack: ["Node.js", "Redis", "PostgreSQL", "Docker"],
    gradient: "from-emerald-400 to-cyan-600",
    about: "High-performance API gateway handling 50k requests/second with intelligent rate limiting, caching, and real-time analytics dashboard.",
  },
  {
    title: "Nexus CRM",
    category: "SaaS Platform",
    year: "2022",
    description: "Enterprise CRM with AI-powered lead scoring and automation.",
    stack: ["React", "Python", "TensorFlow", "AWS"],
    gradient: "from-violet-400 to-purple-600",
    about: "Enterprise CRM platform with ML-powered lead scoring, email automation, and custom workflow builder. Serving 200+ enterprise clients.",
  },
  {
    title: "Quantum UI Kit",
    category: "Design System",
    year: "2022",
    description: "Component library with 200+ accessible, themeable components.",
    stack: ["TypeScript", "Tailwind", "Radix UI", "Storybook"],
    gradient: "from-rose-400 to-pink-600",
    about: "A comprehensive design system with 200+ components, full accessibility support, theming, and extensive documentation. Used by 50+ teams.",
  },
  {
    title: "StreamFlow",
    category: "Media Platform",
    year: "2022",
    description: "Video streaming platform with adaptive bitrate and live features.",
    stack: ["Next.js", "HLS", "WebRTC", "CloudFlare"],
    gradient: "from-amber-400 to-orange-600",
    about: "Video streaming platform with adaptive bitrate streaming, live broadcasting, and real-time chat. Processing 10TB of video monthly.",
  },
];

const INITIAL_COUNT = 4;

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [proofProject, setProofProject] = useState<Project | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [allProjects, setAllProjects] = useState(FALLBACK_PROJECTS);
  const doFetch = useServerFn(fetchAllProjects);

  useEffect(() => {
    doFetch({}).then((rows) => {
      if (rows && rows.length > 0) {
        setAllProjects(rows.map((r) => ({
          title: r.title,
          category: r.category,
          year: r.year,
          description: r.description,
          stack: r.stack,
          gradient: r.gradient,
          image_url: r.image_url,
          about: r.about,
          proof_image_url: r.proof_image_url,
          client_number: r.client_number,
          service_type: r.service_type,
          transaction_date: r.transaction_date,
        })));
      }
    }).catch((err) => {
      console.error("[Projects] Failed to fetch projects:", err);
    });
  }, []);

  useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const hasMore = visibleCount < allProjects.length;
  const visibleProjects = allProjects.slice(0, visibleCount);

  return (
    <section id="projects" ref={containerRef} className="relative bg-slate-50 py-24 md:py-40 dark:bg-slate-950">
      {/* Animated background gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(56, 189, 248, 0.15), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-medium uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400"
          >
            / All Projects
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-display text-[clamp(2.5rem,8vw,6rem)] uppercase leading-[0.9] text-slate-900 dark:text-white"
          >
            Complete<br />
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Portfolio.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-lg text-lg text-slate-600 dark:text-slate-400"
          >
            A comprehensive archive of shipped work across web, mobile, backend, and design systems.
          </motion.p>
        </div>

        {/* Projects Grid with staggered reveal */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onOpen={() => setActiveProject(project)}
              onViewProof={() => setProofProject(project)}
            />
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 flex flex-col items-center gap-2 text-center md:mt-24"
          >
            <button
              onClick={() => setVisibleCount(allProjects.length)}
              className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-6 py-3 text-sm font-medium text-sky-600 transition-colors hover:bg-sky-500/20 dark:text-sky-400"
            >
              View all projects
              <ChevronDown className="h-4 w-4" />
            </button>
            <span className="text-xs text-slate-500 dark:text-slate-500">
              {allProjects.length - visibleCount} more
            </span>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />

      {/* Proof of Transaction Modal */}
      <ProofModal project={proofProject} onClose={() => setProofProject(null)} />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
  onViewProof,
}: Readonly<{
  project: Project;
  index: number;
  onOpen: () => void;
  onViewProof: () => void;
}>) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  // Unique staggered animation based on index
  const delay = (index % 4) * 0.1;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isEven ? -50 : 50, rotateY: isEven ? -5 : 5 }}
      animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onClick={onOpen}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white backdrop-blur-sm transition-colors hover:border-sky-500/30 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:hover:border-sky-500/30 dark:hover:bg-white/10"
    >
      {/* Image placeholder with gradient */}
      <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${project.gradient} md:h-48`}>
        {project.image_url ? (
          <img
            src={project.image_url}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            alt={project.title}
          />
        ) : (
          <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:24px_24px]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent dark:from-[#080d19] dark:via-[#080d19]/70 dark:to-transparent" />
        
        {/* Category and year badge on image */}
        <div className="absolute left-5 top-5 flex items-center gap-2 md:left-6 md:top-6">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm">
            {project.category}
          </span>
        </div>
        <span className="absolute right-5 top-5 rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur-sm md:right-6 md:top-6">
          {project.year}
        </span>
        
        {/* Hover arrow on image */}
        <div className="absolute bottom-4 right-5 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-white/10 opacity-0 backdrop-blur-sm transition-all group-hover:translate-y-0 group-hover:opacity-100 md:right-6">
          <ArrowUpRight className="h-4 w-4 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <h3 className="font-display text-xl uppercase text-slate-900 md:text-2xl dark:text-white">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {project.description}
        </p>

        {/* Stack tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Proof of Transaction Button */}
        {project.proof_image_url && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewProof();
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-sky-600 transition-all hover:bg-sky-500/20 hover:border-sky-500/50 dark:text-sky-400 dark:hover:text-sky-300"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            View Proof of Transaction
          </button>
        )}
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: Readonly<{ project: Project | null; onClose: () => void }>) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm dark:bg-slate-950/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full max-w-2xl overflow-hidden rounded-3xl bg-gradient-to-br ${project.gradient} shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Full gradient background with overlay */}
            <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:24px_24px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent" />
            
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Content overlay */}
            <div className="relative z-10 flex min-h-[400px] flex-col justify-end p-8 md:min-h-[450px] md:p-10">
              {/* Category and year badges */}
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                  {project.category}
                </span>
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur-sm">
                  {project.year}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-4xl uppercase leading-[0.95] text-white md:text-5xl">
                {project.title}
              </h3>

              {/* Description */}
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                {project.about}
              </p>

              {/* Tech stack */}
              <div className="mt-6">
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                  Tech stack
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm"
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

/* ─── Proof of Transaction Modal — matches the BluTech branded design ─── */
function ProofModal({ project, onClose }: Readonly<{ project: Project | null; onClose: () => void }>) {
  return (
    <AnimatePresence>
      {project && project.proof_image_url && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-md dark:bg-slate-950/90"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[420px] overflow-hidden rounded-3xl shadow-2xl shadow-slate-300/50 dark:shadow-sky-500/10 md:max-w-[740px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal background */}
            <div className="relative bg-white dark:bg-[#070b1a]">
              {/* Subtle gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-500/5 via-transparent to-blue-500/5 dark:to-blue-900/10" />

              {/* Close button */}
              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-500 transition-colors hover:bg-slate-300 hover:text-slate-700 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20 dark:hover:text-white sm:right-4 sm:top-4"
              >
                <X className="h-4 w-4" />
              </button>

              {/* ── Mobile: stacked / Desktop: side-by-side ── */}
              <div className="relative z-10 flex flex-col md:flex-row">
                {/* Left — Image */}
                <div className="flex flex-col items-center px-5 pt-6 md:w-1/2 md:px-8 md:py-8">
                  {/* Logo — mobile only */}
                  <div className="mb-5 flex justify-center md:hidden">
                    <img src="/text-logo.png" alt="BluTech" className="h-10 w-auto object-contain" />
                  </div>
                  {/* Proof Screenshot */}
                  <div className="relative h-[280px] w-[240px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xl shadow-black/10 dark:border-white/10 dark:bg-[#0c1225] dark:shadow-black/30 sm:h-[340px] sm:w-[280px] md:h-[380px] md:w-full">
                    <img src={project.proof_image_url} alt="Proof of transaction" className="h-full w-full object-cover" />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <img src="/blutech-logo.png" alt="" className="h-32 w-32 object-contain opacity-15 sm:h-40 sm:w-40 md:h-48 md:w-48" />
                    </div>
                  </div>
                </div>

                {/* Right — Details */}
                <div className="flex flex-col justify-center px-5 pb-8 pt-6 md:w-1/2 md:px-8 md:py-8">
                  {/* Logo — desktop only */}
                  <div className="mb-6 hidden justify-center md:flex">
                    <img src="/text-logo.png" alt="BluTech" className="h-12 w-auto object-contain" />
                  </div>

                  {/* Divider — mobile only */}
                  <div className="mx-auto mb-5 h-px w-3/4 bg-gradient-to-r from-transparent via-sky-500/30 to-transparent dark:via-sky-500/40 md:hidden" />

                  {/* Client # and Date */}
                  <div className="flex items-start justify-center gap-8 text-center md:gap-10">
                    {project.client_number && (
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-white/50 sm:text-xs">Client#</p>
                        <p className="mt-1 text-lg font-black text-sky-600 dark:text-sky-400 sm:text-xl md:text-2xl">{project.client_number}</p>
                      </div>
                    )}
                    {project.transaction_date && (
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-white/50 sm:text-xs">Date</p>
                        <p className="mt-1 text-lg font-black text-sky-600 dark:text-sky-400 sm:text-xl md:text-2xl">{formatDate(project.transaction_date)}</p>
                      </div>
                    )}
                  </div>

                  {/* Divider — desktop only */}
                  <div className="mx-auto my-5 hidden h-px w-3/4 bg-gradient-to-r from-transparent via-sky-500/30 to-transparent dark:via-sky-500/40 md:block" />

                  {/* Service Type */}
                  {project.service_type && (
                    <div className="mt-4 text-center md:mt-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-white/50 sm:text-xs">Service Type</p>
                      <p className="mt-1 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-lg font-black uppercase text-transparent dark:from-sky-400 dark:to-blue-400 sm:text-xl md:text-2xl">{project.service_type}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
