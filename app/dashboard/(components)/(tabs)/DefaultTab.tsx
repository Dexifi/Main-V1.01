"use client";

import { useMediaQuery } from "usehooks-ts";
import {
  Lending,
  Staking,
  Liquidity,
  Trading,
  WalletBalance,
  Farm,
  NFT,
  Networth,
} from "./(blocks)";
import DashboardProvider from "@/applications/Dashboard/Provider";

type Props = {};

const DefaultTab = (props: Props) => {
  const isEXTRASMALL = useMediaQuery("(max-width: 420px)");

  return (
    <DashboardProvider>
      <div className="flex flex-col w-full  h-max min-h-screen items-center gap-5">
        <Networth isEXTRASMALL={isEXTRASMALL} />
        <WalletBalance isEXTRASMALL={isEXTRASMALL} />
        <Staking isEXTRASMALL={isEXTRASMALL} />
        <Lending isEXTRASMALL={isEXTRASMALL} />
        <Trading isEXTRASMALL={isEXTRASMALL} />
        <Liquidity isEXTRASMALL={isEXTRASMALL} />
        <Farm isEXTRASMALL={isEXTRASMALL} />
        <NFT isEXTRASMALL={isEXTRASMALL} />
      </div>
    </DashboardProvider>
  );
};

export default DefaultTab;
