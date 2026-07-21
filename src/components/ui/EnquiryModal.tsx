import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, CheckCircle2 } from "lucide-react";
import { useEnquiryModal } from "@/hooks/useEnquiryModal";

export function EnquiryModal() {
  const { isOpen, closeModal } = useEnquiryModal();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    phone: "",
    orgSize: "1-10",
    message: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeModal]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Work email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s\-]{8,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          fullName: "",
          email: "",
          companyName: "",
          phone: "",
          orgSize: "1-10",
          message: "",
        });
        closeModal();
      }, 2500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-2xl md:p-8"
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-surface-1 hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <X className="h-5 w-5" />
            </button>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="h-8 w-8 animate-bounce" />
                </div>
                <h3 className="mt-4 text-[22px] font-semibold text-foreground">Enquiry Submitted!</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                  Thank you for reaching out. An Accredian learning consultant will get in touch with you shortly.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="text-left">
                  <h2 id="modal-title" className="text-[24px] font-semibold tracking-tight text-foreground">
                    Enquire Now
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Learn how Accredian can customize high-impact training for your team.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
                  {/* Full name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      disabled={isLoading}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`mt-1.5 w-full rounded-lg border bg-surface-1 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:bg-background ${
                        errors.fullName ? "border-destructive" : "border-border"
                      }`}
                      placeholder="Jane Doe"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Work Email & Phone row */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Work Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        disabled={isLoading}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`mt-1.5 w-full rounded-lg border bg-surface-1 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:bg-background ${
                          errors.email ? "border-destructive" : "border-border"
                        }`}
                        placeholder="jane@company.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        disabled={isLoading}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`mt-1.5 w-full rounded-lg border bg-surface-1 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:bg-background ${
                          errors.phone ? "border-destructive" : "border-border"
                        }`}
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Company & Org Size */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="companyName" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        disabled={isLoading}
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className={`mt-1.5 w-full rounded-lg border bg-surface-1 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:bg-background ${
                          errors.companyName ? "border-destructive" : "border-border"
                        }`}
                        placeholder="Acme Corp"
                      />
                      {errors.companyName && (
                        <p className="mt-1 text-xs text-destructive">{errors.companyName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="orgSize" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Organization Size
                      </label>
                      <select
                        id="orgSize"
                        disabled={isLoading}
                        value={formData.orgSize}
                        onChange={(e) => setFormData({ ...formData, orgSize: e.target.value })}
                        className="mt-1.5 w-full rounded-lg border border-border bg-surface-1 px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:bg-background"
                      >
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-1000">201-1,000 employees</option>
                        <option value="1000+">1,000+ employees</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Message / Special Requirements
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      disabled={isLoading}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-border bg-surface-1 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:bg-background resize-none"
                      placeholder="Tell us more about your team's training requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary/95 hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        Submit Request
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
