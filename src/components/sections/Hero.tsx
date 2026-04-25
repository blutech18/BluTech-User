import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Orbs } from "@/components/Orbs";
import { GradientButton } from "@/components/GradientButton";
import { RevealLines, FadeUp } from "@/components/RevealText";
import { ArrowDown, Sparkles } from "lucide-react";

interface Props {
  onCtaClick: () => void;
}

export function Hero({ onCtaClick }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse parallax for floating cards
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const sx = useSpring(mouse.x, { stiffness: 60, damping: 20 });
  const sy = useSpring(mouse.y, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden pt-32 pb-16 md:pt-36 md:pb-24"
    >
      <Orbs />
      {/* Grid background */}
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <motion.div style={{ y, scale, opacity }} className="relative mx-auto max-w-[1400px] px-6">
        {/* Top meta row */}
        <FadeUp>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-1.5 text-xs font-medium text-slate-600 backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-500" />
              </span>
              Available for Q3 commissions
            </div>
            <div className="hidden items-center gap-6 text-xs uppercase tracking-[0.2em] text-slate-500 md:flex">
              <span>EST. 2017</span>
              <span className="h-px w-12 bg-slate-300" />
              <span>Worldwide · Async</span>
            </div>
          </div>
        </FadeUp>

        {/* Massive type */}
        <h1 className="mt-10 font-display text-[clamp(3.5rem,14vw,15rem)] uppercase leading-[0.86] text-slate-900 md:mt-16">
          <RevealLines
            lines={[
              <span key="1" className="block">Building</span>,
              <span key="2" className="block">
                The{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
                    Future
                  </span>
                  <span className="absolute -right-4 -top-2 hidden h-3 w-3 rounded-full bg-sky-400 md:block" />
                </span>
              </span>,
              <span key="3" className="block">
                <span className="italic text-slate-400">— Fluidly.</span>
              </span>,
            ]}
          />
        </h1>

        {/* Bottom row: description + CTA + scroll cue */}
        <div className="mt-12 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-8">
          <FadeUp delay={0.5} className="md:col-span-5">
            <p className="text-lg text-slate-600 md:text-xl">
              Freelance commissions by{" "}
              <span className="font-semibold text-slate-900">BluTech</span> — buttery-smooth
              interfaces, modern stacks, and product engineering that ships.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <GradientButton onClick={onCtaClick}>Start a Project</GradientButton>
              <a
                href="#work"
                className="text-sm font-medium text-slate-700 underline-offset-4 transition-colors hover:text-slate-900 hover:underline"
              >
                See recent work →
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.7} className="md:col-span-4 md:col-start-9">
            <div className="grid grid-cols-3 gap-6 border-t border-slate-200 pt-6">
              {[
                { k: "60+", v: "Shipped" },
                { k: "8 yr", v: "Experience" },
                { k: "100%", v: "Async" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-3xl text-slate-900 md:text-4xl">{s.k}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">{s.v}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Scroll cue */}
        <div className="mt-16 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-500">
          <div className="flex items-center gap-2">
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
            Scroll
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Sparkles className="h-3.5 w-3.5 text-sky-500" />
            Crafted with care
          </div>
        </div>
      </motion.div>

      {/* Floating glass cards with mouse parallax */}
      <motion.div
        aria-hidden
        style={{ x: useTransform(sx, (v) => v * -22), y: useTransform(sy, (v) => v * -22) }}
        className="pointer-events-none absolute right-[5%] top-[26%] hidden h-44 w-64 rotate-6 rounded-2xl border border-white/60 bg-white/50 shadow-[0_20px_60px_-20px_rgba(29,78,216,0.4)] backdrop-blur-xl md:block"
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
        style={{ x: useTransform(sx, (v) => v * 30), y: useTransform(sy, (v) => v * 18) }}
        className="pointer-events-none absolute left-[4%] top-[58%] hidden h-32 w-56 -rotate-6 rounded-2xl border border-white/60 bg-white/50 shadow-[0_20px_60px_-20px_rgba(56,189,248,0.45)] backdrop-blur-xl md:block"
      >
        <div className="flex h-full flex-col justify-between p-4">
          <div className="text-xs uppercase tracking-wider text-slate-400">Stack</div>
          <div className="text-sm font-semibold text-slate-800">React · TS · Postgres</div>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        style={{ x: useTransform(sx, (v) => v * 14), y: useTransform(sy, (v) => v * -28) }}
        className="pointer-events-none absolute right-[12%] bottom-[14%] hidden h-24 w-24 rotate-12 rounded-2xl border border-white/60 bg-gradient-to-br from-sky-400 to-blue-700 shadow-[0_20px_60px_-20px_rgba(56,189,248,0.6)] md:block"
      />
    </section>
  );
}
