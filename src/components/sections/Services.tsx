import { useRef, useEffect, useState } from "react";
import { Code2, Smartphone, Palette, Server, Sparkles, Globe, Zap, Layers } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { fetchServices, type ServiceRow } from "@/server/public-data";

const ICON_MAP: Record<string, typeof Code2> = {
  Code2, Smartphone, Palette, Server, Sparkles, Globe, Zap, Layers,
};

const FALLBACK_SERVICES = [
  { icon: "Code2", title: "Web Development", description: "High-performance React, Next.js & TanStack apps with smooth-as-silk interactions.", tags: ["React", "Next.js", "TanStack"] },
  { icon: "Smartphone", title: "App Development", description: "Cross-platform mobile experiences in React Native and Expo, ready for the App Store.", tags: ["React Native", "Expo"] },
  { icon: "Palette", title: "UI / UX Design", description: "Identity, interface, and motion design from the first wireframe to the final pixel.", tags: ["Figma", "Motion", "Design Systems"] },
  { icon: "Server", title: "Backend & APIs", description: "Type-safe APIs, edge functions, and Postgres data models that scale with your product.", tags: ["Node", "Postgres", "Edge"] },
  { icon: "Sparkles", title: "Automation & AI", description: "LLM features, agentic workflows, and integrations that put your operations on autopilot.", tags: ["OpenAI", "RAG", "Workflows"] },
];

export function Services() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-74%"]);

  const doFetch = useServerFn(fetchServices);
  const [services, setServices] = useState(FALLBACK_SERVICES);

  useEffect(() => {
    doFetch({}).then((rows) => {
      if (rows && rows.length > 0) {
        setServices(rows.map((r) => ({ icon: r.icon, title: r.title, description: r.description, tags: r.tags })));
      }
    }).catch(() => {});
  }, []);

  const totalServices = services.length;

  return (
    <section id="services" ref={targetRef} className="relative bg-white dark:bg-slate-950" style={{ height: "390svh" }}>
      <div className="sticky top-[76px] flex h-[calc(100svh-76px)] flex-col overflow-hidden py-6 md:py-8">
        {/* Header */}
        <div className="mx-auto w-full max-w-[1500px] px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-end md:gap-6">
            <div className="md:col-span-8">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                / Services
              </span>
              <h2 className="mt-3 font-display text-[clamp(2.5rem,10vw,8rem)] uppercase leading-[0.9] text-slate-900 dark:text-white md:mt-4 md:text-[clamp(3rem,8.2vw,8rem)]">
                What I Do.
              </h2>
              <div className="mt-4 flex flex-col gap-4 md:mt-6 md:flex-row md:items-center md:gap-6">
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:max-w-none md:text-base">
                  {totalServices} focused practices, one partner. Scroll horizontally to explore.
                </p>
                <div className="flex shrink-0 items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  <span className="h-px w-10 bg-slate-300 dark:bg-slate-600" />
                  <span>Scroll →</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block md:col-span-4" aria-hidden />
          </div>
        </div>

        {/* Horizontal track */}
        <div className="relative mt-4 flex min-h-0 flex-1 items-center md:mt-6">
          <motion.div style={{ x }} className="flex h-full items-stretch gap-4 px-6 md:gap-8 md:px-12">
            {services.map((s, i) => (
              <ServiceCard key={s.title} icon={ICON_MAP[s.icon] ?? Code2} title={s.title} desc={s.description} tags={s.tags} index={i} total={totalServices} />
            ))}
            <div className="w-[20vw] shrink-0" aria-hidden />
          </motion.div>
        </div>
        {/* Progress bar */}
        <div className="mx-auto mt-4 h-[2px] w-48 shrink-0 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 md:mt-6 md:w-64">
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
            className="h-full w-full bg-gradient-to-r from-sky-400 to-blue-700"
          />
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
  total,
}: Readonly<{
  icon: typeof Code2;
  title: string;
  desc: string;
  tags: string[];
  index: number;
  total: number;
}>) {
  return (
    <div
      className="group relative flex w-[82vw] shrink-0 flex-col justify-between rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 transition-colors hover:border-sky-300 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 dark:hover:border-sky-500 sm:p-6 md:w-[38vw] md:p-9 lg:w-[34vw] lg:p-10"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl dark:bg-sky-600/30" />
      </div>
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-blue-100 text-blue-700 dark:from-sky-900/50 dark:to-blue-900/50 dark:text-sky-400 md:h-13 md:w-13">
          <Icon className="h-5 w-5 md:h-6 md:w-6" />
        </div>
        <span className="font-display text-sm tabular-nums text-slate-300 dark:text-slate-600 md:text-base">
          0{index + 1} / 0{total}
        </span>
      </div>
      <div className="mt-6">
        <h3 className="font-display text-[clamp(1.8rem,7vw,3rem)] uppercase leading-[0.95] text-slate-900 dark:text-white md:text-[clamp(2.2rem,3.8vw,3.4rem)]">
          {title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:mt-4 md:text-base">{desc}</p>
        <div className="mt-4 flex flex-wrap gap-2 md:mt-5">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
