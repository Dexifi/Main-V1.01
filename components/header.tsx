import React from "react";
import { FC, useCallback, useState, useRef } from "react";
import WalletSetting from "../components/wallet-setting";
import DisconnectSetting from "../components/disconnect-setting";
import styles from "../pages/dashboard.module.css";
import PortalPopup from "./portal-popup";
import { useRouter } from "next/router";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const Header: FC = ({ page }) => {
  const frameButtonRef = useRef<HTMLButtonElement>(null);
  const [isWalletSettingPopupOpen, setWalletSettingPopupOpen] = useState(false);
  const frameButton1Ref = useRef<HTMLButtonElement>(null);
  const [isDisconnectSettingPopupOpen, setDisconnectSettingPopupOpen] =
    useState(false);
  const openWalletSettingPopup = useCallback(() => {
    setWalletSettingPopupOpen(true);
  }, []);

  const closeWalletSettingPopup = useCallback(() => {
    setWalletSettingPopupOpen(false);
  }, []);

  const openDisconnectSettingPopup = useCallback(() => {
    setDisconnectSettingPopupOpen(true);
  }, []);

  const closeDisconnectSettingPopup = useCallback(() => {
    setDisconnectSettingPopupOpen(false);
  }, []);
  const router = useRouter();

  const onSwapClick = useCallback(() => {
    router.push("/index-swap");
  }, [router]);

  const onLendClick = useCallback(() => {
    router.push("/index-lend");
  }, [router]);

  const onTradeClick = useCallback(() => {
    router.push("/index-trade");
  }, [router]);

  const onYieldClick = useCallback(() => {
    router.push("/index-liquidity");
  }, [router]);

  const onFarm1Click = useCallback(() => {
    router.push("/index-farm");
  }, [router]);

  const onStakeClick = useCallback(() => {
    router.push("/index-stake");
  }, [router]);

  const onStake1Click = useCallback(() => {
    window.open("nft.dexifi.io");
  }, []);

  const onDAOClick = useCallback(() => {
    router.push("/index-i-d-o");
  }, [router]);

  const onDEXIFILOGOImageClick = useCallback(() => {
    router.push("/");
  }, [router]);

  const onDashboardClick = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  const { publicKey } = useWallet();
  return (
    <>
      <div className={styles.header1}>
        <div className={styles.lamp1} />
        <div className={styles.swapParent}>
          <a
            className={`${styles.swap} ${
              page === "swap" ? styles.activeHeader : ""
            }`}
            onClick={onSwapClick}
          >
            Swap
          </a>
          <a
            className={`${styles.lend} ${
              page === "lend" ? styles.activeHeader : ""
            }`}
            onClick={onLendClick}
          >
            Lend
          </a>
          <a className={styles.trade} onClick={onTradeClick}>
            Trade
          </a>
          <a
            className={`${styles.yield} ${
              page === "liquidity" ? styles.activeHeader : ""
            }`}
            onClick={onYieldClick}
          >
            Liquidity
          </a>
          <a className={styles.farm3} onClick={onFarm1Click}>
            Farm
          </a>
          <a className={styles.stake} onClick={onStakeClick}>
            Stake
          </a>
          <div className={styles.frameChild13} />
          <a
            className={`${styles.dashbord} ${
              page === "dashboard" ? styles.activeHeader : ""
            }`}
            onClick={onDashboardClick}
          >
            Dashboard
          </a>
          <a className={styles.stake1} onClick={onStake1Click}>
            NFT
          </a>
          <a className={styles.dao} onClick={onDAOClick}>
            IDO
          </a>
        </div>
        <img
          className={styles.dexifiLogoIcon}
          alt=""
          src="/dexifi-logo@2x.png"
          onClick={onDEXIFILOGOImageClick}
        />
        <div className={styles.componentParent}>
          <button
            className={styles.connectWalletWrapper}
            ref={frameButtonRef}
            onClick={() => {
              if (publicKey) openDisconnectSettingPopup();
            }}
          >
            <WalletMultiButton className={styles.connectWallet} />
          </button>
          <button
            className={styles.iconSettingsWrapper}
            ref={frameButton1Ref}
            onClick={openWalletSettingPopup}
          >
            <button className={styles.iconSettings}>
              <img className={styles.vectorIcon} alt="" src="/vector21.svg" />
              <img className={styles.vectorIcon1} alt="" src="/vector11.svg" />
            </button>
          </button>
        </div>
      </div>
      {isWalletSettingPopupOpen && (
        <PortalPopup
          overlayColor="rgba(13, 17, 27, 0.7)"
          placement="Top right"
          top={-520}
          relativeLayerRef={frameButtonRef}
          onOutsideClick={closeWalletSettingPopup}
        >
          <WalletSetting onClose={closeWalletSettingPopup} />
        </PortalPopup>
      )}
      {isDisconnectSettingPopupOpen && (
        <PortalPopup
          overlayColor="rgba(13, 17, 27, 0.7)"
          placement="Top right"
          top={-250}
          right={-200}
          relativeLayerRef={frameButton1Ref}
          onOutsideClick={closeDisconnectSettingPopup}
        >
          <DisconnectSetting onClose={closeDisconnectSettingPopup} />
        </PortalPopup>
      )}
    </>
  );
};
export default Header;
