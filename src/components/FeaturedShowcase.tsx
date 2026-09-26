"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductItem } from "@/lib/store-data";
import { ShieldCheck, Plus, Sparkles, CheckCircle2, Check } from "lucide-react";

interface FeaturedShowcaseProps {
  product: ProductItem;
  onAddToCart: (product: ProductItem, sourceEl: HTMLElement) => void;
  onViewDetails: (product: ProductItem) => void;
}

export default function FeaturedShowcase({
  product,
  onAddToCart,
  onViewDetails,
}: FeaturedShowcaseProps) {
  const [added, setAdded] = useState(false);

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onAddToCart(product, e.currentTarget);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <section id="featured" className="py-20 md:py-28 relative z-20 border-y border-white/5 bg-surface-1/40" aria-label="Featured Collection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Big Product Visual */}
          <div className="lg:col-span-6">
            <div className="bezel-card group">
              <div className="bezel-card-inner aspect-[4/3] sm:aspect-square relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-brand-gold bg-obsidian/85 border border-brand-gold/40 backdrop-blur-md">
                    Featured Crown Hamper
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Specifications & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-gold bg-brand-gold/10 border border-brand-gold/20 mb-3.5 w-fit">
              <Sparkles size={12} className="text-brand-gold" />
              <span>DELUXE FESTIVAL EDITION</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-4 leading-tight">
              {product.name}
            </h2>

            {/* Price Row */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-brand-gold">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-slate-500 line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                In Stock at Tiruvallur
              </span>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Features List */}
            <ul className="space-y-3 mb-8 text-sm text-slate-200">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-brand-purpleLight flex-shrink-0" />
                <span>Curated with 35 high-demand celebration cracker varieties</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-brand-purpleLight flex-shrink-0" />
                <span>Includes royal velvet presentation packaging with gold hot-foil</span>
              </li>
              <li className="flex items-center gap-2.5">
                <ShieldCheck size={16} className="text-brand-gold flex-shrink-0" />
                <span>Full safety and handling manual included in each box</span>
              </li>
            </ul>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                onClick={handleAddClick}
                className={`btn px-6 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg transition-all ${
                  added
                    ? "bg-emerald-500 text-obsidian shadow-emerald-500/30"
                    : "btn-gold text-obsidian shadow-brand-gold/30 hover:shadow-brand-gold/50 hover:-translate-y-0.5 active:scale-95"
                }`}
              >
                <span>{added ? "Added to Box!" : "Quick Add to Cart"}</span>
                <span className="w-6 h-6 rounded-full bg-obsidian/15 flex items-center justify-center">
                  {added ? <Check size={14} className="text-obsidian" /> : <Plus size={14} />}
                </span>
              </button>

              <button
                onClick={() => onViewDetails(product)}
                className="px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm sm:text-base border border-white/10 hover:border-brand-purpleLight/40 transition-colors"
              >
                View Full Specifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
