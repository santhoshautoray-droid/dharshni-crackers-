"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { soundEngine } from "@/lib/sound-engine";
import { Volume2, VolumeX, ShoppingBag, Menu, X } from "lucide-react";

interface NavigationProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navigation({ cartCount, onOpenCart }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [audioActive, setAudioActive] = useState(!soundEngine.getIsMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartBump, setCartBump] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Browser autoplay requirement: prime audio context on first user click, tap, or interaction
  useEffect(() => {
    const enableAudio = () => {
      soundEngine.init();
    };
    window.addEventListener("click", enableAudio, { once: true });
    window.addEventListener("touchstart", enableAudio, { once: true });
    window.addEventListener("pointerdown", enableAudio, { once: true });
    window.addEventListener("keydown", enableAudio, { once: true });
    return () => {
      window.removeEventListener("click", enableAudio);
      window.removeEventListener("touchstart", enableAudio);
      window.removeEventListener("pointerdown", enableAudio);
      window.removeEventListener("keydown", enableAudio);
    };
  }, []);

  useEffect(() => {
    if (cartCount > 0) {
      setCartBump(true);
      const timer = setTimeout(() => setCartBump(false), 400);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const toggleAudio = () => {
    const active = soundEngine.toggle();
    setAudioActive(active);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2.5" : "py-4 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav
            className={`flex items-center justify-between gap-4 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-300 backdrop-blur-xl ${
              scrolled
                ? "bg-surface-1/90 border-brand-purple/25 shadow-lg shadow-black/80 shadow-glow-purple/10"
                : "bg-surface-1/70 border-white/10 shadow-md shadow-black/40"
            }`}
            aria-label="Main Navigation"
          >
            {/* Brand Logo */}
            <Link href="#hero" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-purple to-brand-gold flex items-center justify-center font-display font-extrabold text-obsidian text-lg shadow-md shadow-brand-purple/40 group-hover:scale-105 transition-transform">
                D
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-white leading-tight">
                  DHARSHINI
                </span>
                <span className="text-[10px] font-bold tracking-widest text-brand-gold uppercase">
                  TIRUVALLUR
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="hidden lg:flex items-center gap-1 list-none">
              <li>
                <Link
                  href="#hero"
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#categories"
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="#featured"
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Featured
                </Link>
              </li>
              <li>
                <Link
                  href="#experience"
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Diwali Experience
                </Link>
              </li>
              <li>
                <Link
                  href="#showroom"
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Showroom
                </Link>
              </li>
              <li>
                <Link
                  href="#safety"
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Safety
                </Link>
              </li>
              <li>
                <Link
                  href="#location"
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Visit Us
                </Link>
              </li>
            </ul>

            {/* Actions: Sound Toggle, Cart, Mobile Menu */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Store Timing Pill */}
              <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-semibold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open 8 AM – 8 PM</span>
              </div>

              {/* Web Audio Sound Synthesizer Button */}
              <button
                onClick={toggleAudio}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  audioActive
                    ? "bg-brand-purple/20 text-brand-purpleLight border-brand-purple shadow-sm shadow-brand-purple/30"
                    : "bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10"
                }`}
                title="Toggle realistic fireworks sound effects"
                aria-label="Toggle sound"
              >
                {audioActive ? <Volume2 size={14} className="text-brand-purpleLight" /> : <VolumeX size={14} />}
                <span className="hidden sm:inline">{audioActive ? "Audio ON" : "Audio OFF"}</span>
              </button>

              {/* Cart Drawer Trigger */}
              <button
                id="nav-cart-btn"
                onClick={onOpenCart}
                className="relative w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-brand-purple text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                aria-label="Open Shopping Cart"
              >
                <ShoppingBag size={16} />
                {cartCount > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-gold text-obsidian text-[10px] font-extrabold flex items-center justify-center shadow-sm shadow-brand-gold/60 transition-transform ${
                      cartBump ? "scale-125" : "scale-100"
                    }`}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center transition-colors"
                aria-label="Open Navigation Menu"
              >
                <Menu size={18} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-2xl flex flex-col p-6 justify-between animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg text-white">DHARSHINI CRACKERS</span>
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">
                TIRUVALLUR SHOWROOM
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center"
              aria-label="Close Navigation Menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-5 text-center my-auto">
            <Link
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-2xl font-bold text-white hover:text-brand-purpleLight transition-colors"
            >
              Home
            </Link>
            <Link
              href="#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-2xl font-bold text-white hover:text-brand-purpleLight transition-colors"
            >
              Categories
            </Link>
            <Link
              href="#featured"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-2xl font-bold text-white hover:text-brand-purpleLight transition-colors"
            >
              Featured Collection
            </Link>
            <Link
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-2xl font-bold text-white hover:text-brand-purpleLight transition-colors"
            >
              Diwali Experience
            </Link>
            <Link
              href="#showroom"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-2xl font-bold text-white hover:text-brand-purpleLight transition-colors"
            >
              Fireworks Showroom
            </Link>
            <Link
              href="#safety"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-2xl font-bold text-white hover:text-brand-purpleLight transition-colors"
            >
              Safety Guidelines
            </Link>
            <Link
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-2xl font-bold text-white hover:text-brand-purpleLight transition-colors"
            >
              Store & Directions
            </Link>
          </nav>

          <div className="border-t border-white/10 pt-4 text-center">
            <p className="text-xs text-slate-400">Shop No. 139, Shakti Nagar, Tiruvallur 602001</p>
            <p className="text-sm font-bold text-brand-gold mt-1">+91 96775 85657</p>
          </div>
        </div>
      )}
    </>
  );
}
