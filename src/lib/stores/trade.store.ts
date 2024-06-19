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

type JUPModal = {
  open: boolean;
  target: "tokenA" | "tokenB";
  onClose: () => void;
  onOpen: (target: "tokenA" | "tokenB") => void;
};

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

export const useJupiterModal = create<JUPModal>((set) => ({
  onClose: () => set({ open: false }),
  onOpen: (target) => set({ open: true, target }),
  target: "tokenA",
  open: false,
}));
