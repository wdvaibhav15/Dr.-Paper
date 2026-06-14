import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Flame, CheckCircle, Mail } from "lucide-react";

interface LeadPopupProps {
  darkMode: boolean;
  onShowMessage: (text: string) => void;
}

export default function LeadPopup({ darkMode, onShowMessage }: LeadPopupProps) {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  // Monitor mouseleave on document to trigger exit-intent popup
  useEffect(() => {
    // Check local storage so we don't annoy the user multiple times if they close it
    const dismissed = localStorage.getItem("drpaper_exit_popup_dismissed");
    if (dismissed === "true") {
      setHasDismissed(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // If cursor leaves the top boundary of the viewport
      if (e.clientY < 5 && !hasDismissed) {
        setShowExitPopup(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasDismissed]);

  const handleDismiss = () => {
    setShowExitPopup(false);
    setHasDismissed(true);
    localStorage.setItem("drpaper_exit_popup_dismissed", "true");
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    onShowMessage("Welcome to the Vanguard! Promo Code UNLEASH15 has been generated for your order.");
    
    // Auto close after 3 seconds
    setTimeout(() => {
      handleDismiss();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {showExitPopup && (
        <div 
          id="exit-intent-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-sm"
        >
          {/* Animated Modal body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className={`w-full max-w-lg rounded-[2rem] border overflow-hidden relative p-8 md:p-10 select-none ${
              darkMode 
                ? "bg-zinc-950 border-purple-500/25 shadow-2xl text-white" 
                : "bg-white border-purple-500/20 shadow-2xl text-zinc-950"
            }`}
          >
            {/* Background glowing particles decoration */}
            <div className="absolute inset-0 bg-brand-primary-light/5 pointer-events-none rounded-[2rem] blur-xl" />

            {/* Header with Exit Cross */}
            <div className="flex justify-between items-start relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20">
                <Flame size={10} className="animate-pulse" /> exclusive visitor offer
              </span>
              <button
                id="close-exit-popup"
                onClick={handleDismiss}
                className={`p-2 rounded-full border outline-none ${
                  darkMode ? "hover:bg-zinc-90 w-fit hover:text-white border-zinc-805 text-zinc-400" : "hover:bg-zinc-100 text-zinc-600 border-zinc-200"
                }`}
                title="Dismiss offer"
              >
                <X size={14} />
              </button>
            </div>

            {/* Content center */}
            <div className="my-6 space-y-4 relative z-10">
              {!submitted ? (
                <>
                  <h3 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight leading-none">
                    Wait! Uncap <br />
                    <span className="text-brand-primary-light">15% off</span> your first order
                  </h3>
                  <p className={`text-xs md:text-sm leading-relaxed ${
                    darkMode ? "text-zinc-400" : "text-zinc-650"
                  }`}>
                    Join Dr. Paper's inner circle advocacy list today. Get direct alerts on limited flavor drops, member-only gaming cases, and immediate 15% off coupon files instantly!
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-3 pt-2">
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                      <input
                        type="email"
                        placeholder="Enter your email handles here..."
                        required
                        className={`w-full pl-10 pr-4 py-3.5 rounded-xl border text-xs outline-none transition-all ${
                          darkMode 
                            ? "bg-zinc-900 border-zinc-800 text-white focus:border-brand-primary" 
                            : "bg-zinc-50 border-zinc-300 focus:border-brand-primary"
                        }`}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-brand-primary hover:bg-brand-primary-light text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-[0.98] cursor-pointer block"
                    >
                      Retrieve Promo Code
                    </button>
                  </form>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20">
                    <CheckCircle size={32} />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-xl uppercase text-emerald-500">
                      Vanguard Welcome Code
                    </h4>
                    <span className="font-mono text-2xl font-black bg-zinc-900/60 text-amber-500 block p-3.5 mt-3 border border-dashed border-zinc-700 tracking-wider select-text rounded-xl uppercase">
                      UNLEASH15
                    </span>
                    <p className="text-[10px] text-zinc-500 mt-2 font-mono">
                      Copy the promo code and insert during case checks out.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer trust check */}
            <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest text-center border-t border-zinc-800/20 pt-4 relative z-10 flex justify-center gap-4">
              <span>🔒 Zero artificial junk</span>
              <span>•</span>
              <span>📩 Opt-out in one-click</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
