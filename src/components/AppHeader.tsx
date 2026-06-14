import React, { useState, useEffect } from "react";
import { Sun, Moon, ShoppingBag, Menu, X, Rocket } from "lucide-react";

interface AppHeaderProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  cartCount: number;
  onCartClick: () => void;
  onContactClick: () => void;
}

export default function AppHeader({
  darkMode,
  setDarkMode,
  cartCount,
  onCartClick,
  onContactClick,
}: AppHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Flavors", href: "#flavors" },
    { label: "Experience", href: "#experience" },
    { label: "Benefits", href: "#benefits" },
    { label: "Story", href: "#story" },
    { label: "Limited Run", href: "#limited" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? "bg-zinc-950/80 backdrop-blur-md border-b border-white/5 py-4 shadow-xl"
            : "bg-white/80 backdrop-blur-md border-b border-black/5 py-4 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* BRAND LOGO */}
        <a
          href="#"
          className="flex items-center gap-2 group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-brand-primary text-white shadow-lg group-hover:bg-brand-primary-light transition-all duration-300 overflow-hidden">
            <span className="font-display font-black text-lg italic tracking-tighter">DrP</span>
            <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </div>
          <div>
            <span
              className={`font-display font-black text-2xl tracking-tight italic uppercase block transition-colors ${
                darkMode ? "text-zinc-100" : "text-zinc-905"
              }`}
            >
              Dr. <span className="text-brand-primary-light">Paper</span>
            </span>
          </div>
        </a>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-sm tracking-wide transition-colors relative py-1 hover:text-brand-primary-light ${
                darkMode ? "text-zinc-400" : "text-zinc-650"
              }`}
            >
              {item.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-primary-light transition-all duration-300 hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CONTROLS (Theme, Cart & CTA) */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            id="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-xl border transition-all hover:scale-105 active:scale-95 ${
              darkMode
                ? "border-zinc-800 text-zinc-300 bg-zinc-900/50 hover:bg-zinc-800"
                : "border-zinc-200 text-zinc-700 bg-zinc-100/50 hover:bg-zinc-200"
            }`}
            title="Toggle theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Cart Icon */}
          <button
            id="cart-button"
            onClick={onCartClick}
            className={`p-2.5 rounded-xl border relative transition-all hover:scale-105 active:scale-95 ${
              darkMode
                ? "border-zinc-850 text-zinc-300 bg-zinc-900/50 hover:bg-zinc-800"
                : "border-zinc-200 text-zinc-700 bg-zinc-100/50 hover:bg-zinc-200"
            }`}
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-primary-light text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Header CTA Button */}
          <button
            id="buy-header-cta"
            onClick={onContactClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 bg-brand-primary hover:bg-brand-primary-light text-white text-xs font-black tracking-wider uppercase rounded-xl transition-all duration-300 shadow-md shadow-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/45 active:scale-95"
          >
            <Rocket size={14} />
            Order Now
          </button>

          {/* Mobile Menu Icon */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2.5 rounded-xl border ${
              darkMode
                ? "border-zinc-800 text-zinc-300 bg-zinc-900/50"
                : "border-zinc-200 text-zinc-700 bg-zinc-100/50"
            }`}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE FLYOUT PANEL */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className={`md:hidden absolute top-full left-0 w-full py-6 px-6 shadow-2xl transition-all duration-300 border-b flex flex-col gap-4 animate-fadeIn ${
            darkMode
              ? "bg-zinc-950 border-white/10 text-white"
              : "bg-white border-black/10 text-zinc-900"
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-lg font-bold transition-colors py-2 block ${
                darkMode ? "hover:text-zinc-200 text-zinc-400" : "hover:text-zinc-900 text-zinc-600"
              }`}
            >
              {item.label}
            </a>
          ))}

          <button
            id="mobile-order-cta"
            onClick={() => {
              onContactClick();
              setMobileMenuOpen(false);
            }}
            className="w-full text-center py-3.5 bg-brand-primary hover:bg-brand-primary-light text-white font-bold uppercase rounded-xl transition-all shadow-md mt-2"
          >
            Order Dr. Paper Case
          </button>
        </div>
      )}
    </header>
  );
}
