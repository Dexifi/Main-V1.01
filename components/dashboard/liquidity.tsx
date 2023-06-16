import styles from "../../pages/dashboard.module.css";
import { Connection, PublicKey } from "@solana/web3.js";
import {
  LIQUIDITY_STATE_LAYOUT_V4,
  SPL_ACCOUNT_LAYOUT,
  TokenAccount,
} from "@raydium-io/raydium-sdk";
import axios from "axios";
import BN from "bn.js";
import { useWallet } from "@solana/wallet-adapter-react";
import liquidityData from "./Raydiumdb/liquidityData.json";
import NodeCache from "node-cache";
import { connection } from "../../utils/get-connection";
import { findToken, getTokenBalanceFromWallet } from "./walletBalance";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { OpenOrders } from "@project-serum/serum";
import { useState } from "react";

const cache = new NodeCache({ stdTTL: 3000, checkperiod: 120 });

const GetLiquidity = () => {
  const { publicKey } = useWallet();
  const [userLiquidity, setUserLiquidity] = useState([]);
  async function fetchDataFromCache(url) {
    let data = cache.get(url);
    if (data === undefined) {
      console.log("Fetching data from axios:", url);
      const response = await axios.get(url);
      data = response.data;
      cache.set(url, data);
      console.log("chached");
    } else {
      console.log("Fetching data from cache:", url);
    }
    return data;
  }
  async function getTokenAccounts(connection: Connection, owner: PublicKey) {
    const tokenResp = await connection.getTokenAccountsByOwner(owner, {
      programId: TOKEN_PROGRAM_ID,
    });

    const accounts: TokenAccount[] = [];
    for (const { pubkey, account } of tokenResp.value) {
      accounts.push({
        pubkey,
        accountInfo: SPL_ACCOUNT_LAYOUT.decode(account.data),
      });
    }

    return accounts;
  }

  async function demoFarm() {
    let allLiquiditys = [];
    const OPENBOOK_PROGRAM_ID = new PublicKey(
      "srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX"
    );

    const owner = publicKey;
    const walletBalance = await getTokenBalanceFromWallet(publicKey);
    const tokenAccounts = await getTokenAccounts(connection, publicKey);
    let walletFarms = [];
    walletBalance.forEach((item) => {
      let isFarm = liquidityData.official.find(
        (farm) => farm.lpMint == item.account.data.parsed.info.mint
      );
      if (!isFarm)
        isFarm = liquidityData.unOfficial.find(
          (farm) => farm.lpMint == item.account.data.parsed.info.mint
        );
      if (isFarm) walletFarms.push(isFarm);
    });
    walletFarms.map(async (item) => {
      const info = await connection.getAccountInfo(new PublicKey(item.id));
      if (!info) return;
      const poolState = LIQUIDITY_STATE_LAYOUT_V4.decode(info.data);
      const openOrders = await OpenOrders.load(
        connection,
        poolState.openOrders,
        new PublicKey(item.marketProgramId) // OPENBOOK_PROGRAM_ID(marketProgramId) of each pool can get from api: https://api.raydium.io/v2/sdk/liquidity/mainnet.json
      );
      const baseDecimal = 10 ** poolState.baseDecimal.toNumber(); // e.g. 10 ^ 6
      const quoteDecimal = 10 ** poolState.quoteDecimal.toNumber();

      const baseTokenAmount = await connection.getTokenAccountBalance(
        poolState.baseVault
      );
      const quoteTokenAmount = await connection.getTokenAccountBalance(
        poolState.quoteVault
      );

      const basePnl = poolState.baseNeedTakePnl.toNumber() / baseDecimal;
      const quotePnl = poolState.quoteNeedTakePnl.toNumber() / quoteDecimal;

      const openOrdersBaseTokenTotal =
        openOrders.baseTokenTotal.toNumber() / baseDecimal;
      const openOrdersQuoteTokenTotal =
        openOrders.quoteTokenTotal.toNumber() / quoteDecimal;

      const base =
        (baseTokenAmount.value?.uiAmount || 0) +
        openOrdersBaseTokenTotal -
        basePnl;
      const quote =
        (quoteTokenAmount.value?.uiAmount || 0) +
        openOrdersQuoteTokenTotal -
        quotePnl;

      const denominator = new BN(10).pow(poolState.baseDecimal);

      const addedLpAccount = tokenAccounts.find((a) =>
        a.accountInfo.mint.equals(poolState.lpMint)
      );
      const baseToken = await findToken(item.baseMint);
      const quoteToken = await findToken(item.quoteMint);
      const liquiditySymbol = `${baseToken?.symbol}-${quoteToken?.symbol}`;
      allLiquiditys.push({
        name: `${liquiditySymbol}`,
        "pool total base ": base,
        "pool total quote ": quote,

        "base vault balance ": baseTokenAmount.value.uiAmount,
        "quote vault balance ": quoteTokenAmount.value.uiAmount,

        "base tokens in openorders ": openOrdersBaseTokenTotal,
        "quote tokens in openorders  ": openOrdersQuoteTokenTotal,

        "base token decimals ": poolState.baseDecimal.toNumber(),
        "quote token decimals ": poolState.quoteDecimal.toNumber(),
        "total lp ": poolState.lpReserve.div(denominator).toString(),

        "addedLpAmount ":
          (addedLpAccount?.accountInfo.amount.toNumber() || 0) / baseDecimal,
      });
    });
    setUserLiquidity(allLiquiditys);
  }
  if (publicKey) demoFarm();
  return (
    <div className={styles.liquidity}>
      <div className={styles.headGroup}>
        <div className={styles.head1}>
          <div className={styles.headItem} />
          <div className={styles.apr1}>APR</div>
          <div className={styles.protocol1}>Protocol</div>
          <div className={styles.value2}>Value</div>
          <div className={styles.pending}>Pending</div>
          <div className={styles.depositRatio}>
            <p className={styles.utc}>Deposit Ratio</p>
          </div>
          <div className={styles.type}>Type</div>
          <div className={styles.nftContainer}>Pool</div>
          <div className={styles.leverage}>Leverage</div>
        </div>
        <div className={styles.div10}>
          <div className={styles.item} />
          <div className={styles.usturCssTier}>SOL-USDC</div>
          <div className={styles.raydium}>Raydium</div>
          <div className={styles.normal}>Normal</div>
          <img
            className={styles.solanaCopy21}
            alt=""
            src="/solana-copy-2@2x.png"
          />
          <div className={styles.div11}>6.15%</div>
          <div className={styles.div12}>$ 4,812.99</div>
          <img
            className={styles.usdCoinUsdcLogo2Icon1}
            alt=""
            src="/usdcoinusdclogo-2@2x.png"
          />
          <img
            className={styles.raydiumRayCoin1Icon1}
            alt=""
            src="/raydiumraycoin-11@2x.png"
          />
          <div className={styles.tvl}>TVL : $ 12.0 m</div>
          <div className={styles.div13}>$ 222.21</div>
          <div className={styles.x1818}>x18.18</div>
          <div className={styles.range189231}>
            Range : 18.9231 - 23.6432 USDC per SOL
          </div>
          <div className={styles.indexTp22654}>Index TP: 22.654 $</div>
          <div className={styles.statusInContainer}>
            <span>{`Status : `}</span>
            <span className={styles.inRange}>In Range</span>
          </div>
          <div className={styles.sol4556}>SOL 45.56 %</div>
          <div className={styles.usdc5444}>USDC 54.44 %</div>
        </div>
      </div>
      <div className={styles.netWorth2}>
        <div className={styles.liquidityContainer}>
          <span>Liquidity</span>
          <span className={styles.span}>{` `}</span>
          <span className={styles.span6}>*</span>
          <span className={styles.span}>{` `}</span>
          <span>$ 12,500.00</span>
        </div>
      </div>
    </div>
  );
};
export default GetLiquidity;
