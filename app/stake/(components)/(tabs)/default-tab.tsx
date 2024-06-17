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
import { useDepositModal, useUnstakeModal } from "@/lib/stores/stake.store";
import formatedString from "@/lib/string";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DepositModal from "../(modals)/deposit-modal";
import UnstakeModal from "../(modals)/unstale-modal";

type Props = {
  isEXTRASMALL: boolean;
};

const DefaultTab = ({ isEXTRASMALL }: Props) => {
  const [gdata, setData] = useState<any[]>([]);
  const d_data = {
    body: [
      {
        title: "APY",
        value: 12,
        currency: "%",
      },
      {
        title: "Provider",
        text: "Dexifi",
      },
      {
        title: "Reward",
        text: "DXE",
      },
      {
        title: "TVL",
        value: 53765925,
        f_currency: "$",
      },
      {
        title: "TVL $",
        value: 24951.51,
        currency: "DXE",
      },
      {
        title: "Lock Time",
        text: "365 Days",
      },
      {
        title: "Withdraw Pending",
        text: "-",
      },
      {
        title: "Lottery Ticket Per 100",
        value: 6,
      },
      {
        title: "Max Ticket Per Account",
        value: 30,
      },
    ],
    subbody: [
      {
        title: "Deposited",
        value: 500000,
        currency: "DXE",
        additional: 500,
        additional_c: "$",
      },
      {
        title: "Rewards",
        value: 60000,
        currency: "DXE",
        additional: 60,
        additional_c: "$",
      },
      {
        title: "Lottery Ticket",
        value: 30,
      },
      {
        title: "Unlock",
        text: moment().format("YYYY/MM/DD"),
      },
    ],
  };

  const { onDepositOpen } = useDepositModal();
  const { onUnstakeOpen } = useUnstakeModal();
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
            subvalue: 2000.5,
          },
          {
            title: "Value",
            value: 2100.65,
            subvalue: 2140.5,
          },
          {
            title: "Rewards",
            value: 100.76,
            subvalue: 2140.5,
          },
          {
            title: "Ticket",
            value: 54,
          },
        ]);
      }, 5000);
  }, [gdata]);
  return (
    <div className="flex flex-col gap-7 mt-6 h-screen">
      <div className="flex justify-between flex-row items-center gap-6">
        <div className="flex gap-2 flex-col">
          <h4 className="text-[#d9f8ff] text-2xl sm:text-4xl text-center lg:text-left font-['Helvetica'] font-medium">
            List of All Active Vaults for DXE Token
          </h4>
          <h6 className="text-[#757788] text-sm text-center lg:text-left">
            With Staking DXE get access to IDO sale and get APY for lock time.
          </h6>
        </div>
        <div className="w-full bg-[#0D111B] p-4 rounded-2xl px-4 sm:px-7 flex-1 overflow-auto max-w-sm lg:max-w-xl border border-[#757788] shadow">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 2xl:gap-5">
            {gdata.length === 0 ? (
              <>
                {[...new Array(5)].map((_, index) => (
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
                    <span className="text-xl text-[#d9f8ff]">{row.title}</span>
                    {row.text ? (
                      <span className="text-xl sm:text-2xl font-semibold text-[#757788]"></span>
                    ) : null}
                    {row.value ? (
                      <span className="flex gap-1 flex-nowrap text-xl sm:text-2xl font-semibold text-[#757788]">
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
      <div className="flex flex-wrap gap-4 justify-start w-full">
        <div
          className="flex flex-col w-full bg-[#142030] py-5 px-4 sm:px-7 rounded-[25px] gap-4 max-w-[360px]"
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
                <div className="text-sm md:text-lg text-[#D9F8FF] font-medium">
                  DXE
                </div>
              ) : (
                <Skeleton className="w-24 h-6 bg-slate-600" />
              )}
              {d_data ? (
                <Image
                  alt={`DXE-logo / lend`}
                  src="/assets/images/dexifi-logo@2x.png"
                  width={26}
                  height={26}
                  className="w-8 h-8 aspect-square object-contain rounded-sm"
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
                  className="hover:bg-transparent border-[#7c7c8d] border-b-0"
                  key={`${formatedString(
                    row.title.toLocaleLowerCase()
                  )}_${index}`}
                >
                  <TableCell
                    className={`font-medium text-left text-[#D9F8FF] py-2 text-sm pl-0`}
                  >
                    {row.title}
                  </TableCell>
                  <TableCell className="font-medium text-left text-[#7c7c8d] py-2 text-sm pr-0 text-right">
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
            onClick={onDepositOpen}
            className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent text-lg bg-[#202d3a] text-[#D9F8FF]"
            style={{
              boxShadow: "0 0 4px #88d6ff",
            }}
          >
            Deposit
          </Button>

          <div
            className="p-4 bg-[#0d111b] rounded-xl flex flex-col gap-4 shadow"
            style={{ boxShadow: "0 0 4px #88d6ff" }}
          >
            <Table className="w-full flex-1">
              <TableBody>
                {d_data.subbody.map((row: any, index: number) => (
                  <TableRow
                    className="hover:bg-transparent border-[#7c7c8d] border-b-0"
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
                    <TableCell className="font-medium text-right text-[#7c7c8d] py-2 text-sm pr-0">
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
              onClick={onUnstakeOpen}
              className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent text-lg bg-[#202D3A] text-[#D9F8FF]"
            >
              Unstake
            </Button>
          </div>
        </div>
      </div>

      <DepositModal />
      <UnstakeModal />
    </div>
  );
};

export default DefaultTab;
