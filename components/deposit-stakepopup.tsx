import type { NextPage } from "next";
import styles from "./deposit-stakepopup.module.css";

type DepositStakepopupType = {
  onClose?: () => void;
};

const DepositStakepopup: NextPage<DepositStakepopupType> = ({ onClose }) => {
  return (
    <div className={styles.depositstakepopup}>
      <div className={styles.lamp} />
      <div className={styles.stakeParent}>
        <div className={styles.stake}>{`Stake `}</div>
        <div className={styles.vault}>Vault</div>
        <div className={styles.ray}>RAY</div>
        <img
          className={styles.raydiumRayCoin1Icon}
          alt=""
          src="/raydiumraycoin-1@2x.png"
        />
      </div>
      <div className={styles.balance11366987}>Balance : 113.66987 RAY</div>
      <button className={styles.createPositionButton}>
        <div className={styles.stake1}>Stake</div>
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
      <input className={styles.depositstakepopupChild} type="number" />
      <div className={styles.raydiumRay537397824051Wrapper}>
        <div className={styles.raydiumRay5373978Container}>
          <span className={styles.raydiumRay5373978Container1}>
            <p className={styles.p}>10.0 %</p>
            <p className={styles.p}>Raydium</p>
            <p className={styles.p}>Ray</p>
            <p className={styles.p}>$5,373,978</p>
            <p className={styles.p}>24.051.027 Ray</p>
            <p className={styles.p}>{`Flexible `}</p>
            <p className={styles.p}>21 Days</p>
          </span>
        </div>
      </div>
      <div className={styles.aprProviderRewardTotalStakWrapper}>
        <div className={styles.aprProviderRewardContainer}>
          <span className={styles.raydiumRay5373978Container1}>
            <p className={styles.p}>APR</p>
            <p className={styles.p}>Provider</p>
            <p className={styles.p}>Reward</p>
            <p className={styles.p}>Total Staked</p>
            <p className={styles.p}>Total Staked $</p>
            <p className={styles.p}>Lock Time</p>
            <p className={styles.p}>Withdraw Pending</p>
          </span>
        </div>
      </div>
      <button className={styles.maxbutton}>
        <div className={styles.max}>Max</div>
      </button>
    </div>
  );
};

export default DepositStakepopup;
