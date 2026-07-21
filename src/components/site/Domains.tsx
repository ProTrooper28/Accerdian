import { motion } from "motion/react";
import { Lightbulb, BrainCircuit, Users, ChartColumn, Settings, Globe, CreditCard } from "lucide-react";
import { easeOut, SpotlightCard } from "./util";

const domains = [
  { t: "Product & Innovation Hub", icon: <Lightbulb className="w-14 h-14 text-[#3182ce]" strokeWidth={2.5} /> },
  { t: "Gen-AI Mastery", icon: <BrainCircuit className="w-14 h-14 text-[#3182ce]" strokeWidth={2.5} /> },
  { t: "Leadership Elevation", icon: <Users className="w-14 h-14 text-[#3182ce]" strokeWidth={2.5} /> },
  { t: "Tech & Data Insights", icon: <ChartColumn className="w-14 h-14 text-[#3182ce]" strokeWidth={2.5} /> },
  { t: "Operations Excellence", icon: <Settings className="w-14 h-14 text-[#3182ce]" strokeWidth={2.5} /> },
  { t: "Digital Enterprise", icon: <Globe className="w-14 h-14 text-[#3182ce]" strokeWidth={2.5} /> },
  { t: "Fintech Innovation Lab", icon: <CreditCard className="w-14 h-14 text-[#3182ce]" strokeWidth={2.5} /> },
];

export function Domains() {
  return (
    <section id="domains" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="text-[2.5rem] font-bold text-[#1a202c] mb-3"
          >
            Our <span className="text-[#3182ce]">Domain Expertise</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: easeOut }}
            className="text-[1.3rem] text-[#4a5568] font-medium"
          >
            <span className="text-[#3182ce]">Specialized Programs</span> Designed to Fuel Innovation
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
          {domains.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.8, ease: easeOut }}
              className="w-[calc(33.333%-1.5rem)] min-w-[280px]"
            >
              <SpotlightCard className="p-8 flex flex-col items-center justify-center hover:-translate-y-2 transition-all duration-300 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <div className="mb-5">
                  {d.icon}
                </div>
                <h4 className="font-bold text-[#1a202c] text-[1.1rem] text-center">{d.t}</h4>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
