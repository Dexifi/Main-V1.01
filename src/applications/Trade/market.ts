import { PublicKey } from "@solana/web3.js";

export function getSelectedTokenAccountForMint(
  accounts: any,
  mint: PublicKey | undefined,
  selectedPubKey?: string | PublicKey | null
) {
  if (!accounts || !mint) {
    return null;
  }
  const filtered = accounts.filter(
    ({ effectiveMint, pubkey }: any) =>
      mint.equals(effectiveMint) &&
      (!selectedPubKey ||
        (typeof selectedPubKey === "string"
          ? selectedPubKey
          : selectedPubKey.toBase58()) === pubkey.toBase58())
  );
  return filtered && filtered[0];
}
