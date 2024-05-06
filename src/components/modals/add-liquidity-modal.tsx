"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import { useAddLiquidityModal } from "@/lib/stores/liquidity.store";

import CloseIcon from "@mui/icons-material/Close";

type Props = {};

const AddLiquidityModal = (props: Props) => {
  const { isOpen, onClose } = useAddLiquidityModal();
  const [amount, setAmount] = useState<number>(0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-[#0d111b] z-[110] rounded-xl p-6"
        style={{ boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)" }}
      >
        <div className={"flex flex-col"}>
          {/*Header */}
          <div className={"flex flex-row justify-between"}>
            <p className={"text-white text-xl font-bold"}>
              Add liquidity to SOL - RAY
            </p>
            <div className={"text-white"} onClick={onClose}>
              <CloseIcon />
            </div>
          </div>
          {/*First Box */}
          <div
            className={
              "flex flex-col border mt-6 p-3 rounded-sm gap-1 border-[#757788]"
            }
          >
            {/*Box Header*/}
            <p className={"text-sky-500 font-bold text-base"}>My Position</p>
            {/*Row One*/}
            <div className={"flex flex-row justify-between"}>
              <div className={"flex flex-row gap-2"}>
                <div className={"flex flex-row"}>
                  <div
                    className={
                      "bg-[#abc4ff] h-5 w-5 flex flex-row justify-center items-center rounded-full"
                    }
                  >
                    <img
                      alt={"icon"}
                      className={"w-4 h-4 rounded-full"}
                      src={
                        "https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                      }
                    />
                  </div>
                </div>
                <p className={"text-sky-700 font-bold"}>Sol</p>
              </div>
              <div className="flex flex-row gap-1">
                <p className={"text-white"}>0.01293237434</p>
                <p className={"text-white"}>SOL</p>
              </div>
            </div>
            {/*Row Two*/}
            <div className={"flex flex-row justify-between"}>
              <div className={"flex flex-row gap-1"}>
                <div className={"flex flex-row"}>
                  <div
                    className={
                      "bg-[#abc4ff] h-5 w-5 flex flex-row justify-center items-center rounded-full"
                    }
                  >
                    <img
                      alt={"icon"}
                      className={"w-4 h-4 rounded-full"}
                      src={
                        "https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                      }
                    />
                  </div>
                </div>
                <p className={"text-sky-700 font-bold"}>Sol</p>
              </div>
              <div className={"flex flex-row gap-1"}>
                <p className={"text-white"}>0.13213124324</p>
                <p className={"text-white"}>RAY</p>
              </div>
            </div>
          </div>
          {/*Second Box */}
          <div
            className={
              "flex flex-col border mt-6 p-3 rounded-xl gap-3 border-[#757788]"
            }
          >
            {/*  Header */}
            <div className={"flex flex-row justify-between items-start"}>
              <p className={"text-sky-500 font-bold text-base"}>
                Selected Range
              </p>
              <div className={"flex flex-row items-end"}>
                <p className={"text-sky-700 text-xs font-bold mr-2"}>
                  current Price
                </p>
                <div className={"flex flex-row text-sm gap-1"}>
                  <p className={"text-white"}>85,3432545435432</p>
                  <p className={"text-white"}>per</p>
                  <p className={"text-white"}>SOL</p>
                </div>
              </div>
            </div>
            {/*  Box Section */}
            <div className={"flex flex-row justify-between gap-4"}>
              <div
                className={
                  "flex flex-col border py-3 px-4 w-full items-center gap-3 rounded-sm border-[#757788]"
                }
              >
                <p className={"text-sky-500 font-semibold text-base"}>
                  Min Price
                </p>
                <p className={"text-white text-xl"}>75.21642</p>
                <div
                  className={
                    "flex flex-row gap-1 text-xs text-sky-700 font-semibold"
                  }
                >
                  <p>RAY</p>
                  <p>per</p>
                  <p>SOL</p>
                </div>
              </div>
              <div
                className={
                  "flex flex-col border py-3 px-4 w-full items-center gap-3 rounded-sm border-[#757788]"
                }
              >
                <p className={"text-sky-500 font-semibold text-base"}>
                  Max Price
                </p>
                <p className={"text-white text-xl"}>113.053485</p>
                <div
                  className={
                    "flex flex-row gap-1 text-xs text-sky-700 font-semibold"
                  }
                >
                  <p>RAY</p>
                  <p>per</p>
                  <p>SOL</p>
                </div>
              </div>
            </div>
          </div>
          {/*  Third box*/}
          <div
            className={"flex flex-col bg-[#071233]  mt-4 rounded-xl p-4 gap-2"}
          >
            <div className={"flex flex-row justify-between"}>
              <p className={"text-sky-700 font-semibold text-sm"}>Amount</p>
              <div
                className={
                  "flex flex-row gap-1 text-sky-700 font-semibold text-sm"
                }
              >
                <p>Balance:</p>
                <p>0.043564351</p>
              </div>
            </div>
            <div className={"flex flex-row justify-between"}>
              <div
                className={
                  "flex flex-row text-sky-500 font-semibold text-base items-center gap-2"
                }
              >
                <div className={"flex flex-row"}>
                  <div
                    className={
                      "bg-[#abc4ff] h-7 w-7 flex flex-row justify-center items-center rounded-full"
                    }
                  >
                    <img
                      alt={"icon"}
                      className={"w-6 h-6 rounded-full"}
                      src={
                        "https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                      }
                    />
                  </div>
                </div>
                <p>SOL</p>
                <div className="w-[1px] h-7 bg-white bg-opacity-40"></div>
                {/* Right divider */}
                <Button size={"sm"} className={"bg-white bg-opacity-10 h-7"}>
                  Max
                </Button>
              </div>
              <div className={"flex flex-col items-end"}>
                <input
                  className={"bg-[#071233] text-white text-right px-0"}
                  defaultValue={0}
                  autoFocus={false}
                  type={"number"}
                />
                <div
                  className={
                    "flex flex-row mt-1 text-sky-700 font-semibold text-sm"
                  }
                >
                  <p>$</p>
                  <p>0.05</p>
                </div>
              </div>
            </div>
          </div>
          {/*  Fourth Box*/}
          <div
            className={"flex flex-col bg-[#071233] mt-4 rounded-xl p-4 gap-2"}
          >
            <div className={"flex flex-row justify-between"}>
              <p className={"text-sky-700 font-semibold text-sm"}>Amount</p>
              <div
                className={
                  "flex flex-row gap-1 text-sky-700 font-semibold text-sm"
                }
              >
                <p>Balance:</p>
                <p>0</p>
              </div>
            </div>
            <div className={"flex flex-row justify-between"}>
              <div
                className={
                  "flex flex-row text-sky-500 font-semibold text-base items-center gap-2"
                }
              >
                <div
                  className={
                    "bg-[#abc4ff] h-7 w-7 flex flex-row justify-center items-center rounded-full"
                  }
                >
                  <img
                    alt={"icon"}
                    className={"w-6 h-6 rounded-full"}
                    src={
                      "https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                    }
                  />
                </div>
                <p>SOL</p>
                <div className="w-[1px] h-7 bg-white bg-opacity-40"></div>
                {/* Right divider */}
                <Button size={"sm"} className={"bg-white bg-opacity-10 h-7"}>
                  Max
                </Button>
              </div>
              <div className={"flex flex-col items-end"}>
                <input
                  className={"bg-[#071233] text-white text-right px-0"}
                  defaultValue={0}
                  autoFocus={false}
                  type={"number"}
                />
                <div
                  className={
                    "flex flex-row mt-1 text-sky-700 font-semibold text-sm"
                  }
                >
                  <p>$</p>
                  <p>0.05</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={"flex flex-col bg-[#071233] mt-4 p-3 gap-1 rounded-xl"}
          >
            <div className="flex flex-row justify-between text-white">
              <div className="flex flex-row gap-1">
                <p>SOL</p>
                <div
                  className={
                    "bg-[#abc4ff] h-5 w-5 flex flex-row justify-center items-center rounded-full"
                  }
                >
                  <img
                    alt={"icon"}
                    className={"w-4 h-4 rounded-full"}
                    src={
                      "https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                    }
                  />
                </div>
              </div>
              <p>0.05</p>
            </div>
            <div className="flex flex-row justify-between text-white">
              <div className="flex flex-row gap-1">
                <p>RAY</p>
                <div
                  className={
                    "bg-[#abc4ff] h-5 w-5 flex flex-row justify-center items-center rounded-full"
                  }
                >
                  <img
                    alt={"icon"}
                    className={"w-4 h-4 rounded-full"}
                    src={
                      "https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                    }
                  />
                </div>
              </div>
              <p>2.093429</p>
            </div>
            <div className="flex flex-row justify-between text-sky-500 font-semibold mt-1">
              <p>Total Deposit</p>
              <div className="flex flex-row gap-1">
                <p>$</p>
                <p>0.05</p>
              </div>
            </div>
          </div>
        </div>
        <Button size="lg">RAY Amount Too Large</Button>
        <Button className={"bg-transparent"}>Cancel</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddLiquidityModal;
