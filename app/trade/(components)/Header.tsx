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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
type HeaderProps = {
  isEXTRASMALL: boolean;
  currentMarket?: TradeState["marketDetails"];
  lastOrder?: FillType;
};

const Header = ({ lastOrder, currentMarket, isEXTRASMALL }: HeaderProps) => {
  const { onMarketOpen, onImportMarketOpen } = useTradeModal();

  return (
    <div
      className={"flex flex-row px-4 rounded-xl w-full z-40 py-3"}
      style={{
        boxShadow: "0 0 4px #88d6ff",
      }}
    >
      <div className="flex flex-col gap-4 w-full">
        <p className="text-sm text-[#757788]">Market</p>
        {/* Actions */}
        <div className="flex gap-4 items-center w-full">
          <Button
            className="flex w-full justify-between gap-4 cursor-pointer border rounded-full border-[#757788] shadow-[0px_0px_5px_0px_rgba(217,248,255,0.50)]"
            onClick={onMarketOpen}
          >
            <span className={"text-[#757788]"}>{currentMarket?.name}</span>
            <div className={"ml-4"}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Vector"
                  d="M10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0ZM14.7227 11.5078L10.5391 15.4102C10.3906 15.5469 10.1992 15.625 10 15.625C9.80078 15.625 9.60547 15.5469 9.46094 15.4102L5.27734 11.5078C5.10156 11.3438 5 11.1133 5 10.8711C5 10.3906 5.39062 10 5.87109 10H8.125V6.25C8.125 5.55859 8.68359 5 9.375 5H10.625C11.3164 5 11.875 5.55859 11.875 6.25V10H14.1289C14.6094 10 15 10.3906 15 10.8711C15 11.1133 14.8984 11.3438 14.7227 11.5078Z"
                  fill="#757788"
                />
              </svg>
            </div>
          </Button>
          <Button
            size="icon"
            className="flex gap-4 cursor-pointer w-[20px] h-[20px]"
            onClick={onImportMarketOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="circle-plus-solid 1">
                <g>
                  <path
                    id="Vector"
                    d="M10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20ZM9.0625 13.4375V10.9375H6.5625C6.04297 10.9375 5.625 10.5195 5.625 10C5.625 9.48047 6.04297 9.0625 6.5625 9.0625H9.0625V6.5625C9.0625 6.04297 9.48047 5.625 10 5.625C10.5195 5.625 10.9375 6.04297 10.9375 6.5625V9.0625H13.4375C13.957 9.0625 14.375 9.48047 14.375 10C14.375 10.5195 13.957 10.9375 13.4375 10.9375H10.9375V13.4375C10.9375 13.957 10.5195 14.375 10 14.375C9.48047 14.375 9.0625 13.957 9.0625 13.4375Z"
                    fill="#757788"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_109_2004">
                  <rect width="20" height="20" rx="10" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Button>
        </div>
      </div>
      <div className={"flex flex-row justify-center w-full items-center"}>
        <div className="flex flex-col gap-4 items-center">
          <h6 className="text-[#d9f8ff] text-sm">{currentMarket?.name}</h6>
          {/* ICONS */}
          <div className="flex gap-4 items-center">
            {currentMarket?.tokenA ? (
              <Image
                src={currentMarket.tokenA?.logoURI ?? ""}
                alt={`${currentMarket.tokenA.symbol}-logo / main`}
                width={22}
                height={22}
                className="aspect-square object-contain rounded-full"
              />
            ) : (
              <Skeleton className="w-9 h-9 aspect-square bg-[#d9f8ff44]" />
            )}

            {currentMarket?.tokenB ? (
              <Image
                src={currentMarket?.tokenB?.logoURI ?? ""}
                alt={`${currentMarket?.tokenB.symbol}-logo / main`}
                width={22}
                height={22}
                className="aspect-square object-contain rounded-full"
              />
            ) : (
              <Skeleton className="w-9 h-9 aspect-square bg-[#d9f8ff44]" />
            )}
          </div>
        </div>
      </div>

      <div className={"flex flex-row justify-center w-full items-center"}>
        <div className="flex flex-col gap-4 items-center">
          <h6 className="text-[#D9F8FF] text-sm">Total Volume</h6>
          {/*  */}
          <span className="text-[#757788] text-sm">
            ${formatedNumber(currentMarket?.tvl ?? 0, 2, isEXTRASMALL)}
          </span>
        </div>
      </div>

      <div className={"flex flex-row justify-center w-full items-center"}>
        <div className="flex flex-col gap-4">
          <h6 className="text-[#d9f8ff] text-sm">Last Order</h6>
          {lastOrder ? (
            <div className="flex flex-row items-center justify-center">
              <span
                className={`text-sm ${
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
              <ArrowUpwardIcon
                className={`w-6 h-6 aspect-square object-contain ml-1  ${
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
    </div>
  );
};

export default Header;
