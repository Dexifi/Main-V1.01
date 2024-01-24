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

interface RemoveProps {
  isOpen: boolean;
  onRemoveLiquidityOpen: () => void;
  onClose: () => void;
}

export const useRemoveLiquidityModal = create<RemoveProps>((set) => ({
  isOpen: false,
  onRemoveLiquidityOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

interface ManageProps {
  isOpen: boolean;
  onManageLiquidityOpen: () => void;
  onClose: () => void;
}

export const useManageLiquidityModal = create<ManageProps>((set) => ({
  isOpen: false,
  onManageLiquidityOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

interface CreatePositionProps {
  isOpen: boolean;
  onCreatePositionLiquidityOpen: () => void;
  onClose: () => void;
}

export const useCreatePositionLiquidityModal = create<CreatePositionProps>(
  (set) => ({
    isOpen: false,
    onCreatePositionLiquidityOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

interface RemoveAllPiRProps {
  isOpen: boolean;
  onRemoveAllPiRLiquidityOpen: () => void;
  onClose: () => void;
}

export const useRemoveAllPiRLiquidityModal = create<RemoveAllPiRProps>(
  (set) => ({
    isOpen: false,
    onRemoveAllPiRLiquidityOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

interface RemoveAllPoRProps {
  isOpen: boolean;
  onRemoveAllPoRLiquidityOpen: () => void;
  onClose: () => void;
}

export const useRemoveAllPoRLiquidityModal = create<RemoveAllPoRProps>(
  (set) => ({
    isOpen: false,
    onRemoveAllPoRLiquidityOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

interface ClaimAllProps {
  isOpen: boolean;
  onClaimAllLiquidityOpen: () => void;
  onClose: () => void;
}

export const useClaimAllLiquidityModal = create<ClaimAllProps>((set) => ({
  isOpen: false,
  onClaimAllLiquidityOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
