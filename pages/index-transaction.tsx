import type { NextPage } from "next";
import { useState, useRef, useCallback, useEffect } from "react";
import WalletSetting from "../components/wallet-setting";
import PortalPopup from "../components/portal-popup";
import DisconnectSetting from "../components/disconnect-setting";
import { useRouter } from "next/router";
import styles from "./index-transaction.module.css";
import { connection } from "../utils/get-connection";
import { ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import Header from "../components/header";

const IndexTransaction: NextPage = () => {
  const router = useRouter();

  const onAccountPageButtonClick = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  const onNFTGalleryClick = useCallback(() => {
    router.push("/index-n-f-t-gallery");
  }, [router]);

  const onAccountsClick = useCallback(() => {
    router.push("/index-accounts");
  }, [router]);

  const { publicKey } = useWallet();
  const getTransactions = async (address, numTx) => {
    const pubKey = new PublicKey(address);
    let transactionList = await connection.getSignaturesForAddress(pubKey );
    console.log(transactionList);
    let signatureList = transactionList.map(
      (transaction) => transaction.signature
    );
    let transactionDetails = await connection.getParsedTransactions(
      signatureList,
      { maxSupportedTransactionVersion: 0 }
    );

    transactionList.forEach((transaction, i) => {
      const date = new Date(transaction.blockTime * 1000);
      const transactionInstructions =
        transactionDetails[i].transaction.message.instructions;
      console.log(`Transaction No: ${i + 1}`);
      console.log(`Signature: ${transaction.signature}`);
      console.log(`Time: ${date}`);
      console.log(`Status: ${transaction.confirmationStatus}`);
      transactionInstructions.forEach((instruction, n) => {
        console.log(
          `---Instructions ${n + 1}: ${instruction.programId.toString()}`
        );
      });
      console.log("-".repeat(20));
    });
  };
  useEffect(() => {
    if(publicKey)
    getTransactions(publicKey.toString(), 1000);
  }, [publicKey, connection]);
  return (
    <>
      <div className={styles.dashboardtransaction}>
        <div className={styles.lamp} />
        <div className={styles.dashboardtransactionInner}>
          <div className={styles.transactionHistoryPannelParent}>
            <div className={styles.transactionHistoryPannel}>
              <div className={styles.lamp1} />
              <div className={styles.transactionHistoryPannelInner}>
                <div className={styles.headParent}>
                  <div className={styles.head}>
                    <div className={styles.headChild} />
                    <div className={styles.platform}>Platform</div>
                    <div className={styles.date}>Date</div>
                    <div className={styles.n}>N</div>
                    <div className={styles.incoming}>Incoming</div>
                    <div className={styles.type}>Type</div>
                    <div className={styles.outgoing}>Outgoing</div>
                    <div className={styles.txid}>TXID</div>
                  </div>
                  <div className={styles.div}>
                    <div className={styles.apr28301}>Apr 28, 3:01 AM</div>
                    <div className={styles.div1}>1</div>
                    <a
                      className={styles.zafwws}
                      href="https://solscan.io/tx/2zafJfjEfhuAi3myW1jvSV3SqCFyvjvG6FnCyWob3G7pXB3CyjW6he9YpJiQKVjWYCh8jVqTxPKoVaDr8a6MZwwS"
                      target="_blank"
                    >
                      2zaf...wwS
                    </a>
                    <div className={styles.solana}>Solana</div>
                    <div className={styles.udsc}>- 3.006 UDSC</div>
                    <img
                      className={styles.solanaCopy2}
                      alt=""
                      src="/solana-copy-2@2x.png"
                    />
                    <img
                      className={styles.solanaCopy3}
                      alt=""
                      src="/solana-copy-2@2x.png"
                    />
                    <div className={styles.unknown}>Unknown</div>
                    <div className={styles.sol}>+ 1.156 SOL</div>
                    <div className={styles.child} />
                    <img
                      className={styles.usdCoinUsdcLogo2Icon}
                      alt=""
                      src="/usdcoinusdclogo-2@2x.png"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.transactionHistory}>
                <div className={styles.n}>Transaction History</div>
              </div>
              <button className={styles.transferDomainButton}>
                <div className={styles.transfer}>{`>>`}</div>
              </button>
              <button className={styles.transferDomainButton1}>
                <div className={styles.transfer}>{`<<`}</div>
              </button>
              <div className={styles.component2}>
                <div className={styles.component2Child} />
                <div className={styles.row}>50 Row</div>
                <div className={styles.row1}>100 Row</div>
                <div className={styles.component2Item} />
              </div>
              <div className={styles.component3}>
                <div className={styles.component2Child} />
                <div className={styles.recive}>Recive</div>
                <div className={styles.all}>All</div>
                <div className={styles.swap}>Swap</div>
                <div className={styles.deposit}>Deposit</div>
                <div className={styles.withdraw}>Withdraw</div>
                <div className={styles.repay}>Repay</div>
                <div className={styles.send}>Send</div>
                <img
                  className={styles.component3Item}
                  alt=""
                  src="/rectangle-4206.svg"
                />
              </div>
            </div>
            <button
              className={styles.accountPageButton}
              onClick={onAccountPageButtonClick}
            >
              <div className={styles.transfer}>{`<<      Back`}</div>
            </button>
            <div className={styles.dashboardPageSwitcher}>
              <div className={styles.dashboardPageSwitcherChild} />
              <button className={styles.nftGallery} onClick={onNFTGalleryClick}>
                NFT Gallery
              </button>
              <button className={styles.accounts} onClick={onAccountsClick}>
                Accounts
              </button>
              <div className={styles.transactions1}>Transactions</div>
              <div className={styles.dashboardPageSwitcherItem} />
            </div>
          </div>
        </div>
        <Header />
        <div className={styles.v101202204202200UtcContainer}>
          <p className={styles.utc}>V1.0.1</p>
          <p className={styles.utc}>2022-04-20 22:00 UTC</p>
        </div>
      </div>
    </>
  );
};

export default IndexTransaction;
