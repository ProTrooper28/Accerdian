import { motion } from "motion/react";
import { SectionHeading, easeOut } from "./util";

const domains = [
  { t: "Product & Innovation Hub", d: "Frameworks for shipping category‑defining products.", icon: "◇" },
  { t: "Gen‑AI Mastery", d: "Applied generative AI for teams building today.", icon: "✦" },
  { t: "Leadership Elevation", d: "Executive presence, decision quality, and scale.", icon: "◈" },
  { t: "Tech & Data Insights", d: "Modern data stacks, ML systems, and platform thinking.", icon: "◉" },
  { t: "Operations Excellence", d: "Systems, throughput, and continuous improvement.", icon: "◎" },
  { t: "Digital Enterprise", d: "Cloud‑native transformation across the org.", icon: "◍" },
  { t: "Fintech Innovation Lab", d: "Payments, risk, and financial infrastructure.", icon: "◐" },
];

export function Domains() {
  return (
    <section id="domains" className="relative border-y border-border bg-surface-2 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          align="center"
          eyebrow="Our Domain Expertise"
          title={<>Specialized programs designed to fuel innovation.</>}
        />
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((d, i) => (
            <motion.a
              href="#contact"
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.06, duration: 0.7, ease: easeOut }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-7 transition-all duration-500 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_20px_60px_-20px_rgba(15,23,42,0.15)]"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-surface-1 text-[18px] text-primary transition-transform duration-500 group-hover:-rotate-12">
                  {d.icon}
                </div>
                <span className="text-muted-foreground opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-1">
                  →
                </span>
              </div>
              <div className="mt-8 text-[17px] font-medium tracking-tight">{d.t}</div>
              <div className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">{d.d}</div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 origin-left bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
