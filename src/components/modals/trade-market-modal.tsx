"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useTradeModal } from "@/lib/stores/trade.store";
import { Info, X } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import Image from "next/image";
import { removeMiddleString } from "@/lib/string";
import { Input } from "../ui/input";
import { memo, useCallback, useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { MarketsListType } from "@/applications/Trade/types";
import { useAtomValue } from "jotai";
import { exploreAtom } from "@/stores/config";
import {
  getMarket,
  getMarketBAF,
  getMarketDetails,
  useTrade,
} from "@/applications/Trade";
import { LinearProgress } from "@mui/material";

type Props = {
  markets: MarketsListType;
};

const filterData = (data: any, searchValue: string) =>
  data.filter((token: any) =>
    token.name.concat(token.body).includes(searchValue)
  );

const TradeMarketModal = memo(({ markets }: Props) => {
  const isSmall = useMediaQuery("(max-width: 720px)");
  const isEXTRASMALL = useMediaQuery("(max-width: 420px)");
  const { isMarketOpen, onMarketClose } = useTradeModal();
  const [search, setSearch] = useState("");
  const explore = useAtomValue(exploreAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const swap_modal = {
    title: "Markets List",
  };

  const handleAdd = useCallback(
    async (marketID: string) => {
      setCurrentAddress(marketID);
      setLoading(true);
      const newMarket = await getMarket(marketID);
      if (!marketID || !newMarket) return;
      await getMarket(marketID);
      await getMarketBAF(newMarket);
      await getMarketDetails(newMarket);
      // await getTokens(publicKey?.toBase58() || "");
      setLoading(false);
      onMarketClose();
    },
    [onMarketClose]
  );

  useEffect(() => {
    const ad = useTrade.getState().marketDetails.address?.toString();
    if (ad) {
      setCurrentAddress(ad);
    }
  }, []);

  return (
    <Dialog open={isMarketOpen} onOpenChange={onMarketClose}>
      <DialogContent
        className={`bg-[#0d111b] ${
          isEXTRASMALL ? "max-w-xs" : "max-w-md"
        } z-[110] rounded-xl p-0`}
        style={{
          boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)",
          borderColor: "rgba(171,196,255,0.5",
        }}
      >
        <div className="flex justify-between relative flex-col gap-3">
          <div className="flex justify-between items-center p-4 pb-0">
            <h4 className="text-sm text-[#d9f8ff]">{swap_modal.title}</h4>
            <Button
              size="icon"
              className="rounded-full hover:bg-[#d9f8ff20] transition-all h-6 w-6"
              onClick={onMarketClose}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_109_2230)">
                  <path
                    d="M10 1.875C12.1549 1.875 14.2215 2.73102 15.7452 4.25476C17.269 5.77849 18.125 7.84512 18.125 10C18.125 12.1549 17.269 14.2215 15.7452 15.7452C14.2215 17.269 12.1549 18.125 10 18.125C7.84512 18.125 5.77849 17.269 4.25476 15.7452C2.73102 14.2215 1.875 12.1549 1.875 10C1.875 7.84512 2.73102 5.77849 4.25476 4.25476C5.77849 2.73102 7.84512 1.875 10 1.875ZM10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20ZM6.83594 6.83594C6.46875 7.20312 6.46875 7.79687 6.83594 8.16016L8.67188 9.99609L6.83594 11.832C6.46875 12.1992 6.46875 12.793 6.83594 13.1562C7.20312 13.5195 7.79687 13.5234 8.16016 13.1562L9.99609 11.3203L11.832 13.1562C12.1992 13.5234 12.793 13.5234 13.1562 13.1562C13.5195 12.7891 13.5234 12.1953 13.1562 11.832L11.3203 9.99609L13.1562 8.16016C13.5234 7.79297 13.5234 7.19922 13.1562 6.83594C12.7891 6.47266 12.1953 6.46875 11.832 6.83594L9.99609 8.67188L8.16016 6.83594C7.79297 6.46875 7.19922 6.46875 6.83594 6.83594Z"
                    fill="#757788"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_109_2230">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Button>
          </div>
          <div className={"px-4"}>
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search by Token or paste address"
              className="bg-slate-900 outline-none text-[#757788] rounded-2xl border-[#757788]"
            />
          </div>
          {markets && (
            <div className="flex flex-col overflow-y-scroll max-h-96 scrollbar-none">
              {filterData(markets, search).map((item: any, index: number) => (
                <Button
                  key={index}
                  onClick={() => {
                    handleAdd(item.address);
                  }}
                  className={`flex justify-between py-4 md:py-7 flex-col rounded-none sm:flex-row min-h-20 gap-4 items-start sm:items-center relative overflow-clip ${
                    currentAddress === item.address.toString()
                      ? "bg-[#162853]"
                      : ""
                  } ${
                    index % 2 === 0
                      ? "[background:rgba(48,66,86,0.40)]"
                      : "bg-[#0D111B]"
                  } `}
                >
                  <div className="flex justify-between items-center bg-[#0d111b] px-5 py-1.5 rounded-2xl gap-2 min-w-full sm:min-w-[244px] shadow-[0px_0px_5px_0px_rgba(217,248,255,0.25)]">
                    <div className="flex gap-2">
                      {item.tokenA ? (
                        <Image
                          width={24}
                          height={24}
                          className="w-6 h-6 aspect-square object-contain"
                          alt=""
                          src={item.tokenA?.logoURI}
                        />
                      ) : (
                        <Skeleton className="w-6 h-6 aspect-square object-contain bg-[#d9f8ff20]" />
                      )}
                      {item.tokenB ? (
                        <Image
                          width={24}
                          height={24}
                          className="w-6 h-6 aspect-square object-contain"
                          alt=""
                          src={item.tokenB?.logoURI}
                        />
                      ) : (
                        <Skeleton className="w-6 h-6 aspect-square object-contain bg-[#d9f8ff20]" />
                      )}
                    </div>
                    <div className="flex flex-row flex-1 text-xs w-full justify-around">
                      <div>{item.name.split("/")[0]}</div>
                      <div>{item.name.split("/")[1]}</div>
                    </div>
                  </div>
                  <div className="text-xs flex-1 text-start text-[#D9F8FF]">
                    Market ID :{" "}
                    {item.address && (
                      <a
                        href={`${explore}account/${item.address}`}
                        target={"_blank"}
                        className={"hover:underline"}
                      >
                        {removeMiddleString(item.address.toString())}
                      </a>
                    )}
                  </div>
                  {loading && currentAddress === item.address.toString() && (
                    <LinearProgress
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: "#1c2438",
                      }}
                      classes={{ bar: "!bg-[#78bcb9]" }}
                      variant={"indeterminate"}
                    />
                  )}
                </Button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
});
TradeMarketModal.displayName = "TradeMarketModal";
export default TradeMarketModal;
