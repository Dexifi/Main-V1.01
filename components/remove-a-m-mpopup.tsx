import type { NextPage } from "next";
import styles from "./remove-a-m-mpopup.module.css";

type RemoveAMMpopupType = {
  onClose?: () => void;
};

const RemoveAMMpopup: NextPage<RemoveAMMpopupType> = ({ onClose }) => {
  return (
    <div className={styles.removeammpopup}>
      <div className={styles.lamp} />
      <div className={styles.removeAmmParent}>
        <div className={styles.removeAmm}>Remove AMM</div>
        <div className={styles.solUsdc}>SOL-USDC</div>
        <img className={styles.solana2Icon} alt="" src="/solana-2@2x.png" />
        <img
          className={styles.solana2Icon}
          alt=""
          src="/usdcoinusdclogo-2@2x.png"
        />
      </div>
      <div className={styles.balance11366987}>Balance : 113.66987 LP</div>
      <div className={styles.per1}>
        <div className={styles.div}>$ 224.6646</div>
        <div className={styles.solUsdcWrapper}>
          <div className={styles.solUsdc1}>SOL-USDC</div>
        </div>
      </div>
      <input className={styles.removeammpopupChild} type="number" />
      <button className={styles.maxbutton}>
        <div className={styles.max}>Max</div>
      </button>
      <button className={styles.maxbutton1}>
        <div className={styles.max}>Half</div>
      </button>
      <button className={styles.createPositionButton}>
        <div className={styles.removeLiquidity}>Remove Liquidity</div>
      </button>
    </div>
  );
};

export default RemoveAMMpopup;
