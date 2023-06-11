import type { NextPage } from "next";
import styles from "./add-a-m-mpopup.module.css";

type AddAMMpopupType = {
  onClose?: () => void;
};

const AddAMMpopup: NextPage<AddAMMpopupType> = ({ onClose }) => {
  return (
    <div className={styles.addammpopup}>
      <div className={styles.lamp} />
      <div className={styles.addAmmParent}>
        <div className={styles.addAmm}>Add AMM</div>
        <div className={styles.solUsdc}>SOL-USDC</div>
        <img className={styles.solana2Icon} alt="" src="/solana-2@2x.png" />
        <img
          className={styles.solana2Icon}
          alt=""
          src="/usdcoinusdclogo-2@2x.png"
        />
      </div>
      <div className={styles.balance11366987}>Balance : 113.66987 SOL</div>
      <div className={styles.balance113669871}>Balance : 113.66987 USDC</div>
      <div className={styles.per1}>
        <div className={styles.div}>$ 224.6646</div>
        <div className={styles.solana2Parent}>
          <img className={styles.solana2Icon} alt="" src="/solana-2@2x.png" />
          <div className={styles.sol}>SOL</div>
        </div>
      </div>
      <input className={styles.addammpopupChild} type="number" />
      <button className={styles.maxbutton}>
        <div className={styles.max}>Max</div>
      </button>
      <button className={styles.maxbutton1}>
        <div className={styles.max}>Half</div>
      </button>
      <div className={styles.per11}>
        <div className={styles.div}>$ 224.6646</div>
        <div className={styles.solana2Parent}>
          <img
            className={styles.solana2Icon}
            alt=""
            src="/usdcoinusdclogo-2@2x.png"
          />
          <div className={styles.sol}>USDC</div>
        </div>
      </div>
      <input className={styles.addammpopupItem} type="number" />
      <button className={styles.maxbutton2}>
        <div className={styles.max2}>Max</div>
      </button>
      <button className={styles.maxbutton3}>
        <div className={styles.max2}>Half</div>
      </button>
      <button className={styles.refreshbutton}>
        <img className={styles.vectorIcon} alt="" src="/vector5.svg" />
      </button>
      <img className={styles.plusicon} alt="" src="/plusicon1.svg" />
      <div className={styles.sol216804}>1 SOL ~~ 21.6804 USDC</div>
      <button className={styles.changeper}>
        <img className={styles.vectorIcon1} alt="" src="/vector8.svg" />
      </button>
      <button className={styles.createPositionButton}>
        <div className={styles.addLiquidity}>Add Liquidity</div>
      </button>
      <div className={styles.details}>
        <div className={styles.basePoolLiquidityContainer}>
          <p className={styles.base}>Base</p>
          <p className={styles.base}>Pool Liquidity (SOL)</p>
          <p className={styles.base}>Pool Liquidity (USDC)</p>
          <p className={styles.base}>LP Supply</p>
        </div>
        <div className={styles.sol503295635RayContainer}>
          <p className={styles.base}>SOL</p>
          <p className={styles.base}>5,032,956.35 RAY</p>
          <p className={styles.base}>1,156,771.22 USDC</p>
          <p className={styles.base}>595,668.74 LP</p>
        </div>
      </div>
    </div>
  );
};

export default AddAMMpopup;
