import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeading, easeOut } from "./util";

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

  return (
    <section
      id="testimonials"
      className="relative border-y border-border bg-surface-1 py-28 md:py-36"
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
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="relative mx-auto mt-16 max-w-4xl"
        >
          <svg
            className="mx-auto mb-6 h-8 w-8 text-primary/40"
            viewBox="0 0 32 32"
            fill="currentColor"
            aria-hidden
          >
            <path d="M9 8c-3 0-6 2-6 6 0 4 3 6 6 6-1 3-3 4-5 4v2c5 0 9-3 9-9V8H9zm14 0c-3 0-6 2-6 6 0 4 3 6 6 6-1 3-3 4-5 4v2c5 0 9-3 9-9V8h-4z" />
          </svg>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="text-balance text-center text-[22px] font-medium leading-[1.35] tracking-[-0.015em] md:text-[30px]"
            >
              "{items[i].q}"
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-10 flex flex-col items-center gap-1">
            <div className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-[13px] font-medium">
              {items[i].company[0]}
            </div>
            <div className="mt-2 text-[14px] font-medium">{items[i].company}</div>
            <div className="text-[12.5px] text-muted-foreground">{items[i].author}</div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-1 rounded-full transition-all duration-500 ${
                  idx === i ? "w-8 bg-foreground" : "w-4 bg-border hover:bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
