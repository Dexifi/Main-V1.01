import { useCallback, useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex, Amount, amount } from "@metaplex-foundation/js";
const useNFT = (connection: Connection, owner: PublicKey | null) => {
  const [nfts, setNfts] = useState<unknown>([]);
  const fetchNFTs = useCallback(async () => {
    if (!owner) return;
    const metaplex = Metaplex.make(connection);
    const nft = await metaplex.nfts().findAllByOwner({ owner });
    // .then((res) => res[0]);
  }, [connection, owner]);

  useEffect(() => {
    let load = true;
    if (load) {
      load = false;
      fetchNFTs();
    }
  }, [fetchNFTs]);

  return { nfts };
};
export default useNFT;
