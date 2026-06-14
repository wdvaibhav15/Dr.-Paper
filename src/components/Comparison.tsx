import { motion } from "motion/react";
import { Check, X, ShieldCheck, Flame, Scale } from "lucide-react";
import { COMPARISON_DATA } from "../data";

interface ComparisonProps {
  darkMode: boolean;
}

export default function Comparison({ darkMode }: ComparisonProps) {
  return (
    <section 
      id="comparison" 
      className={`relative py-24 md:py-32 overflow-hidden ${
        darkMode ? "bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-950"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-brand-primary-light bg-brand-primary-light/10 border border-brand-primary-light/20">
            <Scale size={13} /> Side-By-Side Formula Audit
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight uppercase">
            No Comparison. <span className="text-brand-primary-light">Period.</span>
          </h2>
          <p className={`text-base md:text-lg max-w-xl mx-auto ${
            darkMode ? "text-zinc-400" : "text-zinc-650"
          }`}>
            We audited ordinary carbonated sugar-water sodas directly against the organic Dr. Paper formulation sheet. Here's exactly why we lead.
          </p>
        </div>

        {/* COMPARISON CARDS / BOARD */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-16">
          {/* DR. PAPER COLUMN CARD */}
          <div className={`p-8 rounded-3xl border-2 relative overflow-hidden flex flex-col justify-between ${
            darkMode 
              ? "bg-zinc-900/60 border-brand-primary-light shadow-2xl" 
              : "bg-white border-brand-primary-light shadow-xl"
          }`}>
            <div className="absolute top-[20px] right-[20px] px-3.5 py-1.5 bg-brand-primary text-white text-[9px] font-black tracking-widest uppercase rounded-full">
              Ultimate Craft Standard
            </div>

            <div>
              <h3 className="font-display font-black text-3xl uppercase tracking-tight mb-2 text-brand-primary-light">
                Dr. Paper
              </h3>
              <p className={`text-sm mb-6 ${
                darkMode ? "text-zinc-400" : "text-zinc-650"
              }`}>
                A nutrient-dense botanical infusion crafted to sustain energy levels, boost cell hydration, and satisfy complex organic taste receptors.
              </p>

              {/* Mini benefit bullet points */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-500 mt-0.5">
                    <Check size={14} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm uppercase">23 Cold-Infused Botanicals</h5>
                    <p className="text-xs text-zinc-500">Pure vanilla pods, cherry bark, sarsaparilla, active ginger, nutmeg.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-500 mt-0.5">
                    <Check size={14} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm uppercase">Steady Energy Velocity</h5>
                    <p className="text-xs text-zinc-500">Powered by organic Yerba Mate, Guarana, and natural green coffee seed extract.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-500 mt-0.5">
                    <Check size={14} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm uppercase">Keto Friendly / Real Cane</h5>
                    <p className="text-xs text-zinc-500">Zero corn syrups. Formulated for steady complex carbohydrate absorption.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* ORDINARY SODA COLUMN CARD */}
          <div className={`p-8 rounded-3xl border flex flex-col justify-between ${
            darkMode 
              ? "glassmorphism opacity-75 border-zinc-900" 
              : "bg-zinc-150/40 border-zinc-200 opacity-85"
          }`}>
            <div>
              <h3 className="font-display font-black text-3xl uppercase tracking-tight mb-2 text-zinc-500">
                Ordinary Sugar-Water
              </h3>
              <p className={`text-sm mb-6 ${
                darkMode ? "text-zinc-500" : "text-zinc-500"
              }`}>
                An industrial assembly of chemical powders dissolved in hyper-concentrated fructose syrup with synthetic color dyes.
              </p>

              {/* Chemical warning bullet points */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-red-500/10 text-red-500 mt-0.5">
                    <X size={14} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm uppercase text-zinc-500">Liquid Corn Syrup</h5>
                    <p className="text-xs text-zinc-500">Drives insulin spikes, cellular inflaming, and instant liver fat load.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-red-500/10 text-red-500 mt-0.5">
                    <X size={14} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm uppercase text-zinc-500">Phosphoric Chemical Acid</h5>
                    <p className="text-xs text-zinc-500">Industrial acid used to mimic bite, which dissolves calcium in skeletal bones.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-red-500/10 text-red-500 mt-0.5">
                    <X size={14} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm uppercase text-zinc-500">Red Dye 40 & Caramel IV</h5>
                    <p className="text-xs text-zinc-500">Toxic synthetic colorings proven to trigger hyper-activity in youngsters.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* HIGH SPEC LEVEL COMPARISON MATRIX TABLE (Fully Responsive) */}
        <div className={`rounded-3xl border overflow-hidden ${
          darkMode ? "bg-zinc-950 border-zinc-800 shadow-xl" : "bg-white border-zinc-200 hover:shadow-xl shadow-zinc-100"
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className={`border-b text-[10px] uppercase tracking-wider ${
                  darkMode ? "bg-zinc-900 border-zinc-800 text-zinc-400" : "bg-zinc-100 border-zinc-200 text-zinc-650"
                }`}>
                  <th className="p-5">Audited Feature</th>
                  <th className="p-5 text-brand-primary-light font-black">Dr. Paper Formula</th>
                  <th className="p-5 text-zinc-400">Ordinary Chemical Cola</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/20">
                {COMPARISON_DATA.map((row, idx) => (
                  <tr 
                    key={row.feature} 
                    className={`transition-colors ${
                      darkMode ? "hover:bg-zinc-900/10" : "hover:bg-zinc-100/50"
                    }`}
                  >
                    <td className="p-5 font-sans font-bold uppercase">{row.feature}</td>
                    <td className="p-5 text-emerald-500 font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {row.drPaper}
                    </td>
                    <td className="p-4 text-zinc-500">
                      {row.ordinarySoda}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
