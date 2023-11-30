import type { NextPage } from 'next';
import { useState, useRef, useCallback } from 'react';
import DepositStakepopup from '../components/deposit-stakepopup';
import PortalPopup from '../components/portal-popup';
import Unstakepopup3 from '../components/unstakepopup3';
import WalletSetting from '../components/wallet-setting';
import DisconnectSetting from '../components/disconnect-setting';
import global from './global-classes.module.css';
import styles from './index-stakestake-ecosystem.module.css';
import Header from '../components/header';
import StakeNav from './stake-nav';
const IndexStakestakeEcosystem: NextPage = () => {
  const [isDepositStakepopupOpen, setDepositStakepopupOpen] = useState(false);
  const [isUnstakepopupOpen, setUnstakepopupOpen] = useState(false);
  const frameButtonRef = useRef<HTMLButtonElement>(null);
  const [isWalletSettingPopupOpen, setWalletSettingPopupOpen] = useState(false);
  const frameButton1Ref = useRef<HTMLButtonElement>(null);
  const [isDisconnectSettingPopupOpen, setDisconnectSettingPopupOpen] =
    useState(false);

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

  const closeWalletSettingPopup = useCallback(() => {
    setWalletSettingPopupOpen(false);
  }, []);

  const closeDisconnectSettingPopup = useCallback(() => {
    setDisconnectSettingPopupOpen(false);
  }, []);

  return (
    <>
      <div className={styles.indexstakeecosystem}>
        <div className={styles.lamp} />
        <Header page={'stake'} />
        <div className={styles.liquidityPanel}>
          <StakeNav activePage='ecosystem' />
          <div className={styles.listPanel}>
            <div className={styles.poolOverwiew}>
              <div className={styles.listOfAll}>
                List of All Active Vaults in Ecosystem
              </div>
            </div>
            <div className={styles.myLocksParent}>
              <div className={`${styles.grid}`}>
                <div className={styles.lockTitle}>My Locks</div>
                <div className={styles.lockTitle}>Total</div>
                <div className={styles.lockTitle}>Value</div>
                <div className={styles.lockTitle}>Rewards</div>
              </div>

              <div className={`${styles.grid}`}>
                <div></div>
                <p className={styles.lockText}>$ 2100.750</p>
                <p className={styles.lockText}>$ 2000.05</p>
                <p className={styles.lockText}>$ 100.75</p>
              </div>
            </div>
          </div>
          <div className={styles.listPanel1}>
            <div className={styles.vaultsParent}>
              <div className={styles.vaults}>{`Vaults `}</div>
              <div className={styles.dxe4}>RAY</div>
              <img
                className={styles.raydiumRayCoin1Icon}
                alt=''
                src='/raydiumraycoin-1@2x.png'
              />
            </div>

            <div className={`${global.column}`}>
              <div className={`${global.row} ${global.spaceBetween}`}>
                <p className={styles.statisticTitle}>APY</p>
                <p className={styles.statisticText}>10.0 %</p>
              </div>
              <div className={`${global.row} ${global.spaceBetween}`}>
                <p className={styles.statisticTitle}>Provider</p>
                <p className={styles.statisticText}>Raydium</p>
              </div>
              <div className={`${global.row} ${global.spaceBetween}`}>
                <p className={styles.statisticTitle}>Reward</p>
                <p className={styles.statisticText}>RAY</p>
              </div>
              <div className={`${global.row} ${global.spaceBetween}`}>
                <p className={styles.statisticTitle}>TVL</p>
                <p className={styles.statisticText}>$5,373,978</p>
              </div>
              <div className={`${global.row} ${global.spaceBetween}`}>
                <p className={styles.statisticTitle}>TVL $</p>
                <p className={styles.statisticText}>24.051.027 RAY</p>
              </div>
              <div className={`${global.row} ${global.spaceBetween}`}>
                <p className={styles.statisticTitle}>Lock Time</p>
                <p className={styles.statisticText}>365 Days</p>
              </div>
              <div className={`${global.row} ${global.spaceBetween}`}>
                <p className={styles.statisticTitle}>Withdraw</p>
                <p className={styles.statisticText}>-</p>
              </div>
              <div className={`${global.row} ${global.spaceBetween}`}>
                <p className={styles.statisticTitle}>Pendding</p>
                <p className={styles.statisticText}>-</p>
              </div>
            </div>

            <button
              className={styles.createPositionButton}
              onClick={openDepositStakepopup}
            >
              <div className={styles.deposit}>Deposit</div>
            </button>
            <div className={styles.createPositionButtonParent}>
              <div className={`${global.row} ${global.spaceBetween}`}>
                <p className={styles.statisticTitle}>{`Deposited `}</p>
                <div className={`${global.column}`}>
                  <p className={styles.statisticText}>200.035 Ray</p>
                  <p className={styles.statisticText}>$ 200.05</p>
                </div>
              </div>
              <div className={`${global.row} ${global.spaceBetween}`}>
                <p className={styles.statisticTitle}>Pending Rewards</p>
                <div className={`${global.column}`}>
                  <p className={styles.statisticText}>200.035 Ray</p>
                  <p className={styles.statisticText}>$ 200.05</p>
                </div>
              </div>
              <button className={styles.createPositionButton1}>
                <div className={styles.claimPending}>Claim Pending</div>
              </button>
              <button
                className={styles.createPositionButton1}
                onClick={openUnstakepopup}
              >
                <div className={styles.claimPending}>Unstake</div>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.v101202204202200UtcContainer}>
          <p className={styles.p}>V1.0.1</p>
          <p className={styles.p}>2022-04-20 22:00 UTC</p>
        </div>
      </div>
      {isDepositStakepopupOpen && (
        <PortalPopup
          overlayColor='rgba(113, 113, 113, 0.3)'
          placement='Centered'
          onOutsideClick={closeDepositStakepopup}
        >
          <DepositStakepopup onClose={closeDepositStakepopup} />
        </PortalPopup>
      )}
      {isUnstakepopupOpen && (
        <PortalPopup
          overlayColor='rgba(113, 113, 113, 0.3)'
          placement='Centered'
          onOutsideClick={closeUnstakepopup}
        >
          <Unstakepopup3 onClose={closeUnstakepopup} />
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

export default IndexStakestakeEcosystem;
