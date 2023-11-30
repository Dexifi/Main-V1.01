import type { NextPage } from 'next';
import { useState, useRef, useCallback } from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';
import WalletSetting from '../components/wallet-setting';
import PortalPopup from '../components/portal-popup';
import DisconnectSetting from '../components/disconnect-setting';
import { useRouter } from 'next/router';
import styles from './index-accounts.module.css';
import global from './global-classes.module.css';
import Header from '../components/header';
import { useWallet } from '@solana/wallet-adapter-react';
import { connection } from '../utils/get-connection';
import DashboardHeader from './dashboard-header';
const IndexAccounts: NextPage = () => {
  const router = useRouter();

  const onNFTGalleryClick = useCallback(() => {
    router.push('/index-n-f-t-gallery');
  }, [router]);

  const onTransactionsClick = useCallback(() => {
    router.push('/index-transaction');
  }, [router]);
  const { publicKey } = useWallet();
  const fetchAccounts = async () => {
    if (publicKey === null) {
      return;
    }
    const test = await connection.getParsedProgramAccounts(publicKey);
    console.log(test);
  };
  fetchAccounts();
  return (
    <>
      <div className={styles.dashboardaccounts}>
        <Header />
        <div className={styles.lamp} />

        <div className={styles.openOrderAccountParent}>
          <DashboardHeader activePage='accounts' />
          <div className={styles.openOrderAccount}>
            <div className={styles.lamp1} />
            <div className={styles.netWorth}>
              <div className={global.column}>
                <div className={styles.openOrderAccounts}>
                  Open Order Accounts
                </div>
                <div className={styles.openOrderAccountFoundParent}>
                  <div className={styles.tokenAccountFound}>
                    19 open order account found
                  </div>
                  <b className={styles.b}>{`$ 0.08 `}</b>
                </div>
              </div>
              <div className={`${global.row} ${styles.rowGap}`}>
                <button className={styles.closeSelectedAccounts}>
                  <div className={styles.closeSelectedAccounts1}>
                    Close Selected Accounts
                  </div>
                </button>
                <button className={styles.closeAllAccounts}>
                  <div className={styles.closeSelectedAccounts1}>
                    Close All Accounts
                  </div>
                </button>
              </div>
            </div>
            <div className={styles.openOrderAccountInner}>
              <div className={styles.headParent}>
                <div className={styles.head}>
                  <div className={styles.market}>Market</div>
                  <div className={styles.platform}>Platform</div>
                  <div className={styles.account}>Account</div>
                  <div className={styles.balance}>Balance</div>
                  <div className={styles.value}>Value</div>
                  <div className={styles.action}>Action</div>
                </div>
                <div className={styles.div}>
                  <div className={`${global.row} ${styles.spaceBeetwen}`}>
                    <div className={global.row}>
                      <img
                        className={styles.solana2Icon}
                        alt=''
                        src='/solana-2@2x.png'
                      />
                      <img
                        className={styles.usdCoinUsdcLogo1Icon}
                        alt=''
                        src='/usdcoinusdclogo-2@2x.png'
                      />
                      <div className={styles.solusdc}>SOL/USDC</div>
                    </div>

                    <img
                      className={styles.serumlogoIcon}
                      alt=''
                      src='/serumlogo.svg'
                    />
                  </div>

                  <div className={styles.serum}>Serum</div>
                  <a
                    className={styles.zafwws}
                    href='https://solscan.io/tx/2zafJfjEfhuAi3myW1jvSV3SqCFyvjvG6FnCyWob3G7pXB3CyjW6he9YpJiQKVjWYCh8jVqTxPKoVaDr8a6MZwwS'
                    target='_blank'
                  >
                    2zaf...wwS
                  </a>
                  <div className={styles.div1}>$ 0.52</div>
                  <div className={styles.div2}>$ 0.00</div>
                  <FormControlLabel
                    className={styles.checkBox}
                    label=''
                    labelPlacement='end'
                    control={
                      <Checkbox
                        name='checbox'
                        color='primary'
                        size='medium'
                      />
                    }
                  />
                  <button className={styles.closeAccount}>
                    <div className={styles.closeAccount1}>Close Account</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.openOrderAccount}>
            <div className={styles.lamp1} />
            <div className={styles.netWorth}>
              <div className={global.column}>
                <div className={styles.openOrderAccounts}>
                  Open Order Accounts
                </div>
                <div className={styles.openOrderAccountFoundParent}>
                  <div className={styles.tokenAccountFound}>
                    19 token account found
                  </div>
                  <b className={styles.b}>{`$ 0.08 `}</b>
                </div>
              </div>
              <div className={`${global.row} ${styles.rowGap}`}>
                <button className={styles.closeSelectedAccounts}>
                  <div className={styles.closeSelectedAccounts1}>
                    Close Selected Accounts
                  </div>
                </button>
                <button className={styles.closeAllAccounts}>
                  <div className={styles.closeSelectedAccounts1}>
                    Close All Accounts
                  </div>
                </button>
              </div>
            </div>
            <div className={styles.openOrderAccountInner}>
              <div className={styles.headParent}>
                <div className={styles.head}>
                  <div className={styles.market}>Asset</div>
                  <div className={styles.account}>Account</div>
                  <div className={styles.platform}>Type</div>

                  <div className={styles.balance}>Balance</div>
                  <div className={styles.value}>Value</div>
                  <div className={styles.action}>Action</div>
                </div>
                <div className={styles.divToken}>
                  <div className={`${global.row} ${styles.spaceBeetwen}`}>
                    <div className={global.row}>
                      <div className={styles.solusdc}>SOL/USDC</div>
                    </div>

                    <img
                      className={styles.usdCoinUsdcLogo1Icon}
                      alt=''
                      src='/usdcoinusdclogo-2@2x.png'
                    />
                  </div>

                  <a
                    className={styles.zafwws}
                    href='https://solscan.io/tx/2zafJfjEfhuAi3myW1jvSV3SqCFyvjvG6FnCyWob3G7pXB3CyjW6he9YpJiQKVjWYCh8jVqTxPKoVaDr8a6MZwwS'
                    target='_blank'
                  >
                    2zaf...wwS
                  </a>
                  <div className={styles.typeText}>Assoc. Token Acc</div>
                  <div className={styles.div2}>$ 0.00</div>
                  <div className={styles.div2}>$ 0.05</div>
                  <FormControlLabel
                    className={styles.checkBox}
                    label=''
                    labelPlacement='end'
                    control={
                      <Checkbox
                        name='checbox'
                        color='primary'
                        size='medium'
                      />
                    }
                  />
                  <button className={styles.closeAccount}>
                    <div className={styles.closeAccount1}>Close Account</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.v101202204202200UtcContainer}>
          <p className={styles.utc}>V1.0.1</p>
          <p className={styles.utc}>2022-04-20 22:00 UTC</p>
        </div>
      </div>
    </>
  );
};

export default IndexAccounts;
