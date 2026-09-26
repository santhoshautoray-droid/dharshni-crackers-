"use client";

import React from "react";
import Link from "next/link";
import { Home, Sparkles, LayoutGrid, ShoppingBag, ArrowRight } from "lucide-react";

interface MobileBottomNavProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  activeTab?: string;
}

export default function MobileBottomNav({
  cartCount,
  cartTotal,
  onOpenCart,
  activeTab = "home",
}: MobileBottomNavProps) {
  return (
    <>
      {/* Sticky Mobile Cart Bar (slides up when cart has items) */}
      <div
        className={`fixed left-3 right-3 z-40 md:hidden transition-all duration-300 pointer-events-auto ${
          cartCount > 0
            ? "bottom-[72px] opacity-100 translate-y-0"
            : "bottom-0 opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-2.5 rounded-full bg-gradient-to-r from-surface-2 to-surface-1 border border-brand-purple/40 shadow-xl shadow-black/80 shadow-glow-purple/20 backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full bg-brand-purple text-[11px] font-bold text-white">
              {cartCount} {cartCount === 1 ? "Item" : "Items"}
            </span>
            <span className="font-display font-bold text-sm text-white">
              ₹{cartTotal.toLocaleString("en-IN")}
            </span>
          </div>
          <button
            onClick={onOpenCart}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-brand-gold to-brand-amber text-obsidian text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-transform"
          >
            <span>View Cart</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden h-16 bg-surface-1/95 backdrop-blur-2xl border-t border-white/10 px-4 pb-[env(safe-area-inset-bottom,0)] flex items-center justify-around shadow-2xl"
        aria-label="Mobile Bottom App Bar"
      >
        <Link
          href="#hero"
          className={`flex flex-col items-center justify-center gap-1 w-16 h-12 rounded-xl transition-colors ${
            activeTab === "home" ? "text-brand-purpleLight" : "text-slate-400 hover:text-white"
          }`}
        >
          <Home size={18} />
          <span className="text-[10px] font-semibold">Home</span>
        </Link>

        <Link
          href="#categories"
          className={`flex flex-col items-center justify-center gap-1 w-16 h-12 rounded-xl transition-colors ${
            activeTab === "categories" ? "text-brand-purpleLight" : "text-slate-400 hover:text-white"
          }`}
        >
          <LayoutGrid size={18} />
          <span className="text-[10px] font-semibold">Categories</span>
        </Link>

        <Link
          href="#showroom"
          className={`flex flex-col items-center justify-center gap-1 w-16 h-12 rounded-xl transition-colors ${
            activeTab === "shop" ? "text-brand-purpleLight" : "text-slate-400 hover:text-white"
          }`}
        >
          <Sparkles size={18} />
          <span className="text-[10px] font-semibold">Showroom</span>
        </Link>

        <button
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center gap-1 w-16 h-12 rounded-xl text-slate-400 hover:text-white relative"
          aria-label="Open Cart"
        >
          <div className="relative">
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-brand-gold text-obsidian text-[9px] font-extrabold flex items-center justify-center shadow-sm shadow-brand-gold">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold">Cart</span>
        </button>
      </nav>
    </>
  );
}
