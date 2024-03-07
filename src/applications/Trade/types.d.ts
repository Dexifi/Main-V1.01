import { TokenInfo } from "@solana/spl-token-registry";
import { Market } from "@mehranml/openbook";
import { Order } from "@openbook-dex/openbook/lib/market";

export type ownerOpenOrders = {
  fee: number;
  baseFree?: number;
  quoteFree?: number;
  mint?: TokenInfo;
  market: Market;
  baseToken?: TokenInfo;
  quoteToken?: TokenInfo;
  marketName: string;
  protocol: string;
  protocolIcon: string;
  isDone: boolean;
  openOrder: OpenOrders;
  orders: Order[];
};

export type MarketsListType = MarketType[];

export type MarketType = {
  address: string;
  name: string;
  programId: string;
  deprecated: boolean;
  tokenA: TokenInfo;
  tokenB: TokenInfo;
};

export type SelectedTokenAccounts = {
  [tokenMint: string]: string;
};

export type TokenAccount = {
  pubkey: PublicKey;
  account: AccountInfo<Buffer> | null;
  effectiveMint: PublicKey;
};
