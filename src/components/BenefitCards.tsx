import { motion } from "motion/react";
import { Sparkles, Leaf, Zap, Heart, RefreshCw, CheckCircle, Flame, Battery, ShieldAlert } from "lucide-react";

interface BenefitCardsProps {
  darkMode: boolean;
}

export default function BenefitCards({ darkMode }: BenefitCardsProps) {
  const benefits = [
    {
      id: "taste",
      title: "Signature botanical blend",
      description: "We cold-steep 23 hand-picked botanicals, extracts, and oils to achieve a satisfyingly layered punch.",
      icon: <Sparkles className="text-brand-primary-light" size={24} />
    },
    {
      id: "ingredients",
      title: "Eco clean ingredients",
      description: "NO high-fructose corn syrup, NO red dye 40, NO toxic phosphoric acid. Sweetened naturally.",
      icon: <Leaf className="text-brand-primary-light" size={24} />
    },
    {
      id: "energy",
      title: "Sustained herbal focus",
      description: "Guarana seeds, Yerba mate, and green tea provide high-alert mental performance without a sugar crash.",
      icon: <Zap className="text-brand-primary-light" size={24} />
    },
    {
      id: "low-sugar",
      title: "Low glucose index",
      description: "Our Keto-verified Zero Sugar series relies on clean Monk Fruit and Agave to taste authentic.",
      icon: <Heart className="text-brand-primary-light" size={24} />
    },
    {
      id: "packaging",
      title: "Infinite aluminum cycle",
      description: "Ultra-light brushed metal cans are fully melted, re-pressed and shelved in under 45 days.",
      icon: <RefreshCw className="text-brand-primary-light" size={24} />
    },
    {
      id: "quality",
      title: "Micro-batch clinical testing",
      description: "Every single delivery run undergoes extensive sensory checks and high-res laboratory assays.",
      icon: <CheckCircle className="text-brand-primary-light" size={24} />
    }
  ];

  return (
    <section 
      id="benefits" 
      className={`relative py-24 md:py-32 overflow-hidden ${
        darkMode ? "bg-zinc-950 text-white" : "bg-white text-zinc-955"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADING ACCENT */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24 space-y-4">
          <span className="font-mono text-[10px] tracking-[0.3em] font-black uppercase text-brand-primary-light block">
            Crafting Performance
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight uppercase">
            Why Dr. Paper <span className="italic text-brand-primary-light">Hits Different</span>
          </h2>
          <div className="w-16 h-1 bg-brand-primary-light mx-auto" />
        </div>

        {/* BENEFITS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-24">
          {benefits.map((b) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:translate-y-[-4px] flex gap-4 ${
                darkMode 
                  ? "glassmorphism hover:bg-zinc-900/40" 
                  : "bg-zinc-50 hover:shadow-xl shadow-zinc-100 border-zinc-200/60"
              }`}
            >
              <div className={`p-3 rounded-xl h-fit ${
                darkMode ? "bg-zinc-950" : "bg-white border border-zinc-100 shadow-sm"
              }`}>
                {b.icon}
              </div>
              <div className="space-y-1.5">
                <h4 className="font-display font-extrabold text-lg uppercase tracking-tight">{b.title}</h4>
                <p className={`text-xs leading-relaxed ${
                  darkMode ? "text-zinc-400" : "text-zinc-600"
                }`}>
                  {b.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ALTERNATING DETAIL STORY SECTIONS */}
        <div className="space-y-24 md:space-y-36">
          
          {/* BLOCK 1: The Flavor Alchemy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual representation */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-brand-primary-light/10 blur-3xl rounded-full" />
              <div className={`relative p-8 rounded-3xl border ${
                darkMode ? "bg-zinc-900/60 border-zinc-800" : "bg-zinc-50 border-zinc-200"
              }`}>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-mono font-bold text-brand-primary-light uppercase">Extraction Lab</span>
                  <Flame size={20} className="text-brand-primary-light animate-pulse" />
                </div>
                {/* Micro illustration representational bar */}
                <div className="space-y-3 font-mono text-[11px] text-zinc-500">
                  <div className="flex justify-between border-b pb-2">
                    <span>Wild Cherry Bark</span>
                    <span className="text-brand-primary-light font-bold">Cold Steeping (72h)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Madagascar Vanilla Pods</span>
                    <span className="text-zinc-300 font-bold">Absolute Extraction</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Sarsaparilla Root Extract</span>
                    <span className="text-zinc-305 font-bold">Double Mashing</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carbon Content</span>
                    <span className="text-cyan-400 font-black">Micro-Bubbles</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content text */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <span className="font-mono text-xs font-bold uppercase text-brand-primary-light tracking-widest block">No Chemical Mimics</span>
              <h3 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight">Authentic Cold-Brewed Botanicals</h3>
              <p className={`text-base leading-relaxed ${
                darkMode ? "text-zinc-450" : "text-zinc-650"
              }`}>
                Ordinary soda manufacturers buy synthetic powdered flavors, dissolve them in industrial corn syrup, and squirt them with raw chemical acids that corrode standard tooth enamel.
              </p>
              <p className={`text-base leading-relaxed ${
                darkMode ? "text-zinc-450" : "text-zinc-650"
              }`}>
                At Dr. Paper, we treat soft drinks with the reverence of wine-making. We source true botanical fibers, steep them gently in cold rain-water filtration tanks, and let the natural oils mature dynamically to form complex flavor structures that explode beautifully on the tongue.
              </p>
            </div>
          </div>

          {/* BLOCK 2: Cognitive Sustained Energy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Content text */}
            <div className="space-y-6 lg:col-span-7">
              <span className="font-mono text-xs font-bold uppercase text-brand-primary-light tracking-widest block font-light">Zero Crash Factor</span>
              <h3 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight">The Sustained Herbal Energy Matrix</h3>
              <p className={`text-base leading-relaxed ${
                darkMode ? "text-zinc-400" : "text-zinc-650"
              }`}>
                Generic energy drinks and colas dump high quantities of anhydrous chemical caffeine into your blood. This triggers extreme insulin spikes, heart palpitations, and an inevitable brain fog exhaustion in under 45 minutes.
              </p>
              <p className={`text-base leading-relaxed ${
                darkMode ? "text-zinc-400" : "text-zinc-650"
              }`}>
                We infuse Yerba Mate, Guarana Seed, and CoQ10. This molecular matrix releases cellular stimulants at a steady linear velocity, keeping surgical teams, gamers, and athletes at maximum mental acuity without erratic jitters.
              </p>
            </div>

            {/* Visual representation */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-amber-500/10 blur-3xl rounded-full" />
              <div className={`relative p-8 rounded-3xl border ${
                darkMode ? "bg-zinc-900/60 border-zinc-800" : "bg-zinc-50 border-zinc-200"
              }`}>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-mono font-bold text-amber-500 uppercase">Alert Velocity Monitor</span>
                  <Battery size={20} className="text-amber-500 animate-pulse" />
                </div>
                {/* Interactive bar charts representation */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span>Yerba Extract (Dr. Paper Alert Rate)</span>
                      <span className="text-emerald-400">8 Hr Linear Alert</span>
                    </div>
                    <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-emerald-500" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span>Standard Cola (Anhydrous Caffeine)</span>
                      <span className="text-red-400">45 Min Crash Spike</span>
                    </div>
                    <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-red-500 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
