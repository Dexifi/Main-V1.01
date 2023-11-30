import styles from '../../pages/dashboard.module.css';
import { Connection, PublicKey } from '@solana/web3.js';
import {
  LIQUIDITY_STATE_LAYOUT_V4,
  SPL_ACCOUNT_LAYOUT,
  TokenAccount,
} from '@raydium-io/raydium-sdk';
import axios from 'axios';
import BN from 'bn.js';
import { useWallet } from '@solana/wallet-adapter-react';
import liquidityData from './Raydiumdb/liquidityData.json';
import { connection } from '../../utils/get-connection';
import { findToken, getTokenBalanceFromWallet } from './walletBalance';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { OpenOrders } from '@project-serum/serum';
import { useState } from 'react';

const GetLiquidity = () => {
  const { publicKey } = useWallet();
  const [userLiquidity, setUserLiquidity] = useState([]);
  const [fetched, setFetched] = useState(false);
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
    let allLiquiditys: any[] = [];
    const OPENBOOK_PROGRAM_ID = new PublicKey(
      'srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX'
    );

    const owner = publicKey;
    if (publicKey === null) {
      return;
    }
    const walletBalance = await getTokenBalanceFromWallet(publicKey);
    const tokenAccounts = await getTokenAccounts(connection, publicKey);
    let walletFarms: any[] = [];
    walletBalance.forEach((item) => {
      let isFarm = liquidityData.official.find(
        (farm: any) => farm.lpMint == item.account.data.parsed.info.mint
      );
      if (!isFarm)
        isFarm = liquidityData.unOfficial.find(
          (farm: any) => farm.lpMint == item.account.data.parsed.info.mint
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
        poolTotalBase: base,
        poolTotalQuote: quote,
        baseVaultBalance: baseTokenAmount.value.uiAmount,
        quoteVaultBalance: quoteTokenAmount.value.uiAmount,
        baseTokensInOpenorders: openOrdersBaseTokenTotal,
        quoteTokensInOpenorders: openOrdersQuoteTokenTotal,
        baseTokenDecimals: poolState.baseDecimal.toNumber(),
        quoteTokenDecimals: poolState.quoteDecimal.toNumber(),
        totalLp: poolState.lpReserve.div(denominator).toString(),
        addedLpAmount:
          (addedLpAccount?.accountInfo.amount.toNumber() || 0) / baseDecimal,
        baseToken,
        quoteToken,
      });
    });
    setUserLiquidity(allLiquiditys);
    setFetched(true);
  }
  if (!fetched && publicKey) demoFarm();
  console.log(userLiquidity);
  return (
    <div className={styles.liquidity}>
      <div className={styles.netWorth2}>
        <div className={styles.liquidityContainer}>
          <span>Liquidity</span>
          <span className={styles.span}>{` `}</span>
          <span className={styles.span6}>*</span>
          <span className={styles.span}>{` `}</span>
          <span>$ 12,500.00</span>
        </div>
      </div>
      <div className={styles.headGroup}>
        <div className={styles.head1}>
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
          <div className={styles.frameWrapperColumn}>
            <div
              className={`${styles.frameWrapperRow} ${styles.frameWrapperRowStart}`}
            >
              <div className={styles.usturCssTier}>SOL-USDC</div>
              <img
                className={styles.solanaCopy21}
                alt=''
                src='/solana-copy-2@2x.png'
              />
              <img
                className={styles.usdCoinUsdcLogo2Icon1}
                alt=''
                src='/usdcoinusdclogo-2@2x.png'
              />
            </div>
            <div className={styles.tvl}>TVL : $ 12.0 m</div>
          </div>

          <div className={styles.frameWrapperColumn}>
            <div
              className={`${styles.frameWrapperRow} ${styles.frameWrapperRowStart}`}
            >
              <div className={styles.raydium}>Raydium</div>
              <img
                className={styles.raydiumRayCoin1Icon1}
                alt=''
                src='/raydiumraycoin-11@2x.png'
              />
            </div>

            <div className={styles.indexTp22654}>Index TP: 22.654 $</div>
          </div>

          <div className={styles.frameWrapperColumn}>
            <div className={styles.normal}>Normal</div>
            <div className={styles.range189231}>
              Range : 18.9231 - 23.6432 USDC per SOL
            </div>
          </div>

          <div className={styles.div11}>6.15%</div>
          <div className={styles.div12}>$ 4,812.99</div>
          <div className={styles.frameWrapperColumn}>
            <div className={styles.div13}>$ 222.21</div>
            <div className={styles.statusInContainer}>
              <span>{`Status : `}</span>
              <span className={styles.inRange}>In Range</span>
            </div>
          </div>
          <div className={styles.frameWrapperColumn}>
            <div className={styles.sol4556}>SOL 45.56 %</div>
            <div className={styles.usdc5444}>USDC 54.44 %</div>
          </div>

          <div className={styles.x1818}>x18.18</div>
        </div>
        {userLiquidity.map((item, index) => {
          return (
            <div
              className={styles.div10}
              key={index + 1}
            >
              <div className={styles.item} />
              <div className={styles.usturCssTier}>{item.name}</div>
              <div className={styles.raydium}>Raydium</div>
              <div className={styles.normal}>Normal</div>
              <img
                className={styles.solanaCopy21}
                alt=''
                src='/solana-copy-2@2x.png'
              />
              <div className={styles.div11}>6.15%</div>
              <div className={styles.div12}>$ 4,812.99</div>
              <img
                className={styles.usdCoinUsdcLogo2Icon1}
                alt=''
                src='/usdcoinusdclogo-2@2x.png'
              />
              <img
                className={styles.raydiumRayCoin1Icon1}
                alt=''
                src='/raydiumraycoin-11@2x.png'
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
          );
        })}
      </div>
    </div>
  );
};
export default GetLiquidity;
