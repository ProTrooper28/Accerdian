import { motion, useMotionValue, useSpring, useTransform, type Variants } from "motion/react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import dashboard from "@/assets/dashboard.jpg";

/* ─── CountUp (triggers on view) ─── */
function CountUp({
  to,
  suffix = "",
  decimals = 0,
  duration = 1.8,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const t0 = performance.now();
          const step = (t: number) => {
            const p = Math.min(1, (t - t0) / (duration * 1000));
            const eased = 1 - Math.pow(1 - p, 3);
            const v = eased * to;
            if (el)
              el.textContent = v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, suffix, duration, decimals]);

  return (
    <span ref={ref}>
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ─── Animated Chart ─── */
function ChartLine() {
  return (
    <svg viewBox="0 0 300 80" className="h-full w-full">
      <defs>
        <linearGradient id="hero-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0,60 C30,55 50,40 80,45 C110,50 130,20 160,25 C190,30 210,15 240,12 C260,10 280,20 300,15"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M0,60 C30,55 50,40 80,45 C110,50 130,20 160,25 C190,30 210,15 240,12 C260,10 280,20 300,15 L300,80 L0,80 Z"
        fill="url(#hero-area)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.8 }}
      />
    </svg>
  );
}

/* ─── Animated Progress Bar ─── */
function ProgressBar({ value, delay = 0 }: { value: number; delay?: number }) {
  return (
    <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-border/50">
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-primary/70"
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ delay, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

/* ─── Magnetic CTA Button ─── */
function MagneticCTA({
  href,
  children,
  className,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * 0.18);
      y.set((e.clientY - cy) * 0.18);
    },
    [x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.a>
  );
}

/* ─── Animated Arrow ─── */
function AnimatedArrow() {
  return (
    <span className="relative ml-1 inline-flex items-center overflow-hidden">
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        className="transition-transform duration-500 ease-out group-hover:translate-x-1"
      >
        <path
          d="M4 9h10M10 5l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-500 group-hover:[d:path('M6_9h8M11_5l4_4-4_4')]"
        />
      </svg>
    </span>
  );
}

/* ─── Floating Particles ─── */
function Particles({ count = 18 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 1.5,
        duration: 25 + Math.random() * 35,
        delay: Math.random() * 20,
        driftX: (Math.random() - 0.5) * 80,
        driftY: -30 - Math.random() * 60,
        opacity: 0.1 + Math.random() * 0.15,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary/40"
          style={
            {
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              "--drift-x": `${p.driftX}px`,
              "--drift-y": `${p.driftY}px`,
              "--particle-opacity": p.opacity,
              animation: `particle-drift ${p.duration}s ${p.delay}s ease-in-out infinite`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/* ─── Stagger animation variants ─── */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Hero Section ─── */
export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 25, mass: 0.8 });
  const smy = useSpring(my, { stiffness: 50, damping: 25, mass: 0.8 });
  const rotY = useTransform(smx, [-1, 1], [2.5, -2.5]);
  const rotX = useTransform(smy, [-1, 1], [-1.5, 1.5]);
  const tx = useTransform(smx, [-1, 1], [-6, 6]);
  const ty = useTransform(smy, [-1, 1], [-4, 4]);

  // Independent parallax for each KPI card
  const card1X = useTransform(smx, [-1, 1], [12, -12]);
  const card1Y = useTransform(smy, [-1, 1], [8, -8]);
  const card2X = useTransform(smx, [-1, 1], [-14, 14]);
  const card2Y = useTransform(smy, [-1, 1], [-10, 10]);
  const card3X = useTransform(smx, [-1, 1], [-8, 8]);
  const card3Y = useTransform(smy, [-1, 1], [6, -6]);

  return (
    <section
      id="top"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      className="relative overflow-hidden pt-36 pb-24 md:pt-48 md:pb-36"
    >
      {/* ── Background layers ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Ambient radial glow (primary, top center) */}
        <div className="absolute left-1/2 top-[-15%] h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_8%,transparent),transparent)] blur-3xl" />

        {/* Secondary faint blue orb (offset right) */}
        <div className="absolute right-[-10%] top-[10%] h-[500px] w-[600px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_5%,transparent),transparent)] blur-3xl" />

        {/* Fade to surface */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,var(--surface-1))]" />

        {/* Dot grid */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.3]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="hero-dot-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.6" fill="currentColor" className="text-foreground/20" />
            </pattern>
            <radialGradient id="hero-grid-fade" cx="50%" cy="35%" r="55%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="hero-grid-mask">
              <rect width="100%" height="100%" fill="url(#hero-grid-fade)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dot-grid)" mask="url(#hero-grid-mask)" />
        </svg>

        {/* Floating particles */}
        <Particles count={16} />
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge pill */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-border/50 bg-background/50 px-4 py-1.5 text-[12px] font-medium tracking-wide text-muted-foreground shadow-[0_1px_3px_rgba(15,23,42,0.03),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Enterprise Learning · Purpose‑built for teams
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="mt-8 text-balance text-[48px] font-semibold leading-[1.02] tracking-[-0.04em] md:text-[76px]"
          >
            Next‑Gen Expertise
            <br />
            <span className="bg-[linear-gradient(90deg,var(--foreground)_0%,var(--foreground)_40%,color-mix(in_oklab,var(--foreground)_50%,transparent)_100%)] bg-clip-text text-transparent">
              for your enterprise.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-lg text-balance text-[16px] leading-[1.7] text-muted-foreground md:text-[18px]"
          >
            Cultivate high‑performance teams through expert learning — tailored solutions, industry
            insights, and measurable impact.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticCTA
              href="#contact"
              variant="primary"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-foreground to-foreground/90 px-7 py-3.5 text-[15px] font-medium text-background shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_-2px_rgba(0,0,0,0.15)] transition-all duration-500 hover:shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_-4px_var(--primary)] animate-glow-pulse"
            >
              {/* Sweep highlight */}
              <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative">Enquire Now</span>
              <AnimatedArrow />
            </MagneticCTA>

            <MagneticCTA
              href="#edge"
              variant="secondary"
              className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-7 py-3.5 text-[15px] font-medium text-foreground shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-xl transition-all duration-400 hover:border-foreground/20 hover:bg-background/80 hover:shadow-[0_2px_8px_rgba(15,23,42,0.06)]"
            >
              Explore programs
            </MagneticCTA>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-[13px] text-muted-foreground"
          >
            {[
              "Tailored Solutions",
              "Industry Insights",
              "Expert Guidance",
              "Measurable Impact",
            ].map((f, i) => (
              <motion.span
                key={f}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2"
              >
                <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary/10">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2.5 6.5L5 9L9.5 3.5"
                      stroke="var(--primary)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {f}
                {i < 3 && <span className="ml-3 hidden h-3 w-px bg-border/60 sm:inline-block" />}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Dashboard ── */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1600 }}
          className="relative mx-auto mt-20 max-w-6xl"
        >
          {/* Glow behind dashboard */}
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-[radial-gradient(50%_40%_at_50%_0%,color-mix(in_oklab,var(--primary)_12%,transparent),transparent)] blur-3xl animate-border-glow" />

          <motion.div
            style={{ rotateX: rotX, rotateY: rotY, x: tx, y: ty, transformStyle: "preserve-3d" }}
            className="animate-float-dashboard relative rounded-2xl border border-border/50 bg-background shadow-[0_2px_4px_rgba(15,23,42,0.03),0_12px_40px_-8px_rgba(15,23,42,0.12),0_40px_100px_-20px_rgba(15,23,42,0.15)]"
          >
            {/* Top gradient border accent */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <img
              src={dashboard}
              width={1600}
              height={1104}
              alt="Enterprise learning analytics dashboard"
              className="block h-auto w-full rounded-2xl"
            />

            {/* Bottom reflection fade */}
            <div className="absolute inset-x-0 bottom-0 h-24 rounded-b-2xl bg-gradient-to-t from-background/30 to-transparent" />
          </motion.div>

          {/* ─── Floating KPI Card: Completion (left) ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -left-6 top-12 hidden w-56 md:block animate-float-card-1"
            style={{ x: card1X, y: card1Y }}
          >
            <div className="rounded-xl border border-border/40 bg-background/60 p-4 shadow-[0_4px_12px_-2px_rgba(15,23,42,0.06),0_20px_60px_-12px_rgba(15,23,42,0.12)] backdrop-blur-2xl backdrop-saturate-[1.2]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                  Completion
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                  +12.5%
                </span>
              </div>
              <div className="mt-2 text-[28px] font-semibold tracking-tight">
                <CountUp to={94} suffix="%" />
              </div>
              <div className="mt-3">
                <ProgressBar value={94} delay={1.2} />
              </div>
              <div className="mt-3 h-7">
                <ChartLine />
              </div>
            </div>
          </motion.div>

          {/* ─── Floating KPI Card: Active Learners (right-bottom) ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -right-6 bottom-10 hidden w-60 md:block animate-float-card-2"
            style={{ x: card2X, y: card2Y }}
          >
            <div className="rounded-xl border border-border/40 bg-background/60 p-4 shadow-[0_4px_12px_-2px_rgba(15,23,42,0.06),0_20px_60px_-12px_rgba(15,23,42,0.12)] backdrop-blur-2xl backdrop-saturate-[1.2]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                  Active learners
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-ripple" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
              </div>
              <div className="mt-2 text-[28px] font-semibold tracking-tight">
                <CountUp to={5240} />
              </div>
              <div className="mt-3 grid grid-cols-8 items-end gap-1">
                {[30, 45, 38, 55, 42, 68, 52, 74].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ height: h, transformOrigin: "bottom" }}
                    className="rounded-sm bg-gradient-to-t from-primary/50 to-primary/80"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ─── Floating KPI Card: ROI (top-right) ─── */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -right-3 top-8 hidden w-48 lg:block animate-float-card-3"
            style={{ x: card3X, y: card3Y }}
          >
            <div className="rounded-xl border border-border/40 bg-background/60 p-4 shadow-[0_4px_12px_-2px_rgba(15,23,42,0.06),0_20px_60px_-12px_rgba(15,23,42,0.12)] backdrop-blur-2xl backdrop-saturate-[1.2]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                  ROI
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-primary"
                >
                  <path
                    d="M7 2v10M4 5l3-3 3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="mt-2 text-[28px] font-semibold tracking-tight">
                <CountUp to={3.2} suffix="x" decimals={1} />
              </div>
              <div className="mt-3">
                <ProgressBar value={82} delay={1.6} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
