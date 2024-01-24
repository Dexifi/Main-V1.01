import { useCallback, useEffect, useMemo, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { Market, OpenOrders, TOKEN_MINTS } from "@openbook-dex/openbook";
import { TokenInfo, TokenListProvider } from "@solana/spl-token-registry";
import { findToken, getPrice } from "@/lib/get-wallet";

export type ownerOpenOrders = {
  fee: number;
  mint?: TokenInfo;
  market: Market;
  order: OpenOrders;
};

// openbook-dex program address
const ProgramID = new PublicKey("srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX");

const useTrade = (connection: Connection, owner: PublicKey | null) => {
  const [ownerOpenOrders, setOwnerOpenOrders] = useState<ownerOpenOrders[]>([]);
  const [totalPrices, setTotalPrices] = useState(0);
  const [loading, setLoading] = useState(true);

  const calculateTotal = useCallback(
    async (data: ownerOpenOrders[]) => {
      let t = 0;
      for (const order of data) {
        if (!order.mint) continue;
        const price = await getPrice(order.mint?.symbol);
        t = t + order.fee * price;
      }
      setTotalPrices(t);
    },
    [ownerOpenOrders]
  );

  const getOwnerOpenOrders = useCallback(async () => {
    setLoading(false);
    if (!owner || !connection || !loading) return;

    const orders = await OpenOrders.findForOwner(connection, owner, ProgramID);

    const data: ownerOpenOrders[] = [];
    for (const order of orders) {
      const market = await Market.load(connection, order.market, {}, ProgramID);
      const mint = await findToken(market.decoded.baseMint.toString());
      data.push({
        mint,
        market,
        order,
        fee: (order.baseTokenTotal.toNumber() /
          // @ts-ignore
          10 ** market._baseSplTokenDecimals) as number,
      });
    }
    setOwnerOpenOrders(data);
    calculateTotal(data);
  }, [owner, connection, loading, calculateTotal]);

  useEffect(() => {
    if (owner && connection && loading) {
      getOwnerOpenOrders();
    }
  }, [getOwnerOpenOrders]);

  return { ownerOpenOrders, totalPrices, loading };
};

export default useTrade;
