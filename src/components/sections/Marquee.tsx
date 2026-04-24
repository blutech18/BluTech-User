const ITEMS = [
  "Web Development",
  "App Development",
  "UI / UX Design",
  "Backend & APIs",
  "Automation & AI",
  "BluTech Studio",
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-slate-200 bg-white py-6"
    >
      <div className="flex animate-[marquee_40s_linear_infinite] gap-12 whitespace-nowrap will-change-transform">
        {row.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-12 text-2xl font-semibold tracking-tight text-slate-900 md:text-4xl"
          >
            {t}
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-sky-400 to-blue-700" />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
