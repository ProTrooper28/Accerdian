import { motion } from "motion/react";
import { useEnquiryModal } from "@/hooks/useEnquiryModal";
import { RippleButton } from "./util";

export function CTA() {
  const { openModal } = useEnquiryModal();

  const handleExpertScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("framework");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-gray-100 bg-[#f4faff] px-8 py-14 text-center md:px-16 md:py-20 shadow-sm"
        >
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(50%_60%_at_50%_0%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_70%)]" />
            <svg
              className="absolute inset-0 h-full w-full opacity-35"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="#3182ce" className="opacity-20" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#2d3748] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#38a169]" />
            Ready when you are
          </div>
          <h2 className="mt-6 text-balance text-[32px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.1] tracking-[-0.03em] text-gray-900">
            Want to learn more about
            <br />
            <span className="text-[#3182ce]">our training solutions?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15.5px] leading-relaxed text-[#4a5568] font-medium">
            Get expert guidance for your team's success. A learning partner will reach out within 24
            hours.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <RippleButton
              onClick={() => openModal()}
              className="group inline-flex items-center gap-2 rounded-xl bg-[#3182ce] px-8 py-3.5 text-[16px] font-semibold text-white shadow-[0_4px_20px_rgba(49,130,206,0.35)] hover:bg-[#2b6cb0] hover:shadow-[0_8px_28px_rgba(49,130,206,0.45)] outline-none"
            >
              Enquire Now
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </RippleButton>
            <RippleButton
              onClick={handleExpertScroll}
              rippleColor="rgba(0, 0, 0, 0.05)"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-3.5 text-[16px] font-semibold text-[#4a5568] hover:border-gray-300 hover:text-gray-900 transition-all outline-none"
            >
              Talk to an expert
            </RippleButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
