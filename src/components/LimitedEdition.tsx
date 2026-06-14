import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, Timer, Flame, Package } from "lucide-react";
import { Flavor } from "../types";

interface LimitedEditionProps {
  darkMode: boolean;
  cosmicFlavor: Flavor;
  onOrderClick: (flavor: Flavor) => void;
}

export default function LimitedEdition({
  darkMode,
  cosmicFlavor,
  onOrderClick,
}: LimitedEditionProps) {
  // Countdown Timer: Setup targeting 48 hours in the future
  const [timeLeft, setTimeLeft] = useState({
    hours: 47,
    minutes: 59,
    seconds: 59,
    milliseconds: 99
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.milliseconds > 0) {
          return { ...prev, milliseconds: prev.milliseconds - 1 };
        } else if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1, milliseconds: 99 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59, milliseconds: 99 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59, milliseconds: 99 };
        } else {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
        }
      });
    }, 10); // accurate centiseconds ticks

    return () => clearInterval(timer);
  }, []);

  // Format Helper for double decimals
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section 
      id="limited" 
      className={`relative py-24 md:py-32 overflow-hidden ${
        darkMode ? "bg-zinc-950 text-white" : "bg-white text-zinc-953"
      }`}
    >
      {/* Supernova starry backdrop decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(#ab1532_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full blur-[160px] bg-purple-500/20" />
        <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full blur-[160px] bg-rose-500/15" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div 
          className={`rounded-[2.5rem] border p-8 md:p-14 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative overflow-hidden ${
            darkMode 
              ? "bg-gradient-to-tr from-zinc-950 via-purple-950/20 to-zinc-955 border-purple-500/20 shadow-2xl" 
              : "bg-gradient-to-tr from-zinc-100 via-purple-50/20 to-zinc-50 border-purple-500/20 shadow-xl"
          }`}
        >
          {/* Neon corner lines represent futuristic container */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-purple-500/40 rounded-tl-[2.3rem] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-purple-500/40 rounded-br-[2.3rem] pointer-events-none" />

          {/* LEFT COL: CONTENT URGENCE & COUNTDOWN */}
          <div className="lg:col-span-7 space-y-8 select-none">
            <div className="space-y-4">
              {/* Limited Alert Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/25">
                <Sparkles size={11} className="animate-spin-slow" />
                Hyper-Limited Space Drop
              </div>

              <h2 className="font-display font-black text-4xl md:text-5.5xl leading-none uppercase tracking-tight">
                Cosmic Space <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-rose-400 font-extrabold italic">
                  Supernova Batch
                </span>
              </h2>

              <p className={`text-base max-w-xl leading-relaxed ${
                darkMode ? "text-zinc-400" : "text-zinc-650"
              }`}>
                Infused with space berry essences (wild blackcurrant, tart mountain huckleberry) and Yerba Mate extract combined with natural CoQ10. This is our rarest formulation ever made, canned once and never brewed again.
              </p>
            </div>

            {/* COUNTDOWN CLOCK BOX */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <Timer size={13} className="text-purple-400" /> batch claims expire in:
              </h4>

              <div className="flex gap-3 md:gap-4 flex-wrap">
                {/* Hours Box */}
                <div className={`p-4 rounded-2xl min-w-[70px] text-center border ${
                  darkMode ? "bg-zinc-900/90 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
                }`}>
                  <span className="font-display font-black text-2xl md:text-3.5xl block tracking-tight text-purple-400">
                    {pad(timeLeft.hours)}
                  </span>
                  <span className="text-[9px] font-mono font-light text-zinc-500 uppercase block tracking-wider mt-0.5">Hr</span>
                </div>
                {/* colon */}
                <div className="text-3xl font-display font-black self-center text-zinc-600 hidden sm:block">:</div>
                {/* Minutes Box */}
                <div className={`p-4 rounded-2xl min-w-[70px] text-center border ${
                  darkMode ? "bg-zinc-900/90 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
                }`}>
                  <span className="font-display font-black text-2xl md:text-3.5xl block tracking-tight text-white">
                    {pad(timeLeft.minutes)}
                  </span>
                  <span className="text-[9px] font-mono font-light text-zinc-500 uppercase block tracking-wider mt-0.5">Min</span>
                </div>
                <div className="text-3xl font-display font-black self-center text-zinc-600 hidden sm:block">:</div>
                {/* Seconds Box */}
                <div className={`p-4 rounded-2xl min-w-[70px] text-center border ${
                  darkMode ? "bg-zinc-900/90 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
                }`}>
                  <span className="font-display font-black text-2xl md:text-3.5xl block tracking-tight text-white">
                    {pad(timeLeft.seconds)}
                  </span>
                  <span className="text-[9px] font-mono font-light text-zinc-500 uppercase block tracking-wider mt-0.5">Sec</span>
                </div>
                <div className="text-3xl font-display font-black self-center text-zinc-600 hidden sm:block">:</div>
                {/* Milliseconds Box */}
                <div className={`p-4 rounded-2xl min-w-[70px] text-center border ${
                  darkMode ? "bg-zinc-900/90 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
                }`}>
                  <span className="font-display font-black text-2xl md:text-3.5xl block tracking-tight text-rose-400">
                    {pad(timeLeft.milliseconds)}
                  </span>
                  <span className="text-[9px] font-mono font-light text-zinc-500 uppercase block tracking-wider mt-0.5 font-bold">Ms</span>
                </div>
              </div>
            </div>

            {/* SCARCITY INDICATOR & STOCK PROGRESS BAR */}
            <div className="space-y-3.5 max-w-md">
              <div className="flex justify-between items-center text-xs font-mono font-bold uppercase tracking-wider">
                <span className="text-rose-400 flex items-center gap-1.5">
                  <Flame size={12} className="animate-pulse" /> Highly Coveted! 84% claim rate
                </span>
                <span className={`flex items-center gap-1.5 ${
                  darkMode ? "text-zinc-400" : "text-zinc-650"
                }`}>
                  <Package size={12} /> Only 187 Cases Left
                </span>
              </div>
              {/* Glowing animated deplete bar */}
              <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden relative p-[1px] border border-white/5">
                <div className="absolute inset-0 bg-purple-500/25 blur-[4px]" />
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 via-rose-500 to-amber-500 rounded-full transition-all duration-1000 relative"
                  style={{ width: "84%" }}
                >
                  {/* Gloss lines on progress bar */}
                  <div className="absolute inset-0 bg-white/20 animate-[pulse-slow_2s_infinite]" />
                </div>
              </div>
            </div>

            {/* PERSUASIVE PURCHASE CTA */}
            <button
              id="limited-claim-cta"
              onClick={() => onOrderClick(cosmicFlavor)}
              className="group w-full sm:w-auto relative px-8 py-4.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black tracking-wider uppercase rounded-2xl transition-all duration-300 shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 active:scale-[0.98] flex items-center justify-center gap-2 overflow-hidden border border-purple-400/20"
            >
              Claim Limited Edition Case
            </button>
          </div>

          {/* RIGHT COL: MOCKUP FLAVOR CAN ARTWORK & SPEC SHEETS */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[340px]">
            {/* Ambient galaxy ring backdrop */}
            <div className="absolute inset-0 m-auto flex items-center justify-center pointer-events-none">
              <div className="w-[200px] h-[340px] rounded-full border border-purple-500/25 absolute rotate-12 blur-[1px] animate-[pulse_3s_infinite]" />
              <div className="w-[250px] h-[250px] rounded-full border border-rose-500/10 absolute -rotate-45" />
            </div>

            {/* Illustrative product visual mimicking the Can segment */}
            <div className="relative select-none text-center space-y-6">
              <div 
                className="relative w-32 h-56 mx-auto rounded-3xl flex flex-col justify-between py-6 shadow-2xl overflow-hidden border border-purple-500/30 text-white"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${cosmicFlavor.gradientFrom} 0%, ${cosmicFlavor.gradientTo} 100%)`
                }}
              >
                {/* Liquid bubbles effect */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:12px_12px]" />
                <span className="text-[7px] tracking-[0.3em] text-white/50 font-mono uppercase block">RAREST SERIES</span>
                <div className="text-white text-md font-black uppercase tracking-widest italic -rotate-12 select-none py-1.5 bg-purple-950/40 border-y border-purple-500/20">
                  COSMIC
                </div>
                <div className="space-y-0.5">
                  <span className="text-[7px] tracking-[0.2em] text-cyan-300 font-mono uppercase block font-bold">SUPERNOVA BERRY</span>
                  <span className="text-[6px] tracking-widest text-white/40 font-mono uppercase block">355mL / 12 FL OZ</span>
                </div>
              </div>

              {/* Tag mini indicators */}
              <div className="flex gap-2 justify-center flex-wrap">
                <span className={`text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full ${
                  darkMode ? "bg-zinc-900 border border-purple-500/20 text-purple-300" : "bg-zinc-100 text-purple-700"
                }`}>
                  🛸 CoQ10 Cognitive
                </span>
                <span className={`text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full ${
                  darkMode ? "bg-zinc-900 border border-purple-500/20 text-purple-300" : "bg-zinc-100 text-purple-700"
                }`}>
                  ✨ Galaxy Berries
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
