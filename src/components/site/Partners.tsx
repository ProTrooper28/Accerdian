import { motion } from "motion/react";
import { easeOut } from "./util";

/* 
 * Partner logos rendered as styled text with official brand colors.
 * Ready to be replaced with official <img> logos when available.
 */

function RelianceLogo() {
  return (
    <span className="text-2xl font-serif font-bold text-gray-800 leading-tight text-center">
      Reliance<br />
      <span className="text-sm font-sans font-normal">Industries Limited</span>
    </span>
  );
}

function HCLLogo() {
  return <span className="text-4xl font-extrabold text-[#005587] italic tracking-tight">HCL</span>;
}

function IBMLogo() {
  return <span className="text-4xl font-bold text-[#0f62fe] border-y-4 border-[#0f62fe] leading-tight">IBM</span>;
}

function CRIFLogo() {
  return (
    <span className="text-4xl font-bold text-[#f26522] italic relative">
      <span className="absolute -left-6 top-1 text-2xl">⚡</span>
      CRIF
    </span>
  );
}

function ADPLogo() {
  return <span className="text-4xl font-bold text-[#d0271d] font-serif tracking-tighter">ADP</span>;
}

function BayerLogo() {
  return (
    <span className="w-16 h-16 rounded-full border-[3px] border-[#00a3e0] flex items-center justify-center text-[#00a3e0] font-bold leading-none text-center text-sm shrink-0">
      BAY<br />ER
    </span>
  );
}

const logos = [
  { key: "reliance", el: <RelianceLogo /> },
  { key: "hcl", el: <HCLLogo /> },
  { key: "ibm", el: <IBMLogo /> },
  { key: "crif", el: <CRIFLogo /> },
  { key: "adp", el: <ADPLogo /> },
  { key: "bayer", el: <BayerLogo /> },
];

export function Partners() {
  return (
    <section id="clients" className="py-20 border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="text-[2.5rem] font-bold text-[#1a202c] mb-3"
        >
          Our Proven <span className="text-[#3182ce]">Partnerships</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7, ease: easeOut }}
          className="text-[1.3rem] text-[#4a5568] mb-16 font-medium"
        >
          Successful Collaborations With the <span className="text-[#3182ce]">Industry's Best</span>
        </motion.p>

        <div className="relative w-full max-w-5xl mx-auto overflow-hidden py-4">
          {/* Edge fades */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Marquee */}
          <div className="animate-marquee flex gap-24 items-center justify-start opacity-90 pr-24 hover:[animation-play-state:paused]">
            {/* First set */}
            {logos.map((l) => (
              <div key={l.key} className="shrink-0 flex items-center">
                {l.el}
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {logos.map((l) => (
              <div key={`${l.key}-dup`} className="shrink-0 flex items-center">
                {l.el}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
