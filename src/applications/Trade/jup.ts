import { connection } from "@/lib/get-connections";
import { LimitOrderProvider } from "@jup-ag/limit-order-sdk";
import { WalletAdapter } from "@solana/wallet-adapter-base";
import BN from "bn.js";
import { Keypair, PublicKey } from "@solana/web3.js";

const limitOrder = new LimitOrderProvider(connection);

type Params = {
  inAmount: number;
  outAmount: number;
  inputMint: string;
  outputMint: string;
  expiredAt?: number;
};
export const createJupLimitOrder = async (
  wallet: WalletAdapter,
  { expiredAt, inAmount, outAmount, outputMint, inputMint }: Params
) => {
  if (!wallet.publicKey) {
    return;
  }
  const base = Keypair.generate();

  const { tx, orderPubKey } = await limitOrder.createOrder({
    owner: wallet.publicKey,
    inAmount: new BN(inAmount),
    outAmount: new BN(outAmount),
    inputMint: new PublicKey(inputMint),
    outputMint: new PublicKey(outputMint),
    expiredAt: expiredAt ? new BN(expiredAt) : null, // new BN(new Date().valueOf() / 1000)
    base: base.publicKey,
  });

  await wallet.sendTransaction(tx, connection);
};
