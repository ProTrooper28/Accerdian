import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { easeOut } from "./util";

const stats = [
  {
    value: 10000,
    suffix: "K+",
    label: "Professionals Trained For Exceptional Career Success",
  },
  {
    value: 200,
    suffix: "+",
    label: "Sessions Delivered With Unmatched Learning Excellence",
  },
  {
    value: 5000,
    suffix: "K+",
    label: "Active Learners Engaged In Dynamic Courses",
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
    const display = to >= 1000 ? to / 1000 : to;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(display * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v}{suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section id="stats" className="py-24 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#3182ce] blur-[90px] opacity-[0.04] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#63b3ed] blur-[80px] opacity-[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="text-[2.5rem] font-bold text-[#1a202c] mb-3"
        >
          Our <span className="text-[#3182ce]">Track Record</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7, ease: easeOut }}
          className="text-[1.3rem] text-[#4a5568] mb-20 font-medium"
        >
          The Numbers Behind <span className="text-[#3182ce]">Our Success</span>
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: easeOut }}
              className={`flex flex-col items-center px-8 pb-8 ${
                i < stats.length - 1 ? "md:border-r border-gray-200" : ""
              }`}
            >
              {/* Pill counter */}
              <div className="relative mb-8">
                <div className="absolute inset-[-10px] rounded-full border-2 border-[#3182ce] opacity-60 animate-border-glow" />
                <div className="group bg-[#ebf8ff] text-[#3182ce] text-[2rem] font-bold py-3 px-12 rounded-full cursor-default select-none min-w-[180px] text-center transition-all duration-300 hover:bg-[#3182ce] hover:text-white hover:shadow-[0_12px_32px_rgba(49,130,206,0.3)]">
                  <AnimatedNumber to={s.value} suffix={s.suffix} />
                </div>
              </div>

              {/* Accent line */}
              <div className="h-[3px] w-16 rounded-full bg-gradient-to-r from-transparent via-[#3182ce] to-transparent mb-5" />

              <p className="text-[#2d3748] font-medium text-lg leading-snug max-w-[250px]">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
