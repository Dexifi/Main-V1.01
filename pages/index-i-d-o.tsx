import type { NextPage } from 'next';
import { useState, useRef, useCallback } from 'react';
import WalletSetting from '../components/wallet-setting';
import PortalPopup from '../components/portal-popup';
import DisconnectSetting from '../components/disconnect-setting';
import { useRouter } from 'next/router';
import styles from './index-i-d-o.module.css';
import global from './global-classes.module.css';
import Header from '../components/header';
const IndexIDO: NextPage = () => {
  const frameButtonRef = useRef<HTMLButtonElement>(null);
  const [isWalletSettingPopupOpen, setWalletSettingPopupOpen] = useState(false);
  const frameButton1Ref = useRef<HTMLButtonElement>(null);
  const [isDisconnectSettingPopupOpen, setDisconnectSettingPopupOpen] =
    useState(false);
  const router = useRouter();

  const closeWalletSettingPopup = useCallback(() => {
    setWalletSettingPopupOpen(false);
  }, []);

  const closeDisconnectSettingPopup = useCallback(() => {
    setDisconnectSettingPopupOpen(false);
  }, []);

  const onCreatePositionButtonClick = useCallback(() => {
    router.push('/index-i-d-opool');
  }, [router]);

  return (
    <>
      <div className={styles.indexido}>
        <div className={styles.lamp} />
        <Header page={'ido'} />
        <div className={styles.liquidityPanel}>
          <div className={styles.rectangleParent}>
            <div className={`${styles.poolButton} ${styles.navActive}`}>
              All
            </div>
            <div className={`${styles.poolButton}`}>Open</div>
            <div className={`${styles.poolButton}`}>Closed</div>
          </div>
          <div className={styles.listPanel1}>
            <div className={`${global.column}`}>
              <div
                className={styles.listOfIdo}
              >{`List of IDO Token Sale in Dexifi `}</div>
              <div className={styles.withStakingDxeContainer}>
                <p className={styles.withStakingDxe}>
                  With Staking DXE get access to IDO sale.
                </p>
              </div>
            </div>

            <div className={styles.frameGroup}>
              <div className={`${styles.statistic} ${global.column} `}>
                <div className={styles.idoWrapper}>
                  <div className={styles.ido}>Total Lunched</div>
                </div>
                <div className={styles.wrapper}>
                  <div className={styles.ido}>1</div>
                </div>
              </div>
              <div className={`${styles.statistic} ${global.column} `}>
                <div className={styles.idoWrapper}>
                  <div className={styles.ido}>Open Pools</div>
                </div>
                <div className={styles.wrapper}>
                  <div className={styles.ido}>1</div>
                </div>
              </div>
              <div className={`${styles.statisticContainer}`}>
                <div className={`${styles.statistic} ${global.column} `}>
                  <div className={styles.idoWrapper}>
                    <div className={styles.ido}>Last Lunch Details</div>
                  </div>
                  <div className={styles.prmContainer}>
                    <div className={styles.ido}>PRM</div>
                  </div>
                </div>
                <div className={`${styles.statistic} ${global.column} `}>
                  <div className={styles.idoWrapper}>
                    <div className={styles.ido}>Last Token ATH</div>
                  </div>
                  <div className={styles.frame}>
                    <div className={styles.ido}>700.00%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.liquidityPanelInner}>
            <div className={styles.listPanel}>
              <div className={styles.frameParent}>
                <div className={styles.idoWrapper}>
                  <div className={styles.ido}>IDO</div>
                </div>
                <div className={styles.prmWrapper}>
                  <b className={styles.ido}>PRM</b>
                </div>
                <img
                  className={styles.prismathic1Icon}
                  alt=''
                  src='/prismathic-12@2x.png'
                />
              </div>
              <div className={`${global.column}`}>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>Name</p>
                  <p className={styles.statisticText}>Prismatic</p>
                </div>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>Total Raise</p>
                  <p className={styles.statisticText}>30,000,000.00 PRM</p>
                </div>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>Per PRM</p>
                  <p className={styles.statisticText}>$ 0.000012</p>
                </div>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>
                    Allocation / Winning Ticket
                  </p>
                  <p className={styles.statisticText}>$ 1.00</p>
                </div>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>Pool</p>
                  <p className={styles.statisticText}></p>
                </div>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>Open</p>
                  <p className={styles.statisticText}>2022-04-20 22:00</p>
                </div>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>Close</p>
                  <div className={`${global.column}`}>
                    <p className={styles.statisticText}>2022-04-20 22:00</p>
                    <p className={styles.statisticText}>UTC</p>
                  </div>
                </div>
              </div>

              <div className={styles.collectedTicketsStatusRoiParent}>
              <div className={`${global.column}`}>
              <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>Collected tickets</p>
                  <div className={`${global.column}`}>
                    <p className={styles.statisticText}>0/36</p>
                    <p className={styles.statisticText}>0 %</p>
                  </div>
                </div>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>Status</p>
                  <p className={`${styles.statisticText} ${styles.open}`}>Open</p>
                </div>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <p className={styles.statisticTitle}>ROI (ATH)</p>
                  <div className={`${global.column}`}>
                    <p className={styles.statisticText}>0</p>
                    <p className={styles.statisticText}>0</p>
                  </div>
                </div>
              </div>
              </div>
              <button
                className={styles.createPositionButton}
                onClick={onCreatePositionButtonClick}
              >
                <div className={styles.goToPool}>Go to Pool</div>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.v101202204202200UtcContainer}>
          <p className={styles.prismatic}>V1.0.1</p>
          <p className={styles.prismatic}>2022-04-20 22:00 UTC</p>
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

export default IndexIDO;
