import { Orbs } from "@/components/Orbs";
import { GradientButton } from "@/components/GradientButton";
import { RevealLines, FadeUp } from "@/components/RevealText";
import { motion } from "framer-motion";

interface Props {
  onCtaClick: () => void;
}

export function Hero({ onCtaClick }: Props) {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <Orbs />

      {/* Floating glass cards */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute right-[6%] top-[28%] hidden h-44 w-64 rotate-6 rounded-2xl border border-white/60 bg-white/40 shadow-[0_20px_60px_-20px_rgba(29,78,216,0.35)] backdrop-blur-xl md:block"
      >
        <div className="flex h-full flex-col justify-between p-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            <span className="text-xs font-medium text-slate-500">commission_023</span>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400">Status</div>
            <div className="mt-1 text-sm font-semibold text-slate-800">Shipping</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute left-[5%] top-[60%] hidden h-32 w-52 -rotate-6 rounded-2xl border border-white/60 bg-white/40 shadow-[0_20px_60px_-20px_rgba(56,189,248,0.4)] backdrop-blur-xl md:block"
      >
        <div className="flex h-full flex-col justify-between p-4">
          <div className="text-xs uppercase tracking-wider text-slate-400">Stack</div>
          <div className="text-sm font-semibold text-slate-800">React · TS · Postgres</div>
        </div>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeUp>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-1.5 text-xs font-medium text-slate-600 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-500" />
            </span>
            Available for Q3 commissions
          </div>
        </FadeUp>

        <h1 className="font-display text-[clamp(3rem,11vw,12rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-slate-900">
          <RevealLines
            lines={[
              <>Building the</>,
              <>
                Future. <em className="not-italic bg-gradient-to-r from-sky-400 to-blue-700 bg-clip-text text-transparent">Fluidly.</em>
              </>,
            ]}
          />
        </h1>

        <FadeUp delay={0.5} className="mt-10 max-w-xl">
          <p className="text-lg text-slate-600 md:text-xl">
            Freelance commissions by <span className="font-semibold text-slate-900">BluTech</span> —
            buttery-smooth interfaces, modern stacks, and product engineering that ships.
          </p>
        </FadeUp>

        <FadeUp delay={0.7} className="mt-10 flex flex-wrap items-center gap-4">
          <GradientButton onClick={onCtaClick}>Start a Project</GradientButton>
          <a
            href="#work"
            className="text-sm font-medium text-slate-700 underline-offset-4 transition-colors hover:text-slate-900 hover:underline"
          >
            See recent work →
          </a>
        </FadeUp>

        {/* Stats row */}
        <FadeUp delay={0.9} className="mt-24 grid max-w-3xl grid-cols-3 gap-8 border-t border-slate-200 pt-8">
          {[
            { k: "60+", v: "Projects shipped" },
            { k: "8 yrs", v: "Building products" },
            { k: "100%", v: "Async-friendly" },
          ].map((s) => (
            <div key={s.v}>
              <div className="text-2xl font-semibold text-slate-900 md:text-3xl">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">{s.v}</div>
            </div>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
