import type { NextPage } from "next";
import styles from "./lend-withdrawpopup.module.css";

type LendWithdrawpopupType = {
  onClose?: () => void;
};

const LendWithdrawpopup: NextPage<LendWithdrawpopupType> = ({ onClose }) => {
  return (
    <div className={styles.lendWithdrawpopup}>
      <div className={styles.lamp} />
      <div className={styles.withdrawParent}>
        <div className={styles.withdraw}>Withdraw</div>
        <div className={styles.sol}>SOL</div>
        <img className={styles.solana2Icon} alt="" src="/solana-21@2x.png" />
      </div>
      <div className={styles.balance11366987}>Balance : 113.66987 SOL</div>
      <div className={styles.per1}>
        <div className={styles.div}>$ 224.6646</div>
        <div className={styles.solana2Parent}>
          <img className={styles.solana2Icon} alt="" src="/solana-2@2x.png" />
          <div className={styles.sol1}>SOL</div>
        </div>
      </div>
      <input className={styles.lendWithdrawpopupChild} type="number" />
      <button className={styles.maxbutton}>
        <div className={styles.max}>Max</div>
      </button>
      <button className={styles.maxbutton1}>
        <div className={styles.max}>Half</div>
      </button>
      <div className={styles.div1}>~~ $ 21.6804</div>
      <button className={styles.createPositionButton}>
        <div className={styles.withdraw1}>Withdraw</div>
      </button>
      <div className={styles.details}>
        <div className={styles.priceUserBorrowContainer}>
          <p className={styles.price}>Price</p>
          <p className={styles.price}>User Borrow Limit</p>
          <p className={styles.price}>Utilization</p>
          <p className={styles.price}>Borrow APR</p>
        </div>
        <div className={styles.to531782Container}>
          <p className={styles.price}>$ 23.30</p>
          <p className={styles.price}>$ 3,804.47 to $ 5317.82</p>
          <p className={styles.price}> 54.47 % to 17.82 %</p>
          <p className={styles.price}>Supply APR</p>
        </div>
      </div>
      <div
        className={styles.inputAmountYou}
      >{`Input Amount You Want to Withdraw `}</div>
    </div>
  );
};

export default LendWithdrawpopup;
