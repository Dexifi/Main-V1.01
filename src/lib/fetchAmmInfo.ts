import { ApiPoolInfoItem } from "@raydium-io/raydium-sdk/src/baseInfo/interface";
import { Liquidity } from "@raydium-io/raydium-sdk";
import { Connection, PublicKey } from "@solana/web3.js";

export const fetchAmmInfo = async (
  connection: Connection,
  pool: ApiPoolInfoItem
) => {
  if (!pool || !connection) return;
  return await Liquidity.fetchInfo({
    connection,
    poolKeys: {
      ...pool,
      id: new PublicKey(pool.id),
      programId: new PublicKey(pool.programId),
      lpMint: new PublicKey(pool.lpMint),
      baseMint: new PublicKey(pool.baseMint),
      openOrders: new PublicKey(pool.openOrders),
      quoteMint: new PublicKey(pool.quoteMint),
      authority: new PublicKey(pool.authority),
      targetOrders: new PublicKey(pool.targetOrders),
      baseVault: new PublicKey(pool.baseVault),
      quoteVault: new PublicKey(pool.quoteVault),
      marketId: new PublicKey(pool.marketId),
      marketProgramId: new PublicKey(pool.marketProgramId),
      lpVault: new PublicKey(pool.lpVault),
      lookupTableAccount: new PublicKey(pool.lookupTableAccount),
      marketAsks: new PublicKey(pool.marketAsks),
      marketAuthority: new PublicKey(pool.marketAuthority),
      marketBids: new PublicKey(pool.marketBids),
      marketBaseVault: new PublicKey(pool.marketBaseVault),
      marketEventQueue: new PublicKey(pool.marketEventQueue),
      marketQuoteVault: new PublicKey(pool.marketQuoteVault),
      withdrawQueue: new PublicKey(pool.withdrawQueue),
    },
  });
};
