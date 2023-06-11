import type { NextPage } from "next";
import styles from "./transfer-domain-popup.module.css";

type TransferDomainPopupType = {
  onClose?: () => void;
};

const TransferDomainPopup: NextPage<TransferDomainPopupType> = ({
  onClose,
}) => {
  return (
    <div className={styles.transferdomainpopup}>
      <div className={styles.lamp} />
      <button className={styles.createPositionButton}>
        <div className={styles.send}>Send</div>
      </button>
      <div className={styles.sendParent}>
        <div className={styles.domain}>Send</div>
        <div className={styles.domain}>Domain</div>
        <button className={styles.vectorWrapper} onClick={onClose}>
          <img className={styles.vectorIcon} alt="" src="/vector.svg" />
        </button>
      </div>
      <div className={styles.fillAddressForTransferParent}>
        <div className={styles.fillAddressForContainer}>
          <p
            className={styles.fillAddressFor}
          >{`Fill Address for Transfer `}</p>
        </div>
        <div className={styles.address}>
          <p className={styles.fillAddressFor}>Address</p>
        </div>
        <input
          className={styles.domaintransferinput}
          type="text"
          min={0.1}
          max={5}
        />
      </div>
      <div className={styles.dexifisolWrapper}>
        <div className={styles.dexifisol}>dexifi.sol</div>
      </div>
    </div>
  );
};

export default TransferDomainPopup;
