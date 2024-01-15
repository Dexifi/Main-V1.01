import { create } from "zustand";

interface Props {
  isOpen: boolean;
  onNFTGalleryOpen: () => void;
  onClose: () => void;
}

export const useNFTGalleryModal = create<Props>((set) => ({
  isOpen: false,
  onNFTGalleryOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

interface SendProps {
  isOpen: boolean;
  onNFTGallerySendOpen: () => void;
  onClose: () => void;
}

export const useNFTGallerySendModal = create<SendProps>((set) => ({
  isOpen: false,
  onNFTGallerySendOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

interface BurnProps {
  isOpen: boolean;
  onNFTGalleryBurnOpen: () => void;
  onClose: () => void;
}

export const useNFTGalleryBurnModal = create<BurnProps>((set) => ({
  isOpen: false,
  onNFTGalleryBurnOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
