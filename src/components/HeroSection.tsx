"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import FireworksCanvas from "./FireworksCanvas";
import { ArrowUpRight, Star, Clock, MapPin, Sparkles, Phone } from "lucide-react";
import { BusinessInfo } from "@/lib/store-data";

interface HeroSectionProps {
  business: BusinessInfo;
}

export default function HeroSection({ business }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-radial-gradient pt-28 pb-16 md:pt-36 md:pb-24"
      aria-label="Hero Introduction"
    >
      {/* Background Cinematic Atmosphere Image Underlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bloom.jpg"
          alt="Fireworks in night sky"
          fill
          priority
          className="object-cover opacity-25 mix-blend-screen pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-obsidian/85 to-obsidian pointer-events-none" />
      </div>

      {/* Layered Interactive Canvas Fireworks (Interactive click/tap anywhere!) */}
      <FireworksCanvas id="hero-fireworks-canvas" autoLaunch={true} />

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Eyebrow Verified Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-brand-purpleLight bg-brand-purple/10 border border-brand-purple/30 shadow-md shadow-brand-purple/10 mb-5 animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-purpleLight shadow-sm shadow-brand-purpleLight animate-pulse" />
          <span>TIRUVALLUR SHOWROOM · VERIFIED STORE</span>
        </div>

        {/* Display Headline with Outfit Font */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white mb-4 leading-[1.05]">
          <span>DHARSHINI CRACKERS</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-gold to-brand-amber mt-1">
            TIRUVALLUR
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mb-8">
          Welcome to the futuristic fireworks showroom. Discover hand-selected festival crackers, multi-tube aerial sky repeaters, and celebration hampers for an unforgettable Diwali.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-10 w-full sm:w-auto">
          <Link
            href="#showroom"
            className="btn group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-purpleDark hover:from-brand-purpleLight hover:to-brand-purple text-white font-semibold text-sm sm:text-base border border-white/20 shadow-lg shadow-brand-purple/40 hover:shadow-brand-purple/60 hover:-translate-y-0.5 active:scale-95 transition-all"
          >
            <span>SHOP CRACKERS</span>
            <span className="btn-icon-bubble">
              <ArrowUpRight size={15} />
            </span>
          </Link>

          <Link
            href="#categories"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm sm:text-base border border-white/15 hover:border-brand-purpleLight/60 shadow-md backdrop-blur-md hover:-translate-y-0.5 active:scale-95 transition-all"
          >
            <span>EXPLORE COLLECTION</span>
          </Link>

          <a
            href={`tel:${business.phone.replace(/\s+/g, "")}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-brand-gold/15 hover:bg-brand-gold/25 text-brand-gold border border-brand-gold/30 font-bold text-sm shadow-md shadow-brand-gold/10 hover:-translate-y-0.5 active:scale-95 transition-all"
          >
            <Phone size={14} />
            <span>Call Store</span>
          </a>

          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3.5 rounded-full text-slate-300 hover:text-white hover:bg-white/5 font-medium text-sm transition-colors"
          >
            <span>GET DIRECTIONS ↗</span>
          </a>
        </div>

        {/* Verified Store Metrics Bar (Double-Bezel) */}
        <div className="bezel-card max-w-3xl w-full">
          <div className="bezel-card-inner px-5 py-3.5 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-brand-gold fill-brand-gold" />
              <span>
                <strong className="text-white font-bold">{business.googleRating} / 5</strong> on Google Maps
              </span>
              <span className="text-slate-500">({business.googleReviewCount} reviews)</span>
            </div>

            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />

            <div className="flex items-center gap-2">
              <Clock size={16} className="text-emerald-400" />
              <span>
                Open <strong className="text-white font-bold">{business.hours}</strong>
              </span>
            </div>

            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />

            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-brand-purpleLight" />
              <span>
                Shakti Nagar, <strong className="text-white font-bold">Tiruvallur</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-[11px] text-slate-500 flex items-center gap-1.5">
          <Sparkles size={12} className="text-brand-gold" />
          <span>Interactive Sky: Tap or click anywhere to launch custom fireworks!</span>
        </div>
      </div>
    </section>
  );
}
