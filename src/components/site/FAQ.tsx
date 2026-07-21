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
    <section id="faq" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
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
            <div className="mt-10 flex flex-col gap-1">
              {groups.map((g, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setTab(i);
                    setOpen(0);
                  }}
                  className={`relative rounded-lg px-3 py-2.5 text-left text-[14px] transition-colors ${
                    tab === i
                      ? "bg-surface-1 text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="font-mono text-[11px] text-muted-foreground">0{i + 1}</span>
                  <span className="ml-3">{g.title}</span>
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
            <div className="divide-y divide-border rounded-2xl border border-border bg-background">
              {groups[tab].items.map((it, i) => {
                const isOpen = open === i;
                return (
                  <div key={i}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className={`flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors md:px-8 md:py-6 ${
                        isOpen ? "bg-surface-1" : "hover:bg-surface-1/60"
                      }`}
                    >
                      <span className="text-[15.5px] font-medium tracking-[-0.01em] md:text-[17px]">
                        {it.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.4, ease: easeOut }}
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border bg-background text-muted-foreground"
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
                          <div className="px-6 pb-6 pr-16 text-[14.5px] leading-relaxed text-muted-foreground md:px-8 md:pb-7">
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
