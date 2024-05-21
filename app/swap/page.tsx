"use client";

import DashboardProvider from "@/components/providers/dashboard-provider";
import { Toaster } from "@/components/ui/toaster";
import { useIsClient, useMediaQuery } from "usehooks-ts";
import { Header } from "../dashboard/(components)";
import { SwapBody, SwapFooter } from "./(components)";
import { JupiterProvider } from "@jup-ag/react-hook";
import { connection } from "@/lib/get-connections";
import { useWallet } from "@solana/wallet-adapter-react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useCallback, useState } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
type Props = {};

const SwapPage = (props: Props) => {
  const isMobile = useMediaQuery("(max-width: 990px)");
  const isEXTRASMALL = useMediaQuery("(max-width: 370px)");
  const [showFrame, setShowFrame] = useState<boolean>(false);
  const isClient = useIsClient();

  const handleShowIframe = useCallback(() => {
    setShowFrame((prevShowFrame) => !prevShowFrame);
  }, []);
  return (
    <DashboardProvider>
      <Toaster />
      <div className="bg-[#0d111b] relative min-h-screen w-full flex items-center flex-col">
        {isClient && <Header isMobile={isMobile} />}
        <div className="container relative w-full max-w-full pt-4 overflow-x-hidden mb-12">
          <div
            className={
              "flex flex-col text-[#D9F8FF] absolute right-0 top-1/4 [background:#121C2B] shadow-[0px_0px_5px_0px_rgba(217,248,255,0.25)] rounded-[25px_0px_0px_25px] py-1 px-8 z-50"
            }
          >
            <div
              className={
                "flex flex-row items-center text-xl gap-2 justify-between w-full"
              }
            >
              <div className={"flex flex-row w-full"}>
                {showFrame ? (
                  <KeyboardDoubleArrowRightIcon
                    sx={{ fontSize: 20, mr: 1 }}
                    onClick={handleShowIframe}
                    className={"cursor-pointer"}
                  />
                ) : (
                  <KeyboardDoubleArrowLeftIcon
                    sx={{ fontSize: 20, mr: 1 }}
                    onClick={handleShowIframe}
                    className={"cursor-pointer"}
                  />
                )}
              </div>
              <div
                className={
                  "flex flex-row w-full justify-end gap-3 items-center"
                }
              >
                <img
                  src={
                    "https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                  }
                  width={24}
                  height={24}
                  className={"rounded-full"}
                />
                <img
                  src={
                    "https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                  }
                  width={24}
                  height={24}
                  className={"rounded-full"}
                />
                <div className={"flex flex-row text-xl items-center"}>
                  <p>SOL</p>
                  <p>-</p>
                  <p>USDC</p>
                </div>
              </div>
            </div>

            {showFrame && (
              <div
                className={
                  "text-white flex flex-row justify-end mt-3 w-[600px] z-90"
                }
              >
                <iframe
                  width="100%"
                  height="600"
                  src="https://birdeye.so/tv-widget/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263?chain=solana&chartType=area&chartInterval=3&chartLeftToolbar=show"
                  frameBorder="0"
                  allowFullScreen
                  className={"pb-3"}
                ></iframe>
              </div>
            )}
          </div>
          <div
            className="absolute -top-40 left-[calc(50% - 866px)] w-[54rem] h-[32rem] lg:h-[64rem] overflow-hidden"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(119, 186, 234, 0.2), transparent ), radial-gradient( 50% 50% at 50% 50%, rgba(251, 0, 196, 0) 3.49%, rgba(119, 186, 234, 0) 7.6%, rgba(253, 0, 197, 0) 10.46%, rgba(119, 186, 234, 0) 14.46%, rgba(255, 0, 199, 0) 18.56%, rgba(3, 0, 3, 0) 19.53%, transparent 79.82%, rgba(246, 0, 192, 0) 81.08%, rgba(119, 186, 234, 0) 84.04%, rgba(247, 0, 193, 0) 86.61%, rgba(119, 186, 234, 0) 91.01%, rgba(249, 0, 194, 0) 95.16%, rgba(119, 186, 234, 0) 98.6% )",
            }}
          />
          {isClient && <SwapBody isEXTRASMALL={isEXTRASMALL} />}
          {isClient && <SwapFooter />}
        </div>
      </div>
    </DashboardProvider>
  );
};

export default SwapPage;
