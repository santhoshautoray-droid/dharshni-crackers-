/**
 * DHARSHINI CRACKERS – TIRUVALLUR
 * Centralized Store Data & Single Source of Truth
 * Exclusively for the verified Tiruvallur location (No Sivakasi/Mettamalai mix)
 */

import type {
  BusinessInfo,
  ProductCategory,
  ProductItem,
  StoreState,
  CartItem,
  OrderInquiry,
} from "@/backend/models/types";

export type {
  BusinessInfo,
  ProductCategory,
  ProductItem,
  StoreState,
  CartItem,
  OrderInquiry,
};

export const INITIAL_STORE_STATE: StoreState = {
  business: {
    name: "Dharshini Crackers – Tiruvallur",
    tagline: "Futuristic Festival Fireworks Showroom",
    category: "Fireworks Store",
    address: "Shop No. 139, Shakti Nagar, near Vivekananda School, near Salai Road, Tiruvaloor, Tamil Nadu 602001, India",
    phone: "+91 96775 85657",
    hours: "8:00 AM – 8:00 PM daily",
    coordinates: {
      lat: 13.1294422,
      lng: 79.8989643,
    },
    googleRating: 4.8,
    googleReviewCount: 55,
    mapsUrl: "https://www.google.com/maps/place/Dharshini+Crackers+%E2%80%93+Tiruvallur/@13.1294422,79.8989643,17z/",
    heroAnnouncement: "Festival Season 2026 Collection – Visit our Tiruvallur showroom",
  },
  complianceNotice: "Important Compliance Notice: Fireworks sales and inquiry fulfillment comply with Tamil Nadu state regulations and licensed safety guidelines. Catalog prices and stock indications are demo/customizable via the Store Admin Portal.",
  categories: [
    { id: "all", name: "All Fireworks", count: 12, image: "/images/hero-bloom.jpg", desc: "Complete showroom catalog" },
    { id: "gift-boxes", name: "Gift Boxes", count: 2, image: "/images/gift-box.jpg", desc: "Curated celebration hampers with assorted premium fireworks" },
    { id: "sky-shots", name: "Aerial Sky Shots", count: 2, image: "/images/sky-shots.jpg", desc: "Multi-tube repeaters with brilliant aerial blooms" },
    { id: "sparklers", name: "Sparklers", count: 2, image: "/images/sparklers.jpg", desc: "Vibrant handheld sparklers in gold and electric violet" },
    { id: "chakkars", name: "Ground Chakkars", count: 2, image: "/images/chakkars.jpg", desc: "High-speed spinning wheels with circular stardust sparks" },
    { id: "flower-pots", name: "Fountains & Pots", count: 2, image: "/images/sparkler-fountain.jpg", desc: "Dazzling vertical showers and golden fountain flares" },
    { id: "rockets", name: "Celebration Rockets", count: 2, image: "/images/rockets.jpg", desc: "High-altitude whistling rockets and parachute bursts" },
  ],
  products: [
    {
      id: "dc-01",
      name: "Royal Velvet Celebration Box",
      slug: "royal-velvet-celebration-box",
      category: "gift-boxes",
      price: 2499,
      originalPrice: 2899,
      packSize: "35 Varieties / Deluxe Box",
      image: "/images/gift-box.jpg",
      gallery: ["/images/gift-box.jpg", "/images/sparkler-fountain.jpg", "/images/chakkars.jpg"],
      inStock: true,
      featured: true,
      productType: "Hamper",
      description: "An exquisite royal celebration pack curated with 35 distinct fireworks varieties including ground chakkars, sparklers, flower pots, and mini sky repeaters. Encased in velvet-textured festive packaging with gold foil.",
      safetyInfo: "Open in dry outdoor area. Light each item individually with sparklers or punk stick. Maintain 5 meters clearance.",
      demoNote: "Demo catalog item (editable in Admin Portal)",
    },
    {
      id: "dc-02",
      name: "Midnight Sparkle 25-Sky Repeater",
      slug: "midnight-sparkle-repeater",
      category: "sky-shots",
      price: 1850,
      originalPrice: 2100,
      packSize: "1 Multi-Tube Cake (25 Shots)",
      image: "/images/sky-shots.jpg",
      gallery: ["/images/sky-shots.jpg", "/images/hero-bloom.jpg"],
      inStock: true,
      featured: true,
      productType: "Aerial Cake",
      description: "A synchronized 25-shot aerial battery launching high-altitude chrysanthemum blooms in vivid electric violet, deep ruby, and glittering champagne gold with crackling comet tails.",
      safetyInfo: "Place on flat, hard ground. Secure sides with bricks. Light fuse at arm length and retreat at least 15 meters immediately.",
      demoNote: "Demo catalog item (editable in Admin Portal)",
    },
    {
      id: "dc-03",
      name: "Golden Stardust Sparklers",
      slug: "golden-stardust-sparklers",
      category: "sparklers",
      price: 190,
      originalPrice: 220,
      packSize: "10 Sticks / Box (15cm)",
      image: "/images/sparklers.jpg",
      inStock: true,
      featured: false,
      productType: "Hand Sparkler",
      description: "Long-burning festive hand sparklers producing warm champagne embers with micro-star crackles. Smooth ignition with minimal smoke discharge.",
      safetyInfo: "Hold at arm's length facing away from face. Submerge spent hot wire in water bucket immediately after use.",
      demoNote: "Demo catalog item (editable in Admin Portal)",
    },
    {
      id: "dc-04",
      name: "Hyper-Spinning Chakra Wheel",
      slug: "hyper-spinning-chakra-wheel",
      category: "chakkars",
      price: 260,
      originalPrice: 299,
      packSize: "10 Pcs / Pack",
      image: "/images/chakkars.jpg",
      inStock: true,
      featured: true,
      productType: "Ground Spinner",
      description: "Precision-balanced ground chakkar spinning rapidly to generate hypnotic concentric rings of brilliant gold sparks and violet stardust glow.",
      safetyInfo: "Use only on smooth concrete or open pavement. Light center fuse and step back 4 meters.",
      demoNote: "Demo catalog item (editable in Admin Portal)",
    },
    {
      id: "dc-05",
      name: "Imperial Gold Fountain Pot",
      slug: "imperial-gold-fountain-pot",
      category: "flower-pots",
      price: 340,
      originalPrice: 390,
      packSize: "5 Pcs Pack",
      image: "/images/sparkler-fountain.jpg",
      inStock: true,
      featured: true,
      productType: "Fountain Pot",
      description: "High-volume conical fountain pot delivering a towering 12-foot eruption of sparkling golden glitter trails and lavender embers.",
      safetyInfo: "Place upright on flat ground. Do not lean over pot while igniting. Keep 5 meters safe radius.",
      demoNote: "Demo catalog item (editable in Admin Portal)",
    },
    {
      id: "dc-06",
      name: "Titan Aero Rockets",
      slug: "titan-aero-rockets",
      category: "rockets",
      price: 480,
      originalPrice: 550,
      packSize: "5 Pcs Pack",
      image: "/images/rockets.jpg",
      inStock: true,
      featured: false,
      productType: "Aerial Rocket",
      description: "Aerodynamic celebration rockets with rapid vertical ascent, whistling trail, and high-altitude starburst canopy.",
      safetyInfo: "Insert rocket guide stick into stable launch bottle or pipe. Launch only in wide open outdoor space away from trees and overhead wires.",
      demoNote: "Demo catalog item (editable in Admin Portal)",
    },
    {
      id: "dc-07",
      name: "Majestic Crown Festival Hamper",
      slug: "majestic-crown-festival-hamper",
      category: "gift-boxes",
      price: 3950,
      originalPrice: 4500,
      packSize: "50 Assorted Varieties",
      image: "/images/gift-box.jpg",
      inStock: true,
      featured: true,
      productType: "Luxury Hamper",
      description: "The premier grand festival collection featuring our complete showcase: aerial repeaters, mega fountains, multi-colored sparklers, whistling rockets, and luxury ground novelties.",
      safetyInfo: "Store in a cool, dry area away from inflammable items. Read individual pack instructions before lighting.",
      demoNote: "Demo catalog item (editable in Admin Portal)",
    },
    {
      id: "dc-08",
      name: "Celestial 12-Shot Aerial Battery",
      slug: "celestial-12-shot-aerial-battery",
      category: "sky-shots",
      price: 920,
      originalPrice: 1050,
      packSize: "1 Box (12 Shots)",
      image: "/images/sky-shots.jpg",
      inStock: true,
      featured: false,
      productType: "Aerial Cake",
      description: "Compact multi-shot repeating cake offering rapid bursts of vibrant purple peonies and flashing strobe willow stars.",
      safetyInfo: "Clear viewing perimeter of 15m minimum. Never attempt to relight a dud or unexploded shot.",
      demoNote: "Demo catalog item (editable in Admin Portal)",
    },
    {
      id: "dc-09",
      name: "Diamond Electric Violet Sparklers",
      slug: "diamond-electric-violet-sparklers",
      category: "sparklers",
      price: 220,
      originalPrice: 250,
      packSize: "10 Sticks / Box (30cm)",
      image: "/images/sparklers.jpg",
      inStock: true,
      featured: false,
      productType: "Hand Sparkler",
      description: "Extra-long 30cm sparklers with steady electric violet and silver glitter trail. Up to 90 seconds continuous burn time.",
      safetyInfo: "Always wear cotton clothes when lighting. Keep away from small children without adult supervision.",
      demoNote: "Demo catalog item (editable in Admin Portal)",
    },
    {
      id: "dc-10",
      name: "Double-Ring Mega Chakkar",
      slug: "double-ring-mega-chakkar",
      category: "chakkars",
      price: 380,
      originalPrice: 420,
      packSize: "5 Giant Pcs",
      image: "/images/chakkars.jpg",
      inStock: true,
      featured: false,
      productType: "Ground Spinner",
      description: "Heavyweight ground spinner with dual explosive spinning orbits, transforming from gold flame into outer violet spark rings.",
      safetyInfo: "Only for smooth flat outdoor surfaces. Keep spectators at 5 meters distance.",
      demoNote: "Demo catalog item (editable in Admin Portal)",
    },
    {
      id: "dc-11",
      name: "Golden Shower Jumbo Flower Pot",
      slug: "golden-shower-jumbo-flower-pot",
      category: "flower-pots",
      price: 420,
      originalPrice: 480,
      packSize: "4 Jumbo Pots",
      image: "/images/sparkler-fountain.jpg",
      inStock: true,
      featured: false,
      productType: "Fountain Pot",
      description: "Jumbo edition fountain delivering prolonged, dense cascading gold spark streams reaching over 15 feet high.",
      safetyInfo: "Firmly embed base into ground or sand. Ignite fuse from side and step back.",
      demoNote: "Demo catalog item (editable in Admin Portal)",
    },
    {
      id: "dc-12",
      name: "Cosmic Whistling Rockets",
      slug: "cosmic-whistling-rockets",
      category: "rockets",
      price: 540,
      originalPrice: 620,
      packSize: "6 Pcs Pack",
      image: "/images/rockets.jpg",
      inStock: true,
      featured: false,
      productType: "Aerial Rocket",
      description: "Acoustic screamer rockets ascending with powerful sonic whistling whistle followed by a sky-filling golden titanium burst.",
      safetyInfo: "Ensure launch angle is strictly vertical. Do not aim toward buildings or people.",
      demoNote: "Demo catalog item (editable in Admin Portal)",
    },
  ],
};

const STORAGE_KEY = "dharshini_crackers_store_v2";

export function loadStoreState(): StoreState {
  if (typeof window === "undefined") return INITIAL_STORE_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.products && parsed.business) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Error loading local store state", e);
  }
  return INITIAL_STORE_STATE;
}

export function saveStoreState(data: StoreState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("storeStateChanged", { detail: data }));
  } catch (e) {
    console.error("Error saving local store state", e);
  }
}

export function resetStoreState(): StoreState {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("storeStateChanged", { detail: INITIAL_STORE_STATE }));
  }
  return INITIAL_STORE_STATE;
}
