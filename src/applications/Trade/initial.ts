import { Wallet } from "@solana/wallet-adapter-react";
import { useTrade } from "@/applications/Trade/store";
import { Market } from "@mehranml/openbook";
import { connection } from "@/lib/get-connections";
import { PublicKey } from "@solana/web3.js";
import { findToken } from "@/lib/get-wallet";
import { getPrice } from "@/data/price";
import getTokenAccounts from "./userAccounts";

const initialTrade = async (wallet: Wallet) => {
  useTrade.setState({ fetchLoading: true });

  if (!useTrade.getState().market) {
    await getMarket(useTrade.getState().marketList[0].address.toBase58());
  }
  if (useTrade.getState().market !== null) {
    await getMarketBAF(useTrade.getState().market);
  }

  if (useTrade.getState().market) {
    await getMarketDetails(useTrade.getState().market);
  }
  if (wallet.adapter.publicKey) {
    await getTokens(wallet.adapter.publicKey.toBase58());
  }
  useTrade.setState({ fetchLoading: false });
};

export default initialTrade;

export const getMarket = async (marketID: string) => {
  console.log("load market");
  const market = await Market.load(
    connection,
    new PublicKey(marketID),
    {},
    new PublicKey("srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX")
  );
  useTrade.setState({ market });
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
  const tokenAccounts = await getTokenAccounts(publicKey, connection);
  const market = useTrade.getState().market;
  const solBalance = await connection.getBalance(new PublicKey(publicKey));
  const availableSide: ("buy" | "sell")[] = [];
  console.log("tokenAccounts", tokenAccounts);
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
};
