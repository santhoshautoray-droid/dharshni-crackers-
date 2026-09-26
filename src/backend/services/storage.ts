import fs from "fs";
import path from "path";
import { StoreState, ProductItem, BusinessInfo, OrderInquiry } from "../models/types";
import { INITIAL_VERIFIED_DATA } from "./initialData";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "store.json");

// In-memory cache
let inMemoryState: StoreState = JSON.parse(JSON.stringify(INITIAL_VERIFIED_DATA));
let isLoaded = false;

function ensureFileExists(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_VERIFIED_DATA, null, 2), "utf-8");
    }
  } catch (err) {
    console.warn("Storage FS access warning, using in-memory state:", err);
  }
}

export function getBackendStoreState(): StoreState {
  if (isLoaded && inMemoryState) {
    return inMemoryState;
  }
  try {
    ensureFileExists();
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      inMemoryState = JSON.parse(raw);
      isLoaded = true;
    }
  } catch (err) {
    console.warn("Reading store data failed, using in-memory:", err);
  }
  return inMemoryState;
}

export function saveBackendStoreState(newState: StoreState): StoreState {
  inMemoryState = newState;
  try {
    ensureFileExists();
    fs.writeFileSync(DATA_FILE, JSON.stringify(newState, null, 2), "utf-8");
  } catch (err) {
    console.warn("Writing store data failed, persisted to memory only:", err);
  }
  return inMemoryState;
}
