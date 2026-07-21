import { motion } from "motion/react";
import { Lightbulb, Settings, Wrench } from "lucide-react";
import { easeOut } from "./util";

const cat = [
  {
    letter: "C",
    t: "Concept",
    d: "Foundational knowledge for deep subject understanding.",
    icon: <Lightbulb className="w-12 h-12 text-[#3182ce]" />,
  },
  {
    letter: "A",
    t: "Application",
    d: "Practical implementation through real-world scenarios.",
    icon: <Settings className="w-12 h-12 text-[#3182ce]" />,
  },
  {
    letter: "T",
    t: "Tools",
    d: "Resources and techniques for effective skill mastery.",
    icon: <Wrench className="w-12 h-12 text-[#3182ce]" />,
  },
];

export function Framework() {
  return (
    <section id="framework" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="text-[2.5rem] font-bold text-[#1a202c] mb-3"
        >
          The <span className="text-[#3182ce]">CAT Framework</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7, ease: easeOut }}
          className="text-[1.3rem] text-[#4a5568] font-medium mb-24"
        >
          Our Proven Approach to <span className="text-[#3182ce]">Learning Excellence</span>
        </motion.p>

        {/* Three circles with S-curve connection */}
        <div className="relative max-w-5xl mx-auto">
          {/* SVG S-curve connector (hidden on mobile) */}
          <svg
            className="absolute inset-0 w-full h-full hidden md:block pointer-events-none"
            viewBox="0 0 1000 350"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <motion.path
              d="M 180 175 C 180 50, 350 50, 500 175 C 650 300, 820 300, 820 175"
              stroke="#3182ce"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.25 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
            />
            {/* Connector dots */}
            <motion.circle
              cx="340" cy="100" r="6" fill="#3182ce"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.4 }}
            />
            <motion.circle
              cx="660" cy="250" r="6" fill="#3182ce"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 0.4 }}
            />
          </svg>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 relative z-10">
            {cat.map((c, i) => (
              <motion.div
                key={c.letter}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: easeOut }}
                className={`relative flex flex-col items-center justify-center bg-white rounded-full w-[260px] h-[260px] sm:w-[280px] sm:h-[280px] md:w-[300px] md:h-[300px] border-[5px] border-[#3182ce] px-8 shadow-[inset_0_0_20px_rgba(49,130,206,0.1)] cursor-default ${
                  i > 0 ? "md:-ml-8" : ""
                }`}
              >
                {/* Ring pulse */}
                <div className="absolute inset-[-6px] rounded-full border-[3px] border-[#3182ce] opacity-40 animate-border-glow" />

                {/* Content */}
                <div className="mb-3">{c.icon}</div>
                <h3 className="text-[1.5rem] font-bold text-[#1a202c] mb-2">{c.t}</h3>
                <p className="text-[14px] text-[#4a5568] leading-relaxed text-center max-w-[200px]">
                  {c.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
