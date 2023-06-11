import type { NextPage } from "next";
import styles from "./swap-token-list-window.module.css";

type SwapTokenListWindowType = {
  onClose?: () => void;
};

const SwapTokenListWindow: NextPage<SwapTokenListWindowType> = ({
  onClose,
}) => {
  
  return (
    <div className={styles.swapTokenListWindow}>
      <div className={styles.listPanel}>
        <div className={styles.lamp} />
        <button className={styles.createPositionButton}>
          <img
            className={styles.dexifiLogoIcon}
            alt=""
            src="/dexifi-logo3@2x.png"
          />
          <div className={styles.dxe}>DXE</div>
        </button>
        <button className={styles.createPositionButton1}>
          <img
            className={styles.usdCoinUsdcLogo1Icon}
            alt=""
            src="/usdcoinusdclogo-13@2x.png"
          />
          <div className={styles.dxe}>USDC</div>
        </button>
        <div className={styles.createPositionButtonParent}>
          <button className={styles.createPositionButton2}>
            <div className={styles.solana2Parent}>
              <img
                className={styles.usdCoinUsdcLogo1Icon}
                alt=""
                src="/solana-21@2x.png"
              />
              <div className={styles.sol}>SOL</div>
            </div>
            <div className={styles.sol100645Container}>
              <p className={styles.sol1}>4.3698 SOL</p>
              <p className={styles.p}>$ 100.645</p>
            </div>
          </button>
          <button className={styles.createPositionButton3}>
            <div className={styles.solana2Parent}>
              <img
                className={styles.usdCoinUsdcLogo1Icon}
                alt=""
                src="/solana-21@2x.png"
              />
              <div className={styles.sol}>SOL</div>
            </div>
            <div className={styles.sol100645Container}>
              <p className={styles.sol1}>4.3698 SOL</p>
              <p className={styles.p}>$ 100.645</p>
            </div>
          </button>
          <button className={styles.createPositionButton4}>
            <div className={styles.solana2Parent}>
              <img
                className={styles.usdCoinUsdcLogo1Icon}
                alt=""
                src="/solana-21@2x.png"
              />
              <div className={styles.sol}>SOL</div>
            </div>
            <div className={styles.sol100645Container}>
              <p className={styles.sol1}>4.3698 SOL</p>
              <p className={styles.p}>$ 100.645</p>
            </div>
          </button>
          <button className={styles.createPositionButton5}>
            <div className={styles.solana2Parent}>
              <img
                className={styles.usdCoinUsdcLogo1Icon}
                alt=""
                src="/solana-21@2x.png"
              />
              <div className={styles.sol}>SOL</div>
            </div>
            <div className={styles.sol100645Container}>
              <p className={styles.sol1}>4.3698 SOL</p>
              <p className={styles.p}>$ 100.645</p>
            </div>
          </button>
          <button className={styles.createPositionButton6}>
            <div className={styles.solana2Parent}>
              <img
                className={styles.usdCoinUsdcLogo1Icon}
                alt=""
                src="/solana-21@2x.png"
              />
              <div className={styles.sol}>SOL</div>
            </div>
            <div className={styles.sol100645Container}>
              <p className={styles.sol1}>4.3698 SOL</p>
              <p className={styles.p}>$ 100.645</p>
            </div>
          </button>
          <button className={styles.createPositionButton7}>
            <div className={styles.solana2Parent}>
              <img
                className={styles.usdCoinUsdcLogo1Icon}
                alt=""
                src="/solana-21@2x.png"
              />
              <div className={styles.sol}>SOL</div>
            </div>
            <div className={styles.sol100645Container}>
              <p className={styles.sol1}>4.3698 SOL</p>
              <p className={styles.p}>$ 100.645</p>
            </div>
          </button>
          <button className={styles.createPositionButton8}>
            <div className={styles.solana2Parent}>
              <img
                className={styles.usdCoinUsdcLogo1Icon}
                alt=""
                src="/solana-21@2x.png"
              />
              <div className={styles.sol}>SOL</div>
            </div>
            <div className={styles.sol100645Container}>
              <p className={styles.sol1}>4.3698 SOL</p>
              <p className={styles.p}>$ 100.645</p>
            </div>
          </button>
          <button className={styles.createPositionButton9}>
            <div className={styles.solana2Parent}>
              <img
                className={styles.usdCoinUsdcLogo1Icon}
                alt=""
                src="/solana-21@2x.png"
              />
              <div className={styles.sol}>SOL</div>
            </div>
            <div className={styles.sol100645Container}>
              <p className={styles.sol1}>4.3698 SOL</p>
              <p className={styles.p}>$ 100.645</p>
            </div>
          </button>
          <button className={styles.createPositionButton10}>
            <div className={styles.solana2Parent}>
              <img
                className={styles.circleInfoSolid1Icon}
                alt=""
                src="/circleinfosolid-11.svg"
              />
              <div className={styles.sol}>RMT</div>
            </div>
            <div className={styles.sol100645Container}>
              <p className={styles.sol1}>4.3698 SOL</p>
              <p className={styles.p}>$ 100.645</p>
            </div>
          </button>
        </div>
        <input
          className={styles.listPanelChild}
          type="number"
          placeholder="Search by Token or paste address"
        />
        <button className={styles.createPositionButton11}>
          <img
            className={styles.usdCoinUsdcLogo1Icon}
            alt=""
            src="/tetherusdtlogo-21@2x.png"
          />
          <div className={styles.dxe}>USDT</div>
        </button>
        <button className={styles.createPositionButton12}>
          <img
            className={styles.lidoForSolanaLogo2Icon}
            alt=""
            src="/lidoforsolanalogo-22@2x.png"
          />
          <div className={styles.dxe}>stSOL</div>
        </button>
        <button className={styles.createPositionButton13}>
          <img
            className={styles.marinadeLogoCopy1}
            alt=""
            src="/marinadelogo-copy-12@2x.png"
          />
          <div className={styles.dxe}>mSOL</div>
        </button>
        <button className={styles.createPositionButton14}>
          <img
            className={styles.usdCoinUsdcLogo1Icon}
            alt=""
            src="/solana-22@2x.png"
          />
          <div className={styles.dxe}>SOL</div>
        </button>
        <button className={styles.createPositionButton15}>
          <img
            className={styles.ethereumEthLogo1Icon}
            alt=""
            src="/ethereumethlogo-11@2x.png"
          />
          <div className={styles.dxe}>ETH</div>
        </button>
        <button className={styles.circleXmarkRegular1} onClick={onClose}>
          <img className={styles.vectorIcon} alt="" src="/vector.svg" />
        </button>
        <div className={styles.tokenList}>Token List</div>
      </div>
    </div>
  );
};

export default SwapTokenListWindow;
