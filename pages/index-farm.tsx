import type { NextPage } from "next";
import { useState, useRef, useCallback } from "react";
import WalletSetting from "../components/wallet-setting";
import PortalPopup from "../components/portal-popup";
import DisconnectSetting from "../components/disconnect-setting";
import { useRouter } from "next/router";
import styles from "./index-farm.module.css";
const IndexFarm: NextPage = () => {
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

  const onMyFarmsTextClick = useCallback(() => {
    router.push("/index-farmmy");
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
      <div className={styles.indexfarm}>
        <div className={styles.lamp} />
        <div className={styles.liquidityPanel}>
          <div className={styles.listPanel}>
            <div className={styles.poolOverwiew}>
              <div className={styles.listOfAll}>
                List of All Active Farm Pools in Ecosystem
              </div>
              <input
                className={styles.serachinput}
                type="search"
                placeholder="Search"
              />
              <div className={styles.stakeLpTokensContainer}>
                <p className={styles.stakeLpTokens}>
                  Stake LP tokens and earn token rewards Harvest all
                </p>
              </div>
              <div className={styles.rectangleParent}>
                <div className={styles.instanceChild} />
                <div className={styles.instanceItem} />
                <div className={styles.tvl}>TVL</div>
                <div className={styles.apr}>APR</div>
              </div>
              <div className={styles.rectangleGroup}>
                <div className={styles.instanceInner} />
                <div className={styles.all}>All</div>
                <div className={styles.orca}>Orca</div>
                <div className={styles.raydium}>Raydium</div>
                <div className={styles.rectangleDiv} />
              </div>
              <div className={styles.rectangleContainer}>
                <div className={styles.instanceChild1} />
                <div className={styles.instanceChild2} />
                <div className={styles.frameWrapper}>
                  <div className={styles.solana1Parent}>
                    <img
                      className={styles.solana1Icon}
                      alt=""
                      src="/solana-2@2x.png"
                    />
                    <div className={styles.sol}>SOL</div>
                  </div>
                </div>
                <div className={styles.frameContainer}>
                  <div className={styles.allWrapper}>
                    <div className={styles.all1}>All</div>
                  </div>
                </div>
                <div className={styles.groupDiv}>
                  <div className={styles.solana1Parent}>
                    <img
                      className={styles.ethereumEthLogo1Icon}
                      alt=""
                      src="/ethereumethlogo-1@2x.png"
                    />
                    <div className={styles.sol}>ETH</div>
                  </div>
                </div>
                <div className={styles.frameWrapper1}>
                  <div className={styles.solana1Parent}>
                    <img
                      className={styles.lidoForSolanaLogo2Icon}
                      alt=""
                      src="/lidoforsolanalogo-2@2x.png"
                    />
                    <div className={styles.sol}>stSOL</div>
                  </div>
                </div>
                <div className={styles.frameWrapper2}>
                  <div className={styles.solana1Parent}>
                    <img
                      className={styles.marinadeLogoCopy1}
                      alt=""
                      src="/marinadelogo-copy-1@2x.png"
                    />
                    <div className={styles.sol}>mSOL</div>
                  </div>
                </div>
                <div className={styles.frameWrapper3}>
                  <div className={styles.solana1Parent}>
                    <img
                      className={styles.solana1Icon}
                      alt=""
                      src="/tetherusdtlogo-2@2x.png"
                    />
                    <div className={styles.sol}>USDT</div>
                  </div>
                </div>
                <div className={styles.frameWrapper4}>
                  <div className={styles.solana1Parent}>
                    <img
                      className={styles.solana1Icon}
                      alt=""
                      src="/usdcoinusdclogo-2@2x.png"
                    />
                    <div className={styles.sol}>USDC</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.poolList}>
              <div className={styles.lamp1} />
              <div className={styles.tab}>
                <div className={styles.protocol}>Protocol</div>
                <div className={styles.poolLiquidity}>Pool Liquidity</div>
                <div className={styles.protocolTvl}>Protocol TVL</div>
                <div className={styles.reward}>Reward</div>
                <div className={styles.apr1}>ApR</div>
                <div className={styles.pool}>Pool</div>
                <div className={styles.tabChild} />
              </div>
              <div className={styles.scrollFrame}>
                <div className={styles.frameParent}>
                  <div className={styles.mParent}>
                    <div className={styles.m}>$ 12.65 m</div>
                    <div className={styles.solUsdc}>SOL-USDC</div>
                    <div className={styles.raydium1}>Raydium</div>
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
                      className={styles.usdCoinUsdcLogo1Icon1}
                      alt=""
                      src="/usdcoinusdclogo-2@2x.png"
                    />
                    <img
                      className={styles.raydiumRayCoin1Icon}
                      alt=""
                      src="/raydiumraycoin-11@2x.png"
                    />
                    <button className={styles.createPositionButton}>
                      <div className={styles.addLiquidity}>Add Liquidity</div>
                    </button>
                  </div>
                  <div className={styles.mGroup}>
                    <div className={styles.m}>$ 12.65 m</div>
                    <div className={styles.solUsdc}>SOL-USDC</div>
                    <div className={styles.raydium1}>Raydium</div>
                    <div className={styles.frameItem} />
                    <div className={styles.ray}>RAY</div>
                    <div className={styles.div}>65.64 %</div>
                    <div className={styles.m1}>$ 47.65 m</div>
                    <img
                      className={styles.solana2Icon}
                      alt=""
                      src="/solana-2@2x.png"
                    />
                    <img
                      className={styles.usdCoinUsdcLogo1Icon1}
                      alt=""
                      src="/usdcoinusdclogo-2@2x.png"
                    />
                    <img
                      className={styles.raydiumRayCoin1Icon}
                      alt=""
                      src="/raydiumraycoin-11@2x.png"
                    />
                    <button className={styles.createPositionButton}>
                      <div className={styles.addLiquidity}>
                        Deposit LP Token
                      </div>
                    </button>
                    <div className={styles.openPositions}>
                      <div className={styles.lp}>6,561.00561 LP</div>
                      <div className={styles.pendingYield}>
                        Pending Yield : $ 1,000.69
                      </div>
                      <div
                        className={styles.depositValue}
                      >{`Deposit Value : $ 100,000.66 `}</div>
                      <div className="button-container">
                        <button className={styles.createPositionButton2}>
                        <div className={styles.addLiquidity}>Claim Pending</div>
                      </button>
                      <button className={styles.createPositionButton3}>
                        <div className={styles.addLiquidity}>Remove Farm</div>
                      </button>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.frameDiv}>
            <div className={styles.instanceChild3} />
            <div className={styles.instanceChild4} />
            <div className={styles.pools}>Pools</div>
            <div className={styles.myFarms} onClick={onMyFarmsTextClick}>
              My Farms
            </div>
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
            <div className={styles.frameInner} />
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

export default IndexFarm;
