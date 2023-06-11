import type { NextPage } from "next";
import styles from "./manage-position-popup.module.css";

type ManagePositionPopupType = {
  onClose?: () => void;
};

const ManagePositionPopup: NextPage<ManagePositionPopupType> = ({
  onClose,
}) => {
  return (
    <div className={styles.managePositionPopup}>
      <div className={styles.lamp} />
      <div className={styles.head}>
        <div className={styles.solUsdc}>SOL-USDC</div>
        <div className={styles.headChild} />
        <img className={styles.solana2Icon} alt="" src="/solana-2@2x.png" />
        <img
          className={styles.usdCoinUsdcLogo1Icon}
          alt=""
          src="/usdcoinusdclogo-2@2x.png"
        />
        <button className={styles.createPositionButton}>
          <div className={styles.r}>Remove Liquidity</div>
        </button>
        <button className={styles.createPositionButton1}>
          <div className={styles.r}>Add Liquidity</div>
        </button>
        <button className={styles.createPositionButton2}>
          <div className={styles.r}>Claim Pending</div>
        </button>
      </div>
    </div>
  );
};

export default ManagePositionPopup;
