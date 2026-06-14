import React, { useState } from "react";
import { Mail, Send, Sparkles, MessageSquare, Heart } from "lucide-react";

interface FooterProps {
  darkMode: boolean;
  onShowMessage: (text: string) => void;
}

export default function Footer({ darkMode, onShowMessage }: FooterProps) {
  // Newsletter local state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  // Lead form local states
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadMessage, setLeadMessage] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShowMessage(`Subscribed welcome alerts for ${newsletterEmail}! Thank you for uncapping the revolution.`);
    setNewsletterEmail("");
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShowMessage(`Thank you, ${leadName}! Your inquiry file has been queued. Our head apothecary will reply back to ${leadEmail} in 2-4 hours.`);
    setLeadName("");
    setLeadEmail("");
    setLeadMessage("");
  };

  return (
    <footer 
      id="footer-section" 
      className={`relative pt-24 pb-12 overflow-hidden border-t ${
        darkMode ? "bg-zinc-950 border-white/5 text-zinc-400" : "bg-zinc-100 border-zinc-200 text-zinc-650"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 select-none">
        
        {/* TOP LEVEL: SOCIAL, CONTACT FORM, SITEMAP LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-zinc-800/20">
          
          {/* COL 1: ADVANCED CONTACT LEAD FORM (Lg 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-brand-primary-light font-bold uppercase tracking-widest block">
                Direct Dispatch Communication
              </span>
              <h3 className={`font-display font-black text-2xl uppercase tracking-tight ${
                darkMode ? "text-white" : "text-zinc-950"
              }`}>
                Connect With Apothecary
              </h3>
              <p className="text-xs leading-relaxed max-w-sm">
                Have a commercial distribution inquiry, sponsorship request, or simply want to share your recipe ideas? Drop us a lines directly.
              </p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-3.5 max-w-sm">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className={`px-3.5 py-3 rounded-lg border text-xs outline-none transition-all ${
                    darkMode 
                      ? "bg-zinc-900 border-zinc-800 text-white focus:border-brand-primary" 
                      : "bg-white border-zinc-300 focus:border-brand-primary text-zinc-950"
                  }`}
                />
                <input
                  type="email"
                  placeholder="Your Email Address"
                  required
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  className={`px-3.5 py-3 rounded-lg border text-xs outline-none transition-all ${
                    darkMode 
                      ? "bg-zinc-900 border-zinc-800 text-white focus:border-brand-primary" 
                      : "bg-white border-zinc-300 focus:border-brand-primary text-zinc-950"
                  }`}
                />
              </div>
              <textarea
                rows={3}
                placeholder="Message, event, or channel reference..."
                required
                value={leadMessage}
                onChange={(e) => setLeadMessage(e.target.value)}
                className={`w-full px-3.5 py-3 rounded-lg border text-xs outline-none transition-all resize-none ${
                  darkMode 
                    ? "bg-zinc-900 border-zinc-800 text-white focus:border-brand-primary" 
                    : "bg-white border-zinc-300 focus:border-brand-primary text-zinc-950"
                }`}
              />
              <button
                type="submit"
                className="w-full py-3 bg-brand-primary hover:bg-brand-primary-light text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 shadow"
              >
                <MessageSquare size={13} /> Dispatch Inquiry
              </button>
            </form>
          </div>

          {/* COL 2: NEWSLETTER AND BRAND BIO (Lg 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              <span className={`font-display font-black text-2xl tracking-tight italic uppercase block ${
                darkMode ? "text-white" : "text-zinc-950"
              }`}>
                Dr. <span className="text-brand-primary-light">Paper</span>
              </span>
              <p className="text-xs leading-relaxed max-w-xs">
                Dr. Paper is a registered trademark of the Paper Beverage Apothecary Corp. Formulated and micro-brewed dynamically with sustained botanical coffee extracts in carbon-neutral facilities.
              </p>
            </div>

            {/* Newsletter form */}
            <div className="space-y-3">
              <span className="font-mono text-[9px] uppercase tracking-widest block font-bold text-zinc-550">
                Join our newsletter list:
              </span>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-xs">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className={`flex-grow px-3 py-2.5 rounded-lg border text-xs outline-none transition-all ${
                    darkMode 
                      ? "bg-zinc-900 border-zinc-800 text-white focus:border-brand-primary" 
                      : "bg-white border-zinc-300 focus:border-brand-primary"
                  }`}
                />
                <button
                  type="submit"
                  className="px-3 bg-zinc-805 hover:bg-zinc-800 text-brand-primary-light hover:text-white rounded-lg transition-all border border-zinc-805 outline-none cursor-pointer"
                  title="Subscribe"
                >
                  <Send size={12} />
                </button>
              </form>
            </div>
          </div>

          {/* COL 3: SITEMAP & RESOURCES LINKS (Lg 3) */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <h5 className={`font-mono text-[10px] uppercase font-black tracking-widest ${
                darkMode ? "text-white" : "text-zinc-950"
              }`}>
                Formulations
              </h5>
              <ul className="space-y-2 text-xs">
                <li><a href="#flavors" className="hover:text-brand-primary-light transition-colors">Classic Crimson</a></li>
                <li><a href="#flavors" className="hover:text-brand-primary-light transition-colors">Cherry Blast</a></li>
                <li><a href="#flavors" className="hover:text-brand-primary-light transition-colors">Vanilla Rush</a></li>
                <li><a href="#flavors" className="hover:text-brand-primary-light transition-colors">Zero Sugar</a></li>
                <li><a href="#flavors" className="hover:text-brand-primary-light transition-colors">Tropical Sunset</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className={`font-mono text-[10px] uppercase font-black tracking-widest ${
                darkMode ? "text-white" : "text-zinc-955"
              }`}>
                Resources
              </h5>
              <ul className="space-y-2 text-xs">
                <li><a href="#experience" className="hover:text-brand-primary-light transition-colors">Hotspot Story</a></li>
                <li><a href="#story" className="hover:text-brand-primary-light transition-colors">Origins Labs</a></li>
                <li><a href="#benefits" className="hover:text-brand-primary-light transition-colors">Active Botanicals</a></li>
                <li><a href="#faq" className="hover:text-brand-primary-light transition-colors">FAQ accordion</a></li>
                <li><a href="mailto:advocates@drpaper.soda" className="hover:text-brand-primary-light transition-colors">Sponsorships</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: COPYRIGHT & TRADEMARKS DISCLOSURES */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-[10px] font-mono">
          <div className="space-y-1">
            <p>© 2026 Dr. Paper Beverage Co. All rights reserved globally.</p>
            <p className="text-zinc-650 text-[9px]">Statements regarding botanical supplements have not been evaluated by the FDA. Products not intended to diagnose any condition.</p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Canning Disclosures</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
