"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import formatedNumber from "@/lib/numbers";
import { useUnstakeModal } from "@/lib/stores/stake.store";
import formatedString from "@/lib/string";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = {};

const UnstakeModal = (props: Props) => {
  const { isOpen, onClose } = useUnstakeModal();
  const [amount, setAmount] = useState<number>(0);

  const data_modal = {
    title: "Untake Vault",
    symbol: "RAY",
    symbol_logo: "/assets/images/solana-1@2x.png",
    balance: 14941,
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-[#0d111b] max-w-xs md:max-w-lg z-[110] rounded-2xl p-4 sm:p-5"
        style={{ boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)" }}
      >
        <div className="flex justify-between flex-col gap-3">
          <div
            className="flex justify-between items-center py-2 px-4 rounded-md"
            style={{
              boxShadow: "0 0 5px rgba(217, 248, 255, 0.25)",
            }}
          >
            <h6 className="text-lg text-[#d9f8ff]">{data_modal.title}</h6>

            <div className="flex gap-4 items-center">
              {data_modal ? (
                <div className="text-sm md:text-lg text-[#d9f8ff60] font-medium">
                  {data_modal.symbol}
                </div>
              ) : (
                <Skeleton className="w-24 h-6 bg-slate-600" />
              )}
              {data_modal.symbol_logo ? (
                <Image
                  alt={`${data_modal.symbol}-logo / lend`}
                  src={data_modal.symbol_logo}
                  width={24}
                  height={24}
                  className="w-6 h-6 aspect-square object-contain rounded-sm"
                />
              ) : (
                <Skeleton className="w-6 h-6 aspect-square object-contain bg-slate-600" />
              )}
            </div>

            <Button
              size="icon"
              className="hover:bg-[#d9f8ff20] transition-all h-6 w-6"
              onClick={onClose}
            >
              <X className="w-4 h-4 aspect-square object-contain" />
            </Button>
          </div>
        </div>

        <div className="flex justify-between flex-col gap-1">
          {data_modal.symbol_logo ? (
            <span className="text-sm text-[#757788] flex gap-1 flex-nowrap">
              <span>Balance:</span>
              <span>{formatedNumber(data_modal.balance, 1, true)}</span>
              <span>{data_modal.symbol}</span>
            </span>
          ) : (
            <Skeleton className="w-24 h-6 bg-slate-600" />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 justify-between items-center px-4 py-2 rounded-md bg-[#202d3a] flex-wrap">
            <div className="flex gap-4 items-center w-1/2">
              {data_modal.symbol_logo ? (
                <Image
                  alt={`${data_modal.symbol}-logo / lend`}
                  src={data_modal.symbol_logo}
                  width={24}
                  height={24}
                  className="w-6 h-6 aspect-square object-contain rounded-sm"
                />
              ) : (
                <Skeleton className="w-6 h-6 aspect-square object-contain bg-slate-600" />
              )}
              {data_modal.symbol ? (
                <div className="text-sm md:text-lg text-[#d9f8ff60] font-medium">
                  USDC
                </div>
              ) : (
                <Skeleton className="w-24 h-6 bg-slate-600" />
              )}
            </div>
            <Input
              value={amount}
              onChange={(e) => {
                const value = +e.target.value;
                if (value > 4000) setAmount(4000);
                else setAmount(value);
              }}
              type="number"
              placeholder="Amount"
              className="bg-transparent outline-none text-[#d9f8ff] flex-1 rounded-xl"
            />
            <div className="w-full flex justify-between items-center text-end">
              <div className="text-xs md:text-sm text-[#d9f8ff60] font-medium">
                &asymp; ${formatedNumber(25.56, 3, false)}
              </div>
              <div className="text-xs md:text-sm text-[#d9f8ff60] font-medium">
                ${formatedNumber(amount * 25.56, 2, true)}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center text-end gap-2 md:gap-4 flex-col md:flex-row">
            <Button
              className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full md:w-1/2 bg-transparent text-xs md:text-sm"
              style={{
                boxShadow: "0 0 4px #88d6ff",
              }}
              size="sm"
              onClick={() => setAmount(data_modal.balance / 2)}
            >
              Half
            </Button>
            <Button
              className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full md:w-1/2 bg-transparent text-xs md:text-sm"
              style={{
                boxShadow: "0 0 4px #88d6ff",
              }}
              size="sm"
              onClick={() => setAmount(data_modal.balance)}
            >
              Max
            </Button>
          </div>
        </div>
        <Button
          onClick={onClose}
          className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent text-xs md:text-sm"
          style={{
            boxShadow: "0 0 4px #88d6ff",
          }}
        >
          Unstake
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UnstakeModal;
