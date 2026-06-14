import { motion } from "motion/react";
import { Star, ShieldCheck, Instagram, Play, Sparkles } from "lucide-react";
import { REVIEWS } from "../data";

interface SocialProofProps {
  darkMode: boolean;
}

export default function SocialProof({ darkMode }: SocialProofProps) {
  // UGC Image configs
  const ugcStories = [
    {
      id: "ugc1",
      url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400",
      alt: "Pro esports setup with Dr. Paper can",
      likes: "12.4K",
      author: "@gamer_pulse",
      tag: "Cherry Blast"
    },
    {
      id: "ugc2",
      url: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=400",
      alt: "Skater holds cold soda can",
      likes: "8.9K",
      author: "@skate_velocity",
      tag: "Classic"
    },
    {
      id: "ugc3",
      url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400",
      alt: "Glass splash soda on ice",
      likes: "22.1K",
      author: "@bubble_alchemy",
      tag: "Vanilla Rush"
    },
    {
      id: "ugc4",
      url: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&q=80&w=400",
      alt: "Beach vibes with cold cans",
      likes: "15.3K",
      author: "@sun_and_sips",
      tag: "Tropical"
    }
  ];

  return (
    <section 
      id="social-proof" 
      className={`relative py-24 md:py-32 overflow-hidden ${
        darkMode ? "bg-zinc-950 text-white" : "bg-white text-zinc-951"
      }`}
    >
      {/* 1. SCROLLING MARQUEE BANNER */}
      <div className="w-full overflow-hidden border-y border-brand-primary-light/10 bg-brand-primary-dark/15 py-4 mb-20 relative select-none">
        <div className="flex w-[200%] animate-scroll-marquee whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-16 items-center text-xs md:text-sm font-mono tracking-[0.25em] font-black uppercase text-brand-primary-light/80">
              <span>UNLEASH THE SODA REVOLUTION</span>
              <span>•</span>
              <span>TRUSTED BY THOUSANDS OF BEVERAGE LOVERS</span>
              <span>•</span>
              <span>23 SEED EXTRACTIONS</span>
              <span>•</span>
              <span>REAL CANE SUGAR NO CORN SYRUP</span>
              <span>•</span>
              <span>INFINITE LOOPS OF ALUMINUM</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1 PX-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-brand-primary-light bg-brand-primary-light/10"
          >
            <Sparkles size={12} /> Approved by Soda Lovers Worldwide
          </motion.div>
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight uppercase">
            A Billion-Dollar <span className="text-brand-primary-light">Vibe</span>
          </h2>
          <p className={`text-base md:text-lg max-w-xl mx-auto ${
            darkMode ? "text-zinc-400" : "text-zinc-650"
          }`}>
            See why medical residents, competitive streamers, and chefs are swapping ordinary high-calorie cola for Dr. Paper.
          </p>
        </div>

        {/* CUSTOMER REVIEWS TABS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              id={`review-item-${rev.id}`}
              className={`p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:scale-[1.015] ${
                darkMode 
                  ? "glassmorphism hover:bg-zinc-900/60" 
                  : "bg-zinc-50 hover:shadow-xl shadow-zinc-100 border-zinc-200/80"
              }`}
            >
              <div className="space-y-4">
                {/* Stars and verified badge */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    {Array.from({ length: rev.rating }).map((_, s) => (
                      <Star key={s} size={14} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono tracking-widest text-emerald-500 uppercase font-black bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      <ShieldCheck size={10} /> Verified Sip
                    </span>
                  )}
                </div>

                {/* Comment Text */}
                <p className={`text-sm leading-relaxed italic ${
                  darkMode ? "text-zinc-300" : "text-zinc-780"
                }`}>
                  "{rev.comment}"
                </p>
              </div>

              {/* User Bio Footer */}
              <div className="flex items-center gap-4 mt-8 pt-4 border-t border-dashed border-zinc-800">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-primary-light shadow-md"
                />
                <div>
                  <h5 className="font-display font-bold text-sm uppercase leading-none">{rev.name}</h5>
                  <span className={`text-[10px] block mt-1 ${
                    darkMode ? "text-zinc-550" : "text-zinc-500"
                  }`}>
                    {rev.role}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-500 font-bold block bg-zinc-800/40 w-max px-1.5 py-0.2 rounded mt-1.5 uppercase tracking-wide">
                    {rev.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* USER GENERATED CONTENT GRID */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-zinc-800 pb-4">
            <div>
              <span className="font-mono text-xs text-brand-primary-light font-bold uppercase tracking-widest">
                #DrPaperRevolution
              </span>
              <h3 className="font-display font-black text-2xl uppercase tracking-tight mt-1">
                Shared On Social Networks
              </h3>
            </div>
            <button
              id="social-proof-join-instagram"
              onClick={() => window.open && window.open("https://instagram.com", "_blank")}
              className={`px-5 py-2.5 rounded-xl border flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 ${
                darkMode 
                  ? "border-zinc-805 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white" 
                  : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
              }`}
            >
              <Instagram size={14} /> Join 250K+ Community
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ugcStories.map((story) => (
              <div
                key={story.id}
                id={`ugc-card-${story.id}`}
                className="group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-md border border-zinc-800 flex flex-col justify-end p-5 select-none"
              >
                {/* Image underlay */}
                <img
                  src={story.url}
                  alt={story.alt}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300" />

                {/* Micro Hover Play Indicator for Mock Reels */}
                <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <Play size={16} className="text-white fill-white translate-x-0.5" />
                </div>

                {/* Overlay Metadata */}
                <div className="z-10 space-y-2">
                  <span className="text-[8px] font-mono tracking-widest font-black uppercase bg-brand-primary-light text-white px-2 py-0.5 rounded shadow">
                    {story.tag}
                  </span>
                  <div>
                    <h5 className="font-mono text-xs font-bold text-white leading-none">
                      {story.author}
                    </h5>
                    <p className="text-[10px] text-zinc-400 mt-1 flex items-center gap-1 font-mono">
                      <span>❤️ {story.likes} likes</span>
                      <span>•</span>
                      <span>💬 Mock Video Testimonial</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
