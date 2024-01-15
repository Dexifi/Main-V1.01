import { SettingsModal, SwapModal } from "@/components/modals";
import { NETWORK } from "@/lib/endpoints";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import {
  CoinbaseWalletAdapter,
  LedgerWalletAdapter,
  LedgerWalletAdapterConfig,
  PhantomWalletAdapter,
  SafePalWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

const WalletProvider = dynamic(
  () => import("@/components/providers/client-wallet-provider"),
  {
    ssr: false,
  }
);

type Props = {
  children: React.ReactNode;
};

const DashboardProvider = ({ children }: Props) => {
  const network = WalletAdapterNetwork.Mainnet;
  const walletAdapters = useMemo(
    () => [
      new PhantomWalletAdapter({ network }),
      new SolflareWalletAdapter({ network }),
      new SafePalWalletAdapter({ network }),
      new LedgerWalletAdapter({ network } as LedgerWalletAdapterConfig),
      new CoinbaseWalletAdapter({ network }),
    ],
    [network]
  );
  return (
    <ConnectionProvider endpoint={NETWORK}>
      <WalletProvider autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default DashboardProvider;
