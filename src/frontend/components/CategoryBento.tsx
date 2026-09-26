"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

interface CategoryBentoProps {
  onSelectCategory: (categoryId: string) => void;
}

export default function CategoryBento({ onSelectCategory }: CategoryBentoProps) {
  const categories = [
    {
      id: "gift-boxes",
      name: "Festival Gift Boxes",
      desc: "Curated celebration hampers with 35 to 50 premium assorted fireworks.",
      image: "/images/gift-box.webp",
      span: "lg:col-span-8",
    },
    {
      id: "sky-shots",
      name: "Aerial Sky Shots",
      desc: "Multi-tube repeating cakes with panoramic chrysanthemum bursts.",
      image: "/images/sky-shots.webp",
      span: "lg:col-span-4",
    },
    {
      id: "flower-pots",
      name: "Fountains & Pots",
      desc: "Towering vertical golden sparks and glittering lavender showers.",
      image: "/images/sparkler-fountain.webp",
      span: "lg:col-span-4",
    },
    {
      id: "chakkars",
      name: "Ground Chakkars",
      desc: "Hypnotic concentric spinning wheels with high-speed gold rings.",
      image: "/images/chakkars.webp",
      span: "lg:col-span-4",
    },
    {
      id: "sparklers",
      name: "Sparklers & Flares",
      desc: "Long-burning handheld sparklers in rich champagne gold and electric violet.",
      image: "/images/sparklers.webp",
      span: "lg:col-span-4",
    },
  ];

  const handleCategoryClick = (catId: string) => {
    onSelectCategory(catId);
    const showroomEl = document.getElementById("showroom");
    if (showroomEl) {
      showroomEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="categories" className="py-20 md:py-28 relative z-20" aria-label="Fireworks Categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-purpleLight bg-brand-purple/10 border border-brand-purple/20 mb-3">
            <Sparkles size={12} className="text-brand-purpleLight" />
            <span>SHOWROOM COLLECTIONS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white mb-4">
            EXPLORE FIREWORKS
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Discover precision-engineered celebration varieties crafted for vibrant colors, aerial choreography, and memorable family festivals.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`bezel-card group cursor-pointer ${cat.span}`}
            >
              <div className="bezel-card-inner min-h-[260px] sm:min-h-[300px] flex flex-col justify-end p-6 sm:p-8 relative">
                {/* Background Image with Zoom */}
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                />

                {/* Gradient Vignette Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent z-10 opacity-90 group-hover:opacity-80 transition-opacity" />

                {/* Content */}
                <div className="relative z-20">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white group-hover:text-brand-goldLight transition-colors">
                      {cat.name}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-brand-purple text-white flex items-center justify-center transition-all group-hover:translate-x-1">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-md">
                    {cat.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
