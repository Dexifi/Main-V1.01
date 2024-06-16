import { PropsWithChildren, useEffect } from "react";
import {
  getMarketBAF,
  initialJupiterTrade,
  initialTrade,
} from "@/applications/Trade/initial";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "@/components/ui/use-toast";
import {
  TradingProviders,
  useSelectedProvider,
  useTrade,
} from "@/applications/Trade/store";

const TradeProvider = ({ children }: PropsWithChildren) => {
  const { wallet } = useWallet();
  const { selectedProvider } = useSelectedProvider();

  useEffect(() => {
    let intervalFetch: NodeJS.Timer;
    (async () => {
      if (wallet) {
        if (selectedProvider === TradingProviders.JUP) {
          await initialJupiterTrade(wallet);
        } else {
          await initialTrade(wallet);
          intervalFetch = setInterval(async () => {
            await getMarketBAF(useTrade.getState().market);
          }, 5000);
        }
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

  // useEffect(() => {
  //   console.log("re-initial", useTrade.getState().marketDetails.address);
  //   console.log(useTrade.getState().marketDetails.address);
  //
  //   if (wallet) {
  //     if (selectedProvider === TradingProviders.OPENBOOK) {
  //       useTrade.getState().marketDetails.address === null &&
  //         (async () => {
  //           await initialTrade(wallet);
  //           setLoading(false);
  //         })();
  //     }
  //   } else {
  //     toast({
  //       description: "Please connect your wallet",
  //       variant: "destructive",
  //       duration: 10000,
  //     });
  //   }
  // }, [wallet]);

  return <>{children}</>;
};

export default TradeProvider;
