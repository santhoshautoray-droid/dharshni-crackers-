"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductItem } from "@/lib/store-data";
import { X, ShieldAlert, Plus, Minus, Check, Box } from "lucide-react";

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem, qty: number, sourceEl: HTMLElement) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState<string | null>(null);

  if (!product) return null;

  const currentImage = activeImg || product.image;
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    onAddToCart(product, qty, e.currentTarget);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-obsidian/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-surface-1 border border-white/15 rounded-3xl shadow-2xl shadow-black overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* Left: Gallery & Zoom View */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-obsidian border border-white/10 group cursor-zoom-in">
              <Image
                src={currentImage}
                alt={product.name}
                fill
                priority
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Thumbnail Navigation */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(img)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      currentImage === img ? "border-brand-purple" : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Specifications & Add to Cart */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand-purpleLight bg-brand-purple/10 border border-brand-purple/30">
                  {product.category.replace("-", " ")}
                </span>
                {product.inStock ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                    In Stock at Tiruvallur
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20">
                    Sold Out
                  </span>
                )}
              </div>

              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2 leading-tight">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-4">
                <Box size={14} className="text-brand-gold" />
                <span>Pack Specification: <strong className="text-white">{product.packSize}</strong></span>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Safety Guidance Card */}
              <div className="p-3.5 rounded-xl bg-brand-gold/5 border border-brand-gold/20 mb-6">
                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-gold uppercase tracking-wider mb-1">
                  <ShieldAlert size={14} />
                  <span>Safety & Usage Instructions</span>
                </div>
                <p className="text-xs text-slate-300 leading-normal">
                  {product.safetyInfo}
                </p>
              </div>
            </div>

            {/* Price & Purchase controls */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-display font-extrabold text-3xl text-brand-gold">
                  ₹{(product.price * qty).toLocaleString("en-IN")}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-slate-500 line-through">
                    ₹{(product.originalPrice * qty).toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center border border-white/15 rounded-full bg-white/5 px-2 py-1">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-white">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add Button */}
                <button
                  onClick={handleAdd}
                  className="flex-grow btn btn-primary py-3 px-6 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-purple/40 hover:scale-[1.02] active:scale-95 transition-transform"
                >
                  <Check size={16} />
                  <span>Add to Cart (₹{(product.price * qty).toLocaleString("en-IN")})</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center mt-2.5">
                * Available for showroom pickup at Dharshini Crackers Tiruvallur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
