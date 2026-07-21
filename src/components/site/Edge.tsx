import { motion } from "motion/react";
import { Lightbulb, UserCheck, Settings, Cpu, Maximize, Target, Package } from "lucide-react";
import { easeOut } from "./util";

const pillars = [
  {
    t: "Tailored Solutions",
    d: "Programs customized to your organization's goals and challenges.",
    icon: <Lightbulb className="w-10 h-10" />,
  },
  {
    t: "Expert Guidance",
    d: "Learn from industry leaders with real-world success.",
    icon: <UserCheck className="w-10 h-10" />,
  },
  {
    t: "Innovative Framework",
    d: "Proprietary methods for impactful, application-driven results.",
    icon: <Settings className="w-10 h-10" />,
  },
  {
    t: "Advanced Technology",
    d: "State-of-the-art LMS for seamless learning experiences.",
    icon: <Cpu className="w-10 h-10" />,
  },
  {
    t: "Diverse Offerings",
    d: "Courses across industries, skill levels, and emerging fields.",
    icon: <Maximize className="w-10 h-10" />,
  },
  {
    t: "Proven Impact",
    d: "Trusted by leading organizations for measurable ROI.",
    icon: <Target className="w-10 h-10" />,
  },
  {
    t: "Flexible Delivery",
    d: "Online and offline options tailored to your needs.",
    icon: <Package className="w-10 h-10" />,
  },
];

export function Edge() {
  return (
    <section id="edge" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="text-[2.5rem] font-bold text-[#1a202c] mb-3"
        >
          The <span className="text-[#3182ce]">Accredian Edge</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7, ease: easeOut }}
          className="text-[1.3rem] text-[#4a5568] font-medium"
        >
          Key Aspects of <span className="text-[#3182ce]">Our Strategic Training</span>
        </motion.p>
      </div>

      {/* Horizontal timeline with nodes */}
      <div className="max-w-[1400px] mx-auto px-4 relative overflow-x-auto pb-10">
        <div className="min-w-[1000px]">
          {/* Dotted connector line */}
          <div className="absolute top-1/2 left-0 right-0 h-0 border-t-2 border-dotted border-gray-300 -translate-y-1/2 z-0 mx-10" />

          <div className="relative h-[450px] w-full flex justify-between">
            {pillars.map((p, i) => {
              const isTop = i % 2 === 0;
              return (
                <div key={i} className="relative flex-1 h-full flex justify-center">
                  {/* Vertical connector */}
                  <div
                    className={`absolute w-[2px] bg-[#3182ce] h-[100px] z-0 ${
                      isTop ? "top-[35%]" : "bottom-[35%]"
                    }`}
                  />

                  {/* Text card */}
                  <motion.div
                    initial={{ opacity: 0, y: isTop ? -20 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.08, duration: 0.7, ease: easeOut }}
                    className={`absolute w-[180px] ${
                      isTop
                        ? "top-[5%] left-1/2 -translate-x-[20%]"
                        : "bottom-[5%] left-1/2 -translate-x-[20%]"
                    }`}
                  >
                    <div className="border-l-[3px] border-[#3182ce] pl-4">
                      <h4 className="font-bold text-[16px] text-gray-900 leading-tight mb-2">
                        {p.t}
                      </h4>
                      <p className="text-[14px] text-gray-600 leading-relaxed">{p.d}</p>
                    </div>
                  </motion.div>

                  {/* Circle node */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.08 + 0.1, duration: 0.6, ease: easeOut }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.15)]"
                  >
                    <div className="absolute inset-0 rounded-full border-2 border-[#3182ce] opacity-70" />
                    <div className="w-20 h-20 bg-[#3182ce] rounded-full flex items-center justify-center text-white cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(49,130,206,0.4)]">
                      {p.icon}
                    </div>
                  </motion.div>

                  {/* Arrow connector */}
                  {i < pillars.length - 1 && (
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 text-gray-300 bg-white z-20 px-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
