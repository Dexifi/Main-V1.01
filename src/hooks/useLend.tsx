import { useCallback, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";

import { obligationsAtom } from "@/stores/obligations";
import { useAtom } from "jotai";
import BigNumber from "bignumber.js";
import { setPublicKeyAtom } from "@/stores/wallet";

const useLend = (connection: Connection, publicKey: PublicKey | null) => {
  const [loading, setLoading] = useState(true);
  const [obligations] = useAtom(obligationsAtom);
  const [p, setPkey] = useAtom(setPublicKeyAtom);

  console.log("obligations", obligations);

  const getSolendLends = useCallback(async () => {
    if (!publicKey) return;

    const yourSupply = obligations.reduce(
      (acc, o) => o.totalSupplyValue.plus(acc),
      new BigNumber(0)
    );
    console.log("yourSupply", yourSupply.toString());
  }, [obligations, publicKey]);

  const getLends = useCallback(async () => {
    if (!publicKey) return;
    let lend = 0;
    await getSolendLends();
    const transactions = await connection.getSignaturesForAddress(publicKey, {
      limit: 1000,
    });

    return lend;
  }, [connection, getSolendLends, publicKey]);

  return { getLends, loading };
};

export default useLend;
