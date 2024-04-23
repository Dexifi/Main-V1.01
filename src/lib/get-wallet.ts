import { TokenInfo, TokenListProvider } from "@solana/spl-token-registry";
import { connection } from "@/lib/get-connections";
import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import axios from "@/data/axios";

export const findToken = async (mintOrSymbol: string) => {
  const tokens = await axios
    .get<TokenInfo[]>("https://token.jup.ag/all")
    .then((res) => res.data);

  let tokenInfo =
    tokens.find((t) => t.address === mintOrSymbol) ||
    tokens.find((t) => t.symbol === mintOrSymbol);
  return tokenInfo;
};

export const getTokenBalanceFromWallet = async (owner: PublicKey) => {
  return await connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {
    filters: [
      {
        dataSize: 165, // number of bytes
      },
      {
        memcmp: {
          offset: 32, // number of bytes
          bytes: owner.toString(),
        },
      },
    ],
  });
};
