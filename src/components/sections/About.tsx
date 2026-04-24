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
  return (
    <section id="about" className="relative bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-40">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <FadeUp>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-sky-600">
                / Process
              </span>
            </FadeUp>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-slate-900">
              <RevealLines lines={[<>From idea</>, <>to launch.</>]} />
            </h2>
          </div>
          <div className="md:col-span-7">
            <ul className="divide-y divide-slate-200">
              {STEPS.map((s, i) => (
                <FadeUp key={s.n} delay={i * 0.05}>
                  <li className="grid grid-cols-12 gap-4 py-7 md:py-9">
                    <div className="col-span-2 text-sm font-medium tabular-nums text-sky-600">{s.n}</div>
                    <div className="col-span-10 md:col-span-4">
                      <div className="text-xl font-semibold text-slate-900">{s.title}</div>
                    </div>
                    <p className="col-span-12 text-slate-600 md:col-span-6">{s.desc}</p>
                  </li>
                </FadeUp>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
