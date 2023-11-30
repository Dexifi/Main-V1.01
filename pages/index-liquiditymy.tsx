import type { NextPage } from 'next';
import { useState, useRef, useCallback } from 'react';
import ManagePositionPopup from '../components/manage-position-popup';
import PortalPopup from '../components/portal-popup';
import CLMMPositionpopup from '../components/c-l-m-m-positionpopup';
import WalletSetting from '../components/wallet-setting';
import DisconnectSetting from '../components/disconnect-setting';
import global from './global-classes.module.css';
import styles from './index-liquiditymy.module.css';
import Header from '../components/header';
import LiquidityUniversal from './liquidity-universal';
import LiquidityNav from './liquidity-nav';

const IndexLiquiditymy: NextPage = () => {
  const [isManagePositionPopupOpen, setManagePositionPopupOpen] =
    useState(false);
  const [isManagePositionPopup1Open, setManagePositionPopup1Open] =
    useState(false);
  const [isManagePositionPopup2Open, setManagePositionPopup2Open] =
    useState(false);
  const [isManagePositionPopup3Open, setManagePositionPopup3Open] =
    useState(false);
  const [isCLMMPositionpopupOpen, setCLMMPositionpopupOpen] = useState(false);
  const [isCLMMPositionpopup1Open, setCLMMPositionpopup1Open] = useState(false);
  const frameButtonRef = useRef<HTMLButtonElement>(null);
  const [isWalletSettingPopupOpen, setWalletSettingPopupOpen] = useState(false);
  const frameButton1Ref = useRef<HTMLButtonElement>(null);
  const [isDisconnectSettingPopupOpen, setDisconnectSettingPopupOpen] =
    useState(false);

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

  const openManagePositionPopup2 = useCallback(() => {
    setManagePositionPopup2Open(true);
  }, []);

  const closeManagePositionPopup2 = useCallback(() => {
    setManagePositionPopup2Open(false);
  }, []);

  const openManagePositionPopup3 = useCallback(() => {
    setManagePositionPopup3Open(true);
  }, []);

  const closeManagePositionPopup3 = useCallback(() => {
    setManagePositionPopup3Open(false);
  }, []);

  const openCLMMPositionpopup = useCallback(() => {
    setCLMMPositionpopupOpen(true);
  }, []);

  const closeCLMMPositionpopup = useCallback(() => {
    setCLMMPositionpopupOpen(false);
  }, []);

  const openCLMMPositionpopup1 = useCallback(() => {
    setCLMMPositionpopup1Open(true);
  }, []);

  const closeCLMMPositionpopup1 = useCallback(() => {
    setCLMMPositionpopup1Open(false);
  }, []);

  return (
    <>
      <div className={styles.indexliquiditymy}>
        <div className={styles.lamp} />
        <Header page={'liquidity'} />
        <div className={styles.liquidityPanelWrapper}>
          <div className={styles.lamp1} />
          <LiquidityNav
            activeBlock='liquidity'
            activePage='position'
          />
          <div className={styles.listPanel}>
            <div className={styles.poolOverwiew}>
              <div className={`${styles.titleContainer} ${global.column}`}>
                <div
                  className={styles.listOfAll}
                >{`List of All of My Positions `}</div>
                <div className={styles.netValue}>Net Value : $ 10,000.00</div>
                <div className={styles.positions3}>Positions : 3</div>
              </div>

              <div className={`${global.column} ${styles.headerContent}`}>
                <div className={styles.rectangleParent}>
                  <div className={`${styles.poolButton} ${styles.navActive}`}>
                    All
                  </div>
                  <div className={`${styles.poolButton}`}>Out of Range</div>
                  <div className={`${styles.poolButton}`}>In Range</div>
                </div>
                <div
                  className={`${global.row} ${styles.headerInner} ${styles.bigGap}`}
                >
                  <div className={`${global.column} ${global.alignCenter}`}>
                    <div className={styles.inRange}>In Range : 2</div>
                    <button
                      className={styles.managePositionButton2}
                      onClick={openManagePositionPopup2}
                    >
                      <div className={styles.removeAllPosition1}>
                        Remove All Position in Range
                      </div>
                    </button>
                  </div>

                  <div className={`${global.column} ${global.alignCenter}`}>
                    <div className={styles.outOfRange}>Out of Range : 1</div>
                    <button
                      className={styles.managePositionButton1}
                      onClick={openManagePositionPopup1}
                    >
                      <div className={styles.removeAllPosition}>
                        Remove All Position Out of Range
                      </div>
                    </button>
                  </div>

                  <div className={`${global.column} ${global.alignCenter}`}>
                    <div className={styles.pendingReward}>
                      Pending Reward : $ 10,000.00
                    </div>
                    <button
                      className={styles.managePositionButton}
                      onClick={openManagePositionPopup}
                    >
                      <div className={styles.claimAllPending}>
                        Claim All Pending
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.poolList}>
              <div className={styles.lamp2} />
              <div className={styles.tab}>
                <div className={styles.pool}>Pool</div>
                <div className={styles.protocol}>Protocol</div>
                <div className={styles.protocolTvl}>Protocol TVL</div>
                <div className={styles.poolLiquidity}>Pool Liquidity</div>

                <div className={styles.volume}>Volume</div>
                <div className={styles.fee}>Fee</div>
                <div className={styles.apr1}>ApR</div>
              </div>
              <div className={styles.scrollFrame}>
                <div className={styles.frameParent}>
                  <div className={styles.mParent}>
                    <div className={styles.mParentTop}>
                      <div
                        className={`${global.column} ${global.spaceBetween}`}
                      >
                        <div className={styles.solUsdc}>SOL-USDC</div>
                        <div className={`${global.row} ${styles.gap}`}>
                          <img
                            className={styles.solana2Icon}
                            alt=''
                            src='/solana-23@2x.png'
                          />
                          <img
                            className={styles.usdCoinUsdcLogo1Icon1}
                            alt=''
                            src='/usdcoinusdclogo-1@2x.png'
                          />
                        </div>
                      </div>
                      <div
                        className={`${global.column} ${global.spaceBetween}`}
                      >
                        <div className={styles.orca1}>Raydium</div>
                        <div className={styles.clmm1}>CLMM</div>
                      </div>

                      <div
                        className={`${global.column} ${global.spaceBetween}`}
                      >
                        <div className={`${styles.gridRow}`}>
                          <div className={`${global.row}`}>
                            <img
                              className={styles.raydiumRayCoin1Icon}
                              alt=''
                              src='/raydiumraycoin-12@2x.png'
                            />
                            <div className={styles.m3}>$ 47.65 m</div>
                          </div>

                          <div className={styles.m}>$ 12.65 m</div>
                          <div className={styles.m1}>$ 2.65 m</div>
                          <div className={styles.m2}>$ 2.65 m</div>
                          <div className={styles.div}>65.64 %</div>
                        </div>
                        <div className={`${global.row} ${global.spaceBetween}`}>
                          <div
                            className={styles.tokenPriceIndex}
                          >{`Token Price Index : 22.654 $        `}</div>
                          <button
                            className={styles.createPositionButton}
                            onClick={openCLMMPositionpopup}
                          >
                            <div className={styles.claimAllPending}>
                              Create Position
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={styles.openPositions}>
                      <div className={styles.circleCheckRegular1Parent}>
                        <img
                          className={styles.circleCheckRegular1Icon}
                          alt=''
                          src='/circlecheckregular-11.svg'
                        />
                        <div className={styles.inRange2}>{` In Range `}</div>
                      </div>
                      <div
                        className={styles.value}
                      >{`Value : $ 100,000.66 `}</div>
                      <div className={styles.apr8065}>APR : 80.65 %</div>
                      <div className={styles.range18263}>
                        Range : 18.263 - 23.682 USDC per SOL
                      </div>

                      <div className={styles.pendingYield}>
                        Pending Yield : $ 1,000.69
                      </div>
                      <div className={styles.levX1818}>Lev : x18.18</div>
                      <button
                        className={styles.managePositionButton3}
                        onClick={openManagePositionPopup3}
                      >
                        <div className={styles.claimAllPending}>Manage</div>
                      </button>
                    </div>
                  </div>
                  <div className={styles.mGroup}>
                    <div className={`${global.column} ${global.spaceBetween}`}>
                      <div className={styles.solUsdc}>SOL-USDC</div>
                      <div className={`${global.row} ${styles.gap}`}>
                        <img
                          className={styles.solana2Icon}
                          alt=''
                          src='/solana-23@2x.png'
                        />
                        <img
                          className={styles.usdCoinUsdcLogo1Icon1}
                          alt=''
                          src='/usdcoinusdclogo-1@2x.png'
                        />
                      </div>
                    </div>
                    <div className={`${global.column} ${global.spaceBetween}`}>
                      <div className={styles.orca1}>Raydium</div>
                      <div className={styles.clmm1}>AMM</div>
                    </div>

                    <div className={`${global.column}`}>
                      <div className={`${styles.gridRow}`}>
                        <div className={`${global.row}`}>
                          <img
                            className={styles.raydiumRayCoin1Icon}
                            alt=''
                            src='/raydiumraycoin-12@2x.png'
                          />
                          <div className={styles.m3}>$ 47.65 m</div>
                        </div>
                        <div className={styles.m}>$ 12.65 m</div>
                        <div className={styles.m1}>$ 2.65 m</div>
                        <div className={styles.m2}>$ 2.65 m</div>
                        <div className={styles.div}>65.64 %</div>
                      </div>
                      <div className={styles.openPositions1}>
                        <div
                          className={styles.value1}
                        >{`Value : $ 100,000.66 `}</div>
                        <div className={styles.lpTokens}>
                          LP Tokens : 15334.63 LP
                        </div>
                        <div
                          className={styles.yourShare}
                        >{`Your share : 0.01 % <`}</div>
                        <button className={styles.createPositionButton1}>
                          <div className={styles.claimAllPending}>
                            Add Liquidity
                          </div>
                        </button>
                        <button
                          className={styles.createPositionButton2}
                          onClick={openCLMMPositionpopup1}
                        >
                          <div className={styles.claimAllPending}>
                            Remove Liquidity
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <LiquidityUniversal />
      </div>
      {isManagePositionPopupOpen && (
        <PortalPopup
          overlayColor='rgba(17, 27, 42, 0.7)'
          placement='Centered'
          onOutsideClick={closeManagePositionPopup}
        >
          <ManagePositionPopup onClose={closeManagePositionPopup} />
        </PortalPopup>
      )}
      {isManagePositionPopup1Open && (
        <PortalPopup
          overlayColor='rgba(17, 27, 42, 0.7)'
          placement='Centered'
          onOutsideClick={closeManagePositionPopup1}
        >
          <ManagePositionPopup onClose={closeManagePositionPopup1} />
        </PortalPopup>
      )}
      {isManagePositionPopup2Open && (
        <PortalPopup
          overlayColor='rgba(17, 27, 42, 0.7)'
          placement='Centered'
          onOutsideClick={closeManagePositionPopup2}
        >
          <ManagePositionPopup onClose={closeManagePositionPopup2} />
        </PortalPopup>
      )}
      {isManagePositionPopup3Open && (
        <PortalPopup
          overlayColor='rgba(17, 27, 42, 0.7)'
          placement='Centered'
          onOutsideClick={closeManagePositionPopup3}
        >
          <ManagePositionPopup onClose={closeManagePositionPopup3} />
        </PortalPopup>
      )}
      {isCLMMPositionpopupOpen && (
        <PortalPopup
          overlayColor='rgba(17, 27, 42, 0.7)'
          placement='Centered'
          onOutsideClick={closeCLMMPositionpopup}
        >
          <CLMMPositionpopup onClose={closeCLMMPositionpopup} />
        </PortalPopup>
      )}
      {isCLMMPositionpopup1Open && (
        <PortalPopup
          overlayColor='rgba(17, 27, 42, 0.7)'
          placement='Centered'
          onOutsideClick={closeCLMMPositionpopup1}
        >
          <CLMMPositionpopup onClose={closeCLMMPositionpopup1} />
        </PortalPopup>
      )}
      {/* TODO  closeWalletSettingPopup no function, closeDisconnectSettingPopup no function{isWalletSettingPopupOpen && (
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
      )} */}
    </>
  );
};

export default IndexLiquiditymy;
