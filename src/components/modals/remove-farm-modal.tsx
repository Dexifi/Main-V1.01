"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import formatedNumber from "@/lib/numbers";
import { X } from "lucide-react";
import Image from "next/image";

import { useRemoveFarmModal } from "@/lib/stores/farm.store";

type Props = {};

const RemoveFarmModal = (props: Props) => {
  const { isOpen, onClose } = useRemoveFarmModal();

  const data_modal = {
    title: "Remove Farm",
    symbol: "SOL - USDC",
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

        <Button
          onClick={() => {}}
          className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent text-xs md:text-sm"
          style={{
            boxShadow: "0 0 4px #88d6ff",
          }}
        >
          Remove out of range
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveFarmModal;
