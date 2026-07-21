import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SectionHeading, easeOut } from "./util";

const groups = [
  {
    title: "About the Course",
    items: [
      {
        q: "What types of corporate training programs does Accredian offer?",
        a: "Accredian provides industry‑specific, customizable training programs tailored to meet your organization's unique needs, covering domains like leadership, tech, data, and fintech.",
      },
      {
        q: "What domain specializations are available?",
        a: "We offer expertise in Leadership Development, Tech & Data, Fintech, Digital Business, Product Innovation, Operations Management, and Generative AI.",
      },
    ],
  },
  {
    title: "About the Delivery",
    items: [
      {
        q: "How are the programs delivered?",
        a: "Programs are delivered in cohort, in‑person, or hybrid formats — mapped to how your teams actually work.",
      },
      {
        q: "Can programs be customized to our team's context?",
        a: "Yes. Every engagement begins with a skill‑gap analysis and produces a tailored roadmap sequenced for compounding impact.",
      },
    ],
  },
  {
    title: "Miscellaneous",
    items: [
      {
        q: "How do you measure outcomes?",
        a: "Every cohort is measured against pre‑defined KPIs agreed upon during the discovery phase — not attendance or completion rate.",
      },
    ],
  },
];

export function FAQ() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="md:col-span-4"
          >
            <SectionHeading
              eyebrow="Frequently Asked"
              title={
                <>
                  Answers, before <span className="text-muted-foreground">you ask.</span>
                </>
              }
            />
            <div className="mt-10 flex flex-col gap-1.5">
              {groups.map((g, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setTab(i);
                    setOpen(0);
                  }}
                  className={`relative rounded-xl px-4 py-3 text-left text-[15px] font-semibold transition-colors ${
                    tab === i
                      ? "bg-slate-100/70 text-[#3182ce]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="font-mono text-[11px] text-muted-foreground mr-3">0{i + 1}</span>
                  <span>{g.title}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="md:col-span-8"
          >
            <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              {groups[tab].items.map((it, i) => {
                const isOpen = open === i;
                return (
                  <div key={i}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className={`flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors md:px-8 md:py-6 ${
                        isOpen ? "bg-slate-50/50" : "hover:bg-slate-50/30"
                      }`}
                    >
                      <span className="text-[16px] font-bold tracking-tight text-gray-900">
                        {it.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.4, ease: easeOut }}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gray-100 bg-white text-muted-foreground shadow-sm text-lg"
                      >
                        +
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="c"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: easeOut }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pr-16 text-[15px] leading-relaxed text-gray-600 md:px-8 md:pb-7">
                            {it.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
