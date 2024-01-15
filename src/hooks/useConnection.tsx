import * as SolanaWeb3 from "@solana/web3.js";
import { SOLANA_MAIN } from "@/lib/endpoints";
import { useAtom } from "jotai";
import { connectionAtom } from "@/stores/settings";

type FN = (endpoint?: string) => {
  connection: SolanaWeb3.Connection;
  getAirDrop: (publicKey: SolanaWeb3.PublicKey) => Promise<void>;
};

const useConnection: FN = () => {
  const [connection] = useAtom(connectionAtom);
  const getAirDrop = async (publicKey: SolanaWeb3.PublicKey) => {
    const signature = await connection.requestAirdrop(
      publicKey,
      SolanaWeb3.LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(signature);
  };

  return {
    connection,
    getAirDrop,
  };
};
export default useConnection;
