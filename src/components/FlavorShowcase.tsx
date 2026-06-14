import React, { useState } from "react";
import { motion } from "motion/react";
import { Info, Sparkles, Check, ShoppingCart, Percent } from "lucide-react";
import { Flavor } from "../types";
import { FLAVORS } from "../data";

interface FlavorShowcaseProps {
  darkMode: boolean;
  onFlavorSelect: (flavor: Flavor) => void;
  selectedFlavor: Flavor;
  onOrderClick: (flavor: Flavor) => void;
}

export default function FlavorShowcase({
  darkMode,
  onFlavorSelect,
  selectedFlavor,
  onOrderClick,
}: FlavorShowcaseProps) {
  // Local state for tracking which cards are showing nutrition sheets
  const [activeNutritionCard, setActiveNutritionCard] = useState<string | null>(null);

  // Simple mouse move calculations to implement the 3D glass card tilt effect on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 10; // offset tilt intensity
    const rotateY = (x - centerX) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  const toggleNutrition = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveNutritionCard(activeNutritionCard === id ? null : id);
  };

  return (
    <section 
      id="flavors" 
      className={`relative py-24 md:py-32 overflow-hidden ${
        darkMode ? "bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-950"
      }`}
    >
      {/* Visual background ambient blurs */}
      <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] rounded-full blur-[160px] opacity-10 bg-brand-primary pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[450px] h-[450px] rounded-full blur-[160px] opacity-10 bg-emerald-500 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-brand-primary-light bg-brand-primary-light/10 border border-brand-primary-light/20"
          >
            <Sparkles size={12} /> Live Your Flavor
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-display font-black text-4xl md:text-6xl tracking-tight uppercase"
          >
            Explore The <span className="text-brand-primary-light">Proprietary</span> Lineup
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
            className={`text-base md:text-lg max-w-xl mx-auto ${
              darkMode ? "text-zinc-300" : "text-zinc-650"
            }`}
          >
            Click cards to select your favorite flavor and update the hero showcase. Experience the fully optimized organic formula in six unique recipes.
          </motion.p>
        </div>

        {/* FLAVORS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {FLAVORS.map((flavor) => {
            const isSelected = selectedFlavor.id === flavor.id;
            const showNutrition = activeNutritionCard === flavor.id;

            return (
              <div
                key={flavor.id}
                id={`flavor-card-${flavor.id}`}
                className={`relative rounded-3xl p-6 transition-all duration-300 ease-out select-none cursor-pointer flex flex-col justify-between min-h-[460px] overflow-hidden ${
                  isSelected 
                    ? darkMode
                      ? "ring-2 ring-brand-primary-light bg-zinc-900 shadow-2xl"
                      : "ring-2 ring-brand-primary-light bg-white shadow-2xl"
                    : darkMode
                      ? "glassmorphism hover:bg-zinc-900/60"
                      : "bg-white border border-zinc-200/80 hover:shadow-xl shadow-zinc-100"
                }`}
                onClick={() => onFlavorSelect(flavor)}
                onMouseMove={(e) => handleMouseMove(e, flavor.id)}
                onMouseLeave={handleMouseLeave}
                style={{
                  transition: "transform 0.15s ease-out, box-shadow 0.3s, background-color 0.3s"
                }}
              >
                
                {/* 1. CARD GLOW BACKDROP */}
                <div 
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% -10%, ${flavor.gradientFrom} 0%, rgba(0,0,0,0) 65%)`
                  }}
                />

                {/* 2. CARD HEADER */}
                <div className="flex justify-between items-start z-10">
                  <div>
                    <span 
                      className="text-[10px] font-mono tracking-widest uppercase font-bold px-2.5 py-1 rounded-full text-white inline-block mb-2"
                      style={{ backgroundColor: flavor.themeColor }}
                    >
                      {flavor.colorName}
                    </span>
                    <h3 className="font-display font-black text-2xl uppercase tracking-tight">{flavor.name}</h3>
                  </div>

                  {/* Info Icon for Nutrition Fact sheet Toggle */}
                  <button
                    id={`toggle-nutrition-${flavor.id}`}
                    onClick={(e) => toggleNutrition(flavor.id, e)}
                    className={`p-2 rounded-full transition-all border outline-none ${
                      showNutrition 
                        ? "bg-brand-primary text-white border-brand-primary" 
                        : darkMode 
                          ? "hover:bg-zinc-800 border-zinc-800 text-zinc-400 hover:text-white" 
                          : "hover:bg-zinc-100 border-zinc-200 text-zinc-650 hover:text-zinc-900"
                    }`}
                    title="Nutrition Information"
                  >
                    <Info size={16} />
                  </button>
                </div>

                {/* 3. CENTER CONTENT (Dynamic transition between Flavor visual or Nutrition Fact Sheet) */}
                <div className="relative my-6 flex-grow flex items-center justify-center min-h-[200px] z-10">
                  {!showNutrition ? (
                    /* FLAVOR VIEW (Sleek container display mimicking the bottle contents) */
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-4"
                    >
                      {/* Interactive mock illustrative mini-card representing the soda can texture */}
                      <div 
                        className="relative w-28 h-44 mx-auto rounded-2xl flex flex-col justify-between py-4 shadow-xl overflow-hidden border border-white/10"
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${flavor.gradientFrom} 0%, ${flavor.gradientTo} 100%)`
                        }}
                      >
                        {/* Shimmer light bar across bottle */}
                        <div className="absolute inset-y-0 left-0 w-8 bg-white/10 skew-x-12 translate-x-[-100%] hover:translate-x-[300%] transition-transform duration-1000 pointer-events-none" />
                        <span className="text-[6px] tracking-widest text-white/50 font-mono uppercase">DR. PAPER</span>
                        <div className="text-white text-xs font-black uppercase tracking-widest italic -rotate-12 select-none py-1 bg-black/10">Sip</div>
                        <span className="text-[6px] tracking-widest text-zinc-300 font-mono uppercase">{flavor.highlights[1]}</span>
                      </div>
                      
                      <p className={`text-xs leading-relaxed max-w-xs mx-auto ${
                        darkMode ? "text-zinc-400" : "text-zinc-600"
                      }`}>
                        "{flavor.tagline}"
                      </p>
                    </motion.div>
                  ) : (
                    /* NUTRITION VIEW (Fact Sheet) */
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`w-full p-4 rounded-2xl border text-xs font-mono space-y-2.5 ${
                        darkMode ? "bg-zinc-900 text-zinc-300 border-zinc-800" : "bg-zinc-100 text-zinc-800 border-zinc-200"
                      }`}
                    >
                      <h4 className="font-bold border-b border-dashed border-zinc-700 pb-1 text-[10px] uppercase tracking-wider text-brand-primary-light">
                        Official Supplement Facts
                      </h4>
                      <div className="flex justify-between">
                        <span>Pack Calories:</span>
                        <span className="font-bold text-white bg-brand-primary px-1.5 py-0.5 rounded-sm">{flavor.nutrition.calories} kcal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sweetener:</span>
                        <span className="font-bold">{flavor.nutrition.sugar}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Electrolyte Sodium:</span>
                        <span>{flavor.nutrition.sodium}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Natural Caffeine:</span>
                        <span className="font-bold text-amber-500">{flavor.nutrition.caffeine}</span>
                      </div>
                      <div className="flex justify-between border-t border-dashed border-zinc-700 pt-1">
                        <span>Natural botanicals:</span>
                        <span className="text-emerald-500 text-[10px]">{flavor.nutrition.naturalIngredients}</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* 4. CARD FOOTER */}
                <div className="space-y-4 z-10 w-full">
                  {/* Highlights Bullet pills */}
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {flavor.highlights.map((hlt) => (
                      <span 
                        key={hlt} 
                        className={`text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full ${
                          darkMode ? "bg-zinc-800/80 text-zinc-300" : "bg-zinc-100 text-zinc-600 border border-zinc-200"
                        }`}
                      >
                        ✓ {hlt}
                      </span>
                    ))}
                  </div>

                  {/* BUY & SELECT BUTTON ROW */}
                  <div className="flex items-center gap-2">
                    {/* Select indicator */}
                    <button
                      id={`select-flavor-${flavor.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onFlavorSelect(flavor);
                      }}
                      className={`p-3 rounded-xl transition-all border outline-none ${
                        isSelected 
                          ? "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500 shadow-md" 
                          : darkMode 
                            ? "border-zinc-805 bg-zinc-950/40 text-zinc-400 hover:text-white hover:bg-zinc-800" 
                            : "border-zinc-200 bg-zinc-50 text-zinc-650 hover:text-zinc-900 hover:bg-zinc-150"
                      }`}
                      title={isSelected ? "Active flavor" : "Select as Active"}
                    >
                      {isSelected ? <Check size={16} /> : <span className="text-xs uppercase font-mono px-1">Fuse</span>}
                    </button>

                    {/* Quick Add to Cart of this flavor */}
                    <button
                      id={`buy-${flavor.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onOrderClick(flavor);
                      }}
                      className="flex-grow py-3 px-4 rounded-xl font-mono font-black text-xs uppercase tracking-wider text-white transition-all duration-300 flex items-center justify-center gap-1.5 border border-brand-primary bg-brand-primary hover:bg-brand-primary-light hover:shadow-lg hover:shadow-brand-primary/25 active:scale-[0.97]"
                    >
                      <ShoppingCart size={14} />
                      Order Flavor
                    </button>
                  </div>
                </div>

                {/* Selection Overlay Ribbon */}
                {isSelected && (
                  <div className="absolute top-[35px] right-[-35px] rotate-45 bg-amber-500 text-[8px] font-black tracking-widest text-black py-1 px-10 uppercase shadow-md pointer-events-none">
                    Selected
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
