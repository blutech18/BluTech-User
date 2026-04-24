import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="text-sm uppercase tracking-[0.2em] text-sky-400">// BluTech</div>
            <p className="mt-6 max-w-md text-lg text-slate-300">
              Freelance product engineering and design. Available for Q3 commissions worldwide.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-wider text-slate-500">Connect</div>
            <ul className="mt-4 space-y-2 text-slate-200">
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-sky-400">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-sky-400">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-sky-400">
                  <Twitter className="h-4 w-4" /> Twitter
                </a>
              </li>
              <li>
                <a href="mailto:hello@blutech.dev" className="inline-flex items-center gap-2 hover:text-sky-400">
                  <Mail className="h-4 w-4" /> hello@blutech.dev
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-wider text-slate-500">Sitemap</div>
            <ul className="mt-4 space-y-2 text-slate-200">
              <li><a href="#services" className="hover:text-sky-400">Services</a></li>
              <li><a href="#work" className="hover:text-sky-400">Work</a></li>
              <li><a href="#about" className="hover:text-sky-400">Process</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 select-none">
          <h2
            aria-hidden
            className="font-display bg-gradient-to-b from-white to-slate-700 bg-clip-text text-center font-semibold leading-[0.85] tracking-[-0.06em] text-transparent"
            style={{ fontSize: "clamp(5rem, 22vw, 22rem)" }}
          >
            BLUTECH
          </h2>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 md:flex-row">
          <div>© {year} BluTech. All rights reserved.</div>
          <div>Built with care · TanStack Start · Lenis · Framer Motion</div>
        </div>
      </div>
    </footer>
  );
}
