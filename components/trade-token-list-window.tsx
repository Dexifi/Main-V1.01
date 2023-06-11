import type { NextPage } from "next";
import { useState, useCallback } from "react";
import PortalPopup from "./portal-popup";
import styles from "./trade-token-list-window.module.css";

type TradeTokenListWindowType = {
  onClose?: () => void;
};

const TradeTokenListWindow: NextPage<TradeTokenListWindowType> = ({
  onClose,
}) => {
  const [isTradeTokenListWindowPopup1Open, setTradeTokenListWindowPopup1Open] =
    useState(false);

  const openTradeTokenListWindowPopup1 = useCallback(() => {
    setTradeTokenListWindowPopup1Open(true);
  }, []);

  const closeTradeTokenListWindowPopup1 = useCallback(() => {
    setTradeTokenListWindowPopup1Open(false);
  }, []);

  return (
    <>
      <div
        className={styles.tradeTokenListWindow}
        onClick={openTradeTokenListWindowPopup1}
      >
        <div className={styles.listPanel}>
          <div className={styles.lamp} />
          <div className={styles.row1Parent}>
            <button className={styles.row1}>
              <div className={styles.solana2Parent}>
                <img
                  className={styles.solana2Icon}
                  alt=""
                  src="/solana-2@2x.png"
                />
                <img
                  className={styles.solana2Icon}
                  alt=""
                  src="/usdcoinusdclogo-2@2x.png"
                />
                <div className={styles.sol}>SOL</div>
                <div className={styles.sol}>USDC</div>
                <img
                  className={styles.circleInfoSolid1Icon}
                  alt=""
                  src="/circleinfosolid-1.svg"
                />
              </div>
              <div className={styles.marketId}>Market ID : awd...dwa66</div>
            </button>
            <button className={styles.row2}>
              <div className={styles.solana2Parent}>
                <img
                  className={styles.solana2Icon}
                  alt=""
                  src="/solana-2@2x.png"
                />
                <img
                  className={styles.solana2Icon}
                  alt=""
                  src="/usdcoinusdclogo-2@2x.png"
                />
                <div className={styles.sol}>SOL</div>
                <div className={styles.sol}>USDC</div>
                <img
                  className={styles.circleInfoSolid1Icon}
                  alt=""
                  src="/circleinfosolid-1.svg"
                />
              </div>
              <div className={styles.marketId}>Market ID : awd...dwa66</div>
            </button>
            <button className={styles.row3}>
              <div className={styles.solana2Parent}>
                <img
                  className={styles.solana2Icon}
                  alt=""
                  src="/solana-2@2x.png"
                />
                <img
                  className={styles.solana2Icon}
                  alt=""
                  src="/usdcoinusdclogo-2@2x.png"
                />
                <div className={styles.sol}>SOL</div>
                <div className={styles.sol}>USDC</div>
                <img
                  className={styles.circleInfoSolid1Icon}
                  alt=""
                  src="/circleinfosolid-1.svg"
                />
              </div>
              <div className={styles.marketId}>Market ID : awd...dwa66</div>
            </button>
            <button className={styles.row4}>
              <div className={styles.solana2Parent}>
                <img
                  className={styles.solana2Icon}
                  alt=""
                  src="/solana-2@2x.png"
                />
                <img
                  className={styles.solana2Icon}
                  alt=""
                  src="/usdcoinusdclogo-2@2x.png"
                />
                <div className={styles.sol}>SOL</div>
                <div className={styles.sol}>USDC</div>
                <img
                  className={styles.circleInfoSolid1Icon}
                  alt=""
                  src="/circleinfosolid-1.svg"
                />
              </div>
              <div className={styles.marketId}>Market ID : awd...dwa66</div>
            </button>
            <button className={styles.row5}>
              <div className={styles.solana2Parent}>
                <img
                  className={styles.solana2Icon}
                  alt=""
                  src="/solana-2@2x.png"
                />
                <img
                  className={styles.solana2Icon}
                  alt=""
                  src="/usdcoinusdclogo-2@2x.png"
                />
                <div className={styles.sol}>SOL</div>
                <div className={styles.sol}>USDC</div>
                <img
                  className={styles.circleInfoSolid1Icon}
                  alt=""
                  src="/circleinfosolid-1.svg"
                />
              </div>
              <div className={styles.marketId}>Market ID : awd...dwa66</div>
            </button>
            <button className={styles.row6}>
              <div className={styles.solana2Parent}>
                <img
                  className={styles.solana2Icon}
                  alt=""
                  src="/solana-2@2x.png"
                />
                <img
                  className={styles.solana2Icon}
                  alt=""
                  src="/usdcoinusdclogo-2@2x.png"
                />
                <div className={styles.sol}>SOL</div>
                <div className={styles.sol}>USDC</div>
                <img
                  className={styles.circleInfoSolid1Icon}
                  alt=""
                  src="/circleinfosolid-1.svg"
                />
              </div>
              <div className={styles.marketId}>Market ID : awd...dwa66</div>
            </button>
            <button className={styles.row7}>
              <div className={styles.solana2Parent}>
                <img
                  className={styles.solana2Icon}
                  alt=""
                  src="/solana-2@2x.png"
                />
                <img
                  className={styles.solana2Icon}
                  alt=""
                  src="/usdcoinusdclogo-2@2x.png"
                />
                <div className={styles.sol}>SOL</div>
                <div className={styles.sol}>USDC</div>
                <img
                  className={styles.circleInfoSolid1Icon}
                  alt=""
                  src="/circleinfosolid-1.svg"
                />
              </div>
              <div className={styles.marketId}>Market ID : awd...dwa66</div>
            </button>
            <button className={styles.row8}>
              <div className={styles.solana2Parent}>
                <img
                  className={styles.solana2Icon}
                  alt=""
                  src="/solana-2@2x.png"
                />
                <img
                  className={styles.solana2Icon}
                  alt=""
                  src="/usdcoinusdclogo-2@2x.png"
                />
                <div className={styles.sol}>SOL</div>
                <div className={styles.sol}>USDC</div>
                <img
                  className={styles.circleInfoSolid1Icon}
                  alt=""
                  src="/circleinfosolid-1.svg"
                />
              </div>
              <div className={styles.marketId}>Market ID : awd...dwa66</div>
            </button>
            <button className={styles.row9}>
              <div className={styles.solana2Parent}>
                <img
                  className={styles.solana2Icon}
                  alt=""
                  src="/solana-2@2x.png"
                />
                <img
                  className={styles.solana2Icon}
                  alt=""
                  src="/usdcoinusdclogo-2@2x.png"
                />
                <div className={styles.sol}>SOL</div>
                <div className={styles.sol}>USDC</div>
                <img
                  className={styles.circleInfoSolid1Icon}
                  alt=""
                  src="/circleinfosolid-1.svg"
                />
              </div>
              <div className={styles.marketId}>Market ID : awd...dwa66</div>
            </button>
          </div>
          <input
            className={styles.listPanelChild}
            type="text"
            placeholder="Search by Token or paste address"
          />
          <button className={styles.circleXmarkRegular1} onClick={onClose}>
            <img className={styles.vectorIcon} alt="" src="/vector.svg" />
          </button>
          <div className={styles.marketsList}>Markets List</div>
        </div>
      </div>
      {isTradeTokenListWindowPopup1Open && (
        <PortalPopup
          overlayColor="rgba(13, 17, 27, 0.7)"
          placement="Top left"
          onOutsideClick={closeTradeTokenListWindowPopup1}
        >
          <TradeTokenListWindow onClose={closeTradeTokenListWindowPopup1} />
        </PortalPopup>
      )}
    </>
  );
};

export default TradeTokenListWindow;
