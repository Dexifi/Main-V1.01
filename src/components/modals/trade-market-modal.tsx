"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useTradeModal } from "@/lib/stores/trade.store";
import { Info, X } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import Image from "next/image";
import { removeMiddleString } from "@/lib/string";
import { Input } from "../ui/input";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type Props = {
  markets?: any;
};

const filterData = (data: any, searchValue: string) =>
  data.filter((token: any) =>
    token.name.concat(token.body).includes(searchValue)
  );

const TradeMarketModal = ({ markets }: Props) => {
  const isSmall = useMediaQuery("(max-width: 720px)");
  const isEXTRASMALL = useMediaQuery("(max-width: 420px)");
  const { isMarketOpen, onMarketClose } = useTradeModal();
  const [search, setSearch] = useState("");
  const { setMarketID } = useTradeModal();

  const swap_modal = {
    title: "Markets List",
  };

  return (
    <Dialog open={isMarketOpen} onOpenChange={onMarketClose}>
      <DialogContent
        className={`bg-[#0d111b] ${
          isEXTRASMALL ? "max-w-xs" : "max-w-md"
        } sm:max-w-lg z-[110] rounded-xl`}
        style={{ boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)" }}
      >
        <div className="flex justify-between flex-col gap-3">
          <div className="flex justify-between items-center">
            <h6 className="text-lg text-[#d9f8ff]">{swap_modal.title}</h6>
            <Button
              size="icon"
              className="rounded-full hover:bg-[#d9f8ff20] transition-all"
              onClick={onMarketClose}
            >
              <X className="w-6 h-6 aspect-square object-contain" />
            </Button>
          </div>
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search by Token or paste address"
            className="bg-slate-900 outline-none text-[#d9f8ff]"
          />
          {markets && (
            <div className="flex flex-col gap-3 overflow-y-scroll max-h-96">
              {filterData(markets, search).map((item: any, index: number) => (
                <Button
                  key={index}
                  onClick={async () => {
                    setMarketID(item.address);
                    onMarketClose();
                  }}
                  className={`flex justify-between py-4 md:py-7 rounded-xl flex-col sm:flex-row h-max gap-4 items-start sm:items-center`}
                >
                  <div className="flex justify-between items-center bg-[#0d111b] px-5 py-2 rounded-xl gap-2 min-w-full sm:min-w-[244px]">
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
                    <div className="flex gap-2 flex-1 text-xs">
                      <div>{item.name.split("/")[0]}</div>
                      <div>{item.name.split("/")[1]}</div>
                    </div>
                    {!isEXTRASMALL && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-6 h-6 aspect-square object-contain text-muted" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{item.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <div className="text-xs flex-1 text-start pl-4">
                    Market ID :{" "}
                    {item.address &&
                      removeMiddleString(item.address.toString())}
                  </div>
                </Button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TradeMarketModal;
