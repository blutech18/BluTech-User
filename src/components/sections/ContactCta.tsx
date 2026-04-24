import { GradientButton } from "@/components/GradientButton";
import { RevealLines, FadeUp } from "@/components/RevealText";

interface Props {
  onCtaClick: () => void;
}

export function ContactCta({ onCtaClick }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white to-sky-50">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-sky-300/40 via-sky-200/20 to-transparent blur-3xl"
      />
      <div className="relative mx-auto max-w-5xl px-6 py-32 text-center md:py-48">
        <FadeUp>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-sky-600">
            / Let's build
          </span>
        </FadeUp>
        <h2 className="mt-6 font-display text-[clamp(2.75rem,9vw,8rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-slate-900">
          <RevealLines
            lines={[
              <>Have an idea?</>,
              <>
                Let's{" "}
                <em className="not-italic bg-gradient-to-r from-sky-400 to-blue-700 bg-clip-text text-transparent">
                  build it.
                </em>
              </>,
            ]}
          />
        </h2>
        <FadeUp delay={0.4} className="mt-10 flex justify-center">
          <GradientButton onClick={onCtaClick}>Start a Project</GradientButton>
        </FadeUp>
      </div>
    </section>
  );
}
