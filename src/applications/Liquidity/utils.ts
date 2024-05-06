import {
  buildSimpleTransaction,
  findProgramAddress,
  InnerSimpleV0Transaction,
  SPL_ACCOUNT_LAYOUT,
  TOKEN_PROGRAM_ID,
  TokenAccount,
} from "@raydium-io/raydium-sdk";
import {
  Connection,
  PublicKey,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  addLookupTableInfo,
  makeTxVersion,
} from "@/applications/Liquidity/config";
import { BaseSignerWalletAdapter } from "@solana/wallet-adapter-base";

export async function sendTx(
  connection: Connection,
  wallet: BaseSignerWalletAdapter,
  txs: (VersionedTransaction | Transaction)[]
): Promise<string[]> {
  const txids: string[] = [];
  for (const iTx of txs) {
    if (iTx instanceof VersionedTransaction) {
      await wallet.signTransaction(iTx);
      txids.push(await wallet.sendTransaction(iTx, connection));
    } else {
      txids.push(await wallet.sendTransaction(iTx, connection));
    }
  }
  return txids;
}

export async function getWalletTokenAccount(
  connection: Connection,
  wallet: PublicKey
): Promise<TokenAccount[]> {
  const walletTokenAccount = await connection.getTokenAccountsByOwner(wallet, {
    programId: TOKEN_PROGRAM_ID,
  });
  return walletTokenAccount.value.map((i) => ({
    pubkey: i.pubkey,
    programId: i.account.owner,
    accountInfo: SPL_ACCOUNT_LAYOUT.decode(i.account.data),
  }));
}

export async function buildAndSendTx(
  innerSimpleV0Transaction: InnerSimpleV0Transaction[],
  connection: Connection,
  wallet: BaseSignerWalletAdapter
) {
  if (!wallet.publicKey) return;
  const willSendTx = await buildSimpleTransaction({
    connection,
    makeTxVersion: makeTxVersion,
    payer: wallet.publicKey,
    innerTransactions: innerSimpleV0Transaction,
    addLookupTableInfo: addLookupTableInfo,
  });

  return willSendTx;
}

export function getATAAddress(
  programId: PublicKey,
  owner: PublicKey,
  mint: PublicKey
) {
  const { publicKey, nonce } = findProgramAddress(
    [owner.toBuffer(), programId.toBuffer(), mint.toBuffer()],
    new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL")
  );
  return { publicKey, nonce };
}

export async function sleepTime(ms: number) {
  console.log(new Date().toLocaleString(), "sleepTime", ms);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
