import {
  Connection,
  SendOptions,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  buildSimpleTransaction,
  Clmm,
  ClmmPoolInfo,
  ClmmPoolPersonalPosition,
  fetchMultipleMintInfos,
  InnerSimpleV0Transaction,
  ZERO,
} from "@raydium-io/raydium-sdk";
import { connection } from "@/lib/get-connections";
import BN from "bn.js";
import { addLookupTableInfo, makeTxVersion, SOL_MINT } from "./config";
import { getWalletTokenAccount } from "@/hooks/useLiquidity";
import { BaseSignerWalletAdapter } from "@solana/wallet-adapter-base";
import { toast } from "@/components/ui/use-toast";
import { ReturnTypeFetchMultiplePoolInfos } from "@raydium-io/raydium-sdk/lib/types/clmm/clmm";

type WalletTokenAccounts = Awaited<ReturnType<typeof getWalletTokenAccount>>;

type AddLiquidityProps = {
  poolInfo: ClmmPoolInfo;
  inputTokenAmount: BN;
  inputTokenMint: "mintA" | "mintB";
  walletTokenAccounts: WalletTokenAccounts;
  wallet: BaseSignerWalletAdapter;
  position: ClmmPoolPersonalPosition;
};
type HarvestLiquidityProps = {
  fetchPoolInfos: ReturnTypeFetchMultiplePoolInfos;
  wallet: BaseSignerWalletAdapter;
  position: ClmmPoolPersonalPosition;
};
const addClmmLiquidity = async ({
  poolInfo,
  position,
  inputTokenAmount,
  inputTokenMint,
  wallet,
  walletTokenAccounts,
}: AddLiquidityProps) => {
  if (!wallet.publicKey) return;

  // -------- step 1: calculate liquidity --------
  const { liquidity, amountSlippageA, amountSlippageB } =
    await calculateAmounts(
      poolInfo,
      position,
      inputTokenAmount,
      inputTokenMint,
      0.001
    );

  // -------- step 3: create instructions by SDK function --------
  const { innerTransactions } =
    await Clmm.makeIncreasePositionFromLiquidityInstructionSimple({
      connection,
      poolInfo,
      ownerPosition: position,
      checkCreateATAOwner: true,
      ownerInfo: {
        wallet: wallet.publicKey,
        tokenAccounts: walletTokenAccounts,
        feePayer: wallet.publicKey,
        useSOLBalance:
          poolInfo.mintA.mint.equals(SOL_MINT) ||
          poolInfo.mintB.mint.equals(SOL_MINT),
      },
      liquidity,
      makeTxVersion: makeTxVersion,
      amountMaxA: amountSlippageA.amount,
      amountMaxB: amountSlippageB.amount,
    });
  try {
    buildAndSendTx(innerTransactions, wallet);
  } catch (e: any) {
    console.log(e);
    toast({
      title: "Error",
      description: e.message,
      variant: "destructive",
    });
  }
};

const calculateAmounts = async (
  poolInfo: ClmmPoolInfo,
  position: ClmmPoolPersonalPosition,
  inputTokenAmount: BN,
  inputTokenMint: "mintA" | "mintB",
  slippage: number
) =>
  Clmm.getLiquidityAmountOutFromAmountIn({
    poolInfo: poolInfo,
    slippage,
    inputA: inputTokenMint === "mintA",
    tickUpper: position.tickUpper,
    tickLower: position.tickLower,
    amount: inputTokenAmount,
    add: true, // SDK flag for math round direction
    amountHasFee: true,
    token2022Infos: await fetchMultipleMintInfos({
      connection,
      mints: [poolInfo.mintA.mint, poolInfo.mintB.mint],
    }),
    epochInfo: await connection.getEpochInfo(),
  });

const harvestClmmPosition = async ({
  fetchPoolInfos,
  wallet,
}: HarvestLiquidityProps) => {
  if (!wallet.publicKey) return;
  const walletTokenAccounts = await getWalletTokenAccount(
    connection,
    wallet.publicKey
  );
  const { innerTransactions } =
    await Clmm.makeHarvestAllRewardInstructionSimple({
      connection,
      fetchPoolInfos,
      checkCreateATAOwner: true,
      ownerInfo: {
        wallet: wallet.publicKey,
        tokenAccounts: walletTokenAccounts,
        feePayer: wallet.publicKey,
      },
      makeTxVersion: makeTxVersion,
    });

  try {
    const tx = await buildAndSendTx(innerTransactions, wallet);
    return tx;
  } catch (e: any) {
    console.log(e);
    toast({
      title: "Error",
      description: e.message,
      variant: "destructive",
    });
  }
};

const removeClmmPosition = async ({
  poolInfo,
  position,
  inputTokenAmount,
  inputTokenMint,
  wallet,
  walletTokenAccounts,
}: AddLiquidityProps) => {
  if (!wallet.publicKey) return;

  // -------- step 1: calculate liquidity --------
  const { liquidity } = await calculateAmounts(
    poolInfo,
    position,
    inputTokenAmount,
    inputTokenMint,
    0
  );

  // -------- step 3: create instructions by SDK function --------
  const { innerTransactions } =
    await Clmm.makeDecreaseLiquidityInstructionSimple({
      connection,
      poolInfo,
      ownerPosition: position,
      checkCreateATAOwner: true,
      ownerInfo: {
        wallet: wallet.publicKey,
        tokenAccounts: walletTokenAccounts,
        feePayer: wallet.publicKey,
        useSOLBalance:
          poolInfo.mintA.mint.equals(SOL_MINT) ||
          poolInfo.mintB.mint.equals(SOL_MINT),
      },
      liquidity,
      makeTxVersion: makeTxVersion,
      amountMinA: ZERO,
      amountMinB: ZERO,
    });
  try {
    buildAndSendTx(innerTransactions, wallet);
  } catch (e: any) {
    console.log(e);
    toast({
      title: "Error",
      description: e.message,
      variant: "destructive",
    });
  }
};

export const raydiumActions = {
  addClmmLiquidity,
  calculateAmounts,
  harvestClmmPosition,
  removeClmmPosition,
};

export async function buildAndSendTx(
  innerSimpleV0Transaction: InnerSimpleV0Transaction[],
  wallet: BaseSignerWalletAdapter,
  options?: SendOptions
) {
  if (!wallet.publicKey) return;

  const willSendTx = await buildSimpleTransaction({
    connection,
    makeTxVersion,
    payer: wallet.publicKey,

    innerTransactions: innerSimpleV0Transaction,
    addLookupTableInfo: addLookupTableInfo,
  });

  return sendTx(connection, wallet, willSendTx, options);
}

export async function sendTx(
  connection: Connection,
  wallet: BaseSignerWalletAdapter,
  txs: (VersionedTransaction | Transaction)[],
  options?: SendOptions
) {
  try {
    const txids: string[] = [];
    const signed = await wallet.signAllTransactions(txs);
    for (const iTx of signed) {
      if (iTx instanceof VersionedTransaction) {
        txids.push(await wallet.sendTransaction(iTx, connection, options));
      } else {
        txids.push(await wallet.sendTransaction(iTx, connection));
      }
    }
    return txids;
  } catch (e: any) {
    console.log(e);
    toast({
      title: "Error",
      description: e.message,
      variant: "destructive",
    });
  }
}
