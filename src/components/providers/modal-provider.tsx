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
  AddAmmLiquidityModal,
  JupiterTradeModal,
} from "@/components/modals";
import { useJupiterModal, useTradeModal } from "@/lib/stores/trade.store";
import {
  useAddAmmLiquidityModal,
  useAddLiquidityModal,
  useClaimAllLiquidityModal,
  useCreatePositionLiquidityModal,
  useManageLiquidityModal,
  useRemoveAllPiRLiquidityModal,
  useRemoveAllPoRLiquidityModal,
  useRemoveAmmLiquidityModal,
  useRemoveLiquidityModal,
} from "@/lib/stores/liquidity.store";
import { useSettingsModal } from "@/lib/stores/settings.store";
import RemoveAmmLiquidityModal from "@/components/modals/remove-amm-liquidity-modal";

type Props = {};

const ModalProvider = (props: Props) => {
  const { isImportMarketOpen } = useTradeModal();
  const { isOpen: isAddLiquidityModal } = useAddLiquidityModal();
  const { isOpen: isAddAmmLiquidityModal } = useAddAmmLiquidityModal();
  const { isOpen: isRemoveLiquidityModal } = useRemoveLiquidityModal();
  const { isOpen: isSettingsModal } = useSettingsModal();
  const { isOpen: isCreatePositionLiquidityModal } =
    useCreatePositionLiquidityModal();
  const { isOpen: isClaimAllLiquidityModal } = useClaimAllLiquidityModal();
  const { isOpen: isManageLiquidityModal } = useManageLiquidityModal();
  const { isOpen: isRemoveAllPiRLiquidityModal } =
    useRemoveAllPiRLiquidityModal();
  const { isOpen: isRemoveAllPoRLiquidityModal } =
    useRemoveAllPoRLiquidityModal();
  const { isOpen: isRemoveAmmLiquidityModal } = useRemoveAmmLiquidityModal();
  const { open: isJupiterModal } = useJupiterModal();
  return (
    <>
      {isImportMarketOpen && <TradeImportMarketModal />}
      {isAddLiquidityModal && <AddLiquidityModal />}
      {isAddAmmLiquidityModal && <AddAmmLiquidityModal />}
      {isRemoveLiquidityModal && <RemoveLiquidityModal />}
      {isSettingsModal && <SettingsModal />}
      {isCreatePositionLiquidityModal && <CreatePositionModal />}
      {isClaimAllLiquidityModal && <ClaimAllPendingModal />}
      {isManageLiquidityModal && <ManageModal />}
      {isRemoveAllPiRLiquidityModal && <RemoveAllInModal />}
      {isRemoveAllPoRLiquidityModal && <RemoveAllOutModal />}
      {isRemoveAmmLiquidityModal && <RemoveAmmLiquidityModal />}
      {isJupiterModal && <JupiterTradeModal />}
      <RemoveFarmModal />
      <ClaimPendingModal />
      <NFTGalleryDetailsModal />
      <NFTGalleryBurnModal />
      <NFTGallerySendModal />
    </>
  );
};

export default ModalProvider;
