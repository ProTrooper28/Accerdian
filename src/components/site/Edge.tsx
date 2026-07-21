import { motion } from "motion/react";
import { Users, Target, BarChart3, Handshake } from "lucide-react";
import { SectionHeading, easeOut } from "./util";

const pillars = [
  {
    t: "Curated by practitioners",
    d: "Every program is designed with senior operators from Fortune 500 companies — not by generalists.",
    icon: <Users className="h-4.5 w-4.5" />,
  },
  {
    t: "Adaptive to your context",
    d: "We map programs to your team's skill gaps, career stage, and business outcomes.",
    icon: <Target className="h-4.5 w-4.5" />,
  },
  {
    t: "Outcome‑led delivery",
    d: "Every cohort is measured against pre‑defined KPIs, not attendance or completion rate.",
    icon: <BarChart3 className="h-4.5 w-4.5" />,
  },
  {
    t: "White‑glove partnership",
    d: "A dedicated learning partner accompanies your team from kickoff to retrospective.",
    icon: <Handshake className="h-4.5 w-4.5" />,
  },
];

export function Edge() {
  return (
    <section id="edge" className="relative py-14 md:py-18 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="md:col-span-5"
          >
            <SectionHeading
              eyebrow="The Accredian Edge"
              title={
                <>
                  Key aspects of our{" "}
                  <span className="text-muted-foreground">strategic training.</span>
                </>
              }
              desc="A learning system built for enterprises — every element crafted to compound the value your teams create."
            />
          </motion.div>
          <div className="md:col-span-7">
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              {pillars.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.08, duration: 0.8, ease: easeOut }}
                  className="group relative bg-background p-5 transition-all duration-500 hover:bg-surface-1 hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_20%,transparent),0_8px_24px_-8px_rgba(0,102,255,0.08)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-surface-1 text-primary transition-all duration-500 group-hover:border-primary/30 group-hover:bg-primary/8 group-hover:shadow-[0_0_12px_-2px_rgba(0,102,255,0.15)]">
                      {p.icon}
                    </div>
                  </div>
                  <div className="mt-4 text-[15.5px] font-semibold tracking-tight">{p.t}</div>
                  <div className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
                    {p.d}
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-none bg-[radial-gradient(400px_at_var(--x,50%)_var(--y,50%),color-mix(in_oklab,var(--primary)_6%,transparent),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
