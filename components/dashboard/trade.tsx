import React, { FC, useEffect, useState } from "react";
import styles from "../../pages/dashboard.module.css";
import {
  Wallet,
  loadKeypair,
  DriftClient,
  DRIFT_PROGRAM_ID,
  BulkAccountLoader,
  BN,
} from "@drift-labs/sdk";
import { useWallet } from "@solana/wallet-adapter-react";
import { connection } from "../../utils/get-connection";

const GetTrade = () => {
  const { wallet, publicKey } = useWallet();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    let bulkAccountLoader = new BulkAccountLoader(
      connection,
      "confirmed",
      5000
    );
    let lastBulkAccountLoaderSlot = BulkAccountLoader.mostRecentSlot;
    let accountSubscription = {
      type: "polling",
      accountLoader: bulkAccountLoader,
    };
    const driftClient = new DriftClient({
      connection,
      programID: DRIFT_PROGRAM_ID,
      wallet: wallet?.adapter,
      env: "mainnet-beta",
      accountSubscription,
    });
    await driftClient.subscribe();
    const user = driftClient.getUser();
    await user.subscribe();
    const position = await user.getActivePerpPositions();
    const orders = await user.getOpenOrders();
    const balance = user.getTotalAssetValue().toNumber() / 1000000;
    const data = {
      userBalance: balance.toFixed(2),
      orders,
      position,
    };
    setData(data);
    setLoading(false);
  };
  useEffect(() => {
    if (publicKey && loading) fetchData();
  }, [publicKey]);
  console.log(data);
  return (
    <div className={styles.marginTradingBalance}>
      <div className={styles.frameParent}>
        <div className={styles.sizeParent}>
          <div className={styles.size}>Size</div>
          <div className={styles.market}>Market</div>
          <div className={styles.type1}>Type</div>
          <div className={styles.entryIndex}>Entry / Index</div>
          <div className={styles.driftParent}>
            <div className={styles.drift}>{`Drift `}</div>
            <img
              className={styles.adcc1db02d660497f9957eDriftFIcon}
              alt=""
              src="/63adcc1db02d660497f9957e-drift-full-logo-whitep500-copy-2@2x.png"
            />
            <div className={styles.frameItem} />
          </div>
          <div className={styles.frameInner} />
        </div>
        <div className={styles.frameWrapper}>
          <div className={styles.positionParent}>
            <div className={styles.usturCssTier}>Position</div>
            <div className={styles.solPerp}>SOL-PERP</div>
            <img
              className={styles.adcc1db02d660497f9957eDriftFIcon1}
              alt=""
              src="/63adcc1db02d660497f9957e-drift-full-logo-whitep500-copy-2@2x.png"
            />
            <div className={styles.div14}>$ 22.653</div>
            <div className={styles.div15}>$ 22.753</div>
            <img
              className={styles.solanaCopy22}
              alt=""
              src="/solana-copy-2@2x.png"
            />
            <div className={styles.sol}>0.90 SOL</div>
            <div className={styles.div16}>$ 20.45</div>
            <div className={styles.liqPrice}>Liq Price :</div>
            <div className={styles.div17}>% 10.81</div>
            <div className={styles.pl}>{`P&L :`}</div>
            <div className={styles.wrapper}>
              <div className={styles.div18}>$ 0.08 (+0.01%)</div>
            </div>
            <div className={styles.longParent}>
              <div className={styles.long}>Long</div>
              <div className={styles.x22}>X2.2</div>
            </div>
            <div className={styles.lineDiv} />
          </div>
        </div>
        <div className={styles.balanceParent}>
          <div className={styles.drift}>Balance :</div>
          <div className={styles.usdc}>$ {data.userBalance} USDC</div>
        </div>
      </div>
      <div className={styles.netWorth3}>
        <div className={styles.tradingContainer}>
          <span>Trading</span>
          <span className={styles.span}>{` `}</span>
          <span className={styles.span9}>{`*  `}</span>
          <span>$ 12,500.00</span>
        </div>
      </div>
    </div>
  );
};
export default GetTrade;
