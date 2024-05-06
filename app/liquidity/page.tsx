"use client";

import DashboardProvider from "@/components/providers/dashboard-provider";
import { Toaster } from "@/components/ui/toaster";
import { useIsClient, useMediaQuery } from "usehooks-ts";
import { Header } from "../dashboard/(components)";
import { LiquidityBody } from "./(components)";
import LiquidityProvider from "@/applications/Liquidity/Provider";

type Props = {};

const LiquidityPage = (props: Props) => {
  const isMobile = useMediaQuery("(max-width: 990px)");
  const isEXTRASMALL = useMediaQuery("(max-width: 370px)");
  const isClient = useIsClient();
  return (
    <DashboardProvider>
      <Toaster />
      <LiquidityProvider>
        <div className="bg-[#0d111b] relative min-h-screen w-full flex items-center flex-col">
          {isClient && <Header isMobile={isMobile} />}
          <div className="container relative w-full max-w-full pt-4 overflow-x-hidden mb-12 w-full">
            {isClient && <LiquidityBody isEXTRASMALL={isEXTRASMALL} />}
          </div>
        </div>
      </LiquidityProvider>
    </DashboardProvider>
  );
};

export default LiquidityPage;
