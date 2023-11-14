import type { NextPage } from "next";
import styles from "./swap-token-list-window.module.css";
import { useState } from "react";
import { getPrice } from "./dashboard/walletBalance";

type SwapTokenListWindowType = {
  onClose?: () => void;
  tokens: any;
  setToken: any;
  firstToken: any;
  secondToken: any;
};

const SwapTokenListWindow: NextPage<SwapTokenListWindowType> = ({
  onClose,
  tokens,
  setToken,
  firstToken,
  secondToken,
}) => {
  const [search, setSearch] = useState("");

  const handleOnChangeSearch = (target: any) => {
    setSearch(target.target.value.toUpperCase());
  };
  tokens.sort((a: any, b: any) => {
    // اگر balance وجود دارد، براساس آن مرتب کن
    if (a.balance != null && b.balance != null) {
      return b.balance - a.balance;
    }
    // اگر balance در a وجود دارد ولی در b وجود ندارد، a را جلوی b بگذار
    else if (a.balance != null && b.balance == null) {
      return -1;
    }
    // اگر balance در b وجود دارد ولی در a وجود ندارد، b را جلوی a بگذار
    else if (a.balance == null && b.balance != null) {
      return 1;
    }
    // اگر هر دوی a و b balance ندارند، ترتیب اصلی را حفظ کن
    else {
      return 0;
    }
  });
  const setDefaultTokens = async (tokenSymbol: string) => {
    const thisToken = tokens.find((item: any) => item.symbol === tokenSymbol);
    console.log(thisToken);
    if (
      firstToken.symbol !== thisToken.symbol &&
      secondToken.symbol !== thisToken.symbol
    )
      setToken(thisToken);
    if (onClose) {
      onClose();
    }
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
          onClick={()=>setDefaultTokens("USDC")}
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
            .filter((t: any) => t.symbol.includes(search))
            .map((item: any, index: any) => {
              return (
                <button
                  className={styles.createPositionButton2}
                  key={index + 1}
                  onClick={() => {
                    if (
                      item.symbol !== firstToken.symbol &&
                      item.symbol !== secondToken.symbol
                    )
                      (async () => {
                        item.price = await getPrice(item.symbol);
                        setToken(item);
                        if (onClose) {
                          await onClose();
                        }
                        
                      })();
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
                  {item.hasOwnProperty("balance") ? (
                    <div className={styles.sol100645Container}>
                      <p className={styles.sol1}>
                        {item.balance} {item.symbol}
                      </p>
                      <p className={styles.p}>
                        $ {Number((item.balance * item.price).toFixed(4))}
                      </p>
                    </div>
                  ) : null}
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
            setDefaultTokens("USDT");
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
            setDefaultTokens("stSOL");
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
            setDefaultTokens("mSOL");
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
            setDefaultTokens("SOL");
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
            setDefaultTokens("ETH");
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
