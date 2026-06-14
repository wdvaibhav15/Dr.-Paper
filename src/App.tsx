import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, BellRing, Sparkles } from "lucide-react";

import { Flavor } from "./types";
import { FLAVORS } from "./data";

// Component imports
import AppHeader from "./components/AppHeader";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import FlavorShowcase from "./components/FlavorShowcase";
import BenefitCards from "./components/BenefitCards";
import ProductExperience from "./components/ProductExperience";
import SocialProof from "./components/SocialProof";
import BrandStory from "./components/BrandStory";
import Comparison from "./components/Comparison";
import LimitedEdition from "./components/LimitedEdition";
import CommunitySocial from "./components/CommunitySocial";
import FaqSection from "./components/FaqSection";
import LeadPopup from "./components/LeadPopup";
import OrderModal from "./components/OrderModal";
import Footer from "./components/Footer";

export default function App() {
  // 1. GLOBAL STATES
  const [darkMode, setDarkMode] = useState(true);
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor>(FLAVORS[0]);
  const [cartCount, setCartCount] = useState(0);
  
  // Modals representation
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [modalPreselectedFlavor, setModalPreselectedFlavor] = useState<Flavor>(FLAVORS[0]);
  
  // Custom floating transient alert notices
  const [floatingToast, setFloatingToast] = useState<string | null>(null);

  // Auto-dark/light body background setting
  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add("bg-zinc-950");
      body.classList.remove("bg-white");
    } else {
      body.classList.add("bg-white");
      body.classList.remove("bg-zinc-950");
    }
  }, [darkMode]);

  // Toast helper triggers
  const triggerToast = (message: string) => {
    setFloatingToast(message);
    // cancel existing timers if any, then dismiss after 3.2 seconds
    const timer = setTimeout(() => {
      setFloatingToast(null);
    }, 4000);
    return () => clearTimeout(timer);
  };

  const handleOrderClickForFlavor = (flavor: Flavor) => {
    setModalPreselectedFlavor(flavor);
    setCheckoutModalOpen(true);
  };

  const handleIncrementCartQuantity = (qty: number) => {
    setCartCount((prev) => prev + 1); // Increment cart icon count
  };

  return (
    <div className={`relative transition-colors duration-300 ${
      darkMode ? "bg-zinc-950 text-white dark" : "bg-white text-zinc-900"
    }`}>
      
      {/* 2. DYNAMIC MOUSE CURSOR GLOW ACCENT */}
      <div 
        className="fixed w-[600px] h-[600px] pointer-events-none z-40 cursor-glow -translate-x-1/2 -translate-y-1/2 rounded-full hidden md:block" 
        style={{
          left: "50vw",
          top: "40vh"
        }}
      />

      {/* 3. BRAND NAVIGATION APPARATUS */}
      <AppHeader
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        cartCount={cartCount}
        onCartClick={() => {
          setModalPreselectedFlavor(selectedFlavor);
          setCheckoutModalOpen(true);
        }}
        onContactClick={() => {
          setModalPreselectedFlavor(selectedFlavor);
          setCheckoutModalOpen(true);
        }}
      />

      {/* 4. MAIN LANDING SECTIONS ARRAY */}
      <main className="relative z-10">
        
        {/* SECTION A: HERO LANDING FIELD */}
        <Hero
          darkMode={darkMode}
          flavor={selectedFlavor}
          onExploreFlavors={() => {
            const flavorsSection = document.getElementById("flavors");
            if (flavorsSection) {
              flavorsSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
          onBuyClick={() => handleOrderClickForFlavor(selectedFlavor)}
        />

        {/* SECTION B: TRUST COUNTER FLAGS BAR */}
        <TrustBar darkMode={darkMode} />

        {/* SECTION C: THE 6 FLAVOR COLLECTION ACCORDION GLASS CARDS */}
        <FlavorShowcase
          darkMode={darkMode}
          selectedFlavor={selectedFlavor}
          onFlavorSelect={(flavor) => {
            setSelectedFlavor(flavor);
            triggerToast(`Synchronized active flavor to ${flavor.name}! Feel free to scroll up and rotate.`);
          }}
          onOrderClick={handleOrderClickForFlavor}
        />

        {/* SECTION D: STAGGERED WHY DR PAPER HIGHLIGHT CELLS */}
        <BenefitCards darkMode={darkMode} />

        {/* SECTION E: HOTSPOT EXPERIENTIAL FLOW STORYBOARD */}
        <ProductExperience darkMode={darkMode} />

        {/* SECTION F: MARQUEE SCROLLS AND REVIEWS SLIDERS AND UGC */}
        <SocialProof darkMode={darkMode} />

        {/* SECTION G: SODA APOTHECARY YEAR HISTORY PATH */}
        <BrandStory darkMode={darkMode} />

        {/* SECTION H: MATRIX COMPARISON LOG TABLE */}
        <Comparison darkMode={darkMode} />

        {/* SECTION I: COSMIC SPACE countdown release drops */}
        <LimitedEdition
          darkMode={darkMode}
          cosmicFlavor={FLAVORS[5]}
          onOrderClick={handleOrderClickForFlavor}
        />

        {/* SECTION J: GUEST ADVOCACY REGISTERS & SHARING */}
        <CommunitySocial darkMode={darkMode} onShowMessage={triggerToast} />

        {/* SECTION K: FREQUENT ACCORDION QUESTIONS */}
        <FaqSection darkMode={darkMode} />

      </main>

      {/* 5. DIRECT DISPATCH FOOTERS */}
      <Footer darkMode={darkMode} onShowMessage={triggerToast} />

      {/* 6. CONVERSION MODALS & POPUPS */}
      {/* Exit Intent detection popups */}
      <LeadPopup darkMode={darkMode} onShowMessage={triggerToast} />

      {/* Direct checkout customizer config */}
      <OrderModal
        darkMode={darkMode}
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        defaultFlavor={modalPreselectedFlavor}
        onAddCartQty={handleIncrementCartQuantity}
        onShowMessage={triggerToast}
      />

      {/* 7. DYNAMIC TRANSIENT FLOATING ALERT NOTICE TOAST */}
      <AnimatePresence>
        {floatingToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl border shadow-xl flex items-center gap-3.5 max-w-sm border-brand-primary-light/30 ${
              darkMode ? "bg-zinc-950 text-white" : "bg-white text-zinc-900 border-zinc-200"
            }`}
          >
            <div className="p-2 bg-brand-primary/10 rounded-xl text-brand-primary-light h-fit animate-pulse">
              <BellRing size={16} />
            </div>
            <div className="flex-grow space-y-0.5 text-left">
              <span className="font-mono text-[9px] uppercase tracking-wider text-brand-primary-light block font-extrabold">Apothecary Dispatch</span>
              <p className="text-xs leading-relaxed font-sans">{floatingToast}</p>
            </div>
            <button 
              onClick={() => setFloatingToast(null)}
              className="p-1 hover:bg-zinc-800 rounded text-zinc-400 outline-none"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
