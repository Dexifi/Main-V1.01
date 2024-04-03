import BigNumber from "bignumber.js";

export type MarketDetails = {
  owner: string;
  totalSupply: string;
  totalBorrow: string;
  tvl: string;
  totalSupplyBN: BigNumber;
  totalBorrowBN: BigNumber;
  maxOutflow: number;
};
