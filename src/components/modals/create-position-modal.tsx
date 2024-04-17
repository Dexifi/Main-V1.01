"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useCreatePositionLiquidityModal } from "@/lib/stores/liquidity.store";
import { AreaChart, Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useCallback, useState } from "react";
import SyncIcon from "@mui/icons-material/Sync";

type Props = {};
const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CreatePositionModal = (props: Props) => {
  const { isOpen, onClose } = useCreatePositionLiquidityModal();
  const [switchMethod, setSwitchMethod] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const handleSwitch = useCallback(() => {
    setSwitchMethod((prev) => !prev);
  }, []);

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
            {/*for switch between header button SOL/USDC*/}
            <div className={"flex flex-col gap-3"}>
              {" "}
              {/*for switch between header button SOL/USDC*/}
              <div className={"p-3 border rounded-sm"}>
                <div className={"flex flex-row justify-between text-xs"}>
                  <p>SO111..11112</p>
                  <div className={"flex flex-row"}>
                    <p>Balance:</p>
                    {!true ? <p>(Wallet not connected)</p> : <p>...</p>}
                  </div>
                </div>
                <div className={"flex flex-row gap-1.5 items-center mt-2"}>
                  <div className={"flex flex-row"}>
                    <div
                      className={
                        "bg-red-700 h-5 w-5 flex flex-row justify-center items-center rounded-full"
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
                  <p className={"text-base"}>SOL</p>
                  <div className="border-r border-[rgba(171,196,255,0.5)] self-stretch" />
                  <div
                    className={"flex flex-row justify-between gap-1 text-xs"}
                  >
                    <button className={"bg-amber-700 px-1 rounded-sm"}>
                      Max
                    </button>
                    <button className={"bg-amber-700 px-1 rounded-sm"}>
                      Half
                    </button>
                    <input
                      className={"bg-amber-400 w-8/12 h-5"}
                      type={"number"}
                    />
                  </div>
                </div>
                <div className={"flex flex-row justify-end text-xs"}>
                  <p>$2.3214</p>
                </div>
              </div>
              {/*  Second Box */}
              <div className={"p-3 border rounded-sm"}>
                <div className={"flex flex-row justify-between text-xs"}>
                  <p>SO111..11112</p>
                  <div className={"flex flex-row"}>
                    <p>Balance:</p>
                    {!true ? <p>(Wallet not connected)</p> : <p>...</p>}
                  </div>
                </div>
                <div className={"flex flex-row gap-1.5 items-center mt-2"}>
                  <div className={"flex flex-row"}>
                    <div
                      className={
                        "bg-red-700 h-5 w-5 flex flex-row justify-center items-center rounded-full"
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
                  <p className={"text-base"}>USDC</p>
                  <div className="border-r border-[rgba(171,196,255,0.5)] self-stretch" />
                  <div
                    className={"flex flex-row justify-between gap-1 text-xs"}
                  >
                    <button className={"bg-amber-700 px-1 rounded-sm"}>
                      Max
                    </button>
                    <button className={"bg-amber-700 px-1 rounded-sm"}>
                      Half
                    </button>
                    <input
                      className={"bg-amber-400 w-8/12 h-5"}
                      type={"number"}
                    />
                  </div>
                </div>
                <div className={"flex flex-row justify-end text-xs"}>
                  <p>$2.3214</p>
                </div>
              </div>
              <div className={"p-3 border rounded-sm"}>
                <div className={"flex flex-row justify-between"}>
                  <div className={"flex flex-row text-base items-center gap-1"}>
                    <p>SOL</p>
                    <div className={"flex flex-row"}>
                      <div
                        className={
                          "bg-red-700 h-5 w-5 flex flex-row justify-center items-center rounded-full"
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
                  </div>
                  <p>21</p>
                </div>
                <div className={"flex flex-row justify-between"}>
                  <div className={"flex flex-row text-base items-center gap-1"}>
                    <p>USDC</p>
                    <div className={"flex flex-row"}>
                      <div
                        className={
                          "bg-red-700 h-5 w-5 flex flex-row justify-center items-center rounded-full"
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
                  </div>
                  <p>2113.234523</p>
                </div>
                <div className={"flex flex-row justify-between mt-3"}>
                  <p>Total Deposit</p>
                  <p>$6,081.72</p>
                </div>
              </div>
            </div>
            <Button className={"bg-red-700 rounded-sm mt-10"}>
              Insufficient SOL balance
            </Button>
            <div
              className={
                "flex flex-row items-center justify-center text-sm mt-3"
              }
            >
              <p>SOL balance:</p>
              <p>0</p>
              <HelpOutlineIcon sx={{ fontSize: 16, ml: 0.5 }} />
            </div>
          </div>
          {/*Right COl*/}
          <div
            className={
              "flex flex-col w-full h-full bg-white rounded-sm gap-3 p-3"
            }
          >
            <div className={"flex flex-row justify-between"}>
              <p>Set Price Range</p>
              <div className={"flex flex-row gap-1"}>
                <button
                  className={
                    "flex flex-row bg-amber-400 rounded-full w-7 h-7 justify-center items-center"
                  }
                >
                  <svg
                    fill="#000000"
                    width="16px"
                    height="16px"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                  >
                    <path d="M180 176h-60c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8zm724 0h-60c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8zM785.3 504.3L657.7 403.6a7.23 7.23 0 0 0-11.7 5.7V476H378v-62.8c0-6-7-9.4-11.7-5.7L238.7 508.3a7.14 7.14 0 0 0 0 11.3l127.5 100.8c4.7 3.7 11.7.4 11.7-5.7V548h268v62.8c0 6 7 9.4 11.7 5.7l127.5-100.8c3.8-2.9 3.8-8.5.2-11.4z" />
                  </svg>
                </button>
                <button
                  className={
                    "flex flex-row bg-amber-400 rounded-full w-7 h-7 justify-center items-center"
                  }
                >
                  <ZoomOutIcon sx={{ fontSize: 16 }} />
                </button>
                <button
                  className={
                    "flex flex-row bg-amber-400 rounded-full w-7 h-7 justify-center items-center"
                  }
                >
                  <ZoomInIcon sx={{ fontSize: 16 }} />
                </button>
              </div>
            </div>
            <div>
              <div className={"flex flex-row text-xs"}>
                <p>-</p>
                <p>Current Price</p>
                <div className={"flex flex-row gap-0.5"}>
                  <p>56.234532234</p>
                  <p>USDC</p>
                  <p>per</p>
                  <p>SOL</p>
                </div>
              </div>
              <div className={"flex flex-row text-xs"}>
                <p>-</p>
                <p>Current Price</p>
                <div className={"flex flex-row gap-0.5"}>
                  <p>56.234532234</p>
                  <p>USDC</p>
                  <p>per</p>
                  <p>SOL</p>
                </div>
              </div>
            </div>

            <div className={"flex flex-row justify-between text-xs gap-1"}>
              <button className={"border px-3 rounded-sm w-full"}>
                <div className={"flex flex-row gap-0.5 justify-center"}>
                  <p>±</p>
                  <p>1%</p>
                </div>
              </button>
              <button className={"border px-3 rounded-sm w-full"}>
                <div className={"flex flex-row gap-0.5 justify-center"}>
                  <p>±</p>
                  <p>5%</p>
                </div>
              </button>
              <button className={"border px-3 rounded-sm w-full"}>
                <div className={"flex flex-row gap-0.5 justify-center"}>
                  <p>±</p>
                  <p>10%</p>
                </div>
              </button>
              <button className={"border px-3 rounded-sm w-full"}>
                <div className={"flex flex-row gap-0.5 justify-center"}>
                  <p>±</p>
                  <p>20%</p>
                </div>
              </button>
              <button className={"border px-3 rounded-sm w-full"}>
                <div className={"flex flex-row gap-0.5 justify-center"}>
                  <p>±</p>
                  <p>50%</p>
                </div>
              </button>
            </div>
            {/*  Columns Section */}
            <div className={"flex flex-row justify-between gap-2"}>
              <div className={"w-full border rounded-sm p-1 pb-3"}>
                <p className={"text-xs"}>Min Price</p>
                <div className={"flex flex-row justify-between mt-1"}>
                  <button>
                    <RemoveIcon sx={{ fontSize: 12 }} />
                  </button>
                  <input className={"w-full mx-1 px-0"} />
                  <button>
                    <AddIcon sx={{ fontSize: 12 }} />
                  </button>
                </div>
              </div>
              <div className={"w-full border rounded-sm p-1 pb-3"}>
                <p className={"text-xs"}>Max Price</p>
                <div className={"flex flex-row justify-between mt-1"}>
                  <button>
                    <RemoveIcon sx={{ fontSize: 12 }} />
                  </button>
                  <input className={"w-full mx-1 px-0"} />
                  <button>
                    <AddIcon sx={{ fontSize: 12 }} />
                  </button>
                </div>
              </div>
            </div>
            <div className={"flex flex-col gap-2"}>
              <div className={"flex flex-row justify-between items-center"}>
                <div className={"flex flex-row text-base gap-1 items-center"}>
                  <p>Estimated APR</p>
                  <div
                    onClick={handleSwitch}
                    onMouseEnter={() => setTooltipVisible(true)}
                    onMouseLeave={() => setTooltipVisible(false)}
                    className={
                      "flex flex-row items-center border rounded-sm h-4 w-4 justify-center border-amber-300 cursor-pointer"
                    }
                  >
                    {switchMethod ? (
                      <p className={"text-xs text-amber-300"}>M</p>
                    ) : (
                      <p className={"text-xs text-amber-300"}>D</p>
                    )}
                  </div>
                  <p>0%</p>
                </div>
                {tooltipVisible && (
                  <div
                    className="absolute bg-amber-400 border p-3 z-10 mb-36 rounded-sm text-xs w-72"
                    onMouseEnter={() => setTooltipVisible(true)}
                    onMouseLeave={() => setTooltipVisible(false)}
                  >
                    <div className={"flex flex-row justify-between"}>
                      <div className={"flex flex-row gap-1"}>
                        {!switchMethod ? <p>Data</p> : <p>Multiplier</p>}
                        <p>Method</p>
                      </div>
                      <div
                        className={"flex flex-row gap-1 cursor-pointer"}
                        onClick={handleSwitch}
                      >
                        <SyncIcon sx={{ fontSize: 16 }} />
                        <p>Switch</p>
                      </div>
                    </div>
                    <div className={"mt-2"}>
                      <p>
                        Estimated APR is calculated by the Delta Method. Click
                        the ‘D’ icon to switch to the Multiplier Method
                      </p>
                      <p className={"mt-2"}>
                        <a>Learn More</a>
                      </p>
                    </div>
                  </div>
                )}

                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    type="button"
                    className="px-2 py-1 text-xs text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  >
                    24H
                  </button>
                  <button
                    type="button"
                    className="px-2 py-1 text-xs text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  >
                    7D
                  </button>
                  <button
                    type="button"
                    className="px-2 py-1 text-xs text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  >
                    30D
                  </button>
                </div>
              </div>
              <div className={"rounded-sm border p-2"}>
                <div className={"flex flex-row gap-2 items-center"}>
                  <PieChart width={60} height={60}>
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
                  <p className={"text-xs"}>Trade Fee</p>
                  <p className={"text-xs"}>9.34</p>
                  <div className={"bg-amber-400 w-2 h-2 rounded-full"} />
                  <p className={"text-xs"}>RAY</p>
                  <p className={"text-xs"}>0%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePositionModal;
