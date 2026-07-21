import { motion } from "motion/react";
import { SectionHeading, easeOut } from "./util";

const segments = [
  { t: "Program Specific", d: "Certificate, Executive, Post Graduate Certificate", tag: "Format" },
  {
    t: "Industry Specific",
    d: "IT, Healthcare, Retail, Finance, Education, Manufacturing",
    tag: "Vertical",
  },
  {
    t: "Topic Specific",
    d: "Machine Learning, Design, Analytics, Cybersecurity, Cloud",
    tag: "Skill",
  },
  {
    t: "Level Specific",
    d: "Senior Leadership, Mid‑Career Professionals, Freshers",
    tag: "Seniority",
  },
];

export function Segments() {
  return (
    <section className="relative py-14 md:py-18">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Tailored Course Segmentation"
          title={
            <>
              Custom‑fit courses designed to{" "}
              <span className="text-muted-foreground">address every focus.</span>
            </>
          }
        />
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {segments.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -32 : 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 2) * 0.08, duration: 0.8, ease: easeOut }}
              className={`group relative overflow-hidden rounded-2xl border border-border p-6 md:p-8 ${
                i % 2 === 0 ? "bg-background" : "bg-surface-1"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {s.tag}
                </span>
                <span className="font-mono text-[12px] text-muted-foreground">0{i + 1}</span>
              </div>
              <div className="mt-6 text-[28px] font-medium leading-tight tracking-[-0.02em] md:text-[32px]">
                {s.t}
              </div>
              <div className="mt-3 max-w-md text-[14.5px] leading-relaxed text-muted-foreground">
                {s.d}
              </div>
              <div className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] text-foreground/80 transition-colors group-hover:text-foreground">
                View programs
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </div>
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_12%,transparent),transparent)] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
