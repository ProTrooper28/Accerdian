import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import dashboard from "@/assets/dashboard.jpg";

function CountUp({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0;
    let start = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      const v = Math.round(start + (to - start) * eased);
      if (ref.current) ref.current.textContent = v.toLocaleString() + suffix;
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, suffix, duration]);
  return <span ref={ref}>0{suffix}</span>;
}

function ChartLine() {
  return (
    <svg viewBox="0 0 300 80" className="h-full w-full">
      <defs>
        <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0,60 C30,55 50,40 80,45 C110,50 130,20 160,25 C190,30 210,15 240,12 C260,10 280,20 300,15"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.75"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M0,60 C30,55 50,40 80,45 C110,50 130,20 160,25 C190,30 210,15 240,12 C260,10 280,20 300,15 L300,80 L0,80 Z"
        fill="url(#area)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.8 }}
      />
    </svg>
  );
}

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const rotY = useTransform(smx, [-1, 1], [3, -3]);
  const rotX = useTransform(smy, [-1, 1], [-2, 2]);
  const tx = useTransform(smx, [-1, 1], [-8, 8]);
  const ty = useTransform(smy, [-1, 1], [-6, 6]);

  return (
    <section
      id="top"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
    >
      {/* ambient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-20%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_14%,transparent),transparent)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,var(--surface-1))]" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.35]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
            </pattern>
            <radialGradient id="fade" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="m"><rect width="100%" height="100%" fill="url(#fade)" /></mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" mask="url(#m)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-[12px] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Enterprise Learning · Purpose‑built for teams
          </span>
          <h1 className="mt-6 text-balance text-[44px] font-medium leading-[1.02] tracking-[-0.03em] md:text-[68px]">
            Next‑Gen Expertise
            <br />
            <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
              for your enterprise.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-balance text-[16px] leading-relaxed text-muted-foreground md:text-[17px]">
            Cultivate high‑performance teams through expert learning — tailored solutions,
            industry insights, and measurable impact.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-5 py-2.5 text-[14px] font-medium text-background transition-all duration-300 hover:shadow-[0_10px_30px_-10px_var(--primary)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--primary)_50%,transparent),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Enquire Now</span>
              <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#edge"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-5 py-2.5 text-[14px] font-medium text-foreground backdrop-blur transition-all duration-300 hover:border-foreground/30 hover:bg-background"
            >
              Explore programs
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12.5px] text-muted-foreground">
            {["Tailored Solutions", "Industry Insights", "Expert Guidance", "Measurable Impact"].map((f) => (
              <span key={f} className="inline-flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6.5L5 9L9.5 3.5" stroke="var(--primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1400 }}
          className="relative mx-auto mt-16 max-w-6xl"
        >
          <motion.div
            style={{ rotateX: rotX, rotateY: rotY, x: tx, y: ty, transformStyle: "preserve-3d" }}
            className="relative rounded-2xl border border-border bg-background shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)]"
          >
            <div className="absolute -inset-px -z-10 rounded-2xl bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklab,var(--primary)_20%,transparent),transparent)] blur-2xl" />
            <img
              src={dashboard}
              width={1600}
              height={1104}
              alt="Enterprise learning analytics dashboard"
              className="block h-auto w-full rounded-2xl"
            />
          </motion.div>

          {/* Floating KPI cards */}
          <motion.div
            className="absolute -left-4 top-16 hidden w-56 rounded-xl border border-border bg-background/80 p-4 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.2)] backdrop-blur-md md:block animate-float-slow"
            style={{ x: useTransform(smx, [-1, 1], [10, -10]), y: useTransform(smy, [-1, 1], [10, -10]) }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Completion</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10.5px] font-medium text-primary">+12.5%</span>
            </div>
            <div className="mt-2 text-[26px] font-medium tracking-tight">
              <CountUp to={94} suffix="%" />
            </div>
            <div className="mt-2 h-8"><ChartLine /></div>
          </motion.div>

          <motion.div
            className="absolute -right-4 bottom-14 hidden w-60 rounded-xl border border-border bg-background/80 p-4 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.2)] backdrop-blur-md md:block animate-float-slow"
            style={{ x: useTransform(smx, [-1, 1], [-12, 12]), y: useTransform(smy, [-1, 1], [-8, 8]), animationDelay: "1.5s" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Active learners</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <div className="mt-2 text-[26px] font-medium tracking-tight">
              <CountUp to={5240} />
            </div>
            <div className="mt-3 grid grid-cols-8 items-end gap-1">
              {[30, 45, 38, 55, 42, 68, 52, 74].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.8 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ height: h, transformOrigin: "bottom" }}
                  className="rounded-sm bg-primary/70"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
