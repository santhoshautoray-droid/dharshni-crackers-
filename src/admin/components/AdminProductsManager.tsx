"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductItem } from "@/backend/models/types";
import { Plus, Trash2, Edit3, Check, X, Search } from "lucide-react";

interface AdminProductsManagerProps {
  products: ProductItem[];
  onToggleStock: (productId: string) => void;
  onUpdatePrice: (productId: string, newPrice: number) => void;
  onDeleteProduct: (productId: string) => void;
  onAddProduct: (product: Partial<ProductItem>) => void;
}

export default function AdminProductsManager({
  products,
  onToggleStock,
  onUpdatePrice,
  onDeleteProduct,
  onAddProduct,
}: AdminProductsManagerProps) {
  const [search, setSearch] = useState("");
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [priceInputValue, setPriceInputValue] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // New Product Form State
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("gift-boxes");
  const [newPrice, setNewPrice] = useState("");
  const [newPack, setNewPack] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const startEditPrice = (product: ProductItem) => {
    setEditingPriceId(product.id);
    setPriceInputValue(product.price.toString());
  };

  const saveEditPrice = (productId: string) => {
    const val = parseInt(priceInputValue, 10);
    if (!isNaN(val) && val > 0) {
      onUpdatePrice(productId, val);
    }
    setEditingPriceId(null);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPrice || !newPack.trim()) return;

    onAddProduct({
      name: newName.trim(),
      category: newCategory,
      price: parseInt(newPrice, 10) || 500,
      originalPrice: (parseInt(newPrice, 10) || 500) + 100,
      packSize: newPack.trim(),
      image: "/images/sparkler-fountain.jpg",
      inStock: true,
      featured: false,
      productType: "Cracker",
      description: newDesc.trim() || "Quality celebration fireworks from Dharshini Crackers Tiruvallur.",
      safetyInfo: "Light outdoors with water bucket on standby.",
    });

    setNewName("");
    setNewPrice("");
    setNewPack("");
    setNewDesc("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-surface-1 border border-white/10">
        <div className="relative flex-grow sm:max-w-xs flex items-center">
          <Search size={15} className="absolute left-3.5 text-slate-400 pointer-events-none z-10" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search catalog crackers..."
            style={{ paddingLeft: "2.5rem" }}
            className="w-full pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-purple transition-colors"
          />
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-brand-purple/30 hover:scale-[1.01] active:scale-95 transition-all"
        >
          <Plus size={15} />
          <span>Add New Cracker</span>
        </button>
      </div>

      {/* Catalog Table */}
      <div className="rounded-2xl border border-white/10 bg-surface-1 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 text-slate-400 font-semibold border-b border-white/10">
              <tr>
                <th className="p-3.5">Product</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Pack Specification</th>
                <th className="p-3.5">Showroom Price</th>
                <th className="p-3.5">Stock Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.02]">
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-obsidian flex-shrink-0 border border-white/10">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{product.name}</div>
                        <div className="text-[10px] text-slate-400">{product.id}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-3.5 text-slate-300 capitalize">
                    {product.category.replace("-", " ")}
                  </td>

                  <td className="p-3.5 text-slate-400">
                    {product.packSize}
                  </td>

                  <td className="p-3.5 font-bold">
                    {editingPriceId === product.id ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={priceInputValue}
                          onChange={(e) => setPriceInputValue(e.target.value)}
                          className="w-20 px-2 py-1 rounded bg-black/60 border border-brand-purple text-xs text-white"
                          autoFocus
                        />
                        <button
                          onClick={() => saveEditPrice(product.id)}
                          className="p-1 text-emerald-400 hover:text-emerald-300"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={() => setEditingPriceId(null)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 group">
                        <span className="text-brand-gold text-sm">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        <button
                          onClick={() => startEditPrice(product)}
                          className="text-slate-500 hover:text-white transition-opacity p-0.5"
                          title="Edit price"
                        >
                          <Edit3 size={12} />
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="p-3.5">
                    <button
                      onClick={() => onToggleStock(product.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                        product.inStock
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"
                          : "bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500/25"
                      }`}
                    >
                      {product.inStock ? "✓ In Stock" : "✕ Sold Out"}
                    </button>
                  </td>

                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => onDeleteProduct(product.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 bg-obsidian/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="w-full max-w-lg bg-surface-1 border border-white/15 rounded-3xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="font-display font-bold text-lg text-white">Add New Cracker</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Cracker Name *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. 50-Shot Grand Sky Barrage"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                  >
                    <option value="gift-boxes" className="bg-surface-1">Gift Boxes</option>
                    <option value="sky-shots" className="bg-surface-1">Aerial Sky Shots</option>
                    <option value="sparklers" className="bg-surface-1">Sparklers</option>
                    <option value="chakkars" className="bg-surface-1">Ground Chakkars</option>
                    <option value="flower-pots" className="bg-surface-1">Fountains & Pots</option>
                    <option value="rockets" className="bg-surface-1">Celebration Rockets</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="1200"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Pack Specification *
                </label>
                <input
                  type="text"
                  required
                  value={newPack}
                  onChange={(e) => setNewPack(e.target.value)}
                  placeholder="e.g. 1 Box (50 Tubes)"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Brief description of the effect..."
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary px-5 py-2 rounded-xl text-xs font-bold"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
