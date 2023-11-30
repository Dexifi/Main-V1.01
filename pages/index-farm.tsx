import type { NextPage } from 'next';
import { useState, useRef, useCallback } from 'react';
import WalletSetting from '../components/wallet-setting';
import PortalPopup from '../components/portal-popup';
import DisconnectSetting from '../components/disconnect-setting';
import styles from './index-farm.module.css';
import global from './global-classes.module.css';
import Header from '../components/header';
import LiquidityNav from './liquidity-nav';
const IndexFarm: NextPage = () => {
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
      <div className={styles.indexfarm}>
        <div className={styles.lamp} />
        <Header page={'farm'} />
        <div className={styles.liquidityPanel}>
          <LiquidityNav
            activeBlock='farm'
            activePage='pools'
          />
          <div className={styles.listPanel}>
            <div className={styles.poolOverwiew}>
              <div
                className={`${global.row} ${global.spaceBetween} ${styles.titleContainer}`}
              >
                <div className={`${global.column}`}>
                  <div className={styles.listOfAll}>
                    List of All Active Farm Pools in Ecosystem
                  </div>
                  <div className={styles.stakeLpTokensContainer}>
                    <p className={styles.stakeLpTokens}>
                      Stake LP tokens and earn token rewards Harvest all
                    </p>
                  </div>
                </div>

                <input
                  className={styles.serachinput}
                  type='search'
                  placeholder='Search'
                />
              </div>

              <div className={`${global.row} ${global.spaceBetween}`}>
                <div className={styles.rectangleContainer}>
                  <div className={`${styles.poolButton} ${styles.navActive}`}>
                    TVL
                  </div>
                  <div className={`${styles.poolButton}`}>APR</div>
                </div>
                <div className={styles.rectangleContainer}>
                  <div className={`${styles.poolButton} ${styles.navActive}`}>
                    All
                  </div>
                  <div className={`${styles.poolButton}`}>Orca</div>
                  <div className={`${styles.poolButton}`}>Raydium</div>
                </div>
                <div className={styles.rectangleContainer}>
                  <div className={`${styles.frameWrapper} ${styles.navActive}`}>
                    <div className={styles.all1}>All</div>
                  </div>
                  <div className={styles.frameWrapper}>
                    <img
                      className={styles.solana1Icon}
                      alt=''
                      src='/solana-2@2x.png'
                    />
                    <div className={styles.sol}>SOL</div>
                  </div>

                  <div className={styles.frameWrapper}>
                    <img
                      className={styles.ethereumEthLogo1Icon}
                      alt=''
                      src='/ethereumethlogo-1@2x.png'
                    />
                    <div className={styles.sol}>ETH</div>
                  </div>
                  <div className={styles.frameWrapper}>
                    <img
                      className={styles.lidoForSolanaLogo2Icon}
                      alt=''
                      src='/lidoforsolanalogo-2@2x.png'
                    />
                    <div className={styles.sol}>stSOL</div>
                  </div>
                  <div className={styles.frameWrapper}>
                    <img
                      className={styles.marinadeLogoCopy1}
                      alt=''
                      src='/marinadelogo-copy-1@2x.png'
                    />
                    <div className={styles.sol}>mSOL</div>
                  </div>
                  <div className={styles.frameWrapper}>
                    <img
                      className={styles.solana1Icon}
                      alt=''
                      src='/tetherusdtlogo-2@2x.png'
                    />
                    <div className={styles.sol}>USDT</div>
                  </div>
                  <div className={styles.frameWrapper}>
                    <img
                      className={styles.solana1Icon}
                      alt=''
                      src='/usdcoinusdclogo-2@2x.png'
                    />
                    <div className={styles.sol}>USDC</div>
                  </div>
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
                <div className={styles.frameParent}>
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
                      <div className={styles.addLiquidity}>Add Liquidity</div>
                    </button>
                  </div>
                  <div className={styles.mGroup}>
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
                      
                      <div className='button-container'>
                        <button className={styles.createPositionButton2}>
                          <div className={styles.addLiquidity}>
                            Claim Pending
                          </div>
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

export default IndexFarm;
