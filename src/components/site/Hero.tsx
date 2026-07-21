import { motion, type Variants } from "motion/react";
import { useEffect, useRef } from "react";
import { CircleCheck } from "lucide-react";
import accredianProfessionals from "@/assets/accredian_professionals.png";
import { useEnquiryModal } from "@/hooks/useEnquiryModal";

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

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const features = [
  "Tailored Solutions",
  "Industry Insights",
  "Expert Guidance",
];

export function Hero() {
  const { openModal } = useEnquiryModal();

  return (
    <section id="top" className="pt-28 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#f4faff] rounded-[2.5rem] relative flex flex-col md:flex-row items-stretch min-h-[520px] overflow-hidden shadow-sm">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#3182ce] opacity-[0.06] blur-[80px]" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-[#63b3ed] opacity-[0.08] blur-[60px]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3182ce" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* ── Left Column: Text & CTA (55%) ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col justify-center md:w-[55%] px-8 sm:px-12 py-14 md:py-16"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 bg-white border border-blue-100 rounded-full px-4 py-1.5 mb-8 w-fit shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38a169]/40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#38a169]" />
              </span>
              <span className="text-sm font-semibold text-[#2d3748] tracking-wide">
                Trusted by 200+ Enterprises
              </span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-[2.8rem] sm:text-[3.2rem] lg:text-[3.6rem] font-bold text-[#1a202c] leading-[1.08] mb-6"
          >
            Next-Gen{" "}
            <span className="relative inline-block">
              <span className="text-[#3182ce]">Expertise</span>
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#3182ce] rounded-full opacity-30" />
            </span>
            <br />
            For Your{" "}
            <span className="relative inline-block">
              <span className="text-[#3182ce]">Enterprise</span>
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#3182ce] rounded-full opacity-30" />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-[1.2rem] sm:text-[1.3rem] text-[#4a5568] mb-8 font-medium leading-relaxed"
          >
            Cultivate high‑performance teams
            <br className="hidden sm:block" />
            {" "}through expert learning.
          </motion.p>

          {/* Trust checkmarks */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <CircleCheck className="text-[#38a169] w-5 h-5 shrink-0" strokeWidth={2.5} />
                <span className="text-[#2d3748] font-medium text-base sm:text-lg">{f}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp}>
            <button
              onClick={() => openModal()}
              className="bg-[#3182ce] text-white px-9 py-3.5 rounded-xl font-semibold text-lg shadow-[0_4px_20px_rgba(49,130,206,0.35)] transition-all duration-300 hover:bg-[#2b6cb0] hover:shadow-[0_8px_28px_rgba(49,130,206,0.45)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#3182ce]/50 focus:ring-offset-2"
            >
              Enquire Now
            </button>
          </motion.div>
        </motion.div>

        {/* ── Right Column: Image (45%) ── */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate="show"
          className="relative z-10 w-full md:w-[45%] h-64 sm:h-80 md:h-auto flex-shrink-0"
        >
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#3182ce] opacity-10 rounded-bl-[2.5rem] rounded-tr-[2.5rem]" />

          <img
            src={accredianProfessionals}
            alt="Enterprise professionals"
            className="absolute inset-0 w-full h-full object-cover object-center md:object-top rounded-b-[2.5rem] md:rounded-bl-none md:rounded-tr-[2.5rem] md:rounded-br-[2.5rem]"
          />

          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-6 left-4 sm:left-6 bg-white rounded-2xl px-5 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex items-center gap-3 z-20"
          >
            <div className="w-10 h-10 rounded-full bg-[#ebf8ff] flex items-center justify-center shrink-0">
              <span className="text-[#3182ce] text-lg font-bold">🎓</span>
            </div>
            <div>
              <p className="text-[#1a202c] font-bold text-sm leading-tight">
                <CountUp to={10000} suffix="+ Trained" />
              </p>
              <p className="text-[#718096] text-xs font-medium">Professionals worldwide</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
