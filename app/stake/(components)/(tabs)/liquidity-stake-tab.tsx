import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatedNumber from "@/lib/numbers";
import formatedString from "@/lib/string";
import moment from "moment";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  isEXTRASMALL: boolean;
};

const LiquidityStakeTab = ({ isEXTRASMALL }: Props) => {
  const [gdata, setData] = useState<any[]>([]);
  const [amount, setAmount] = useState(0);
  const tabsName = ["Stake", "UnStake"];
  const [tab, setTab] = useState("Stake");
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = useCallback(() => {
    setShowMore(true);
  }, []);

  const d_data = {
    headers: ["My locks", "Total", "Value", "Rewards"],
    body: [
      {
        title: "APY",
        value: 12,
        currency: "%",
      },
      {
        title: "Provider",
        text: "Raydium",
      },
      {
        title: "Reward",
        text: "RAY",
      },
      {
        title: "TVL",
        value: 53765925,
        f_currency: "$",
      },
      {
        title: "TVL $",
        value: 24951.51,
        currency: "RAY",
      },
      {
        title: "Deposit fee",
        value: 0,
      },
      {
        title: "Staking rewards fee",
        value: 6,
      },
    ],
    tokens: [
      {
        currency: {
          title: "SOL",
          icon: "/assets/images/solana-1@2x.png",
          balance: 113.53,
        },
        action: {
          title: "Stake",
          click: () => {},
        },
        body: [
          {
            title: "Exchange",
            text: "1 SOL ≈ 0.90790",
          },
          {
            title: "Rate",
            text: "mSOL",
          },
          {
            title: "Value",
            text: "10 mSOL ≈ $104.25",
          },
        ],
      },
      {
        currency: {
          title: "mSOL",
          icon: "/assets/images/solana-1@2x.png",
          balance: 113.53,
        },
        action: {
          title: "Unstake",
          click: () => {},
        },
        body: [
          {
            title: "Exchange",
            text: "1 SOL ≈ 0.90790",
          },
          {
            title: "Rate",
            text: "SOL",
          },
          {
            title: "Value",
            text: "10 mSOL ≈ $104.25",
          },
        ],
      },
    ],
  };

  useEffect(() => {
    gdata.length <= 0 &&
      setTimeout(() => {
        setData([
          {
            address: "1234123412",
            total: 2000,
            value: 2100.65,
            rewards: 100.76,
          },
        ]);
      }, 5000);
  }, [gdata]);
  return (
    <div className="flex flex-col gap-7 h-screen">
      <div className="flex justify-between gap-12 mt-4 flex-col lg:flex-row">
        <div className="w-full bg-[#0D111B] p-4 rounded-2xl px-4 sm:px-7 flex-1 gap-4 flex justify-between items-center z-10 shadow-[0px_0px_4px_0px_#88D6FF]">
          <div className="flex flex-col gap-1">
            <h4 className="text-[#d9f8ff] text-2xl sm:text-4xl text-center lg:text-left font-['Helvetica'] font-medium">
              List of All Liquidity Stake Provided in Network For Staking Solana
            </h4>
            <h6 className="text-[#757788] text-sm">
              Note that Unstaking takes between 2-3 days, you can always
              exchange your tokens with Swap.
            </h6>
          </div>

          {d_data ? (
            <Image
              alt={`DXE-logo / stake`}
              src="/assets/images/solana-1@2x.png"
              width={48}
              height={48}
              className="hidden md:flex w-12 h-12 aspect-square object-contain rounded-sm"
            />
          ) : (
            <Skeleton className="w-6 h-6 aspect-square object-contain bg-slate-600" />
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-start gap-4">
        <div
          className="flex flex-col w-full bg-[#142030] py-5 px-4 rounded-[20px] max-w-[360px]"
          style={{
            boxShadow: "0 0 4px #88d6ff",
          }}
        >
          <div className="flex justify-between flex-col gap-3 ">
            <div className="flex justify-between items-center py-2 px-8 rounded-full bg-[#0d111b] text-[22px]">
              <h6 className="text-[#D9F8FF] font-medium">Asset</h6>

              {d_data ? (
                <div className="text-[#D9F8FF] font-medium">MSOL</div>
              ) : (
                <Skeleton className="w-24 h-6 bg-slate-600" />
              )}
              {d_data ? (
                <Image
                  alt={`DXE-logo / lend`}
                  src="/assets/images/dexifi-logo@2x.png"
                  width={24}
                  height={24}
                  className="w-8 h-8 aspect-square object-contain rounded-sm"
                />
              ) : (
                <Skeleton className="w-6 h-6 aspect-square object-contain bg-slate-600" />
              )}
            </div>
          </div>
          <div className={"flex flex-col mt-6 gap-1 px-2"}>
            <div
              className={
                "flex flex-row text-[#D9F8FF] justify-between font-medium text-base"
              }
            >
              <p>APR</p>
              <p className={"text-[#757788]"}>10.0 %</p>
            </div>
            <div
              className={
                "flex flex-row text-[#D9F8FF] justify-between font-medium text-base"
              }
            >
              <p>Provider</p>
              <p className={"text-[#757788]"}>Marinade</p>
            </div>
            <div
              className={
                "flex flex-row text-[#D9F8FF] justify-between font-medium text-base"
              }
            >
              <p>Token</p>
              <p className={"text-[#757788]"}>mSOL</p>
            </div>
            <div
              className={
                "flex flex-row text-[#D9F8FF] justify-between font-medium text-base"
              }
            >
              <p>TVL</p>
              <p className={"text-[#757788]"}>$5,373,978</p>
            </div>
            <div
              className={
                "flex flex-row text-[#D9F8FF] justify-between font-medium text-base"
              }
            >
              <p>TVL $</p>
              <p className={"text-[#757788]"}>24.051.027 SOL</p>
            </div>
            <div
              className={
                "flex flex-row text-[#D9F8FF] justify-between font-medium text-base"
              }
            >
              <p>Deposit fee</p>
              <p className={"text-[#757788]"}>0.0 %</p>
            </div>
            <div
              className={
                "flex flex-row text-[#D9F8FF] justify-between font-medium text-base"
              }
            >
              <p>Staking rewards fee</p>
              <p className={"text-[#757788]"}>6.0 %</p>
            </div>
            <Button
              className={
                "text-[22px] mt-4 rounded-[25px] bg-[#202D3A] py-6 shadow w-full z-50"
              }
              style={{ boxShadow: "0 0 4px #88d6ff" }}
              onClick={handleShowMore}
            >
              More
            </Button>
            {showMore && (
              <Tabs className={"text-white mt-4"}>
                <div className={"flex flex-row justify-center items-center"}>
                  <div className={"bg-[#0D111B] rounded-[25px] h-[45px]"}>
                    <TabsList className={"flex flex-row gap-1 h-[45px]"}>
                      {tabsName.map((tab_item, index) => {
                        return (
                          <TabsTrigger
                            value={tab_item.toLocaleLowerCase()}
                            className="h-[45px] bg-[#0D111B] data-[state='active']:bg-[#212832] data-[state='active']:border-[#D9F8FF] rounded-[25px] shadow-[0px_0px_5px_0px_#D9F8FF] min-w-[100px] text-[#FFFFFF] z-50"
                            style={{
                              border:
                                tab_item.toLocaleLowerCase() === tab
                                  ? "1px solid #d9f8ff10"
                                  : "transparent",
                              boxShadow:
                                tab_item.toLocaleLowerCase() === tab
                                  ? "0 0 5px #d9f8ff"
                                  : "none",
                            }}
                            onClick={() => setTab(tab_item.toLocaleLowerCase())}
                            key={index}
                          >
                            {tab_item}
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>
                  </div>
                </div>
                <div className={"mt-6"}>
                  <TabsContent value={"stake"} className={"text-white"}>
                    <div
                      className={
                        "shadow-[0px_0px_5px_0px_#FFF] bg-[#0D111B] rounded-[10px] p-3"
                      }
                    >
                      <div className={"bg-[#202D3A] rounded-[10px] p-3"}>
                        <div className={"flex flex-row gap-3"}>
                          <div
                            className={
                              "flex flex-row justify-between bg-gray-900 rounded-[25px] py-2 px-4 items-center shadow w-full"
                            }
                          >
                            <img
                              className={"w-6 h-6 rounded-full"}
                              src={
                                "https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                              }
                            />
                            <p
                              className={
                                "text-[#D9F8FF] font-medium w-full text-center text-base"
                              }
                            >
                              SOL
                            </p>
                          </div>
                          <input
                            className={
                              "flex flex-row justify-between bg-gray-900 rounded-[25px] py-2 px-4 items-center shadow w-full"
                            }
                          />
                        </div>

                        <div
                          className={
                            "flex flex-row text-sm text-[#757788] font-medium mt-1"
                          }
                        >
                          <p>Balance:</p>
                          <p>113.66987 SOL</p>
                        </div>
                      </div>
                      <div className={"flex flex-row justify-end mt-4 "}>
                        <div />
                        <Button
                          size={"sm"}
                          className={
                            "shadow-[0px_0px_5px_0px_#D9F8FF] bg-[#202D3A] rounded-full px-6 w-[65px]"
                          }
                        >
                          Max
                        </Button>
                      </div>
                      <div className={"text-sm px-4 font-medium"}>
                        <div className={"flex flex-row"}>
                          <div />
                          <p>Exchange rate</p>
                        </div>
                        <div className={"flex flex-row justify-end"}>
                          <div />
                          <div className={"flex flex-row text-[#757788]"}>
                            <p>1 SOL</p>
                            <p>≈</p>
                            <p>0.90790 mSOL</p>
                          </div>
                        </div>
                      </div>
                      <div className={"text-sm px-4 font-medium"}>
                        <div className={"flex flex-row"}>
                          <div />
                          <p>Value</p>
                        </div>
                        <div className={"flex flex-row justify-end"}>
                          <div />
                          <div className={"flex flex-row text-[#757788]"}>
                            <p>10 mSOL</p>
                            <p>≈</p>
                            <p>$ 104.23</p>
                          </div>
                        </div>
                      </div>
                      <Button
                        className={
                          "text-[22px] mt-4 rounded-[25px] bg-[#202D3A] py-6 shadow w-full"
                        }
                        style={{ boxShadow: "0 0 4px #88d6ff" }}
                      >
                        Stake
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value={"unstake"} className={"text-white"}>
                    <div
                      className={
                        "shadow-[0px_0px_5px_0px_#FFF] bg-[#0D111B] rounded-[10px] p-3"
                      }
                    >
                      <div className={"bg-[#202D3A] rounded-[10px] p-3"}>
                        <div className={"flex flex-row gap-3"}>
                          <div
                            className={
                              "flex flex-row justify-between bg-gray-900 rounded-[25px] py-2 px-4 items-center shadow w-full"
                            }
                          >
                            <img
                              className={"w-6 h-6 rounded-full"}
                              src={
                                "https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                              }
                            />
                            <p
                              className={
                                "text-[#D9F8FF] font-medium w-full text-center text-base"
                              }
                            >
                              mSOL
                            </p>
                          </div>
                          <input
                            className={
                              "flex flex-row justify-between bg-gray-900 rounded-[25px] py-2 px-4 items-center shadow w-full"
                            }
                          />
                        </div>

                        <div
                          className={
                            "flex flex-row text-sm text-[#757788] font-medium mt-1"
                          }
                        >
                          <p>Balance:</p>
                          <p>113.66987 SOL</p>
                        </div>
                      </div>
                      <div className={"flex flex-row justify-end mt-4 "}>
                        <div />
                        <Button
                          size={"sm"}
                          className={
                            "shadow-[0px_0px_5px_0px_#D9F8FF] bg-[#202D3A] rounded-full px-6 w-[65px]"
                          }
                        >
                          Max
                        </Button>
                      </div>
                      <div className={"text-sm px-4 font-medium"}>
                        <div className={"flex flex-row"}>
                          <div />
                          <p>Exchange rate</p>
                        </div>
                        <div className={"flex flex-row justify-end"}>
                          <div />
                          <div className={"flex flex-row text-[#757788]"}>
                            <p>1 SOL</p>
                            <p>≈</p>
                            <p>0.90790 mSOL</p>
                          </div>
                        </div>
                      </div>
                      <div className={"text-sm px-4 font-medium"}>
                        <div className={"flex flex-row"}>
                          <div />
                          <p>Value</p>
                        </div>
                        <div className={"flex flex-row justify-end"}>
                          <div />
                          <div className={"flex flex-row text-[#757788]"}>
                            <p>10 mSOL</p>
                            <p>≈</p>
                            <p>$ 104.23</p>
                          </div>
                        </div>
                      </div>
                      <Button
                        className={
                          "text-[22px] mt-4 rounded-[25px] bg-[#202D3A] py-6 shadow w-full z-50"
                        }
                        style={{ boxShadow: "0 0 4px #88d6ff" }}
                      >
                        Unstake
                      </Button>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidityStakeTab;
