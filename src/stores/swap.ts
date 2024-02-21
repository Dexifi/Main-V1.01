import { atom } from "jotai";
import { TokenType } from "./tokens";
import { QuoteResponse } from "@jup-ag/api";

type SwapModal = {
  open: boolean;
  type?: "first" | "second";
};

type Swap = {
  firstToken?: Partial<TokenType>;
  secondToken?: Partial<TokenType>;
  firstAmount: number;
  secondAmount: number;
  firstUserBalance: number;
  secondUserBalance: number;
  quoteResponse?: QuoteResponse;
};

export const swapModalAtom = atom<SwapModal>({
  open: false,
});

export const swapAtom = atom<Swap>({
  firstToken: undefined,
  secondToken: undefined,
  firstAmount: 0,
  secondAmount: 0,
  firstUserBalance: 0,
  secondUserBalance: 0,
});
