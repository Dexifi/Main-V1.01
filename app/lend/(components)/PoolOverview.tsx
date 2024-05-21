import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatedString from "@/lib/string";
import { Skeleton } from "@/components/ui/skeleton";
import formatedNumber from "@/lib/numbers";
import { useLend } from "@/applications/Lend/store";
import Chart from "./Chart";

type POverwievProps = {
  isEXTRASMALL: boolean;
  page: "main" | "turbo";
};

const headers = [
  "Creator",
  "Pool",
  "Total supply",
  "Total borrow",
  "TVL",
  "Max outflow",
];

const PoolOverview = ({ isEXTRASMALL, page }: POverwievProps) => {
  const { turboDetails, mainDetails, mainM, turboM } = useLend((state) => ({
    turboM: state.turboMarket,
    mainM: state.mainMarket,
    turboDetails: state.turboMarketDetails,
    mainDetails: state.mainMarketDetails,
  }));
  const market = useMemo(
    () => (page === "turbo" ? turboM : mainM),
    [mainM, page, turboM]
  );
  const details = useMemo(
    () => (page === "turbo" ? turboDetails : mainDetails),
    [mainDetails, page, turboDetails]
  );
  return (
    <div className="w-full flex flex-wrap justify-between gap-3 my-3">
      <div
        className="flex flex-col justify-start items-start gap-y-5 flex-1 bg-[#0d111b] rounded-3xl px-5 lg:px-10 py-5 overflow-auto"
        style={{ boxShadow: "0 0 4px #88d6ff" }}
      >
        <div className="flex gap-x-5 text-[#D9F8FF] text-lg md:text-2xl">
          <h3>{`${
            market?.config.name.toLocaleUpperCase() ?? "MAIN"
          } Pool Overview`}</h3>
        </div>

        <div className="flex justify-center md:justify-between gap-12 relative flex-wrap md:flex-nowrap md:flex-row flex-1 w-full">
          <div className="flex flex-col gap-4 w-full">
            <Table className="w-full ">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  {headers.map((header, index) => (
                    <TableHead
                      key={`${formatedString(
                        header.toLocaleLowerCase()
                      )}_${index}`}
                      className="text-sm md:text-base truncate max-w-[110px] text-[#D9F8FF]"
                      align="left"
                    >
                      {header}
                    </TableHead>
                  ))}
                  {page === "turbo" && (
                    <TableHead
                      className="text-sm md:text-md truncate max-w-[160px]"
                      align="left"
                    />
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {!market ? (
                  <>
                    <TableRow className="hover:bg-transparent border-[#7c7c8d]">
                      {headers.map((header, index) => (
                        <TableCell
                          className="font-medium text-left text-[#7c7c8d] py-2"
                          key={`${header}_skeleton_${index}`}
                        >
                          <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                        </TableCell>
                      ))}
                      {page === "turbo" && (
                        <TableCell className="font-medium text-left text-[#7c7c8d] py-2 min-w-[160px]">
                          <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                        </TableCell>
                      )}
                    </TableRow>
                  </>
                ) : (
                  <>
                    <TableRow className="hover:bg-transparent border-[#7c7c8d] font-medium text-lg">
                      <TableCell className="font-medium text-left text-[#7c7c8d] py-4">
                        {details?.owner}
                      </TableCell>
                      <TableCell className="font-medium text-left text-[#7c7c8d] py-4">
                        {market?.config?.name ?? "MAIN"} Pool
                      </TableCell>
                      <TableCell className="font-medium text-left text-[#7c7c8d] py-4">
                        ${details?.totalSupply}
                      </TableCell>
                      <TableCell className="font-medium text-left text-[#7c7c8d] py-4">
                        ${details?.totalBorrow}
                      </TableCell>
                      <TableCell className="font-medium text-left text-[#7c7c8d] py-4">
                        ${details?.tvl}
                      </TableCell>
                      {page === "turbo" && (
                        <TableCell className="font-medium text-left text-[#7c7c8d] py-4">
                          ${formatedNumber(4000000, 1, true)} per 4 hours
                        </TableCell>
                      )}
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
            {page === "turbo" && (
              <p className="text-xs sm:text-sm xl:text-lg text-white w-full md:w-3/5 leading-relaxed">
                {market?.config.description}
              </p>
            )}
            <p className={"text-[#757788] w-full max-w-4xl text-lg"}>
              The TURBO SOL pool offers increased LTV to allow a leveraged SOL
              position up to 4x. Higher leverage comes at the cost of increased
              liquidation risk so proceed with caution.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col border w-1/4 rounded-3xl border-[#7c7c8d]">
        <div className={"flex flex-col items-center w-full p-3"}>
          <Chart market={market} details={details} />
          <div className={"flex flex-col items-center -mt-1 font-medium"}>
            <p className={"text-[#757788]"}>Pool Filling Rate</p>
            <p className={"text-[#757788]"}>(Total borrow/Total supply)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolOverview;
