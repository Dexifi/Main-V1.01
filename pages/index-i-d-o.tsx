import type { NextPage } from "next";
import { useState, useRef, useCallback } from "react";
import WalletSetting from "../components/wallet-setting";
import PortalPopup from "../components/portal-popup";
import DisconnectSetting from "../components/disconnect-setting";
import { useRouter } from "next/router";
import styles from "./index-i-d-o.module.css";
const IndexIDO: NextPage = () => {
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

  const onCreatePositionButtonClick = useCallback(() => {
    router.push("/index-i-d-opool");
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
      <div className={styles.indexido}>
        <div className={styles.lamp} />
        <div className={styles.liquidityPanel}>
          <div className={styles.liquidityPanelInner}>
            <div className={styles.listPanelWrapper}>
              <div className={styles.listPanel}>
                <div className={styles.prismatic3000000000PrmWrapper}>
                  <div className={styles.prismatic3000000000PrmContainer}>
                    <span className={styles.prismatic3000000000PrmContainer1}>
                      <p className={styles.prismatic}>Prismatic</p>
                      <p className={styles.prismatic}>30,000,000.00 PRM</p>
                      <p className={styles.prismatic}>$ 0.000012</p>
                      <p className={styles.prismatic}>$ 1.00</p>
                      <p className={styles.prismatic}>&nbsp;</p>
                      <p className={styles.prismatic}>2022-04-20 22:00</p>
                      <p className={styles.prismatic}>2022-04-20 22:00</p>
                      <p className={styles.prismatic}>UTC</p>
                    </span>
                  </div>
                </div>
                <div className={styles.nameTotalRaisePerPrmAllocWrapper}>
                  <div className={styles.nameTotalRaiseContainer}>
                    <span className={styles.prismatic3000000000PrmContainer1}>
                      <p className={styles.prismatic}>Name</p>
                      <p className={styles.prismatic}>Total Raise</p>
                      <p className={styles.prismatic}>Per PRM</p>
                      <p className={styles.prismatic}>
                        Allocation / Winning Ticket
                      </p>
                      <p className={styles.prismatic}>{`Pool `}</p>
                      <p className={styles.prismatic}>Open</p>
                      <p className={styles.prismatic}>Close</p>
                    </span>
                  </div>
                </div>
                <button
                  className={styles.createPositionButton}
                  onClick={onCreatePositionButtonClick}
                >
                  <div className={styles.goToPool}>Go to Pool</div>
                </button>
                <div className={styles.frameParent}>
                  <div className={styles.idoWrapper}>
                    <div className={styles.ido}>IDO</div>
                  </div>
                  <div className={styles.prmWrapper}>
                    <b className={styles.ido}>PRM</b>
                  </div>
                  <img
                    className={styles.prismathic1Icon}
                    alt=""
                    src="/prismathic-12@2x.png"
                  />
                </div>
                <div className={styles.collectedTicketsStatusRoiParent}>
                  <div className={styles.collectedTicketsStatusContainer}>
                    <p className={styles.prismatic}>Collected tickets</p>
                    <p className={styles.prismatic}>&nbsp;</p>
                    <p className={styles.prismatic}>Status</p>
                    <p className={styles.prismatic}>ROI (ATH)</p>
                  </div>
                  <div className={styles.open00Container}>
                    <p className={styles.prismatic}>0/36</p>
                    <p className={styles.prismatic}>0 %</p>
                    <p className={styles.open1}>Open</p>
                    <p className={styles.prismatic}>0</p>
                    <p className={styles.prismatic}>0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.listPanel1}>
            <div className={styles.poolOverwiew}>
              <div
                className={styles.listOfIdo}
              >{`List of IDO Token Sale in Dexifi `}</div>
              <div className={styles.frameGroup}>
                <div className={styles.frameContainer}>
                  <div className={styles.idoWrapper}>
                    <div className={styles.ido}>Total Lunched</div>
                  </div>
                  <div className={styles.wrapper}>
                    <div className={styles.ido}>1</div>
                  </div>
                </div>
                <div className={styles.frameDiv}>
                  <div className={styles.idoWrapper}>
                    <div className={styles.ido}>Open Pools</div>
                  </div>
                  <div className={styles.wrapper}>
                    <div className={styles.ido}>1</div>
                  </div>
                </div>
                <div className={styles.frameParent1}>
                  <div className={styles.frameParent2}>
                    <div className={styles.idoWrapper}>
                      <div className={styles.ido}>Last Lunch Details</div>
                    </div>
                    <div className={styles.prmContainer}>
                      <div className={styles.ido}>PRM</div>
                    </div>
                  </div>
                  <div className={styles.frameParent2}>
                    <div className={styles.idoWrapper}>
                      <div className={styles.ido}>Last Token ATH</div>
                    </div>
                    <div className={styles.frame}>
                      <div className={styles.ido}>700.00%</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.withStakingDxeContainer}>
                <p className={styles.withStakingDxe}>
                  With Staking DXE get access to IDO sale.
                </p>
                <p className={styles.prismatic}>&nbsp;</p>
                <p className={styles.prismatic}>&nbsp;</p>
              </div>
            </div>
          </div>
          <div className={styles.rectangleParent}>
            <div className={styles.instanceChild} />
            <div className={styles.instanceItem} />
            <div className={styles.all}>All</div>
            <div className={styles.open2}>Open</div>
            <div className={styles.closed}>Closed</div>
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.lamp1} />
          <div className={styles.lineParent}>
            <div className={styles.frameChild} />
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
          <p className={styles.prismatic}>V1.0.1</p>
          <p className={styles.prismatic}>2022-04-20 22:00 UTC</p>
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

export default IndexIDO;
