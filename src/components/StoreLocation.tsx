"use client";

import React, { useState } from "react";
import { BusinessInfo } from "@/lib/store-data";
import { MapPin, Phone, Clock, Star, Copy, ArrowUpRight, Check } from "lucide-react";

interface StoreLocationProps {
  business: BusinessInfo;
}

export default function StoreLocation({ business }: StoreLocationProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(business.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="location" className="py-20 md:py-28 relative z-20" aria-label="Store Location and Hours">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-purpleLight bg-brand-purple/10 border border-brand-purple/20 mb-3">
            <span>TIRUVALLUR SHOWROOM</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            VISIT OUR STORE
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Conveniently located near Vivekananda School in Shakti Nagar, Tiruvallur. Inspect products, consult with our fireworks experts, and collect your orders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Verified Store Details Card (Double-Bezel) */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="bezel-card h-full">
              <div className="bezel-card-inner p-6 sm:p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div>
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                        {business.name}
                      </h3>
                      <span className="text-xs text-brand-gold font-bold uppercase tracking-wider">
                        Verified Google Business Location
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-xs font-bold text-brand-gold">
                      <Star size={13} className="fill-brand-gold" />
                      <span>{business.googleRating} / 5</span>
                    </div>
                  </div>

                  <div className="space-y-5 my-6 text-sm">
                    {/* Address */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-brand-purple/10 border border-brand-purple/30 text-brand-purpleLight flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                          Verified Address
                        </span>
                        <p className="text-white font-medium leading-relaxed">
                          {business.address}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-brand-gold/10 border border-brand-gold/30 text-brand-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Phone size={18} />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                          Direct Contact
                        </span>
                        <a
                          href={`tel:${business.phone.replace(/\s+/g, "")}`}
                          className="text-brand-gold font-bold text-base hover:underline"
                        >
                          {business.phone}
                        </a>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Clock size={18} />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                          Operating Timings
                        </span>
                        <p className="text-white font-medium">
                          {business.hours}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`tel:${business.phone.replace(/\s+/g, "")}`}
                    className="flex-1 btn btn-primary py-3 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-brand-purple/30"
                  >
                    <Phone size={14} />
                    <span>Call Store</span>
                  </a>

                  <a
                    href={business.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn btn-gold py-3 rounded-full text-xs font-bold text-obsidian flex items-center justify-center gap-2 shadow-md shadow-brand-gold/30"
                  >
                    <span>Get Directions</span>
                    <ArrowUpRight size={14} />
                  </a>

                  <button
                    onClick={handleCopy}
                    className="px-4 py-3 rounded-full bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copied ? "Copied" : "Copy Address"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Integrated Map Frame */}
          <div className="lg:col-span-6 min-h-[360px] sm:min-h-[440px]">
            <div className="bezel-card h-full">
              <div className="bezel-card-inner h-full overflow-hidden relative">
                <iframe
                  src="https://maps.google.com/maps?q=13.1294422,79.8989643&z=16&output=embed"
                  className="w-full h-full min-h-[360px] border-0 invert-[90%] hue-rotate-180 brightness-[88%] contrast-[92%]"
                  loading="lazy"
                  title="Dharshini Crackers Tiruvallur Google Map Location"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
