import { OrderInquiry } from "../models/types";
import { getBackendStoreState, saveBackendStoreState } from "./storage";

export function getAllInquiries(): OrderInquiry[] {
  const state = getBackendStoreState();
  return state.inquiries || [];
}

export function createOrderInquiry(input: Omit<OrderInquiry, "id" | "createdAt" | "status">): OrderInquiry {
  const state = getBackendStoreState();
  const newInquiry: OrderInquiry = {
    ...input,
    id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  const inquiries = [newInquiry, ...(state.inquiries || [])];
  saveBackendStoreState({ ...state, inquiries });
  return newInquiry;
}

export function updateInquiryStatus(id: string, status: OrderInquiry["status"]): OrderInquiry | null {
  const state = getBackendStoreState();
  const inquiries = state.inquiries || [];
  const index = inquiries.findIndex((inq) => inq.id === id);
  if (index === -1) return null;

  inquiries[index] = { ...inquiries[index], status };
  saveBackendStoreState({ ...state, inquiries });
  return inquiries[index];
}
