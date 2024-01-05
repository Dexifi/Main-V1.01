import {
  SettingsModal,
  TradeImportMarketModal,
  TradeMarketModal,
} from "@/components/modals";

type Props = {};

const ModalProvider = (props: Props) => {
  return (
    <>
      <TradeImportMarketModal />
      {/* <TradeMarketModal /> */}
      <SettingsModal />
    </>
  );
};

export default ModalProvider;
