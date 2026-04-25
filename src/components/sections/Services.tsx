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
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);

  return (
    <section id="services" ref={targetRef} className="relative bg-white" style={{ height: "420vh" }}>
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Header */}
        <div className="mx-auto w-full max-w-[1500px] px-6 pt-24 md:pt-32">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <FadeUp>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-sky-600">
                  / Services
                </span>
              </FadeUp>
              <h2 className="mt-4 font-display text-[clamp(3rem,9vw,9rem)] uppercase leading-[0.9] text-slate-900">
                <RevealLines lines={[<>What I Do.</>]} />
              </h2>
            </div>
            <FadeUp delay={0.2}>
              <p className="max-w-sm text-slate-600">
                Five focused practices, one partner. Scroll horizontally to explore.
              </p>
            </FadeUp>
          </div>
          <div className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500">
            <span className="h-px w-10 bg-slate-300" />
            <span>Scroll →</span>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="relative mt-10 flex flex-1 items-center">
          <motion.div style={{ x }} className="flex gap-8 px-6 md:gap-10 md:px-12">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
            <div className="w-[20vw] shrink-0" aria-hidden />
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-10 left-1/2 h-[2px] w-64 -translate-x-1/2 overflow-hidden rounded-full bg-slate-200">
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
      className="group relative flex h-[60vh] w-[80vw] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 transition-colors hover:border-sky-300 md:h-[68vh] md:w-[42vw] md:p-12"
    >
      <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl" />
      </div>
      <div className="flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-blue-100 text-blue-700">
          <Icon className="h-6 w-6" />
        </div>
        <span className="font-display text-sm tabular-nums text-slate-300 md:text-base">
          0{index + 1} / 0{SERVICES.length}
        </span>
      </div>
      <div>
        <h3 className="font-display text-4xl uppercase leading-[0.95] text-slate-900 md:text-6xl">
          {title}
        </h3>
        <p className="mt-6 max-w-md text-base text-slate-600 md:text-lg">{desc}</p>
        <div className="mt-8 flex flex-wrap gap-2">
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
