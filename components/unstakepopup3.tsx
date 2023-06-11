import type { NextPage } from "next";
import styles from "./unstakepopup3.module.css";

type Unstakepopup3Type = {
  onClose?: () => void;
};

const Unstakepopup3: NextPage<Unstakepopup3Type> = ({ onClose }) => {
  return (
    <div className={styles.unstakepopup}>
      <div className={styles.lamp} />
      <div className={styles.untakeParent}>
        <div className={styles.untake}>{`Untake `}</div>
        <div className={styles.vault}>{`Vault `}</div>
        <div className={styles.ray}>RAY</div>
        <img
          className={styles.raydiumRayCoin1Icon}
          alt=""
          src="/raydiumraycoin-1@2x.png"
        />
      </div>
      <div className={styles.deposited11366987}>Deposited : 113.66987 RAY</div>
      <button className={styles.createPositionButton}>
        <div className={styles.unstake}>Unstake</div>
      </button>
      <div className={styles.per1}>
        <div className={styles.div}>$ 224.6646</div>
        <div className={styles.raydiumRayCoin1Parent}>
          <img
            className={styles.raydiumRayCoin1Icon}
            alt=""
            src="/raydiumraycoin-1@2x.png"
          />
          <div className={styles.ray1}>RAY</div>
        </div>
      </div>
      <input className={styles.unstakepopupChild} type="number" />
      <button className={styles.maxbutton}>
        <div className={styles.max}>Max</div>
      </button>
    </div>
  );
};

export default Unstakepopup3;
