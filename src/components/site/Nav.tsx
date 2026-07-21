import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEnquiryModal } from "@/hooks/useEnquiryModal";

const links = [
  { label: "Home", href: "#top" },
  { label: "Stats", href: "#stats" },
  { label: "Solutions", href: "#edge" },
  { label: "Domains", href: "#domains" },
  { label: "Framework", href: "#framework" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

const sectionIds = links.map((l) => l.href.replace("#", ""));

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openModal } = useEnquiryModal();

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
          const firstVisible = sectionIds.find((s) => visibleSections.has(s));
          setActiveSection(firstVisible || "top");
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Smooth scroll handler
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(targetId);
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-white border-b border-gray-100 ${
        scrolled ? "py-3 shadow-sm" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => handleScroll(e, "top")}
            className="flex-shrink-0 flex flex-col justify-center outline-none"
          >
            <span className="text-[#3182ce] font-bold text-3xl tracking-tight leading-none mb-1">
              accredian
            </span>
            <span className="text-gray-400 text-[10px] tracking-widest uppercase font-medium">
              credentials that matter
            </span>
          </a>

          {/* Navigation links */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8 items-center">
            {links.map((l) => {
              const sectionId = l.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleScroll(e, sectionId)}
                  className={`text-[15px] font-bold transition-colors outline-none ${
                    isActive
                      ? "text-[#3182ce] border-b-[3px] border-[#3182ce] pb-1"
                      : "text-[#1a202c] hover:text-[#3182ce]"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="text-[#1a202c] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-x-4 top-full mt-2 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {links.map((l) => {
                const sectionId = l.href.replace("#", "");
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => handleScroll(e, sectionId)}
                    className="rounded-lg px-3 py-2.5 text-[15px] font-bold text-[#1a202c] hover:bg-gray-50 hover:text-[#3182ce] transition-all"
                  >
                    {l.label}
                  </a>
                );
              })}
              <hr className="my-2 border-gray-100" />
              <button
                onClick={() => { setMobileMenuOpen(false); openModal(); }}
                className="w-full rounded-xl bg-[#3182ce] py-3 text-center text-[15px] font-semibold text-white shadow-md hover:bg-[#2b6cb0] transition-all"
              >
                Enquire Now
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
