import type { NextPage } from "next";
import { useState, useRef, useCallback } from "react";
import Stakedexipopup from "../components/stakedexipopup";
import PortalPopup from "../components/portal-popup";
import Unstakedexipopup from "../components/unstakedexipopup";
import WalletSetting from "../components/wallet-setting";
import DisconnectSetting from "../components/disconnect-setting";
import { useRouter } from "next/router";
import styles from "./index-stake.module.css";
const IndexStake: NextPage = () => {
  const [isStakedexipopupOpen, setStakedexipopupOpen] = useState(false);
  const [isUnstakedexipopupOpen, setUnstakedexipopupOpen] = useState(false);
  const frameButtonRef = useRef<HTMLButtonElement>(null);
  const [isWalletSettingPopupOpen, setWalletSettingPopupOpen] = useState(false);
  const frameButton1Ref = useRef<HTMLButtonElement>(null);
  const [isDisconnectSettingPopupOpen, setDisconnectSettingPopupOpen] =
    useState(false);
  const router = useRouter();

  const openStakedexipopup = useCallback(() => {
    setStakedexipopupOpen(true);
  }, []);

  const closeStakedexipopup = useCallback(() => {
    setStakedexipopupOpen(false);
  }, []);

  const openUnstakedexipopup = useCallback(() => {
    setUnstakedexipopupOpen(true);
  }, []);

  const closeUnstakedexipopup = useCallback(() => {
    setUnstakedexipopupOpen(false);
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

  const onEcosystemTextClick = useCallback(() => {
    router.push("/index-stakestake-ecosystem");
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
      <div className={styles.indexstake}>
        <div className={styles.lamp} />
        <div className={styles.liquidityPanel}>
          <div className={styles.listPanelWrapper}>
            <div className={styles.listPanel}>
              <div className={styles.dexifiDxe5373978240510Wrapper}>
                <div className={styles.dexifiDxe5373978Container}>
                  <span className={styles.dexifiDxe5373978Container1}>
                    <p className={styles.p}>12.0 %</p>
                    <p className={styles.p}>Dexifi</p>
                    <p className={styles.p}>DXE</p>
                    <p className={styles.p}>$5,373,978</p>
                    <p className={styles.p}>24.051.027 DXE</p>
                    <p className={styles.p}>365 Days</p>
                    <p className={styles.p}>-</p>
                    <p className={styles.p}>6</p>
                    <p className={styles.p}>30</p>
                  </span>
                </div>
              </div>
              <div className={styles.apyProviderRewardTvlTvlWrapper}>
                <div className={styles.apyProviderRewardContainer}>
                  <span className={styles.dexifiDxe5373978Container1}>
                    <p className={styles.p}>APY</p>
                    <p className={styles.p}>Provider</p>
                    <p className={styles.p}>Reward</p>
                    <p className={styles.p}>TVL</p>
                    <p className={styles.p}>TVL $</p>
                    <p className={styles.p}>Lock Time</p>
                    <p className={styles.p}>Withdraw Pending</p>
                    <p className={styles.p}>Lottery Ticket Per 100</p>
                    <p className={styles.p}>Max Ticket Per Account</p>
                  </span>
                </div>
              </div>
              <button
                className={styles.createPositionButton}
                onClick={openStakedexipopup}
              >
                <div className={styles.deposit}>Deposit</div>
              </button>
              <div className={styles.depositedRewardsLotteryTickParent}>
                <div className={styles.depositedRewardsLotteryContainer}>
                  <p className={styles.p}>{`Deposited `}</p>
                  <p className={styles.p}>&nbsp;</p>
                  <p className={styles.p}>Rewards</p>
                  <p className={styles.p}>&nbsp;</p>
                  <p className={styles.p}>Lottery Ticket</p>
                  <p className={styles.p}>Unlock</p>
                </div>
                <div className={styles.dxe50000Container}>
                  <p className={styles.p}>500.000 DXE</p>
                  <p className={styles.p}>$ 500.00</p>
                  <p className={styles.p}>60.000 DXE</p>
                  <p className={styles.p}>$ 60.00</p>
                  <p className={styles.p}>30</p>
                  <p className={styles.p}>2024/05/30</p>
                </div>
                <button
                  className={styles.createPositionButton1}
                  onClick={openUnstakedexipopup}
                >
                  <div className={styles.unstake}>Unstake</div>
                </button>
              </div>
              <div className={styles.vaultsParent}>
                <div className={styles.vaults}>{`Vaults `}</div>
                <div className={styles.dxe4}>DXE</div>
                <img
                  className={styles.dexifiLogoIcon}
                  alt=""
                  src="/dexifi-logo2@2x.png"
                />
              </div>
            </div>
          </div>
          <div className={styles.listPanel1}>
            <div className={styles.poolOverwiew}>
              <div
                className={styles.listOfAll}
              >{`List of All Active Vaults for DXE Token `}</div>
              <div className={styles.myLocksParent}>
                <div className={styles.myLocks}>My Locks</div>
                <div className={styles.value}>Value</div>
                <div className={styles.rewards1}>Rewards</div>
                <div className={styles.ticket}>Ticket</div>
                <div className={styles.dxe200005Container}>
                  <p className={styles.p}>2000.000 DXE</p>
                  <p className={styles.p}>$ 2000.05</p>
                  <p className={styles.p}>&nbsp;</p>
                </div>
                <div className={styles.total}>Total</div>
                <div className={styles.dxe2100750Container}>
                  <p className={styles.p}>2100.750 DXE</p>
                  <p className={styles.p}>$ 2100.750</p>
                  <p className={styles.p}>&nbsp;</p>
                </div>
                <div className={styles.dxe10075Container}>
                  <p className={styles.p}>100.750 DXE</p>
                  <p className={styles.p}>$ 100.75</p>
                  <p className={styles.p}>&nbsp;</p>
                </div>
                <div className={styles.div}>65</div>
              </div>
              <div className={styles.withStakingDxeContainer}>
                <p className={styles.withStakingDxe}>
                  With Staking DXE get access to IDO sale and get APY for lock
                  time.
                </p>
                <p className={styles.p}>&nbsp;</p>
                <p className={styles.p}>&nbsp;</p>
              </div>
            </div>
          </div>
          <div className={styles.rectangleParent}>
            <div className={styles.instanceChild} />
            <div className={styles.instanceItem} />
            <img
              className={styles.dexifiLogoIcon1}
              alt=""
              src="/dexifi-logo1@2x.png"
            />
            <div className={styles.ecosystem} onClick={onEcosystemTextClick}>
              Ecosystem
            </div>
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
            className={styles.dexifiLogoIcon2}
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
      {isStakedexipopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeStakedexipopup}
        >
          <Stakedexipopup onClose={closeStakedexipopup} />
        </PortalPopup>
      )}
      {isUnstakedexipopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeUnstakedexipopup}
        >
          <Unstakedexipopup onClose={closeUnstakedexipopup} />
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

export default IndexStake;
