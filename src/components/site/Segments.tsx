import { motion } from "motion/react";
import { easeOut } from "./util";

const segments = [
  {
    t: "Program\nSpecific",
    d: "Certificate, Executive, Post Graduate Certificate",
    color: "from-blue-50 to-blue-100/50",
  },
  {
    t: "Industry\nSpecific",
    d: "IT, Healthcare, Retail, Finance, Education, Manufacturing",
    color: "from-indigo-50 to-indigo-100/50",
  },
  {
    t: "Topic Specific",
    d: "Machine Learning, Design, Analytics, Cybersecurity, Cloud",
    color: "from-sky-50 to-sky-100/50",
  },
  {
    t: "Level Specific",
    d: "Senior Leadership, Mid‑Career Professionals, Freshers",
    color: "from-cyan-50 to-cyan-100/50",
  },
];

export function Segments() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="text-[2.5rem] font-bold text-[#1a202c] mb-3"
          >
            Tailored <span className="text-[#3182ce]">Course Segmentation</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: easeOut }}
            className="text-[1.2rem] text-[#4a5568] font-medium"
          >
            Explore <span className="text-[#3182ce]">Custom-fit Courses</span> Designed to Address Every Professional Focus
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {segments.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: easeOut }}
              className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col h-full border border-gray-50 pb-8 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Gradient placeholder for image area */}
              <div className={`h-[220px] relative mb-6 bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                <div className="text-[#3182ce] text-6xl font-bold opacity-10">
                  0{i + 1}
                </div>
              </div>

              <h3 className="text-[#3182ce] text-2xl font-bold mb-4 px-6 leading-tight whitespace-pre-line">
                {s.t}
              </h3>
              <p className="text-[#4a5568] text-[15px] px-6 leading-relaxed font-medium">
                {s.d}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
