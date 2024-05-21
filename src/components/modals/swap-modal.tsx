"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useCallback, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { useAtom } from "jotai";
import { tokenAtom, TokenType } from "@/stores/tokens";
import { mainTokens } from "@/configuration/tokens";
import { swapAtom, swapModalAtom } from "@/stores/swap";
import IosShareIcon from "@mui/icons-material/IosShare";
import WarningIcon from "@mui/icons-material/Warning";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
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

const SwapModal = () => {
  const [search, setSearch] = useState("");
  const [tokenList] = useAtom(tokenAtom);
  const [swapData, setSwapData] = useAtom(swapAtom);
  const [{ open, type }, setModal] = useAtom(swapModalAtom);

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
    (token: TokenType) => {
      if (type === "first") {
        if (token.address === swapData.secondToken?.address) return;
        setSwapData((e) => ({ ...e, firstToken: token }));
      } else {
        if (token.address === swapData.firstToken?.address) return;
        setSwapData((e) => ({ ...e, secondToken: token }));
      }
      setModal({ open: false });
    },
    [setModal, setSwapData, type]
  );

  const onClose = useCallback(() => {
    setModal({ open: false });
  }, [setModal]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="bg-[#0d111b] max-w-xs md:max-w-lg z-[110] rounded-2xl p-4 sm:p-5 overflow-hidden "
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
            className="bg-slate-900 outline-none text-[#d9f8ff] rounded-3xl"
          />
          <div className="flex gap-4 flex-row justify-between">
            {swap_modal.tokens?.slice(0, 6).map((token) => (
              <Button
                key={`${token.address}-default`}
                size={"lg"}
                className="flex gap-3 tokens-center rounded-full hover:bg-[#d9f8ff20] transition-all [background:#202D3A] shadow-[0px_0px_5px_0px_#D9F8FF] px-3 py-0 border w-full"
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
                  <BrokenImageIcon sx={{ color: "yellow", fontSize: 24 }} />
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
          <div className="flex flex-col w-full max-h-96 overflow-y-scroll">
            <div className="w-full">
              {filterData(tokenList, search)
                .slice(0, 90)
                .map((token, index) => (
                  <div
                    key={token.address}
                    className={`flex justify-start w-full gap-4 p-3 cursor-pointer items-center ${
                      index % 2 == 0 && "bg-[#30425666]"
                    }`}
                    onClick={() => handleSelect(token)}
                  >
                    <div className={"relative flex flex-row"}>
                      {token.logoURI ? (
                        <img
                          src={token.logoURI}
                          alt={`${token.symbol} / icon`}
                          width={48}
                          height={48}
                          className="aspect-square object-contain flex rounded-full"
                        />
                      ) : (
                        <>
                          <Skeleton className="w-6 h-6 aspect-square object-contain bg-[#d9f8ff20]" />
                        </>
                      )}
                      {token.tags.includes("unknown") && (
                        <WarningIcon
                          sx={{
                            color: "yellow",
                            fontSize: 14,
                            position: token.logoURI ? "absolute" : "relative",
                            overflow: "hidden",
                            mt: 1.5,
                            ml: token.logoURI ? 1.5 : 0,
                          }}
                        />
                      )}
                    </div>
                    <div className={"flex flex-row"}>
                      <div className={"flex flex-col min-w-[90px]"}>
                        <span className="text-sm text-[#d9f8ff]">
                          {token.symbol}
                        </span>
                        <p className={"text-xs text-[#757788]"}>{token.name}</p>
                      </div>
                      <div
                        className={
                          "bg-[#1E1E1E] px-1 h-5 flex flex-row items-center justify-center rounded-sm ml-1 gap-1"
                        }
                      >
                        <p className={"text-xs text-[#757788]"}>
                          {token.address.slice(0, 3) +
                            "..." +
                            token.address.slice(-3)}
                        </p>
                        <IosShareIcon sx={{ fontSize: 14, color: "#757788" }} />
                      </div>
                    </div>
                    <div className={"w-full flex flex-row justify-end gap-2"}>
                      {token.tags.includes("token2022") && (
                        <div className={"border rounded-xl border-[#757788]"}>
                          <p className={"text-[#757788] text-xs p-1"}>
                            Token2022
                          </p>
                        </div>
                      )}
                      {token.tags.includes("unknown") && (
                        <div className={"border rounded-xl border-[#757788]"}>
                          <p className={"text-[#757788] text-xs p-1"}>
                            Unknown
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SwapModal;
