import { useCallback, useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { Market, OpenOrders } from "@openbook-dex/openbook";
import { TokenInfo } from "@solana/spl-token-registry";
import { findToken } from "@/lib/get-wallet";
import { getPrice } from "@/data/price";
import { Order } from "@openbook-dex/openbook/lib/market";

export type ownerOpenOrders = {
  fee: number;
  mint?: TokenInfo;
  market: Market;
  baseToken?: TokenInfo;
  quoteToken?: TokenInfo;
  protocol: string;
  protocolIcon: string;
  isDone: boolean;
  openOrder: OpenOrders;
  orders: Order[];
};
// openbook-dex program address
const ProgramID = new PublicKey("srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX");

const useTrade = (connection: Connection, owner: PublicKey | null) => {
  const [ownerOpenOrders, setOwnerOpenOrders] = useState<ownerOpenOrders[]>([]);
  const [totalPrices, setTotalPrices] = useState(0);
  const [loading, setLoading] = useState(true);

  const calculateTotal = useCallback(async (data: ownerOpenOrders[]) => {
    let t = 0;
    for (const openOrder of data) {
      const basePrice = await getPrice(openOrder.baseToken?.symbol ?? "");
      const quotePrice = await getPrice(openOrder.quoteToken?.symbol ?? "");
      t =
        t +
        ((openOrder.openOrder.quoteTokenTotal.toNumber() /
          10 ** (openOrder.quoteToken?.decimals ?? 0)) *
          quotePrice +
          (openOrder.openOrder.baseTokenTotal.toNumber() /
            10 ** (openOrder.baseToken?.decimals ?? 0)) *
            basePrice);
    }
    setTotalPrices(t);
  }, []);

  const getOwnerOpenOrders = useCallback(async () => {
    setLoading(false);
    if (!owner || !connection || !loading) return;

    const orders = await OpenOrders.findForOwner(connection, owner, ProgramID);
    const data: ownerOpenOrders[] = [];
    for (const order of orders) {
      const market = await Market.load(connection, order.market, {}, ProgramID);
      const orders = await market.loadOrdersForOwner(connection, owner, 30000);

      const baseToken = await findToken(market.decoded.baseMint.toString());
      const quoteToken = await findToken(market.decoded.quoteMint.toString());
      data.push({
        protocol: "OpenBook",
        protocolIcon: "/assets/openBook.svg",
        mint: baseToken,
        market,
        baseToken,
        quoteToken,
        openOrder: order,
        orders: orders,
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
  }, [owner, connection, loading, calculateTotal]);

  useEffect(() => {
    if (owner && connection && loading) {
      getOwnerOpenOrders();
    }
  }, [getOwnerOpenOrders]);

  return { ownerOpenOrders, totalPrices, loading };
};

export default useTrade;
