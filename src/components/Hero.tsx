import { motion } from "motion/react";
import { ArrowDown, Flame, ShoppingBag, ArrowRight } from "lucide-react";
import ThreeDCan from "./ThreeDCan";
import { Flavor } from "../types";

interface HeroProps {
  darkMode: boolean;
  flavor: Flavor;
  onExploreFlavors: () => void;
  onBuyClick: () => void;
}

export default function Hero({ darkMode, flavor, onExploreFlavors, onBuyClick }: HeroProps) {
  // Generate random bubble specs for animated particle backgrounds
  const bubbles = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    size: Math.random() * 12 + 6,
    left: Math.random() * 100,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.35 + 0.1,
  }));

  return (
    <section 
      id="hero" 
      className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-24 px-6 ${
        darkMode ? "bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-900"
      }`}
    >
      {/* 1. CARBONATION BUBBLES STREAM (Motion background) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            className="absolute rounded-full border border-brand-primary-light"
            style={{
              width: b.size,
              height: b.size,
              left: `${b.left}%`,
              bottom: "-40px",
              opacity: b.opacity,
              background: `radial-gradient(circle, rgba(171, 21, 50, 0.25) 0%, rgba(0,0,0,0) 80%)`,
            }}
            animate={{
              y: ["0vh", "-110vh"],
              x: [0, Math.sin(b.id) * 30, -Math.sin(b.id) * 20, 0],
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* 2. DYNAMIC ATMOSPHERIC GLOWS */}
      <div 
        className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-20 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${flavor.gradientFrom} 0%, rgba(0,0,0,0) 70%)`
        }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[180px] opacity-25 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${flavor.gradientTo} 0%, rgba(0,0,0,0) 70%)`
        }}
      />

      {/* Hero Content layout */}
      <div className="max-w-7xl mx-auto z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative py-12">
        {/* LEFT COLUMN: PUNCHY COPYWRITING */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8">
          
          {/* Tag Line Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider relative border ${
              darkMode 
                ? "bg-zinc-900/85 border-zinc-800 text-zinc-300" 
                : "bg-white/85 border-zinc-200 text-zinc-700"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary-light opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary-light"></span>
            </span>
            <span className="flex items-center gap-1">
              <Flame size={12} className="text-brand-primary-light animate-pulse" />
              The Beverage Revolution is Here
            </span>
            {/* Glossy sheen badge */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]" />
          </motion.div>

          {/* HEADLINE */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-black text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[0.9] uppercase"
            >
              Uncap The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary-light via-rose-500 to-amber-505 font-extrabold italic inline-block transform md:-rotate-1 pr-6"
                style={{
                  backgroundImage: "linear-gradient(135deg, #ab1532 20%, #ef4444 60%, #dec07a 100%)",
                  WebkitBackgroundClip: "text"
                }}
              >
                Flavor
              </span> <br />
              Revolution.
            </motion.h1>

            {/* SUBHEADLINE */}
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className={`text-lg md:text-xl font-normal max-w-xl leading-relaxed ${
                darkMode ? "text-zinc-400" : "text-zinc-650"
              }`}
            >
              A bold taste crafted with 23 certified botanicals for people who never settle for ordinary sugar-water sodas. Clean organic energy that hits completely different.
            </motion.p>
          </div>

          {/* CTA ACTIONS BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            {/* Order Now (Direct Action popup) */}
            <button
              id="hero-primary-buy"
              onClick={onBuyClick}
              className="group relative px-8 py-4 bg-brand-primary hover:bg-brand-primary-light text-white font-black tracking-wider uppercase rounded-2xl transition-all duration-300 shadow-xl shadow-brand-primary/20 hover:shadow-2xl hover:shadow-brand-primary/40 active:scale-95 flex items-center justify-center gap-2 overflow-hidden"
            >
              {/* Internal gleam */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <ShoppingBag size={18} />
              Buy Now
              <ArrowRight size={16} className="transform group-hover:translate-x-1.5 transition-transform" />
            </button>

            {/* Explore Variants */}
            <button
              id="hero-secondary-explore"
              onClick={onExploreFlavors}
              className={`px-8 py-4 text-sm font-bold uppercase rounded-2xl transition-all border outline-none active:scale-95 flex items-center justify-center gap-2 ${
                darkMode 
                  ? "border-zinc-800 text-zinc-200 bg-zinc-900/50 hover:bg-zinc-800" 
                  : "border-zinc-200 text-zinc-800 bg-white hover:bg-zinc-100"
              }`}
            >
              Explore Flavors
            </button>
          </motion.div>

          {/* Dynamic Trust Signals Snippet */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center gap-4 text-xs font-mono tracking-widest uppercase font-light"
          >
            <span>🌿 100% Organic Extracts</span>
            <span className="w-1.5 h-1.5 bg-brand-primary-light rounded-full" />
            <span>⚡ Natural Herbal Caffeine</span>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: 3D CYLINDER CANVAS SPOTLIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 60, delay: 0.3 }}
          className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[380px] select-none"
        >
          {/* Pulsing light rings surrounding the can */}
          <div className="absolute inset-0 m-auto flex items-center justify-center pointer-events-none">
            <div className={`w-[290px] h-[290px] rounded-full border-2 border-brand-primary-light/5 absolute animate-[ping_4s_infinite]`}></div>
            <div className={`w-[400px] h-[400px] rounded-full border border-brand-primary-light/5 absolute animate-[ping_6s_infinite] delay-1000`}></div>
          </div>

          <div className="relative transform hover:scale-105 transition-transform duration-500 scale-110 lg:scale-125">
            {/* Embedded real 3D can segment */}
            <ThreeDCan flavor={flavor} isFloating={true} interactive={true} scale={1.12} autoRotateSpeed={0.7} />
          </div>

          {/* Prompt guide helper bubble */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className={`absolute bottom-[-15px] px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider font-light uppercase border flex items-center gap-1.5 backdrop-blur-md ${
              darkMode ? "bg-zinc-900/90 border-zinc-800 text-zinc-400" : "bg-white/95 border-zinc-200 text-zinc-650"
            }`}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-brand-primary-light animate-pulse" />
            Drag or Hover to Rotate 3D Can
          </motion.div>
        </motion.div>
      </div>

      {/* 3. SCROLL DOWN TRACKER CUE */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 pointer-events-none">
        <span className={`text-[9px] font-mono tracking-[0.3em] uppercase block opacity-50 ${
          darkMode ? "text-zinc-300" : "text-zinc-600"
        }`}>
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`w-6 h-10 rounded-full border-2 flex justify-center p-1.5 opacity-60 ${
            darkMode ? "border-zinc-700" : "border-zinc-300"
          }`}
        >
          <div className="w-1.5 h-2.5 bg-brand-primary-light rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
