import type { NextPage } from "next";
import styles from "./market-add.module.css";

type MarketAddType = {
  onClose?: () => void;
};

const MarketAdd: NextPage<MarketAddType> = ({ onClose }) => {
  return (
    <div className={styles.marketAdd}>
      <input
        className={styles.marketAddChild}
        type="text"
        placeholder="Market ID"
      />
      <input
        className={styles.marketAddItem}
        type="text"
        placeholder="Quote Label"
        disabled
        readOnly
      />
      <input
        className={styles.marketAddInner}
        type="text"
        placeholder="Base Label"
        required
      />
      <button className={styles.circleXmarkRegular1} onClick={onClose}>
        <img className={styles.vectorIcon} alt="" src="/vector.svg" />
      </button>
      <div className={styles.importMarket}>Import Market</div>
      <button className={styles.createPositionButton}>
        <div className={styles.addMarket}>Add Market</div>
      </button>
    </div>
  );
};

export default MarketAdd;
