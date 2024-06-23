import { PropsWithChildren, useEffect } from "react";
import {
  getMarketBAF,
  initialJupiterTrade,
  initialTrade,
} from "@/applications/Trade/initial";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "@/components/ui/use-toast";
import { useSelectedProvider, useTrade } from "@/applications/Trade/store";

const TradeProvider = ({ children }: PropsWithChildren) => {
  const { wallet } = useWallet();
  const { selectedProvider } = useSelectedProvider();

  useEffect(() => {
    let intervalFetch: NodeJS.Timeout;
    (async () => {
      if (selectedProvider === "JUP") {
        await initialJupiterTrade(wallet);
      } else if (wallet) {
        await initialTrade(wallet);
        intervalFetch = setInterval(async () => {
          await getMarketBAF(useTrade.getState().market);
        }, 5000);
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
  }, [wallet, selectedProvider]);

  return <>{children}</>;
};

export default TradeProvider;
