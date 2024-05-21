export type infoApiResponse = {
  tvl: number;
  volume24h: number;
  totalvolume: number;
};

export type UserAmmPositionType = {
  lpMint?: LpMint;
  mintA?: MintA;
  mintB?: MintB;
  mintAPrice?: number;
  mintBPrice?: number;
  amount: number;
  ammId: string;
};

export interface AmmPoolApiResponse {
  id: string;
  success: boolean;
  data: Data;
}

export interface Data {
  count: number;
  data: Daum[];
  hasNextPage: boolean;
}

export interface Daum {
  type: string;
  programId: string;
  id: string;
  mintA: MintA;
  mintB: MintB;
  rewardDefaultPoolInfos: string;
  rewardDefaultInfos: RewardDefaultInfo[];
  price: number;
  mintAmountA: number;
  mintAmountB: number;
  tvl: number;
  openTime: number;
  feeRate: number;
  config?: Config;
  day: Day;
  week: Week;
  month: Month;
  pooltype: string[];
  farmUpcomingCount: number;
  farmOngoingCount: number;
  farmFinishedCount: number;
  lpMint?: LpMint;
  marketId?: string;
  lpPrice?: number;
  lpAmount?: number;
}

export interface MintA {
  chainId: number;
  address: string;
  programId: string;
  logoURI: string;
  symbol: string;
  name: string;
  decimals: number;
  tags: string[];
  extensions: Extensions;
}

export interface Extensions {
  coingeckoId?: string;
}

export interface MintB {
  chainId: number;
  address: string;
  programId: string;
  logoURI: string;
  symbol: string;
  name: string;
  decimals: number;
  tags: string[];
  extensions: Extensions2;
}

export interface Extensions2 {
  coingeckoId?: string;
  feeConfig?: FeeConfig;
}

export interface FeeConfig {
  transferFeeConfigAuthority: string;
  withdrawWithheldAuthority: string;
  withheldAmount: string;
  olderTransferFee: OlderTransferFee;
  newerTransferFee: NewerTransferFee;
}

export interface OlderTransferFee {
  epoch: string;
  maximumFee: string;
  transferFeeBasisPoints: number;
}

export interface NewerTransferFee {
  epoch: string;
  maximumFee: string;
  transferFeeBasisPoints: number;
}

export interface RewardDefaultInfo {
  mint: Mint;
  perSecond: number;
  startTime?: number;
  endTime?: number;
}

export interface Mint {
  chainId: number;
  address: string;
  programId: string;
  logoURI: string;
  symbol: string;
  name: string;
  decimals: number;
  tags: string[];
  extensions: Extensions3;
}

export interface Extensions3 {
  coingeckoId?: string;
}

export interface Config {
  id: string;
  index: number;
  protocolFeeRate: number;
  tradeFeeRate: number;
  tickSpacing: number;
  fundFeeRate: number;
  description: string;
  defaultRange: number;
  defaultRangePoint: number[];
}

export interface Day {
  volume: number;
  volumeQuote: number;
  volumeFee: number;
  apr: number;
  feeApr: number;
  priceMin: number;
  priceMax: number;
  rewardApr: number[];
}

export interface Week {
  volume: number;
  volumeQuote: number;
  volumeFee: number;
  apr: number;
  feeApr: number;
  priceMin: number;
  priceMax: number;
  rewardApr: number[];
}

export interface Month {
  volume: number;
  volumeQuote: number;
  volumeFee: number;
  apr: number;
  feeApr: number;
  priceMin: number;
  priceMax: number;
  rewardApr: number[];
}

export interface LpMint {
  chainId: number;
  address: string;
  programId: string;
  logoURI: string;
  symbol: string;
  name: string;
  decimals: number;
  tags: any[];
  extensions: Extensions4;
}

export interface Extensions4 {}

export type ChartPoint = {
  x: number;
  y: number;
};
