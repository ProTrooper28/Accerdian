import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeading, easeOut } from "./util";
import { ChevronLeft, ChevronRight } from "lucide-react";

const items = [
  {
    q: "We would like to thank Accredian for the wonderful support and the beautiful journey. The team turned our vision into reality with unparalleled dedication, service, and expertise throughout the entire process.",
    author: "Learning & Development",
    company: "ADP",
  },
  {
    q: "Accredian's commitment to excellence is unmatched. They consistently go the extra mile to ensure our needs are met and exceeded, providing reliable support and high‑quality service every step of the way.",
    author: "Talent Operations",
    company: "Bayer",
  },
  {
    q: "Choosing Accredian for the learning & development of our employees was a beneficial decision. The value derived from the course is immense and their support team is always there to help.",
    author: "People & Culture",
    company: "Reliance",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((x) => (x + 1) % items.length), 5500);
    return () => clearInterval(id);
  }, [paused]);

  const handlePrev = () => {
    setI((x) => (x - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setI((x) => (x + 1) % items.length);
  };

  return (
    <section
      id="testimonials"
      className="relative py-24 bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title={
            <>
              What our clients <span className="text-muted-foreground">are saying.</span>
            </>
          }
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="relative mx-auto mt-16 max-w-4xl bg-gradient-to-br from-[#1875f0] to-[#3182ce] rounded-3xl p-10 md:p-16 text-white shadow-xl"
        >
          {/* Decorative quote icon */}
          <div className="absolute top-8 left-8 text-white/10 pointer-events-none">
            <svg
              className="h-20 w-20 fill-current"
              viewBox="0 0 32 32"
              aria-hidden
            >
              <path d="M9 8c-3 0-6 2-6 6 0 4 3 6 6 6-1 3-3 4-5 4v2c5 0 9-3 9-9V8H9zm14 0c-3 0-6 2-6 6 0 4 3 6 6 6-1 3-3 4-5 4v2c5 0 9-3 9-9V8h-4z" />
            </svg>
          </div>

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.7, ease: easeOut }}
                className="text-balance text-center text-[1.4rem] md:text-[1.7rem] font-medium leading-[1.4] tracking-[-0.015em]"
              >
                "{items[i].q}"
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-10 flex flex-col items-center gap-1 border-t border-white/10 pt-8">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-white/10 border border-white/10 text-[15px] font-bold text-white shadow-sm">
                {items[i].company[0]}
              </div>
              <div className="mt-3 text-[16px] font-bold tracking-wide">{items[i].company}</div>
              <div className="text-[14px] text-blue-100 font-medium">{items[i].author}</div>
            </div>

            {/* Navigation arrows */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-white outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setI(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      idx === i ? "w-8 bg-white" : "w-3 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-white outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
