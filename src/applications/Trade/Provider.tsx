import { PropsWithChildren, useEffect, useState } from "react";
import initialTrade, { getMarketBAF } from "@/applications/Trade/initial";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "@/components/ui/use-toast";
import { useTrade } from "@/applications/Trade/store";

const TradeProvider = ({ children }: PropsWithChildren) => {
  const { wallet } = useWallet();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    let intervalFetch: NodeJS.Timer;
    (async () => {
      if (wallet) {
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
  }, [wallet, loading]);

  useEffect(() => {
    console.log("re-initial", useTrade.getState().marketDetails.address);
    console.log(useTrade.getState().marketDetails.address);
    if (wallet) {
      useTrade.getState().marketDetails.address === null &&
        (async () => {
          await initialTrade(wallet);
          setLoading(false);
        })();
    } else {
      toast({
        description: "Please connect your wallet",
        variant: "destructive",
        duration: 10000,
      });
    }
  }, [wallet]);

  return <>{children}</>;
};

export default TradeProvider;
