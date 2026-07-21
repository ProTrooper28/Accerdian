import { motion } from "motion/react";
import { Monitor, MonitorOff, GraduationCap, Briefcase } from "lucide-react";
import { easeOut } from "./util";
import accredianProfessionals from "@/assets/accredian_professionals.png";

const groups = [
  { t: "Tech Professionals", d: "Enhance expertise, embrace tech, drive innovation.", icon: <Monitor className="w-12 h-12 text-white" /> },
  { t: "Non‑Tech Professionals", d: "Adapt digitally, collaborate in tech environments.", icon: <MonitorOff className="w-12 h-12 text-white" /> },
  { t: "Emerging Professionals", d: "Develop powerful skills for rapid career growth.", icon: <GraduationCap className="w-12 h-12 text-white" /> },
  { t: "Senior Professionals", d: "Strengthen leadership, enhance strategic decisions.", icon: <Briefcase className="w-12 h-12 text-white" /> },
];

export function Audience() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="bg-[#1875f0] rounded-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row gap-12 items-center"
        >
          {/* Left side — Title + Image */}
          <div className="lg:w-5/12 relative z-10 text-white">
            <p className="text-xl mb-3 font-medium opacity-90">Who Should Join?</p>
            <h2 className="text-4xl lg:text-5xl font-bold leading-[1.1] mb-8">
              Strategic Skill
              <br />
              Enhancement
            </h2>
            <div className="relative w-full max-w-[400px] h-[300px] mt-10 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
              <img
                src={accredianProfessionals}
                alt="Professionals"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side — 2x2 Grid */}
          <div className="lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 relative z-10 pl-0 lg:pl-10">
            {groups.map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: easeOut }}
              >
                <div className="mb-5">{g.icon}</div>
                <h3 className="text-white text-2xl font-bold mb-3">{g.t}</h3>
                <p className="text-blue-100 text-[15px] leading-relaxed font-medium">{g.d}</p>
              </motion.div>
            ))}
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/3 -translate-x-1/3 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
