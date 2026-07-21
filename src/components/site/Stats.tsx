import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { GraduationCap, Presentation, Users } from "lucide-react";
import { SectionHeading, easeOut } from "./util";

const stats = [
  {
    value: 10000,
    suffix: "+",
    label: "Professionals trained",
    note: "for exceptional career success",
    icon: <GraduationCap className="h-4 w-4" />,
  },
  {
    value: 200,
    suffix: "+",
    label: "Sessions delivered",
    note: "with unmatched learning excellence",
    icon: <Presentation className="h-4 w-4" />,
  },
  {
    value: 5000,
    suffix: "+",
    label: "Active learners",
    note: "engaged in dynamic courses",
    icon: <Users className="h-4 w-4" />,
  },
];

function AnimatedNumber({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    const dur = 1800;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  const display = to >= 1000 ? `${Math.floor(v / 1000)}${v >= 1000 ? "K" : ""}` : `${v}`;
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative border-y border-border bg-surface-1 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Our Track Record"
          title={
            <>
              The numbers behind <span className="text-muted-foreground">our success.</span>
            </>
          }
        />

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: easeOut }}
              className="group relative bg-background p-6 transition-all duration-500 hover:bg-surface-1 md:p-8"
            >
              {/* Top accent line - reveals on hover */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 origin-center bg-gradient-to-r from-transparent via-primary/60 to-transparent transition-transform duration-700 group-hover:scale-x-100" />

              <div className="flex items-center gap-2.5">
                <div className="grid h-7 w-7 place-items-center rounded-lg border border-border bg-surface-1 text-primary/70 transition-all duration-500 group-hover:border-primary/25 group-hover:text-primary group-hover:bg-primary/5">
                  {s.icon}
                </div>
                <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <div className="mt-4 text-[48px] font-medium leading-none tracking-[-0.03em] text-foreground md:text-[56px]">
                <AnimatedNumber to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-[15px] font-semibold">{s.label}</div>
              <div className="mt-0.5 text-[13px] text-muted-foreground">{s.note}</div>

              <div className="pointer-events-none absolute inset-x-6 bottom-4 h-px scale-x-0 origin-left bg-gradient-to-r from-primary/50 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
