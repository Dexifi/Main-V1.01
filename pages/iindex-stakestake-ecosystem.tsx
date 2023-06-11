import type { NextPage } from "next";
import { useState, useRef, useCallback } from "react";
import Unstakepopup3 from "../components/unstakepopup3";
import PortalPopup from "../components/portal-popup";
import WalletSetting from "../components/wallet-setting";
import DisconnectSetting from "../components/disconnect-setting";
import { useRouter } from "next/router";
import styles from "./iindex-stakestake-ecosystem.module.css";
const IindexStakestakeEcosystem: NextPage = () => {
  const [isUnstakepopupOpen, setUnstakepopupOpen] = useState(false);
  const [isUnstakepopup1Open, setUnstakepopup1Open] = useState(false);
  const frameButtonRef = useRef<HTMLButtonElement>(null);
  const [isWalletSettingPopupOpen, setWalletSettingPopupOpen] = useState(false);
  const frameButton1Ref = useRef<HTMLButtonElement>(null);
  const [isDisconnectSettingPopupOpen, setDisconnectSettingPopupOpen] =
    useState(false);
  const router = useRouter();

  const openUnstakepopup = useCallback(() => {
    setUnstakepopupOpen(true);
  }, []);

  const closeUnstakepopup = useCallback(() => {
    setUnstakepopupOpen(false);
  }, []);

  const openUnstakepopup1 = useCallback(() => {
    setUnstakepopup1Open(true);
  }, []);

  const closeUnstakepopup1 = useCallback(() => {
    setUnstakepopup1Open(false);
  }, []);

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

  const onDEXIFILOGOImageClick = useCallback(() => {
    router.push("/index-stake");
  }, [router]);

  const onEcosystemTextClick = useCallback(() => {
    router.push("/index-stakestake-ecosystem");
  }, [router]);

  const onMyVaultsTextClick = useCallback(() => {
    router.push("/index-stakemy");
  }, [router]);

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

  const onFarmClick = useCallback(() => {
    router.push("/index-farm");
  }, [router]);

  const onStakeClick = useCallback(() => {
    router.push("/index-stake");
  }, [router]);

  const onDashbordClick = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  const onStake1Click = useCallback(() => {
    window.open("nft.dexifi.io");
  }, []);

  const onDAOClick = useCallback(() => {
    router.push("/index-i-d-o");
  }, [router]);

  const onDEXIFILOGOImage1Click = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <>
      <div className={styles.indexstakeliquiditystake}>
        <div className={styles.lamp} />
        <div className={styles.liquidityPanel}>
          <div className={styles.listPanel}>
            <div className={styles.marinadeMsol53739782405Wrapper}>
              <div className={styles.marinadeMsol5373978Container}>
                <span className={styles.marinadeMsol5373978Container1}>
                  <p className={styles.p}>10.0 %</p>
                  <p className={styles.p}>Marinade</p>
                  <p className={styles.p}>mSOL</p>
                  <p className={styles.p}>$5,373,978</p>
                  <p className={styles.p}>24.051.027 SOL</p>
                  <p className={styles.p}>0.0 %</p>
                  <p className={styles.p}>6.0 %</p>
                </span>
              </div>
            </div>
            <div className={styles.aprProviderTokenTvlTvlDWrapper}>
              <div className={styles.aprProviderTokenContainer}>
                <span className={styles.marinadeMsol5373978Container1}>
                  <p className={styles.p}>APR</p>
                  <p className={styles.p}>Provider</p>
                  <p className={styles.p}>Token</p>
                  <p className={styles.p}>TVL</p>
                  <p className={styles.p}>TVL $</p>
                  <p className={styles.p}>Deposit fee</p>
                  <p className={styles.p}>Staking rewards fee</p>
                </span>
              </div>
            </div>
            <div className={styles.assetParent}>
              <div className={styles.asset}>Asset</div>
              <div className={styles.sol1}>SOL</div>
              <img
                className={styles.marinadeLogoCopy1}
                alt=""
                src="/marinadelogo-copy-1@2x.png"
              />
            </div>
            <div className={styles.createPositionButtonParent}>
              <button
                className={styles.createPositionButton}
                onClick={openUnstakepopup}
              >
                <div className={styles.stake}>Stake</div>
              </button>
              <div className={styles.exchangeRateValueContainer}>
                <p className={styles.p}>Exchange rate</p>
                <p className={styles.p}>&nbsp;</p>
                <p className={styles.p}>Value</p>
              </div>
              <div className={styles.sol090790Container}>
                <p className={styles.p}>1 SOL ≈ 0.90790 mSOL</p>
                <p className={styles.p}>&nbsp;</p>
                <p className={styles.p}>{`10 mSOL ≈ $ 104.25 `}</p>
              </div>
              <div className={styles.per1}>
                <input className={styles.per1Child} type="number" />
                <div className={styles.solana3Parent}>
                  <img
                    className={styles.solana3Icon}
                    alt=""
                    src="/solana-3@2x.png"
                  />
                  <div className={styles.sol2}>SOL</div>
                </div>
                <div className={styles.balance11366987}>
                  Balance : 113.66987 SOL
                </div>
              </div>
              <button className={styles.maxbutton}>
                <div className={styles.max}>Max</div>
              </button>
            </div>
            <div className={styles.createPositionButtonGroup}>
              <button
                className={styles.createPositionButton}
                onClick={openUnstakepopup1}
              >
                <div className={styles.stake}>Unstake</div>
              </button>
              <div className={styles.exchangeRateValueContainer}>
                <p className={styles.p}>Exchange rate</p>
                <p className={styles.p}>&nbsp;</p>
                <p className={styles.p}>Value</p>
              </div>
              <div className={styles.sol090790Container}>
                <p className={styles.p}>1 mSOL ≈ 1.108560 SOL</p>
                <p className={styles.p}>&nbsp;</p>
                <p className={styles.p}>{`10 SOL ≈ $ 104.25 `}</p>
              </div>
              <div className={styles.per11}>
                <div className={styles.marinadeLogoCopy1Parent}>
                  <img
                    className={styles.marinadeLogoCopy1}
                    alt=""
                    src="/marinadelogo-copy-11@2x.png"
                  />
                  <div className={styles.sol2}>mSOL</div>
                </div>
                <input className={styles.per1Item} type="number" />
                <div className={styles.balance11366987}>
                  Balance : 11.001 mSOL
                </div>
              </div>
              <button className={styles.maxbutton}>
                <div className={styles.max}>Max</div>
              </button>
            </div>
          </div>
          <div className={styles.listPanel1}>
            <div className={styles.listOfAll}>
              List of All Liquidity Stake Provided in Network For Staking Solana
            </div>
            <div className={styles.noteThatUnstaking}>
              Note that Unstaking takes between 2-3 days, you can always
              exchange your tokens with Swap.
            </div>
            <img className={styles.solana4Icon} alt="" src="/solana-4@2x.png" />
          </div>
          <div className={styles.rectangleParent}>
            <div className={styles.instanceChild} />
            <div className={styles.instanceItem} />
            <img
              className={styles.dexifiLogoIcon}
              alt=""
              src="/dexifi-logo1@2x.png"
              onClick={onDEXIFILOGOImageClick}
            />
            <div className={styles.ecosystem} onClick={onEcosystemTextClick}>
              Ecosystem
            </div>
            <div className={styles.myVaults} onClick={onMyVaultsTextClick}>
              My Vaults
            </div>
            <div className={styles.liquidityStake}>Liquidity Stake</div>
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.lamp1} />
          <div className={styles.swapParent}>
            <a className={styles.swap} onClick={onSwapClick}>
              Swap
            </a>
            <a className={styles.lend} onClick={onLendClick}>
              Lend
            </a>
            <a className={styles.trade} onClick={onTradeClick}>
              Trade
            </a>
            <a className={styles.yield} onClick={onYieldClick}>
              Liquidity
            </a>
            <a className={styles.farm} onClick={onFarmClick}>
              Farm
            </a>
            <a className={styles.stake1} onClick={onStakeClick}>
              Stake
            </a>
            <div className={styles.frameChild} />
            <a className={styles.dashbord} onClick={onDashbordClick}>
              Dashboard
            </a>
            <a className={styles.stake2} onClick={onStake1Click}>
              NFT
            </a>
            <a className={styles.dao} onClick={onDAOClick}>
              IDO
            </a>
          </div>
          <img
            className={styles.dexifiLogoIcon1}
            alt=""
            src="/dexifi-logo@2x.png"
            onClick={onDEXIFILOGOImage1Click}
          />
          <div className={styles.instanceParent}>
            <button
              className={styles.connectWalletWrapper}
              ref={frameButtonRef}
              onClick={openWalletSettingPopup}
            >
              <button className={styles.connectWallet}>Connect Wallet</button>
            </button>
            <button
              className={styles.iconSettingsWrapper}
              ref={frameButton1Ref}
              onClick={openDisconnectSettingPopup}
            >
              <button className={styles.iconSettings}>
                <img className={styles.vectorIcon} alt="" src="/vector15.svg" />
                <img
                  className={styles.vectorIcon1}
                  alt=""
                  src="/vector16.svg"
                />
              </button>
            </button>
          </div>
        </div>
        <div className={styles.v101202204202200UtcContainer}>
          <p className={styles.p}>V1.0.1</p>
          <p className={styles.p}>2022-04-20 22:00 UTC</p>
        </div>
      </div>
      {isUnstakepopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeUnstakepopup}
        >
          <Unstakepopup3 onClose={closeUnstakepopup} />
        </PortalPopup>
      )}
      {isUnstakepopup1Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeUnstakepopup1}
        >
          <Unstakepopup3 onClose={closeUnstakepopup1} />
        </PortalPopup>
      )}
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
          relativeLayerRef={frameButton1Ref}
          onOutsideClick={closeDisconnectSettingPopup}
        >
          <DisconnectSetting onClose={closeDisconnectSettingPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default IindexStakestakeEcosystem;
