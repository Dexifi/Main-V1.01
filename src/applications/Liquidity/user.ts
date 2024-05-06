import { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { findToken } from "@/lib/get-wallet";
import { useLiquidity } from "./store";

export const userWalletBalance = async (
  connection: Connection,
  wallet: PublicKey | null
) => {
  if (wallet) {
    const solBalance = await connection.getBalance(wallet);
    const accounts = await connection
      .getParsedTokenAccountsByOwner(wallet, {
        programId: TOKEN_PROGRAM_ID,
      })
      .then((res) => res.value.map((x) => x.account.data.parsed.info));
    let tokenBalances = [];
    const sol = await findToken("SOL");
    tokenBalances.push({
      ...sol,
      balance: solBalance / 10 ** (sol?.decimals ?? 0),
    });
    for (const account of accounts) {
      if (account.tokenAmount.uiAmount > 0) {
        const token = await findToken(account.mint);
        tokenBalances.push({
          ...token,
          balance: account.tokenAmount.uiAmount,
        });
      }
    }
    useLiquidity.setState({ userTokens: tokenBalances });
  }
};
