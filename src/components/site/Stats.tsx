import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SectionHeading, easeOut } from "./util";

const stats = [
  {
    value: 10000,
    suffix: "+",
    label: "Professionals trained",
    note: "for exceptional career success",
  },
  {
    value: 200,
    suffix: "+",
    label: "Sessions delivered",
    note: "with unmatched learning excellence",
  },
  { value: 5000, suffix: "+", label: "Active learners", note: "engaged in dynamic courses" },
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
              className="group relative bg-background p-6 transition-colors hover:bg-surface-1 md:p-8"
            >
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                0{i + 1}
              </div>
              <div className="mt-4 text-[48px] font-medium leading-none tracking-[-0.03em] md:text-[60px]">
                <AnimatedNumber to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-4 text-[15px] font-medium">{s.label}</div>
              <div className="mt-1 text-[13.5px] text-muted-foreground">{s.note}</div>

              <div className="pointer-events-none absolute inset-x-6 bottom-4 h-px scale-x-0 origin-left bg-gradient-to-r from-primary/60 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
