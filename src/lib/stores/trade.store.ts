import { create } from "zustand";

interface Props {
  marketID: string;
  setMarketID: (marketID: string) => void;
  isMarketOpen: boolean;
  onMarketOpen: () => void;
  onMarketClose: () => void;
  isImportMarketOpen: boolean;
  onImportMarketOpen: () => void;
  onImportMarketClose: () => void;
}

export const useTradeModal = create<Props>((set) => ({
  isMarketOpen: false,
  // marketID: "8BnEgHoWFysVcuFFX7QztDmzuH8r5ZFvyP3sYwn1XTh6",
  marketID: "CC9VYJprbxacpiS94tPJ1GyBhfvrLQbUiUSVMWvFohNW",
  setMarketID: (marketID: string) => set({ marketID }),
  onMarketOpen: () => set({ isMarketOpen: true }),
  onMarketClose: () => set({ isMarketOpen: false }),
  isImportMarketOpen: false,
  onImportMarketOpen: () => set({ isImportMarketOpen: true }),
  onImportMarketClose: () => set({ isImportMarketOpen: false }),
}));
