import type { NextPage } from "next";
import { useState, useRef, useCallback } from "react";
import WalletSetting from "../components/wallet-setting";
import PortalPopup from "../components/portal-popup";
import DisconnectSetting from "../components/disconnect-setting";
import { useRouter } from "next/router";
import styles from "./index-farmmy.module.css";
const IndexFarmmy: NextPage = () => {
  const frameButtonRef = useRef<HTMLButtonElement>(null);
  const [isWalletSettingPopupOpen, setWalletSettingPopupOpen] = useState(false);
  const frameButton1Ref = useRef<HTMLButtonElement>(null);
  const [isDisconnectSettingPopupOpen, setDisconnectSettingPopupOpen] =
    useState(false);
  const router = useRouter();

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

  const onPoolsTextClick = useCallback(() => {
    router.push("/index-farm");
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

  const onDEXIFILOGOImageClick = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <>
      <div className={styles.indexfarmmy}>
        <div className={styles.lamp} />
        <div className={styles.listPanelParent}>
          <div className={styles.listPanel}>
            <div className={styles.poolOverwiew}>
              <div
                className={styles.listOfAll}
              >{`List of All of My Farms `}</div>
              <div className={styles.stakeLpTokensContainer}>
                <p className={styles.stakeLpTokens}>
                  Stake LP tokens and earn token rewards Harvest all
                </p>
              </div>
              <button className={styles.createPositionButton}>
                <div className={styles.claimAllPending}>
                  Claim All Pending Rewards
                </div>
              </button>
              <button className={styles.createPositionButton1}>
                <div className={styles.claimAllPending}>Remove All Farms</div>
              </button>
              <div className={styles.netValue}>Net Value : $ 10,000.00</div>
              <div className={styles.pendingYieldRewards}>
                Pending Yield Rewards : $ 1,000.69
              </div>
              <div className={styles.positionsValue}>
                Positions Value : $ 1,000.69
              </div>
              <div className={styles.positions3}>Positions : 3</div>
            </div>
            <div className={styles.poolList}>
              <div className={styles.lamp1} />
              <div className={styles.tab}>
                <div className={styles.protocol}>Protocol</div>
                <div className={styles.poolLiquidity}>Pool Liquidity</div>
                <div className={styles.protocolTvl}>Protocol TVL</div>
                <div className={styles.reward}>Reward</div>
                <div className={styles.apr}>ApR</div>
                <div className={styles.pool}>Pool</div>
                <div className={styles.tabChild} />
              </div>
              <div className={styles.scrollFrame}>
                <div className={styles.scrollFrameInner}>
                  <div className={styles.mParent}>
                    <div className={styles.m}>$ 12.65 m</div>
                    <div className={styles.solUsdc}>SOL-USDC</div>
                    <div className={styles.raydium}>Raydium</div>
                    <div className={styles.frameChild} />
                    <div className={styles.ray}>RAY</div>
                    <div className={styles.div}>65.64 %</div>
                    <div className={styles.m1}>$ 47.65 m</div>
                    <img
                      className={styles.solana2Icon}
                      alt=""
                      src="/solana-2@2x.png"
                    />
                    <img
                      className={styles.usdCoinUsdcLogo1Icon}
                      alt=""
                      src="/usdcoinusdclogo-2@2x.png"
                    />
                    <img
                      className={styles.raydiumRayCoin1Icon}
                      alt=""
                      src="/raydiumraycoin-11@2x.png"
                    />
                    <button className={styles.createPositionButton2}>
                      <div className={styles.claimAllPending}>
                        Deposit LP Token
                      </div>
                    </button>
                    <div className={styles.openPositions}>
                      <div className={styles.lp}>6,561.00561 LP</div>
                      <div className={styles.ray1}>164.646 RAY</div>
                      <div className={styles.pendingYield}>
                        Pending Yield : $ 1,000.69
                      </div>
                      <div
                        className={styles.depositValue}
                      >{`Deposit Value : $ 100,000.66 `}</div>
                      <button className={styles.createPositionButton3}>
                        <div className={styles.claimAllPending}>
                          Claim Pending
                        </div>
                      </button>
                      <button className={styles.createPositionButton4}>
                        <div className={styles.claimAllPending}>
                          Remove Farm
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rectangleParent}>
            <div className={styles.instanceChild} />
            <div className={styles.instanceItem} />
            <div className={styles.pools} onClick={onPoolsTextClick}>
              Pools
            </div>
            <div className={styles.myFarms}>My Farms</div>
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.lamp2} />
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
            <div className={styles.frameItem} />
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
            className={styles.dexifiLogoIcon}
            alt=""
            src="/dexifi-logo@2x.png"
            onClick={onDEXIFILOGOImageClick}
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
          <p className={styles.stakeLpTokens}>V1.0.1</p>
          <p className={styles.stakeLpTokens}>2022-04-20 22:00 UTC</p>
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
          relativeLayerRef={frameButton1Ref}
          onOutsideClick={closeDisconnectSettingPopup}
        >
          <DisconnectSetting onClose={closeDisconnectSettingPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default IndexFarmmy;
