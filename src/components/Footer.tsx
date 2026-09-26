"use client";

import React from "react";
import Link from "next/link";
import { BusinessInfo } from "@/lib/store-data";
import { Phone, MapPin, Clock, ArrowUpRight, Lock } from "lucide-react";

interface FooterProps {
  business: BusinessInfo;
  onOpenAdmin: () => void;
}

export default function Footer({ business, onOpenAdmin }: FooterProps) {
  return (
    <footer id="footer" className="bg-[#030306] border-t border-white/5 pt-16 pb-24 md:pb-16 relative z-20" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Brand Column (Span 4) */}
          <div className="lg:col-span-4">
            <Link href="#hero" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-purple to-brand-gold flex items-center justify-center font-display font-extrabold text-obsidian text-lg shadow-md shadow-brand-purple/40">
                D
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-base tracking-tight text-white leading-tight">
                  DHARSHINI CRACKERS
                </span>
                <span className="text-[10px] font-bold tracking-widest text-brand-gold uppercase">
                  TIRUVALLUR SHOWROOM
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-5">
              The premier destination for festival crackers, aerial multi-tube repeaters, and celebration gift boxes in Tiruvallur, Tamil Nadu.
            </p>

            <div className="flex items-center gap-2 text-xs text-brand-gold font-bold">
              <Phone size={14} />
              <a href={`tel:${business.phone.replace(/\s+/g, "")}`} className="hover:underline">
                {business.phone}
              </a>
            </div>
          </div>

          {/* Quick Links Column (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-4">
              Showroom Catalog
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="#hero" className="hover:text-brand-purpleLight transition-colors">
                  Home Showroom
                </Link>
              </li>
              <li>
                <Link href="#categories" className="hover:text-brand-purpleLight transition-colors">
                  Explore Categories
                </Link>
              </li>
              <li>
                <Link href="#featured" className="hover:text-brand-purpleLight transition-colors">
                  Featured Gift Hamper
                </Link>
              </li>
              <li>
                <Link href="#experience" className="hover:text-brand-purpleLight transition-colors">
                  Diwali Experience
                </Link>
              </li>
              <li>
                <Link href="#showroom" className="hover:text-brand-purpleLight transition-colors">
                  All Fireworks
                </Link>
              </li>
            </ul>
          </div>

          {/* Safety & Compliance (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-4">
              Information
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="#safety" className="hover:text-brand-purpleLight transition-colors">
                  Safety Standards
                </Link>
              </li>
              <li>
                <Link href="#location" className="hover:text-brand-purpleLight transition-colors">
                  Store Location
                </Link>
              </li>
              <li>
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-purpleLight transition-colors inline-flex items-center gap-1"
                >
                  <span>Google Maps</span>
                  <ArrowUpRight size={11} />
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="text-slate-400 hover:text-brand-purpleLight transition-colors flex items-center gap-1 mt-1 text-left"
                >
                  <Lock size={11} />
                  <span>Store Owner Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Location Summary (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-4">
              Verified Location
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-brand-purpleLight flex-shrink-0 mt-0.5" />
                <span>{business.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-emerald-400 flex-shrink-0" />
                <span>{business.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Compliance Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-[11px] text-slate-500">
          <div>
            © 2026 Dharshini Crackers – Tiruvallur. All rights reserved.
          </div>
          <div>
            Compliance: Fireworks sale and order inquiries adhere strictly to Tamil Nadu fire-safety regulations and local store pickup protocols.
          </div>
        </div>
      </div>
    </footer>
  );
}
