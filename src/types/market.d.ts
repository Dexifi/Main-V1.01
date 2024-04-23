import { MARKETS } from "@openbook-dex/openbook";
import { TokenInfo } from "@solana/spl-token-registry";
import BN from "bn.js";
import { AccountFlags } from "../../app/trade/(components)/trade-chart";

export type SelectedMarketType = (typeof MARKETS)[0] & {
  tokenA?: TokenInfo;
  tokenB?: TokenInfo;
};

export type DecodedMarketType = {
  accountFlags: AccountFlags;
  ownAddress: string;
  vaultSignerNonce: BN;
  baseMint: string;
  quoteMint: string;
  baseVault: string;
  baseDepositsTotal: BN;
  baseFeesAccrued: BN;
  quoteVault: string;
  quoteDepositsTotal: BN;
  quoteFeesAccrued: BN;
  quoteDustThreshold: BN;
  requestQueue: string;
  eventQueue: string;
  bids: string;
  asks: string;
  baseLotSize: BN;
  quoteLotSize: BN;
  feeRateBps: BN;
  referrerRebatesAccrued: BN;
};

export interface FillType {
  eventFlags: EventFlags;
  openOrdersSlot: number;
  feeTier: number;
  nativeQuantityReleased: BN;
  nativeQuantityPaid: BN;
  nativeFeeOrRebate: BN;
  orderId: BN;
  openOrders: string;
  clientOrderId: BN;
  side: string;
  price: number;
  feeCost: number;
  size: number;
}

export interface EventFlags {
  fill: boolean;
  out: boolean;
  bid: boolean;
  maker: boolean;
}
