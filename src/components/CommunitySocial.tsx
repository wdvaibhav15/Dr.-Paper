import { useState } from "react";
import { Instagram, Youtube, Twitter, Share2, Sparkles, Check, Send } from "lucide-react";

interface CommunitySocialProps {
  darkMode: boolean;
  onShowMessage: (text: string) => void;
}

export default function CommunitySocial({ darkMode, onShowMessage }: CommunitySocialProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const stats = [
    { label: "TikTok Views", value: "85.4M+" },
    { label: "Instagram Followers", value: "240K+" },
    { label: "YouTube Subscribers", value: "115K+" },
    { label: "Active Hashtags", value: "#DrPaper" }
  ];

  const handleShareClick = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      onShowMessage("Copied share referral link to clipboard! Let's spread the flavor revolution.");
      setTimeout(() => setCopiedLink(false), 2500);
    } else {
      // fallback
      onShowMessage("Reference link: drpaper.soda - Copied!");
    }
  };

  return (
    <section 
      id="community" 
      className={`relative py-24 md:py-32 overflow-hidden ${
        darkMode ? "bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-955"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-zinc-800 pb-12 mb-16">
          <div className="lg:col-span-8 space-y-4">
            <span className="font-mono text-xs font-bold text-brand-primary-light uppercase tracking-widest block font-light">
              Join the Alliance
            </span>
            <span className="font-display font-black text-4xl md:text-6xl tracking-tight uppercase block leading-none">
              Welcome To The <br />
              <span className="text-brand-primary-light">Paper Alliance</span>
            </span>
            <p className={`text-base max-w-xl ${
              darkMode ? "text-zinc-400" : "text-zinc-650"
            }`}>
              Our fans don't just consume; they create. Show us your gaming rigs, study hacks, skateboard lines, or recipe custom mixes with the tag <span className="font-bold text-brand-primary-light font-mono">#DrPaperRevolution</span>.
            </p>
          </div>

          {/* Social icons follow links */}
          <div className="lg:col-span-4 flex flex-wrap gap-4 items-center sm:justify-end">
            <button
              id="share-link-btn"
              onClick={handleShareClick}
              className={`px-5 py-3 rounded-xl border flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 ${
                darkMode 
                  ? "border-zinc-805 bg-zinc-900 text-zinc-300 hover:bg-zinc-800" 
                  : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 shadow-sm"
              }`}
            >
              {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
              {copiedLink ? "Link Copied!" : "Share referral link"}
            </button>

            <button
              id="social-tiktok-btn"
              className="px-5 py-3 rounded-xl bg-brand-primary hover:bg-brand-primary-light text-white text-xs font-mono font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              onClick={() => onShowMessage("Following @DrPaperSoda on TikTok!")}
            >
              <Send size={12} /> Follow handle
            </button>
          </div>
        </div>

        {/* METRICS / STATS BAR */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((m) => (
            <div 
              key={m.label}
              className={`p-6 rounded-2xl border text-center space-y-1 select-none ${
                darkMode ? "bg-zinc-900/40 border-zinc-830" : "bg-white border-zinc-200/60 shadow-sm"
              }`}
            >
              <h5 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest leading-none">
                {m.label}
              </h5>
              <span className="font-display font-black text-3xl md:text-4xl text-brand-primary-light uppercase tracking-tight block">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* PROMPT CALLOUT CARD FOR JOINING COMMUNITY */}
        <div className={`p-8 md:p-12 rounded-[2rem] border overflow-hidden relative ${
          darkMode 
            ? "bg-gradient-to-tr from-zinc-950 via-zinc-90 w-full border-zinc-800" 
            : "bg-gradient-to-tr from-zinc-100 via-zinc-50 w-full border-zinc-200"
        }`}>
          <div className="absolute inset-0 bg-brand-primary-light/5 blur-3xl rounded-full pointer-events-none" />
          
          <div className="max-w-xl space-y-6 relative z-10 select-none">
            <span className="font-mono text-[10px] text-brand-primary-light font-bold uppercase tracking-wider block">
              Free Monthly Loot Case
            </span>
            <h3 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight leading-none text-white">
              Sponsor your stream or local club?
            </h3>
            <p className={`text-sm ${
              darkMode ? "text-zinc-400" : "text-zinc-600"
            }`}>
              We support competitive streamers, grassroots Esports clubs, active mountain bouldering gyms, and collegiate research clubs. Apply to our brand advocates registry and receive two free cases of Dr. Paper monthly.
            </p>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                onShowMessage("Thank you for applying to the Paper Advocacy Guild! Our brand community team will review your channels and follow up within 48 hours.");
                (e.target as HTMLFormElement).reset();
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md"
            >
              <input
                type="text"
                placeholder="Your Instagram, Twitch, or Club name..."
                required
                className={`flex-grow px-4 py-3 rounded-xl border text-xs outline-none transition-all ${
                  darkMode 
                    ? "bg-zinc-900 border-zinc-800 text-white focus:border-brand-primary" 
                    : "bg-white border-zinc-300 focus:border-brand-primary"
                }`}
              />
              <button
                type="submit"
                className="px-6 py-3 bg-brand-primary hover:bg-brand-primary-light text-white text-xs font-bold uppercase rounded-xl tracking-wider transition-all cursor-pointer active:scale-95"
              >
                Apply to Guild
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
