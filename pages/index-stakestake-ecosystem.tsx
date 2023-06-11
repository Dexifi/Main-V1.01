import type { NextPage } from "next";
import { useState, useRef, useCallback } from "react";
import DepositStakepopup from "../components/deposit-stakepopup";
import PortalPopup from "../components/portal-popup";
import Unstakepopup3 from "../components/unstakepopup3";
import WalletSetting from "../components/wallet-setting";
import DisconnectSetting from "../components/disconnect-setting";
import { useRouter } from "next/router";
import styles from "./index-stakestake-ecosystem.module.css";
const IndexStakestakeEcosystem: NextPage = () => {
  const [isDepositStakepopupOpen, setDepositStakepopupOpen] = useState(false);
  const [isUnstakepopupOpen, setUnstakepopupOpen] = useState(false);
  const frameButtonRef = useRef<HTMLButtonElement>(null);
  const [isWalletSettingPopupOpen, setWalletSettingPopupOpen] = useState(false);
  const frameButton1Ref = useRef<HTMLButtonElement>(null);
  const [isDisconnectSettingPopupOpen, setDisconnectSettingPopupOpen] =
    useState(false);
  const router = useRouter();

  const openDepositStakepopup = useCallback(() => {
    setDepositStakepopupOpen(true);
  }, []);

  const closeDepositStakepopup = useCallback(() => {
    setDepositStakepopupOpen(false);
  }, []);

  const openUnstakepopup = useCallback(() => {
    setUnstakepopupOpen(true);
  }, []);

  const closeUnstakepopup = useCallback(() => {
    setUnstakepopupOpen(false);
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

  const onMyVaultsTextClick = useCallback(() => {
    router.push("/index-stakemy");
  }, [router]);

  const onLiquidityStakeTextClick = useCallback(() => {
    router.push("/iindex-stakestake-ecosystem");
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
      <div className={styles.indexstakeecosystem}>
        <div className={styles.lamp} />
        <div className={styles.liquidityPanel}>
          <div className={styles.listPanel}>
            <div className={styles.poolOverwiew}>
              <div className={styles.listOfAll}>
                List of All Active Vaults in Ecosystem
              </div>
            </div>
            <div className={styles.myLocksParent}>
              <div className={styles.myLocks}>My Locks</div>
              <div className={styles.value}>Value</div>
              <div className={styles.rewards}>Rewards</div>
              <div className={styles.div}>$ 2000.05</div>
              <div className={styles.total}>Total</div>
              <div className={styles.div1}>$ 2100.750</div>
              <div className={styles.div2}>$ 100.75</div>
            </div>
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
            <div className={styles.ecosystem}>Ecosystem</div>
            <div className={styles.myVaults} onClick={onMyVaultsTextClick}>
              My Vaults
            </div>
            <div
              className={styles.liquidityStake}
              onClick={onLiquidityStakeTextClick}
            >
              Liquidity Stake
            </div>
          </div>
          <div className={styles.listPanel1}>
            <div className={styles.raydiumRay537397824051Wrapper}>
              <div className={styles.raydiumRay5373978Container}>
                <span className={styles.raydiumRay5373978Container1}>
                  <p className={styles.p}>10.0 %</p>
                  <p className={styles.p}>Raydium</p>
                  <p className={styles.p}>RAY</p>
                  <p className={styles.p}>$5,373,978</p>
                  <p className={styles.p}>24.051.027 RAY</p>
                  <p className={styles.p}>-</p>
                  <p className={styles.p}>-</p>
                </span>
              </div>
            </div>
            <div className={styles.aprProviderRewardTvlTvlWrapper}>
              <div className={styles.aprProviderRewardContainer}>
                <span className={styles.raydiumRay5373978Container1}>
                  <p className={styles.p}>APR</p>
                  <p className={styles.p}>Provider</p>
                  <p className={styles.p}>Reward</p>
                  <p className={styles.p}>TVL</p>
                  <p className={styles.p}>TVL $</p>
                  <p className={styles.p}>Lock Time</p>
                  <p className={styles.p}>Withdraw Pending</p>
                </span>
              </div>
            </div>
            <div className={styles.vaultsParent}>
              <div className={styles.vaults}>{`Vaults `}</div>
              <div className={styles.vaults}>RAY</div>
              <img
                className={styles.raydiumRayCoin1Icon}
                alt=""
                src="/raydiumraycoin-1@2x.png"
              />
            </div>
            <button
              className={styles.createPositionButton}
              onClick={openDepositStakepopup}
            >
              <div className={styles.deposit}>Deposit</div>
            </button>
            <div className={styles.createPositionButtonParent}>
              <button className={styles.createPositionButton1}>
                <div className={styles.claimPending}>Claim Pending</div>
              </button>
              <div className={styles.depositedPendingRewardsContainer}>
                <p className={styles.p}>{`Deposited `}</p>
                <p className={styles.p}>&nbsp;</p>
                <p className={styles.p}>Pending Rewards</p>
              </div>
              <div className={styles.ray20005Container}>
                <p className={styles.p}>200.035 Ray</p>
                <p className={styles.p}>$ 200.05</p>
                <p className={styles.p}>200.035 Ray</p>
                <p className={styles.p}>$ 200.05</p>
              </div>
              <button
                className={styles.createPositionButton2}
                onClick={openUnstakepopup}
              >
                <div className={styles.claimPending}>Unstake</div>
              </button>
            </div>
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
            <a className={styles.stake} onClick={onStakeClick}>
              Stake
            </a>
            <div className={styles.frameChild} />
            <a className={styles.dashbord} onClick={onDashbordClick}>
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
      {isDepositStakepopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeDepositStakepopup}
        >
          <DepositStakepopup onClose={closeDepositStakepopup} />
        </PortalPopup>
      )}
      {isUnstakepopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeUnstakepopup}
        >
          <Unstakepopup3 onClose={closeUnstakepopup} />
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

export default IndexStakestakeEcosystem;
