import { useCallback, useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import {
  ObligationStats,
  Position,
  ReserveDataType,
  SolendMarket,
} from "@solendprotocol/solend-sdk";
import { findToken } from "@/lib/get-wallet";
import { TokenInfo } from "@solana/spl-token-registry";

type stateType = ReserveDataType & { token?: TokenInfo };

const useLend = (connection: Connection, publicKey: PublicKey | null) => {
  const [loading, setLoading] = useState(true);
  const [markets, setMarkets] = useState<SolendMarket>();
  const [userObligationState, setUserObligationState] =
    useState<ObligationStats>();
  const [deposits, setDeposits] = useState<Position[] | undefined>();
  const [borrows, setBorrows] = useState<Position[] | undefined>();
  const [states, setStates] = useState<stateType[]>([]);

  const getMarkets = useCallback(async () => {
    if (!publicKey) return;
    //  Initial Solend Markets
    const lStates: stateType[] = [];
    const m = await SolendMarket.initialize(connection, "production");
    await m.loadReserves();
    await m.loadRewards();

    //  get User Data in Solend Wallets
    const walletObligations = await m.fetchObligationByWallet(publicKey);

    if (!walletObligations) {
      setLoading(false);
      return;
    }

    for (const deposit of walletObligations.deposits) {
      const reserved = m.reserves.find(
        (res) => res?.stats?.mintAddress === deposit.mintAddress
      );

      if (reserved && reserved.stats) {
        const t = reserved.totalBorrowAPY();
        // const g = await reserved.calculateBorrowAPY();
        const state = reserved?.stats;
        const token = await findToken(state.symbol);
        lStates.push({ ...state, token });
      }
    }

    // Set User Obligation State: deposit, borrow, positions and etc
    setStates(lStates);
    setUserObligationState(walletObligations?.obligationStats);
    setBorrows(walletObligations?.borrows);
    setDeposits(walletObligations?.deposits);
    // setMarkets
    setMarkets(m);

    setLoading(false);
  }, [connection, publicKey]);

  useEffect(() => {
    if (publicKey && connection) {
      getMarkets();
    }
  }, [connection, getMarkets, publicKey]);

  return { loading, userObligationState, borrows, deposits, markets, states };
};

export default useLend;
