import { useRef } from "react";
import { Code2, Smartphone, Palette, Server, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealLines, FadeUp } from "@/components/RevealText";

const SERVICES = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "High-performance React, Next.js & TanStack apps with smooth-as-silk interactions.",
    tags: ["React", "Next.js", "TanStack"],
  },
  {
    icon: Smartphone,
    title: "App Development",
    desc: "Cross-platform mobile experiences in React Native and Expo, ready for the App Store.",
    tags: ["React Native", "Expo"],
  },
  {
    icon: Palette,
    title: "UI / UX Design",
    desc: "Identity, interface, and motion design from the first wireframe to the final pixel.",
    tags: ["Figma", "Motion", "Design Systems"],
  },
  {
    icon: Server,
    title: "Backend & APIs",
    desc: "Type-safe APIs, edge functions, and Postgres data models that scale with your product.",
    tags: ["Node", "Postgres", "Edge"],
  },
  {
    icon: Sparkles,
    title: "Automation & AI",
    desc: "LLM features, agentic workflows, and integrations that put your operations on autopilot.",
    tags: ["OpenAI", "RAG", "Workflows"],
  },
];

export function Services() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  // Translate horizontally as we scroll the pinned section.
  // 5 cards: travel ~ -72% to leave room.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-74%"]);

  return (
    <section id="services" ref={targetRef} className="relative bg-white" style={{ height: "390svh" }}>
      <div className="sticky top-[76px] flex h-[calc(100svh-76px)] flex-col overflow-hidden py-6 md:py-8">
        {/* Header */}
        <div className="mx-auto w-full max-w-[1500px] px-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:gap-6">
            <div>
              <FadeUp>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-sky-600">
                  / Services
                </span>
              </FadeUp>
              <h2 className="mt-3 font-display text-[clamp(2.5rem,10vw,8rem)] uppercase leading-[0.9] text-slate-900 md:mt-4 md:text-[clamp(3rem,8.2vw,8rem)]">
                <RevealLines lines={[<>What I Do.</>]} />
              </h2>
            </div>
            <FadeUp delay={0.2}>
              <p className="max-w-sm text-sm leading-relaxed text-slate-600 md:text-base">
                Five focused practices, one partner. Scroll horizontally to explore.
              </p>
            </FadeUp>
          </div>
          <div className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500 md:mt-6">
            <span className="h-px w-10 bg-slate-300" />
            <span>Scroll →</span>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="relative mt-4 flex min-h-0 flex-1 items-center md:mt-6">
          <motion.div style={{ x }} className="flex h-full items-stretch gap-4 px-6 md:gap-8 md:px-12">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
            <div className="w-[20vw] shrink-0" aria-hidden />
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-1 left-1/2 h-[2px] w-48 -translate-x-1/2 overflow-hidden rounded-full bg-slate-200 md:w-64">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
              className="h-full w-full bg-gradient-to-r from-sky-400 to-blue-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  desc,
  tags,
  index,
}: {
  icon: typeof Code2;
  title: string;
  desc: string;
  tags: string[];
  index: number;
}) {
  return (
    <div
      className="group relative flex h-full min-h-0 w-[82vw] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 transition-colors hover:border-sky-300 sm:p-6 md:w-[42vw] md:p-10 lg:p-12"
    >
      <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl" />
      </div>
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-blue-100 text-blue-700 md:h-14 md:w-14">
          <Icon className="h-5 w-5 md:h-6 md:w-6" />
        </div>
        <span className="font-display text-sm tabular-nums text-slate-300 md:text-base">
          0{index + 1} / 0{SERVICES.length}
        </span>
      </div>
      <div>
        <h3 className="font-display text-[clamp(2rem,9vw,3.4rem)] uppercase leading-[0.95] text-slate-900 md:text-[clamp(2.6rem,4.4vw,4rem)]">
          {title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 md:mt-5 md:text-base lg:text-lg">{desc}</p>
        <div className="mt-5 flex flex-wrap gap-2 md:mt-7">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
