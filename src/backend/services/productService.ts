import { ProductItem } from "../models/types";
import { getBackendStoreState, saveBackendStoreState } from "./storage";

export function getAllProducts(): ProductItem[] {
  const state = getBackendStoreState();
  return state.products;
}

export function getProductById(id: string): ProductItem | null {
  const state = getBackendStoreState();
  return state.products.find((p) => p.id === id) || null;
}

export function createProduct(input: Partial<ProductItem>): ProductItem {
  const state = getBackendStoreState();
  const newProduct: ProductItem = {
    id: `dc-${Date.now().toString().slice(-4)}`,
    name: input.name || "Celebration Cracker",
    slug: (input.name || "cracker").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    category: input.category || "gift-boxes",
    price: Number(input.price) || 500,
    originalPrice: input.originalPrice ? Number(input.originalPrice) : undefined,
    packSize: input.packSize || "1 Pack",
    image: input.image || "/images/sparkler-fountain.jpg",
    inStock: input.inStock ?? true,
    featured: input.featured ?? false,
    productType: input.productType || "Cracker",
    description: input.description || "Premium celebration fireworks from Dharshini Crackers Tiruvallur.",
    safetyInfo: input.safetyInfo || "Light outdoors in open clearance with water on standby.",
    demoNote: "Showroom catalog item",
  };

  const updatedProducts = [newProduct, ...state.products];
  saveBackendStoreState({ ...state, products: updatedProducts });
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<ProductItem>): ProductItem | null {
  const state = getBackendStoreState();
  const index = state.products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updated = { ...state.products[index], ...updates };
  const updatedProducts = [...state.products];
  updatedProducts[index] = updated;

  saveBackendStoreState({ ...state, products: updatedProducts });
  return updated;
}

export function deleteProduct(id: string): boolean {
  const state = getBackendStoreState();
  const filtered = state.products.filter((p) => p.id !== id);
  if (filtered.length === state.products.length) return false;

  saveBackendStoreState({ ...state, products: filtered });
  return true;
}

export function toggleProductStock(id: string): ProductItem | null {
  const state = getBackendStoreState();
  const product = state.products.find((p) => p.id === id);
  if (!product) return null;

  return updateProduct(id, { inStock: !product.inStock });
}
