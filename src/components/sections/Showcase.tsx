import { motion } from "framer-motion";
import { RevealLines, FadeUp } from "@/components/RevealText";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

interface Cell {
  kind: "project" | "stack";
  title: string;
  meta?: string;
  description?: string;
  className: string;
  gradient?: string;
  visual?: ReactNode;
}

const CELLS: Cell[] = [
  {
    kind: "project",
    title: "Atlas — SaaS dashboard",
    meta: "Web · 2024",
    description: "Realtime analytics for ops teams",
    className: "md:col-span-4 md:row-span-2",
    gradient: "from-sky-300 via-sky-500 to-blue-700",
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
  },
  {
    kind: "project",
    title: "North — landing system",
    meta: "Brand · 2023",
    description: "Modular templates for fast launches",
    className: "md:col-span-3",
    gradient: "from-indigo-400 via-blue-500 to-sky-400",
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
  return (
    <section id="work" className="relative bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-40">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <FadeUp>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-sky-600">
                / Selected Work
              </span>
            </FadeUp>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-slate-900">
              <RevealLines lines={[<>Recent</>, <>commissions.</>]} />
            </h2>
          </div>
          <FadeUp delay={0.2}>
            <p className="max-w-sm text-slate-600">
              A taste of what's been built lately — and the tools used to build it.
            </p>
          </FadeUp>
        </div>

        <div className="grid auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          {CELLS.map((c, i) => (
            <BentoCell key={i} cell={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCell({ cell, index }: { cell: Cell; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.06 }}
      className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white ${cell.className}`}
    >
      {cell.kind === "project" ? (
        <>
          <div
            className={`absolute inset-0 bg-gradient-to-br ${cell.gradient} transition-transform duration-700 group-hover:scale-[1.04]`}
          />
          {/* subtle pattern */}
          <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:24px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-900/0 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="flex items-start justify-between text-white/90">
              <span className="text-xs font-medium uppercase tracking-wider">{cell.meta}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
            <div>
              <div className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                {cell.title}
              </div>
              {cell.description && (
                <div className="mt-1 text-sm text-white/80">{cell.description}</div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-full flex-col justify-between p-6">
          <div className="text-xs font-medium uppercase tracking-wider text-sky-600">Stack</div>
          <div>
            <div className="text-2xl font-semibold tracking-tight text-slate-900">{cell.title}</div>
            {cell.description && (
              <div className="mt-1 text-sm text-slate-500">{cell.description}</div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
