"use client";

import React from "react";
import Image from "next/image";
import { ProductItem } from "@/lib/store-data";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToInquiry: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onProceedToInquiry,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalCount = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);

  return (
    <div
      className="fixed inset-0 z-50 bg-obsidian/75 backdrop-blur-md flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface-1 border-l border-white/10 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h3 className="font-display font-bold text-lg text-white">Your Cracker Box</h3>
            <span className="px-2 py-0.5 rounded-full bg-brand-purple text-xs font-bold text-white">
              {totalCount}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close cart"
          >
            <X size={16} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-grow overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-slate-500 mb-4">
                <ShoppingBag size={28} />
              </div>
              <h4 className="font-display font-bold text-base text-white mb-1">Your Box is Empty</h4>
              <p className="text-xs text-slate-400 max-w-xs mb-6">
                Discover our festival sky shots, sparkling fountains, and royal gift boxes in the showroom.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
              >
                Browse Showroom
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-3.5 p-3.5 rounded-2xl bg-white/[0.025] border border-white/5"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-obsidian flex-shrink-0">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>

                <div className="flex flex-col flex-grow justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-display font-bold text-sm text-white line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">{product.packSize}</p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                      aria-label={`Remove ${product.name}`}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5">
                    <span className="font-display font-bold text-sm text-brand-gold">
                      ₹{(product.price * quantity).toLocaleString("en-IN")}
                    </span>

                    <div className="flex items-center border border-white/10 rounded-full bg-white/5 px-2 py-0.5">
                      <button
                        onClick={() => onUpdateQty(product.id, -1)}
                        className="text-slate-400 hover:text-white p-0.5"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-white">{quantity}</span>
                      <button
                        onClick={() => onUpdateQty(product.id, 1)}
                        className="text-slate-400 hover:text-white p-0.5"
                        aria-label="Increase quantity"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-surface-2/60 backdrop-blur-md">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>Estimated Subtotal</span>
              <span>₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between items-baseline mb-4">
              <span className="font-display font-bold text-sm text-white">Estimated Total</span>
              <span className="font-display font-extrabold text-xl text-brand-gold">
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            <p className="text-[10px] text-slate-500 mb-4">
              * Order reservation will be confirmed directly with our Tiruvallur store in accordance with state regulations.
            </p>

            <button
              onClick={onProceedToInquiry}
              className="w-full btn btn-primary py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-purple/40 hover:scale-[1.01] active:scale-95 transition-transform"
            >
              <span>Prepare Order Inquiry</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
