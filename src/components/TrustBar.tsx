import { useState, useEffect, useRef } from "react";
import { Award, Users, ShieldCheck, Heart } from "lucide-react";

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ target, suffix = "", duration = 1500 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Standard Intersection Observer to trigger counting solely when stats scroll into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(percentage * target));

      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    
    requestAnimationFrame(step);
  }, [hasStarted, target, duration]);

  return (
    <span ref={ref} className="font-display font-black text-4xl md:text-5xl tracking-tight text-white tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

interface TrustBarProps {
  darkMode: boolean;
}

export default function TrustBar({ darkMode }: TrustBarProps) {
  const stats = [
    {
      id: "stat1",
      target: 54,
      suffix: "M+",
      label: "Cans Served",
      subText: "Active global distribution",
      icon: <Users className="text-brand-primary-light" size={24} />
    },
    {
      id: "stat2",
      target: 99,
      suffix: "%",
      label: "Satisfaction Rate",
      subText: "Loved for taste & energy",
      icon: <Heart className="text-brand-primary-light animate-pulse" size={24} />
    },
    {
      id: "stat3",
      target: 23,
      suffix: "",
      label: "Botanical Extracts",
      subText: "Crafted micro-blend",
      icon: <Award className="text-brand-primary-light" size={24} />
    },
    {
      id: "stat4",
      target: 142,
      suffix: "+",
      label: "Cities Reached",
      subText: "Sustainable solar shipping",
      icon: <ShieldCheck className="text-brand-primary-light" size={24} />
    }
  ];

  return (
    <section 
      id="trust-bar" 
      className={`relative py-12 md:py-16 ${
        darkMode 
          ? "bg-zinc-950/80 border-y border-white/5" 
          : "bg-zinc-100 border-y border-zinc-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((item) => (
            <div 
              key={item.id}
              className={`flex flex-col items-center lg:items-start text-center lg:text-left space-y-2 p-6 rounded-2xl transition-all duration-300 hover:translate-y-[-4px] ${
                darkMode ? "bg-zinc-900/40 hover:bg-zinc-900/70" : "bg-white hover:shadow-xl shadow-zinc-200/50"
              }`}
            >
              {/* Stat Icon Wrapper */}
              <div className={`p-3 rounded-xl ${
                darkMode ? "bg-zinc-950" : "bg-zinc-100"
              }`}>
                {item.icon}
              </div>

              {/* Number presentation */}
              <div className="flex items-baseline">
                <AnimatedCounter target={item.target} suffix={item.suffix} />
              </div>

              {/* Text metadata */}
              <div>
                <h4 className={`text-sm font-bold uppercase tracking-wider ${
                  darkMode ? "text-zinc-200" : "text-zinc-800"
                }`}>
                  {item.label}
                </h4>
                <p className={`text-xs mt-0.5 ${
                  darkMode ? "text-zinc-500" : "text-zinc-500"
                }`}>
                  {item.subText}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
