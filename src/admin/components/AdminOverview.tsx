"use client";

import React from "react";
import { StoreState } from "@/backend/models/types";
import { Sparkles, CheckCircle2, AlertCircle, ShoppingBag, IndianRupee } from "lucide-react";

interface AdminOverviewProps {
  storeState: StoreState;
}

export default function AdminOverview({ storeState }: AdminOverviewProps) {
  const totalProducts = storeState.products.length;
  const inStockCount = storeState.products.filter((p) => p.inStock).length;
  const soldOutCount = totalProducts - inStockCount;
  const inquiries = storeState.inquiries || [];
  const totalInquiryValue = inquiries.reduce((sum, inq) => sum + (inq.totalAmount || 0), 0);

  const stats = [
    {
      title: "Catalog Crackers",
      value: totalProducts,
      sub: `${inStockCount} Active in Showroom`,
      icon: Sparkles,
      color: "text-brand-purpleLight bg-brand-purple/10 border-brand-purple/30",
    },
    {
      title: "In Stock Ready",
      value: inStockCount,
      sub: "Available for pickup",
      icon: CheckCircle2,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
    {
      title: "Sold Out Alert",
      value: soldOutCount,
      sub: "Needs restocking",
      icon: AlertCircle,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    },
    {
      title: "Order Reservations",
      value: inquiries.length,
      sub: `₹${totalInquiryValue.toLocaleString("en-IN")} total volume`,
      icon: ShoppingBag,
      color: "text-brand-gold bg-brand-gold/10 border-brand-gold/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="p-5 rounded-2xl bg-surface-1 border border-white/10 flex items-center justify-between shadow-md"
          >
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {stat.title}
              </span>
              <div className="font-display font-extrabold text-2xl text-white">
                {stat.value}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                {stat.sub}
              </span>
            </div>

            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${stat.color}`}>
              <Icon size={20} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
