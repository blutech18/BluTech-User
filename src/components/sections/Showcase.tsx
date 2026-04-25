import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealLines, FadeUp } from "@/components/RevealText";
import { ArrowUpRight, X } from "lucide-react";

interface ProjectCell {
  kind: "project";
  title: string;
  meta: string;
  description: string;
  className: string;
  gradient: string;
  stack: string[];
  about: string;
}

interface StackCell {
  kind: "stack";
  title: string;
  description: string;
  className: string;
}

type Cell = ProjectCell | StackCell;

const CELLS: Cell[] = [
  {
    kind: "project",
    title: "Atlas — SaaS dashboard",
    meta: "Web · 2024",
    description: "Realtime analytics for ops teams",
    className: "md:col-span-4 md:row-span-2",
    gradient: "from-sky-300 via-sky-500 to-blue-700",
    stack: ["React 19", "TanStack Query", "Postgres", "Edge functions", "Tailwind v4"],
    about:
      "A realtime ops dashboard handling 12M+ events per day. Custom websocket layer, virtualized tables, and a design system shipped in 6 weeks.",
  },
  {
    kind: "stack",
    title: "React 19",
    description: "UI as a function of state",
    className: "md:col-span-2",
  },
  {
    kind: "stack",
    title: "TypeScript",
    description: "Strict, end-to-end",
    className: "md:col-span-2",
  },
  {
    kind: "project",
    title: "Hover — fintech app",
    meta: "Mobile · 2024",
    description: "Spend insights with smart alerts",
    className: "md:col-span-2 md:row-span-2",
    gradient: "from-blue-600 via-blue-700 to-slate-900",
    stack: ["React Native", "Expo", "tRPC", "Postgres"],
    about:
      "Cross-platform mobile fintech with on-device categorization, push insights, and Plaid integration. 4.8★ launch rating.",
  },
  {
    kind: "stack",
    title: "Postgres",
    description: "The only database you need",
    className: "md:col-span-2",
  },
  {
    kind: "project",
    title: "Lume — design tool",
    meta: "Web · 2023",
    description: "Browser-native illustration suite",
    className: "md:col-span-3",
    gradient: "from-cyan-300 via-sky-400 to-blue-600",
    stack: ["WebGL", "Canvas", "Yjs CRDT", "Rust + WASM"],
    about:
      "A collaborative vector editor running entirely in the browser. Real-time multiplayer via CRDTs and a Rust render core for 120fps panning.",
  },
  {
    kind: "project",
    title: "North — landing system",
    meta: "Brand · 2023",
    description: "Modular templates for fast launches",
    className: "md:col-span-3",
    gradient: "from-indigo-400 via-blue-500 to-sky-400",
    stack: ["Next.js", "MDX", "Sanity", "Framer Motion"],
    about:
      "A modular landing page system used by 14 startups. CMS-driven blocks, design tokens, and a launch in under a day.",
  },
  {
    kind: "stack",
    title: "Tailwind v4",
    description: "Design tokens in CSS",
    className: "md:col-span-2",
  },
  {
    kind: "stack",
    title: "Edge runtime",
    description: "Globally distributed by default",
    className: "md:col-span-2",
  },
  {
    kind: "stack",
    title: "OpenAI · Anthropic",
    description: "LLM features that ship",
    className: "md:col-span-2",
  },
];

export function Showcase() {
  const [active, setActive] = useState<ProjectCell | null>(null);

  return (
    <section id="work" className="relative bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-40">
        <div className="md:grid md:grid-cols-12 md:gap-16">
          {/* Sticky left rail (was Services style) */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <FadeUp>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-sky-600">
                  / Selected Work
                </span>
              </FadeUp>
              <h2 className="mt-6 font-display text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.92] text-slate-900">
                <RevealLines lines={[<>Recent</>, <>Commissions.</>]} />
              </h2>
              <FadeUp delay={0.3}>
                <p className="mt-8 max-w-md text-base text-slate-600 md:text-lg">
                  A taste of what's been built lately — and the tools used to build it. Click any
                  project to see the stack and story.
                </p>
              </FadeUp>
              <FadeUp delay={0.45}>
                <div className="mt-8 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500 md:flex">
                  <span className="h-px w-10 bg-slate-300" />
                  <span>{CELLS.filter((c) => c.kind === "project").length} case studies</span>
                </div>
              </FadeUp>
            </div>
          </div>

          {/* Right scrolling stack of cards */}
          <div className="mt-16 space-y-6 md:col-span-7 md:mt-0">
            {CELLS.map((c, i) => (
              <BentoCard key={i} cell={c} index={i} onOpen={() => c.kind === "project" && setActive(c)} />
            ))}
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
}: {
  cell: Cell;
  index: number;
  onOpen: () => void;
}) {
  const isProject = cell.kind === "project";
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.05 }}
      onClick={isProject ? onOpen : undefined}
      className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_20px_60px_-20px_rgba(56,189,248,0.5)] ${
        isProject ? "cursor-pointer" : ""
      }`}
    >
      {isProject ? (
        <div className="relative h-64 md:h-80">
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
              <div className="mt-3 flex flex-wrap gap-2">
                {cell.stack.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/30 bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur"
                  >
                    {s}
                  </span>
                ))}
                {cell.stack.length > 4 && (
                  <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-medium text-white">
                    +{cell.stack.length - 4}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-44 flex-col justify-between p-7 md:p-9">
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-sky-600">Stack</div>
          <div>
            <div className="font-display text-2xl uppercase tracking-tight text-slate-900 md:text-3xl">
              {cell.title}
            </div>
            <div className="mt-1 text-sm text-slate-500">{cell.description}</div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: ProjectCell | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
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
              <h3 className="font-display text-3xl uppercase leading-[0.95] text-slate-900 md:text-4xl">
                {project.title}
              </h3>
              <p className="mt-4 text-base text-slate-600">{project.about}</p>
              <div className="mt-6">
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-sky-600">
                  Tech stack
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700"
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
