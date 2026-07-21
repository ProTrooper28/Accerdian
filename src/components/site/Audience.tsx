import { motion } from "motion/react";
import { useState } from "react";
import { SectionHeading, easeOut } from "./util";

const groups = [
  { t: "Tech Professionals", d: "Enhance expertise, embrace tech, drive innovation." },
  { t: "Non‑Tech Professionals", d: "Adapt digitally, collaborate in tech environments." },
  { t: "Emerging Professionals", d: "Develop powerful skills for rapid career growth." },
  { t: "Senior Professionals", d: "Strengthen leadership, enhance strategic decisions." },
];

export function Audience() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative border-y border-border bg-surface-1 py-28 md:py-36">
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
        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="md:col-span-5"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-background">
              <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_20%,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_70%)]" />
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOut }}
                className="absolute inset-0 grid place-items-center p-8 text-center"
              >
                <div>
                  <div className="mx-auto grid h-24 w-24 place-items-center rounded-2xl border border-border bg-background/70 backdrop-blur">
                    <div className="text-[36px]">{["◐", "◑", "◒", "◓"][active]}</div>
                  </div>
                  <div className="mt-8 text-[24px] font-medium tracking-[-0.02em] md:text-[28px]">
                    {groups[active].t}
                  </div>
                  <div className="mt-3 max-w-xs mx-auto text-[14px] leading-relaxed text-muted-foreground">
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
                  className={`group relative border-t border-border py-6 text-left transition-colors ${
                    i === groups.length - 1 ? "border-b" : ""
                  } ${active === i ? "text-foreground" : "text-muted-foreground"}`}
                >
                  <div className="flex items-baseline justify-between gap-6">
                    <span className="font-mono text-[12px] text-muted-foreground">0{i + 1}</span>
                    <span className="flex-1 text-[22px] font-medium tracking-[-0.02em] md:text-[26px]">
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
                      className="absolute inset-x-0 -bottom-px h-px bg-foreground"
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
