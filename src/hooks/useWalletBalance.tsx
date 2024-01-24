import { useCallback, useEffect, useMemo, useState } from "react";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { connection } from "@/lib/get-connections";
import { getBalance } from "@drift-labs/sdk";
import { findToken, getPrice } from "@/lib/get-wallet";
const useWalletBalance = (
  connection: Connection,
  publicKey: PublicKey | null
) => {
  const [tokens, setTokens] = useState<any[]>([]);
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
    const localTokens = [];
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
      // @ts-ignore
      const amount = token.account.data.parsed.info.tokenAmount.uiAmount;
      localTokens.push({
        symbol: tokenDetails?.symbol,
        name: tokenDetails?.name,
        amount: amount,
        logoURI: tokenDetails?.logoURI,
        address: tokenDetails?.address,
      });
    }
    // get SOL Balance
    const solBalance = await connection.getBalance(publicKey);
    localTokens.push({
      symbol: "SOL",
      name: "Solana",
      amount: solBalance / LAMPORTS_PER_SOL,
      logoURI: "/solana-copy-2@2x.png",
    });
    setTokens(localTokens);
  }, [connection, loading, publicKey]);

  useEffect(() => {
    if (loading || tokens.length === 0) {
      getTokens();
    }
  }, [getTokens, loading, publicKey, tokens.length]);

  return {
    tokens,
    loading,
    walletBalance,
  };
};
export default useWalletBalance;
