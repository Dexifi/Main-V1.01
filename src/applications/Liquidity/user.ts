import { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { findToken } from "@/lib/get-wallet";
import { useLiquidity } from "./store";
import { SPL_ACCOUNT_LAYOUT, TokenAccount } from "@raydium-io/raydium-sdk";

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

export async function getWalletTokenAccount(
  connection: Connection,
  wallet: PublicKey
): Promise<TokenAccount[]> {
  const walletTokenAccount = await connection?.getTokenAccountsByOwner(wallet, {
    programId: TOKEN_PROGRAM_ID,
  });
  return walletTokenAccount.value.map((i) => ({
    pubkey: i.pubkey,
    programId: i.account.owner,
    accountInfo: SPL_ACCOUNT_LAYOUT.decode(i.account.data),
  }));
}
