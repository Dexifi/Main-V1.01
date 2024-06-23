import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import formatedNumber from "@/lib/numbers";
import formatedString from "@/lib/string";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
  isEXTRASMALL: boolean;
};

const EcosystemTab = ({ isEXTRASMALL }: Props) => {
  const [gdata, setData] = useState<any[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);

  const showMoreClick = useCallback(() => {
    setShowMore(true);
  }, []);

  const depositClick = useCallback(() => {
    setShowDeposit(true);
  }, []);
  const d_data = {
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
        title: "Lock Time",
        text: "365 Days",
      },
      {
        title: "Withdraw",
        text: "-",
      },
      {
        title: "Pendding",
        text: "-",
      },
    ],
    subbody: [
      {
        title: "Deposited",
        value: 200.53,
        currency: "RAY",
        additional: 200.4,
        additional_c: "$",
      },
      {
        title: "Pending Rewards",
        value: 60000,
        currency: "RAY",
        additional: 60,
        additional_c: "$",
      },
    ],
  };

  useEffect(() => {
    gdata.length <= 0 &&
      setTimeout(() => {
        setData([
          {
            title: "My Locks",
            text: "-",
          },
          {
            title: "Total",
            value: 2000,
          },
          {
            title: "Value",
            value: 2100.65,
          },
          {
            title: "Rewards",
            value: 100.76,
          },
        ]);
      }, 5000);
  }, [gdata]);
  return (
    <div className="flex flex-col gap-7 h-screen">
      <div className="flex flex-row justify-between mt-4">
        <h4 className="text-[#d9f8ff] text-2xl sm:text-4xl text-center lg:text-left font-['Helvetica'] font-medium">
          List of All Active Vaults in Ecosystem
        </h4>
        <div
          className="w-full bg-[#0D111B] p-3 rounded-2xl px-4 sm:px-7 flex-1 overflow-auto max-w-sm lg:max-w-xl z-50"
          style={{
            boxShadow: "0 0 5px 0px #d9f8ff",
          }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 2xl:gap-5">
            {gdata.length === 0 ? (
              <>
                {[...new Array(4)].map((_, index) => (
                  <div
                    key={`${index}-preload/gdata--ido-pool`}
                    className="flex flex-col gap-2 w-full h-12"
                  >
                    <Skeleton className="w-full h-4 bg-slate-600" />
                    <Skeleton className="w-full h-6 bg-slate-600" />
                  </div>
                ))}
              </>
            ) : (
              <>
                {gdata.map((row, index) => (
                  <div
                    className="flex flex-col gap-2"
                    key={`${formatedString(
                      row.title
                    ).toLocaleLowerCase()}-data--ido/pool-${index}`}
                  >
                    <span className="text-lg text-[#D9F8FF]">{row.title}</span>
                    {row.text ? (
                      <span className="text-3xl font-semibold text-[#757788]">
                        {row.text}
                      </span>
                    ) : null}
                    {row.value ? (
                      <span className="flex gap-1 flex-nowrap text-3xl font-semibold text-[#757788]">
                        <span>{row.f_currency}</span>
                        <span className={"flex flex-row text-lg"}>
                          $ {formatedNumber(row.value, 0, isEXTRASMALL)}
                        </span>
                        <span>{row.currency}</span>
                      </span>
                    ) : null}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-start">
        <div
          className="flex flex-col w-full bg-[#142030] py-5 px-4 sm:px-7 rounded-[20px] gap-4 max-w-[360px]"
          style={{
            boxShadow: "0 0 4px #88d6ff",
          }}
        >
          <div className="flex justify-center flex-col gap-3 w-full">
            <div className="flex justify-between items-center py-2 px-8 rounded-full bg-[#0D111B] z-50">
              <h6 className="text-xl text-[#D9F8FF]">Vaults</h6>

              {d_data ? (
                <div className="text-xl text-[#D9F8FF] font-medium">RAY</div>
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

          <div className={"flex flex-col text-white gap-1"}>
            <div className={"flex flex-row justify-between"}>
              <p className={"text-[#D9F8FF] text-base font-medium"}>APR</p>
              <p className={"text-[#757788] font-medium text-base"}>10.0%</p>
            </div>
            <div className={"flex flex-row justify-between"}>
              <p className={"text-[#D9F8FF] text-base font-medium"}>Provider</p>
              <p className={"text-[#757788] font-medium text-base"}>10.0%</p>
            </div>
            <div className={"flex flex-row justify-between"}>
              <p className={"text-[#D9F8FF] text-base font-medium"}>Reward</p>
              <p className={"text-[#757788] font-medium text-base"}>10.0%</p>
            </div>
            {showMore && (
              <>
                <div className={"flex flex-row justify-between"}>
                  <p className={"text-[#D9F8FF] text-base font-medium"}>TVL</p>
                  <p className={"text-[#757788] font-medium text-base"}>
                    $5,373,978
                  </p>
                </div>
                <div className={"flex flex-row justify-between"}>
                  <p className={"text-[#D9F8FF] text-base font-medium"}>
                    TVL $
                  </p>
                  <p className={"text-[#757788] font-medium text-base"}>
                    24.051.027 RAY
                  </p>
                </div>
                <div className={"flex flex-row justify-between"}>
                  <p className={"text-[#D9F8FF] text-base font-medium"}>
                    Lock Time
                  </p>
                  <p className={"text-[#757788] font-medium text-base"}>-</p>
                </div>
                <div className={"flex flex-row justify-between"}>
                  <p className={"text-[#D9F8FF] text-base font-medium"}>
                    Withdraw
                  </p>
                  <p className={"text-[#757788] font-medium text-base"}>-</p>
                </div>
                <div className={"flex flex-row justify-between"}>
                  <p className={"text-[#D9F8FF] text-base font-medium"}>
                    Pending
                  </p>
                  <p className={"text-[#757788] font-medium text-base"}>-</p>
                </div>
                <div className={"mt-4"}>
                  <div
                    className={
                      "flex flex-row text-sm text-[#757788] ml-2 mb-1 font-medium gap-2"
                    }
                  >
                    <p>Deposited:</p>
                    <p>113.66987 RAY</p>
                  </div>
                  <div className={"bg-[#0D111B] rounded-[20px] p-4 relative"}>
                    <div
                      className={"flex flex-row justify-between w-full gap-3"}
                    >
                      <div className={"w-full"}>
                        <div
                          className={
                            "flex flex-row w-full justify-between bg-gray-900 rounded-[25px] py-2 px-4 items-center shadow"
                          }
                          style={{ boxShadow: "0 0 4px #88d6ff" }}
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
                            RAY
                          </p>
                        </div>
                        <div className={"flex flex-row"}>
                          <div
                            className={"flex flex-row justify-between gap-3"}
                          >
                            <div
                              className={
                                "flex flex-row justify-between items-center mt-3 gap-2"
                              }
                            >
                              <button
                                className={
                                  "py-2 rounded-[25px] px-6 bg-gray-900"
                                }
                                style={{ boxShadow: "0 0 4px #88d6ff" }}
                              >
                                Half
                              </button>
                              <button
                                className={
                                  "py-2 rounded-[25px] px-6 bg-gray-900"
                                }
                                style={{ boxShadow: "0 0 4px #88d6ff" }}
                              >
                                Max
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={"w-full"}>
                        <input
                          className={
                            "w-full rounded-[25px] border h-10 border-[#757788]"
                          }
                        />
                        <div
                          className={
                            "mt-5 flex flex-row justify-end text-[#757788] font-medium"
                          }
                        >
                          <p>$222.3453</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  className={
                    "text-[22px] mt-4 rounded-[25px] bg-[#202D3A] py-6 shadow"
                  }
                  style={{ boxShadow: "0 0 4px #88d6ff" }}
                  onClick={depositClick}
                >
                  Deposit
                </Button>
                {showDeposit && (
                  <div
                    className={"bg-[#0D111B] rounded-[20px] p-4 relative mt-4"}
                  >
                    <div className={"flex flex-row justify-between text-base"}>
                      <p>Deposited</p>
                      <div
                        className={
                          "flex flex-row gap-1 text-[#757788] font-medium"
                        }
                      >
                        <p>200.032</p>
                        <p>Ray</p>
                      </div>
                    </div>
                    <div
                      className={"flex flex-row justify-between text-base mt-1"}
                    >
                      <div />
                      <div
                        className={"flex flex-row text-[#757788] font-medium"}
                      >
                        <p>$ 200.32</p>
                      </div>
                    </div>
                    <div
                      className={"flex flex-row justify-between text-base mt-1"}
                    >
                      <p>Pending Rewards</p>
                      <div
                        className={
                          "flex flex-row gap-1 text-[#757788] font-medium"
                        }
                      >
                        <p>200.032</p>
                        <p>Ray</p>
                      </div>
                    </div>
                    <div
                      className={"flex flex-row justify-between text-base mt-1"}
                    >
                      <div />
                      <div
                        className={"flex flex-row text-[#757788] font-medium"}
                      >
                        <p>$ 200.32</p>
                      </div>
                    </div>
                    <Button
                      className={
                        "text-[22px] mt-4 rounded-[25px] bg-[#202D3A] py-6 shadow w-full"
                      }
                      style={{ boxShadow: "0 0 4px #88d6ff" }}
                    >
                      Claim Pending
                    </Button>
                    <div
                      className={
                        "mt-3 flex flex-row w-full justify-between gap-3"
                      }
                    >
                      <div className={"w-full"}>
                        <div
                          className={
                            "flex flex-row justify-between bg-gray-900 rounded-[25px] py-2 px-4 items-center shadow w-[150px]"
                          }
                          style={{ boxShadow: "0 0 4px #88d6ff" }}
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
                            RAY
                          </p>
                        </div>
                        <div
                          className={
                            "flex flex-row justify-between items-center mt-3 gap-2"
                          }
                        >
                          <button
                            className={
                              "py-2 rounded-[25px] px-4 bg-gray-900 w-full"
                            }
                            style={{ boxShadow: "0 0 4px #88d6ff" }}
                          >
                            Half
                          </button>
                          <button
                            className={
                              "py-2 rounded-[25px] px-4 bg-gray-900 w-full"
                            }
                            style={{ boxShadow: "0 0 4px #88d6ff" }}
                          >
                            Max
                          </button>
                        </div>
                      </div>
                      <div className={"w-full items-center"}>
                        <input
                          className={
                            "w-full rounded-[25px] border h-10 border-[#757788]"
                          }
                        />
                      </div>
                    </div>
                    <Button
                      className={
                        "text-[22px] mt-4 rounded-[25px] bg-[#202D3A] py-6 shadow w-full"
                      }
                      style={{ boxShadow: "0 0 4px #88d6ff" }}
                    >
                      Unstake
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {!showMore && (
            <Button
              size={"lg"}
              onClick={showMoreClick}
              className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent text-sm bg-[#202D3A] text-[#D9F8FF] text-[22px] z-50"
              style={{
                boxShadow: "0 0 4px #88d6ff",
              }}
            >
              More
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EcosystemTab;
