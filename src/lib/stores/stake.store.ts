import { create } from "zustand";

interface DepositProps {
  isOpen: boolean;
  onDepositOpen: () => void;
  onClose: () => void;
}

export const useDepositModal = create<DepositProps>((set) => ({
  isOpen: false,
  onDepositOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

interface UnstakeProps {
  isOpen: boolean;
  onUnstakeOpen: () => void;
  onClose: () => void;
}

export const useUnstakeModal = create<UnstakeProps>((set) => ({
  isOpen: false,
  onUnstakeOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
