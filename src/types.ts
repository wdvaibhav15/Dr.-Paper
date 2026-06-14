export interface Flavor {
  id: string;
  name: string;
  colorName: string;
  themeColor: string; // Tailwind hex or class color
  gradientFrom: string; // for canvas backgrounds
  gradientTo: string;
  canColor: string; // main cylinder color
  rimColor: string; // top/bottom rim color or accent
  accentColor: string; // accent color for logos
  textColor: string;
  description: string;
  tagline: string;
  nutrition: {
    calories: number;
    sugar: string;
    sodium: string;
    caffeine: string;
    naturalIngredients: string;
  };
  highlights: string[];
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon node name
}

export interface ExperienceStep {
  id: number;
  title: string;
  description: string;
  hotspotX: number; // Percent relative to image/experience container
  hotspotY: number;
  phase: string;
  detail: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
  badge: string;
  verified: boolean;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface ComparisonRow {
  feature: string;
  drPaper: string;
  drPaperBetter: boolean;
  ordinarySoda: string;
}
