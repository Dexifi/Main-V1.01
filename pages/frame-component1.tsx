import type { NextPage } from "next";
import styles from "./frame-component1.module.css";
const FrameComponent1: NextPage = () => {
  return (
    <div className={styles.frameParent}>
      <div className={styles.allParent}>
        <button className={styles.all}>All</button>
        <button className={styles.recive}>Recive</button>
        <button className={styles.send}>Send</button>
        <button className={styles.swap}>Swap</button>
        <button className={styles.deposit}>Deposit</button>
        <button className={styles.deposit}>Withdraw</button>
        <button className={styles.deposit}>Repay</button>
      </div>
    </div>
  );
};

export default FrameComponent1;
