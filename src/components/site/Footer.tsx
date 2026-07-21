import { motion } from "motion/react";

const cols = [
  { t: "Solutions", links: ["Leadership", "Tech & Data", "Gen‑AI", "Fintech", "Product"] },
  { t: "Company", links: ["About", "Careers", "Success Stories", "Contact"] },
  { t: "Resources", links: ["Blog", "Case Studies", "Reports", "Guides"] },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0A0B0F] text-white/80">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="pointer-events-none absolute -left-40 top-0 h-72 w-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(80,120,255,0.18),transparent)] blur-2xl" />

      <div className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 gap-10 md:grid-cols-12"
        >
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-[13px] font-semibold text-black">
                A
              </span>
              <span className="text-[15px] font-medium tracking-tight">
                Accredian <span className="text-white/50">Enterprise</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-white/55">
              Next‑gen expertise for enterprise teams. Purpose‑built learning that compounds.
            </p>

            <div className="mt-8 flex items-center gap-2">
              {["X", "in", "GH", "IG"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-[11px] text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.t} className="col-span-1 md:col-span-2">
              <div className="text-[11px] uppercase tracking-[0.16em] text-white/40">{c.t}</div>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="group inline-flex items-center gap-1 text-[13.5px] text-white/70 transition-colors hover:text-white"
                    >
                      {l}
                      <span className="translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.16em] text-white/40">Contact</div>
            <div className="mt-5 text-[13.5px] leading-relaxed text-white/70">
              enterprise@accredian.com
              <br />
              +91 · Mon–Fri
            </div>
          </div>
        </motion.div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-[12.5px] text-white/50 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Accredian. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
