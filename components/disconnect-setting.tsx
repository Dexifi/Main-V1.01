import type { NextPage } from "next";
import styles from "./disconnect-setting.module.css";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

type DisconnectSettingType = {
  onClose?: () => void;
};

const DisconnectSetting: NextPage<DisconnectSettingType> = ({ onClose }) => {
  const { select, wallets, publicKey, disconnect } = useWallet();

  const handleDisconnect = () => {
    disconnect();
    onClose && onClose();
  };

  const handleExploreWallet = () => {
    window.open(
      `https://solscan.io/account/${publicKey?.toString()}`,
      "_blank"
    );
    onClose && onClose();
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(publicKey);
      onClose && onClose();
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className={styles.disconnectSetting}>
      <div className={styles.disconnectSettingChild} />
      <button
        className={styles.disconnectWalletWrapper}
        onClick={handleDisconnect}
      >
        <div className={styles.disconnectWallet}>Disconnect Wallet</div>
      </button>
      <button
        className={styles.openWalletInExplorerWrapper}
        onClick={handleExploreWallet}
      >
        <div className={styles.openWalletIn}>Open Wallet in Explorer</div>
      </button>
      <button
        className={styles.copyAddressWalletWrapper}
        onClick={handleCopyAddress}
      >
        <div className={styles.copyAddressWallet}>Copy Address Wallet</div>
      </button>
      <div className={styles.disconnectSettingItem} />
      <div className={styles.disconnectSettingInner} />
    </div>
  );
};

export default DisconnectSetting;
