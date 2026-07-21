import { motion } from "motion/react";

export function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-14 md:py-18">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-border bg-background px-8 py-14 text-center md:px-16 md:py-20"
        >
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(50%_60%_at_50%_0%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_70%)]" />
            <svg
              className="absolute inset-0 h-full w-full opacity-40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="currentColor" className="text-border" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-[12px] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Ready when you are
          </div>
          <h2 className="mt-6 text-balance text-[36px] font-medium leading-[1.05] tracking-[-0.03em] md:text-[56px]">
            Want to learn more about
            <br />
            <span className="text-muted-foreground">our training solutions?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15.5px] leading-relaxed text-muted-foreground">
            Get expert guidance for your team's success. A learning partner will reach out within 24
            hours.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[14.5px] font-semibold text-white transition-all duration-300 hover:shadow-[0_12px_32px_-8px_rgba(0,102,255,0.5)]"
            >
              Enquire Now
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#framework"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-[14.5px] font-medium transition-colors hover:border-foreground/30"
            >
              Talk to an expert
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
