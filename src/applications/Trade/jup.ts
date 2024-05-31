import { connection } from "@/lib/get-connections";
import { LimitOrderProvider } from "@jup-ag/limit-order-sdk";
import { WalletAdapter } from "@solana/wallet-adapter-base";
import BN from "bn.js";
import { PublicKey } from "@solana/web3.js";

const limitOrder = new LimitOrderProvider(connection);

type Params = {
  inAmount: number;
  outAmount: number;
  inputMint: string;
  outputMint: string;
  expiredAt: number;
  base: string;
};
export const createJupLimitOrder = async (
  wallet: WalletAdapter,
  { base, expiredAt, inAmount, outAmount, outputMint, inputMint }: Params
) => {
  if (!wallet.publicKey) {
    return;
  }
  const { tx, orderPubKey } = await limitOrder.createOrder({
    owner: wallet.publicKey,
    inAmount: new BN(inAmount),
    outAmount: new BN(outAmount),
    inputMint: new PublicKey(inputMint),
    outputMint: new PublicKey(outputMint),
    expiredAt: new BN(expiredAt), // new BN(new Date().valueOf() / 1000)
    base: new PublicKey(base),
  });

  await wallet.sendTransaction(tx, connection);
};
