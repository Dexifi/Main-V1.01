import BN from "bn.js";

export interface Fill {
  eventFlags: EventFlags;
  openOrdersSlot: number;
  feeTier: number;
  nativeQuantityReleased: BN;
  nativeQuantityPaid: BN;
  nativeFeeOrRebate: BN;
  orderId: OrderId;
  openOrders: string;
  clientOrderId: BN;
  side: "buy" | "sell";
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
