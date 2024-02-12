"use client";

import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  Farm,
  Lending,
  Liquidity,
  NFT,
  Networth,
  Staking,
  Trading,
  WalletBalance,
} from "./(blocks)";

type Props = {};

const DefaultTab = (props: Props) => {
  const isEXTRASMALL = useMediaQuery("(max-width: 420px)");

  return (
    <div className="flex flex-col w-full h-max min-h-screen items-center gap-5">
      {/*<Networth isEXTRASMALL={isEXTRASMALL} />*/}
      {/*<WalletBalance isEXTRASMALL={isEXTRASMALL} />*/}
      {/*<Staking isEXTRASMALL={isEXTRASMALL} />*/}
      {/*<Lending isEXTRASMALL={isEXTRASMALL} />*/}
      <Trading isEXTRASMALL={isEXTRASMALL} />
      {/*<Liquidity isEXTRASMALL={isEXTRASMALL} />*/}
      {/*<Farm isEXTRASMALL={isEXTRASMALL} />*/}
      {/*<NFT isEXTRASMALL={isEXTRASMALL} />*/}
    </div>
  );
};

export default DefaultTab;
