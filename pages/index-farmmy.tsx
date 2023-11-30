import type { NextPage } from 'next';
import { useState, useRef, useCallback } from 'react';
import WalletSetting from '../components/wallet-setting';
import PortalPopup from '../components/portal-popup';
import DisconnectSetting from '../components/disconnect-setting';
import global from './global-classes.module.css';
import styles from './index-farmmy.module.css';
import Header from '../components/header';
import LiquidityNav from './liquidity-nav';
const IndexFarmmy: NextPage = () => {
  const frameButtonRef = useRef<HTMLButtonElement>(null);
  const [isWalletSettingPopupOpen, setWalletSettingPopupOpen] = useState(false);
  const frameButton1Ref = useRef<HTMLButtonElement>(null);
  const [isDisconnectSettingPopupOpen, setDisconnectSettingPopupOpen] =
    useState(false);

  const closeWalletSettingPopup = useCallback(() => {
    setWalletSettingPopupOpen(false);
  }, []);

  const closeDisconnectSettingPopup = useCallback(() => {
    setDisconnectSettingPopupOpen(false);
  }, []);

  return (
    <>
      <div className={styles.indexfarmmy}>
        <div className={styles.lamp} />
        <Header page={'farm'} />
        <div className={styles.listPanelParent}>
          <LiquidityNav
            activeBlock='farm'
            activePage='farms'
          />
          <div className={styles.listPanel}>
            <div className={styles.poolOverwiew}>
              <div className={`${global.row} ${styles.poolOverwiewContainer}`}>
                <div className={`${global.column} ${styles.titleContainer}`}>
                  <div className={styles.listOfAll}>
                    List of All of My Farms
                  </div>
                  <div className={styles.stakeLpTokensContainer}>
                    <p className={styles.stakeLpTokens}>
                      Stake LP tokens and earn token rewards Harvest all
                    </p>
                  </div>
                </div>

                <div className={`${global.row} ${styles.gap}`}>
                  <button className={styles.createPositionButton}>
                    <div className={styles.claimAllPending}>
                      Claim All Pending Rewards
                    </div>
                  </button>
                  <button className={styles.createPositionButton1}>
                    <div className={styles.claimAllPending}>
                      Remove All Farms
                    </div>
                  </button>
                </div>
              </div>

              <div className={`${styles.gridTitle}`}>
                <div className={styles.netValue}>Net Value : $ 10,000.00</div>
                <div className={styles.pendingYieldRewards}>
                  Pending Yield Rewards : $ 1,000.69
                </div>
                <div className={styles.positions3}>Positions : 3</div>
                <div className={styles.positionsValue}>
                  Positions Value : $ 1,000.69
                </div>
              </div>
            </div>
            <div className={styles.poolList}>
              <div className={styles.lamp1} />
              <div className={styles.tab}>
                <div className={styles.tabText}>Pool</div>
                <div className={styles.tabText}>Protocol</div>
                <div className={styles.tabText}>Protocol TVL</div>
                <div className={styles.tabText}>Pool Liquidity</div>

                <div className={styles.tabText}>Reward</div>
                <div className={styles.tabText}>ApR</div>
              </div>
              <div className={styles.scrollFrame}>
                <div className={styles.scrollFrameInner}>
                  <div className={styles.mParent}>
                    <div className={`${global.row} ${global.spaceBetween}`}>
                      <div className={styles.solUsdc}>SOL-USDC</div>
                      <img
                        className={styles.solana2Icon}
                        alt=''
                        src='/solana-2@2x.png'
                      />
                      <img
                        className={styles.usdCoinUsdcLogo1Icon1}
                        alt=''
                        src='/usdcoinusdclogo-2@2x.png'
                      />
                    </div>
                    <div className={`${global.row} ${styles.gap}`}>
                      <div className={styles.raydium1}>Raydium</div>
                      <img
                        className={styles.raydiumRayCoin1Icon}
                        alt=''
                        src='/raydiumraycoin-11@2x.png'
                      />
                    </div>
                    <div className={styles.m1}>$ 47.65 m</div>
                    <div className={styles.m}>$ 12.65 m</div>

                    <div className={styles.ray}>RAY</div>
                    <div className={styles.div}>65.64 %</div>

                    <button className={styles.createPositionButton}>
                      <div className={styles.addLiquidity}>
                        Deposit LP Token
                      </div>
                    </button>
                  </div>
                  <div className={styles.openPositions}>
                    <div
                      className={styles.depositValue}
                    >{`Deposit Value : $ 100,000.66 `}</div>
                    <div className={styles.lp}>6,561.00561 LP</div>

                    <div className={styles.pendingYield}>
                      Pending Yield : $ 1,000.69
                    </div>
                    <div className={styles.ray1}>164.646 RAY</div>
                    <div className={`${global.row} ${styles.gap}`}>
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
        </div>

        <div className={styles.v101202204202200UtcContainer}>
          <p className={styles.stakeLpTokens}>V1.0.1</p>
          <p className={styles.stakeLpTokens}>2022-04-20 22:00 UTC</p>
        </div>
      </div>
      {isWalletSettingPopupOpen && (
        <PortalPopup
          overlayColor='rgba(13, 17, 27, 0.7)'
          placement='Top right'
          top={-520}
          relativeLayerRef={frameButtonRef}
          onOutsideClick={closeWalletSettingPopup}
        >
          <WalletSetting onClose={closeWalletSettingPopup} />
        </PortalPopup>
      )}
      {isDisconnectSettingPopupOpen && (
        <PortalPopup
          overlayColor='rgba(13, 17, 27, 0.7)'
          placement='Top right'
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
