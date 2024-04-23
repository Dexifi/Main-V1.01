import { Connection, PublicKey } from "@solana/web3.js";
import { RaydiumPools } from "@/applications/Liquidity/pool";
import { userCLMMDeposit, userDeposit } from "@/applications/Liquidity/deposit";
import { Wallet } from "@solana/wallet-adapter-react";

const initial = async (
  connection: Connection,
  publicKey: PublicKey | null,
  wallet: Wallet
) => {
  await RaydiumPools.fetchNextPage();
  await RaydiumPools.fetchInfo();
  await userDeposit(connection, publicKey);
  await userCLMMDeposit(connection, publicKey);
};
export default initial;
