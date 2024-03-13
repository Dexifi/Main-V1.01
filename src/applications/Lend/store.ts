import { create } from "zustand";
import onBorrow from "./borrow";
import onSupply from "./supply";
import { SolendMarket } from "@solendprotocol/solend-sdk/index";
import { MarketDetails } from "./types";
import { devtools } from "zustand/middleware";

type LendState = {
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
  poolList: any[];
  setPoolList: (poolList: any[]) => void;
  userBorrow: any[];
  setUserBorrow: (userBorrow: any[]) => void;
  userSupply: any[];
  setUserSupply: (userSupply: any[]) => void;
  onBorrow: () => void;
  onSupply: () => void;
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
    userBorrow: [],
    setUserBorrow: (userBorrow) => set({ userBorrow }),
    userSupply: [],
    setUserSupply: (userSupply) => set({ userSupply }),
    onBorrow: onBorrow,
    onSupply: onSupply,
  }))
);
