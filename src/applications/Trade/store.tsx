import { create } from "zustand";
import { Market } from "@mehranml/openbook";
import { Fill } from "@/types/Fills";

import { placeOrder } from "./send";
import { TokenInfo } from "@solana/spl-token-registry";
import { MarketsListType, ownerOpenOrders } from "./types";
import MARKETS from "./markets.json";
import { TokenType } from "@/stores/tokens";
import { PublicKey } from "@solana/web3.js";

export enum TradingProviders {
  JUP = "JUP",
  OPENBOOK = "OPENBOOK",
}

type SelectedProviderState = {
  selectedProvider: TradingProviders;
  setSelectedProvider: (selectedProvider: TradingProviders) => void;
};

export type TradeState = {
  loading: boolean;
  bids: { price: number; size: number; side: "buy" | "sell" }[];
  asks: { price: number; size: number; side: "buy" | "sell" }[];
  orders: ownerOpenOrders[];
  fills: Fill[];
  tokens: { address: string; mintAddress: string; tokenBalance: number }[];
  market: Market | null;
  marketDetails: {
    tokenA: TokenInfo | null;
    tokenB: TokenInfo | null;
    tokenAPrice: number | null;
    tokenBPrice: number | null;
    name: string | null;
    address: string | null;
    tvl: number | null;
  };
  newOrder: {
    amount: number;
    limit_price: number;
    tab: string;
    userChanged: boolean;
  };
  marketList: MarketsListType;
  availableSide: Array<"buy" | "sell">;
  placeOrderLoading: boolean;
  cancelOrderLoading: boolean;
  placeOrder: typeof placeOrder;
  setPlaceOrderLoading: (placeOrderLoading: boolean) => void;
  setCancelOrderLoading: (cancelOrderLoading: boolean) => void;
  setMarket: (market: Market) => void;
  setOrders: (orders: any) => void;
  setFills: (fills: Fill[]) => void;
  setAsks: (asks: any) => void;
  setBids: (bids: any) => void;
  setTokens: (tokens: any) => void;
  setMarketDetails: (marketDetails: any) => void;
  setMarketList: (marketList: any) => void;
  setNewOrder: (newOrder: {
    amount: number;
    limit_price: number;
    tab: string;
    userChanged: boolean;
  }) => void;
};

export type JupTradeState = {
  amountIn: number;
  amountOut: number;
  limitPrice: number;
  loading: boolean;
  tokenList: TokenType[];
  tokenA: TokenInfo | null;
  tokenB: TokenInfo | null;
  openOrder: {
    id: PublicKey;
    marketName: string;
    expiredAt?: number;
    tokenA?: TokenType;
    tokenB?: TokenType;
    borrowMakingAmount: number;
    inAmountUi: number;
    outAmountUi: number;
    price: number;
  }[];
};

export const useTrade = create<TradeState>((set) => ({
  loading: true,
  bids: [],
  asks: [],
  orders: [],
  fills: [],
  tokens: [],
  market: null,
  marketDetails: {
    tokenA: null,
    tokenB: null,
    tokenAPrice: null,
    tokenBPrice: null,
    name: null,
    address: null,
    tvl: null,
  },
  newOrder: {
    amount: 0,
    limit_price: 0,
    tab: "buy",
    userChanged: false,
  },
  marketList: MARKETS,
  availableSide: ["buy", "sell"],
  placeOrderLoading: false,
  cancelOrderLoading: false,
  placeOrder: placeOrder,
  setPlaceOrderLoading: (placeOrderLoading: boolean) =>
    set({ placeOrderLoading }),
  setCancelOrderLoading: (cancelOrderLoading: boolean) =>
    set({ cancelOrderLoading }),
  setMarket: (market: Market) => set({ market }),
  setOrders: (orders: any) => set({ orders }),
  setFills: (fills: Fill[]) => set({ fills }),
  setAsks: (asks: any) => set({ asks }),
  setBids: (bids: any) => set({ bids }),
  setTokens: (tokens: any) => set({ tokens }),
  setMarketDetails: (marketDetails: any) => set({ marketDetails }),
  setMarketList: (marketList: any) => set({ marketList }),
  setNewOrder: (newOrder: any) => set({ newOrder }),
}));

export const useJupiterTrade = create<JupTradeState>((set) => ({
  amountIn: 0,
  amountOut: 0,
  limitPrice: 0,
  tokenList: [],
  tokenA: null,
  tokenB: null,
  openOrder: [],
  loading: true,
}));

export const useSelectedProvider = create<SelectedProviderState>((set) => ({
  selectedProvider: TradingProviders.JUP,
  setSelectedProvider: (selectedProvider: TradingProviders) =>
    set({ selectedProvider }),
}));
