import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionHeading, easeOut } from "./util";

const steps = [
  {
    n: "01",
    t: "Skill Gap Analysis",
    d: "We audit team capabilities against your business goals and surface the exact developmental needs — no assumptions.",
  },
  {
    n: "02",
    t: "Customized Training Plan",
    d: "A tailored roadmap addressing organizational priorities, sequenced for compounding impact quarter over quarter.",
  },
  {
    n: "03",
    t: "Flexible Program Delivery",
    d: "Adaptive delivery — cohort, in‑person, or hybrid — aligned with how your teams actually work.",
  },
];

const cat = [
  { k: "C", t: "Curate", d: "Content built with senior practitioners." },
  { k: "A", t: "Apply", d: "Live projects rooted in your context." },
  { k: "T", t: "Transform", d: "Measured outcomes across teams." },
];

export function Framework() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.9], ["0%", "100%"]);

  return (
    <section id="framework" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeading
              eyebrow="The CAT Framework"
              title={<>Our proven approach to <span className="text-muted-foreground">learning excellence.</span></>}
              desc="A three‑part operating system that turns learning intent into measurable capability."
            />
            <div className="mt-10 grid grid-cols-3 gap-4">
              {cat.map((c) => (
                <div key={c.k} className="rounded-xl border border-border bg-surface-1 p-4">
                  <div className="text-[32px] font-medium leading-none tracking-[-0.03em] text-primary">
                    {c.k}
                  </div>
                  <div className="mt-3 text-[14px] font-medium">{c.t}</div>
                  <div className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{c.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div ref={ref} className="relative md:col-span-7">
            <div className="mb-8">
              <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
                How we deliver results that matter
              </div>
              <div className="mt-3 text-[22px] font-medium tracking-[-0.02em] md:text-[26px]">
                A structured three‑step approach.
              </div>
            </div>

            <div className="relative pl-10">
              <div className="absolute left-3 top-2 h-full w-px bg-border" />
              <motion.div
                style={{ height: lineHeight }}
                className="absolute left-3 top-2 w-px bg-gradient-to-b from-primary to-primary/0"
              />

              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: easeOut }}
                  className="relative pb-12 last:pb-0"
                >
                  <div className="absolute -left-[30px] top-1 grid h-6 w-6 place-items-center rounded-full border border-border bg-background text-[10px] font-mono text-muted-foreground">
                    {s.n}
                  </div>
                  <div className="text-[20px] font-medium tracking-[-0.015em] md:text-[22px]">
                    {s.t}
                  </div>
                  <div className="mt-2 max-w-md text-[14.5px] leading-relaxed text-muted-foreground">
                    {s.d}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
