import {
  EnvironmentType,
  PoolType,
  ReserveType,
  SolendActionCore,
  SolendMarket,
} from "@solendprotocol/solend-sdk/index";
import { LendState } from "@/applications/Lend/store";
import { Connection, PublicKey } from "@solana/web3.js";

type SupplyProps = {
  reserve: ReserveType;
  connection: Connection;
  amount: string;
  publicKey: PublicKey;
  env: EnvironmentType;
  market: SolendMarket;
  reserves: LendState["poolList"];
  sendTransaction: any;
};
export const onSupply = async ({
  amount,
  market,
  reserves,
  publicKey,
  reserve,
  connection,
  sendTransaction,
  env = "production",
}: SupplyProps) => {
  const pool = await createPool(market, reserves);
  const nAmount = (Number(amount) * 10 ** reserve.decimals).toString();

  const actionCore = await SolendActionCore.buildDepositTxns(
    pool,
    reserve,
    connection,
    nAmount,
    publicKey,
    env
  );

  if (!sendTransaction) {
    throw new Error("Wallet not found");
  }
  const tx = await actionCore.sendTransactions(sendTransaction);
  console.log(tx);
  return tx;
};

type BorrowProps = {
  reserve: ReserveType;
  connection: Connection;
  amount: string;
  publicKey: PublicKey;
  env: EnvironmentType;
  market: SolendMarket;
  reserves: LendState["poolList"];
  sendTransaction: any;
};
export const onBorrow = async ({
  market,
  reserves,
  publicKey,
  reserve,
  connection,
  sendTransaction,
  amount,
  env,
}: BorrowProps) => {
  const pool = await createPool(market, reserves);
  const nAmount = (Number(amount) * 10 ** reserve.decimals).toString();

  const actionCore = await SolendActionCore.buildBorrowTxns(
    pool,
    reserve,
    connection,
    nAmount,
    publicKey,
    env
  );
  if (!sendTransaction) {
    throw new Error("Wallet not found");
  }
  const tx = await actionCore.sendTransactions(sendTransaction);
  console.log(tx);
  return tx;
};

type RepayProps = {
  reserve: ReserveType;
  connection: Connection;
  amount: number;
  publicKey: PublicKey;
  env: EnvironmentType;
  market: SolendMarket;
  reserves: LendState["poolList"];
  sendTransaction: any;
};
export const onRepay = async ({
  amount,
  market,
  reserves,
  publicKey,
  reserve,
  connection,
  sendTransaction,
  env = "production",
}: RepayProps) => {
  const pool = await createPool(market, reserves);
  const nAmount = (Number(amount) * 10 ** reserve.decimals).toString();
  const actionCore = await SolendActionCore.buildRepayTxns(
    pool,
    reserve,
    connection,
    nAmount,
    publicKey,
    env
  );

  if (!sendTransaction) {
    throw new Error("Wallet not found");
  }
  const tx = await actionCore.sendTransactions(sendTransaction);
  console.log(tx);
  return tx;
};

type WithdrawProps = {
  reserve: ReserveType;
  connection: Connection;
  amount: string;
  publicKey: PublicKey;
  env: EnvironmentType;
  market: SolendMarket;
  reserves: LendState["poolList"];
  sendTransaction: any;
};
export const onWithdraw = async ({
  env,
  market,
  reserves,
  reserve,
  connection,
  sendTransaction,
  amount,
  publicKey,
}: WithdrawProps) => {
  const pool = await createPool(market, reserves);
  const nAmount = (Number(amount) * 10 ** reserve.decimals).toString();

  const actionCore = await SolendActionCore.buildWithdrawTxns(
    pool,
    reserve,
    connection,
    nAmount,
    publicKey,
    env
  );
  if (!sendTransaction) {
    throw new Error("Wallet not found");
  }
  const tx = await actionCore.sendTransactions(sendTransaction);
  console.log(tx);
  return tx;
};

export const createPool = async (
  market: SolendMarket,
  reserves: LendState["poolList"]
): Promise<PoolType> => {
  if (!reserves) {
    throw new Error("Reserve not found");
  }
  let r: PoolType["reserves"] = [];
  reserves.forEach((e) => {
    if (e.reserve) {
      r.push({
        ...e.reserve,
      });
    }
  });

  return {
    reserves: r,
    name: market.config.name,
    address: market.config.address,
    authorityAddress: market.config.authorityAddress,
    owner: market.config.creator,
  };
};
