import { create } from "zustand";

interface Props {
  isOpen: boolean;
  onAddLiquidityOpen: () => void;
  onClose: () => void;
}

export const useAddLiquidityModal = create<Props>((set) => ({
  isOpen: false,
  onAddLiquidityOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
