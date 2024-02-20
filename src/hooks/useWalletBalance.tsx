import { useCallback, useEffect, useMemo, useState } from "react";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { findToken } from "@/lib/get-wallet";
import { Token } from "@/types/token";
import { getPrice } from "@/data/price";

const useWalletBalance = (
  connection: Connection,
  publicKey: PublicKey | null
) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const getWalletAmount = useMemo(async () => {}, [tokens]);

  useEffect(() => {
    const get = async () => {
      let p = 0;
      if (tokens.length > 0) {
        for (const token of tokens) {
          if (token.amount === 0) continue;
          let pp = await getPrice(token.symbol);
          p = p + pp * token.amount;
        }
      }
      setWalletBalance(p);
    };
    get();
  }, [tokens]);

  const getTokens = useCallback(async () => {
    if (!publicKey || !connection || !loading) return;
    setLoading(false);
    const localTokens: Token[] = [];
    const walletTokens = await connection.getParsedProgramAccounts(
      TOKEN_PROGRAM_ID,
      {
        filters: [
          {
            dataSize: 165, // number of bytes
          },
          {
            memcmp: {
              offset: 32, // number of bytes
              bytes: publicKey.toString(),
            },
          },
        ],
      }
    );

    for (const token of walletTokens) {
      // @ts-ignore
      const key = token.account.data.parsed.info.mint as string;
      const tokenDetails = await findToken(key);
      if (!tokenDetails?.name) continue;
      const price = await getPrice(tokenDetails.symbol);
      // @ts-ignore
      const amount = token.account.data.parsed.info.tokenAmount.uiAmount;
      localTokens.push({
        ...tokenDetails,
        amount: amount,
        price: price,
      });
    }
    // get SOL Balance
    const solPrice = await getPrice("SOL");
    const solBalance = await connection.getBalance(publicKey);
    localTokens.push({
      symbol: "SOL",
      name: "Solana",
      amount: solBalance / LAMPORTS_PER_SOL,
      logoURI: "/solana-copy-2@2x.png",
      tags: ["native"],
      decimals: 9,
      address: "So11111111111111111111111111111111111111112",
      price: solPrice,
    });
    setTokens(localTokens);
  }, [connection, loading, publicKey]);

  useEffect(() => {
    if (loading || tokens.length === 0) {
      getTokens();
    }
  }, [getTokens, loading, publicKey, tokens.length]);

  const refetch = async () => {
    await getTokens();
  };

  return {
    tokens,
    loading,
    walletBalance,
    refetch,
  };
};
export default useWalletBalance;
