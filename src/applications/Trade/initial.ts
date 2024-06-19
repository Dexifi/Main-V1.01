import { Wallet } from "@solana/wallet-adapter-react";
import { useTrade } from "./store";
import { Market, OpenOrders } from "@mehranml/openbook";
import { connection } from "@/lib/get-connections";
import { PublicKey } from "@solana/web3.js";
import { findToken } from "@/lib/get-wallet";
import { getPrice } from "@/data/price";
import getTokenAccounts from "./userAccounts";
import { ownerOpenOrders } from "./types";
import { OPENBOOK_PROGRAM_ID } from "./config";
import { fetchTokenList, getOpenOrder } from "@/applications/Trade/jup";

export const initialTrade = async (wallet: Wallet) => {
  try {
    if (!useTrade.getState().market) {
      await getMarket(useTrade.getState().marketList[0].address);
    }
    await getMarketBAF(useTrade.getState().market);
    await getMarketDetails(useTrade.getState().market);
    if (wallet.adapter.publicKey) {
      await getTokens(wallet.adapter.publicKey.toBase58());
    }
    if (wallet.adapter.publicKey) {
      await getWalletOrders(wallet.adapter.publicKey);
    }
  } catch (e) {
    console.log("initial failed", e);
  }
  useTrade.setState({ loading: false });
};

export const initialJupiterTrade = async (wallet: Wallet | null) => {
  await fetchTokenList();
  if (wallet && wallet.adapter.publicKey) {
    await getTokens(wallet.adapter.publicKey.toBase58());
    setInterval(async () => await getOpenOrder(wallet.adapter.publicKey), 5000);
  }
};

export const getMarket = async (marketID: string) => {
  try {
    const market = await Market.load(
      connection,
      new PublicKey(marketID),
      {},
      new PublicKey("srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX")
    );
    useTrade.setState({ market });
    return market;
  } catch (e) {
    console.log(e);
  }
};

export const getMarketBAF = async (market: Market | null) => {
  if (!market) return;
  try {
    const bids = await market
      .loadBids(connection)
      .then((res) => res.getL2(12))
      .then((res) =>
        res.map((bid) => ({
          price: bid[0],
          size: bid[1],
          side: "buy" as "buy",
        }))
      );
    const asks = await market
      .loadAsks(connection)
      .then((res) => res.getL2(12))
      .then((res) =>
        res.map((ask) => ({
          price: ask[0],
          size: ask[1],
          side: "sell" as "sell",
        }))
      );
    const fills = await market.loadFills(connection);
    useTrade.setState({ bids, asks, fills });
  } catch (e) {
    console.log(e);
  }
};

export const getMarketDetails = async (market: Market | null) => {
  if (!market) return;
  try {
    const tokenA = await findToken(market.baseMintAddress.toBase58());
    const tokenB = await findToken(market.quoteMintAddress.toBase58());
    const tokenAPrice =
      useTrade.getState().fills[0]?.price ??
      (await getPrice(tokenA?.symbol ?? ""));
    const tokenBPrice = await getPrice(tokenB?.symbol ?? "");
    useTrade.setState({
      newOrder: {
        limit_price: tokenAPrice,
        tab: "buy",
        amount: 0,
        userChanged: false,
      },
    });
    useTrade.setState({
      marketDetails: {
        tokenA: tokenA ?? null,
        tokenB: tokenB ?? null,
        tokenAPrice: tokenAPrice ?? 0,
        tokenBPrice: tokenBPrice ?? 0,
        name: `${tokenA?.symbol}-${tokenB?.symbol}`,
        address: market.address.toBase58(),
        tvl:
          (market.decoded.baseDepositsTotal.toNumber() /
            10 ** (tokenA?.decimals ?? 0)) *
            tokenAPrice +
          (market.decoded.quoteDepositsTotal.toNumber() /
            10 ** (tokenB?.decimals ?? 0)) *
            tokenBPrice,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const getTokens = async (publicKey: string) => {
  try {
    const tokenAccounts = await getTokenAccounts(publicKey, connection);
    const market = useTrade.getState().market;
    const solBalance = await connection.getBalance(new PublicKey(publicKey));
    const availableSide: ("buy" | "sell")[] = [];
    tokenAccounts.push({
      tokenBalance: solBalance / 10 ** 9,
      mintAddress: "So11111111111111111111111111111111111111112",
      address: publicKey,
    });
    if (market) {
      if (
        tokenAccounts.find(
          (token) => token.mintAddress === market.baseMintAddress.toBase58()
        )
      ) {
        availableSide.push("buy");
      }
      if (
        tokenAccounts.find(
          (token) => token.mintAddress === market.quoteMintAddress.toBase58()
        )
      ) {
        availableSide.push("sell");
      }
    }

    useTrade.setState({ availableSide });
    useTrade.setState({ tokens: tokenAccounts });
  } catch (e) {
    console.log(e);
  }
};

export const getWalletOrders = async (
  publicKey: PublicKey | null | undefined
) => {
  if (publicKey) {
    try {
      const orders = await OpenOrders.findForOwner(
        connection,
        publicKey,
        OPENBOOK_PROGRAM_ID
      );
      const data: ownerOpenOrders[] = [];
      for (const order of orders) {
        const market = await Market.load(
          connection,
          order.market,
          {},
          OPENBOOK_PROGRAM_ID
        );
        const orders = await market.loadOrdersForOwner(
          connection,
          publicKey,
          30000
        );

        const baseToken = await findToken(market.decoded.baseMint.toString());
        const quoteToken = await findToken(market.decoded.quoteMint.toString());
        const marketName = `${baseToken?.symbol}-${quoteToken?.symbol}`;

        const haveExtraSettleable =
          (order.baseTokenFree.toNumber() > 0 ||
            order.quoteTokenFree.toNumber() > 0) &&
          orders.length > 0;

        data.push({
          protocol: "OpenBook",
          protocolIcon: "/assets/openBook.svg",
          mint: baseToken,
          market,
          marketName,
          baseToken,
          quoteToken,
          openOrder: order,
          orders: orders,
          baseFree:
            order.baseTokenFree.toNumber() / 10 ** (baseToken?.decimals ?? 0),
          quoteFree:
            order.quoteTokenFree.toNumber() / 10 ** (quoteToken?.decimals ?? 0),
          isDone:
            order.baseTokenFree.toNumber() ===
              order.baseTokenTotal.toNumber() &&
            order.quoteTokenFree.toNumber() ===
              order.quoteTokenTotal.toNumber(),
          fee:
            order.baseTokenTotal.toNumber() / 10 ** (baseToken?.decimals ?? 0) +
            order.quoteTokenTotal.toNumber() /
              10 ** (quoteToken?.decimals ?? 0),
        });
      }
      useTrade.setState({ orders: data });
    } catch (e) {
      console.log("Order fetch failed", e);
    }
  }
};
