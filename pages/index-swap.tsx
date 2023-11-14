import type { NextPage } from "next";
import { useState, useRef, useCallback, useEffect } from "react";
import SwapTokenListWindow from "../components/swap-token-list-window";
import PortalPopup from "../components/portal-popup";
import styles from "./index-swap.module.css";
import Header from "../components/header";
import { Jupiter, TOKEN_LIST_URL, getPlatformFeeAccounts } from "@jup-ag/core";
import {
  getPrice,
  getTokenBalanceFromWallet,
} from "../components/dashboard/walletBalance";
import { useWallet } from "@solana/wallet-adapter-react";
import { connection } from "../utils/get-connection";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  TransactionMessage,
  sendAndConfirmRawTransaction,
} from "@solana/web3.js";
import JSBI from "jsbi";
import { Token } from "@solana/spl-token";
import { RouteInfo } from "@jup-ag/react-hook";

const IndexSwap: NextPage = () => {
  const [isSwapTokenListWindowPopupOpen, setSwapTokenListWindowPopupOpen] =
    useState(false);
  const [isSwapTokenListWindowPopup1Open, setSwapTokenListWindowPopup1Open] =
    useState(false);
  const [tokenList, setTokenList] = useState([] as Token[]);
  const [firstToken, setFirstToken] = useState(false);
  const [secondToken, setSecondToken] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [amount, setAmount] = useState(0);
  const [secondAmount, setSecondAmount] = useState(0);
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

  const { publicKey, wallet } = useWallet();
  useEffect(() => {
    if (!fetched) {
      (async () => {
        const tokens: Token[] = await (
          await fetch(TOKEN_LIST_URL["mainnet-beta"])
        ).json();
        setTokenList(tokens);
        const solana = tokens.find((t: Token) => t.symbol === "SOL");
        solana.price = await getPrice("SOL");
        setFirstToken(solana);
        const USDC = tokens.find((t) => t.symbol === "USDC");
        USDC.price = await getPrice("USDC");
        setSecondToken(USDC);
        setFetched(true);
      })();
    }
  }, []);
  const fetchTokensWithWallet = async () => {
    const tokens = tokenList;
    if (publicKey === null) {
      return false;
    }
    const walletTokens = await getTokenBalanceFromWallet(publicKey);
    walletTokens.map((item) => {
      tokens.forEach(async (token) => {
        if ('parsed' in item.account.data && item.account.data.parsed.info.mint === token.address) {
          token.balance = item.account.data.parsed.info.tokenAmount.uiAmount;
          token.price = await getPrice(token.symbol);
        }
      });
    });
    const solanaToken = tokens.find((token) => token.symbol === "SOL");
    solanaToken.balance =
      (await connection.getBalance(publicKey)) / LAMPORTS_PER_SOL;
    setTokenList(tokens);
  };

  useEffect(() => {
    if (publicKey && fetched) fetchTokensWithWallet();
  }, [publicKey, fetched]);

  const makeSwap = async () => {
    try {
      // If you want to add platformFee as integrator: https://docs.jup.ag/jupiter-core/adding-platform-fees
      const platformFeeAndAccounts = {
        feeBps: 50,
        feeAccounts: await getPlatformFeeAccounts(
          connection,
          new PublicKey("BUX7s2ef2htTGb2KKoPHWkmzxPj4nTWMWRgs5CSbQxf9") // The platform fee account owner
        ),
      };
      //  Load Jupiter
      const jupiter = await Jupiter.load({
        connection,
        cluster: "mainnet-beta",
        user: publicKey, // or public key
        platformFeeAndAccounts,
      });
      console.log("jupiter");
      const routes = await jupiter.computeRoutes({
        inputMint: new PublicKey(firstToken.address),
        outputMint: new PublicKey(secondToken.address),
        amount: JSBI.BigInt(parseInt(amount * 10 ** firstToken.decimals)), // 1000000 => 1 USDC if inputToken.address is USDC mint.
        slippageBps: 1, // 1 bps = 0.01%.
        // forceFetch (optional) => to force fetching routes and not use the cache.
        // intermediateTokens => if provided will only find routes that use the intermediate tokens.
        // feeBps => the extra fee in BPS you want to charge on top of this swap.
        // onlyDirectRoutes =>  Only show single hop routes.
        // swapMode => "ExactIn" | "ExactOut" Defaults to "ExactIn"  "ExactOut" is to support use cases like payments when you want an exact output amount.
        // enforceSingleTx =>  Only show routes where only one single transaction is used to perform the Jupiter swap.
      });
      const { swapTransaction, addressLookupTableAccounts } =
        await jupiter.exchange({
          routeInfo: routes.routesInfos[0],
        });
      var message = TransactionMessage.decompile(Transaction.message, {
        addressLookupTableAccounts: addressLookupTableAccounts,
      });

      // decompile transaction message and add transfer instruction
      message = TransactionMessage.decompile(swapTransaction.message, {
        addressLookupTableAccounts: addressLookupTableAccounts,
      });

      // create your instruction and add it to message.instructions
      const instruction = message.instructions.push(instruction); // add your own instruction here

      // compile the message and update the swapTransaction
      swapTransaction.message = message.compileToV0Message(
        addressLookupTableAccounts
      );
      swapTransaction.sign([wallet.payer]);
      // Execute the transaction
      const rawTransaction = swapTransaction.serialize();
      const txid = await sendAndConfirmRawTransaction(
        connection,
        rawTransaction,
        {
          skipPreflight: true,
          commitment: "confirmed",
          maxRetries: 2,
        }
      );
      console.log(`https://solscan.io/tx/${txid}`);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    setSecondAmount(amount * firstToken.price);
  }, [amount, firstToken, secondToken]);

  useEffect(() => {
    setAmount(secondAmount / firstToken.price);
  }, [secondAmount, firstToken, secondToken]);

  const handleChangeSecondAmount = (e) => {
    setSecondAmount(e.target.value);
  };
  return (
    <>
      <main></main>
      <div className={styles.indexswap}>
        <div className={styles.lamp} />
        <div className={styles.liquidityPanel}>
          <div className={styles.listPanel}>
            <div className={styles.lamp1} />
            <button
              className={styles.createPositionButton}
              onClick={makeSwap}
              disabled={!publicKey}
            >
              <b className={styles.swap}>Swap</b>
            </button>
            <div className={styles.frameParent}>
              <input
                className={styles.frameChild}
                type="number"
                value={amount}
                onChange={handleChangeAmount}
              />
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
            <button
              className={styles.transferDomainButton}
              onClick={() => setAmount(firstToken.balance * 0.25)}
            >
              <div className={styles.transfer}>%25</div>
            </button>
            <button
              className={styles.transferDomainButton1}
              onClick={() => setAmount(firstToken.balance * 0.5)}
            >
              <div className={styles.transfer}>%50</div>
            </button>
            <button
              className={styles.transferDomainButton2}
              onClick={() => setAmount(firstToken.balance * 0.75)}
            >
              <div className={styles.transfer}>%75</div>
            </button>
            <button
              className={styles.transferDomainButton3}
              onClick={() => setAmount(firstToken.balance)}
            >
              <div className={styles.transfer}>%100</div>
            </button>
            <div className={styles.yourePaying}>{`You’re Paying `}</div>
            <div className={styles.balance100000000}>
              Balance : {firstToken.balance ? firstToken.balance : 0}{" "}
              {firstToken.symbol}
            </div>
            <div className={styles.frameGroup}>
              <input
                className={styles.frameChild}
                type="number"
                value={secondAmount}
                onChange={handleChangeSecondAmount}
              />
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
              Balance :{" "}
              {secondToken.balance ? secondToken.balance.toFixed(4) : 0 + " "}
              {secondToken?.symbol}
            </div>
            <div className={styles.usdc00438622717Container}>
              <p className={styles.priceImpact}>
                1 {secondToken.symbol} ≈ {secondToken.price / firstToken.price}{" "}
                SOL
              </p>
              <p className={styles.priceImpact}>
                1 {firstToken.symbol} ≈ {firstToken.price / secondToken.price}{" "}
                USDC
              </p>
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
                src={firstToken.logoURI}
              />
              <div
                className={styles.sol227954So111112Container}
                onClick={() => {
                  window.open(`https://solscan.io/token/${firstToken.address}`);
                }}
              >
                <p className={styles.priceImpact}>
                  {firstToken.symbol} ${firstToken.price?.toFixed(2)}
                </p>
                <p className={styles.epjfdt1v}>
                  {firstToken.address?.slice(0, 4)}...
                  {firstToken.address?.slice(-4)}
                </p>
              </div>
              <img
                className={styles.solana2Icon}
                alt=""
                src={secondToken.logoURI}
              />
              <div
                className={styles.usdc100Epjfdt1vContainer}
                onClick={() => {
                  window.open(`https://solscan.io/token/${firstToken.address}`);
                }}
              >
                <p className={styles.priceImpact}>
                  {secondToken.symbol} ${secondToken.price}
                </p>
                <p className={styles.epjfdt1v}>
                  {secondToken.address?.slice(0, 4)}...
                  {secondToken.address?.slice(-4)}
                </p>
              </div>
            </div>
            <button
              className={styles.ellipseParent}
              onClick={() => {
                const util = secondToken;
                setSecondToken(firstToken);
                setFirstToken(secondToken);
              }}
            >
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
        <Header page={"swap"} />
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
