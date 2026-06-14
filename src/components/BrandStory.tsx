import { motion } from "motion/react";
import { ShieldCheck, Compass, Eye, Map, Star, Target } from "lucide-react";
import { TIMELINE } from "../data";

interface BrandStoryProps {
  darkMode: boolean;
}

export default function BrandStory({ darkMode }: BrandStoryProps) {
  return (
    <section 
      id="story" 
      className={`relative py-24 md:py-32 overflow-hidden ${
        darkMode ? "bg-zinc-950 text-white" : "bg-white text-zinc-952"
      }`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-sky-500 rounded-full blur-[140px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-purple-500 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Core Vision & Mission intro cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs font-bold uppercase text-brand-primary-light tracking-widest block font-light">
              Restoring Integrity to Carbonation
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight uppercase leading-[0.9]">
              Our Quest For <span className="text-brand-primary-light">Real Taste</span>
            </h2>
            <p className={`text-base leading-relaxed ${
              darkMode ? "text-zinc-400" : "text-zinc-650"
            }`}>
              We believe soft drinks aren't just sugary water vectors. They are ancient botanical social elixirs that have been industrial-engineered down to chemical formulas.
            </p>
            <p className={`text-base leading-relaxed ${
              darkMode ? "text-zinc-400" : "text-zinc-650"
            }`}>
              Dr. Paper exists to break the sugar duopoly, restoring complex seed brewing, clean ingredients, circular metal design, and carbon-neutral mechanics directly back to your can.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Mission Box */}
            <div className={`p-6 rounded-3xl border ${
              darkMode ? "bg-zinc-900 border-zinc-800" : "bg-zinc-50 border-zinc-200"
            }`}>
              <div className="p-3 bg-brand-primary/10 rounded-xl h-fit w-fit text-brand-primary-light mb-4">
                <Compass size={20} />
              </div>
              <h4 className="font-display font-black text-lg uppercase tracking-tight mb-2">Our Mission</h4>
              <p className={`text-xs leading-relaxed ${
                darkMode ? "text-zinc-500" : "text-zinc-500"
              }`}>
                To eliminate toxic high-fructose corn syrup from standard soft drinks, supplying natural sustained performance and taste.
              </p>
            </div>

            {/* Vision Box */}
            <div className={`p-6 rounded-3xl border ${
              darkMode ? "bg-zinc-900 border-zinc-800" : "bg-zinc-50 border-zinc-200"
            }`}>
              <div className="p-3 bg-indigo-500/10 rounded-xl h-fit w-fit text-indigo-500 mb-4">
                <Target size={20} />
              </div>
              <h4 className="font-display font-black text-lg uppercase tracking-tight mb-2">Our Vision</h4>
              <p className={`text-xs leading-relaxed ${
                darkMode ? "text-zinc-550" : "text-zinc-500"
              }`}>
                A circular global beverage grid where 100% of consumer packaging is recycled dynamically and shipped via local solar networks.
              </p>
            </div>
          </div>
        </div>

        {/* TIMELINE ARCHITECTURE (Origins and Future Steps) */}
        <div className="relative max-w-3xl mx-auto space-y-16">
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-0.5 bg-gradient-to-b from-brand-primary-light via-brand-primary-light/40 to-transparent pointer-events-none" />
          
          {TIMELINE.map((evt, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={evt.year}
                className={`relative flex flex-col md:flex-row items-stretch md:justify-between ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Year Marker point */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 w-6 h-6 rounded-full bg-zinc-950 border-4 border-brand-primary-light flex items-center justify-center z-10 shadow shadow-brand-primary-light/40">
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>

                <div className="w-full md:w-[45%] pl-12 md:pl-0">
                  <div className={`p-6 md:p-8 rounded-3xl border space-y-3 ${
                    darkMode 
                      ? "bg-zinc-90 w-full hover:bg-zinc-900/60 transition-colors border-zinc-801" 
                      : "bg-zinc-50 w-full hover:bg-zinc-100 transition-colors border-zinc-200"
                  }`}>
                    <span className="font-display font-black text-2xl md:text-3.5xl text-brand-primary-light block leading-none">
                      {evt.year}
                    </span>
                    <h4 className="font-display font-bold text-lg uppercase tracking-tight">
                      {evt.title}
                    </h4>
                    <p className={`text-xs leading-relaxed ${
                      darkMode ? "text-zinc-400" : "text-zinc-650"
                    }`}>
                      {evt.description}
                    </p>
                  </div>
                </div>

                {/* Stagger spacing placeholder */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
