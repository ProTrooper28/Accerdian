import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

const links = [
  { label: "Solutions", href: "#edge" },
  { label: "Domains", href: "#domains" },
  { label: "Framework", href: "#framework" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-primary/80"
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div
            className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
              scrolled
                ? "border border-border/60 bg-background/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl"
                : "border border-transparent"
            }`}
          >
            <a href="#top" className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-foreground text-[13px] font-semibold text-background">
                A
              </span>
              <span className="text-[15px] font-medium tracking-tight">
                Accredian <span className="text-muted-foreground">Enterprise</span>
              </span>
            </a>

            <nav className="hidden items-center gap-1 md:flex">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="group relative rounded-full px-3.5 py-1.5 text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                  <span className="pointer-events-none absolute inset-x-3.5 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/70 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="hidden text-[13.5px] text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
              >
                Sign in
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-[13.5px] font-medium text-background transition-all duration-300 hover:bg-foreground/90"
              >
                Enquire
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
