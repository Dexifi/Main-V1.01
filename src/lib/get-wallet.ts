import { TokenListProvider } from "@solana/spl-token-registry";
import axios from "axios";
import { connection } from "@/lib/get-connections";
import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

export const getPrice = async (symbol: string) => {
  let price = await axios.get(`https://price.jup.ag/v4/price?ids=${symbol}`);
  return price?.data?.data[symbol]?.price as number;
};

export const findToken = async (mintOrSymbol: string) => {
  const tokens = await new TokenListProvider().resolve();
  const tokenList = tokens.filterByChainId(101).getList();

  let tokenInfo =
    tokenList.find((t) => t.address === mintOrSymbol) ||
    tokenList.find((t) => t.symbol === mintOrSymbol);
  return tokenInfo;
};

export const getTokenBalanceFromWallet = async (owner: PublicKey) => {
  const walletTokens = await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID,
    {
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
    }
  );
  return walletTokens;
};
