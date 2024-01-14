"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSwapModal } from "@/lib/stores/swap.store";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { getPrice } from "@/lib/get-wallet";
import { Skeleton } from "../ui/skeleton";

type Props = {
  tokens: any;
  setToken: any;
  firstToken: any;
  secondToken: any;
};

const filterData = (data: any, searchValue: string) =>
  data.filter(
    (token: any) =>
      token.symbol.concat(token.body).includes(searchValue) ||
      token.address.concat(token.body).includes(searchValue)
  );

const SwapModal = ({ tokens, setToken, firstToken, secondToken }: Props) => {
  const [search, setSearch] = useState("");
  const { isOpen, onClose } = useSwapModal();

  tokens &&
    tokens.sort((a: any, b: any) => {
      if (a.balance != null && b.balance != null) {
        return b.balance - a.balance;
      } else if (a.balance != null && b.balance == null) {
        return -1;
      } else if (a.balance == null && b.balance != null) {
        return 1;
      } else {
        return 0;
      }
    });
  const setDefaultTokens = async (tokenSymbol: string) => {
    const thisToken = tokens.find((item: any) => item.symbol === tokenSymbol);
    if (
      firstToken.symbol !== thisToken.symbol &&
      secondToken.symbol !== thisToken.symbol
    )
      setToken(thisToken);
  };
  const swap_modal = {
    title: "Token List",
    tokens: ["USDT", "USDC", "DRACO"],
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-[#0d111b] max-w-xs md:max-w-lg z-[110] rounded-2xl p-4 sm:p-5"
        style={{ boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)" }}
      >
        <div className="flex justify-between flex-col gap-3">
          <div className="flex justify-between tokens-center">
            <h6 className="text-lg text-[#d9f8ff]">{swap_modal.title}</h6>
            <Button
              size="icon"
              className="rounded-full hover:bg-[#d9f8ff20] transition-all"
              onClick={onClose}
            >
              <X className="w-6 h-6 aspect-square object-contain" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search by Token or paste address"
            className="bg-slate-900 outline-none text-[#d9f8ff]"
          />
          <div className="flex gap-4 flex-wrap">
            {swap_modal.tokens.slice(0, 6).map((token: any) => (
              <Button
                key={`${token}-default`}
                size={"lg"}
                className="flex gap-3 tokens-center px-4 rounded-full hover:bg-[#d9f8ff20] transition-all"
                onClick={() => setDefaultTokens("USDC")}
                style={{
                  boxShadow: "0 0 5px rgba(217, 248, 255, 0.25)",
                }}
              >
                {token.logoURI ? (
                  <Image
                    src={token.logoURI}
                    alt={`${token.symbol} / icon`}
                    width={24}
                    height={24}
                    className="w-6 h-6 aspect-square object-contain hidden md:flex"
                  />
                ) : (
                  <Skeleton className="w-6 h-6 aspect-square object-contain bg-[#d9f8ff20]" />
                )}
                <span className="text-sm font-medium text-[#d9f8ff]">
                  {token.symbol}
                </span>
              </Button>
            ))}
          </div>
          {/*  */}
          <div className="w-full h-[1px] bg-[#727382] rounded-full" />
          {/*  */}
        </div>
        {tokens && (
          <div className="flex flex-col w-full max-h-96 overflow-y-scroll ">
            <div className="grid md:grid-cols-2 gap-4 w-full pr-4">
              {filterData(tokens, search)
                .slice(0, 90)
                .map((token: any) => (
                  <Button
                    key={token.address}
                    className="flex justify-start w-full gap-4"
                    onClick={() => {
                      if (
                        token.symbol !== firstToken.symbol &&
                        token.symbol !== secondToken.symbol
                      )
                        (async () => {
                          token.price = await getPrice(token.symbol);
                          await setToken(token);
                          onClose();
                        })();
                    }}
                  >
                    {token.logoURI ? (
                      <Image
                        src={token.logoURI}
                        alt={`${token.symbol} / icon`}
                        width={24}
                        height={24}
                        className="w-6 h-6 aspect-square object-contain flex rounded-md"
                      />
                    ) : (
                      <Skeleton className="w-6 h-6 aspect-square object-contain bg-[#d9f8ff20]" />
                    )}
                    <span className="text-sm text-[#d9f8ff]">
                      {token.symbol}
                    </span>
                  </Button>
                ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SwapModal;
