import { getDecimalCount, sleep } from "./utils";
import { getSelectedTokenAccountForMint } from "./market";
import {
  Account,
  Commitment,
  Connection,
  PublicKey,
  RpcResponseAndContext,
  SimulatedTransactionResponse,
  SystemProgram,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import BN from "bn.js";
import {
  DexInstructions,
  Market,
  OpenOrders,
  TokenInstructions,
} from "@mehranml/openbook";
import { SelectedTokenAccounts, TokenAccount } from "./types";
import { Order } from "@project-serum/serum/lib/market";
import { Buffer } from "buffer";
import assert from "assert";
import {
  BaseSignerWalletAdapter,
  WalletAdapter,
} from "@solana/wallet-adapter-base";
import { toast } from "@/components/ui/use-toast";
import { TOKEN_MINTS } from "@openbook-dex/openbook";

export async function createTokenAccountTransaction({
  connection,
  wallet,
  mintPublicKey,
}: {
  connection: Connection;
  wallet: WalletAdapter;
  mintPublicKey: PublicKey;
}): Promise<{
  transaction: Transaction;
  newAccountPubkey: PublicKey;
}> {
  assert(wallet.publicKey, "Expected `publicKey` to be non-null");
  const ata = await getAssociatedTokenAddress(
    mintPublicKey,
    wallet.publicKey,
    true,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
  const transaction = new Transaction();
  transaction.add(
    createAssociatedTokenAccountInstruction(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      mintPublicKey,
      ata,
      wallet.publicKey,
      wallet.publicKey
    )
  );
  return {
    transaction,
    newAccountPubkey: ata,
  };
}

export const settleFunds = async ({
  market,
  wallet,
  connection,
  openOrders,
  sendNotification,
  usdcRef,
  usdtRef,
  quoteCurrencyAccount,
  baseCurrencyAccount,
}: {
  market: Market;
  openOrders: OpenOrders;
  connection: Connection;
  wallet: BaseSignerWalletAdapter;
  baseCurrencyAccount: string;
  quoteCurrencyAccount: string;
  sendNotification?: boolean;
  usdcRef?: PublicKey;
  usdtRef?: PublicKey;
}): Promise<string | undefined> => {
  if (
    !market ||
    !wallet ||
    !connection ||
    !openOrders ||
    (!baseCurrencyAccount && !quoteCurrencyAccount)
  ) {
    if (sendNotification) {
      console.log("Not connected");
      toast({
        description: "Not connected",
        variant: "destructive",
      });
      // notify({ message: "Not connected" });
    }
    return;
  }

  let createAccountTransaction: Transaction | undefined;
  let baseCurrencyAccountPubkey = new PublicKey(baseCurrencyAccount);
  let quoteCurrencyAccountPubkey = new PublicKey(quoteCurrencyAccount);

  if (!baseCurrencyAccountPubkey) {
    const result = await createTokenAccountTransaction({
      connection,
      wallet,
      mintPublicKey: market.baseMintAddress,
    });
    baseCurrencyAccountPubkey = result?.newAccountPubkey;
    createAccountTransaction = result?.transaction;
  }
  if (!quoteCurrencyAccountPubkey) {
    const result = await createTokenAccountTransaction({
      connection,
      wallet,
      mintPublicKey: market.quoteMintAddress,
    });
    quoteCurrencyAccountPubkey = result?.newAccountPubkey;
    createAccountTransaction = result?.transaction;
  }
  let referrerQuoteWallet: PublicKey | null = null;
  if (market.supportsReferralFees) {
    const usdt = TOKEN_MINTS.find(({ name }) => name === "USDT");
    const usdc = TOKEN_MINTS.find(({ name }) => name === "USDC");
    if (usdtRef && usdt && market.quoteMintAddress.equals(usdt.address)) {
      referrerQuoteWallet = usdtRef;
    } else if (
      usdcRef &&
      usdc &&
      market.quoteMintAddress.equals(usdc.address)
    ) {
      referrerQuoteWallet = usdcRef;
    }
  }
  const { transaction: settleFundsTransaction, signers: settleFundsSigners } =
    await market.makeSettleFundsTransaction(
      connection,
      openOrders,
      baseCurrencyAccountPubkey,
      quoteCurrencyAccountPubkey,
      referrerQuoteWallet
    );

  let transaction = mergeTransactions([
    createAccountTransaction,
    settleFundsTransaction,
  ]);

  return await sendTransaction({
    transaction,
    signers: settleFundsSigners,
    wallet,
    connection,
    timeout: 50000,
    sentMessage: "Settling funds...",
    successMessage: "Funds settled",
    sendingMessage: "Settling funds...",
    sendNotification,
  });
};

export async function settleAllFunds({
  connection,
  wallet,
  tokenAccounts,
  markets,
  selectedTokenAccounts,
}: {
  connection: Connection;
  wallet: BaseSignerWalletAdapter;
  tokenAccounts: TokenAccount[];
  markets: Market[];
  selectedTokenAccounts?: SelectedTokenAccounts;
}) {
  if (!markets || !wallet || !connection || !tokenAccounts) {
    return;
  }

  const programIds: PublicKey[] = [];
  markets
    .reduce((cumulative, m) => {
      // @ts-ignore
      cumulative.push(m._programId);
      return cumulative;
    }, [])
    .forEach((programId) => {
      if (!programIds.find((p) => p.equals(programId))) {
        programIds.push(programId);
      }
    });

  const getOpenOrdersAccountsForProgramId = async (programId: PublicKey) => {
    assert(wallet.publicKey, "Expected `publicKey` to be non-null");
    const openOrdersAccounts = await OpenOrders.findForOwner(
      connection,
      wallet.publicKey,
      programId
    );
    return openOrdersAccounts.filter(
      (openOrders) =>
        openOrders.baseTokenFree.toNumber() ||
        openOrders.quoteTokenFree.toNumber()
    );
  };

  const openOrdersAccountsForProgramIds = await Promise.all(
    programIds.map((programId) => getOpenOrdersAccountsForProgramId(programId))
  );
  const openOrdersAccounts = openOrdersAccountsForProgramIds.reduce(
    (accounts, current) => accounts.concat(current),
    []
  );

  const settleTransactions = (
    await Promise.all(
      openOrdersAccounts.map((openOrdersAccount) => {
        const market = markets.find((m) =>
          // @ts-ignore
          m._decoded?.ownAddress?.equals(openOrdersAccount.market)
        );
        if (
          openOrdersAccount.baseTokenFree.isZero() &&
          openOrdersAccount.quoteTokenFree.isZero()
        ) {
          // nothing to settle for this market.
          return null;
        }
        const baseMint = market?.baseMintAddress;
        const quoteMint = market?.quoteMintAddress;

        const selectedBaseTokenAccount = getSelectedTokenAccountForMint(
          tokenAccounts,
          baseMint,
          baseMint &&
            selectedTokenAccounts &&
            selectedTokenAccounts[baseMint.toBase58()]
        )?.pubkey;
        const selectedQuoteTokenAccount = getSelectedTokenAccountForMint(
          tokenAccounts,
          quoteMint,
          quoteMint &&
            selectedTokenAccounts &&
            selectedTokenAccounts[quoteMint.toBase58()]
        )?.pubkey;
        if (!selectedBaseTokenAccount || !selectedQuoteTokenAccount) {
          return null;
        }
        return (
          market &&
          market.makeSettleFundsTransaction(
            connection,
            openOrdersAccount,
            selectedBaseTokenAccount,
            selectedQuoteTokenAccount
          )
        );
      })
    )
  ).filter(
    (
      x
    ): x is {
      signers: Account[];
      transaction: Transaction;
      payer: PublicKey;
    } => !!x
  );
  if (!settleTransactions || settleTransactions.length === 0) return;

  const transactions = settleTransactions.slice(0, 4).map((t) => t.transaction);
  const signers: Array<Account> = [];
  settleTransactions
    .reduce((cumulative: Array<Account>, t) => cumulative.concat(t.signers), [])
    .forEach((signer) => {
      if (!signers.find((s) => s.publicKey.equals(signer.publicKey))) {
        signers.push(signer);
      }
    });

  const transaction = mergeTransactions(transactions);

  return await sendTransaction({
    transaction,
    signers,
    wallet,
    connection,
  });
}

export async function cancelOrder(params: {
  market: Market;
  connection: Connection;
  wallet: BaseSignerWalletAdapter;
  order: Order;
}) {
  return cancelOrders({ ...params, orders: [params.order] });
}

export async function cancelOrders({
  market,
  wallet,
  connection,
  orders,
}: {
  market: Market;
  wallet: BaseSignerWalletAdapter;
  connection: Connection;
  orders: Order[];
}) {
  const transaction = market.makeMatchOrdersTransaction(5);
  assert(wallet.publicKey, "Expected `publicKey` to be non-null");
  const publicKey = wallet.publicKey;
  orders.forEach((order) => {
    transaction.add(
      market.makeCancelOrderInstruction(connection, publicKey, order)
    );
  });
  transaction.add(market.makeMatchOrdersTransaction(5));
  return await sendTransaction({
    transaction,
    wallet,
    sendNotification: true,
    successMessage: "Orders cancelled",
    sentMessage: "Cancelling orders...",
    timeout: 50000,
    connection,
    sendingMessage: "Sending cancel...",
  });
}

export async function placeOrder({
  side,
  price,
  size,
  orderType,
  market,
  connection,
  wallet,
  baseCurrencyAccount,
  quoteCurrencyAccount,
  feeDiscountPubkey = undefined,
}: {
  side: "buy" | "sell";
  price: number;
  size: number;
  orderType: "ioc" | "postOnly" | "limit";
  market: Market | undefined | null;
  connection: Connection;
  wallet: BaseSignerWalletAdapter;
  baseCurrencyAccount: PublicKey | undefined;
  quoteCurrencyAccount: PublicKey | undefined;
  feeDiscountPubkey: PublicKey | undefined;
}) {
  console.log(price);
  let formattedMinOrderSize =
    market?.minOrderSize?.toFixed(getDecimalCount(market.minOrderSize)) ||
    market?.minOrderSize;
  let formattedTickSize =
    market?.tickSize?.toFixed(getDecimalCount(market.tickSize)) ||
    market?.tickSize;
  const isIncrement = (num: number, step: number) =>
    Math.abs((num / step) % 1) < 1e-5 ||
    Math.abs(((num / step) % 1) - 1) < 1e-5;
  if (isNaN(price)) {
    toast({
      description: "Invalid price",
    });
    console.log("Invalid price");
    toast({
      description: "Invalid price",
      variant: "destructive",
    });
    return;
  }
  if (isNaN(size)) {
    console.log("Invalid size");
    toast({
      description: "Invalid size",
      variant: "destructive",
    });
    return;
  }
  if (!wallet || !wallet.publicKey) {
    console.log("Connect wallet");
    toast({
      description: "connect wallet",
      variant: "destructive",
    });
    return;
  }
  if (!market) {
    console.log("Invalid market");
    toast({
      description: "Invalid market",
      variant: "destructive",
    });
    return;
  }
  if (!isIncrement(size, market.minOrderSize)) {
    toast({
      description: `Size must be an increment of ${formattedMinOrderSize}`,
    });
    console.log(`Size must be an increment of ${formattedMinOrderSize}`);

    return;
  }
  if (size < market.minOrderSize) {
    console.log("Size too small");
    toast({
      description: "Size too small",
      variant: "destructive",
    });
    return;
  }
  if (!isIncrement(price, market.tickSize)) {
    toast({
      description: `Price must be an increment of ${formattedTickSize}`,
      variant: "destructive",
    });
    console.log(`Price must be an increment of ${formattedTickSize}`);

    return;
  }
  if (price < market.tickSize) {
    toast({
      description: "Price under tick size",
      variant: "destructive",
    });
    console.log("Price under tick size");
    return;
  }
  const owner = wallet.publicKey;
  const transaction = new Transaction();
  const signers: Account[] = [];

  if (!baseCurrencyAccount) {
    const { transaction: createAccountTransaction, newAccountPubkey } =
      await createTokenAccountTransaction({
        connection,
        wallet,
        mintPublicKey: market.baseMintAddress,
      });
    transaction.add(createAccountTransaction);
    baseCurrencyAccount = newAccountPubkey;
  }
  if (!quoteCurrencyAccount) {
    const { transaction: createAccountTransaction, newAccountPubkey } =
      await createTokenAccountTransaction({
        connection,
        wallet,
        mintPublicKey: market.quoteMintAddress,
      });
    transaction.add(createAccountTransaction);
    quoteCurrencyAccount = newAccountPubkey;
  }

  const payer = side === "sell" ? baseCurrencyAccount : quoteCurrencyAccount;
  if (!payer) {
    console.log("Need an SPL token account for cost currency");
    toast({
      description: "Need an SPL token account for cost currency",
      variant: "destructive",
    });

    return;
  }
  console.log("payer", payer.toBase58());
  const params = {
    owner,
    payer,
    side,
    price,
    size,
    orderType,
    feeDiscountPubkey: feeDiscountPubkey || null,
  };
  console.log(params);

  const matchOrderstransaction = market.makeMatchOrdersTransaction(5);
  transaction.add(matchOrderstransaction);
  const startTime = getUnixTs();
  let { transaction: placeOrderTx, signers: placeOrderSigners } =
    await market.makePlaceOrderTransaction(
      connection,
      params,
      120_000,
      120_000
    );
  const endTime = getUnixTs();
  console.log(`Creating order transaction took ${endTime - startTime}`);
  transaction.add(placeOrderTx);
  transaction.add(market.makeMatchOrdersTransaction(5));
  signers.push(...placeOrderSigners);

  return await sendTransaction({
    transaction,
    wallet,
    connection,
    signers,
    sendingMessage: "Sending order...",
    successMessage: "Order confirmed",
    sentMessage: "Order sent",
    timeout: 50000,
    sendNotification: true,
  });
}
//  end Order
export async function listMarket({
  connection,
  wallet,
  baseMint,
  quoteMint,
  baseLotSize,
  quoteLotSize,
  dexProgramId,
}: {
  connection: Connection;
  wallet: BaseSignerWalletAdapter;
  baseMint: PublicKey;
  quoteMint: PublicKey;
  baseLotSize: number;
  quoteLotSize: number;
  dexProgramId: PublicKey;
}) {
  assert(wallet.publicKey, "Expected `publicKey` to be non-null");

  const market = new Account();
  const requestQueue = new Account();
  const eventQueue = new Account();
  const bids = new Account();
  const asks = new Account();
  const baseVault = new Account();
  const quoteVault = new Account();
  const feeRateBps = 0;
  const quoteDustThreshold = new BN(100);

  async function getVaultOwnerAndNonce() {
    const nonce = new BN(0);
    while (true) {
      try {
        const vaultOwner = await PublicKey.createProgramAddress(
          [market.publicKey.toBuffer(), nonce.toArrayLike(Buffer, "le", 8)],
          dexProgramId
        );
        return [vaultOwner, nonce];
      } catch (e) {
        nonce.iaddn(1);
      }
    }
  }
  const [vaultOwner, vaultSignerNonce] = await getVaultOwnerAndNonce();

  const tx1 = new Transaction();
  tx1.add(
    SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: baseVault.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(165),
      space: 165,
      programId: TokenInstructions.TOKEN_PROGRAM_ID,
    }),
    SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: quoteVault.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(165),
      space: 165,
      programId: TokenInstructions.TOKEN_PROGRAM_ID,
    }),
    TokenInstructions.initializeAccount({
      account: baseVault.publicKey,
      mint: baseMint,
      owner: vaultOwner,
    }),
    TokenInstructions.initializeAccount({
      account: quoteVault.publicKey,
      mint: quoteMint,
      owner: vaultOwner,
    })
  );

  const tx2 = new Transaction();
  tx2.add(
    SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: market.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(
        Market.getLayout(dexProgramId).span
      ),
      space: Market.getLayout(dexProgramId).span,
      programId: dexProgramId,
    }),
    SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: requestQueue.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(5120 + 12),
      space: 5120 + 12,
      programId: dexProgramId,
    }),
    SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: eventQueue.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(262144 + 12),
      space: 262144 + 12,
      programId: dexProgramId,
    }),
    SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: bids.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(65536 + 12),
      space: 65536 + 12,
      programId: dexProgramId,
    }),
    SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: asks.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(65536 + 12),
      space: 65536 + 12,
      programId: dexProgramId,
    }),
    DexInstructions.initializeMarket({
      market: market.publicKey,
      requestQueue: requestQueue.publicKey,
      eventQueue: eventQueue.publicKey,
      bids: bids.publicKey,
      asks: asks.publicKey,
      baseVault: baseVault.publicKey,
      quoteVault: quoteVault.publicKey,
      baseMint,
      quoteMint,
      baseLotSize: new BN(baseLotSize),
      quoteLotSize: new BN(quoteLotSize),
      feeRateBps,
      vaultSignerNonce,
      quoteDustThreshold,
      programId: dexProgramId,
      authority: undefined,
    })
  );

  const signedTransactions = await signTransactions({
    transactionsAndSigners: [
      { transaction: tx1, signers: [baseVault, quoteVault] },
      {
        transaction: tx2,
        signers: [market, requestQueue, eventQueue, bids, asks],
      },
    ],
    wallet,
    connection,
  });
  for (let signedTransaction of signedTransactions) {
    await sendSignedTransaction({
      signedTransaction,
      connection,
    });
  }

  return market.publicKey;
}

export const getUnixTs = () => {
  return new Date().getTime() / 1000;
};

const DEFAULT_TIMEOUT = 15000;

export async function sendTransaction({
  transaction,
  wallet,
  signers = [],
  connection,
  sendingMessage = "Sending transaction...",
  sentMessage = "Transaction sent",
  successMessage = "Transaction confirmed",
  timeout = DEFAULT_TIMEOUT,
  sendNotification = true,
}: {
  transaction: Transaction;
  wallet: BaseSignerWalletAdapter;
  signers?: Array<Account>;
  connection: Connection;
  sendingMessage?: string;
  sentMessage?: string;
  successMessage?: string;
  timeout?: number;
  sendNotification?: boolean;
}) {
  const signedTransaction = await signTransaction({
    transaction,
    wallet,
    signers,
    connection,
  });
  return await sendSignedTransaction({
    signedTransaction,
    connection,
    sendingMessage,
    sentMessage,
    successMessage,
    timeout,
    sendNotification,
  });
}

export async function signTransaction({
  transaction,
  wallet,
  signers = [],
  connection,
}: {
  transaction: Transaction;
  wallet: BaseSignerWalletAdapter;
  signers?: Array<Account>;
  connection: Connection;
}) {
  assert(wallet.publicKey, "Expected `publicKey` to be non-null");
  transaction.recentBlockhash = (
    await connection.getLatestBlockhash("confirmed")
  ).blockhash;
  transaction.setSigners(wallet.publicKey, ...signers.map((s) => s.publicKey));
  if (signers.length > 0) {
    transaction.partialSign(...signers);
  }
  return await wallet.signTransaction(transaction);
}

export async function signTransactions({
  transactionsAndSigners,
  wallet,
  connection,
}: {
  transactionsAndSigners: {
    transaction: Transaction;
    signers?: Array<Account>;
  }[];
  wallet: BaseSignerWalletAdapter;
  connection: Connection;
}) {
  assert(wallet.publicKey, "Expected `publicKey` to be non-null");
  const publicKey = wallet.publicKey;
  const blockhash = (await connection.getRecentBlockhash("max")).blockhash;
  transactionsAndSigners.forEach(({ transaction, signers = [] }) => {
    transaction.recentBlockhash = blockhash;
    transaction.setSigners(publicKey, ...signers.map((s) => s.publicKey));
    if (signers?.length > 0) {
      transaction.partialSign(...signers);
    }
  });
  return await wallet.signAllTransactions(
    transactionsAndSigners.map(({ transaction }) => transaction)
  );
}

export async function sendSignedTransaction({
  signedTransaction,
  connection,
  sendingMessage = "Sending transaction...",
  sentMessage = "Transaction sent",
  successMessage = "Transaction confirmed",
  timeout = DEFAULT_TIMEOUT,
  sendNotification = true,
}: {
  signedTransaction: Transaction;
  connection: Connection;
  sendingMessage?: string;
  sentMessage?: string;
  successMessage?: string;
  timeout?: number;
  sendNotification?: boolean;
}): Promise<string> {
  const rawTransaction = signedTransaction.serialize();
  const startTime = getUnixTs();
  if (sendNotification) {
    console.log("Sending transaction", signedTransaction);
    toast({
      description: sendingMessage,
    });
  }
  const txid: TransactionSignature = await connection.sendRawTransaction(
    rawTransaction,
    {
      maxRetries: 2,
      skipPreflight: true,
    }
  );
  if (sendNotification) {
    console.log("Sent transaction", txid);
    toast({
      description: sentMessage,
    });
  }
  console.log("confirm start:", txid);
  const confirmation = await connection.confirmTransaction(txid);
  console.log("confirm ends:", confirmation);

  // await connection.confirmTransaction(txid);
  toast({
    title: "Transaction sent",
    description: "Transaction has been sent to the network",
    link: `https://solscan.io/tx/${txid}`,
    color: "green",
  });

  return txid;

  //
  // let done = false;
  // // await (async () => {
  // //   while (!done && getUnixTs() - startTime < timeout) {
  // //     await connection.sendRawTransaction(rawTransaction, {
  // //       skipPreflight: true,
  // //     });
  // //     await sleep(2000);
  // //   }
  // // })();
  // try {
  //   const res = await connection.confirmTransaction(txid, "max");
  //   // await awaitTransactionSignatureConfirmation(txid, timeout, connection);
  //   toast({
  //     description: res.value.err ? "Transaction failed" : successMessage,
  //   });
  // } catch (err: any) {
  //   if (err.timeout) {
  //     throw new Error("Timed out awaiting confirmation on transaction");
  //   }
  //   let simulateResult: SimulatedTransactionResponse | null = null;
  //   try {
  //     simulateResult = (
  //       await simulateTransaction(connection, signedTransaction, "single")
  //     ).value;
  //   } catch (e) {}
  //   if (simulateResult && simulateResult.err) {
  //     if (simulateResult.logs) {
  //       for (let i = simulateResult.logs.length - 1; i >= 0; --i) {
  //         const line = simulateResult.logs[i];
  //         if (line.startsWith("Program log: ")) {
  //           throw new Error(
  //             "Transaction failed: " + line.slice("Program log: ".length)
  //           );
  //         }
  //       }
  //     }
  //     let parsedError;
  //     if (
  //       typeof simulateResult.err == "object" &&
  //       "InstructionError" in simulateResult.err
  //     ) {
  //       const parsedErrorInfo = parseInstructionErrorResponse(
  //         signedTransaction,
  //         simulateResult.err["InstructionError"]
  //       );
  //       parsedError = parsedErrorInfo.error;
  //     } else {
  //       parsedError = JSON.stringify(simulateResult.err);
  //     }
  //     throw new Error(parsedError);
  //   }
  //   throw new Error("Transaction failed");
  // } finally {
  //   done = true;
  // }
  // if (sendNotification) {
  //   console.log("Latency", txid, getUnixTs() - startTime);
  //   toast({
  //     description: successMessage,
  //   });
  // }
  //
  // console.log("Latency", txid, getUnixTs() - startTime);
  // return txid;
}

async function awaitTransactionSignatureConfirmation(
  txid: TransactionSignature,
  timeout: number,
  connection: Connection
) {
  let done = false;
  const result = await new Promise((resolve, reject) => {
    (async () => {
      setTimeout(() => {
        if (done) {
          return;
        }
        done = true;
        console.log("Timed out for txid", txid);
        reject({ timeout: true });
      }, timeout);
      try {
        connection.onSignature(
          txid,
          (result) => {
            console.log("WS confirmed", txid, result);
            done = true;
            if (result.err) {
              reject(result.err);
            } else {
              resolve(result);
            }
          },
          "recent"
        );
        console.log("Set up WS connection", txid);
      } catch (e) {
        done = true;
        console.log("WS error in setup", txid, e);
      }
      while (!done) {
        // eslint-disable-next-line no-loop-func
        await (async () => {
          try {
            const signatureStatuses = await connection.getSignatureStatuses([
              txid,
            ]);
            const result = signatureStatuses && signatureStatuses.value[0];
            if (!done) {
              if (!result) {
                console.log("REST null result for", txid, result);
              } else if (result.err) {
                console.log("REST error for", txid, result);
                done = true;
                reject(result.err);
              } else if (!result.confirmations) {
                console.log("REST no confirmations for", txid, result);
              } else {
                console.log("REST confirmation for", txid, result);
                done = true;
                resolve(result);
              }
            }
          } catch (e) {
            if (!done) {
              console.log("REST connection error: txid", txid, e);
            }
          }
        })();
        await sleep(2000);
      }
    })();
  });
  done = true;
  return result;
}

function mergeTransactions(transactions: (Transaction | undefined)[]) {
  const transaction = new Transaction();
  transactions
    .filter((t): t is Transaction => t !== undefined)
    .forEach((t) => {
      transaction.add(t);
    });
  return transaction;
}

/** Copy of Connection.simulateTransaction that takes a commitment parameter. */
async function simulateTransaction(
  connection: Connection,
  transaction: Transaction,
  commitment: Commitment
): Promise<RpcResponseAndContext<SimulatedTransactionResponse>> {
  // @ts-ignore
  transaction.recentBlockhash = await connection._recentBlockhash(
    // @ts-ignore
    connection._disableBlockhashCaching
  );

  const signData = transaction.serializeMessage();
  // @ts-ignore
  const wireTransaction = transaction._serialize(signData);
  const encodedTransaction = wireTransaction.toString("base64");
  const config: any = { encoding: "base64", commitment };
  const args = [encodedTransaction, config];

  // @ts-ignore
  const res = await connection._rpcRequest("simulateTransaction", args);
  if (res.error) {
    throw new Error("failed to simulate transaction: " + res.error.message);
  }
  return res.result;
}
