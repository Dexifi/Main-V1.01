import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Token } from "@/types/token";
import { TokenInfo } from "@solana/spl-token-registry";
import {
  ObligationStats,
  Position,
  ReserveDataType,
} from "@solendprotocol/solend-sdk/index";
import { ownerOpenOrders } from "@/hooks/useTrade";
import {
  ClmmPoolInfo,
  ClmmPoolPersonalPosition,
} from "@raydium-io/raydium-sdk/src/clmm/clmm";
import { Daum, UserAmmPositionType } from "@/applications/Liquidity/type";
import { ApiPrice } from "@raydium-io/raydium-sdk";
import { FarmType } from "@/applications/Dashboard/types";
import { FindNftsByOwnerOutput } from "@metaplex-foundation/js";
import { JupTradeState } from "@/applications/Trade/store";

type DashboardState = {
  netWorth: {
    totalStake: number;
    totalStakesReward: number;
    totalFarm: number;
    totalTrade: number;
    totalLend: number;
    totalClmm: number;
    totalAmm: number;
    totalNFT: number;
    total: number;
    totalWallet: number;
  };
  stakes: {
    lpToken: string;
    stakeAmount: number;
    pendingReward: number;
    lpPrice: number;
    apy: number;
    token?: TokenInfo;
  }[];
  farms: FarmType[];
  trades?: ownerOpenOrders[];
  jupTrade?: JupTradeState["openOrder"];
  liquidity: {
    amm?: Array<
      UserAmmPositionType & {
        poolDetail: any;
      }
    >;
    clmm?: {
      state: ClmmPoolInfo;
      positionAccount?: ClmmPoolPersonalPosition[] | undefined;
      poolDetail: Daum;
    }[];
  };
  lend?: {
    deposits: Position[];
    borrows: Position[];
    states: Array<ReserveDataType & { token?: TokenInfo }>;
    userObligationState: ObligationStats;
  };
  nft: FindNftsByOwnerOutput;
  domains: any;
  walletTokenAccounts: Token[];
  tokensPrice?: ApiPrice;
};

export const useDashboard = create<DashboardState>()(
  devtools((set) => ({
    domains: [],
    farms: [],
    lend: undefined,
    nft: [],
    liquidity: {},
    netWorth: {
      totalStake: 0,
      totalStakesReward: 0,
      totalFarm: 0,
      totalTrade: 0,
      totalLend: 0,
      totalClmm: 0,
      totalAmm: 0,
      totalNFT: 0,
      total: 0,
      totalWallet: 0,
    },
    stakes: [],
    tokensPrice: undefined,
    trades: undefined,
    jupTrade: undefined,
    walletBalance: 0,
    walletTokenAccounts: [],
  }))
);
