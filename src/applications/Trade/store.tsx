import { create } from "zustand";
import { Market } from "@mehranml/openbook";
import { Fill } from "@/types/Fills";
import { MARKETS } from "@openbook-dex/openbook";
import { placeOrder } from "@/applications/Trade/send";
import { Orderbook } from "@mehranml/openbook/lib/market";
import BN from "bn.js";
import { TokenInfo } from "@solana/spl-token-registry";

export type TradeState = {
  bids: { price: number; size: number; side: "buy" | "sell" }[];
  asks: { price: number; size: number; side: "buy" | "sell" }[];
  orders: any[];
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
  marketList: typeof MARKETS;
  availableSide: Array<"buy" | "sell">;

  fetchLoading: boolean;
  placeOrderLoading: boolean;
  cancelOrderLoading: boolean;

  placeOrder: typeof placeOrder;

  setFetchLoading: (fetchLoading: boolean) => void;
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

export const useTrade = create<TradeState>((set) => ({
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

  fetchLoading: true,
  placeOrderLoading: false,
  cancelOrderLoading: false,

  placeOrder: placeOrder,

  setFetchLoading: (fetchLoading: boolean) => set({ fetchLoading }),
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
