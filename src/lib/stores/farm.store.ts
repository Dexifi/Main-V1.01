import { create } from "zustand";

interface Props {
  isOpen: boolean;
  onRemoveFarmOpen: () => void;
  onClose: () => void;
}

export const useRemoveFarmModal = create<Props>((set) => ({
  isOpen: false,
  onRemoveFarmOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

interface ClaimPendingProps {
  isOpen: boolean;
  onClaimPendingOpen: () => void;
  onClose: () => void;
}

export const useClaimPendingModal = create<ClaimPendingProps>((set) => ({
  isOpen: false,
  onClaimPendingOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
