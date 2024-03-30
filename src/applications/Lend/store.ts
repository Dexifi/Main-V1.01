import { create } from "zustand";
import { onBorrow, onSupply } from "./actions";
import {
  getReservesFromChain,
  SolendMarket,
  SolendObligation,
  SolendReserve,
} from "@solendprotocol/solend-sdk/index";
import { MarketDetails } from "./types";
import { devtools } from "zustand/middleware";

export type LendState = {
  loadingMarket: boolean;
  setLoadingMarket: (loading: boolean) => void;
  turboMarket: SolendMarket | null;
  setTurboMarket: (currentPool: SolendMarket) => void;
  mainMarket: SolendMarket | null;
  mainMarketDetails: MarketDetails | null;
  setMainMarketDetails: (details: MarketDetails) => void;
  turboMarketDetails: MarketDetails | null;
  setTurboMarketDetails: (details: MarketDetails) => void;
  setMainMarket: (currentPool: SolendMarket) => void;
  poolList: Array<{
    reserve?: Awaited<ReturnType<typeof getReservesFromChain>>[0];
    marketReserve?: SolendReserve;
  }>;
  setPoolList: (
    poolList: Array<{
      reserve?: Awaited<ReturnType<typeof getReservesFromChain>>[0];
      marketReserve?: SolendReserve;
    }>
  ) => void;
  mainObligations: SolendObligation | null;
  setMainObligations: (obligations: SolendObligation) => void;
  turboObligations: SolendObligation | null;
  setTurboObligations: (obligations: SolendObligation) => void;
  onBorrow: () => void;
  onSupply: typeof onSupply;
};

export const useLend = create<LendState>()(
  devtools((set) => ({
    loadingMarket: true,
    setLoadingMarket: (loading) => set({ loadingMarket: loading }),
    turboMarket: null,
    setTurboMarket: (currentPool) => set({ turboMarket: currentPool }),
    mainMarket: null,
    setMainMarket: (currentPool) => set({ mainMarket: currentPool }),
    mainMarketDetails: null,
    setMainMarketDetails: (details) => set({ mainMarketDetails: details }),
    turboMarketDetails: null,
    setTurboMarketDetails: (details) => set({ turboMarketDetails: details }),
    poolList: [],
    setPoolList: (poolList) => set({ poolList }),
    mainObligations: null,
    setMainObligations: (obligations) => set({ mainObligations: obligations }),
    turboObligations: null,
    setTurboObligations: (obligations) =>
      set({ turboObligations: obligations }),
    onBorrow: onBorrow,
    onSupply: onSupply,
  }))
);
