"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { useAtom } from "jotai";
import { tokenAtom, TokenType } from "@/stores/tokens";
import { mainTokens } from "@/configuration/tokens";
import { useJupiterModal } from "@/lib/stores/trade.store";
import { createJupiterApiClient } from "@jup-ag/api";
import axios from "@/data/axios";
import { TOKEN_LIST_URL } from "@jup-ag/core";
import { useJupiterTrade } from "@/applications/Trade/store";
import { TokenInfo } from "@solana/spl-token-registry";

const client = createJupiterApiClient();
const filterData = (data: TokenType[], searchValue: string) =>
  data.filter(
    (token: TokenType) =>
      token.symbol
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase()) ||
      token.address
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase())
  );

const JupiterTradeModal = () => {
  const [search, setSearch] = useState("");

  const { tokenList } = useJupiterTrade();
  const { open, onClose, target } = useJupiterModal();

  tokenList.length > 0
    ? tokenList.sort((a: any, b: any) => {
        if (a.balance != null && b.balance != null) {
          return b.balance - a.balance;
        } else if (a.balance != null && b.balance == null) {
          return -1;
        } else if (a.balance == null && b.balance != null) {
          return 1;
        } else {
          return 0;
        }
      })
    : [];

  const swap_modal = {
    title: "Token List",
    tokens: mainTokens,
  };

  const handleSelect = useCallback(
    (token: TokenInfo) => {
      if (!token) return;
      if (target === "tokenA") {
        useJupiterTrade.setState({ tokenA: token });
      } else {
        useJupiterTrade.setState({ tokenB: token });
      }
      onClose();
    },
    [onClose, target]
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="bg-[#0d111b] max-w-xs md:max-w-lg z-[110] rounded-2xl p-4 sm:p-5"
        style={{
          boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)",
          borderColor: "rgba(171,196,255,0.5",
        }}
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
            {swap_modal.tokens?.slice(0, 6).map((token) => (
              <Button
                key={`${token.address}-default`}
                size={"lg"}
                className="flex gap-3 tokens-center px-4 rounded-full hover:bg-[#d9f8ff20] transition-all"
                onClick={() => handleSelect(token)}
                style={{
                  boxShadow: "0 0 5px rgba(217, 248, 255, 0.25)",
                }}
              >
                {token.logoURI ? (
                  <img
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
        {tokenList && (
          <div className="flex flex-col w-full max-h-96 overflow-y-scroll ">
            <div className="grid md:grid-cols-2 gap-4 w-full pr-4">
              {filterData(tokenList, search)
                .slice(0, 90)
                .map((token) => (
                  <Button
                    key={token.address}
                    className="flex justify-start w-full gap-4"
                    onClick={() => handleSelect(token)}
                  >
                    {token.logoURI ? (
                      <img
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

export default JupiterTradeModal;
