import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BookOpen, Wrench, Zap } from "lucide-react";
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
  { k: "C", t: "Curate", d: "Content built with senior practitioners.", icon: <BookOpen className="h-4 w-4" /> },
  { k: "A", t: "Apply", d: "Live projects rooted in your context.", icon: <Wrench className="h-4 w-4" /> },
  { k: "T", t: "Transform", d: "Measured outcomes across teams.", icon: <Zap className="h-4 w-4" /> },
];

export function Framework() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.9], ["0%", "100%"]);

  return (
    <section id="framework" className="relative py-14 md:py-18">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeading
              eyebrow="The CAT Framework"
              title={
                <>
                  Our proven approach to{" "}
                  <span className="text-muted-foreground">learning excellence.</span>
                </>
              }
              desc="A three‑part operating system that turns learning intent into measurable capability."
            />
            <div className="mt-10 grid grid-cols-3 gap-3">
              {cat.map((c, idx) => (
                <motion.div
                  key={c.k}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: idx * 0.08, duration: 0.8, ease: easeOut }}
                  className="group rounded-xl border border-border bg-surface-1 p-4 transition-all duration-500 hover:border-primary/20 hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_10%,transparent),0_8px_20px_-8px_rgba(0,102,255,0.08)]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[28px] font-medium leading-none tracking-[-0.03em] text-primary">
                      {c.k}
                    </span>
                    <span className="text-primary/50 transition-colors duration-300 group-hover:text-primary/80">
                      {c.icon}
                    </span>
                  </div>
                  <div className="mt-2.5 text-[14px] font-semibold">{c.t}</div>
                  <div className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                    {c.d}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div ref={ref} className="relative md:col-span-7">
            <div className="mb-6">
              <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
                How we deliver results that matter
              </div>
              <div className="mt-2.5 text-[22px] font-semibold tracking-[-0.02em] md:text-[26px]">
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
                  className="relative pb-10 last:pb-0"
                >
                  <div className="absolute -left-[30px] top-1 grid h-6 w-6 place-items-center rounded-full border border-border bg-background text-[10px] font-mono text-muted-foreground shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-500 [.group:hover_&]:border-primary/30">
                    {s.n}
                  </div>
                  <div className="text-[19px] font-semibold tracking-[-0.015em] md:text-[21px]">
                    {s.t}
                  </div>
                  <div className="mt-1.5 max-w-md text-[14px] leading-relaxed text-muted-foreground">
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
