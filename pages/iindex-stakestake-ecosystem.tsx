import type { NextPage } from 'next';
import { useState, useRef, useCallback } from 'react';
import Unstakepopup3 from '../components/unstakepopup3';
import PortalPopup from '../components/portal-popup';
import WalletSetting from '../components/wallet-setting';
import DisconnectSetting from '../components/disconnect-setting';
import styles from './iindex-stakestake-ecosystem.module.css';
import global from './global-classes.module.css';
import Header from '../components/header';
import StakeNav from './stake-nav';
const IindexStakestakeEcosystem: NextPage = () => {
  const [isUnstakepopupOpen, setUnstakepopupOpen] = useState(false);
  const [isUnstakepopup1Open, setUnstakepopup1Open] = useState(false);
  const frameButtonRef = useRef<HTMLButtonElement>(null);
  const [isWalletSettingPopupOpen, setWalletSettingPopupOpen] = useState(false);
  const frameButton1Ref = useRef<HTMLButtonElement>(null);
  const [isDisconnectSettingPopupOpen, setDisconnectSettingPopupOpen] =
    useState(false);

  const openUnstakepopup = useCallback(() => {
    setUnstakepopupOpen(true);
  }, []);

  const closeUnstakepopup = useCallback(() => {
    setUnstakepopupOpen(false);
  }, []);

  const openUnstakepopup1 = useCallback(() => {
    setUnstakepopup1Open(true);
  }, []);

  const closeUnstakepopup1 = useCallback(() => {
    setUnstakepopup1Open(false);
  }, []);

  const closeWalletSettingPopup = useCallback(() => {
    setWalletSettingPopupOpen(false);
  }, []);

  const closeDisconnectSettingPopup = useCallback(() => {
    setDisconnectSettingPopupOpen(false);
  }, []);

  return (
    <>
      <div className={styles.indexstakeliquiditystake}>
        <div className={styles.lamp} />
        <Header page={'stake'} />
        <div className={styles.liquidityPanel}>
          <StakeNav activePage='liquidity-stake' />
          <div className={styles.listPanel1}>
            <div className={`${global.column}`}>
              <div className={styles.listOfAll}>
                List of All Liquidity Stake Provided in Network For Staking
                Solana
              </div>
              <div className={styles.noteThatUnstaking}>
                Note that Unstaking takes between 2-3 days, you can always
                exchange your tokens with Swap.
              </div>
            </div>

            <img
              className={styles.solana4Icon}
              alt=''
              src='/solana-4@2x.png'
            />
          </div>
          <div className={styles.listPanel}>
            <div className={styles.vaultsParent}>
              <div className={styles.vaults}>{`Asset `}</div>
              <div className={styles.dxe4}>SOL</div>
              <img
                className={styles.marinadeLogoCopy1}
                alt=''
                src='/marinadelogo-copy-1@2x.png'
              />
            </div>
            <div className={`${global.column}`}>
              <div className={`${global.row} ${global.spaceBetween}`}>
                <p className={styles.statisticTitle}>APY</p>
                <p className={styles.statisticText}>10.0 %</p>
              </div>
              <div className={`${global.row} ${global.spaceBetween}`}>
                <p className={styles.statisticTitle}>Provider</p>
                <p className={styles.statisticText}>Marinade</p>
              </div>
              <div className={`${global.row} ${global.spaceBetween}`}>
                <p className={styles.statisticTitle}>Token</p>
                <p className={styles.statisticText}>mSOL</p>
              </div>
              <div className={`${global.row} ${global.spaceBetween}`}>
                <p className={styles.statisticTitle}>TVL</p>
                <p className={styles.statisticText}>$5,373,978</p>
              </div>
              <div className={`${global.row} ${global.spaceBetween}`}>
                <p className={styles.statisticTitle}>TVL $</p>
                <p className={styles.statisticText}>24.051.027 SOL</p>
              </div>
              <div className={`${global.row} ${global.spaceBetween}`}>
                <p className={styles.statisticTitle}>Deposit fee</p>
                <p className={styles.statisticText}>0.0 %</p>
              </div>
              <div className={`${global.row} ${global.spaceBetween}`}>
                <p className={styles.statisticTitle}>Staking rewards fee</p>
                <p className={styles.statisticText}>6.0 %</p>
              </div>
            </div>

            <div className={styles.createPositionButtonParent}>
              <div className={styles.per1}>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <div className={styles.solana3Parent}>
                    <img
                      className={styles.solana3Icon}
                      alt=''
                      src='/solana-3@2x.png'
                    />
                    <div className={styles.sol2}>SOL</div>
                  </div>
                  <input
                    className={styles.per1Child}
                    type='number'
                  />
                </div>
                <div className={styles.balance11366987}>
                  Balance : 113.66987 SOL
                </div>
              </div>
              <button className={styles.maxbutton}>
                <div className={styles.max}>Max</div>
              </button>
              <div className={`${global.row} ${global.spaceBetween}`}>
                <p className={styles.statisticTitle}>Exchange rate</p>
                <p className={styles.statisticText}>1 SOL ≈ 0.90790 mSOL</p>
              </div>
              <div className={`${global.row} ${global.spaceBetween}`}>
                <p className={styles.statisticTitle}>Value</p>
                <p className={styles.statisticText}>{`10 mSOL ≈ $ 104.25 `}</p>
              </div>

              <button
                className={styles.createPositionButton}
                onClick={openUnstakepopup}
              >
                <div className={styles.stake}>Stake</div>
              </button>
            </div>
            <div className={styles.createPositionButtonParent}>
            <div className={styles.per1}>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <div className={styles.solana3Parent}>
                  <img
                    className={styles.marinadeLogoCopy1}
                    alt=''
                    src='/marinadelogo-copy-11@2x.png'
                  />
                  <div className={styles.sol2}>mSOL</div>
                  </div>
                  <input
                    className={styles.per1Item}
                    type='number'
                  />
                </div>
                <div className={styles.balance11366987}>
                  Balance : 113.66987 SOL
                </div>
              </div>
               <button className={styles.maxbutton}>
                <div className={styles.max}>Max</div>
              </button>
              <div className={`${global.row} ${global.spaceBetween}`}>
                <p className={styles.statisticTitle}>Exchange rate</p>
                <p className={styles.statisticText}>1 mSOL ≈ 1.108560 SOL</p>
              </div>
              <div className={`${global.row} ${global.spaceBetween}`}>
                <p className={styles.statisticTitle}>Value</p>
                <p className={styles.statisticText}>{`10 SOL ≈ $ 104.25 `}</p>
              </div>
             
              <button
                className={styles.createPositionButton}
                onClick={openUnstakepopup1}
              >
                <div className={styles.stake}>Unstake</div>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.v101202204202200UtcContainer}>
          <p className={styles.p}>V1.0.1</p>
          <p className={styles.p}>2022-04-20 22:00 UTC</p>
        </div>
      </div>
      {isUnstakepopupOpen && (
        <PortalPopup
          overlayColor='rgba(113, 113, 113, 0.3)'
          placement='Centered'
          onOutsideClick={closeUnstakepopup}
        >
          <Unstakepopup3 onClose={closeUnstakepopup} />
        </PortalPopup>
      )}
      {isUnstakepopup1Open && (
        <PortalPopup
          overlayColor='rgba(113, 113, 113, 0.3)'
          placement='Centered'
          onOutsideClick={closeUnstakepopup1}
        >
          <Unstakepopup3 onClose={closeUnstakepopup1} />
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

export default IindexStakestakeEcosystem;
