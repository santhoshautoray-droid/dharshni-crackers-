export interface BusinessInfo {
  name: string;
  tagline?: string;
  category: string;
  address: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  googleRating: number;
  googleReviewCount: number;
  hours: string;
  mapsUrl: string;
  heroAnnouncement: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  desc?: string;
  count?: number;
  image?: string;
  iconName?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  packSize: string;
  image: string;
  gallery?: string[];
  inStock: boolean;
  featured: boolean;
  productType: string;
  description: string;
  safetyInfo: string;
  demoNote?: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface OrderInquiry {
  id: string;
  customerName: string;
  customerPhone: string;
  customerNotes?: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
}

export interface StoreState {
  business: BusinessInfo;
  categories: ProductCategory[];
  products: ProductItem[];
  complianceNotice?: string;
  inquiries?: OrderInquiry[];
}
