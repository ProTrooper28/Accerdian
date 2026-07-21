import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring } from "motion/react";

const links = [
  { label: "Solutions", href: "#edge" },
  { label: "Domains", href: "#domains" },
  { label: "Framework", href: "#framework" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

const sectionIds = links.map((l) => l.href.replace("#", ""));

function MagneticButton({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className: string;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * 0.15);
      y.set((e.clientY - cy) * 0.15);
    },
    [x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.a>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Set<string>();

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visibleSections.add(id);
          } else {
            visibleSections.delete(id);
          }
          // Pick the first visible section in document order
          const firstVisible = sectionIds.find((s) => visibleSections.has(s));
          setActiveSection(firstVisible || "");
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-primary/60 via-primary to-primary/60"
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
          scrolled ? "py-1.5" : "py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div
            className={`flex items-center justify-between rounded-full transition-all duration-500 ease-out ${
              scrolled
                ? "border border-border/40 bg-background/60 px-5 py-2 shadow-[0_1px_1px_rgba(15,23,42,0.02),0_4px_16px_rgba(15,23,42,0.04),0_16px_48px_rgba(15,23,42,0.04)] backdrop-blur-2xl backdrop-saturate-[1.3]"
                : "border border-transparent px-5 py-2.5"
            }`}
          >
            {/* Logo */}
            <a href="#top" className="flex items-center gap-2">
              <span
                className={`grid place-items-center rounded-lg bg-foreground font-semibold text-background transition-all duration-500 ${
                  scrolled ? "h-6 w-6 text-[11px]" : "h-7 w-7 text-[13px]"
                }`}
              >
                A
              </span>
              <span
                className={`font-medium tracking-tight transition-all duration-500 ${
                  scrolled ? "text-[14px]" : "text-[15px]"
                }`}
              >
                Accredian <span className="text-muted-foreground">Enterprise</span>
              </span>
            </a>

            {/* Navigation links with active indicator */}
            <nav className="hidden items-center gap-0.5 md:flex">
              {links.map((l) => {
                const sectionId = l.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    className={`group relative rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-200 ${
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active-underline"
                        className="absolute inset-x-3.5 -bottom-0.5 h-px bg-foreground"
                        transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.8 }}
                      />
                    ) : (
                      <span className="pointer-events-none absolute inset-x-3.5 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* CTA area */}
            <div className="flex items-center gap-2.5">
              <a
                href="#contact"
                className={`hidden text-muted-foreground transition-all duration-300 hover:text-foreground sm:inline-block ${
                  scrolled ? "text-[12.5px]" : "text-[13.5px]"
                }`}
              >
                Sign in
              </a>
              <MagneticButton
                href="#contact"
                className={`group inline-flex items-center gap-1.5 rounded-full bg-foreground font-medium text-background transition-all duration-300 hover:bg-foreground/90 hover:shadow-[0_4px_16px_-4px_rgba(15,23,42,0.3)] ${
                  scrolled ? "px-3.5 py-1.5 text-[12.5px]" : "px-4 py-1.5 text-[13.5px]"
                }`}
              >
                Enquire
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
