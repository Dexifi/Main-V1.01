import type { NextPage } from "next";
import { useState, useCallback } from "react";
import PortalPopup from "./portal-popup";
import styles from "./trade-token-list-window.module.css";
import { findToken } from "./dashboard/walletBalance";

type TradeTokenListWindowType = {
  onClose?: () => void;
};

const TradeTokenListWindow: NextPage<TradeTokenListWindowType> = ({
  onClose,
  markets,
  setSelectedMarket,
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
            {markets?.map((item, index) => {
              if (index % 2 === 0) {
                return (
                  <button
                    className={styles.row1}
                    key={index + 1}
                    onClick={() => {
                      setSelectedMarket(item);
                      onClose();
                    }}
                  >
                    <div className={styles.solana2Parent}>
                      <img
                        className={styles.solana2Icon}
                        alt=""
                        src={item.tokenA?.logoURI}
                      />
                      <img
                        className={styles.solana2Icon}
                        alt=""
                        src={item.tokenB?.logoURI}
                      />
                      <div className={styles.sol}>
                        {item.name.split("/")[0]}
                      </div>
                      <div className={styles.sol}>
                        {item.name.split("/")[1]}
                      </div>
                      <img
                        className={styles.circleInfoSolid1Icon}
                        alt=""
                        src="/circleinfosolid-1.svg"
                      />
                    </div>
                    <div className={styles.marketId}>
                      Market ID : {item.address?.toString().slice(0, 3)}...
                      {item.address?.toString().slice(-5)}
                    </div>
                  </button>
                );
              } else {
                return (
                  <button
                    className={styles.row2}
                    key={index + 1}
                    onClick={() => {
                      setSelectedMarket(item);
                      onClose();
                    }}
                  >
                    <div className={styles.solana2Parent}>
                      <img
                        className={styles.solana2Icon}
                        alt=""
                        src={item.tokenA?.logoURI}
                      />
                      <img
                        className={styles.solana2Icon}
                        alt=""
                        src={item.tokenB?.logoURI}
                      />
                      <div className={styles.sol}>
                        {item.name.split("/")[0]}
                      </div>
                      <div className={styles.sol}>
                        {item.name.split("/")[1]}
                      </div>
                      <img
                        className={styles.circleInfoSolid1Icon}
                        alt=""
                        src="/circleinfosolid-1.svg"
                      />
                    </div>
                    <div className={styles.marketId}>
                      Market ID : {item.address?.toString().slice(0, 3)}...
                      {item.address?.toString().slice(-5)}
                    </div>
                  </button>
                );
              }
            })}
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
