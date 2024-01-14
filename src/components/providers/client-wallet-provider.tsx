import type { WalletProviderProps } from "@solana/wallet-adapter-react";
import { WalletContext, WalletProvider } from "@solana/wallet-adapter-react";

import { NETWORK } from "@/lib/endpoints";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { useMemo } from "react";
import ModalProvider from "./modal-provider";

export function ClientWalletProvider(
  props: Omit<WalletProviderProps, "wallets">
): JSX.Element {
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [NETWORK]
  );

  return (
    <WalletProvider wallets={wallets} {...props}>
      <WalletModalProvider {...props} />
      <ModalProvider />
    </WalletProvider>
  );
}

export default ClientWalletProvider;
