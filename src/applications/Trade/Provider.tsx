import { PropsWithChildren, useEffect } from "react";
import initialTrade, { getMarketBAF } from "@/applications/Trade/initial";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "@/components/ui/use-toast";
import { useTrade } from "@/applications/Trade/store";

const TradeProvider = ({ children }: PropsWithChildren) => {
  const { wallet } = useWallet();
  useEffect(() => {
    let intervalFetch: NodeJS.Timer;
    (async () => {
      if (wallet) {
        await initialTrade(wallet);
        intervalFetch = setInterval(async () => {
          await getMarketBAF(useTrade.getState().market);
        }, 10000);
      } else {
        toast({
          description: "Please connect your wallet",
          variant: "destructive",
        });
      }
      return () => {
        clearInterval(intervalFetch);
      };
    })();
  }, [wallet]);

  return <>{children}</>;
};

export default TradeProvider;
