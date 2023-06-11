import type { NextPage } from "next";
import { FormControlLabel, Checkbox } from "@mui/material";
import styles from "./burnnftpopup.module.css";

type BurnnftpopupType = {
  onClose?: () => void;
};

const Burnnftpopup: NextPage<BurnnftpopupType> = ({ onClose }) => {
  return (
    <div className={styles.burnnftpopup}>
      <div className={styles.lamp} />
      <button className={styles.createPositionButton}>
        <div className={styles.send}>Send</div>
      </button>
      <div className={styles.burnParent}>
        <div className={styles.burn}>Burn</div>
        <div className={styles.usturCssTier}>Ustur CSS Tier 1 (CSSLU1)</div>
        <button className={styles.vectorWrapper} onClick={onClose}>
          <img className={styles.vectorIcon} alt="" src="/vector.svg" />
        </button>
      </div>
      <img
        className={styles.burnnftpopupChild}
        alt=""
        src="/frame-1215@2x.png"
      />
      <div className={styles.thisActionWillPermanentlyDParent}>
        <div className={styles.thisActionWillContainer}>
          <p className={styles.thisActionWill}>
            This action will permanently destroy and remove these tokens from
            your wallet.
          </p>
        </div>
        <div className={styles.tokenRebateNetworkContainer}>
          <p className={styles.thisActionWill}>Token</p>
          <p className={styles.thisActionWill}>Rebate</p>
          <p className={styles.thisActionWill}>Network Fee</p>
        </div>
        <div className={styles.usturCssTierContainer}>
          <p className={styles.thisActionWill}>Ustur CSS Tier 1 (CSSLU1)</p>
          <p className={styles.sol}>+0.0020392 SOL</p>
          <p className={styles.thisActionWill}>0.000005 SOL</p>
        </div>
        <div className={styles.iUnderstandThisCannotBeUnParent}>
          <div className={styles.iUnderstandThis}>
            I understand this cannot be undone
          </div>
          <FormControlLabel
            className={styles.checkBox}
            label=""
            labelPlacement="end"
            control={<Checkbox name="checbox" color="primary" size="medium" />}
          />
        </div>
      </div>
    </div>
  );
};

export default Burnnftpopup;
