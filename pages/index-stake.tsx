import type { NextPage } from 'next';
import { useState, useRef, useCallback } from 'react';
import Stakedexipopup from '../components/stakedexipopup';
import PortalPopup from '../components/portal-popup';
import Unstakedexipopup from '../components/unstakedexipopup';
import WalletSetting from '../components/wallet-setting';
import DisconnectSetting from '../components/disconnect-setting';
import styles from './index-stake.module.css';
import global from './global-classes.module.css';
import Header from '../components/header';
import StakeNav from './stake-nav';
const IndexStake: NextPage = () => {
  const [isStakedexipopupOpen, setStakedexipopupOpen] = useState(false);
  const [isUnstakedexipopupOpen, setUnstakedexipopupOpen] = useState(false);
  const frameButtonRef = useRef<HTMLButtonElement>(null);
  const [isWalletSettingPopupOpen, setWalletSettingPopupOpen] = useState(false);
  const frameButton1Ref = useRef<HTMLButtonElement>(null);
  const [isDisconnectSettingPopupOpen, setDisconnectSettingPopupOpen] =
    useState(false);

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

  const closeWalletSettingPopup = useCallback(() => {
    setWalletSettingPopupOpen(false);
  }, []);

  const closeDisconnectSettingPopup = useCallback(() => {
    setDisconnectSettingPopupOpen(false);
  }, []);

  return (
    <>
      <div className={styles.indexstake}>
        <div className={styles.lamp} />
        <Header page={'stake'} />
        <div className={styles.liquidityPanel}>
          <StakeNav activePage='index' />

          <div className={styles.poolOverwiew}>
            <div className={`${global.column}`}>
              <div
                className={styles.listOfAll}
              >{`List of All Active Vaults for DXE Token `}</div>
              <div className={styles.withStakingDxeContainer}>
                <p className={styles.withStakingDxe}>
                  With Staking DXE get access to IDO sale and get APY for lock
                  time.
                </p>
              </div>
            </div>

            <div className={styles.myLocksParent}>
              <div className={`${styles.grid}`}>
                <div className={styles.lockTitle}>My Locks</div>
                <div className={styles.lockTitle}>Total</div>
                <div className={styles.lockTitle}>Value</div>
                <div className={styles.lockTitle}>Rewards</div>
                <div className={styles.lockTitle}>Ticket</div>
              </div>

              <div className={`${styles.grid}`}>
                <div></div>
                <p className={styles.lockText}>2000.000 DXE</p>
                <p className={styles.lockText}>2100.750 DXE</p>
                <p className={styles.lockText}>100.750 DXE</p>
                <div className={styles.lockText}>65</div>
              </div>

              <div className={`${styles.grid}`}>
                <div></div>
                <p className={styles.lockText}>$ 2000.05</p>
                <p className={styles.lockText}>$ 2100.750</p>
                <p className={styles.lockText}>$ 100.75</p>
                <div></div>
              </div>
            </div>
          </div>
          <div className={styles.listPanelWrapper}>
            <div className={styles.listPanel}>
              <div className={styles.vaultsParent}>
                <div className={styles.vaults}>{`Vaults `}</div>
                <div className={styles.dxe4}>DXE</div>
                <img
                  className={styles.dexifiLogoIcon}
                  alt=''
                  src='/dexifi-logo2@2x.png'
                />
              </div>

              <div className={`${global.column}`}>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>APY</p>
                  <p className={styles.statisticText}>12.0 %</p>
                </div>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>Provider</p>
                  <p className={styles.statisticText}>Dexifi</p>
                </div>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>Reward</p>
                  <p className={styles.statisticText}>DXE</p>
                </div>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>TVL</p>
                  <p className={styles.statisticText}>$5,373,978</p>
                </div>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>TVL $</p>
                  <p className={styles.statisticText}>24.051.027 DXE</p>
                </div>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>Lock Time</p>
                  <p className={styles.statisticText}>365 Days</p>
                </div>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>Withdraw Pending</p>
                  <p className={styles.statisticText}>-</p>
                </div>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>
                    Lottery Ticket Per 100
                  </p>
                  <p className={styles.statisticText}>6</p>
                </div>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>
                    Max Ticket Per Account
                  </p>
                  <p className={styles.statisticText}>30</p>
                </div>
              </div>

              <button
                className={styles.createPositionButton}
                onClick={openStakedexipopup}
              >
                <div className={styles.deposit}>Deposit</div>
              </button>
              <div className={styles.depositedRewardsLotteryTickParent}>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>{`Deposited `}</p>
                  <div className={`${global.column}`}>
                    <p className={styles.statisticText}>500.000 DXE</p>
                    <p className={styles.statisticText}>$ 500.00</p>
                  </div>
                </div>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>Rewards</p>
                  <div className={`${global.column}`}>
                    <p className={styles.statisticText}>60.000 DXE</p>
                    <p className={styles.statisticText}>$ 60.00</p>
                  </div>
                </div>

                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>Lottery Ticket</p>
                  <p className={styles.statisticText}>30</p>
                </div>

                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>Unlock</p>
                  <p className={styles.statisticText}>2024/05/30</p>
                </div>

                <button
                  className={styles.createPositionButton1}
                  onClick={openUnstakedexipopup}
                >
                  <div className={styles.unstake}>Unstake</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.v101202204202200UtcContainer}>
          <p className={styles.p}>V1.0.1</p>
          <p className={styles.p}>2022-04-20 22:00 UTC</p>
        </div>
      </div>
      {isStakedexipopupOpen && (
        <PortalPopup
          overlayColor='rgba(113, 113, 113, 0.3)'
          placement='Centered'
          onOutsideClick={closeStakedexipopup}
        >
          <Stakedexipopup onClose={closeStakedexipopup} />
        </PortalPopup>
      )}
      {isUnstakedexipopupOpen && (
        <PortalPopup
          overlayColor='rgba(113, 113, 113, 0.3)'
          placement='Centered'
          onOutsideClick={closeUnstakedexipopup}
        >
          <Unstakedexipopup onClose={closeUnstakedexipopup} />
        </PortalPopup>
      )}
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

export default IndexStake;
