import type { NextPage } from "next";
import styles from "./wallet-setting.module.css";

type WalletSettingType = {
  onClose?: () => void;
};

const WalletSetting: NextPage<WalletSettingType> = ({ onClose }) => {
  return (
    <div className={styles.walletSetting}>
      <div className={styles.explorerSet}>Explorer Set</div>
      <div className={styles.component1}>
        <div className={styles.component1Child} />
        <div className={styles.component1Item} />
        <div className={styles.solscan}>Solscan</div>
        <div className={styles.explorer}>Explorer</div>
        <div className={styles.solanafm}>SolanaFM</div>
      </div>
      <div className={styles.slippageParent}>
        <div className={styles.slippage}>Slippage</div>
        <div className={styles.custom}>Custom :</div>
        <div className={styles.div}>%</div>
        <div className={styles.rectangleParent}>
          <div className={styles.instanceChild} />
          <div className={styles.instanceItem} />
          <div className={styles.div1}>0.1%</div>
          <div className={styles.div2}>1.0%</div>
          <div className={styles.div3}>0.5%</div>
        </div>
        <input
          className={styles.slippagecustom}
          type="number"
          defaultValue="0.1"
          min={0.1}
          max={1}
          id="SlippageCustom1"
        />
      </div>
      <div className={styles.rpcTiritonConnectedParent}>
        <div className={styles.rpcTiritonConnectedContainer}>
          <span>RPC Tiriton</span>
          <span className={styles.span}>{` `}</span>
          <span className={styles.connected}>Connected</span>
        </div>
        <div className={styles.frameChild} />
        <div className={styles.optionswitcherScaner}>
          <div className={styles.optionScaner}>
            <div className={styles.option}>Solscan</div>
          </div>
          <div className={styles.optionScaner}>
            <div className={styles.option}>SolanaFM</div>
          </div>
          <div className={styles.optionScaner}>
            <div className={styles.option}>Explorer</div>
          </div>
        </div>
        <div className={styles.custom1}>Custom</div>
        <button className={styles.createPositionButton}>
          <div className={styles.switch}>Switch</div>
        </button>
        <input
          className={styles.rpcInput}
          type="text"
          defaultValue="https://"
          placeholder="https://"
          id="rpc_input_1"
        />
      </div>
      <div className={styles.walletSettingChild} />
      <button className={styles.vectorWrapper} onClick={onClose}>
        <img className={styles.vectorIcon} alt="" src="/vector.svg" />
      </button>
    </div>
  );
};

export default WalletSetting;
