import { useCallback, useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import {
  decodeInstruction,
  Market,
  OpenOrders,
  Orderbook,
} from "@openbook-dex/openbook";
import { TokenInfo } from "@solana/spl-token-registry";
import { findToken } from "@/lib/get-wallet";
import { getPrice } from "@/data/price";

export type ownerOpenOrders = {
  fee: number;
  mint?: TokenInfo;
  market: Market;
  baseToken?: TokenInfo;
  quoteToken?: TokenInfo;
  side: "buy" | "sell";
  protocol: string;
  protocolIcon: string;
  isDone: boolean;
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
    console.log(orders);
    // console.log(orders);
    const data: ownerOpenOrders[] = [];
    for (const order of orders) {
      const market = await Market.load(connection, order.market, {}, ProgramID);
      const ob = new Orderbook(market, order.accountFlags, {});
      console.log(ob.items(false).)
      const baseToken = await findToken(market.decoded.baseMint.toString());
      const quoteToken = await findToken(market.decoded.quoteMint.toString());
      data.push({
        protocol: "OpenBook",
        protocolIcon: "/assets/openBook.svg",
        mint: baseToken,
        market,
        baseToken,
        quoteToken,
        order,
        side: order.baseTokenTotal.toNumber() > 0 ? "buy" : "sell",
        isDone:
          order.baseTokenFree.toNumber() === order.baseTokenTotal.toNumber() &&
          order.quoteTokenFree.toNumber() === order.quoteTokenTotal.toNumber(),
        fee:
          order.baseTokenTotal.toNumber() / 10 ** (baseToken?.decimals ?? 0) +
          order.quoteTokenTotal.toNumber() / 10 ** (quoteToken?.decimals ?? 0),
      });
    }
    setOwnerOpenOrders(data);
    calculateTotal(data);
    // console.log(data, t);
  }, [owner, connection, loading, calculateTotal]);

  useEffect(() => {
    if (owner && connection && loading) {
      getOwnerOpenOrders();
    }
  }, [getOwnerOpenOrders]);

  return { ownerOpenOrders, totalPrices, loading };
};

export default useTrade;
