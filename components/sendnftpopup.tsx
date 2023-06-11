import type { NextPage } from "next";
import styles from "./sendnftpopup.module.css";

type SendnftpopupType = {
  onClose?: () => void;
};

const Sendnftpopup: NextPage<SendnftpopupType> = ({ onClose }) => {
  return (
    <div className={styles.sendnftpopup}>
      <div className={styles.lamp} />
      <button className={styles.createPositionButton}>
        <div className={styles.send}>Send</div>
      </button>
      <div className={styles.sendParent}>
        <div className={styles.usturCssTier}>Send</div>
        <div className={styles.usturCssTier}>Ustur CSS Tier 1 (CSSLU1)</div>
        <button className={styles.vectorWrapper} onClick={onClose}>
          <img className={styles.vectorIcon} alt="" src="/vector12.svg" />
        </button>
      </div>
      <img
        className={styles.sendnftpopupChild}
        alt=""
        src="/frame-1215@2x.png"
      />
      <div className={styles.fillAddressAndAmountForTrParent}>
        <div className={styles.fillAddressAndContainer}>
          <p
            className={styles.fillAddressAnd}
          >{`Fill Address and Amount for Transfer `}</p>
        </div>
        <div className={styles.address}>
          <p className={styles.fillAddressAnd}>Address</p>
        </div>
        <div className={styles.amount}>Amount</div>
        <input
          className={styles.slipageButtons}
          type="text"
          min={0.1}
          max={5}
        />
        <button className={styles.maxbutton}>
          <div className={styles.max}>Max</div>
        </button>
        <input
          className={styles.slipageButtons1}
          type="number"
          min={0.1}
          max={5}
        />
      </div>
    </div>
  );
};

export default Sendnftpopup;
