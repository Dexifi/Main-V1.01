import { LimitOrderProvider, ownerFilter } from "@jup-ag/limit-order-sdk";

import { Adapter, BaseSignerWalletAdapter } from "@solana/wallet-adapter-base";
import BN from "bn.js";
import { Keypair, PublicKey, VersionedTransaction } from "@solana/web3.js";
import { toast } from "@/components/ui/use-toast";
import { connection } from "@/lib/get-connections";
import { JupTradeState, useJupiterTrade } from "@/applications/Trade/store";
import { TokenType } from "@/stores/tokens";
import { TOKEN_LIST_URL } from "@jup-ag/core";

import axios from "@/data/axios";

const limitOrder = new LimitOrderProvider(connection);

type Params = {
  inAmount: number;
  outAmount: number;
  inputMint: string;
  outputMint: string;
  expiredAt?: number;
};

export const fetchTokenList = async () => {
  console.log("in fetch");
  const tokenList: TokenType[] = await (
    await fetch(TOKEN_LIST_URL["mainnet-beta"])
  ).json();
  const tokenA = tokenList.find((token) => token.symbol === "USDC");
  const tokenB = tokenList.find((token) => token.symbol === "SOL");
  console.log("here in fetchTokenList", tokenList, tokenA, tokenB);
  useJupiterTrade.setState({ tokenList, tokenA, tokenB, loading: false });
};

export const createJupLimitOrder = async (
  wallet: BaseSignerWalletAdapter,
  { expiredAt, inAmount, outAmount, outputMint, inputMint }: Params
) => {
  if (!wallet.publicKey) {
    return;
  }
  try {
    // Base key are used to generate a unique order id
    const base = Keypair.generate();

    // get serialized transactions
    const transactions = await (
      await fetch("https://jup.ag/api/limit/v1/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: wallet.publicKey.toString(),
          inAmount: new BN(inAmount.toFixed(0)).toNumber(),
          outAmount: new BN(outAmount.toFixed(0)).toNumber(),
          inputMint: inputMint.toString(),
          outputMint: outputMint.toString(),
          expiredAt: null,
          base: base.publicKey.toString(),
        }),
      })
    ).json();
    const { tx } = transactions;
    const transactionBuf = Buffer.from(tx, "base64");
    var transaction = VersionedTransaction.deserialize(transactionBuf);
    transaction.sign([base]);
    const txid = await wallet.sendTransaction(transaction, connection);
    await connection.confirmTransaction(txid, "processed");
    toast({
      title: "Transaction sent",
      description: "Transaction has been sent to the blockchain",
      link: `https://explorer.solana.com/tx/${txid}`,
      variant: "default",
    });
    return txid;
  } catch (e: any) {
    toast({
      title: "Error",
      description: e.message,
      variant: "destructive",
    });
    console.log(e);
  }
};

export const getOpenOrder = async (wallet: PublicKey | null | undefined) => {
  if (!wallet) return;

  const res = await limitOrder.getOrders([ownerFilter(wallet)]);
  const openOrder = res.map((e) => ({ ...e.account, id: e.publicKey }));

  const parsedOrders = [];
  const tokenList = useJupiterTrade.getState().tokenList;
  for (let i = 0; i < openOrder.length; i++) {
    const order = openOrder[i];
    const tokenA = tokenList.find(
      (token) => token.address === order.inputMint.toBase58()
    );
    const tokenB = tokenList.find(
      (token) => token.address === order.outputMint.toBase58()
    );
    if (order && tokenA && tokenB) {
      const parsedOrder: JupTradeState["openOrder"][0] = {
        id: order.id,
        marketName: `${tokenA?.symbol}/${tokenB?.symbol}`,
        inAmountUi:
          order?.makingAmount?.toNumber() / 10 ** (tokenA?.decimals ?? 0) ?? 0,
        outAmountUi:
          order?.takingAmount?.toNumber() / 10 ** (tokenB?.decimals ?? 0) ?? 0,
        price:
          (order?.makingAmount?.toNumber() / 10 ** (tokenA?.decimals ?? 0) ??
            0) /
          (order?.takingAmount?.toNumber() / 10 ** (tokenB?.decimals ?? 0) ??
            0),
        tokenA,
        tokenB,
        expiredAt: order.expiredAt?.toNumber(),
        borrowMakingAmount:
          order?.borrowMakingAmount?.toNumber() / 10 ** tokenB.decimals,
      };
      parsedOrders.push(parsedOrder);
    }
  }

  useJupiterTrade.setState({ openOrder: parsedOrders });
};

export const cancelOrder = async (wallet: Adapter, orderPublicKey: string) => {
  try {
    const owner = wallet.publicKey;
    if (!owner) {
      throw new Error("Wallet not connected");
    }
    const requestData = {
      owner: owner.toString(),
      feePayer: owner.toString(),
      orders: [orderPublicKey],
    };

    console.log(
      "Cancellation Request Data:",
      JSON.stringify(requestData, null, 2)
    );

    const response = await fetch("https://jup.ag/api/limit/v1/cancelOrders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { tx } = await response.json();

    const transactionBuf = Buffer.from(tx, "base64");
    var transaction = VersionedTransaction.deserialize(transactionBuf);
    const txid = await wallet.sendTransaction(transaction, connection);
    await connection.confirmTransaction(txid, "processed");
    toast({
      title: "Transaction sent",
      description: "Transaction has been sent to the blockchain",
      link: `https://explorer.solana.com/tx/${txid}`,
      variant: "default",
    });
    return txid;
  } catch (error) {
    console.error(`Error canceling order with base ${orderPublicKey}:`, error);
  }
  // await connection.confirmTransaction(txid, "processed");
  // toast({
  //   title: "Transaction sent",
  //   description: "Transaction has been sent to the blockchain",
  //   link: `https://explorer.solana.com/tx/${txid}`,
  //   variant: "default",
  // });
};
