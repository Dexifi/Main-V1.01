import { Connection, PublicKey } from "@solana/web3.js";
import {
  Clmm,
  MAINNET_PROGRAM_ID,
  SPL_ACCOUNT_LAYOUT,
  TOKEN_PROGRAM_ID,
  TokenAccount,
} from "@raydium-io/raydium-sdk";
import { useLiquidity } from "./store";
import { UserAmmPositionType } from "./type";
import { getPrice } from "@/data/price";
import { formatClmmKeys } from "./formatClmmKeys";
import { toast } from "@/components/ui/use-toast";
import { Metaplex } from "@metaplex-foundation/js";
import BN from "bn.js";

export const userDeposit = async (
  connection: Connection,
  ownerKey: PublicKey | null
) => {
  if (!ownerKey) return;
  const tokenAccounts = await getWalletTokenAccount(connection, ownerKey);
  const ammPools = useLiquidity.getState().ammPools;
  const usersRaydiumDeposits: UserAmmPositionType[] = [];
  for (const pool of ammPools) {
    const poolTokenAccount = tokenAccounts.find(
      (account) => account.accountInfo.mint.toBase58() === pool.lpMint?.address
    );
    if (!poolTokenAccount) continue;
    const tokenAPrice = await getPrice(pool.mintA.address);
    const tokenBPrice = await getPrice(pool.mintB.address);

    usersRaydiumDeposits.push({
      lpMint: pool.lpMint,
      mintA: pool.mintA,
      mintB: pool.mintB,
      mintAPrice: tokenAPrice,
      mintBPrice: tokenBPrice,
      amount: poolTokenAccount?.accountInfo.amount.toNumber(),
      ammId: pool.id,
    });
  }
  console.log("usersRaydiumDeposits", usersRaydiumDeposits);
  useLiquidity.setState({
    userAmmDeposits: usersRaydiumDeposits.filter((e) => e.amount > 0),
  });
};

export const userCLMMDeposit = async (
  connection: Connection,
  wallet: PublicKey | null
) => {
  if (!wallet) {
    toast({
      description: "Please connect your wallet",
      variant: "destructive",
    });
    return;
  }
  if (!wallet) return;
  const client = new Metaplex(connection);
  const poolsId: string[] = [];

  const tokenAccounts = await getWalletTokenAccount(connection, wallet);
  const nfts = tokenAccounts.filter((e) => e.accountInfo.amount.eq(new BN(1)));

  await client
    .nfts()
    .findAllByOwner({ owner: wallet })
    .then(async (res) => {
      poolsId.push(...res.map((e) => e.updateAuthorityAddress.toBase58()));
    });

  const clmmKeys = await formatClmmKeys(
    connection,
    MAINNET_PROGRAM_ID.CLMM.toString(),
    poolsId
  );
  const infos = await Clmm.fetchMultiplePoolInfos({
    connection,
    poolKeys: clmmKeys,
    ownerInfo: {
      tokenAccounts: nfts,
      wallet,
    },
    chainTime: new Date().getTime() / 1000,
  });
  const filteredInfos = Object.values(infos).filter((e) => !!e.positionAccount);
  useLiquidity.setState({ userClmmDeposits: filteredInfos });
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
