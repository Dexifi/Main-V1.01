import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const tokenAtom = atom<TokenType[]>([]);

export interface TokenType {
  address: string;
  chainId: number;
  decimals: number;
  name: string;
  symbol: string;
  logoURI: string;
  tags: string[];
  extensions: Extensions;
  price: number;
}

export interface Extensions {
  coingeckoId: string;
}
