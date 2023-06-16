import React, { useEffect, useState } from "react";
import styles from "../../pages/dashboard.module.css";
import {
  PDAUtil,
  ORCA_WHIRLPOOL_PROGRAM_ID,
  buildWhirlpoolClient,
  WhirlpoolContext,
  PriceMath,
  PoolUtil,
} from "@orca-so/whirlpools-sdk";
import { DecimalUtil } from "@orca-so/whirlpool-sdk";
import { AnchorProvider, BN } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { TokenUtil } from "@orca-so/common-sdk";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { connection } from "../../utils/get-connection";
const GetOrca = () => {
  const [orcaFarms, setOrcaFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { wallet, publicKey } = useWallet();
  const fetchData = async () => {
    const tokenInfo = await axios.get(
      "https://api.mainnet.orca.so/v1/whirlpool/list"
    );
    const provider = new AnchorProvider(connection, wallet?.adapter, {
      commitment: "confirmed",
    });
    const ctx = WhirlpoolContext.withProvider(
      provider,
      ORCA_WHIRLPOOL_PROGRAM_ID
    );
    const client = buildWhirlpoolClient(ctx);
    const token_accounts = (
      await ctx.connection.getTokenAccountsByOwner(ctx.wallet.publicKey, {
        programId: TOKEN_PROGRAM_ID,
      })
    ).value;
    const whirlpool_position_candidate_pubkeys = token_accounts
      .map((ta) => {
        const parsed = TokenUtil.deserializeTokenAccount(ta.account.data);
        // Derive the address of Whirlpool's position from the mint address (whether or not it exists)
        const pda = PDAUtil.getPosition(ctx.program.programId, parsed.mint);
        // Returns the address of the Whirlpool position only if the number of tokens is 1 (ignores empty token accounts and non-NFTs)
        return new BN(parsed.amount.toString()).eq(new BN(1))
          ? pda.publicKey
          : undefined;
      })
      .filter((pubkey) => pubkey !== undefined); // orca.getUserPositions(publicKey).then(res=>{
    // Get data from Whirlpool position addresses
    const whirlpool_position_candidate_datas = await ctx.fetcher.listPositions(
      whirlpool_position_candidate_pubkeys,
      true
    );
    // Leave only addresses with correct data acquisition as position addresses
    const whirlpool_positions = whirlpool_position_candidate_pubkeys.filter(
      (pubkey, i) => whirlpool_position_candidate_datas[i] !== null
    );
    let farms = [];
    // Output the status of the positions
    for (let i = 0; i < whirlpool_positions.length; i++) {
      const p = whirlpool_positions[i];
      // Get the status of the position
      const position = await client.getPosition(p);
      const data = position.getData();
      const poolInfo = tokenInfo.data.whirlpools.find(
        (t) => t.address.toString() === data.whirlpool.toString()
      );
      // Get the pool to which the position belongs
      const pool = await client.getPool(data.whirlpool);
      const token_a = pool.getTokenAInfo();
      const token_b = pool.getTokenBInfo();
      const price = PriceMath.sqrtPriceX64ToPrice(
        pool.getData().sqrtPrice,
        token_a.decimals,
        token_b.decimals
      );
      // Calculate the amount of tokens that can be withdrawn from the position
      
      const amounts = PoolUtil.getTokenAmountsFromLiquidity(
        data.liquidity,
        pool.getData().sqrtPrice,
        PriceMath.tickIndexToSqrtPriceX64(data.tickLowerIndex),
        PriceMath.tickIndexToSqrtPriceX64(data.tickUpperIndex),
        true
      );
      console.log(amounts);
      farms.push({
        position: p?.toBase58(),
        "whirlpool address": data.whirlpool.toBase58(),
        "whirlpool price": price.toFixed(token_b.decimals),
        liquidity: data.liquidity.toString(),
        amountA: DecimalUtil.fromU64(
          amounts.tokenA,
          token_a.decimals
        ).toString(),
        amountB: DecimalUtil.fromU64(
          amounts.tokenB,
          token_b.decimals
        ).toString(),
        poolInfo,
      });
    }
    setOrcaFarms(farms);
  };
  if (publicKey && loading)
    fetchData()
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => console.log(err));

  console.log(orcaFarms);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        orcaFarms.map((item, index) => {
          return (
            <div key={index}>
              <div className={styles.solUsdcParent}>
                <div className={styles.usturCssTier}>
                  {item.poolInfo.tokenA.symbol}-{item.poolInfo.tokenB.symbol}
                </div>
                <div className={styles.raydium}>Orca</div>
                <img
                  className={styles.solanaCopy2}
                  alt=""
                  src={item.poolInfo.tokenA.logoURI}
                />
                <img
                  className={styles.usdCoinUsdcLogo2Icon}
                  alt=""
                  src={item.poolInfo.tokenB.logoURI}
                />
                <img
                  className={styles.raydiumRayCoin1Icon}
                  alt=""
                  src="https://assets.coingecko.com/coins/images/17547/large/Orca_Logo.png?1628781615"
                />
                <img
                  className={styles.raydiumRayCoin2Icon}
                  alt=""
                  src="/raydiumraycoin-11@2x.png"
                />
                <div className={styles.div5}>1.31</div>
                <div className={styles.div6}>$ 0.9</div>
                <div className={styles.div7}>$ 103.65</div>
                <div className={styles.div8}>{`0.7655 `}</div>
                <div className={styles.div9}>10.62 %</div>
                <div className={styles.ray}>RAY</div>
                <div className={styles.frameChild} />
              </div>
            </div>
          );
        })
      )}
    </>
  );
};
export default GetOrca;
