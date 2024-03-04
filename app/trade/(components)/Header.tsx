import { useTradeModal } from "@/lib/stores/trade.store";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import formatedNumber from "@/lib/numbers";
import {
  DecodedMarketType,
  FillType,
  SelectedMarketType,
} from "@/types/market";
import OrderBook from "./OrderBook";
import { TradeState } from "@/applications/Trade/store";

type HeaderProps = {
  isEXTRASMALL: boolean;
  currentMarket?: TradeState["marketDetails"];
  lastOrder?: FillType;
};

const Header = ({ lastOrder, currentMarket, isEXTRASMALL }: HeaderProps) => {
  const { onMarketOpen, onImportMarketOpen } = useTradeModal();

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
          Market
        </h3>
        {/* Actions */}
        <div className="flex gap-4 items-center w-full flex-wrap">
          <Button className="flex gap-4 cursor-pointer" onClick={onMarketOpen}>
            <span>{currentMarket?.name}</span>
            <ChevronDown className="w-6 h-6 aspect-square object-contain" />
          </Button>
          <Button
            size="icon"
            className="flex gap-4 cursor-pointer min-w-[40px]"
            onClick={onImportMarketOpen}
          >
            <Plus className="w-6 h-6 aspect-square object-contain" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h6 className="text-[#d9f8ff] text-sm md:text-lg">
          {currentMarket?.name}
        </h6>
        {/* ICONS */}
        <div className="flex gap-4 items-center">
          {currentMarket?.tokenA ? (
            <Image
              src={currentMarket.tokenA?.logoURI ?? ""}
              alt={`${currentMarket.tokenA.symbol}-logo / main`}
              width={36}
              height={36}
              className="w-9 h-9 aspect-square object-contain"
            />
          ) : (
            <Skeleton className="w-9 h-9 aspect-square bg-[#d9f8ff44]" />
          )}

          {currentMarket?.tokenB ? (
            <Image
              src={currentMarket?.tokenB?.logoURI ?? ""}
              alt={`${currentMarket?.tokenB.symbol}-logo / main`}
              width={36}
              height={36}
              className="w-9 h-9 aspect-square object-contain"
            />
          ) : (
            <Skeleton className="w-9 h-9 aspect-square bg-[#d9f8ff44]" />
          )}
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

export default Header;
