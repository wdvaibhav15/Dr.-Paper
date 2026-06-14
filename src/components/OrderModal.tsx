import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Check, HelpCircle, ArrowRight, ShoppingCart, Tag, CheckCircle } from "lucide-react";
import { Flavor } from "../types";
import { FLAVORS } from "../data";

interface OrderModalProps {
  darkMode: boolean;
  isOpen: boolean;
  onClose: () => void;
  defaultFlavor: Flavor;
  onAddCartQty: (qty: number) => void;
  onShowMessage: (text: string) => void;
}

export default function OrderModal({
  darkMode,
  isOpen,
  onClose,
  defaultFlavor,
  onAddCartQty,
  onShowMessage,
}: OrderModalProps) {
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor>(defaultFlavor);
  const [packSize, setPackSize] = useState<"6" | "12" | "24">("12");
  
  // Buyer form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // Promo code variables
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  
  // Checkout Processing simulations
  const [checkingOut, setCheckingOut] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState<any | null>(null);

  if (!isOpen) return null;

  // Base configurations
  const pricing = {
    "6": 15.99,
    "12": 27.99, // Best Value
    "24": 48.99  // Maximum Savings
  };

  const activeBasePrice = pricing[packSize];
  const activePrice = appliedPromo ? Number((activeBasePrice * 0.85).toFixed(2)) : activeBasePrice;
  const savings = appliedPromo ? Number((activeBasePrice * 0.15).toFixed(2)) : 0;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === "UNLEASH15") {
      setAppliedPromo("UNLEASH15");
      onShowMessage("Promo code UNLEASH15 applied! Saving 15% immediately.");
    } else {
      onShowMessage("Unknown discount code. Try using 'UNLEASH15' for first-order discount.");
    }
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckingOut(true);

    // Simulate apothecary order bottling pipeline
    setTimeout(() => {
      setCheckingOut(false);
      const receipt = {
        orderId: `DRP-${Math.floor(100000 + Math.random() * 900000)}`,
        name,
        email,
        address,
        flavor: selectedFlavor.name,
        packs: packSize,
        price: activePrice,
        code: appliedPromo || "None",
        trackingId: `FEDEX-PAPER-${Math.floor(1000000 + Math.random() * 9000000)}`,
      };
      setOrderReceipt(receipt);
      onAddCartQty(Number(packSize));
      onShowMessage(`Order ${receipt.orderId} established successfully! Shipped details sent to your mailbox.`);
    }, 1800);
  };

  const handleReset = () => {
    setOrderReceipt(null);
    setName("");
    setEmail("");
    setAddress("");
    setPromoInput("");
    setAppliedPromo(null);
    onClose();
  };

  return (
    <div id="order-overlay-portal" className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-sm select-none overflow-y-auto">
      <div className="w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl relative my-8">
        
        {/* CLOSE CROSS OUTSIDE OR INSIDE WALL */}
        <button
          id="close-order-modal"
          onClick={handleReset}
          className={`absolute top-5 right-5 z-20 p-2.5 rounded-full border outline-none ${
            darkMode ? "bg-zinc-950/60 hover:bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white" : "bg-white/80 hover:bg-zinc-150 border-zinc-200 text-zinc-650"
          }`}
          title="Close portal"
        >
          <X size={16} />
        </button>

        {/* RECEIPT VIEW CONTAINER */}
        {orderReceipt ? (
          <div className={`p-8 md:p-14 text-center space-y-6 ${
            darkMode ? "bg-zinc-950 text-white" : "bg-white text-zinc-950"
          }`}>
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/25">
              <CheckCircle size={32} />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs uppercase text-zinc-550 block">Transaction Success</span>
              <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight">
                Order Confirmed!
              </h2>
              <p className={`text-xs md:text-sm max-w-md mx-auto ${
                darkMode ? "text-zinc-500" : "text-zinc-500"
              }`}>
                We've routed your receipt and solar shipping telemetry status directly to <span className="font-bold text-brand-primary-light">{orderReceipt.email}</span>.
              </p>
            </div>

            {/* Simulated Receipt specs block */}
            <div className={`max-w-md mx-auto p-6 rounded-2xl border font-mono text-xs text-left divide-y divide-zinc-800/10 space-y-3.5 ${
              darkMode ? "bg-zinc-900 text-zinc-300 border-zinc-800" : "bg-zinc-100 text-zinc-800 border-zinc-200"
            }`}>
              <div className="flex justify-between pb-3">
                <span className="text-zinc-500 uppercase font-black">Receipt No:</span>
                <span className="font-bold text-white bg-brand-primary px-1.5 rounded">{orderReceipt.orderId}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-zinc-500">Receiver Name:</span>
                <span className="font-bold">{orderReceipt.name}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-zinc-500">Formulation Selected:</span>
                <span className="font-bold text-brand-primary-light uppercase">{orderReceipt.flavor}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-zinc-500">Package Quantity:</span>
                <span className="font-bold">{orderReceipt.packs} Premium Cans</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-zinc-500">Applied Discount:</span>
                <span className="font-bold text-amber-500 uppercase">{orderReceipt.code}</span>
              </div>
              <div className="flex justify-between pt-3 text-sm">
                <span className="text-zinc-500 font-bold uppercase">Total Charges:</span>
                <span className="font-black text-brand-primary-light">${orderReceipt.price} USD</span>
              </div>
            </div>

            <div className="space-y-1 text-xs font-mono max-w-sm mx-auto">
              <span className="text-zinc-550 uppercase font-bold tracking-widest block">Estimated Arrival</span>
              <span className="text-emerald-500 font-black block text-sm">🚚 Direct Eco Van In 3-5 Hours</span>
              <span className="text-zinc-600 block text-[9px] mt-1">FedEx Reference: {orderReceipt.trackingId}</span>
            </div>

            <button
              id="receipt-return-home"
              onClick={handleReset}
              className="px-8 py-3.5 bg-brand-primary hover:bg-brand-primary-light text-white font-mono text-xs font-black tracking-wider uppercase rounded-xl transition-all cursor-pointer inline-block mt-4"
            >
              Return to Showcase
            </button>
          </div>
        ) : (
          /* CORE ORDERING CONFIGURATOR */
          <div className={`grid grid-cols-1 lg:grid-cols-12 ${
            darkMode ? "bg-zinc-950 text-white" : "bg-white text-zinc-950"
          }`}>
            
            {/* LEFT CONFIGURATION INTERACTIVE GRID (Flat panel) */}
            <div className={`lg:col-span-7 p-6 md:p-10 space-y-8 ${
              darkMode ? "lg:border-r border-zinc-900" : "lg:border-r border-zinc-200"
            }`}>
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold uppercase text-brand-primary-light tracking-widest block">
                  Canning Customizer
                </span>
                <h3 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight">
                  Design Your Package
                </h3>
              </div>

              {/* 1. SELECT FLAVOR */}
              <div className="space-y-3">
                <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                  Step 1: Choose Flavor Variant
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {FLAVORS.map((f) => {
                    const isFlavorActive = selectedFlavor.id === f.id;
                    return (
                      <button
                        key={f.id}
                        id={`modal-flavor-btn-${f.id}`}
                        onClick={() => setSelectedFlavor(f)}
                        className={`p-3 rounded-xl border text-left text-xs font-bold transition-all relative overflow-hidden flex flex-col justify-between h-20 outline-none cursor-pointer ${
                          isFlavorActive
                            ? "bg-brand-primary text-white border-brand-primary shadow-xl"
                            : darkMode
                              ? "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                              : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100/80"
                        }`}
                      >
                        <span className="block leading-none uppercase tracking-tight font-display">{f.name.replace("Dr. Paper", "").trim()}</span>
                        <span className="block text-[8px] font-mono text-zinc-400 mt-1 uppercase font-light truncate">{f.tagline}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. SELECT PACK SIZE */}
              <div className="space-y-3">
                <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                  Step 2: Choose Carton Package Size
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "6", title: "6-Pack Case", sub: "Sampler Box", price: "$15.99" },
                    { id: "12", title: "12-Pack Crate", sub: "Most Popular", price: "$27.99" },
                    { id: "24", title: "24-Pack Vault", sub: "Best Savings", price: "$48.99" }
                  ].map((p) => {
                    const isPackActive = packSize === p.id;
                    return (
                      <button
                        key={p.id}
                        id={`modal-pack-btn-${p.id}`}
                        onClick={() => setPackSize(p.id as any)}
                        className={`p-4 rounded-xl border text-left transition-all outline-none cursor-pointer flex flex-col justify-between ${
                          isPackActive
                            ? "border-brand-primary bg-brand-primary-light/5 shadow-md"
                            : darkMode
                              ? "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-850"
                              : "bg-zinc-50 border-zinc-200 text-zinc-750 hover:bg-zinc-100"
                        }`}
                      >
                        <div>
                          <span className="font-display font-black text-sm uppercase block">{p.title}</span>
                          <span className="text-[9px] font-mono text-zinc-505 block mt-0.5">{p.sub}</span>
                        </div>
                        <span className="font-mono font-black text-sm text-brand-primary-light block mt-3">{p.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. INPUT SHP DETAILS */}
              <form onSubmit={handleCreateOrder} className="space-y-4 pt-2">
                <label className="font-mono text-[10px] text-zinc-505 uppercase tracking-widest block">
                  Step 3: Delivery Credentials
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Recipient Real Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-xs outline-none transition-all ${
                      darkMode 
                        ? "bg-zinc-900 border-zinc-800 text-white focus:border-brand-primary" 
                        : "bg-zinc-50 border-zinc-305 focus:border-brand-primary"
                    }`}
                  />
                  <input
                    type="email"
                    placeholder="Email handles"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-xs outline-none transition-all ${
                      darkMode 
                        ? "bg-zinc-900 border-zinc-801 text-white focus:border-brand-primary" 
                        : "bg-zinc-50 border-zinc-305 focus:border-brand-primary"
                    }`}
                  />
                </div>
                
                <input
                  type="text"
                  placeholder="Shipping street addresses..."
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-xs outline-none transition-all ${
                    darkMode 
                      ? "bg-zinc-900 border-zinc-801 text-white focus:border-brand-primary" 
                      : "bg-zinc-50 border-zinc-305 focus:border-brand-primary"
                  }`}
                />

                <button
                  type="submit"
                  disabled={checkingOut}
                  className="w-full py-4 bg-brand-primary hover:bg-brand-primary-light text-white font-mono font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg hover:shadow-xl hover:shadow-brand-primary/30 flex items-center justify-center gap-2 overflow-hidden select-none active:scale-[0.98] cursor-pointer"
                >
                  {checkingOut ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Bottling Fresh telemetry...
                    </span>
                  ) : (
                    <>
                      <ShoppingCart size={15} /> Confirm dispatch & order
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* RIGHT SIDE CART TICKET SUMMARY CARD */}
            <div className={`lg:col-span-5 p-6 md:p-10 flex flex-col justify-between ${
              darkMode ? "bg-zinc-900/50" : "bg-zinc-100/50"
            }`}>
              <div className="space-y-6">
                <h4 className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-dashed border-zinc-700/20 pb-2">
                  Dispatch Summary
                </h4>

                {/* Flavor highlights card */}
                <div className={`p-4 rounded-xl flex gap-3 items-center border ${
                  darkMode ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-200"
                }`}>
                  <div 
                    className="w-12 h-18 rounded-lg flex flex-col justify-center text-center font-mono font-black border border-white/5"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${selectedFlavor.gradientFrom} 0%, ${selectedFlavor.gradientTo} 100%)`
                    }}
                  >
                    <span className="text-[5px] text-white/50 tracking-wider">SIP</span>
                    <span className="text-[7px] text-white">DR.P</span>
                  </div>
                  <div>
                    <h5 className="font-display font-black text-sm uppercase leading-tight">{selectedFlavor.name}</h5>
                    <span className="text-[10px] font-mono text-brand-primary-light uppercase font-bold tracking-wider block mt-0.5">{selectedFlavor.colorName}</span>
                    <span className="text-[9px] block text-zinc-500 font-mono italic mt-1 font-light">"{selectedFlavor.tagline}"</span>
                  </div>
                </div>

                {/* PROMO DISCOUNT CONTAINER */}
                <div className="space-y-2">
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block">Have referral or coupon code?</span>
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Insert code (e.g. UNLEASH15)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className={`flex-grow px-3 py-2.5 rounded-lg border text-xs outline-none uppercase transition-all ${
                        darkMode 
                          ? "bg-zinc-950 border-zinc-800 text-white focus:border-brand-primary" 
                          : "bg-white border-zinc-300 focus:border-brand-primary"
                      }`}
                    />
                    <button
                      type="submit"
                      className="px-4 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase rounded-lg tracking-wider transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                  {appliedPromo && (
                    <span className="text-[10px] text-emerald-500 font-mono font-bold flex items-center gap-1">
                      ✓ Discount Code applied (15% Saved)
                    </span>
                  )}
                </div>

                {/* Detailed pricing math panel */}
                <div className="space-y-3 font-mono text-xs border-t border-dashed border-zinc-700/20 pt-4 text-zinc-500">
                  <div className="flex justify-between">
                    <span>Carton Sampling Price:</span>
                    <span className="text-zinc-300 font-bold">${activeBasePrice}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-emerald-500">
                      <span>Vanguard Savings (15%):</span>
                      <span>-${savings}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Direct Solar Shipping:</span>
                    <span className="text-emerald-500 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between border-t border-zinc-850 pt-3 text-sm">
                    <span className="font-bold uppercase text-zinc-400">Bottled Total:</span>
                    <span className="font-black text-brand-primary-light">${activePrice} USD</span>
                  </div>
                </div>
              </div>

              {/* Secure seal metadata */}
              <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest text-center mt-6 pt-4 border-t border-zinc-800/20 flex justify-center gap-3">
                <span>📋 micro-tested OK</span>
                <span>•</span>
                <span>🔒 Secure checkout</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
