import { useJupiterModal, useTradeModal } from "@/lib/stores/trade.store";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import formatedNumber from "@/lib/numbers";
import { FillType } from "@/types/market";
import { TradeState, useJupiterTrade } from "@/applications/Trade/store";
import { useEffect } from "react";
import { TokenType } from "@/stores/tokens";
import { TOKEN_LIST_URL } from "@jup-ag/core";

type HeaderProps = {
  isEXTRASMALL: boolean;
  currentMarket?: TradeState["marketDetails"];
  lastOrder?: FillType;
};

const JupiterHeader = ({
  lastOrder,
  currentMarket,
  isEXTRASMALL,
}: HeaderProps) => {
  const { onOpen } = useJupiterModal();
  const { tokenA, tokenB } = useJupiterTrade();
  useEffect(() => {
    const fetchTokens = async () => {
      const tokens: TokenType[] = await (
        await fetch(TOKEN_LIST_URL["mainnet-beta"])
      ).json();
      useJupiterTrade.setState({ tokenList: tokens });
    };
    fetchTokens();
  }, []);

  return (
    <div
      className={`grid ${
        isEXTRASMALL ? "grid-cols-1" : "grid-cols-2"
      } sm:grid-cols-2 md:grid-cols-4 px-4 py-5 rounded-xl gap-4 w-full`}
      style={{
        boxShadow: "0 0 4px #88d6ff",
      }}
    >
      <div className="flex flex-col gap-4 w-full">
        <h3 className="text-sm sm:text-lg md:text-2xl text-[#D9F8FF]">
          Base Token
        </h3>
        {/* Actions */}
        <div className="flex items-center w-full flex-wrap">
          <Button className="flex cursor-pointer  gap-1 " onClick={onOpen}>
            <img src={tokenA?.logoURI} alt={tokenA?.name} className="w-7 h-7" />
            <span>{tokenA?.symbol}</span>
            <ChevronDown className=" ml-2 w-6 h-6 aspect-square object-contain" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <h3 className="text-sm sm:text-lg md:text-2xl text-[#D9F8FF]">
          Quote Token
        </h3>
        {/* Actions */}
        <div className="flex items-center w-full flex-wrap">
          <Button className="flex cursor-pointer  gap-1 " onClick={onOpen}>
            <img src={tokenB?.logoURI} alt={tokenB?.name} className="w-7 h-7" />
            <span>{tokenB?.symbol}</span>
            <ChevronDown className=" ml-2 w-6 h-6 aspect-square object-contain" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h6 className="text-[#d9f8ff] text-sm md:text-lg">Total Value</h6>
        {/*  */}
        <span className="text-[#757788] text-sm md:text-lg">
          ${formatedNumber(currentMarket?.tvl ?? 0, 2, isEXTRASMALL)}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <h6 className="text-[#d9f8ff] text-sm md:text-lg">Last Order</h6>
        {lastOrder ? (
          <div className="flex gap-4">
            <span
              className={`text-sm md:text-lg ${
                lastOrder?.side.toUpperCase() === "BUY"
                  ? "text-[#88e8ad]"
                  : "text-[#c95901]"
              }`}
            >
              $
              {formatedNumber(
                lastOrder?.size * lastOrder.price,
                2,
                isEXTRASMALL
              )}
            </span>
            <ChevronUp
              className={`w-6 h-6 aspect-square object-contain  ${
                lastOrder?.side.toUpperCase() === "BUY"
                  ? "text-[#88e8ad]"
                  : "text-[#c95901] rotate-180"
              }`}
            />
          </div>
        ) : (
          "-"
        )}
      </div>
    </div>
  );
};

export default JupiterHeader;
