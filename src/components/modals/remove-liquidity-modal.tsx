"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import formatedNumber from "@/lib/numbers";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { useRemoveLiquidityModal } from "@/lib/stores/liquidity.store";
import CloseIcon from "@mui/icons-material/Close";
import { Slider } from "@mui/material";

type Props = {};

const RemoveLiquidityModal = (props: Props) => {
  const { isOpen, onClose } = useRemoveLiquidityModal();
  const [amount, setAmount] = useState<number>(0);

  const data_modal = {
    title: "Remove AMM",
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
        <div className={"text-white"}>
          <div className={"flex flex-row gap-1 w-full justify-between"}>
            <div className={"flex flex-row gap-1"}>
              <p>Remove Liquidity from</p>
              <div className={"flex flex-row"}>
                <p>SOL</p>
                <p>-</p>
                <p>RAY</p>
              </div>
            </div>
            <div onClick={onClose}>
              <CloseIcon />
            </div>
          </div>
        </div>
        {/* First Box */}
        <div
          className={
            "text-white border rounded-3xl p-3 bg-[#19232d] border-[#757788]"
          }
        >
          <div className={"flex flex-row justify-between w-full"}>
            <p>Base</p>
            <div className={"flex flex-row"}>
              <p>Deposited:</p>
              <p>0.32143241</p>
            </div>
          </div>
          <div
            className={"flex flex-row mt-2 w-full justify-between items-center"}
          >
            <div className={"flex flex-row items-center gap-2"}>
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

              <p>SOL</p>
              <div className="border-r border-[rgba(171,196,255,0.5)] self-stretch" />
              <button
                className={"bg-[#0d111b] text-[#abc4ff] px-1.5 rounded-sm h-6"}
              >
                Max
              </button>
            </div>
            <input className={"bg-[#19232d] h-5"} type={"number"} />
          </div>
          <div className={"flex flex-row mt-2 justify-end"}>$0</div>
        </div>
        {/* Second Box */}
        <div
          className={
            "text-white border rounded-3xl p-3 bg-[#19232d] border-[#757788]"
          }
        >
          <div className={"flex flex-row justify-between w-full"}>
            <p>Qoute</p>
            <div className={"flex flex-row"}>
              <p>Deposited:</p>
              <p>0.32143241</p>
            </div>
          </div>
          <div
            className={"flex flex-row mt-2 w-full justify-between items-center"}
          >
            <div className={"flex flex-row items-center gap-2"}>
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

              <p>RAY</p>
              <div className="border-r border-[rgba(171,196,255,0.5)] self-stretch" />
              <button
                className={"bg-[#0d111b] text-[#abc4ff] px-1.5 rounded-sm h-6"}
              >
                Max
              </button>
            </div>
            <input className={"bg-[#19232d] h-5"} type={"number"} />
          </div>
          <div className={"flex flex-row mt-2 justify-end"}>$0</div>
        </div>
        {/*Third box*/}
        <div className={"border p-3 rounded-3xl border-[#757788]"}>
          <div className={"flex flex-row justify-between items-center"}>
            <div className={"flex flex-row text-white gap-2 items-center"}>
              <p>Amount</p>
              <button
                className={"bg-[#19232d] text-[#abc4ff] px-1.5 rounded-sm h-6 "}
              >
                Max
              </button>
              <button
                className={"bg-[#19232d] text-[#abc4ff] px-1.5 rounded-sm h-6 "}
              >
                75%
              </button>
              <button
                className={"bg-[#19232d] text-[#abc4ff] px-1.5 rounded-sm h-6"}
              >
                50%
              </button>
              <button
                className={"bg-[#19232d] text-[#abc4ff] px-1.5 rounded-sm h-6"}
              >
                25%
              </button>
            </div>
            <p className={"text-white"}>0.24%</p>
          </div>
          <Slider defaultValue={30} className={"mt-3"} color={"info"} />
        </div>
        {/* Last Box */}
        <div className={"border rounded-3xl p-3 text-white border-[#757788]"}>
          <p>Pending Yield</p>
          <div className={"flex flex-row justify-end"}>
            <p>$0.62</p>
          </div>
          <p>Minimum Received</p>
          <div
            className={"w-full flex flex-row justify-between mt-2 items-center"}
          >
            <div className={"flex flex-row gap-3 items-center"}>
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
              <p>SOL</p>
            </div>
            <p>0.03234325423</p>
          </div>
          <div
            className={"w-full flex flex-row justify-between mt-2 items-center"}
          >
            <div className={"flex flex-row gap-3 items-center"}>
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
              <p>RAY</p>
            </div>
            <p>0.03234325423</p>
          </div>
        </div>
        <button className={"h-12 rounded-md text-white bg-[#0b1938]"}>
          Withdraw Liquidity
        </button>
        <button className={"bg-[#0D111B] h-12 rounded-3xl text-white"}>
          Cancel
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveLiquidityModal;
