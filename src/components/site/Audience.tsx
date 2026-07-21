import { motion } from "motion/react";
import { useState } from "react";
import { Code, Briefcase, Rocket, Crown } from "lucide-react";
import { SectionHeading, easeOut } from "./util";

const groups = [
  { t: "Tech Professionals", d: "Enhance expertise, embrace emerging tech, and drive innovation across engineering teams.", icon: <Code className="h-7 w-7" /> },
  { t: "Non‑Tech Professionals", d: "Adapt digitally, collaborate effectively in tech-driven environments and grow cross-functional skills.", icon: <Briefcase className="h-7 w-7" /> },
  { t: "Emerging Professionals", d: "Develop powerful foundational skills for rapid career growth and industry relevance.", icon: <Rocket className="h-7 w-7" /> },
  { t: "Senior Professionals", d: "Strengthen executive leadership, enhance strategic decision-making and drive organizational change.", icon: <Crown className="h-7 w-7" /> },
];

export function Audience() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative border-y border-border bg-surface-1 py-14 md:py-18">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          align="center"
          eyebrow="Who Should Join?"
          title={
            <>
              Strategic skill enhancement,{" "}
              <span className="text-muted-foreground">by career stage.</span>
            </>
          }
        />
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="md:col-span-5"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-border bg-background">
              <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_20%,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_70%)]" />
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOut }}
                className="absolute inset-0 grid place-items-center p-8 text-center"
              >
                <div>
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/10 to-primary/5 text-primary shadow-[0_0_20px_-4px_rgba(0,102,255,0.15)] backdrop-blur">
                    {groups[active].icon}
                  </div>
                  <div className="mt-6 text-[22px] font-semibold tracking-[-0.02em] md:text-[26px]">
                    {groups[active].t}
                  </div>
                  <div className="mt-2.5 max-w-xs mx-auto text-[14px] leading-relaxed text-muted-foreground">
                    {groups[active].d}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          <div className="md:col-span-7">
            <div className="flex flex-col">
              {groups.map((g, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.08, duration: 0.7, ease: easeOut }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group relative border-t border-border py-5 text-left transition-all duration-300 ${
                    i === groups.length - 1 ? "border-b" : ""
                  } ${active === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {/* Active left accent */}
                  {active === i && (
                    <motion.div
                      layoutId="audience-accent"
                      className="absolute left-0 top-[20%] bottom-[20%] w-[2px] rounded-full bg-primary"
                      transition={{ duration: 0.5, ease: easeOut }}
                    />
                  )}
                  <div className="flex items-center justify-between gap-6 pl-4">
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-all duration-300 ${active === i ? "bg-primary/10 text-primary" : "bg-surface-1 text-muted-foreground"}`}>
                      {g.icon ? <span className="scale-[0.55]">{groups[i].icon}</span> : null}
                    </span>
                    <span className="flex-1 text-[20px] font-semibold tracking-[-0.02em] md:text-[24px]">
                      {g.t}
                    </span>
                    <motion.span
                      animate={{ x: active === i ? 0 : -6, opacity: active === i ? 1 : 0.3 }}
                      transition={{ duration: 0.4, ease: easeOut }}
                      className="text-foreground"
                    >
                      →
                    </motion.span>
                  </div>
                  {active === i && (
                    <motion.div
                      layoutId="audience-underline"
                      className="absolute inset-x-0 -bottom-px h-px bg-primary/40"
                      transition={{ duration: 0.5, ease: easeOut }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
