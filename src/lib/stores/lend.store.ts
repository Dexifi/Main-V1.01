import { create } from "zustand";

interface Props {
  isOpen: boolean;
  onSupplyOpen: () => void;
  onClose: () => void;
}

export const useSupplyModal = create<Props>((set) => ({
  isOpen: false,
  onSupplyOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

interface WithdrawProps {
  isOpen: boolean;
  onWithdrawOpen: () => void;
  onClose: () => void;
}

export const useWithdrawModal = create<WithdrawProps>((set) => ({
  isOpen: false,
  onWithdrawOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

interface BorrowProps {
  isOpen: boolean;
  onBorrowOpen: () => void;
  onClose: () => void;
}

export const useBorrowModal = create<BorrowProps>((set) => ({
  isOpen: false,
  onBorrowOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

interface RepayProps {
  isOpen: boolean;
  onRepayOpen: () => void;
  onClose: () => void;
}

export const useRepayModal = create<RepayProps>((set) => ({
  isOpen: false,
  onRepayOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
