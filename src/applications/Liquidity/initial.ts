import { Connection, PublicKey } from "@solana/web3.js";
import { RaydiumPools } from "@/applications/Liquidity/pool";
import { userCLMMDeposit, userDeposit } from "@/applications/Liquidity/deposit";
import { userWalletBalance } from "@/applications/Liquidity/user";

const initial = async (connection: Connection, publicKey: PublicKey | null) => {
  await RaydiumPools.fetchNextPage();
  await RaydiumPools.fetchInfo();
  await RaydiumPools.fetchTokensPrice();
  await userDeposit(connection, publicKey);
  await userCLMMDeposit(connection, publicKey);
  await userWalletBalance(connection, publicKey);
};
export default initial;
