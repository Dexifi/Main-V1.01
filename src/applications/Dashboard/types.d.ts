import { ReserveDataType } from "@solendprotocol/solend-sdk/index";
import { TokenInfo } from "@solana/spl-token-registry";
import { Market, OpenOrders } from "@openbook-dex/openbook";
import { Order } from "@openbook-dex/openbook/lib/market";

export type stateType = ReserveDataType & { token?: TokenInfo };

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

export type FarmType = {
  poolName: string;
  poolIcon: string[];
  protocol: string;
  protocolIcon: string;
  lpAmount: number;
  value: number;
  apr: number;
  rewardAmount: number;
  rewards: {
    currency: string;
    icon: string;
  }[];
  pendingReward: number;
};
