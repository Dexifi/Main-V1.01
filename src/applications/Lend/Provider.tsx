import { PropsWithChildren, useEffect } from "react";
import InitialLending from "@/applications/Lend/initial";
import { connection } from "@/lib/get-connections";
import { useWallet } from "@solana/wallet-adapter-react";

const LendingProvider = ({ children }: PropsWithChildren) => {
  const { publicKey } = useWallet();
  useEffect(() => {
    InitialLending(connection, publicKey);
  }, [publicKey]);

  return <>{children}</>;
};

export default LendingProvider;
