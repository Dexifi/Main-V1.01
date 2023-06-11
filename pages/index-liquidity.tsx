import type { NextPage } from "next";
import { useState, useRef, useCallback } from "react";
import ManagePositionPopup from "../components/manage-position-popup";
import PortalPopup from "../components/portal-popup";
import CLMMPositionpopup from "../components/c-l-m-m-positionpopup";
import RemoveAMMpopup from "../components/remove-a-m-mpopup";
import AddAMMpopup from "../components/add-a-m-mpopup";
import WalletSetting from "../components/wallet-setting";
import DisconnectSetting from "../components/disconnect-setting";
import { useRouter } from "next/router";
import styles from "./index-liquidity.module.css";
const IndexLiquidity: NextPage = () => {
  const [isManagePositionPopupOpen, setManagePositionPopupOpen] =
    useState(false);
  const [isManagePositionPopup1Open, setManagePositionPopup1Open] =
    useState(false);
  const [isCLMMPositionpopupOpen, setCLMMPositionpopupOpen] = useState(false);
  const [isRemoveAMMpopupOpen, setRemoveAMMpopupOpen] = useState(false);
  const [isAddAMMpopupOpen, setAddAMMpopupOpen] = useState(false);
  const frameButtonRef = useRef<HTMLButtonElement>(null);
  const [isWalletSettingPopupOpen, setWalletSettingPopupOpen] = useState(false);
  const frameButton1Ref = useRef<HTMLButtonElement>(null);
  const [isDisconnectSettingPopupOpen, setDisconnectSettingPopupOpen] =
    useState(false);
  const router = useRouter();

  const openManagePositionPopup = useCallback(() => {
    setManagePositionPopupOpen(true);
  }, []);

  const closeManagePositionPopup = useCallback(() => {
    setManagePositionPopupOpen(false);
  }, []);

  const openManagePositionPopup1 = useCallback(() => {
    setManagePositionPopup1Open(true);
  }, []);

  const closeManagePositionPopup1 = useCallback(() => {
    setManagePositionPopup1Open(false);
  }, []);

  const openCLMMPositionpopup = useCallback(() => {
    setCLMMPositionpopupOpen(true);
  }, []);

  const closeCLMMPositionpopup = useCallback(() => {
    setCLMMPositionpopupOpen(false);
  }, []);

  const openRemoveAMMpopup = useCallback(() => {
    setRemoveAMMpopupOpen(true);
  }, []);

  const closeRemoveAMMpopup = useCallback(() => {
    setRemoveAMMpopupOpen(false);
  }, []);

  const openAddAMMpopup = useCallback(() => {
    setAddAMMpopupOpen(true);
  }, []);

  const closeAddAMMpopup = useCallback(() => {
    setAddAMMpopupOpen(false);
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

  const onMyPositionsClick = useCallback(() => {
    router.push("/index-liquiditymy");
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
      <div className={styles.indexliquidity}>
        <div className={styles.lamp} />
        <div className={styles.liquidityPanelWrapper}>
          <div className={styles.liquidityPanel}>
            <div className={styles.listPanel}>
              <div className={styles.poolOverwiew}>
                <div className={styles.listOfAll}>
                  List of All Active Pools in Ecosystem
                </div>
                <input
                  className={styles.serachinput}
                  type="search"
                  placeholder="Search"
                />
                <div className={styles.earnYieldOnContainer}>
                  <p className={styles.earnYieldOn}>
                    Earn yield on trading fees by providing liquidity
                  </p>
                </div>
                <div className={styles.rectangleParent}>
                  <div className={styles.instanceChild} />
                  <div className={styles.all}>All</div>
                  <div className={styles.orca}>Orca</div>
                  <div className={styles.raydium}>Raydium</div>
                  <button className={styles.instanceItem} />
                </div>
                <div className={styles.rectangleGroup}>
                  <div className={styles.instanceInner} />
                  <div className={styles.rectangleDiv} />
                  <div className={styles.all1}>All</div>
                  <div className={styles.clmm}>CLMM</div>
                  <div className={styles.amm}>AMM</div>
                </div>
                <div className={styles.rectangleContainer}>
                  <div className={styles.instanceChild1} />
                  <div className={styles.instanceChild2} />
                  <div className={styles.tvl}>TVL</div>
                  <div className={styles.apr}>APR</div>
                </div>
                <div className={styles.frameDiv}>
                  <div className={styles.instanceChild3} />
                  <div className={styles.instanceChild4} />
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
                      <div className={styles.all2}>All</div>
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
                  <div className={styles.volume}>Volume</div>
                  <div className={styles.fee}>Fee</div>
                  <div className={styles.apr1}>ApR</div>
                  <div className={styles.pool}>Pool</div>
                  <div className={styles.tabChild} />
                </div>
                <div className={styles.scrollFrame}>
                  <div className={styles.frameParent}>
                    <div className={styles.mParent}>
                      <div className={styles.m}>$ 12.65 m</div>
                      <div className={styles.solUsdc}>SOL-USDC</div>
                      <div className={styles.orca1}>Orca</div>
                      <div className={styles.frameChild} />
                      <div className={styles.m1}>$ 2.65 m</div>
                      <div className={styles.m2}>$ 2.65 m</div>
                      <div className={styles.div}>65.64 %</div>
                      <div className={styles.m3}>$ 47.65 m</div>
                      <img
                        className={styles.solana2Icon}
                        alt=""
                        src="/solana-23@2x.png"
                      />
                      <img
                        className={styles.usdCoinUsdcLogo1Icon1}
                        alt=""
                        src="/usdcoinusdclogo-1@2x.png"
                      />
                      <div className={styles.openPositions}>
                        <button
                          className={styles.managePositionButton}
                          onClick={openManagePositionPopup}
                        >
                          <div className={styles.manage}>Manage</div>
                        </button>
                        <div className={styles.usdcPerSol}>
                          22.56 - 23.000 USDC per SOL
                        </div>
                        <div className={styles.apr108065}>APR : 1080.65 %</div>
                        <div className={styles.circleXmarkRegular1Parent}>
                          <img
                            className={styles.circleXmarkRegular1Icon}
                            alt=""
                            src="/circlexmarkregular-1.svg"
                          />
                          <div className={styles.outOfRange}>Out of Range</div>
                        </div>
                      </div>
                      <div className={styles.openPositions1}>
                        <button
                          className={styles.managePositionButton}
                          onClick={openManagePositionPopup1}
                        >
                          <div className={styles.manage}>Manage</div>
                        </button>
                        <div className={styles.usdcPerSol}>
                          18.263 - 23.682 USDC per SOL
                        </div>
                        <div className={styles.apr108065}>APR : 80.65 %</div>
                        <div className={styles.circleCheckRegular1Parent}>
                          <img
                            className={styles.circleXmarkRegular1Icon}
                            alt=""
                            src="/circlecheckregular-11.svg"
                          />
                          <div
                            className={styles.outOfRange}
                          >{` In Range `}</div>
                        </div>
                      </div>
                      <button
                        className={styles.createPositionButton}
                        onClick={openCLMMPositionpopup}
                      >
                        <div className={styles.manage}>Create Position</div>
                      </button>
                      <img
                        className={styles.orcaaef56d302Icon}
                        alt=""
                        src="/orcaaef56d30-2.svg"
                      />
                      <div className={styles.clmm1}>CLMM</div>
                    </div>
                    <div className={styles.mGroup}>
                      <div className={styles.m}>$ 12.65 m</div>
                      <div className={styles.solUsdc}>SOL-USDC</div>
                      <div className={styles.orca1}>Raydium</div>
                      <div className={styles.frameItem} />
                      <div className={styles.m1}>$ 2.65 m</div>
                      <div className={styles.m2}>$ 2.65 m</div>
                      <div className={styles.div}>65.64 %</div>
                      <div className={styles.m3}>$ 47.65 m</div>
                      <img
                        className={styles.solana2Icon}
                        alt=""
                        src="/solana-23@2x.png"
                      />
                      <img
                        className={styles.usdCoinUsdcLogo1Icon1}
                        alt=""
                        src="/usdcoinusdclogo-1@2x.png"
                      />
                      <img
                        className={styles.raydiumRayCoin1Icon}
                        alt=""
                        src="/raydiumraycoin-12@2x.png"
                      />
                      <div className={styles.clmm1}>AMM</div>
                      <div className={styles.openPositions2}>
                        <button
                          className={styles.createPositionButton1}
                          onClick={openRemoveAMMpopup}
                        >
                          <div className={styles.manage}>Remove Liquidity</div>
                        </button>
                        <div
                          className={styles.value}
                        >{`Value : $ 100,000.66 `}</div>
                        <div className={styles.lpTokens}>
                          LP Tokens : 15334.63 LP
                        </div>
                        <div
                          className={styles.yourShare}
                        >{`Your share : 0.01 % <`}</div>
                      </div>
                      <button
                        className={styles.createPositionButton2}
                        onClick={openAddAMMpopup}
                      >
                        <div className={styles.manage}>Add Liquidity</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.rectangleParent1}>
              <div className={styles.instanceChild5} />
              <div className={styles.pools}>Pools</div>
              <a className={styles.myPositions} onClick={onMyPositionsClick}>
                My Positions
              </a>
              <button className={styles.rectangleButton} />
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
          <p className={styles.earnYieldOn}>V1.0.1</p>
          <p className={styles.earnYieldOn}>2022-04-20 22:00 UTC</p>
        </div>
      </div>
      {isManagePositionPopupOpen && (
        <PortalPopup
          overlayColor="rgba(17, 27, 42, 0.7)"
          placement="Centered"
          onOutsideClick={closeManagePositionPopup}
        >
          <ManagePositionPopup onClose={closeManagePositionPopup} />
        </PortalPopup>
      )}
      {isManagePositionPopup1Open && (
        <PortalPopup
          overlayColor="rgba(17, 27, 42, 0.7)"
          placement="Centered"
          onOutsideClick={closeManagePositionPopup1}
        >
          <ManagePositionPopup onClose={closeManagePositionPopup1} />
        </PortalPopup>
      )}
      {isCLMMPositionpopupOpen && (
        <PortalPopup
          overlayColor="rgba(17, 27, 42, 0.7)"
          placement="Centered"
          onOutsideClick={closeCLMMPositionpopup}
        >
          <CLMMPositionpopup onClose={closeCLMMPositionpopup} />
        </PortalPopup>
      )}
      {isRemoveAMMpopupOpen && (
        <PortalPopup
          overlayColor="rgba(17, 27, 42, 0.7)"
          placement="Centered"
          onOutsideClick={closeRemoveAMMpopup}
        >
          <RemoveAMMpopup onClose={closeRemoveAMMpopup} />
        </PortalPopup>
      )}
      {isAddAMMpopupOpen && (
        <PortalPopup
          overlayColor="rgba(17, 27, 42, 0.7)"
          placement="Centered"
          onOutsideClick={closeAddAMMpopup}
        >
          <AddAMMpopup onClose={closeAddAMMpopup} />
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

export default IndexLiquidity;
