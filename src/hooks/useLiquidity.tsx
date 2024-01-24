import { Connection, PublicKey } from "@solana/web3.js";
import {
  Clmm,
  MAINNET_PROGRAM_ID,
  SPL_ACCOUNT_LAYOUT,
  TOKEN_PROGRAM_ID,
  TokenAccount,
} from "@raydium-io/raydium-sdk";
import { useCallback, useEffect, useState } from "react";
import { ApiPoolInfoItem } from "@raydium-io/raydium-sdk/src/baseInfo/interface";
import { useAtom } from "jotai";
import { raydiumAmmPoolsDefault } from "@/stores/pools";
import { findToken, getPrice } from "@/lib/get-wallet";
import { fetchAmmInfo } from "@/lib/fetchAmmInfo";
import { TokenInfo } from "@solana/spl-token-registry";
import { formatClmmKeys } from "@/lib/formatClmmKeys";

const useLiquidity = (connection: Connection, owner: PublicKey | null) => {
  const [loading, setLoading] = useState(true);
  const [userPools, setUserPools] = useState<ApiPoolInfoItem[]>([]);
  const [tokenAccount, setTokenAccount] = useState<TokenAccount[]>([]);
  const [ammPools] = useAtom(raydiumAmmPoolsDefault);
  const [depositList, setDepositList] = useState([]);
  const [total, setTotal] = useState(0);

  const calculateTotal = useCallback(async (list: DepositsList) => {
    let t = 0;

    for (const item of list) {
      //   get tokens price
      const basePrice = await getPrice(item.baseToken.symbol);
      const quotePrice = await getPrice(item.quoteToken.symbol);
      //   calculate total
      t = t + item.userBaseShare * basePrice + item.userQuoteShare * quotePrice;
    }
    setTotal(t);
  }, []);

  const getClmmAccounts = useCallback(
    async (tokenAccounts: TokenAccount[], ownerKey: PublicKey) => {
      const clmmKeys = await formatClmmKeys(
        connection,
        MAINNET_PROGRAM_ID.CLMM.toString()
      );
      const nftAccounts = tokenAccounts.filter(
        (t) => t.accountInfo.amount.toNumber() === 1
      );

      const infos = await Clmm.fetchMultiplePoolInfos({
        connection,
        poolKeys: clmmKeys,
        chainTime: new Date().getTime() / 1000,
        ownerInfo: {
          wallet: ownerKey,
          tokenAccounts: tokenAccounts,
        },
      });
      const clmmList = [];
      for (const [key, value] of Object.entries(infos)) {
        if (value.positionAccount) {
          clmmList.push({ value, key });
        }
      }
      console.log(clmmList);
    },
    [connection]
  );

  const getAccounts = async (connection: Connection, ownerKey: PublicKey) => {
    setLoading(true);
    const tokenAccounts = await getWalletTokenAccount(connection, ownerKey);
    getClmmAccounts(tokenAccounts, ownerKey);

    for (const tokenAccount of tokenAccounts) {
      const p = ammPools.find(
        (e) => e.lpMint === tokenAccount.accountInfo.mint.toString()
      );
      if (p) {
        setTokenAccount((e) => [...e, tokenAccount]);
        setUserPools((q) => [...q, p]);
      }
    }
  };

  const getOpenOrders = useCallback(
    async (pools: ApiPoolInfoItem[], ownerKey: PublicKey) => {
      if (!tokenAccount.length) return;

      const depositsList = [];

      for (const pool of pools) {
        // Get Pool info
        const pl = await fetchAmmInfo(connection, pool);

        const targetUserAccount = tokenAccount.find(
          (a) => a.accountInfo.mint.toString() === pool.lpMint
        );

        if (!targetUserAccount) throw Error("User account not found");
        if (!pl) throw Error("pool info not found");

        // set variables
        const baseTotal = Number(pl.baseReserve.toNumber().toFixed(5));
        const quoteTotal = Number(pl.quoteReserve.toNumber().toFixed(5));
        const baseToken = await findToken(pool.baseMint);
        const quoteToken = await findToken(pool.quoteMint);
        const lpTotal = pl.lpSupply.toNumber();

        if (!baseToken || !quoteToken) throw Error("Token not found");

        // calculate user share

        // userLpShare in percentage
        const userLpShare = Number(
          (
            (targetUserAccount.accountInfo.amount.toNumber() * 100) /
            pl.lpSupply.toNumber()
          ).toFixed(6)
        );

        // userBase amount
        const userBaseShare = Number(
          (
            (baseTotal * targetUserAccount.accountInfo.amount.toNumber()) /
            lpTotal /
            10 ** pl.baseDecimals
          ).toFixed(6)
        );

        // userBase amount
        const userQuoteShare = Number(
          (
            (quoteTotal * targetUserAccount.accountInfo.amount.toNumber()) /
            lpTotal /
            10 ** pl.quoteDecimals
          ).toFixed(6)
        );
        depositsList.push({
          lpTotal,
          lpToken: {
            mint: pool.lpMint,
            decimals: pl.lpDecimals,
          },
          baseTotal,
          baseToken,
          quoteTotal,
          quoteToken,
          userLpShare,
          userBaseShare,
          userQuoteShare,
        });
        calculateTotal(depositsList);
      }
    },
    [connection, tokenAccount]
  );

  useEffect(() => {
    let load = true;

    //   get open orders
    if (userPools.length > 0 && owner) {
      load = false;
      getOpenOrders(userPools, owner);
    }
  }, [userPools, owner, getOpenOrders]);

  useEffect(() => {
    let load = true;
    if (connection && owner && load) {
      load = false;

      getAccounts(connection, owner);
    }
  }, [connection, owner]);

  return { userPools, total, ammPools, depositList, tokenAccount };
};

export default useLiquidity;

const getLiquidityData = async () => {};

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

type LpToken = {
  mint: string;
  decimals: number;
};

type Deposit = {
  lpTotal: number;
  lpToken: LpToken;
  baseTotal: number;
  baseToken: TokenInfo;
  quoteTotal: number;
  quoteToken: TokenInfo;
  userLpShare: number;
  userBaseShare: number;
  userQuoteShare: number;
};

type DepositsList = Deposit[];
