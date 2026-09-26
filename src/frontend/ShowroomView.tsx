"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { StoreState, ProductItem, CartItem } from "@/backend/models/types";
import { INITIAL_STORE_STATE, loadStoreState } from "@/lib/store-data";
import Navigation from "./components/Navigation";
import CustomCursor from "./components/CustomCursor";
import HeroSection from "./components/HeroSection";
import CategoryBento from "./components/CategoryBento";
import FeaturedShowcase from "./components/FeaturedShowcase";
import DiwaliExperience from "./components/DiwaliExperience";
import ProductCatalog from "./components/ProductCatalog";
import SafetySection from "./components/SafetySection";
import StoreLocation from "./components/StoreLocation";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";
import { Check } from "lucide-react";

// Dynamically split modals to minimize initial load bundle size and boost page opening speed
const CartDrawer = dynamic(() => import("./components/CartDrawer"), { ssr: false });
const ProductDetailModal = dynamic(() => import("./components/ProductDetailModal"), { ssr: false });
const OrderInquiryModal = dynamic(() => import("./components/OrderInquiryModal"), { ssr: false });
const AdminPortalModal = dynamic(() => import("./components/AdminPortalModal"), { ssr: false });

const CART_STORAGE = "dharshini_cart_v2";

export default function ShowroomView() {
  const [storeState, setStoreState] = useState<StoreState>(INITIAL_STORE_STATE);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeProductDetail, setActiveProductDetail] = useState<ProductItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Client hydration of persisted state without blocking first paint
  useEffect(() => {
    const saved = loadStoreState();
    if (saved && saved !== INITIAL_STORE_STATE) {
      setStoreState(saved);
    }
  }, []);

  // Sync with Backend API asynchronously in background
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          setStoreState((prev) => ({ ...prev, products: res.data }));
        }
      })
      .catch(() => {
        // Fallback to local storage state
      });
  }, []);

  // Load Cart from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE);
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not load cart", e);
    }
  }, []);

  // Save Cart to localStorage
  const updateCart = (newItems: CartItem[]) => {
    setCartItems(newItems);
    try {
      localStorage.setItem(CART_STORAGE, JSON.stringify(newItems));
    } catch (e) {
      console.warn("Could not save cart", e);
    }
  };

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  // Fly-to-cart particle animation
  const triggerFlyParticle = (sourceEl: HTMLElement) => {
    const cartBtn = document.getElementById("nav-cart-btn");
    if (!cartBtn) return;

    const sourceRect = sourceEl.getBoundingClientRect();
    const destRect = cartBtn.getBoundingClientRect();

    const particle = document.createElement("div");
    particle.className = "flying-particle";
    particle.style.left = `${sourceRect.left + sourceRect.width / 2}px`;
    particle.style.top = `${sourceRect.top + sourceRect.height / 2}px`;
    document.body.appendChild(particle);

    requestAnimationFrame(() => {
      particle.style.left = `${destRect.left + destRect.width / 2}px`;
      particle.style.top = `${destRect.top + destRect.height / 2}px`;
      particle.style.transform = "scale(0.35)";
      particle.style.opacity = "0.3";
    });

    setTimeout(() => {
      particle.remove();
    }, 650);
  };

  // Cart operations
  const handleAddToCart = (product: ProductItem, sourceEl?: HTMLElement, qty: number = 1) => {
    const existingIndex = cartItems.findIndex((i) => i.product.id === product.id);
    let updated: CartItem[];

    if (existingIndex > -1) {
      updated = [...cartItems];
      updated[existingIndex].quantity += qty;
    } else {
      updated = [...cartItems, { product, quantity: qty }];
    }

    updateCart(updated);
    if (sourceEl) {
      triggerFlyParticle(sourceEl);
    }
    showToast(`Added "${product.name}" to cart`);
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    const updated = cartItems
      .map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + delta }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updated);
  };

  const handleRemoveCartItem = (productId: string) => {
    const item = cartItems.find((i) => i.product.id === productId);
    const updated = cartItems.filter((i) => i.product.id !== productId);
    updateCart(updated);
    showToast(`Removed "${item?.product.name || "Item"}" from cart`);
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0);

  // Alt + A shortcut for Admin Portal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "a" || e.key === "A")) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-obsidian text-white relative selection:bg-brand-purple/40">
      {/* Desktop Custom Halo Cursor */}
      <CustomCursor />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-none">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-2/95 border border-brand-purple/50 shadow-xl shadow-black text-xs font-semibold text-white backdrop-blur-xl">
            <Check size={14} className="text-brand-purpleLight" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Floating Island Navigation */}
      <Navigation
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="pb-28 md:pb-0">
        {/* 1. Cinematic Hero */}
        <HeroSection business={storeState.business} />

        {/* 2. Quick Category Exploration Bento */}
        <CategoryBento onSelectCategory={setSelectedCategory} />

        {/* 3. Featured Hamper Spotlight */}
        {storeState.products[0] && (
          <FeaturedShowcase
            product={storeState.products[0]}
            onAddToCart={(p, el) => handleAddToCart(p, el, 1)}
            onViewDetails={(p) => setActiveProductDetail(p)}
          />
        )}

        {/* 4. Cinematic Diwali Experience ("LIGHT UP THE MOMENT") */}
        <DiwaliExperience />

        {/* 5. Complete Fireworks Showroom with Filters & Search */}
        <ProductCatalog
          products={storeState.products}
          categories={storeState.categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={(p, el) => handleAddToCart(p, el, 1)}
          onViewDetails={(p) => setActiveProductDetail(p)}
        />

        {/* 6. Certified Safety Standards */}
        <SafetySection />

        {/* 7. Store Location & Visiting Details */}
        <StoreLocation business={storeState.business} />
      </main>

      {/* Site Footer */}
      <Footer
        business={storeState.business}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Native Mobile Bottom Navigation */}
      <MobileBottomNav
        cartCount={totalCartCount}
        cartTotal={totalCartPrice}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedToInquiry={() => {
          setIsCartOpen(false);
          setIsInquiryOpen(true);
        }}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeProductDetail}
        onClose={() => setActiveProductDetail(null)}
        onAddToCart={(p, qty, el) => handleAddToCart(p, el, qty)}
      />

      {/* Order Inquiry & Reservation Modal */}
      <OrderInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        items={cartItems}
        business={storeState.business}
        onSuccess={() => {
          updateCart([]);
          showToast("Order Inquiry summary generated successfully!");
        }}
      />

      {/* Store Owner Admin Management Modal */}
      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        storeState={storeState}
        onStateUpdate={setStoreState}
      />
    </div>
  );
}
