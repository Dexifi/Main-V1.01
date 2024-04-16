"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import formatedNumber from "@/lib/numbers";
import { X } from "lucide-react";
import Image from "next/image";

import { useCreatePositionLiquidityModal } from "@/lib/stores/liquidity.store";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { Cell, Pie, PieChart } from "recharts";

type Props = {};

const CreatePositionModal = (props: Props) => {
  const { isOpen, onClose } = useCreatePositionLiquidityModal();

  const data_modal = {
    title: "Create Position",
    symbol: "SOL - USDC",
    symbol_logo: "/assets/images/solana-1@2x.png",
    balance: 14941,
  };
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className="bg-[#0d111b] w-full max-w-[760px]"
        style={{
          boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)",
        }}
      >
        {/* Header */}
        <div className={"flex flex-row justify-between items-center"}>
          <div className={"flex flex-row text-white gap-2 items-center"}>
            <div className={"flex flex-row]"}>
              <div
                className={
                  "bg-white h-8 w-8 flex flex-row justify-center items-center rounded-full"
                }
              >
                <img
                  className={"w-6 h-6 rounded-full"}
                  src={
                    "https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                  }
                />
              </div>
              <div className={"flex flex-row]"}>
                <div
                  className={
                    "bg-white h-8 w-8 flex flex-row justify-center items-center rounded-full -ml-3"
                  }
                >
                  <img
                    className={"w-6 h-6 rounded-full"}
                    src={
                      "https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                    }
                  />
                </div>
              </div>
            </div>
            <div className={"flex flex-row"}>
              <p>SOL</p>
              <p className={"px-0.5"}>/</p>
              <p>RAY</p>
            </div>
            <div className="flex flex-row text-sm items-center bg-red-700 bg-opacity-50 rounded-sm px-2">
              <p className={"text-[8px]"}>Pool Fee</p>
              <p className={"text-[8px]"}>0.05%</p>
            </div>
          </div>
          <div className={"flex flex-row items-center justify-between gap-2"}>
            <div
              className={
                "bg-sky-500 h-7 flex flex-row justify-center items-center rounded-sm"
              }
            >
              <div role="group">
                <Button size={"sm"} className={"bg-amber-400 h-6 "}>
                  SOL Price
                </Button>
                <Button size={"sm"} className={"bg-sky-500  h-6"}>
                  USDC Price
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/*  Columns Section */}
        <div
          className={
            "bg-blue-600 rounded-sm flex flex-row justify-between gap-2"
          }
        >
          {/*Left COl */}
          <div
            className={
              "flex flex-col w-full h-full bg-white rounded-sm py-3 px-2 gap-3"
            }
          >
            {/*Header*/}
            <div className={"flex flex-row justify-between"}>
              <p>Deposit Amount</p>
              <p>o</p>
            </div>
            {/*  First Box */}
            <div className={"p-3 border rounded-sm"}>
              <div className={"flex flex-row justify-between text-xs"}>
                <p>SO111..11112</p>
                <div className={"flex flex-row"}>
                  <p>Balance:</p>
                  <p>(Wallet not connected)</p>
                </div>
              </div>
              <div className={"flex flex-row gap-1 items-center mt-2"}>
                <p>icon</p>
                <p>SOL</p>
                <div className={"h-6 w-0.5 bg-red-700 opacity-50"} />
                <div className={"flex flex-row justify-between gap-1"}>
                  <button className={"bg-amber-700"}>Max</button>
                  <button className={"bg-amber-700"}>Half</button>
                  <input className={"bg-amber-400 w-8/12"} />
                </div>
              </div>
            </div>
          </div>
          {/*Right COl*/}
          <div
            className={
              "flex flex-col w-full h-full bg-white rounded-sm gap-3 p-3"
            }
          >
            <p>right</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePositionModal;
