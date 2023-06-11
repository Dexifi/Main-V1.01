import type { NextPage } from "next";
import styles from "./c-l-m-m-positionpopup.module.css";

type CLMMPositionpopupType = {
  onClose?: () => void;
};

const CLMMPositionpopup: NextPage<CLMMPositionpopupType> = ({ onClose }) => {
  return (
    <div className={styles.clmmPositionpopup}>
      <div className={styles.lamp}>
        <button className={styles.createPositionButton}>
          <div className={styles.depositLiquidity}>Deposit Liquidity</div>
        </button>
      </div>
      <div className={styles.head}>
        <div className={styles.solUsdc}>SOL-USDC</div>
        <div className={styles.poolFee}>Pool Fee : 0.05 %</div>
        <div className={styles.headChild} />
        <img className={styles.solana2Icon} alt="" src="/solana-2@2x.png" />
        <img
          className={styles.usdCoinUsdcLogo1Icon}
          alt=""
          src="/usdcoinusdclogo-2@2x.png"
        />
      </div>
    </div>
  );
};

export default CLMMPositionpopup;
