import { NETWORK } from "@/lib/endpoints";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { SettingsModal } from "@/components/modals";

const WalletProvider = dynamic(() => import("./client-wallet-provider"), {
  ssr: false,
});

type Props = {
  children: React.ReactNode;
};

const DashboardProvider = ({ children }: Props) => {
  return (
    <ConnectionProvider endpoint={NETWORK}>
      <WalletProvider autoConnect>{children}</WalletProvider>
      <SettingsModal />
    </ConnectionProvider>
  );
};

export default DashboardProvider;
