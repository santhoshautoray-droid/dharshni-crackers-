"use client";

import React, { useState } from "react";
import { CartItem } from "./CartDrawer";
import { BusinessInfo } from "@/lib/store-data";
import { X, CheckCircle, Copy, Phone, ShieldCheck } from "lucide-react";

interface OrderInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  business: BusinessInfo;
  onSuccess: () => void;
}

export default function OrderInquiryModal({
  isOpen,
  onClose,
  items,
  business,
  onSuccess,
}: OrderInquiryModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [orderSummary, setOrderSummary] = useState<string | null>(null);
  const [orderRef, setOrderRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalPrice = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const ref = `DC-TIR-${Date.now().toString().slice(-5)}`;
    const summary = `
🎉 DHARSHINI CRACKERS – TIRUVALLUR
Order Inquiry Ref: #${ref}
Customer: ${name}
Phone: ${phone}

Items Requested:
${items.map((i) => `• ${i.product.name} (${i.product.packSize}) x${i.quantity} : ₹${(i.product.price * i.quantity).toLocaleString("en-IN")}`).join("\n")}

Estimated Total: ₹${totalPrice.toLocaleString("en-IN")}
Note: ${note || "None"}

Store Contact:
Dharshini Crackers – Tiruvallur
Address: ${business.address}
Phone: ${business.phone}
    `.trim();

    setOrderRef(ref);
    setOrderSummary(summary);
    onSuccess();
  };

  const handleCopy = () => {
    if (!orderSummary) return;
    navigator.clipboard.writeText(orderSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-obsidian/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-surface-1 border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {!orderSummary ? (
          <div>
            <h3 className="font-display font-bold text-2xl text-white mb-2">Order Reservation</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              Submit your desired cracker selection. Our Tiruvallur showroom staff will confirm product availability and prepare your festival package for store pickup.
            </p>

            {/* Compliance Alert */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-brand-purple/10 border border-brand-purple/30 text-xs text-slate-200 mb-5 leading-normal">
              <ShieldCheck size={16} className="text-brand-purpleLight flex-shrink-0 mt-0.5" />
              <span>
                <strong>Compliance Note:</strong> In accordance with Tamil Nadu safety guidelines and firework regulations, orders are verified and fulfilled directly at our licensed Tiruvallur store.
              </span>
            </div>

            {/* Order Items Preview */}
            <div className="p-3.5 rounded-2xl bg-white/[0.025] border border-white/5 mb-5 max-h-36 overflow-y-auto">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Order Items ({items.length})
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {items.map((i) => (
                  <li key={i.product.id} className="flex justify-between">
                    <span>
                      {i.product.name} <span className="text-slate-500">x{i.quantity}</span>
                    </span>
                    <span className="font-semibold text-white">
                      ₹{(i.product.price * i.quantity).toLocaleString("en-IN")}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 mt-2 border-t border-white/10 flex justify-between text-xs font-bold">
                <span className="text-white">Estimated Total</span>
                <span className="text-brand-gold">₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="customer-name" className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div>
                  <label htmlFor="customer-phone" className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    id="customer-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 96775 85657"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="customer-notes" className="block text-xs font-semibold text-slate-300 mb-1">
                  Pickup Date / Special Notes (Optional)
                </label>
                <textarea
                  id="customer-notes"
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Planning to collect on Saturday afternoon"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-purple"
                />
              </div>

              <button
                type="submit"
                className="w-full btn btn-primary py-3 rounded-full font-bold text-xs sm:text-sm shadow-lg shadow-brand-purple/40 hover:scale-[1.01] active:scale-95 transition-transform"
              >
                Generate Order Summary & Reservation
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-2">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={28} />
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-1">Order Summary Prepared</h3>
            <p className="text-xs text-slate-300 mb-4">
              Reference ID: <strong className="text-brand-gold">#{orderRef}</strong>
            </p>

            <pre className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-left text-[11px] text-slate-300 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto mb-5">
              {orderSummary}
            </pre>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 py-2.5 px-4 rounded-full bg-white/10 hover:bg-white/15 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <Copy size={14} />
                <span>{copied ? "Copied to Clipboard!" : "Copy Summary"}</span>
              </button>

              <a
                href={`tel:${business.phone.replace(/\s+/g, "")}`}
                className="flex-1 btn btn-gold py-2.5 px-4 rounded-full text-xs font-bold text-obsidian flex items-center justify-center gap-1.5 shadow-md shadow-brand-gold/30 hover:scale-[1.02] active:scale-95 transition-transform"
              >
                <Phone size={14} />
                <span>Call Store to Confirm</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
