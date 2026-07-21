import { motion, useMotionValue, useSpring, useTransform, type Variants } from "motion/react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import accredianProfessionals from "@/assets/accredian_professionals.png";

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
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.18);
    y.set((e.clientY - cy) * 0.18);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
function Particles({ count = 12 }: { count?: number }) {
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
        opacity: 0.08 + Math.random() * 0.1,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary/30"
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

const partners = ["Reliance", "HCL", "IBM", "CRIF", "ADP", "Bayer", "Deloitte", "Cognizant"];

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 25, mass: 0.8 });
  const smy = useSpring(my, { stiffness: 50, damping: 25, mass: 0.8 });
  const rotY = useTransform(smx, [-1, 1], [3, -3]);
  const rotX = useTransform(smy, [-1, 1], [-2, 2]);
  const tx = useTransform(smx, [-1, 1], [-8, 8]);
  const ty = useTransform(smy, [-1, 1], [-6, 6]);

  // Independent parallax for each floating card
  const card1X = useTransform(smx, [-1, 1], [15, -15]);
  const card1Y = useTransform(smy, [-1, 1], [10, -10]);
  const card2X = useTransform(smx, [-1, 1], [-18, 18]);
  const card2Y = useTransform(smy, [-1, 1], [-12, 12]);
  const card3X = useTransform(smx, [-1, 1], [-10, 10]);
  const card3Y = useTransform(smy, [-1, 1], [8, -8]);
  const card4X = useTransform(smx, [-1, 1], [12, -12]);
  const card4Y = useTransform(smy, [-1, 1], [-8, 8]);

  return (
    <section
      id="top"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      className="relative overflow-hidden pt-32 pb-10 md:pt-40 md:pb-16 lg:min-h-[85vh] flex flex-col justify-between"
    >
      {/* ── Background layers ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Soft radial glow centered under the professionals side */}
        <div className="absolute right-[5%] lg:right-[15%] top-[10%] h-[600px] w-[800px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_12%,transparent),transparent)] blur-3xl" />

        {/* Faint ambient top light */}
        <div className="absolute left-[10%] top-[-10%] h-[400px] w-[600px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_4%,transparent),transparent)] blur-3xl" />

        {/* Fade to surface */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,var(--surface-1))]" />

        {/* Dot grid */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.25]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="hero-dot-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.6" fill="currentColor" className="text-foreground/20" />
            </pattern>
            <radialGradient id="hero-grid-fade" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="hero-grid-mask">
              <rect width="100%" height="100%" fill="url(#hero-grid-fade)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dot-grid)" mask="url(#hero-grid-mask)" />
        </svg>

        <Particles count={10} />
      </div>

      <div className="mx-auto max-w-7xl px-6 w-full flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-8">
          {/* ── Left Column: Text & CTA Content ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            {/* Badge pill */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Enterprise Learning · Purpose‑built for teams
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="mt-6 text-balance text-[44px] font-bold leading-[1.08] tracking-[-0.035em] md:text-[60px] lg:text-[64px]"
            >
              Next-Gen <span className="text-primary">Expertise</span>
              <br />
              For Your <span className="text-primary">Enterprise.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-[16px] leading-[1.65] text-muted-foreground md:text-[17px]"
            >
              Cultivate high‑performance teams through expert learning — tailored solutions,
              industry insights, and measurable impact.
            </motion.p>

            {/* Trust checkmarks */}
            <motion.div
              variants={fadeUp}
              className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3.5 text-[13.5px] text-muted-foreground"
            >
              {[
                { text: "Tailored Solutions", color: "text-emerald-500" },
                { text: "Industry Insights", color: "text-emerald-500" },
                { text: "Expert Guidance", color: "text-emerald-500" },
                { text: "Measurable Impact", color: "text-emerald-500" },
              ].map((f) => (
                <span key={f.text} className="inline-flex items-center gap-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6.5L5 9L9.5 3.5"
                        stroke="rgb(16, 185, 129)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="font-medium text-foreground/80">{f.text}</span>
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticCTA
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_4px_14px_-2px_rgba(0,102,255,0.4)] transition-all duration-300 hover:shadow-[0_8px_20px_-2px_rgba(0,102,255,0.5)]"
              >
                {/* Highlight Sweep */}
                <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative">Enquire Now</span>
                <AnimatedArrow />
              </MagneticCTA>

              <MagneticCTA
                href="#edge"
                className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/50 px-7 py-3.5 text-[15px] font-medium text-foreground shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-xl transition-all duration-300 hover:border-foreground/20 hover:bg-background/80"
              >
                Explore programs
              </MagneticCTA>
            </motion.div>
          </motion.div>

          {/* ── Right Column: Professionals Collage & Floating Cards ── */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end min-h-[420px] lg:min-h-[500px]">
            {/* Soft backdrop glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.08)_0%,transparent_65%)] pointer-events-none" />

            {/* Professionals Cutout Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ rotateX: rotX, rotateY: rotY, x: tx, y: ty, transformStyle: "preserve-3d" }}
              className="relative w-full max-w-[450px] lg:max-w-[480px] z-10 animate-float-dashboard"
            >
              <img
                src={accredianProfessionals}
                alt="Accredian Enterprise Professionals"
                width={800}
                height={800}
                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,102,255,0.12)]"
              />
            </motion.div>

            {/* ── Floating Widget 1: Learning Analytics Card (Top Left) ── */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-[-32px] lg:left-[-54px] top-[15%] z-20 hidden sm:block w-48 animate-float-card-1"
              style={{ x: card1X, y: card1Y }}
            >
              <div className="rounded-xl border border-border/40 bg-background/70 p-3.5 shadow-[0_4px_12px_-2px_rgba(15,23,42,0.06),0_16px_40px_-12px_rgba(15,23,42,0.1)] backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Active Learners
                  </span>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-ripple" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                </div>
                <div className="mt-1.5 text-[24px] font-bold tracking-tight text-foreground">
                  <CountUp to={5240} />
                </div>
                <div className="mt-2.5 h-6">
                  <ChartLine />
                </div>
              </div>
            </motion.div>

            {/* ── Floating Widget 2: Certification Badge (Bottom Left) ── */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.85, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-[-20px] lg:left-[-36px] bottom-[15%] z-20 hidden sm:block w-44 animate-float-card-2"
              style={{ x: card2X, y: card2Y }}
            >
              <div className="rounded-xl border border-border/45 bg-background/75 p-3.5 shadow-[0_4px_12px_-2px_rgba(15,23,42,0.06),0_16px_40px_-12px_rgba(15,23,42,0.1)] backdrop-blur-xl flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Programs
                  </div>
                  <div className="text-[13px] font-bold text-foreground">Accredian Certified</div>
                </div>
              </div>
            </motion.div>

            {/* ── Floating Widget 3: AI Learning Insights (Top Right) ── */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-[-32px] lg:right-[-54px] top-[8%] z-20 hidden sm:block w-48 animate-float-card-3"
              style={{ x: card3X, y: card3Y }}
            >
              <div className="rounded-xl border border-border/40 bg-background/70 p-3.5 shadow-[0_4px_12px_-2px_rgba(15,23,42,0.06),0_16px_40px_-12px_rgba(15,23,42,0.1)] backdrop-blur-xl">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="m12 3-1.912 5.886L4.202 9l5.886 1.912L12 21l1.912-5.886L19.798 15l-5.886-1.912z" />
                  </svg>
                  AI Skill Insights
                </div>
                <div className="mt-1.5 text-[13px] font-bold text-foreground leading-tight">
                  GenAI Readiness up +14%
                </div>
                <div className="mt-1 text-[10px] text-muted-foreground">across tech org</div>
              </div>
            </motion.div>

            {/* ── Floating Widget 4: Completion Widget (Bottom Right) ── */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-[-24px] lg:right-[-42px] bottom-[20%] z-20 hidden sm:block w-48 animate-float-card-4"
              style={{ x: card4X, y: card4Y }}
            >
              <div className="rounded-xl border border-border/40 bg-background/70 p-3.5 shadow-[0_4px_12px_-2px_rgba(15,23,42,0.06),0_16px_40px_-12px_rgba(15,23,42,0.1)] backdrop-blur-xl">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Completion
                  </span>
                  <span className="text-[14px] font-bold text-primary">
                    <CountUp to={94} suffix="%" />
                  </span>
                </div>
                <div className="mt-2">
                  <ProgressBar value={94} delay={1.4} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Subtle Trust Row at Bottom of Hero ── */}
      <div className="w-full border-t border-border/50 bg-background/30 py-4 backdrop-blur-[2px]">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
            Empowering Teams At Leading Global Enterprises
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-[0.45] grayscale hover:opacity-75 transition-opacity duration-300">
            {partners.map((p) => (
              <span key={p} className="text-[14.5px] font-bold tracking-tight text-foreground">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
