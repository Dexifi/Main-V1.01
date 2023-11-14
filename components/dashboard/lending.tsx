import { useWallet } from "@solana/wallet-adapter-react";
import styles from "../../pages/dashboard.module.css";
import React, { useEffect, useState, useMemo } from "react";
// import { connection } from "../../utils/get-connection";
// import { SolendMarket } from "@solendprotocol/solend-sdk";
// import GetMain from "./solend/getMain";
// import GetTurbo from "./solend/turbo-market";

const GetLend = () => {
  const { publicKey } = useWallet();
  const [lendValue, setLendValue] = useState(0);
  return (
    <div className={styles.lendingBalance}>
      <div className={styles.heaadParent}>
        <div className={styles.heaad}>
          <div className={styles.poolTvl}>Pool TVL</div>
          <div className={styles.protocol2}>Protocol</div>
          <div className={styles.nftContainer}>Token</div>
          <div className={styles.ratio}>Ratio</div>
          <div className={styles.suppliedapr}>Supplied(APR)</div>
          <div className={styles.borrowedapr}>Borrowed(APR)</div>
          <div className={styles.pool2}>Pool</div>
          <div className={styles.heaadChild} />
        </div>
        {/* <GetMain setLendValue={setLendValue} lendValue={lendValue} /> */}
        {/* <GetTurbo setLendValue={setLendValue} lendValue={lendValue} /> */}
      </div>
      <div className={styles.netWorth4}>
        <div className={styles.lendingContainer}>
          <span>Lending</span>
          <span className={styles.span}>{` `}</span>
          <span className={styles.span11}>{`*  `}</span>
          <span>$ {lendValue.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
export default GetLend;
