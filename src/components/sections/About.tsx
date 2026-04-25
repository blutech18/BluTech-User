import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { RevealLines, FadeUp } from "@/components/RevealText";

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
      style={{ height: `${100 + STEPS.length * 80}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1400px] gap-12 px-6 md:grid-cols-12 md:gap-16">
          {/* Left — heading + progress rail */}
          <div className="md:col-span-5">
            <FadeUp>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-sky-600">
                / Process
              </span>
            </FadeUp>
            <h2 className="mt-6 font-display text-[clamp(2.75rem,7vw,6rem)] uppercase leading-[0.9] text-slate-900">
              <RevealLines lines={[<>From idea</>, <>to launch.</>]} />
            </h2>

            {/* Vertical progress bar */}
            <div className="mt-12 hidden items-center gap-4 md:flex">
              <div className="relative h-48 w-[2px] overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  style={{ scaleY: scrollYProgress, transformOrigin: "50% 0%" }}
                  className="absolute inset-0 bg-gradient-to-b from-sky-400 to-blue-700"
                />
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Scroll to advance
              </div>
            </div>
          </div>

          {/* Right — stacked steps with scroll-driven reveal */}
          <div className="relative md:col-span-7">
            <div className="relative h-[60vh] md:h-[70vh]">
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

  // Each card slides up from below, settles, then slides up & fades out for next.
  const isLast = index === total - 1;
  const y = useTransform(
    progress,
    [start, peak, end],
    ["80%", "0%", isLast ? "0%" : "-30%"],
  );
  const opacity = useTransform(
    progress,
    [start, start + slot * 0.15, peak, end - 0.02, end],
    [0, 1, 1, isLast ? 1 : 1, isLast ? 1 : 0],
  );
  const scale = useTransform(progress, [start, peak, end], [0.96, 1, isLast ? 1 : 0.97]);

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.25)] md:p-12">
        <div className="flex items-center justify-between">
          <span className="font-display text-sm tabular-nums text-sky-600">{step.n}</span>
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Step {index + 1} of {total}
          </span>
        </div>
        <h3 className="mt-6 font-display text-4xl uppercase leading-[0.95] text-slate-900 md:text-6xl">
          {step.title}
        </h3>
        <p className="mt-6 max-w-lg text-base text-slate-600 md:text-lg">{step.desc}</p>
      </div>
    </motion.div>
  );
}
