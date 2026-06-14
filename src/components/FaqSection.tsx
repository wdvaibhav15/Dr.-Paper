import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, MessageSquare, HelpCircle } from "lucide-react";
import { FAQS } from "../data";

interface FaqSectionProps {
  darkMode: boolean;
}

export default function FaqSection({ darkMode }: FaqSectionProps) {
  const [openFaq, setOpenFaq] = useState<string | null>("faq1"); // default leave first one open

  const handleToggle = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section 
      id="faq" 
      className={`relative py-24 md:py-32 overflow-hidden ${
        darkMode ? "bg-zinc-950 text-white" : "bg-white text-zinc-956"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10 select-none">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-brand-primary-light bg-brand-primary-light/10 border border-brand-primary-light/20">
            <HelpCircle size={13} /> Resolution Center
          </div>
          <h2 className="font-display font-black text-4xl md:text-5.5xl leading-none uppercase tracking-tight">
            Frequently Asked <span className="text-brand-primary-light">Questions</span>
          </h2>
          <p className={`text-sm md:text-base ${
            darkMode ? "text-zinc-400" : "text-zinc-650"
          }`}>
            Everything you need to know about our secret botanical ingredients, direct delivery schedules, metabolic absorption, and the infinite metal loop cycle.
          </p>
        </div>

        {/* ACCORDION WRAPPER */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openFaq === faq.id;

            return (
              <div
                key={faq.id}
                id={`faq-accordion-item-${faq.id}`}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? darkMode
                      ? "bg-zinc-900 border-zinc-800 shadow-lg"
                      : "bg-zinc-50 border-zinc-200"
                    : darkMode
                      ? "glassmorphism hover:border-zinc-805"
                      : "bg-white border-zinc-200/65 hover:shadow hover:bg-zinc-50/50"
                }`}
              >
                {/* ACCORDION HEADER (Trigger Button) */}
                <button
                  id={`faq-trigger-${faq.id}`}
                  onClick={() => handleToggle(faq.id)}
                  className="w-full text-left px-6 py-5 md:py-6 flex justify-between items-center gap-4 outline-none cursor-pointer"
                >
                  <span className="font-display font-black text-base md:text-lg uppercase tracking-tight">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full transition-all border outline-none ${
                    isOpen 
                      ? "bg-brand-primary border-brand-primary text-white rotate-185" 
                      : darkMode 
                        ? "border-zinc-800 text-zinc-400" 
                        : "border-zinc-200 text-zinc-700"
                  }`}>
                    <ChevronDown size={14} className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
                  </div>
                </button>

                {/* ACCORDION ANSWER (Framer Motion Height Slide) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className={`px-6 pb-6 pt-1 text-xs md:text-sm leading-relaxed ${
                        darkMode ? "text-zinc-400 border-t border-zinc-800" : "text-zinc-650 border-t border-zinc-205"
                      }`}>
                        <p className="font-sans whitespace-pre-line leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Dynamic Fallback Support block */}
        <div className={`mt-12 p-6 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left ${
          darkMode ? "bg-zinc-900/40 border-zinc-850" : "bg-zinc-100 border-zinc-195"
        }`}>
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <div className="p-3 rounded-xl bg-zinc-800 text-brand-primary-light">
              <MessageSquare size={18} />
            </div>
            <div>
              <h5 className="font-display font-black text-sm uppercase tracking-tight">Still have queries?</h5>
              <p className="text-xs text-zinc-550 mt-0.5">Connect with our head apothecary and distribution support teams directly.</p>
            </div>
          </div>
          <button
            id="faq-helpdesk-trigger"
            onClick={() => window.location.href = "mailto:hello@drpaper.soda"}
            className="px-5 py-2.5 bg-brand-primary hover:bg-brand-primary-light text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md active:scale-95"
          >
            Email Helpdesk
          </button>
        </div>

      </div>
    </section>
  );
}
