import {
  AddLiquidityModal,
  RemoveLiquidityModal,
  SettingsModal,
  TradeImportMarketModal,
  CreatePositionModal,
  ClaimAllPendingModal,
  ManageModal,
  RemoveAllInModal,
  RemoveAllOutModal,
  RemoveFarmModal,
  ClaimPendingModal,
  NFTGalleryDetailsModal,
  NFTGalleryBurnModal,
  NFTGallerySendModal,
} from "@/components/modals";

type Props = {};

const ModalProvider = (props: Props) => {
  return (
    <>
      <TradeImportMarketModal />
      <AddLiquidityModal />
      <RemoveLiquidityModal />
      <SettingsModal />
      <CreatePositionModal />
      <ClaimAllPendingModal />
      <ManageModal />
      <RemoveAllInModal />
      <RemoveAllOutModal />
      <RemoveFarmModal />
      <ClaimPendingModal />
      <NFTGalleryDetailsModal />
      <NFTGalleryBurnModal />
      <NFTGallerySendModal />
    </>
  );
};

export default ModalProvider;
