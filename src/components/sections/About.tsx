import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Discovery",
    desc: "We align on goals, scope, timelines and success metrics in a focused kickoff.",
  },
  {
    n: "02",
    title: "Design & Prototype",
    desc: "Rapid prototyping in Figma — clickable, testable, ready for stakeholder feedback.",
  },
  {
    n: "03",
    title: "Build",
    desc: "Weekly demos, async updates, production-grade code from day one.",
  },
  {
    n: "04",
    title: "Ship & Iterate",
    desc: "We launch, measure, and tune. Most projects keep shipping after handoff.",
  },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-white"
      style={{ height: `${110 + STEPS.length * 58}svh` }}
    >
      <div className="sticky top-[76px] flex h-[calc(100svh-76px)] items-center overflow-hidden py-6 md:py-8">
        <div className="mx-auto grid h-full w-full max-w-[1400px] grid-rows-[auto_minmax(0,1fr)] gap-5 px-6 md:grid-cols-12 md:grid-rows-1 md:items-center md:gap-10">
          {/* Left — heading + progress */}
          <div className="self-end md:col-span-5 md:self-center">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-sky-600">
              / Process
            </span>
            <h2 className="mt-3 font-display text-[clamp(2rem,8vw,4.2rem)] uppercase leading-[0.9] text-slate-900 md:mt-4 md:text-[clamp(2rem,5vw,4.2rem)]">
              From idea<br />to launch.
            </h2>

            {/* Horizontal progress bar — compact */}
            <div className="mt-4 flex items-center gap-3 md:mt-6">
              <div className="relative h-[2px] w-40 overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
                  className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-700"
                />
              </div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Scroll to advance
              </span>
            </div>
          </div>

          {/* Right — stacked steps */}
          <div className="relative min-h-0 md:col-span-7">
            <div className="relative h-full min-h-[220px] md:h-[min(50svh,390px)] md:min-h-[280px]">
              {STEPS.map((s, i) => (
                <Step
                  key={s.n}
                  step={s}
                  index={i}
                  total={STEPS.length}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({
  step,
  index,
  total,
  progress,
}: {
  step: (typeof STEPS)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const slot = 1 / total;
  const start = index * slot;
  const peak = start + slot * 0.5;
  const end = (index + 1) * slot;
  const isLast = index === total - 1;

  const y = useTransform(
    progress,
    [start, peak, end],
    [index === 0 ? "0%" : "60%", "0%", isLast ? "0%" : "-25%"],
  );
  const opacity = useTransform(
    progress,
    [start, start + slot * 0.15, peak, end - 0.02, end],
    [index === 0 ? 1 : 0, 1, 1, 1, isLast ? 1 : 0],
  );
  const scale = useTransform(progress, [start, peak, end], [0.96, 1, isLast ? 1 : 0.97]);

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="max-h-full overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.25)] sm:p-6 md:p-9">
        <div className="flex items-center justify-between">
          <span className="font-display text-sm tabular-nums text-sky-600">{step.n}</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
            Step {index + 1} of {total}
          </span>
        </div>
        <h3 className="mt-4 font-display text-[clamp(1.65rem,8vw,3rem)] uppercase leading-[0.95] text-slate-900 md:text-[clamp(2rem,4vw,3.25rem)]">
          {step.title}
        </h3>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600 md:mt-4 md:text-base">{step.desc}</p>
      </div>
    </motion.div>
  );
}
