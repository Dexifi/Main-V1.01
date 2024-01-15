import {
  EnvironmentType,
  getProgramId,
} from "@solendprotocol/solend-sdk/index";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export const ENVIRONMENT =
  (process.env.NEXT_PUBLIC_REACT_APP_NETWORK as EnvironmentType) ||
  WalletAdapterNetwork.Devnet;

export const PROGRAM_ID = getProgramId(ENVIRONMENT).toBase58();
