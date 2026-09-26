import { BusinessInfo } from "../models/types";
import { getBackendStoreState, saveBackendStoreState } from "./storage";

export function getStoreBusinessInfo(): BusinessInfo {
  const state = getBackendStoreState();
  return state.business;
}

export function updateStoreBusinessInfo(updates: Partial<BusinessInfo>): BusinessInfo {
  const state = getBackendStoreState();
  const updatedBusiness: BusinessInfo = {
    ...state.business,
    ...updates,
    // Preserve core verified Tiruvallur coordinates & Google reviews
    coordinates: updates.coordinates || state.business.coordinates,
    googleRating: state.business.googleRating,
    googleReviewCount: state.business.googleReviewCount,
    mapsUrl: state.business.mapsUrl,
  };

  saveBackendStoreState({ ...state, business: updatedBusiness });
  return updatedBusiness;
}
