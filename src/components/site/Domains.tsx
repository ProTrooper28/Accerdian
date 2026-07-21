import { motion } from "motion/react";
import { Briefcase, Sparkles, TrendingUp, Cpu, Activity, Globe, Coins } from "lucide-react";
import { SectionHeading, easeOut } from "./util";

const domains = [
  { t: "Product & Innovation Hub", d: "Frameworks for shipping category‑defining products.", icon: <Briefcase className="h-[18px] w-[18px]" /> },
  { t: "Gen‑AI Mastery", d: "Applied generative AI for teams building today.", icon: <Sparkles className="h-[18px] w-[18px]" /> },
  { t: "Leadership Elevation", d: "Executive presence, decision quality, and scale.", icon: <TrendingUp className="h-[18px] w-[18px]" /> },
  { t: "Tech & Data Insights", d: "Modern data stacks, ML systems, and platform thinking.", icon: <Cpu className="h-[18px] w-[18px]" /> },
  { t: "Operations Excellence", d: "Systems, throughput, and continuous improvement.", icon: <Activity className="h-[18px] w-[18px]" /> },
  { t: "Digital Enterprise", d: "Cloud‑native transformation across the org.", icon: <Globe className="h-[18px] w-[18px]" /> },
  { t: "Fintech Innovation Lab", d: "Payments, risk, and financial infrastructure.", icon: <Coins className="h-[18px] w-[18px]" /> },
];

export function Domains() {
  return (
    <section id="domains" className="relative border-y border-border bg-surface-2 py-14 md:py-18">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          align="center"
          eyebrow="Our Domain Expertise"
          title={<>Specialized programs designed to fuel innovation.</>}
        />
        <div className="mt-10 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((d, i) => (
            <motion.a
              href="#contact"
              key={i}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.8, ease: easeOut }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5 transition-all duration-500 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-primary/25 hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_12%,transparent),0_12px_40px_-12px_rgba(0,102,255,0.12)]"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-gradient-to-b from-surface-1 to-background text-primary transition-all duration-500 group-hover:border-primary/20 group-hover:shadow-[0_0_10px_-2px_rgba(0,102,255,0.12)]">
                  {d.icon}
                </div>
                <span className="text-muted-foreground/40 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-2">
                  →
                </span>
              </div>
              <div className="mt-4 text-[16px] font-semibold tracking-tight">{d.t}</div>
              <div className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">{d.d}</div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 origin-left bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
