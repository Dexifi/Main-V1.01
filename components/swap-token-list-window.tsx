import type { NextPage } from "next";
import styles from "./swap-token-list-window.module.css";
import { useState } from "react";

type SwapTokenListWindowType = {
  onClose?: () => void;
};

const SwapTokenListWindow: NextPage<SwapTokenListWindowType> = ({
  onClose,
  tokens,
  setToken,
  firstToken,
  secondToken,
}) => {
  const [search, setSearch] = useState("");
  
  const handleOnChangeSearch = (target) => {
    setSearch(target.target.value.toUpperCase());
  };

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
        <button
          className={styles.createPositionButton1}
          onClick={() => {
            const thisToken = tokens.find((item) => item.symbol === "USDC");
            if (
              firstToken.symbol !== thisToken.symbol &&
              secondToken.symbol !== thisToken.symbol
            )
              setToken(thisToken);
            onClose();
          }}
        >
          <img
            className={styles.usdCoinUsdcLogo1Icon}
            alt=""
            src="/usdcoinusdclogo-13@2x.png"
          />
          <div className={styles.dxe}>USDC</div>
        </button>
        <div className={styles.createPositionButtonParent}>
          {tokens
            .filter((t) => t.symbol.includes(search))
            .map((item, index) => {
              return (
                <button
                  className={styles.createPositionButton2}
                  key={index + 1}
                  onClick={() => {
                    if (
                      item.symbol !== firstToken.symbol &&
                      item.symbol !== secondToken.symbol
                    )
                      setToken(item);
                    onClose();
                  }}
                >
                  <div className={styles.solana2Parent}>
                    <img
                      className={styles.usdCoinUsdcLogo1Icon}
                      alt=""
                      src={item.logoURI}
                    />
                    <div className={styles.sol}>{item.symbol}</div>
                  </div>
                  <div className={styles.sol100645Container}>
                    <p className={styles.sol1}>4.3698 SOL</p>
                    <p className={styles.p}>$ 100.645</p>
                  </div>
                </button>
              );
            })}
        </div>
        <input
          className={styles.listPanelChild}
          placeholder="Search by Token or paste address"
          value={search}
          onChange={handleOnChangeSearch}
        />
        <button
          className={styles.createPositionButton11}
          onClick={() => {
            const thisToken = tokens.find((item) => item.symbol === "USDT");
            if (
              firstToken.symbol !== thisToken.symbol &&
              secondToken.symbol !== thisToken.symbol
            )
              setToken(thisToken);
            onClose();
          }}
        >
          <img
            className={styles.usdCoinUsdcLogo1Icon}
            alt=""
            src="/tetherusdtlogo-21@2x.png"
          />
          <div className={styles.dxe}>USDT</div>
        </button>
        <button
          className={styles.createPositionButton12}
          onClick={() => {
            const thisToken = tokens.find((item) => item.symbol === "stSOL");
            if (
              firstToken.symbol !== thisToken.symbol &&
              secondToken.symbol !== thisToken.symbol
            )
              setToken(thisToken);
            onClose();
          }}
        >
          <img
            className={styles.lidoForSolanaLogo2Icon}
            alt=""
            src="/lidoforsolanalogo-22@2x.png"
          />
          <div className={styles.dxe}>stSOL</div>
        </button>
        <button
          className={styles.createPositionButton13}
          onClick={() => {
            const thisToken = tokens.find((item) => item.symbol === "mSOL");
            if (
              firstToken.symbol !== thisToken.symbol &&
              secondToken.symbol !== thisToken.symbol
            )
              setToken(thisToken);
            onClose();
          }}
        >
          <img
            className={styles.marinadeLogoCopy1}
            alt=""
            src="/marinadelogo-copy-12@2x.png"
          />
          <div className={styles.dxe}>mSOL</div>
        </button>
        <button
          className={styles.createPositionButton14}
          onClick={() => {
            const thisToken = tokens.find((item) => item.symbol === "SOL");
            if (
              firstToken.symbol !== thisToken.symbol &&
              secondToken.symbol !== thisToken.symbol
            )
              setToken(thisToken);
            onClose();
          }}
        >
          <img
            className={styles.usdCoinUsdcLogo1Icon}
            alt=""
            src="/solana-22@2x.png"
          />
          <div className={styles.dxe}>SOL</div>
        </button>
        <button
          className={styles.createPositionButton15}
          onClick={() => {
            const thisToken = tokens.find((item) => item.symbol === "ETH");
            if (
              firstToken.symbol !== thisToken.symbol &&
              secondToken.symbol !== thisToken.symbol
            )
              setToken(thisToken);
            onClose();
          }}
        >
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
