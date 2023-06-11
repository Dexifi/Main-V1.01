const GetFarm = () => {
     
     return (
    <div className={styles.farm}>
      <div className={styles.netWorth1}>
        <div className={styles.farmContainer}>
          <span>Farm</span>
          <span className={styles.span}>{` `}</span>
          <span className={styles.span4}>{`*  `}</span>
          <span>$ 12,500.00</span>
        </div>
      </div>
      <div className={styles.headerParent}>
        <div className={styles.header}>
          <div className={styles.pendingReward}>Pending Reward</div>
          <div className={styles.pendingReward1}>Pending Reward $</div>
          <div className={styles.protocol}>Protocol</div>
          <div className={styles.nftContainer}>Pool</div>
          <div className={styles.value1}>Value</div>
          <div className={styles.lp}>LP</div>
          <div className={styles.apr}>APR</div>
          <div className={styles.reward}>Reward</div>
          <div className={styles.headerChild} />
        </div>
        <div className={styles.solUsdcParent}>
          <div className={styles.usturCssTier}>SOL-USDC</div>
          <div className={styles.raydium}>Raydium</div>
          <img
            className={styles.solanaCopy2}
            alt=""
            src="/solana-copy-2@2x.png"
          />
          <img
            className={styles.usdCoinUsdcLogo2Icon}
            alt=""
            src="/usdcoinusdclogo-2@2x.png"
          />
          <img
            className={styles.raydiumRayCoin1Icon}
            alt=""
            src="/raydiumraycoin-11@2x.png"
          />
          <img
            className={styles.raydiumRayCoin2Icon}
            alt=""
            src="/raydiumraycoin-11@2x.png"
          />
          <div className={styles.div5}>1.31</div>
          <div className={styles.div6}>$ 0.9</div>
          <div className={styles.div7}>$ 103.65</div>
          <div className={styles.div8}>{`0.7655 `}</div>
          <div className={styles.div9}>10.62 %</div>
          <div className={styles.ray}>RAY</div>
          <div className={styles.frameChild} />
        </div>
      </div>
    </div>
  );
};
