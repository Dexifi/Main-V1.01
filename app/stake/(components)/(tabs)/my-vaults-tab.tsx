import { Button } from "@/components/ui/button";
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

const MyVaultsTab = ({ isEXTRASMALL }: Props) => {
  const [gdata, setData] = useState<any[]>([]);
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
            title: "My locks",
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
    <div className="flex flex-col gap-7">
      <div className="flex justify-between gap-12 mt-4 flex-col lg:flex-row">
        <div className="flex gap-2 flex-col min-w-full sm:min-w-96">
          <h4 className="text-[#d9f8ff]  text-2xl sm:text-4xl text-center lg:text-left font-['Helvetica'] font-medium">
            List of All Active Vaults in Ecosystem
          </h4>
        </div>
        <div
          className="w-full bg-[#142030] p-4 rounded-2xl px-4 sm:px-7 flex-1 overflow-auto max-w-sm lg:max-w-xl mx-auto"
          style={{
            boxShadow: "0 0 5px 1px #d9f8ff",
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
                    <span className="text-xs sm:text-sm text-[#d9f8ff]">
                      {row.title}
                    </span>
                    {row.text ? (
                      <span className="text-3xl font-semibold text-[#757788]">
                        {row.text}
                      </span>
                    ) : null}
                    {row.value ? (
                      <span className="flex gap-1 flex-nowrap text-3xl font-semibold text-[#757788]">
                        <span>{row.f_currency}</span>
                        <span>
                          {formatedNumber(row.value, 0, isEXTRASMALL)}
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

      <div className="flex flex-wrap gap-4 justify-center">
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

          <Button
            onClick={() => {}}
            className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent text-sm"
            style={{
              boxShadow: "0 0 4px #88d6ff",
            }}
          >
            Deposit
          </Button>

          <div className="p-4 bg-[#0d111b] rounded-xl flex flex-col gap-4">
            <Table className="w-full flex-1">
              <TableBody>
                {d_data.subbody.map((row: any, index: number) => (
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
              onClick={() => {}}
              className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent text-sm"
              style={{
                boxShadow: "0 0 4px #88d6ff",
              }}
            >
              Claim Pending
            </Button>
            <Button
              onClick={() => {}}
              className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent text-sm"
              style={{
                boxShadow: "0 0 4px #88d6ff",
              }}
            >
              Unstake
            </Button>
          </div>
        </div>
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

          <Button
            onClick={() => {}}
            className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent text-sm"
            style={{
              boxShadow: "0 0 4px #88d6ff",
            }}
          >
            Deposit
          </Button>

          <div className="p-4 bg-[#0d111b] rounded-xl flex flex-col gap-4">
            <Table className="w-full flex-1">
              <TableBody>
                {d_data.subbody.map((row: any, index: number) => (
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
              onClick={() => {}}
              className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent text-sm"
              style={{
                boxShadow: "0 0 4px #88d6ff",
              }}
            >
              Claim Pending
            </Button>
            <Button
              onClick={() => {}}
              className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent text-sm"
              style={{
                boxShadow: "0 0 4px #88d6ff",
              }}
            >
              Unstake
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyVaultsTab;
