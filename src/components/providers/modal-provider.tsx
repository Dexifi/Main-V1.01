import {
  AddLiquidityModal,
  SettingsModal,
  TradeImportMarketModal,
  TradeMarketModal,
} from "@/components/modals";

type Props = {};

const ModalProvider = (props: Props) => {
  return (
    <>
      <TradeImportMarketModal />
      <AddLiquidityModal />
      <SettingsModal />
    </>
  );
};

export default ModalProvider;
