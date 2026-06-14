import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, Compass, Droplet, Star, ShoppingBag, Eye, Zap } from "lucide-react";
import { EXPERIENCE_STEPS } from "../data";

interface ProductExperienceProps {
  darkMode: boolean;
}

export default function ProductExperience({ darkMode }: ProductExperienceProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-progress timeline slideshow
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % EXPERIENCE_STEPS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentStepData = EXPERIENCE_STEPS[activeStep];

  // Helper icons for step indices
  const icons = [
    <Compass className="text-white" size={18} />,
    <Droplet className="text-white" size={18} />,
    <Zap className="text-white" size={18} />,
    <Star className="text-white" size={18} />,
    <ShoppingBag className="text-white" size={18} />
  ];

  return (
    <section 
      id="experience" 
      className={`relative py-24 md:py-32 overflow-hidden ${
        darkMode ? "bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-950"
      }`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[30%] left-[20%] w-[350px] h-[350px] rounded-full blur-[100px] bg-brand-primary-light" />
        <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] rounded-full blur-[100px] bg-zinc-800" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-4">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand-primary-light p-1">
            Storytelling Experience
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight uppercase">
            The Alchemy of <span className="text-brand-primary-light">Dr. Paper</span>
          </h2>
          <p className={`text-base md:text-lg max-w-xl mx-auto ${
            darkMode ? "text-zinc-400" : "text-zinc-650"
          }`}>
            Unveil our pristine extraction secrets with this interactive story flow. Click hotspots below or play the presentation loop.
          </p>
        </div>

        {/* INTERACTIVE HUB */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT INTERACTIVE CANVAS (The Hotspots mapping area) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* Control Panel Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider font-bold">
                interactive visual blueprint
              </span>
              <button
                id="experience-play-pause"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-2.5 rounded-full border outline-none flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 ${
                  darkMode 
                    ? "border-zinc-805 bg-zinc-900 text-zinc-300 hover:bg-zinc-800" 
                    : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 shadow-sm"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause size={12} className="text-amber-500 fill-amber-500" /> Playing auto-loop
                  </>
                ) : (
                  <>
                    <Play size={12} className="text-emerald-500 fill-emerald-500" /> Timestep paused
                  </>
                )}
              </button>
            </div>

            {/* Hotspots stage wrapper */}
            <div 
              className={`relative h-[340px] md:h-[400px] rounded-3xl border overflow-hidden p-8 flex flex-col justify-between ${
                darkMode 
                  ? "bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-950 border-white/5" 
                  : "bg-gradient-to-tr from-zinc-100 via-zinc-50 to-zinc-100 border-black/5"
              }`}
            >
              {/* Floating Blueprint Design Lines and labels */}
              <div className="absolute inset-0 pointer-events-none opacity-20 border-2 border-dashed border-zinc-700/50 m-4 rounded-xl" />
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] border-b border-dashed border-zinc-700/20" />
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] border-r border-dashed border-zinc-700/20" />

              {/* Hotspots mapping */}
              {EXPERIENCE_STEPS.map((step, idx) => {
                const isActive = idx === activeStep;
                return (
                  <button
                    key={step.id}
                    id={`experience-hotspot-${idx}`}
                    onClick={() => {
                      setActiveStep(idx);
                      setIsPlaying(false); // pause play cycle on user click
                    }}
                    style={{
                      left: `${step.hotspotX}%`,
                      top: `${step.hotspotY}%`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group relative outline-none"
                  >
                    {/* Hotspot Ring halo */}
                    <div 
                      className={`absolute inset-0 m-auto rounded-full border-2 transition-transform duration-700 ${
                        isActive 
                          ? "w-14 h-14 bg-brand-primary/20 border-brand-primary-light animate-[ping_2s_infinite]" 
                          : "w-8 h-8 group-hover:scale-120 border-zinc-500/50"
                      }`}
                    />

                    {/* Central Number ball */}
                    <div 
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center font-mono font-black text-xs transition-all duration-300 shadow-md ${
                        isActive 
                          ? "bg-brand-primary-light text-white border-2 border-white scale-110" 
                          : darkMode
                            ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                            : "bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-100"
                      }`}
                    >
                      {idx + 1}
                    </div>

                    {/* Miniature bubble label tooltip on hover */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 scale-90 group-hover:scale-100 w-max z-30">
                      <span className="bg-black text-[10px] font-mono font-bold tracking-wider text-white px-2 py-1 rounded shadow-lg uppercase border border-zinc-700">
                        {step.title}
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* Grid Label coordinates */}
              <div className="z-10 text-[9px] font-mono text-zinc-500 flex justify-between">
                <span>COORD: X=04.1 Y=09.8</span>
                <span>SYSTEM: MATURED BREW_SOLAR</span>
              </div>

              <div className="flex-grow flex items-center justify-center pointer-events-none">
                {/* Floating micro text bubble reflecting overall state */}
                <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">
                  ACTIVE PHASE: {currentStepData.phase}
                </span>
              </div>

              <div className="z-10 text-[9px] font-mono text-zinc-400 flex justify-between">
                <span>© Dr. Paper Apothecary Archives</span>
                <span>SEAL: NITRO_TRACE OK</span>
              </div>
            </div>

            {/* Micro Navigation Steps Indicators */}
            <div className="flex justify-between gap-2">
              {EXPERIENCE_STEPS.map((step, idx) => {
                const isActive = idx === activeStep;
                return (
                  <button
                    key={step.id}
                    id={`experience-indicator-btn-${idx}`}
                    onClick={() => {
                      setActiveStep(idx);
                      setIsPlaying(false);
                    }}
                    className={`flex-grow py-3.5 px-2 rounded-xl text-center transition-all ${
                      isActive 
                        ? {
                          true: "bg-zinc-900 border border-brand-primary-light text-white shadow-lg",
                          false: "bg-white border border-brand-primary text-zinc-900 shadow-md",
                        }[darkMode.toString()]
                        : "hover:bg-zinc-100/10 text-zinc-500 hover:text-zinc-400 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-brand-primary-light" : "bg-zinc-650"}`} />
                      <span className="font-display font-bold text-[10px] uppercase tracking-wide hidden sm:inline-block">
                        {step.title.split(" ")[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT SCREENPLAY DETAIL CARD (Sliding presentation) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`p-8 md:p-10 rounded-3xl border flex flex-col justify-between h-full ${
                  darkMode 
                    ? "bg-zinc-900 border-zinc-800 shadow-xl" 
                    : "bg-white border-zinc-200 hover:shadow-xl shadow-zinc-100"
                }`}
              >
                {/* Visual Accent bubble */}
                <div className="space-y-6">
                  {/* Badge */}
                  <div className="flex items-center justify-between border-b pb-4 border-dashed border-zinc-800">
                    <span className="font-mono text-xs font-bold text-brand-primary-light uppercase tracking-widest block">
                      {currentStepData.phase}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shadow-lg">
                      {icons[activeStep]}
                    </div>
                  </div>

                  {/* Title & Core Copy */}
                  <div className="space-y-4">
                    <h3 className="font-display font-black text-2xl md:text-3.5xl uppercase tracking-tight">
                      {currentStepData.title}
                    </h3>
                    <p className={`text-base leading-relaxed ${
                      darkMode ? "text-zinc-400" : "text-zinc-650"
                    }`}>
                      {currentStepData.description}
                    </p>
                  </div>
                </div>

                {/* Sub-Detailed Spec block */}
                <div className={`mt-8 p-5 rounded-2xl p-4 flex gap-4 items-center ${
                  darkMode ? "bg-zinc-950/80 text-zinc-300" : "bg-zinc-100 text-zinc-850"
                }`}>
                  <div className="p-2.5 rounded-lg bg-zinc-800 text-amber-500">
                    <Eye size={16} />
                  </div>
                  <div>
                    <h5 className="font-mono font-black text-[10px] tracking-wider uppercase text-zinc-500">
                      Technical Detail
                    </h5>
                    <p className="text-xs mt-0.5 font-sans leading-relaxed">
                      {currentStepData.detail}
                    </p>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
