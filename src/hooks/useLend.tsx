import { useCallback, useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import {
  ObligationStats,
  SolendMarket,
  SolendObligation,
} from "@solendprotocol/solend-sdk/index";

const useLend = (connection: Connection, publicKey: PublicKey | null) => {
  const [loading, setLoading] = useState(true);
  const [markets, setMarkets] = useState<SolendMarket>();
  const [userObligationState, setUserObligationState] =
    useState<ObligationStats>();

  const getMarkets = useCallback(async () => {
    if (!publicKey) return;
    const reserves = [];
    //  Initial Solend Markets
    const m = await SolendMarket.initialize(connection, "production");

    //  get User Data in Solend Wallets
    const walletObligations = await m.fetchObligationByWallet(publicKey);

    // // Fine user Reserve in Solend Markets
    // const userReserves = walletObligations?.deposits.map((deposit) =>
    //   m.reserves.find(
    //     (reserve) => reserve.stats?.mintAddress === deposit.mintAddress
    //   )
    // );

    // Set User Obligation State: deposit, borrow, positions and etc
    setUserObligationState(walletObligations?.obligationStats);

    // setMarkets
    setMarkets(m);

    setLoading(false);
  }, [connection, publicKey]);

  useEffect(() => {
    if (publicKey && connection) {
      getMarkets();
    }
  }, [connection, getMarkets, publicKey]);

  const getLends = useCallback(async () => {
    if (!publicKey) return;
    let lend = 0;
    // await getSolendLends();
    // const transactions = await connection.getSignaturesForAddress(publicKey, {
    //   limit: 1000,
    // });

    return lend;
  }, [publicKey]);

  return { getLends, loading, userObligationState };
};

export default useLend;
