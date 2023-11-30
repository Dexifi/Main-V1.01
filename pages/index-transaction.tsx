import type { NextPage } from 'next';
import { useEffect } from 'react';
import WalletSetting from '../components/wallet-setting';
import PortalPopup from '../components/portal-popup';
import DisconnectSetting from '../components/disconnect-setting';
import { useRouter } from 'next/router';
import styles from './index-transaction.module.css';
import global from './global-classes.module.css';
import { connection } from '../utils/get-connection';
import { ParsedTransactionWithMeta, PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import Header from '../components/header';
import DashboardHeader from './dashboard-header';

const IndexTransaction: NextPage = () => {
  const { publicKey } = useWallet();
  const getTransactions = async (address: any, numTx: any) => {
    const pubKey = new PublicKey(address);
    let transactionList = await connection.getSignaturesForAddress(pubKey);
    console.log(transactionList);
    let signatureList = transactionList.map(
      (transaction) => transaction.signature
    );
    let transactionDetails: any[] = await connection.getParsedTransactions(
      signatureList,
      { maxSupportedTransactionVersion: 0 }
    );

    transactionList.forEach((transaction, i) => {
      if (
        transaction.blockTime === null ||
        transaction.blockTime === undefined
      ) {
        return;
      }
      if (transactionDetails === null) {
        return;
      }
      const date = new Date(transaction.blockTime * 1000);
      if (transactionDetails[i] === null) {
        return;
      }
      const transactionInstructions =
        transactionDetails[i].transaction.message.instructions;
      console.log(`Transaction No: ${i + 1}`);
      console.log(`Signature: ${transaction.signature}`);
      console.log(`Time: ${date}`);
      console.log(`Status: ${transaction.confirmationStatus}`);
      transactionInstructions.forEach((instruction: any, n: any) => {
        console.log(
          `---Instructions ${n + 1}: ${instruction.programId.toString()}`
        );
      });
      console.log('-'.repeat(20));
    });
  };
  useEffect(() => {
    if (publicKey) getTransactions(publicKey.toString(), 1000);
  }, [publicKey, connection]);
  return (
    <>
      <div className={styles.dashboardtransaction}>
        <Header />
        <div className={styles.lamp} />
        <div className={styles.dashboardtransactionInner}>
          <DashboardHeader activePage='transactions' />
          <div className={styles.transactionHistoryPannelParent}>
            <div className={styles.transactionHistoryPannel}>
              <div className={styles.lamp1} />
              <div className={styles.transactionHistoryPannelInner}>
                <div className={global.column}>
                  <div className={`${global.row} ${global.spaceBetween}`}>
                    <div className={styles.transactionHistory}>
                      <div className={styles.n}>Transaction History</div>
                    </div>

                    <div className={`${global.row} ${styles.gap}`}>
                      <div className={styles.component2}>
                        <div className={styles.component2Child} />
                        <div className={styles.text}>50 Row</div>
                        <div className={styles.text}>100 Row</div>
                        <div className={styles.component2Item} />
                      </div>
                      <div className={`${global.row} ${styles.gap}`}>
                        <button className={styles.transferDomainButton1}>
                          <div className={styles.transfer}>{`<<`}</div>
                        </button>
                        <button className={styles.transferDomainButton}>
                          <div className={styles.transfer}>{`>>`}</div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.component3}>
                    <div
                      className={`${styles.component3Button} ${styles.active}`}
                    >
                      Recive
                    </div>
                    <div className={styles.component3Button}>All</div>
                    <div className={styles.component3Button}>Swap</div>
                    <div className={styles.component3Button}>Deposit</div>
                    <div className={styles.component3Button}>Withdraw</div>
                    <div className={styles.component3Button}>Repay</div>
                    <div className={styles.component3Button}>Send</div>
                  </div>
                </div>

                <div className={styles.headParent}>
                  <div className={styles.head}>
                    <div className={styles.n}>N</div>
                    <div className={styles.date}>Date</div>
                    <div className={styles.txid}>TXID</div>
                    <div className={styles.platform}>Platform</div>
                    <div className={styles.type}>Type</div>
                    <div className={styles.outgoing}>Outgoing</div>
                    <div className={styles.incoming}>Incoming</div>
                  </div>
                  <div className={styles.div}>
                    <div className={styles.div1}>1</div>
                    <div className={styles.apr28301}>Apr 28, 3:01 AM</div>

                    <a
                      className={styles.zafwws}
                      href='https://solscan.io/tx/2zafJfjEfhuAi3myW1jvSV3SqCFyvjvG6FnCyWob3G7pXB3CyjW6he9YpJiQKVjWYCh8jVqTxPKoVaDr8a6MZwwS'
                      target='_blank'
                    >
                      2zaf...wwS
                    </a>
                    <div className={global.row}>
                      <div className={styles.solana}>Solana</div>
                      <img
                        className={styles.solanaCopy2}
                        alt=''
                        src='/solana-copy-2@2x.png'
                      />
                    </div>
                    <div className={styles.unknown}>Unknown</div>
                    <div className={global.row}>
                      <div className={styles.udsc}>- 3.006 UDSC</div>

                      <img
                        className={styles.solanaCopy3}
                        alt=''
                        src='/solana-copy-2@2x.png'
                      />
                    </div>
                    <div className={global.row}>
                      <div className={styles.sol}>+ 1.156 SOL</div>
                      <img
                        className={styles.usdCoinUsdcLogo2Icon}
                        alt=''
                        src='/usdcoinusdclogo-2@2x.png'
                      />
                    </div>
                  </div>
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

export default IndexTransaction;
