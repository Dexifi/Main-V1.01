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
import React, { useEffect, useState } from "react";

type Props = {
  isEXTRASMALL: boolean;
};

const LiquidityStakeTab = ({ isEXTRASMALL }: Props) => {
  const [gdata, setData] = useState<any[]>([]);
  const [amount, setAmount] = useState(0);
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
    <div className="flex flex-col gap-7">
      <div className="flex justify-between gap-12 mt-4 flex-col lg:flex-row">
        <div
          className="w-full bg-[#142030] p-4 rounded-2xl px-4 sm:px-7 flex-1 gap-4 flex justify-between items-center"
          style={{
            boxShadow: "0 0 5px 1px #d9f8ff",
          }}
        >
          <div className="flex flex-col gap-4 max-w-xl">
            <h4 className="text-[#d9f8ff] text-2xl sm:text-4xl text-center lg:text-left font-['Helvetica'] font-mediuml">
              List of All Liquidity Stake Provided in Network For Staking Solana
            </h4>
            <h6 className="text-[#d9f8ff] text-sm">
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

      <div className="flex flex-wrap justify-center gap-4">
        <div
          className="flex flex-col w-full max-w-sm bg-[#142030] py-5 px-4 sm:px-7 rounded-xl gap-4"
          style={{
            boxShadow: "0 0 4px #88d6ff",
          }}
        >
          <div className="flex justify-between flex-col gap-3">
            <div
              className="flex justify-between items-center py-2 px-4 rounded-full bg-[#0d111b]"
              style={{
                boxShadow: "0 0 5px rgba(217, 248, 255, 0.25)",
              }}
            >
              <h6 className="text-lg text-[#d9f8ff]">Vaults</h6>

              {d_data ? (
                <div className="text-sm md:text-lg text-[#d9f8ff60] font-medium">
                  RAY
                </div>
              ) : (
                <Skeleton className="w-24 h-6 bg-slate-600" />
              )}
              {d_data ? (
                <Image
                  alt={`DXE-logo / lend`}
                  src="/assets/images/dexifi-logo@2x.png"
                  width={24}
                  height={24}
                  className="w-6 h-6 aspect-square object-contain rounded-sm"
                />
              ) : (
                <Skeleton className="w-6 h-6 aspect-square object-contain bg-slate-600" />
              )}
            </div>
          </div>

          <Table className="w-full flex-1">
            <TableBody>
              {d_data.body.map((row: any, index: number) => (
                <TableRow
                  className="hover:bg-transparent border-[#7c7c8d]"
                  key={`${formatedString(
                    row.title.toLocaleLowerCase()
                  )}_${index}`}
                >
                  <TableCell
                    className={`font-medium text-left text-[#d9f8ff] py-2 text-sm pl-0`}
                  >
                    {row.title}
                  </TableCell>
                  <TableCell className="font-medium text-left text-[#7c7c8d] py-2 text-sm pr-0">
                    {row.value && (
                      <span>
                        {typeof row.value === "number"
                          ? `${
                              row.f_currency ? row.f_currency : ""
                            }${formatedNumber(row.value, 2, isEXTRASMALL)} ${
                              row.currency ? row.currency : ""
                            }`
                          : "0"}
                      </span>
                    )}
                    {row.text && <span>{row.text}</span>}
                    {row.range
                      ? `${formatedNumber(row.range.min, 2, true)}${
                          row.range.sign
                        } to ${formatedNumber(row.range.max, 2, true)}${
                          row.range.sign
                        }`
                      : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {d_data.tokens.map((token, index) => (
            <div
              className="p-4 bg-[#0d111b] rounded-xl flex flex-col gap-4"
              key={`${token.currency.title}-${index}/liquidity_stake`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 bg-[#202d3a] p-2 sm:p-4 rounded-xl">
                  <div className="flex flex-nowrap gap-2 md:gap-6 justify-between">
                    <div
                      className="flex items-center gap-2 md:gap-4 bg-[#121c2b] w-full md:w-1/2 justify-center rounded-full"
                      style={{ boxShadow: "0 0 5px rgba(217, 248, 255, 0.25)" }}
                    >
                      {d_data ? (
                        <Image
                          alt={`${token.currency.title} / lend`}
                          src={token.currency.icon}
                          width={24}
                          height={24}
                          className="w-4 md:w-6 h-4 md:h-6 aspect-square object-contain rounded-sm"
                        />
                      ) : (
                        <Skeleton className="w-4 md:w-6 h-4 md:h-6 aspect-square object-contain bg-slate-600" />
                      )}
                      <span className="text-xs sm:text-sm text-[#d9f8ff] font-semibold">
                        {token.currency.title.slice(0, 4)}
                      </span>
                    </div>
                    <Input
                      value={amount}
                      onChange={(e) => {
                        const value = +e.target.value;
                        if (value > +token.currency.balance)
                          setAmount(+token.currency.balance);
                        else setAmount(value);
                      }}
                      type="number"
                      placeholder="Amount"
                      className="bg-transparent outline-none text-[#d9f8ff] rounded-full w-full md:w-1/2"
                    />
                  </div>
                  <div className="flex text-[#757788]">
                    <span>Balance:</span>
                    <span>
                      {formatedNumber(token.currency.balance, 2, isEXTRASMALL)}
                    </span>
                  </div>
                </div>
                <div className="flex text-[#757788] w-full justify-end items-center">
                  <Button
                    onClick={() => setAmount(token.currency.balance)}
                    className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-max max-h-8 bg-transparent text-xs sm:text-sm"
                    style={{
                      boxShadow: "0 0 4px #88d6ff",
                    }}
                  >
                    Max
                  </Button>
                </div>
              </div>
              <Table className="w-full flex-1">
                <TableBody>
                  {token.body.map((row: any, index: number) => (
                    <TableRow
                      className="hover:bg-transparent border-[#7c7c8d]"
                      key={`${formatedString(
                        row.title.toLocaleLowerCase()
                      )}_${index}`}
                    >
                      <TableCell
                        className={`font-medium text-left text-[#d9f8ff] py-2 text-sm pl-0`}
                      >
                        {row.title}

                        {row.additional && <div className="min-h-5" />}
                      </TableCell>
                      <TableCell className="font-medium text-left text-[#7c7c8d] py-2 text-sm pr-0">
                        <div className="flex flex-col gap-2">
                          {row.value && (
                            <span>
                              {typeof row.value === "number"
                                ? `${
                                    row.f_currency ? row.f_currency : ""
                                  }${formatedNumber(
                                    row.value,
                                    2,
                                    isEXTRASMALL
                                  )} ${row.currency ? row.currency : ""}`
                                : "0"}
                            </span>
                          )}
                          {row.text && <span>{row.text}</span>}
                          {row.additional && (
                            <span>
                              {row.additional_c}
                              {row.additional}
                            </span>
                          )}
                          {row.range
                            ? `${formatedNumber(row.range.min, 2, true)}${
                                row.range.sign
                              } to ${formatedNumber(row.range.max, 2, true)}${
                                row.range.sign
                              }`
                            : null}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button
                onClick={token.action.click}
                className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent text-sm"
                style={{
                  boxShadow: "0 0 4px #88d6ff",
                }}
              >
                {token.action.title}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiquidityStakeTab;
