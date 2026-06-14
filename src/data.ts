import { Flavor, Benefit, ExperienceStep, Review, Faq, TimelineEvent, ComparisonRow } from "./types";

export const FLAVORS: Flavor[] = [
  {
    id: "classic",
    name: "Classic Dr. Paper",
    colorName: "Cherry Crimson",
    themeColor: "#800020", // Deep Burgundy
    gradientFrom: "#ab1532", // Bright Ruby Red
    gradientTo: "#32000a", // Deep shadow blackred
    canColor: "#50000a",
    rimColor: "#d4d4d8", // Silver Chrome rim
    accentColor: "#f4f4f5", // Electric white letters
    textColor: "#ffffff",
    tagline: "The Legendary Original Blend.",
    description: "Dr. Paper's signature recipe: an unreplicable, proprietary carbonated potion refined across generations. Bold, rich, with the perfect energetic spice bite that lingers just long enough.",
    nutrition: {
      calories: 140,
      sugar: "38g (Pure Cane)",
      sodium: "45mg",
      caffeine: "60mg (Green Coffee Extract)",
      naturalIngredients: "98% (Real botanicals, no fake phosphoric acid)"
    },
    highlights: ["23 Botanicals", "Real Cane Sugar", "Antioxidant Kick"]
  },
  {
    id: "cherry-blast",
    name: "Cherry Blast",
    colorName: "Vibrant Cherry Neon",
    themeColor: "#cc103c",
    gradientFrom: "#ff2c60",
    gradientTo: "#500918",
    canColor: "#6b0519",
    rimColor: "#e4e4e7",
    accentColor: "#ffffff",
    textColor: "#ffe4e6",
    tagline: "Unleash the Fruit Explosion.",
    description: "Amplified clean cherry profiles packed with structural sour notes and a bubbly velocity. Uncap maximum energy, high hydration, and premium fruit energy.",
    nutrition: {
      calories: 135,
      sugar: "36g (Natural Juice)",
      sodium: "40mg",
      caffeine: "65mg (Guarana Seed Extract)",
      naturalIngredients: "99% (All natural cherries, elderberry color)"
    },
    highlights: ["10% Real Juice", "Guarana Energy Boost", "Zero Red Dye 40"]
  },
  {
    id: "vanilla-rush",
    name: "Vanilla Rush",
    colorName: "Golden Cream Velvet",
    themeColor: "#c99a3a",
    gradientFrom: "#dec07a",
    gradientTo: "#472807",
    canColor: "#3d1d03",
    rimColor: "#fcd34d", // Gold rim
    accentColor: "#fef08a",
    textColor: "#ffffff",
    tagline: "Classic Meets Smooth Velvet.",
    description: "A velvety, caramelized infusion of roasted Madagascar vanilla pods floating inside our sparkling botanical base. Pure liquid gold.",
    nutrition: {
      calories: 145,
      sugar: "39g (Organic Agave)",
      sodium: "45mg",
      caffeine: "55mg (Organic Black Tea)",
      naturalIngredients: "100% (Madagascar vanilla absolute, real cream extraction)"
    },
    highlights: ["Real Vanilla Pods", "Luxurious Velvet Mouthfeel", "Organic Sweeteners"]
  },
  {
    id: "zero-sugar",
    name: "Zero Sugar",
    colorName: "Matte Cosmic Black",
    themeColor: "#18181b",
    gradientFrom: "#3f3f46",
    gradientTo: "#09090b",
    canColor: "#111111",
    rimColor: "#ffffff",
    accentColor: "#ef4444", // Neon red accents
    textColor: "#ffffff",
    tagline: "Infinite Flavor. Absolute Zero.",
    description: "Zero glucose spike. Absolute flavor volume. Crafted with a dynamic blend of organic stevia leaf extract, monk fruit, and deep mineral carbonation.",
    nutrition: {
      calories: 0,
      sugar: "0g (Monk fruit + Stevia)",
      sodium: "35mg",
      caffeine: "60mg (Yerba Mate Extract)",
      naturalIngredients: "95% (Keto-approved plant sweeteners)"
    },
    highlights: ["0 Calories / 0 Sugar", "Yerba Mate Infusion", "Ketogenic Approved"]
  },
  {
    id: "tropical",
    name: "Tropical Fusion",
    colorName: "Pacific Sunset Teal",
    themeColor: "#0f766e",
    gradientFrom: "#2dd4bf",
    gradientTo: "#115e59",
    canColor: "#0d5c56",
    rimColor: "#99f6e4",
    accentColor: "#fcd34d",
    textColor: "#ffffff",
    tagline: "A Sunset in Every Sip.",
    description: "Crisp tropical trade winds meet carbonated cherry bliss. Swirls of ripe passionfruit, sweet mango, crushed blood orange, and key lime oils.",
    nutrition: {
      calories: 130,
      sugar: "34g (Natural Fruit nectar)",
      sodium: "38mg",
      caffeine: "65mg (Green Tea extract)",
      naturalIngredients: "99% (Cold pressed mango and passionfruit)"
    },
    highlights: ["Cold Pressed Fruits", "Electrolyte Boosted", "Summertime Vibe"]
  },
  {
    id: "cosmic-space",
    name: "Cosmic Space",
    colorName: "Supernova Orchid",
    themeColor: "#581c87",
    gradientFrom: "#8b5cf6",
    gradientTo: "#1e1b4b",
    canColor: "#2e1065",
    rimColor: "#ddd6fe",
    accentColor: "#67e8f9",
    textColor: "#ffffff",
    tagline: "Blast Off to the Edge.",
    description: "Our hyper-limited edition release. Infused with galaxy berry oils (blackcurrant, huckleberry) and an organic mineral blend.",
    nutrition: {
      calories: 120,
      sugar: "29g (Wild Berry pulp)",
      sodium: "50mg",
      caffeine: "75mg (Focus CoQ10 matrix)",
      naturalIngredients: "99% (True black violet extracts, ionic trace minerals)"
    },
    highlights: ["Space Berry Essence", "CoQ10 Cognitive Focus", "Ultra-Limited Batch"]
  }
];

export const BENEFITS: Benefit[] = [
  {
    id: "taste",
    title: "Signature Botanical Blend",
    description: "We cold-steep 23 hand-picked botanicals, extracts, and oils to achieve a satisfyingly layered punch that chemical synthetic sodas cannot replicate.",
    icon: "Sparkles"
  },
  {
    id: "ingredients",
    title: "Eco Clean Ingredients",
    description: "NO high-fructose corn syrup, NO red dye 40, NO toxic phosphoric acid. Sweetened only by pure cane sugar, monk fruit, and native mountain agave.",
    icon: "Flower"
  },
  {
    id: "energy",
    title: "Sustained Herbal Energy",
    description: "Guarana seeds, Yerba mate, and green coffee beans provide high-alert mental performance and steady clean focus without a classic sugar crash.",
    icon: "Zap"
  },
  {
    id: "low-sugar",
    title: "Low Glucose Options",
    description: "Our Keto-verified Zero Sugar series relies on clean Monk Fruit and Stevia extracts which taste authentic without dynamic blood glucose spikes.",
    icon: "Heart"
  },
  {
    id: "packaging",
    title: "Infinite Recyclability",
    description: "Packaged in ultra-light infinite-loop brushed aluminum cans that cool down in seconds and are fully melted down, rebuilt, and back on shelves in 45 days.",
    icon: "Eco"
  },
  {
    id: "quality",
    title: "Micro-Batch Quality Tested",
    description: "Every single delivery run undergoes extensive sensory panel testing and high-resolution laboratory assays to guarantee perfect taste consistency.",
    icon: "CheckCircle"
  }
];

export const EXPERIENCE_STEPS: ExperienceStep[] = [
  {
    id: 1,
    title: "Botanical Harvesting",
    description: "Our team sources premium, chemical-free cherry bark, roasted vanilla beans, cardamon, and active ginger roots under sustainable agroforestry contracts.",
    hotspotY: 30,
    hotspotX: 18,
    phase: "Phase 1: Sourcing",
    detail: "Hand-sorted and gently transport-cooled to preserve vital flavoring ethers."
  },
  {
    id: 2,
    title: "Cold-Infusion Extracting",
    description: "Instead of high-pressure boiling which ruins essential aromatic complex oils, we cold-steep our botanicals in double-purified rain-filtration barrels for 72 hours.",
    hotspotY: 52,
    hotspotX: 42,
    phase: "Phase 2: Mashing",
    detail: "Brings forward layered scent profiles and micro-nutrients."
  },
  {
    id: 3,
    title: "Micro-Bubble Carbonation",
    description: "We use hyper-pressure injectors to force ultra-fine, champagne-sized carbon dioxide micro-bubbles into the beverage. Creates that distinct, prickly premium carbonated bite.",
    hotspotY: 28,
    hotspotX: 75,
    phase: "Phase 3: Fission",
    detail: "Fine bubbles preserve structural taste longer in open cups."
  },
  {
    id: 4,
    title: "Nitrogen Cap Sealing",
    description: "Immediately after pouring into cold aluminum cans, each can is pressurized with a trace drop of inert food-grade Nitrogen gas to keep flavor perfectly preserved.",
    hotspotY: 78,
    hotspotX: 55,
    phase: "Phase 4: Canning",
    detail: "Prevents flavor-ruining oxygen from reacting with raw botanical ingredients."
  },
  {
    id: 5,
    title: "Direct Solar Dispatch",
    description: "Shipped directly to distributors inside state-of-the-art electric delivery vans powered by local community solar grids. Flavor revolution right to your door with zero trace footprint.",
    hotspotY: 90,
    hotspotX: 85,
    phase: "Phase 5: Delivery",
    detail: "Fully carbon offset logistics chains."
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev1",
    name: "Sebastian Vance",
    role: "Competitive FPS Esports Gamer",
    rating: 5,
    comment: "Cherry Blast changed how I play. The steady caffeine energy from Yerba Mate and Guarana keeps my reaction time pristine during 8 hours of competitive streaming. And it tastes legendary!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    badge: "Verified Esports Professional",
    verified: true
  },
  {
    id: "rev2",
    name: "Dr. Alisha Thorne",
    role: "Surgical Medical Resident",
    rating: 5,
    comment: "I used to drink ordinary cola during 36-hour clinical shifts, only to suffer agonizing sugar crashes. Zero Sugar Dr. Paper provides clean, sustained cellular energy without synthetic food dyes. Absolute lifesaver directly inside my scrubs.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    badge: "Medical Practitioner",
    verified: true
  },
  {
    id: "rev3",
    name: "Malik Jenkins",
    role: "Vibrant Lifestyle Photographer",
    rating: 5,
    comment: "You look at the packaging design and it screams premium modern art. But the taste - especially Vanilla Rush with that rich velvet finish - is otherworldly! I shared a case on TikTok and my video hit 2 million views in 3 days.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    badge: "Media Creator",
    verified: true
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: "2024",
    title: "The Botanical Pharmacy Lab",
    description: "In a backyard workshop in Austin, Texas, a group of food scientists and botanists grew weary of artificial chemical sodas. They set out to hand-blend 23 secret, natural herbs, aiming to restore dignity to soft drinks."
  },
  {
    year: "2025",
    title: "The Underground Soda Cult",
    description: "Distributed solely in unmarked glass bottles to secret speakeasy bars, gamers, and local gyms, word exploded. 'The Paper beverage' became a highly coveted street legend, commanding $20 per single-can auction."
  },
  {
    year: "2026",
    title: "Entering The Global Revolution",
    description: "Dr. Paper officially scales worldwide. Merging Apple's engineering aesthetics with Red Bull's culture, we deploy ultra-modern, fully recyclable aluminum cans, ready to claim the ultimate craft crown."
  }
];

export const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: "Sweetener Source",
    drPaper: "Raw Cane Sugar, Agave, or Monk Fruit",
    drPaperBetter: true,
    ordinarySoda: "High-Fructose Corn Syrup (HFCS)"
  },
  {
    feature: "Active Ingredients",
    drPaper: "23 Natural Cold-Infused Botanicals",
    drPaperBetter: true,
    ordinarySoda: "Carbonated Water + Phosphoric Acid"
  },
  {
    feature: "Energy Engine",
    drPaper: "Guarana Seed, Yerba Mate, Green Coffee",
    drPaperBetter: true,
    ordinarySoda: "Synthetic Anhydrous Caffeine"
  },
  {
    feature: "Synthetic Colorings",
    drPaper: "Zero (Colored only by elderberry & beets)",
    drPaperBetter: true,
    ordinarySoda: "Red Dye 40, Caramel IV (Sulfites/Ammonia)"
  },
  {
    feature: "Aluminum Can Cycle",
    drPaper: "Lightweight Brushed Metal (Infinite recycling)",
    drPaperBetter: true,
    ordinarySoda: "Thick plastic bottles or heavy raw metals"
  },
  {
    feature: "Sugar Crash",
    drPaper: "Zero. Slowly metabolized complex carbs",
    drPaperBetter: true,
    ordinarySoda: "Severe crash with extreme fatigue in 45 min"
  }
];

export const FAQS: Faq[] = [
  {
    id: "faq1",
    question: "Why is it named Dr. Paper?",
    answer: "Historically, old apothecary formulas and botanical recipes were recorded on fibrous botanical parchment or 'paper.' The name honors those ancient handwritten potion archives while delivering a crisp, modern punch."
  },
  {
    id: "faq2",
    question: "What exactly are the 23 secret botanicals?",
    answer: "While we guard the precise ratio, the primary flavor notes are crafted from cherry bark, vanilla beans, crushed cardamon pod, nutmeg, active ginger root, sweet orange peel, star anise, and native sarsaparilla."
  },
  {
    id: "faq3",
    question: "Do you ship worldwide?",
    answer: "Yes! We ship directly to your door in custom-insulated eco-packs. All delivery runs are fully carbon-offset, shipping from regional micro-breweries to maintain optimal freshness."
  },
  {
    id: "faq4",
    question: "Is Zero Sugar Dr. Paper safe for Keto diets?",
    answer: "Absolutely. Zero Sugar Dr. Paper contains exactly 0% sugar and net 0 grams of carbohydrates. We sweeten it using monk fruit and high-grade organic stevia leaf extracts which do not stimulate insulin spiking."
  },
  {
    id: "faq5",
    question: "What makes your cans 'Infinite Loop' aluminum?",
    answer: "Dr. Paper aluminum cans are constructed using ultra-purified structural alloys designed for infinite melting operations with zero composite breakdown. Once discarded in recycling, the can is re-made and filled on average in under 45 days!"
  }
];
