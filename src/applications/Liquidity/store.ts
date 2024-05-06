import { create } from "zustand";
import { defaultAmmPools } from "@/applications/Liquidity/config";
import { ApiPoolInfo } from "@raydium-io/raydium-sdk";
import {
  ApiClmmPoolsItem,
  ApiPairsItem,
  ApiPrice,
} from "@raydium-io/raydium-sdk/src/baseInfo/interface";
import {
  AmmPoolApiResponse,
  infoApiResponse,
  UserAmmPositionType,
} from "@/applications/Liquidity/type";
import { ReturnTypeFetchMultiplePoolInfos } from "@raydium-io/raydium-sdk/lib/types/clmm/clmm";
import {
  ClmmPoolInfo,
  ClmmPoolPersonalPosition,
} from "@raydium-io/raydium-sdk/src/clmm/clmm";
import { TokenInfo } from "@solana/spl-token-registry";

export type LiquidityState = {
  pairsPools: ApiPairsItem[];
  ammPools: AmmPoolApiResponse["data"]["data"];
  poolApiConfig: {
    currentPage: number;
    pageSize: number;
    type: "all" | "standard" | "concentrated";
  };
  setPoolApiConfig: (config: LiquidityState["poolApiConfig"]) => void;
  userAmmDeposits: UserAmmPositionType[];
  userClmmDeposits: {
    state: ClmmPoolInfo;
    positionAccount?: ClmmPoolPersonalPosition[] | undefined;
  }[];
  tokenPrices: ApiPrice;
  raydiumInfo: infoApiResponse;
  userTokens: Partial<TokenInfo & { balance: number }>[];
};

export const useLiquidity = create<LiquidityState>((set) => ({
  ammPools: [],
  pairsPools: [],
  userClmmDeposits: [],
  raydiumInfo: {
    tvl: 0,
    totalvolume: 0,
    volume24h: 0,
  },
  tokenPrices: {},
  poolApiConfig: {
    currentPage: 0,
    pageSize: 100,
    type: "all",
  },
  userTokens: [],
  setPoolApiConfig: (config) => set({ poolApiConfig: config }),
  userAmmDeposits: [],
}));
