"use client";

import React, { useState, useEffect } from "react";
import { StoreState, ProductItem, BusinessInfo, OrderInquiry } from "@/backend/models/types";
import { loadStoreState, saveStoreState } from "@/lib/store-data";
import AdminHeader from "./components/AdminHeader";
import AdminAuthGate from "./components/AdminAuthGate";
import AdminOverview from "./components/AdminOverview";
import AdminProductsManager from "./components/AdminProductsManager";
import AdminInquiryViewer from "./components/AdminInquiryViewer";
import AdminStoreSettings from "./components/AdminStoreSettings";
import { LayoutDashboard, Package, ShoppingBag, Settings } from "lucide-react";

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [storeState, setStoreState] = useState<StoreState>(loadStoreState);
  const [activeTab, setActiveTab] = useState<"overview" | "catalog" | "inquiries" | "settings">("overview");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync from backend API on mount
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setStoreState((prev) => ({ ...prev, products: res.data }));
        }
      })
      .catch(() => {});

    fetch("/api/inquiries")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setStoreState((prev) => ({ ...prev, inquiries: res.data }));
        }
      })
      .catch(() => {});
  }, []);

  const triggerSaveNotice = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Stock toggle
  const handleToggleStock = (productId: string) => {
    fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toggleStock: true }),
    }).catch(() => {});

    const updatedProducts = storeState.products.map((p) =>
      p.id === productId ? { ...p, inStock: !p.inStock } : p
    );
    const updated = { ...storeState, products: updatedProducts };
    setStoreState(updated);
    saveStoreState(updated);
    triggerSaveNotice();
  };

  // Price update
  const handleUpdatePrice = (productId: string, newPrice: number) => {
    fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: newPrice }),
    }).catch(() => {});

    const updatedProducts = storeState.products.map((p) =>
      p.id === productId ? { ...p, price: newPrice } : p
    );
    const updated = { ...storeState, products: updatedProducts };
    setStoreState(updated);
    saveStoreState(updated);
    triggerSaveNotice();
  };

  // Delete product
  const handleDeleteProduct = (productId: string) => {
    if (!confirm("Are you sure you want to remove this product from the showroom?")) return;

    fetch(`/api/products/${productId}`, { method: "DELETE" }).catch(() => {});

    const updatedProducts = storeState.products.filter((p) => p.id !== productId);
    const updated = { ...storeState, products: updatedProducts };
    setStoreState(updated);
    saveStoreState(updated);
    triggerSaveNotice();
  };

  // Add product
  const handleAddProduct = (newCracker: Partial<ProductItem>) => {
    fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCracker),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          const updated = { ...storeState, products: [res.data, ...storeState.products] };
          setStoreState(updated);
          saveStoreState(updated);
          triggerSaveNotice();
        }
      })
      .catch(() => {
        // Fallback local
        const item: ProductItem = {
          id: `dc-${Date.now().toString().slice(-4)}`,
          name: newCracker.name || "Cracker",
          slug: (newCracker.name || "cracker").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          category: newCracker.category || "gift-boxes",
          price: newCracker.price || 500,
          packSize: newCracker.packSize || "1 Box",
          image: newCracker.image || "/images/sparkler-fountain.jpg",
          inStock: true,
          featured: false,
          productType: "Cracker",
          description: newCracker.description || "",
          safetyInfo: newCracker.safetyInfo || "Light outdoors.",
        };
        const updated = { ...storeState, products: [item, ...storeState.products] };
        setStoreState(updated);
        saveStoreState(updated);
        triggerSaveNotice();
      });
  };

  // Update inquiry status
  const handleUpdateInquiryStatus = (id: string, status: OrderInquiry["status"]) => {
    fetch("/api/inquiries", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    }).catch(() => {});

    const inquiries = (storeState.inquiries || []).map((inq) =>
      inq.id === id ? { ...inq, status } : inq
    );
    const updated = { ...storeState, inquiries };
    setStoreState(updated);
    saveStoreState(updated);
    triggerSaveNotice();
  };

  // Save store business info
  const handleSaveBusiness = (updatedBiz: Partial<BusinessInfo>) => {
    fetch("/api/store", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBiz),
    }).catch(() => {});

    const updated = {
      ...storeState,
      business: { ...storeState.business, ...updatedBiz },
    };
    setStoreState(updated);
    saveStoreState(updated);
    triggerSaveNotice();
  };

  if (!isAuthenticated) {
    return <AdminAuthGate onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-obsidian text-white flex flex-col">
      {/* Header */}
      <AdminHeader
        onLogout={() => setIsAuthenticated(false)}
        saveSuccess={saveSuccess}
      />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 flex-grow">
        {/* Navigation Tabs (Responsive Segmented Pill Bar) */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-surface-1 border border-white/10 mb-8 shadow-md overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "overview"
                ? "bg-brand-purple text-white shadow-md shadow-brand-purple/40 border border-brand-purpleLight/40"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <LayoutDashboard size={15} />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("catalog")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "catalog"
                ? "bg-brand-purple text-white shadow-md shadow-brand-purple/40 border border-brand-purpleLight/40"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Package size={15} />
            <span>Catalog & Inventory ({storeState.products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "inquiries"
                ? "bg-brand-purple text-white shadow-md shadow-brand-purple/40 border border-brand-purpleLight/40"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ShoppingBag size={15} />
            <span>Order Reservations ({storeState.inquiries?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "settings"
                ? "bg-brand-purple text-white shadow-md shadow-brand-purple/40 border border-brand-purpleLight/40"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Settings size={15} />
            <span>Store Settings & Hours</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <AdminOverview storeState={storeState} />
            <div>
              <h3 className="font-display font-bold text-lg text-white mb-4">
                Recent Showroom Inventory
              </h3>
              <AdminProductsManager
                products={storeState.products.slice(0, 5)}
                onToggleStock={handleToggleStock}
                onUpdatePrice={handleUpdatePrice}
                onDeleteProduct={handleDeleteProduct}
                onAddProduct={handleAddProduct}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Catalog Inventory */}
        {activeTab === "catalog" && (
          <div className="animate-in fade-in duration-200">
            <AdminProductsManager
              products={storeState.products}
              onToggleStock={handleToggleStock}
              onUpdatePrice={handleUpdatePrice}
              onDeleteProduct={handleDeleteProduct}
              onAddProduct={handleAddProduct}
            />
          </div>
        )}

        {/* Tab 3: Order Inquiries */}
        {activeTab === "inquiries" && (
          <div className="animate-in fade-in duration-200">
            <AdminInquiryViewer
              inquiries={storeState.inquiries || []}
              onUpdateStatus={handleUpdateInquiryStatus}
            />
          </div>
        )}

        {/* Tab 4: Store Settings */}
        {activeTab === "settings" && (
          <div className="animate-in fade-in duration-200">
            <AdminStoreSettings
              business={storeState.business}
              onSaveBusiness={handleSaveBusiness}
            />
          </div>
        )}
      </div>
    </div>
  );
}
