"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useManageLiquidityModal } from "@/lib/stores/liquidity.store";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IosShareIcon from "@mui/icons-material/IosShare";
import { Cell, Pie, PieChart } from "recharts";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
type Props = {};

const ManageModal = (props: Props) => {
  const { isOpen, onClose } = useManageLiquidityModal();
  const [open, setOpen] = useState(false);

  const toggleOpenClose = () => {
    setOpen(!open); // toggle between true and false
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
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
              <p>-</p>
              <p>RAY</p>
            </div>
            <div className="flex flex-row text-sm items-center bg-red-700 bg-opacity-50 rounded-sm px-1">
              <CheckCircleOutlineIcon style={{ width: 16 }} />
              <p className={"text-[8px] ml-1"}>In Range</p>
            </div>
          </div>
          <div className={"flex flex-row items-center justify-between gap-2"}>
            <Button>Add Liquidity</Button>
            <Button>Remove Liquidity</Button>
            <CloseIcon color={"inherit"} style={{ color: "white" }} />
          </div>
        </div>
        {/*  First Box */}
        <div
          className={"bg-blue-600 rounded-sm p-3 flex flex-row justify-between"}
        >
          <div className={"flex flex-col gap-4"}>
            <p>Liquidity</p>
            <p>$2.86</p>
          </div>
          <div className={"flex flex-col gap-4"}>
            <p>Leverage</p>
            <p>10.36x</p>
          </div>
          <div className={"flex flex-col gap-2"}>
            <p>Deposit Ratio</p>
            <div className={"flex flex-row gap-4"}>
              <div className={"flex flex-col gap-1"}>
                <div
                  className={"flex flex-row items-center justify-center gap-2"}
                >
                  <div className={"flex flex-row]"}>
                    <div
                      className={
                        "bg-white h-5 w-5 flex flex-row justify-center items-center rounded-full"
                      }
                    >
                      <img
                        className={"w-4 h-4 rounded-full"}
                        src={
                          "https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                        }
                      />
                    </div>
                  </div>
                  <p>SOL</p>
                </div>
                <div
                  className={"flex flex-row items-center justify-center gap-2"}
                >
                  <div className={"flex flex-row]"}>
                    <div
                      className={
                        "bg-white h-5 w-5 flex flex-row justify-center items-center rounded-full"
                      }
                    >
                      <img
                        className={"w-4 h-4 rounded-full"}
                        src={
                          "https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                        }
                      />
                    </div>
                  </div>
                  <p>RAY</p>
                </div>
              </div>
              <div className={"flex flex-col gap-1"}>
                <div className={"flex flex-row"}>
                  <p>$</p>
                  <p>1.98</p>
                </div>
                <div className={"flex flex-row"}>
                  <p>$</p>
                  <p>0.88</p>
                </div>
              </div>
              <div className={"flex flex-col gap-1"}>
                <div className={"flex flex-row"}>
                  <p>68.76</p>
                  <p>%</p>
                </div>
                <div>
                  <div className={"flex flex-row"}>
                    <p>31.23</p>
                    <p>%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"flex flex-col gap-4"}>
            <p>NFT</p>
            <div className="flex flex-row justify-between gap-14">
              <p>3213kkdhfds....fdsf</p>
              <div className={"flex flex-row justify-center gap-1"}>
                <button>
                  <ContentCopyIcon fontSize={"inherit"} />
                </button>
                <button>
                  <IosShareIcon fontSize={"inherit"} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            "bg-blue-600 rounded-sm flex flex-row justify-between gap-2"
          }
        >
          {/*Left COl */}
          <div
            className={
              "flex flex-col w-full h-full bg-white rounded-sm gap-3 p-3"
            }
          >
            <div className={"flex-1"}>
              <div className={"flex flex-col gap-3"}>
                <div className={"flex flex-row items-center"}>
                  <p>My Position</p>
                  <div className="flex flex-row text-sm items-center bg-red-700 bg-opacity-50 rounded-sm px-1 ml-1 h-5">
                    <CheckCircleOutlineIcon style={{ width: 16 }} />
                    <p className={"text-[8px] ml-0.5"}>In Range</p>
                  </div>
                </div>
                <div className={"flex"}>
                  <p>45.34242</p>
                  <p>-</p>
                  <p>123.43256</p>
                </div>
                <div className="flex">
                  <p>RAY</p>
                  <p>per</p>
                  <p>SOL</p>
                </div>
                <div className="text-xs">
                  <div className="flex flex-row gap-1">
                    <p>-</p>
                    <div>Current Price</div>
                    <p>84.223456534</p>
                    <p>per</p>
                    <p>SOL</p>
                  </div>
                  <div className="flex flex-row gap-1">
                    <p>-</p>
                    <div>24H Price Range</div>
                    <p>[84.565343425,35.243959932]</p>
                  </div>
                </div>
                <div className={"bg-red-600 w-full h-32"}>.</div>
              </div>
            </div>
            <div className={"flex flex-row gap-1"}>
              <div className="flex flex-row border px-1 rounded-sm justify-center items-center gap-1">
                <div className={"bg-red-200 w-2 h-2 rounded-full"} />
                <p className="text-xs">Pool liquidity</p>
              </div>
              <div className="flex flex-row border px-1 rounded-sm justify-center items-center gap-1">
                <div className={"bg-red-700 w-2 h-2 rounded-full"} />
                <p className="text-xs">My Range</p>
              </div>
              <div className="flex flex-row border px-1 rounded-sm justify-center items-center gap-1">
                <div className={"bg-amber-400 w-2 h-2 rounded-full"} />
                <p className="text-xs">Current Price</p>
              </div>
            </div>
          </div>
          {/*Right COl*/}
          <div className={"flex flex-col w-full rounded-sm gap-2"}>
            <div className={"flex flex-col bg-amber-700 p-3 rounded-sm gap-3 "}>
              <p>Pending Yield</p>
              <div className={"flex flex-row items-center gap-4"}>
                <div className={"flex flex-row"}>
                  <p>=$</p>
                  <p>0.68</p>
                </div>
                <Button size={"sm"}>Harvest</Button>
              </div>
              <div
                className={
                  "flex flex-row border rounded-sm p-2 justify-between border-opacity-50"
                }
              >
                <div className={"flex flex-col w-full gap-3"}>
                  <p>Fees</p>
                  <div className={"flex flex-row text-xs gap-1 items-center"}>
                    <div className={"flex flex-row"}>
                      <div
                        className={
                          "bg-white h-5 w-5 flex flex-row justify-center items-center rounded-full"
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
                    <p>SOL</p>
                    <p>0.0432491331</p>
                  </div>
                </div>
                <div className={"flex flex-col w-full gap-2.5"}>
                  <p>Rewards</p>
                  <p className={"text-xs"}>(No Rewards)</p>
                </div>
              </div>
            </div>

            <div className={"w-full bg-amber-400 rounded-sm"}>
              <div
                className={"flex flex-col bg-amber-800 p-3 rounded-sm gap-3 "}
              >
                <div className={"flex flex-row justify-between items-center"}>
                  <p>Estimated APR</p>

                  <div
                    className="inline-flex rounded-md shadow-sm"
                    role="group"
                  >
                    <button
                      type="button"
                      className="px-2 py-1 text-xs text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                    >
                      24H
                    </button>
                    <button
                      type="button"
                      className="px-2 py-1 text-sm text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                    >
                      7D
                    </button>
                    <button
                      type="button"
                      className="px-2 py-1 text-sm text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                    >
                      30D
                    </button>
                  </div>
                </div>
                <div className={"flex flex-row"}>
                  <p>9.43</p>
                  <p>%</p>
                </div>
                <div className={"rounded-sm border p-2"}>
                  <div className={"flex flex-row gap-2 items-center"}>
                    <PieChart width={64} height={64}>
                      <Pie
                        data={data}
                        innerRadius={20}
                        outerRadius={30}
                        fill="#8884d8"
                        paddingAngle={0}
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                    <div className={"bg-amber-400 w-2 h-2 rounded-full"} />
                    <p>Trade Fee</p>
                    <p>9.34</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {open && (
          <div className={"bg-blue-600 rounded-sm p-3"}>
            <p>Pool Overview</p>
            <div className={"flex flex-row mt-4 justify-between"}>
              <div className={"w-full"}>
                <p>Fee Rate</p>
                <div className={"flex flex-row mt-2"}>
                  <p>0.05</p>
                  <p>%</p>
                </div>
              </div>
              <div className={"w-full"}>
                <p>Liquidity</p>
                <div className={"flex flex-row mt-2"}>
                  <p>$</p>
                  <p>425,321,21</p>
                </div>
              </div>
              <div className={"w-full"}>
                <p>24h Volume</p>
                <div className={"flex flex-row mt-2"}>
                  <p>$</p>
                  <p>425,321,21</p>
                </div>
              </div>
              <div className={"w-full"}>
                <p>24h Fee</p>
                <div className={"flex flex-row mt-2"}>
                  <p>$</p>
                  <p>425,32</p>
                </div>
              </div>
              <div className={"w-full"}>
                <p>Tick Spacing</p>
                <div className={"flex flex-row mt-2"}>
                  <p>15</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={"w-full h-0.5 bg-sky-500 bg-opacity-50"} />
        <div className={"flex flex-row justify-center"}>
          <Button
            className={"bg-transparent text-sky-700 font-bold"}
            onClick={toggleOpenClose}
          >
            Pool Overview {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageModal;
