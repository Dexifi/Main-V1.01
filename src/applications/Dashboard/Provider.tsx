import { PropsWithChildren, useEffect } from "react";
import { initialData } from "@/applications/Dashboard";
import { useWallet } from "@solana/wallet-adapter-react";
import { BaseWalletAdapter } from "@solana/wallet-adapter-base";

const DashboardProvider = ({ children }: PropsWithChildren) => {
  const { wallet, publicKey } = useWallet();

  useEffect(() => {
    if (wallet?.readyState === "Installed" && publicKey) {
      initialData(wallet?.adapter as BaseWalletAdapter);
    }
  }, [publicKey, wallet]);

  return <div>{children}</div>;
};

export default DashboardProvider;
