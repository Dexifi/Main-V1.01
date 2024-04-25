import { useEffect } from "react";
import initial from "@/applications/Liquidity/initial";
import { connection } from "@/lib/get-connections";
import { useWallet } from "@solana/wallet-adapter-react";

let load = true;
const LiquidityProvider = ({ children }: any) => {
  const { publicKey } = useWallet();
  useEffect(() => {
    if (connection && load && publicKey) {
      initial(connection, publicKey);
      load = false;
    }
  }, [publicKey]);

  return children;
};

export default LiquidityProvider;
