"use client";

import React, { useState } from "react";
import { StoreState, ProductItem, saveStoreState, resetStoreState } from "@/lib/store-data";
import { X, Lock, Save, RotateCcw, Plus, Trash2, CheckCircle2 } from "lucide-react";

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeState: StoreState;
  onStateUpdate: (newState: StoreState) => void;
}

export default function AdminPortalModal({
  isOpen,
  onClose,
  storeState,
  onStateUpdate,
}: AdminPortalModalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [activeTab, setActiveTab] = useState<"business" | "catalog" | "add">("business");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Business Form State
  const [bizName, setBizName] = useState(storeState.business.name);
  const [bizPhone, setBizPhone] = useState(storeState.business.phone);
  const [bizAddress, setBizAddress] = useState(storeState.business.address);
  const [bizHours, setBizHours] = useState(storeState.business.hours);
  const [bizAnnouncement, setBizAnnouncement] = useState(storeState.business.heroAnnouncement);

  // New Product Form State
  const [newProdName, setNewProdName] = useState("");
  const [newProdCat, setNewProdCat] = useState("gift-boxes");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdPack, setNewProdPack] = useState("");
  const [newProdDesc, setNewProdDesc] = useState("");

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid passcode. (Default during development: admin123)");
    }
  };

  const handleSaveBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: StoreState = {
      ...storeState,
      business: {
        ...storeState.business,
        name: bizName.trim(),
        phone: bizPhone.trim(),
        address: bizAddress.trim(),
        hours: bizHours.trim(),
        heroAnnouncement: bizAnnouncement.trim(),
      },
    };
    saveStoreState(updated);
    onStateUpdate(updated);
    triggerSuccess();
  };

  const handleToggleStock = (prodId: string) => {
    const updatedProducts = storeState.products.map((p) =>
      p.id === prodId ? { ...p, inStock: !p.inStock } : p
    );
    const updated: StoreState = { ...storeState, products: updatedProducts };
    saveStoreState(updated);
    onStateUpdate(updated);
  };

  const handleDeleteProduct = (prodId: string) => {
    if (!confirm("Are you sure you want to remove this product?")) return;
    const updatedProducts = storeState.products.filter((p) => p.id !== prodId);
    const updated: StoreState = { ...storeState, products: updatedProducts };
    saveStoreState(updated);
    onStateUpdate(updated);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdPrice || !newProdPack.trim()) return;

    const newProd: ProductItem = {
      id: `dc-${Date.now().toString().slice(-4)}`,
      name: newProdName.trim(),
      slug: newProdName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: newProdCat,
      price: parseInt(newProdPrice) || 500,
      originalPrice: (parseInt(newProdPrice) || 500) + 100,
      packSize: newProdPack.trim(),
      image: "/images/sparkler-fountain.jpg",
      inStock: true,
      featured: false,
      productType: "Cracker",
      description: newProdDesc.trim() || "Quality celebration fireworks from Dharshini Crackers Tiruvallur.",
      safetyInfo: "Light outdoors in open space with water bucket on standby.",
      demoNote: "Added via Store Admin Portal",
    };

    const updated: StoreState = {
      ...storeState,
      products: [newProd, ...storeState.products],
    };
    saveStoreState(updated);
    onStateUpdate(updated);

    // Reset Form
    setNewProdName("");
    setNewProdPrice("");
    setNewProdPack("");
    setNewProdDesc("");
    triggerSuccess();
    setActiveTab("catalog");
  };

  const handleResetData = () => {
    if (confirm("Reset store data back to initial verified catalog?")) {
      const reset = resetStoreState();
      onStateUpdate(reset);
      setBizName(reset.business.name);
      setBizPhone(reset.business.phone);
      setBizAddress(reset.business.address);
      setBizHours(reset.business.hours);
      setBizAnnouncement(reset.business.heroAnnouncement);
      triggerSuccess();
    }
  };

  const triggerSuccess = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-obsidian/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-surface-1 border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-surface-2/40">
          <div className="flex items-center gap-2.5">
            <span className="font-display font-extrabold text-base text-white">DHARSHINI CRACKERS</span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-purpleLight bg-brand-purple/20 border border-brand-purple/40">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-2">
            {saveSuccess && (
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold animate-in fade-in">
                <CheckCircle2 size={14} />
                <span>Saved Live!</span>
              </span>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close Admin Portal"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {!isAuthenticated ? (
          /* Login Gate */
          <div className="p-8 sm:p-12 text-center max-w-sm mx-auto my-auto">
            <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 border border-brand-purple/30 text-brand-purpleLight flex items-center justify-center mx-auto mb-4">
              <Lock size={22} />
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-2">Store Manager Access</h3>
            <p className="text-xs text-slate-400 mb-6">
              Enter manager passcode to configure pricing, product inventory, and verified store hours.
            </p>

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Passcode (default: admin123)"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-brand-purple text-center"
              />
              <button
                type="submit"
                className="w-full btn btn-primary py-2.5 rounded-xl font-bold text-xs"
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Tabs & Body */
          <div className="flex flex-col flex-grow overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center gap-1 px-5 border-b border-white/10 bg-white/[0.02] overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab("business")}
                className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors ${
                  activeTab === "business"
                    ? "border-brand-purple text-brand-purpleLight"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                Store Details
              </button>
              <button
                onClick={() => setActiveTab("catalog")}
                className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors ${
                  activeTab === "catalog"
                    ? "border-brand-purple text-brand-purpleLight"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                Catalog Inventory ({storeState.products.length})
              </button>
              <button
                onClick={() => setActiveTab("add")}
                className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors ${
                  activeTab === "add"
                    ? "border-brand-purple text-brand-purpleLight"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                + Add Cracker
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6 overflow-y-auto flex-grow space-y-6">
              {/* Tab 1: Business Details */}
              {activeTab === "business" && (
                <form onSubmit={handleSaveBusiness} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Store Name
                      </label>
                      <input
                        type="text"
                        value={bizName}
                        onChange={(e) => setBizName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Verified Phone Number
                      </label>
                      <input
                        type="text"
                        value={bizPhone}
                        onChange={(e) => setBizPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Verified Address (Tiruvallur)
                    </label>
                    <input
                      type="text"
                      value={bizAddress}
                      onChange={(e) => setBizAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Operating Hours
                      </label>
                      <input
                        type="text"
                        value={bizHours}
                        onChange={(e) => setBizHours(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Hero Announcement Strip
                      </label>
                      <input
                        type="text"
                        value={bizAnnouncement}
                        onChange={(e) => setBizAnnouncement(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn btn-primary px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5"
                    >
                      <Save size={14} />
                      <span>Save Live Changes</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Tab 2: Catalog Inventory */}
              {activeTab === "catalog" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Manage product stock status and remove outdated lines:
                    </span>
                    <button
                      onClick={handleResetData}
                      className="text-xs text-brand-gold hover:underline flex items-center gap-1"
                    >
                      <RotateCcw size={12} />
                      <span>Reset to Initial Catalog</span>
                    </button>
                  </div>

                  <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
                    <div className="max-h-96 overflow-y-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-white/5 text-slate-400 font-semibold border-b border-white/10 sticky top-0">
                          <tr>
                            <th className="p-3">Product</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Stock Status</th>
                            <th className="p-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {storeState.products.map((p) => (
                            <tr key={p.id} className="hover:bg-white/[0.02]">
                              <td className="p-3 font-semibold text-white">{p.name}</td>
                              <td className="p-3 text-slate-400 capitalize">{p.category.replace("-", " ")}</td>
                              <td className="p-3 font-bold text-brand-gold">₹{p.price}</td>
                              <td className="p-3">
                                <button
                                  onClick={() => handleToggleStock(p.id)}
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                    p.inStock
                                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                      : "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                                  }`}
                                >
                                  {p.inStock ? "In Stock" : "Sold Out"}
                                </button>
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => handleDeleteProduct(p.id)}
                                  className="text-slate-500 hover:text-rose-400 p-1"
                                  aria-label="Delete product"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Add Cracker */}
              {activeTab === "add" && (
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newProdName}
                        onChange={(e) => setNewProdName(e.target.value)}
                        placeholder="e.g. Celestial Golden 12-Shot"
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Category *
                      </label>
                      <select
                        value={newProdCat}
                        onChange={(e) => setNewProdCat(e.target.value)}
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
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        required
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(e.target.value)}
                        placeholder="850"
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Pack Specification *
                      </label>
                      <input
                        type="text"
                        required
                        value={newProdPack}
                        onChange={(e) => setNewProdPack(e.target.value)}
                        placeholder="e.g. 1 Box (12 Shots)"
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Description (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={newProdDesc}
                      onChange={(e) => setNewProdDesc(e.target.value)}
                      placeholder="Cracker description and visual effect"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn btn-gold px-5 py-2.5 rounded-full text-xs font-bold text-obsidian flex items-center gap-1.5"
                    >
                      <Plus size={14} />
                      <span>Add to Showroom Catalog</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
