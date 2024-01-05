import { create } from "zustand";

interface Props {
  isMarketOpen: boolean;
  onMarketOpen: () => void;
  onMarketClose: () => void;
  isImportMarketOpen: boolean;
  onImportMarketOpen: () => void;
  onImportMarketClose: () => void;
}

export const useTradeModal = create<Props>((set) => ({
  isMarketOpen: false,
  onMarketOpen: () => set({ isMarketOpen: true }),
  onMarketClose: () => set({ isMarketOpen: false }),
  isImportMarketOpen: false,
  onImportMarketOpen: () => set({ isImportMarketOpen: true }),
  onImportMarketClose: () => set({ isImportMarketOpen: false }),
}));
