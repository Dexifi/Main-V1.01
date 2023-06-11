import type { NextPage } from "next";
import styles from "./unstakedexipopup.module.css";

type UnstakedexipopupType = {
  onClose?: () => void;
};

const Unstakedexipopup: NextPage<UnstakedexipopupType> = ({ onClose }) => {
  return (
    <div className={styles.unstakedexipopup}>
      <div className={styles.lamp} />
      <div className={styles.unstakeParent}>
        <div className={styles.unstake}>{`Unstake `}</div>
        <div className={styles.vaults}>{`Vaults `}</div>
        <div className={styles.dxe}>DXE</div>
        <img
          className={styles.dexifiLogoIcon}
          alt=""
          src="/dexifi-logo2@2x.png"
        />
      </div>
      <div className={styles.deposited50000}>Deposited : 500.00 DXE</div>
      <button className={styles.createPositionButton}>
        <div className={styles.unstake1}>Unstake</div>
      </button>
      <div className={styles.per1}>
        <div className={styles.dexifiLogoParent}>
          <img
            className={styles.dexifiLogoIcon}
            alt=""
            src="/dexifi-logo2@2x.png"
          />
          <div className={styles.dxe1}>DXE</div>
        </div>
        <div className={styles.div}>$ 224.6646</div>
        <input className={styles.per1Child} type="number" />
      </div>
      <button className={styles.maxbutton}>
        <div className={styles.max}>Max</div>
      </button>
    </div>
  );
};

export default Unstakedexipopup;
