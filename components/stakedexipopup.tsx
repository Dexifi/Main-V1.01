import type { NextPage } from "next";
import styles from "./stakedexipopup.module.css";

type StakedexipopupType = {
  onClose?: () => void;
};

const Stakedexipopup: NextPage<StakedexipopupType> = ({ onClose }) => {
  return (
    <div className={styles.stakedexipopup}>
      <div className={styles.lamp} />
      <div className={styles.stakeParent}>
        <div className={styles.stake}>{`Stake `}</div>
        <div className={styles.vault}>{`Vault `}</div>
        <div className={styles.dxe}>DXE</div>
        <img
          className={styles.dexifiLogoIcon}
          alt=""
          src="/dexifi-logo2@2x.png"
        />
      </div>
      <div className={styles.balance50000}>Balance : 500.00 DXE</div>
      <button className={styles.createPositionButton}>
        <div className={styles.stake1}>Stake</div>
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
      <div className={styles.dexifiDxe200000000020Wrapper}>
        <div className={styles.dexifiDxeContainer}>
          <p className={styles.p}>12.0 %</p>
          <p className={styles.p}>Dexifi</p>
          <p className={styles.p}>DXE</p>
          <p className={styles.p}>$ 20,000,000.00</p>
          <p className={styles.p}>20,055,040.00 DXE</p>
          <p className={styles.p}>365</p>
          <p className={styles.p}>-</p>
          <p className={styles.p}>30</p>
        </div>
      </div>
      <div className={styles.aprProviderRewardTotalStakWrapper}>
        <div className={styles.dexifiDxeContainer}>
          <p className={styles.p}>APR</p>
          <p className={styles.p}>Provider</p>
          <p className={styles.p}>Reward</p>
          <p className={styles.p}>Total Staked</p>
          <p className={styles.p}>Total Staked $</p>
          <p className={styles.p}>Lock Time</p>
          <p className={styles.p}>Withdraw Pending</p>
          <p className={styles.p}>Ticket Receiving</p>
        </div>
      </div>
    </div>
  );
};

export default Stakedexipopup;
