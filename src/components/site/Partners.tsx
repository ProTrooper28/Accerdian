import { motion } from "motion/react";
import { SectionHeading, easeOut } from "./util";

const partners = ["Reliance", "HCL", "IBM", "CRIF", "ADP", "Bayer", "Deloitte", "Cognizant"];

function Logo({ name }: { name: string }) {
  return (
    <div className="flex h-10 shrink-0 items-center px-8 text-[18px] font-medium tracking-tight text-muted-foreground/80 grayscale transition-all duration-300 hover:text-foreground hover:grayscale-0">
      {name}
    </div>
  );
}

export function Partners() {
  return (
    <section className="relative py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          align="center"
          eyebrow="Our Proven Partnerships"
          title={<>Successful collaborations with the industry's best.</>}
        />

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        >
          <div className="flex w-max animate-marquee">
            {[...partners, ...partners].map((p, i) => (
              <Logo key={i} name={p} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
