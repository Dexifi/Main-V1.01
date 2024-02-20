import { TokenInfo } from "@solana/spl-token-registry";

export type Token = Partial<TokenInfo, "chainId", "extensions"> & {
  amount: number;
  price: number;
};
