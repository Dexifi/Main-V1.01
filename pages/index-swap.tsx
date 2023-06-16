import type { NextPage } from "next";
import { useState, useRef, useCallback, useEffect } from "react";
import SwapTokenListWindow from "../components/swap-token-list-window";
import PortalPopup from "../components/portal-popup";
import styles from "./index-swap.module.css";
import Header from "../components/header";
import { Jupiter, RouteInfo, TOKEN_LIST_URL } from "@jup-ag/core";
import axios from "axios";
import {
  getPrice,
  getTokenBalanceFromWallet,
} from "../components/dashboard/walletBalance";
import { useWallet } from "@solana/wallet-adapter-react";
import { connection } from "../utils/get-connection";
import { PublicKey } from "@solana/web3.js";
import JSBI from "jsbi";
import Head from "next/head";
import Script from "next/script";
import { useJupiter } from "@jup-ag/react-hook";

const IndexSwap: NextPage = () => {
  const [isSwapTokenListWindowPopupOpen, setSwapTokenListWindowPopupOpen] =
    useState(false);
  const [isSwapTokenListWindowPopup1Open, setSwapTokenListWindowPopup1Open] =
    useState(false);
  const [tokenList, setTokenList] = useState([]);
  const [firstToken, setFirstToken] = useState(false);
  const [secondToken, setSecondToken] = useState(false);
  const [fetched, setFetched] = useState(false);
  const openSwapTokenListWindowPopup = useCallback(() => {
    setSwapTokenListWindowPopupOpen(true);
  }, []);

  const closeSwapTokenListWindowPopup = useCallback(() => {
    setSwapTokenListWindowPopupOpen(false);
  }, []);

  const openSwapTokenListWindowPopup1 = useCallback(() => {
    setSwapTokenListWindowPopup1Open(true);
  }, []);

  const closeSwapTokenListWindowPopup1 = useCallback(() => {
    setSwapTokenListWindowPopup1Open(false);
  }, []);

  const onSOL227954So111112Click = useCallback(() => {
    window.open("solscan.io");
  }, []);

  const onUSDC100EPjFDt1vClick = useCallback(() => {
    window.open("solscan.io");
  }, []);

  const { publicKey } = useWallet();
  const fetchTokenList = async () => {
    const tokens: Token[] = await (
      await fetch(TOKEN_LIST_URL["mainnet-beta"])
    ).json();
    setTokenList(tokens);
    setFetched(true);
    setFirstToken(tokens.find((t) => t.symbol === "SOL"));
    setSecondToken(tokens.find((t) => t.symbol === "USDC"));

    // const walletTokens = await getTokenBalanceFromWallet(publicKey);
    // walletTokens.map((token) => {
    //   let t = tokens.find((i) => {
    //     if (token.account.data.parsed.info.mint == i.address)
    //       i.uiAmount = token.account.data.parsed.info.tokenAmount.uiAmount;
    //   });
    // });
    // const walletHave = tokens.filter((item) => item.hasOwnProperty("uiAmount"));
    // walletHave.map(async (item) => {
    //   item.price = (await getPrice(item.symbol)).data.data[item.symbol].price;
    //   item.value = item.uiAmount * item.price;
    // });
  };
  if (!fetched)
    fetchTokenList().then(() => {
      const jupiter = useJupiter({
        amount: JSBI.BigInt(1 * 10 ** 6), // raw input amount of tokens
        inputMint: new PublicKey(firstToken.address),
        outputMint: new PublicKey(secondToken.address),
        slippage: 1, // 1% slippage
        debounceTime: 250, // debounce ms time before refresh
      });
      console.log(jupiter);
    });
  // useEffect(() => {
  //   if (publicKey && fetched) main();
  // }, [publicKey, fetched]);

  return (
    <>
      <main></main>
      <div className={styles.indexswap}>
        <div className={styles.lamp} />
        <div className={styles.liquidityPanel}>
          <div className={styles.listPanel}>
            <div className={styles.lamp1} />
            <button className={styles.createPositionButton}>
              <b className={styles.swap}>Swap</b>
            </button>
            <div className={styles.frameParent}>
              <input className={styles.frameChild} type="number" />
              <button
                className={styles.solana2Parent}
                onClick={openSwapTokenListWindowPopup}
              >
                <img
                  className={styles.solana2Icon}
                  alt=""
                  src={firstToken?.logoURI}
                />
                <div className={styles.sol}>{firstToken?.symbol}</div>
                <img
                  className={styles.anglesDownSolid1Icon}
                  alt=""
                  src="/anglesdownsolid-1.svg"
                />
              </button>
            </div>
            <button className={styles.transferDomainButton}>
              <div className={styles.transfer}>%25</div>
            </button>
            <button className={styles.transferDomainButton1}>
              <div className={styles.transfer}>%50</div>
            </button>
            <button className={styles.transferDomainButton2}>
              <div className={styles.transfer}>%75</div>
            </button>
            <button className={styles.transferDomainButton3}>
              <div className={styles.transfer}>%100</div>
            </button>
            <div className={styles.yourePaying}>{`You’re Paying `}</div>
            <div className={styles.balance100000000}>
              Balance : 10,000.0000 SOL
            </div>
            <div className={styles.frameGroup}>
              <input className={styles.frameChild} type="number" />
              <div
                className={styles.usdCoinUsdcLogo1Parent}
                onClick={openSwapTokenListWindowPopup1}
              >
                <img
                  className={styles.solana2Icon}
                  alt=""
                  src={secondToken?.logoURI}
                />
                <div className={styles.usdc}>{secondToken?.symbol}</div>
                <img
                  className={styles.anglesDownSolid1Icon}
                  alt=""
                  src="/anglesdownsolid-1.svg"
                />
              </div>
            </div>
            <div className={styles.toReceive}>To Receive</div>
            <div className={styles.balance1000000001}>
              Balance : 10,000.0000 USDC
            </div>
            <div className={styles.usdc00438622717Container}>
              <p className={styles.priceImpact}>1 USDC ≈ 0.0438622717 SOL</p>
              <p className={styles.priceImpact}>1 SOL ≈ 22.811322 USDC</p>
            </div>
            <img className={styles.icon} alt="" src="/1.svg" />
            <img className={styles.icon1} alt="" src="/1.svg" />
            <div className={styles.frameContainer}>
              <div className={styles.moreInfoWrapper}>
                <div className={styles.moreInfo}>More info</div>
              </div>
              <div className={styles.frameInner} />
              <div className={styles.details}>
                <div className={styles.priceImpactMinimumContainer}>
                  <p className={styles.priceImpact}>Price Impact</p>
                  <p className={styles.priceImpact}>Minimum Received</p>
                  <p className={styles.priceImpact}>Transaction Fee</p>
                  <p className={styles.priceImpact}>Deposit</p>
                </div>
                <div className={styles.sol0000005SolContainer}>
                  <p className={styles.priceImpact}>{`< 0.1%`}</p>
                  <p className={styles.priceImpact}>0.190275191 SOL</p>
                  <p className={styles.priceImpact}>0.000005 SOL</p>
                  <p className={styles.priceImpact}>
                    0.00203928 SOL for 1 ATA account
                  </p>
                  <p className={styles.priceImpact}>&nbsp;</p>
                </div>
              </div>
            </div>
            <div className={styles.details1}>
              <img
                className={styles.solana2Icon}
                alt=""
                src="/solana-2@2x.png"
              />
              <div
                className={styles.sol227954So111112Container}
                onClick={onSOL227954So111112Click}
              >
                <p className={styles.priceImpact}>SOL $22.7954</p>
                <p className={styles.epjfdt1v}>So11...1112</p>
              </div>
              <img
                className={styles.solana2Icon}
                alt=""
                src="/usdcoinusdclogo-2@2x.png"
              />
              <div
                className={styles.usdc100Epjfdt1vContainer}
                onClick={onUSDC100EPjFDt1vClick}
              >
                <p className={styles.priceImpact}>USDC $1.00</p>
                <p className={styles.epjfdt1v}>EPjF...Dt1v</p>
              </div>
            </div>
            <button className={styles.ellipseParent}>
              <div className={styles.ellipseDiv} />
              <img
                className={styles.rotateRightSolid1Icon}
                alt=""
                src="/rotaterightsolid-1.svg"
              />
            </button>
          </div>
          <div className={styles.poweredByJupiterParent}>
            <div className={styles.moreInfo}>Powered by Jupiter</div>
            <img
              className={styles.jupiterLogo11Icon}
              alt=""
              src="/jupiterlogo1-1.svg"
            />
          </div>
          <div className={styles.liquidityPanelChild} />
          <div className={styles.swapWithTheBestRouteParent}>
            <b className={styles.swapWithThe}>Swap with the best route</b>
            <img
              className={styles.screenshot20230312214007C}
              alt=""
              src="/1screenshot-20230312-214007-copy-1@2x.png"
            />
          </div>
          <button className={styles.anglesDownSolid1Parent}>
            <img
              className={styles.anglesDownSolid1Icon2}
              alt=""
              src="/anglesdownsolid-11.svg"
            />
            <img
              className={styles.solana2Icon}
              alt=""
              src="/solana-24@2x.png"
            />
            <img
              className={styles.solana2Icon}
              alt=""
              src="/usdcoinusdclogo-14@2x.png"
            />
            <div className={styles.solUsdc}>SOL-USDC</div>
          </button>
        </div>
        <Header />
        <div className={styles.v101202204202200UtcContainer}>
          <p className={styles.priceImpact}>V1.0.1</p>
          <p className={styles.priceImpact}>2022-04-20 22:00 UTC</p>
        </div>
      </div>
      {isSwapTokenListWindowPopupOpen && (
        <PortalPopup
          overlayColor="rgba(13, 17, 27, 0.7)"
          placement="Centered"
          onOutsideClick={closeSwapTokenListWindowPopup}
        >
          <SwapTokenListWindow
            onClose={closeSwapTokenListWindowPopup}
            tokens={tokenList}
            setToken={setFirstToken}
            firstToken={firstToken}
            secondToken={secondToken}
          />
        </PortalPopup>
      )}
      {isSwapTokenListWindowPopup1Open && (
        <PortalPopup
          overlayColor="rgba(18, 28, 43, 0.7)"
          placement="Centered"
          onOutsideClick={closeSwapTokenListWindowPopup1}
        >
          <SwapTokenListWindow
            onClose={closeSwapTokenListWindowPopup1}
            tokens={tokenList}
            setToken={setSecondToken}
            firstToken={firstToken}
            secondToken={secondToken}
          />
        </PortalPopup>
      )}
    </>
  );
};

export default IndexSwap;
