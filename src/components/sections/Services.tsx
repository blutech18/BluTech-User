import { Code2, Smartphone, Palette, Server, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
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
  return (
    <section id="services" className="relative bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-40">
        <div className="md:grid md:grid-cols-12 md:gap-16">
          {/* Sticky left */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <FadeUp>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-sky-600">
                  / Services
                </span>
              </FadeUp>
              <h2 className="mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-slate-900">
                <RevealLines lines={[<>What</>, <>I Do.</>]} />
              </h2>
              <FadeUp delay={0.3}>
                <p className="mt-8 max-w-md text-base text-slate-600 md:text-lg">
                  Five focused practices, one partner. End-to-end commissions for
                  founders, agencies, and teams who care about craft.
                </p>
              </FadeUp>
            </div>
          </div>

          {/* Scrolling right */}
          <div className="mt-16 space-y-6 md:col-span-7 md:mt-0">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      className="group relative rounded-3xl border border-slate-200 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_20px_60px_-20px_rgba(56,189,248,0.5)] md:p-9"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 text-blue-700 transition-colors group-hover:from-sky-100 group-hover:to-blue-100">
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-xs font-medium tabular-nums text-slate-400">
          0{index + 1}
        </span>
      </div>
      <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
        {title}
      </h3>
      <p className="mt-3 text-slate-600">{desc}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
