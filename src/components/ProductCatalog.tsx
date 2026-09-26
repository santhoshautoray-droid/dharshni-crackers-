"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ProductItem, ProductCategory } from "@/lib/store-data";
import { Search, X, Plus, Eye, Box, SlidersHorizontal, Sparkles, Check } from "lucide-react";

interface ProductCatalogProps {
  products: ProductItem[];
  categories: ProductCategory[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onAddToCart: (product: ProductItem, sourceEl: HTMLElement) => void;
  onViewDetails: (product: ProductItem) => void;
}

export default function ProductCatalog({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onViewDetails,
}: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  // Filtered & Sorted list
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.packSize.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // In Stock
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-az") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, searchQuery, inStockOnly, sortBy]);

  return (
    <section id="showroom" className="py-20 md:py-28 relative z-20" aria-label="Product Showroom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-purpleLight bg-brand-purple/10 border border-brand-purple/20 mb-3">
              <Sparkles size={12} className="text-brand-purpleLight" />
              <span>EXPLORE ALL CRACKERS</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-2">
              FIREWORKS SHOWROOM
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Browse our curated collection of celebration fireworks. Select items to prepare your store inquiry or reserve for festival pickup in Tiruvallur.
            </p>
          </div>

          <div className="text-xs text-slate-400 bg-white/5 border border-white/10 px-4 py-2 rounded-xl h-fit">
            Showing <strong className="text-white">{filteredProducts.length}</strong> Products
          </div>
        </div>

        {/* Filter Toolbar (Glass Pill) */}
        <div className="p-3 sm:p-4 rounded-2xl sm:rounded-full bg-surface-1/80 border border-white/10 shadow-lg backdrop-blur-xl mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Chips Scrollable */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-brand-purple text-white shadow-sm shadow-brand-purple"
                    : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Controls: Search, Sort, Stock */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Search Input */}
            <div className="relative flex-grow sm:flex-grow-0 sm:w-56">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crackers..."
                className="w-full pl-8 pr-7 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-purple transition-colors"
              />
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  aria-label="Clear Search"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 focus:outline-none focus:border-brand-purple cursor-pointer"
            >
              <option value="featured" className="bg-surface-1">Featured First</option>
              <option value="price-low" className="bg-surface-1">Price: Low to High</option>
              <option value="price-high" className="bg-surface-1">Price: High to Low</option>
              <option value="name-az" className="bg-surface-1">Name: A to Z</option>
            </select>

            {/* In-Stock Filter */}
            <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer select-none pl-1">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded accent-brand-purple"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </div>

        {/* Demo Data Disclaimer */}
        <div className="text-[11px] text-slate-500 mb-6 flex items-center gap-1.5">
          <SlidersHorizontal size={13} className="text-slate-400" />
          <span>Demo catalog prices and pack specifications are customizable in real-time via the Store Owner Admin Portal.</span>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white/[0.02] border border-white/5 rounded-3xl">
            <Box size={40} className="mx-auto text-slate-600 mb-3" />
            <h3 className="font-display font-bold text-lg text-white mb-1">No Fireworks Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              We couldn&apos;t find any celebration crackers matching your search or filters. Try adjusting your query.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                onSelectCategory("all");
                setInStockOnly(false);
              }}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <article key={p.id} className="bezel-card group flex flex-col">
                <div className="bezel-card-inner flex flex-col h-full">
                  {/* Media Visual */}
                  <div
                    onClick={() => onViewDetails(p)}
                    className="relative aspect-[4/3] bg-surface-1 overflow-hidden cursor-pointer"
                  >
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    />

                    {/* Category & Stock Badges */}
                    <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-obsidian/80 backdrop-blur-md text-brand-purpleLight border border-brand-purple/30">
                        {p.category.replace("-", " ")}
                      </span>
                      {p.inStock ? (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 w-fit">
                          In Stock
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-rose-500/15 text-rose-400 border border-rose-500/30 w-fit">
                          Sold Out
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <h3
                        onClick={() => onViewDetails(p)}
                        className="font-display font-extrabold text-base sm:text-lg text-white group-hover:text-brand-goldLight transition-colors cursor-pointer line-clamp-1 mb-1"
                      >
                        {p.name}
                      </h3>
                      <div className="text-xs text-slate-400 mb-3 flex items-center gap-1.5">
                        <Box size={13} className="text-slate-500" />
                        <span>{p.packSize}</span>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-semibold text-slate-500">Showroom Price</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-display font-extrabold text-lg text-brand-gold">
                            ₹{p.price.toLocaleString("en-IN")}
                          </span>
                          {p.originalPrice && p.originalPrice > p.price && (
                            <span className="text-[11px] text-slate-500 line-through">
                              ₹{p.originalPrice.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onViewDetails(p)}
                          className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                          title="View Details"
                          aria-label={`View specifications for ${p.name}`}
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          onClick={(e) => {
                            onAddToCart(p, e.currentTarget);
                            setAddedId(p.id);
                            setTimeout(() => setAddedId((curr) => (curr === p.id ? null : curr)), 1200);
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all active:scale-95 ${
                            addedId === p.id
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                              : "bg-brand-purple/20 hover:bg-brand-purple text-brand-purpleLight hover:text-white border border-brand-purple/40"
                          }`}
                          aria-label={`Add ${p.name} to cart`}
                        >
                          {addedId === p.id ? (
                            <>
                              <Check size={13} className="text-emerald-400" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus size={13} />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
